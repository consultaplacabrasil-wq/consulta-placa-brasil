import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(blogCategories)
      .orderBy(blogCategories.name);

    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const existing = await db
      .select({ id: blogCategories.id })
      .from(blogCategories)
      .where(eq(blogCategories.slug, slug));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Categoria com esse nome já existe" },
        { status: 409 }
      );
    }

    const [created] = await db
      .insert(blogCategories)
      .values({ name, slug, description: description || null })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name);

      const existing = await db
        .select({ id: blogCategories.id })
        .from(blogCategories)
        .where(eq(blogCategories.slug, updateData.slug as string));

      if (existing.length > 0 && existing[0].id !== id) {
        return NextResponse.json(
          { error: "Categoria com esse nome já existe" },
          { status: 409 }
        );
      }
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    const [updated] = await db
      .update(blogCategories)
      .set(updateData)
      .where(eq(blogCategories.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }

    await db.delete(blogCategories).where(eq(blogCategories.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir categoria" },
      { status: 500 }
    );
  }
}
