import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug obrigatório" }, { status: 400 });
    }

    await db
      .update(noticias)
      .set({ viewCount: sql`${noticias.viewCount} + 1` })
      .where(eq(noticias.slug, slug));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}
