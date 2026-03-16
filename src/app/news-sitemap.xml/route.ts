import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, gte, and } from "drizzle-orm";

// Google News Sitemap aceita apenas artigos das últimas 48 horas
const DOIS_DIAS_MS = 2 * 24 * 60 * 60 * 1000;

export async function GET() {
  const baseUrl = "https://consultaplacabrasil.com";
  const limite = new Date(Date.now() - DOIS_DIAS_MS);

  let artigos: {
    slug: string;
    titulo: string;
    publishedAt: Date | null;
    imagemUrl: string | null;
    imagemAlt: string | null;
  }[] = [];

  try {
    artigos = await db
      .select({
        slug: noticias.slug,
        titulo: noticias.titulo,
        publishedAt: noticias.publishedAt,
        imagemUrl: noticias.imagemUrl,
        imagemAlt: noticias.imagemAlt,
      })
      .from(noticias)
      .where(
        and(
          eq(noticias.status, "published"),
          gte(noticias.publishedAt, limite)
        )
      )
      .orderBy(noticias.publishedAt);
  } catch {
    // DB indisponível
  }

  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = artigos
    .map((a) => {
      const url = `${baseUrl}/noticias/${a.slug}`;
      const pubDate = a.publishedAt?.toISOString() ?? new Date().toISOString();
      const imageBlock = a.imagemUrl
        ? `
    <image:image>
      <image:loc>${escape(a.imagemUrl)}</image:loc>
      <image:title>${escape(a.imagemAlt || a.titulo)}</image:title>
    </image:image>`
        : "";
      return `
  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>Consulta Placa Brasil</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escape(a.titulo)}</news:title>
    </news:news>${imageBlock}
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
