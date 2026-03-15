import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, gte } from "drizzle-orm";

function normalizar(texto: string): string[] {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((p) => p.length > 2);
}

function similaridade(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  const comuns = a.filter((p) => setB.has(p)).length;
  return comuns / Math.max(a.length, b.length);
}

export async function isDuplicata(
  url: string,
  titulo: string
): Promise<boolean> {
  // Camada 1: URL exata
  const porUrl = await db
    .select({ id: noticias.id })
    .from(noticias)
    .where(eq(noticias.origemUrlOriginal, url))
    .limit(1);

  if (porUrl.length > 0) return true;

  // Camada 2: Similaridade de titulo (ultimos 7 dias)
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const recentes = await db
    .select({ titulo: noticias.titulo })
    .from(noticias)
    .where(gte(noticias.createdAt, seteDiasAtras));

  const palavrasNovo = normalizar(titulo);

  for (const existente of recentes) {
    const palavrasExistente = normalizar(existente.titulo);
    if (similaridade(palavrasNovo, palavrasExistente) > 0.8) {
      return true;
    }
  }

  return false;
}
