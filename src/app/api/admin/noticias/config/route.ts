import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";
import { executarAutoNoticias } from "@/lib/noticias/auto-noticias";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const configs = await db.select().from(noticiasConfig);
    return NextResponse.json(configs);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar configuracoes" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
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
      .update(noticiasConfig)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(noticiasConfig.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar configuracao" },
      { status: 500 }
    );
  }
}

// Executar cron manualmente
export async function POST(req: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { categoria } = await req.json();
    const resultados = await executarAutoNoticias(categoria || undefined);
    return NextResponse.json({ success: true, resultados });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Erro ao executar",
        message: err instanceof Error ? err.message : "desconhecido",
      },
      { status: 500 }
    );
  }
}
