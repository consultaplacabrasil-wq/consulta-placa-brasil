import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { gerarInsightsModelo, type ModeloInsights } from "./insights";

export function modeloCacheKey(modelo: string): string {
  const slug = modelo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  // v2: inclui estimativa de manutenção (invalida cache antigo)
  return `model_insight_v2:${slug}`;
}

export async function getCachedInsights(modelo: string): Promise<ModeloInsights | null> {
  if (!modelo) return null;
  try {
    const [row] = await db
      .select({ value: siteSettings.value })
      .from(siteSettings)
      .where(eq(siteSettings.key, modeloCacheKey(modelo)))
      .limit(1);
    if (row?.value) return JSON.parse(row.value) as ModeloInsights;
  } catch {
    /* ignora */
  }
  return null;
}

// Retorna do cache ou gera (e salva). Usado pela API e na execução da consulta.
export async function getOrCreateInsights(modelo: string): Promise<ModeloInsights | null> {
  if (!modelo) return null;
  const cached = await getCachedInsights(modelo);
  if (cached) return cached;

  const insights = await gerarInsightsModelo(modelo);
  if (!insights) return null;

  try {
    await db.insert(siteSettings).values({
      key: modeloCacheKey(modelo),
      value: JSON.stringify(insights),
    });
  } catch {
    /* silencioso */
  }
  return insights;
}
