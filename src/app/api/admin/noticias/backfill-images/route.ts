import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";
import { buscarImagemPexels } from "@/lib/noticias/imagem";

export async function POST() {
  const { error } = await requireRole("admin");
  if (error) return error;

  // Busca artigos publicados sem imagem
  const semImagem = await db
    .select({
      id: noticias.id,
      titulo: noticias.titulo,
      categoria: noticias.categoria,
    })
    .from(noticias)
    .where(and(eq(noticias.status, "published"), isNull(noticias.imagemUrl)));

  if (semImagem.length === 0) {
    return NextResponse.json({ message: "Nenhum artigo sem imagem.", atualizados: 0 });
  }

  let atualizados = 0;
  let erros = 0;
  const detalhes: string[] = [];

  for (const artigo of semImagem) {
    try {
      const imagem = await buscarImagemPexels(artigo.titulo, artigo.categoria);
      if (imagem) {
        await db
          .update(noticias)
          .set({ imagemUrl: imagem.url, imagemAlt: imagem.alt.substring(0, 255) })
          .where(eq(noticias.id, artigo.id));
        atualizados++;
        detalhes.push(`✓ ${artigo.titulo.substring(0, 60)}`);
      } else {
        erros++;
        detalhes.push(`✗ sem resultado: ${artigo.titulo.substring(0, 60)}`);
      }
      // Respeita rate limit do Pexels (200 req/hora)
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      erros++;
      detalhes.push(`✗ erro: ${artigo.titulo.substring(0, 60)}`);
    }
  }

  return NextResponse.json({
    total: semImagem.length,
    atualizados,
    erros,
    detalhes,
  });
}
