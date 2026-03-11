import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { consultaTypes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

// Mapeia do frontend (pt) para o schema do banco (en)
function mapToDb(body: Record<string, unknown>) {
  return {
    name: body.nome as string,
    description: body.descricao as string,
    price: String(body.preco),
    originalPrice: body.precoOriginal ? String(body.precoOriginal) : null,
    benefits: body.beneficios as string[],
    popular: body.popular as boolean,
    active: body.ativo as boolean,
    sortOrder: body.ordem as number,
  };
}

// Mapeia do banco (en) para o frontend (pt)
function mapToFrontend(row: Record<string, unknown>) {
  return {
    id: row.id,
    nome: row.name,
    descricao: row.description || "",
    preco: Number(row.price),
    precoOriginal: row.originalPrice ? Number(row.originalPrice) : 0,
    beneficios: row.benefits || [],
    popular: row.popular || false,
    ativo: row.active !== false,
    ordem: row.sortOrder || 0,
  };
}

export async function GET() {
  try {
    const types = await db
      .select()
      .from(consultaTypes)
      .orderBy(consultaTypes.sortOrder);
    return NextResponse.json(types.map(mapToFrontend));
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const dbData = mapToDb(body);
    const [created] = await db.insert(consultaTypes).values(dbData).returning();
    return NextResponse.json(mapToFrontend(created), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    return NextResponse.json(
      { error: "Erro ao criar consulta" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const { id } = body;
    const dbData = mapToDb(body);
    const [updated] = await db
      .update(consultaTypes)
      .set({ ...dbData, updatedAt: new Date() })
      .where(eq(consultaTypes.id, id))
      .returning();
    return NextResponse.json(mapToFrontend(updated));
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar consulta" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
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
