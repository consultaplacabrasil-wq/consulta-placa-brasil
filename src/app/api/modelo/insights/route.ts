import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { gerarInsightsModelo } from "@/lib/modelo/insights";

export const dynamic = "force-dynamic";

function cacheKey(modelo: string): string {
  const slug = modelo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `model_insight:${slug}`;
}

export async function GET(req: NextRequest) {
  const modelo = (req.nextUrl.searchParams.get("modelo") || "").trim();
  if (!modelo || modelo.length < 2) {
    return NextResponse.json({ error: "Modelo não informado" }, { status: 400 });
  }

  const key = cacheKey(modelo);

  // 1) Cache
  try {
    const [row] = await db
      .select({ value: siteSettings.value })
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);
    if (row?.value) {
      return NextResponse.json({ insights: JSON.parse(row.value), cached: true });
    }
  } catch {
    /* segue para geração */
  }

  // 2) Gera via IA
  const insights = await gerarInsightsModelo(modelo);
  if (!insights) {
    return NextResponse.json({ insights: null }, { status: 200 });
  }

  // 3) Salva no cache (não bloqueia a resposta se falhar)
  try {
    await db.insert(siteSettings).values({ key, value: JSON.stringify(insights) });
  } catch {
    /* silencioso */
  }

  return NextResponse.json({ insights, cached: false });
}
