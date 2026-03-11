import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const items = await db.select().from(pages).orderBy(pages.createdAt);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar páginas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();

    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: "Título, slug e conteúdo são obrigatórios" },
        { status: 400 }
      );
    }

    const [created] = await db.insert(pages).values({
      title: body.title,
      slug: body.slug,
      content: body.content,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      seoCanonical: body.seoCanonical || null,
      seoRobots: body.seoRobots || "index, follow",
      ogTitle: body.ogTitle || null,
      ogDescription: body.ogDescription || null,
      ogImage: body.ogImage || null,
      ogUrl: body.ogUrl || null,
      published: body.published ?? true,
    }).returning();

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar página" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(pages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Página não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar página" },
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
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    await db.delete(pages).where(eq(pages.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir página" },
      { status: 500 }
    );
  }
}
