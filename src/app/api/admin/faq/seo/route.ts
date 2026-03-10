import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqPageSeo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(faqPageSeo).limit(1);
    return NextResponse.json(rows[0] ?? null);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar SEO da página FAQ" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = await db.select().from(faqPageSeo).limit(1);

    let result;
    if (existing.length > 0) {
      const [updated] = await db
        .update(faqPageSeo)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(faqPageSeo.id, existing[0].id))
        .returning();
      result = updated;
    } else {
      const [created] = await db
        .insert(faqPageSeo)
        .values(body)
        .returning();
      result = created;
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar SEO da página FAQ" },
      { status: 500 }
    );
  }
}
