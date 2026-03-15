import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { executarAutoNoticias } from "@/lib/noticias/auto-noticias";

export const maxDuration = 60;

async function getProximaCategoria(): Promise<string | null> {
  // Round-robin: pega a categoria ativa com updatedAt mais antigo
  const configs = await db
    .select({ categoria: noticiasConfig.categoria })
    .from(noticiasConfig)
    .where(eq(noticiasConfig.ativa, true))
    .orderBy(asc(noticiasConfig.updatedAt))
    .limit(1);

  if (configs.length === 0) return null;

  // Atualiza updatedAt para enviar pro final da fila
  await db
    .update(noticiasConfig)
    .set({ updatedAt: new Date() })
    .where(eq(noticiasConfig.categoria, configs[0].categoria));

  return configs[0].categoria;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    // Permite forcar categoria via param, senao usa round-robin
    const categoria =
      searchParams.get("categoria") || (await getProximaCategoria());

    if (!categoria) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma categoria ativa",
      });
    }

    const resultados = await executarAutoNoticias(categoria);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      categoriaProcessada: categoria,
      resultados,
    });
  } catch (error) {
    console.error("Erro no cron de noticias:", error);
    return NextResponse.json(
      {
        error: "Falha na execucao",
        message: error instanceof Error ? error.message : "desconhecido",
      },
      { status: 500 }
    );
  }
}
