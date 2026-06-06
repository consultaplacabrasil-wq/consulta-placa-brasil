import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiLogs } from "@/lib/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { consultaGratis } from "@/lib/apibrasil";

export const dynamic = "force-dynamic";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

// Limite anti-abuso: cada consulta grátis custa crédito na APIBrasil.
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hora
const RATE_MAX = 8; // por IP, por hora

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "desconhecido";
}

async function countRecent(ip: string): Promise<number> {
  try {
    const since = new Date(Date.now() - RATE_WINDOW_MS);
    const rows = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(apiLogs)
      .where(
        and(
          eq(apiLogs.endpoint, "consulta-gratis"),
          gte(apiLogs.createdAt, since),
          sql`${apiLogs.requestBody}->>'ip' = ${ip}`
        )
      );
    return rows[0]?.count ?? 0;
  } catch {
    return 0; // se o banco falhar, não bloqueia o usuário legítimo
  }
}

async function log(ip: string, placa: string, statusCode: number, ms: number, error?: string) {
  try {
    await db.insert(apiLogs).values({
      endpoint: "consulta-gratis",
      method: "POST",
      statusCode,
      requestBody: { ip, placa },
      responseTimeMs: ms,
      error: error || null,
    });
  } catch {
    /* silencioso */
  }
}

export async function POST(req: NextRequest) {
  const t0 = Date.now();
  const ip = getIp(req);

  try {
    const body = await req.json().catch(() => ({}));
    const placa = String(body?.placa || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (!placa || !PLATE_REGEX.test(placa)) {
      return NextResponse.json(
        { error: "Placa inválida. Use o formato ABC1D23 ou ABC1234." },
        { status: 400 }
      );
    }

    // Rate limit por IP
    const recent = await countRecent(ip);
    if (recent >= RATE_MAX) {
      await log(ip, placa, 429, Date.now() - t0, "rate-limit");
      return NextResponse.json(
        { error: "Muitas consultas em pouco tempo. Aguarde alguns minutos e tente novamente." },
        { status: 429 }
      );
    }

    const veiculo = await consultaGratis(placa);

    // Considera "não encontrado" quando nem marca/modelo veio
    if (!veiculo.marcaModelo) {
      await log(ip, placa, 404, Date.now() - t0, "sem-dados");
      return NextResponse.json(
        { error: "Não encontramos os dados básicos dessa placa. Confira e tente novamente." },
        { status: 404 }
      );
    }

    await log(ip, placa, 200, Date.now() - t0);
    return NextResponse.json({ veiculo });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "erro";
    const m = msg.toLowerCase();

    // Placa não encontrada na base → resposta amigável que ainda converte
    if (m.includes("encontr") || m.includes("banco de dados") || m.includes("not found")) {
      await log(ip, "?", 404, Date.now() - t0, "sem-dados");
      return NextResponse.json(
        {
          error: "Não encontramos a prévia gratuita desta placa.",
          notFound: true,
        },
        { status: 404 }
      );
    }

    await log(ip, "?", 500, Date.now() - t0, msg);
    let userMessage = "Não foi possível consultar agora. Tente novamente em instantes.";
    if (m.includes("saldo") || m.includes("crédito") || m.includes("credit")) {
      userMessage = "Serviço de consulta temporariamente indisponível. Tente mais tarde.";
    }
    return NextResponse.json({ error: userMessage }, { status: 502 });
  }
}
