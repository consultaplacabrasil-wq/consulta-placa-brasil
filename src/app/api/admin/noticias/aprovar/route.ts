import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function POST(req: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id, acao } = await req.json();
    if (!id || !["aprovar", "rejeitar"].includes(acao)) {
      return NextResponse.json(
        { error: "ID e acao (aprovar/rejeitar) obrigatorios" },
        { status: 400 }
      );
    }

    const newStatus = acao === "aprovar" ? "published" : "inactive";
    const updateData: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date(),
    };

    // Preencher publishedAt ao aprovar
    if (acao === "aprovar") {
      updateData.publishedAt = new Date();
    }

    const updated = await db
      .update(noticias)
      .set(updateData)
      .where(eq(noticias.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}
