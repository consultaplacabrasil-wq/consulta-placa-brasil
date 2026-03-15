import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const status = searchParams.get("status");

    const conditions = [];
    if (categoria) conditions.push(eq(noticias.categoria, categoria));
    if (status)
      conditions.push(
        eq(noticias.status, status as "draft" | "published" | "inactive")
      );

    const result = await db
      .select()
      .from(noticias)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(noticias.createdAt));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar noticias" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatorio" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(noticias)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(noticias.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar noticia" },
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
    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatorio" },
        { status: 400 }
      );
    }

    await db.delete(noticias).where(eq(noticias.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar noticia" },
      { status: 500 }
    );
  }
}
