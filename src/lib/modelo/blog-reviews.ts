import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { and, eq, or, ilike, desc, sql } from "drizzle-orm";

export interface BlogReview {
  titulo: string;
  slug: string;
  resumo: string;
  imagemUrl: string | null;
}

// Abreviações de marca da base veicular → nome usado nas matérias
const BRAND_MAP: Record<string, string> = {
  "M.BENZ": "Mercedes",
  "MERCEDES-BENZ": "Mercedes",
  "MERCEDES": "Mercedes",
  VW: "Volkswagen",
  VOLKS: "Volkswagen",
  GM: "Chevrolet",
  CHEVROLET: "Chevrolet",
  CITROEN: "Citroën",
};

const STOP = new Set(["CLASSE", "AUTO", "SEDAN", "HATCH", "FLEX", "MPI", "TB", "AUT", "EL", "GL", "GLS"]);

export async function getBlogReviews(marca: string, modeloOuFamilia: string): Promise<BlogReview[]> {
  const termos: string[] = [];

  // Marca (mapeada quando abreviada)
  const marcaUp = (marca || "").trim().toUpperCase();
  const marcaNome = BRAND_MAP[marcaUp] || (marcaUp.length >= 3 ? marca.trim() : "");
  if (marcaNome) termos.push(marcaNome);

  // Palavra mais distintiva do modelo/família (ignora termos genéricos e números)
  const palavra = (modeloOuFamilia || "")
    .toUpperCase()
    .split(/[\s/.-]+/)
    .find((p) => p.length >= 3 && !STOP.has(p) && !/^\d+$/.test(p));
  if (palavra) termos.push(palavra);

  if (termos.length === 0) return [];

  try {
    const conds = termos.flatMap((t) => {
      const like = `%${t}%`;
      return [
        ilike(noticias.titulo, like),
        sql`EXISTS (SELECT 1 FROM unnest(${noticias.tags}) tg WHERE tg ILIKE ${like})`,
      ];
    });

    const rows = await db
      .select({
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        imagemUrl: noticias.imagemUrl,
      })
      .from(noticias)
      .where(and(eq(noticias.status, "published"), or(...conds)))
      .orderBy(desc(noticias.publishedAt))
      .limit(3);

    return rows;
  } catch {
    return [];
  }
}
