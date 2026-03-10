import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db.select().from(faqs).orderBy(faqs.sortOrder);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const [created] = await db.insert(faqs).values(body).returning();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar FAQ" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const [updated] = await db
      .update(faqs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(faqs.id, id))
      .returning();
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    await db.delete(faqs).where(eq(faqs.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir FAQ" },
      { status: 500 }
    );
  }
}
