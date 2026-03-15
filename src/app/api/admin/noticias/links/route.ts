import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { linksInternos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const links = await db.select().from(linksInternos);
    return NextResponse.json(links);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar links" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { url, anchors, peso } = await req.json();
    if (!url || !anchors || !Array.isArray(anchors) || anchors.length === 0) {
      return NextResponse.json(
        { error: "URL e pelo menos 1 texto âncora são obrigatórios" },
        { status: 400 }
      );
    }

    const created = await db
      .insert(linksInternos)
      .values({
        url: url.trim(),
        anchors: anchors.map((a: string) => a.trim()).filter(Boolean),
        peso: peso || 1,
      })
      .returning();

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar link" },
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
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    }

    const updated = await db
      .update(linksInternos)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(linksInternos.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar link" },
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
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    }

    await db.delete(linksInternos).where(eq(linksInternos.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar link" },
      { status: 500 }
    );
  }
}
