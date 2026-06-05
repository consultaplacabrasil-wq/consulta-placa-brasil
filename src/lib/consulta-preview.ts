// Lógica de preview gratuito — usada diretamente pela página (sem self-fetch)
import { db } from "@/lib/db";
import { apiLogs } from "@/lib/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";

const APIBRASIL_BASE_URL = "https://gateway.apibrasil.io/api/v2";
export const MAX_FREE_PER_IP_PER_DAY = 3;

export interface VehiclePreview {
  placa: string;
  marca: string | null;
  modelo: string | null;
  ano_fabricacao: string | null;
  ano_modelo: string | null;
  cor: string | null;
  combustivel: string | null;
  tipo: string | null;
  uf: string | null;
  municipio: string | null;
}

export type PreviewResult =
  | { ok: true; data: VehiclePreview; remaining: number }
  | { ok: false; error: string; limitReached: boolean };

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const since = new Date();
    since.setHours(0, 0, 0, 0);

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
    return { allowed: true, remaining: MAX_FREE_PER_IP_PER_DAY };
  }
}

export async function logConsulta(ip: string, placa: string, success: boolean) {
  try {
    await db.insert(apiLogs).values({
      endpoint: "preview-gratis",
      method: "GET",
      statusCode: success ? 200 : 500,
      requestBody: { ip, placa },
      responseTimeMs: 0,
    });
  } catch {
    // silencioso se banco indisponível
  }
}

export async function fetchApiBrasilBasica(placa: string): Promise<Record<string, unknown>> {
  const token = process.env.APIBRASIL_BEARER_TOKEN;
  if (!token) throw new Error("APIBRASIL_BEARER_TOKEN não configurado");

  const res = await fetch(`${APIBRASIL_BASE_URL}/consulta/veiculos/credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tipo: "agregados-v2", placa }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as { message?: string }).message;
    if (res.status === 402) throw new Error("Saldo insuficiente na APIBrasil. Recarregue sua conta.");
    throw new Error(msg || `APIBrasil HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.error) throw new Error(json.message || "Erro na APIBrasil");
  return json.data as Record<string, unknown>;
}

export async function getVehiclePreview(placa: string, ip: string): Promise<PreviewResult> {
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  const { allowed, remaining } = await checkRateLimit(ip);
  if (!allowed) {
    return {
      ok: false,
      limitReached: true,
      error: "Você atingiu o limite de consultas gratuitas por hoje. Volte amanhã ou adquira um relatório completo.",
    };
  }

  try {
    const data = await fetchApiBrasilBasica(placaNorm);
    await logConsulta(ip, placaNorm, true);

    return {
      ok: true,
      remaining: remaining - 1,
      data: {
        placa: placaNorm,
        marca: (data.MARCA ?? data.marca ?? null) as string | null,
        modelo: (data.MODELO ?? data.modelo ?? null) as string | null,
        ano_fabricacao: (data.ANO_FABRICACAO ?? data.ano_fabricacao ?? null) as string | null,
        ano_modelo: (data.ANO_MODELO ?? data.ano_modelo ?? null) as string | null,
        cor: (data.COR ?? data.cor ?? null) as string | null,
        combustivel: (data.COMBUSTIVEL ?? data.combustivel ?? null) as string | null,
        tipo: (data.TIPO ?? data.tipo ?? null) as string | null,
        uf: (data.UF ?? data.uf ?? null) as string | null,
        municipio: (data.MUNICIPIO ?? data.municipio ?? null) as string | null,
      },
    };
  } catch (err) {
    await logConsulta(ip, placaNorm, false);
    const msg = err instanceof Error ? err.message : "Erro ao consultar";
    return { ok: false, error: msg, limitReached: false };
  }
}
