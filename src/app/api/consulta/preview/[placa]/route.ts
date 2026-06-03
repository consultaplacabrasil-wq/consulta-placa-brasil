import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiLogs } from "@/lib/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";

const APIBRASIL_BASE_URL = "https://gateway.apibrasil.io/api/v2";
const MAX_FREE_PER_IP_PER_DAY = 3;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const since = new Date();
    since.setHours(0, 0, 0, 0); // início do dia

    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(apiLogs)
      .where(
        and(
          eq(apiLogs.endpoint, "preview-gratis"),
          eq(apiLogs.statusCode, 200),
          gte(apiLogs.createdAt, since),
          sql`${apiLogs.requestBody}->>'ip' = ${ip}`
        )
      );

    const used = result[0]?.count ?? 0;
    const remaining = Math.max(0, MAX_FREE_PER_IP_PER_DAY - used);
    return { allowed: remaining > 0, remaining };
  } catch {
    // Se o banco não estiver disponível, permite a consulta
    return { allowed: true, remaining: MAX_FREE_PER_IP_PER_DAY };
  }
}

async function logConsulta(ip: string, placa: string, success: boolean) {
  try {
    await db.insert(apiLogs).values({
      endpoint: "preview-gratis",
      method: "GET",
      statusCode: success ? 200 : 500,
      requestBody: { ip, placa },
      responseTimeMs: 0,
    });
  } catch {
    // log silencioso se banco indisponível
  }
}

async function consultaBasicaApiBrasil(placa: string) {
  const token = process.env.APIBRASIL_BEARER_TOKEN;
  if (!token) throw new Error("APIBRASIL_BEARER_TOKEN não configurado");

  const res = await fetch(`${APIBRASIL_BASE_URL}/consulta/veiculos/credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tipo: "agregados-basica", placa }),
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`APIBrasil HTTP ${res.status}`);

  const json = await res.json();
  if (json.error) throw new Error(json.message || "Erro na APIBrasil");

  return json.data as Record<string, unknown>;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ placa: string }> }
) {
  const { placa } = await params;
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (!placaNorm || placaNorm.length < 7) {
    return NextResponse.json({ error: "Placa inválida" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const { allowed, remaining } = await checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      {
        error: "limite_atingido",
        message: "Você atingiu o limite de consultas gratuitas por hoje. Volte amanhã ou adquira um relatório completo.",
      },
      { status: 429 }
    );
  }

  try {
    const data = await consultaBasicaApiBrasil(placaNorm);
    await logConsulta(ip, placaNorm, true);

    // Extrai apenas os campos básicos para o preview
    const preview = {
      placa: placaNorm,
      marca: data.MARCA || data.marca || null,
      modelo: data.MODELO || data.modelo || null,
      ano_fabricacao: data.ANO_FABRICACAO || data.ano_fabricacao || null,
      ano_modelo: data.ANO_MODELO || data.ano_modelo || null,
      cor: data.COR || data.cor || null,
      combustivel: data.COMBUSTIVEL || data.combustivel || null,
      tipo: data.TIPO || data.tipo || null,
      uf: data.UF || data.uf || null,
      municipio: data.MUNICIPIO || data.municipio || null,
    };

    return NextResponse.json(
      { preview, remaining: remaining - 1 },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining - 1),
          "X-RateLimit-Limit": String(MAX_FREE_PER_IP_PER_DAY),
        },
      }
    );
  } catch (err) {
    await logConsulta(ip, placaNorm, false);
    console.error("[preview]", err);
    return NextResponse.json(
      { error: "Não foi possível consultar esta placa. Tente novamente." },
      { status: 500 }
    );
  }
}
