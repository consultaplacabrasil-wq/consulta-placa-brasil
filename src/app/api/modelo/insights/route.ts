import { NextRequest, NextResponse } from "next/server";
import { getOrCreateInsights } from "@/lib/modelo/insights-cache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const modelo = (req.nextUrl.searchParams.get("modelo") || "").trim();
  if (!modelo || modelo.length < 2) {
    return NextResponse.json({ error: "Modelo não informado" }, { status: 400 });
  }

  const insights = await getOrCreateInsights(modelo);
  return NextResponse.json({ insights: insights || null });
}
