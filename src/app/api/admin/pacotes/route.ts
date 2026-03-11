import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pacotes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Mapeia do frontend (pt) para o schema do banco (en)
function mapToDb(body: Record<string, unknown>) {
  return {
    name: body.nome as string,
    description: body.descricao as string,
    price: String(body.valor),
    originalPrice: body.valorOriginal ? String(body.valorOriginal) : null,
    popular: body.popular as boolean,
    sortOrder: body.ordem as number,
  };
}

// Mapeia do banco (en) para o frontend (pt)
function mapToFrontend(row: Record<string, unknown>) {
  return {
    id: row.id,
    nome: row.name,
    descricao: row.description || "",
    valor: Number(row.price),
    valorOriginal: row.originalPrice ? Number(row.originalPrice) : 0,
    popular: row.popular || false,
    ordem: row.sortOrder || 0,
  };
}

export async function GET() {
  try {
    const items = await db.select().from(pacotes).orderBy(pacotes.sortOrder);
    return NextResponse.json(items.map(mapToFrontend));
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar pacotes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dbData = mapToDb(body);
    const [created] = await db.insert(pacotes).values(dbData).returning();
    return NextResponse.json(mapToFrontend(created), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pacote:", error);
    return NextResponse.json(
      { error: "Erro ao criar pacote" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const dbData = mapToDb(body);
    const [updated] = await db
      .update(pacotes)
      .set({ ...dbData, updatedAt: new Date() })
      .where(eq(pacotes.id, id))
      .returning();
    return NextResponse.json(mapToFrontend(updated));
  } catch (error) {
    console.error("Erro ao atualizar pacote:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar pacote" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    await db.delete(pacotes).where(eq(pacotes.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir pacote" },
      { status: 500 }
    );
  }
}
