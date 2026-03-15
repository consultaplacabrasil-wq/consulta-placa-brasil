import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export function gerarSlug(texto: string): string {
  return texto
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

export async function gerarSlugUnico(titulo: string): Promise<string> {
  const base = gerarSlug(titulo);
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await db
      .select({ id: noticias.id })
      .from(noticias)
      .where(eq(noticias.slug, slug))
      .limit(1);

    if (existing.length === 0) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}
