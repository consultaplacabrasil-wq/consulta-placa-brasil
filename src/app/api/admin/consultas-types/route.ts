import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { consultaTypes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const types = await db
      .select()
      .from(consultaTypes)
      .orderBy(consultaTypes.sortOrder);
    return NextResponse.json(types);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const [created] = await db.insert(consultaTypes).values(body).returning();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar consulta" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const [updated] = await db
      .update(consultaTypes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(consultaTypes.id, id))
      .returning();
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar consulta" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    await db.delete(consultaTypes).where(eq(consultaTypes.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir consulta" },
      { status: 500 }
    );
  }
}
