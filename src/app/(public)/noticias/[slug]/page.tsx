import { Metadata } from "next";
import { cache } from "react";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, and, ne, desc, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NoticiaBadge, {
  getCategoriaLabel,
} from "@/components/noticias/NoticiaBadge";
import NoticiaCTAConsulta from "@/components/noticias/NoticiaCTAConsulta";
import NoticiaRelacionadas from "@/components/noticias/NoticiaRelacionadas";
import NewsletterForm from "@/components/noticias/NewsletterForm";
import NoticiaViewCounter from "@/components/noticias/NoticiaViewCounter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getNoticia = cache(async (slug: string) => {
  const result = await db
    .select()
    .from(noticias)
    .where(and(eq(noticias.slug, slug), eq(noticias.status, "published")))
    .limit(1);

  if (result.length === 0) return null;
  return result[0];
});

async function getRelacionadas(categoria: string, excludeId: string) {
  return db
    .select({
      id: noticias.id,
      titulo: noticias.titulo,
      slug: noticias.slug,
      resumo: noticias.resumo,
      categoria: noticias.categoria,
      publishedAt: noticias.publishedAt,
    })
    .from(noticias)
    .where(
      and(
        eq(noticias.status, "published"),
        eq(noticias.categoria, categoria),
        ne(noticias.id, excludeId)
      )
    )
    .orderBy(desc(noticias.publishedAt))
    .limit(3);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) return { title: "Notícia não encontrada" };

  const title = noticia.seoTitle || `${noticia.titulo} | Consulta Placa Brasil`;
  const description = noticia.seoDescription || noticia.resumo;

  return {
    title,
    description,
    alternates: {
      canonical:
        noticia.seoCanonical ||
        `https://consultaplacabrasil.com/noticias/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://consultaplacabrasil.com/noticias/${slug}`,
      publishedTime: noticia.publishedAt?.toISOString(),
      ...(noticia.imagemUrl && {
        images: [{ url: noticia.imagemUrl, alt: noticia.imagemAlt || title, width: 1880, height: 1253 }],
      }),
    },
  };
}

function estimateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  const relacionadas = await getRelacionadas(noticia.categoria, noticia.id);
  const readTime = estimateReadTime(noticia.conteudo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumo,
    datePublished: noticia.publishedAt?.toISOString(),
    dateModified: noticia.updatedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: "Consulta Placa Brasil",
    },
    publisher: {
      "@type": "Organization",
      name: "Consulta Placa Brasil",
      logo: {
        "@type": "ImageObject",
        url: "https://consultaplacabrasil.com/logo.webp",
      },
    },
    ...(noticia.imagemUrl && {
      image: {
        "@type": "ImageObject",
        url: noticia.imagemUrl,
        width: 1880,
        height: 1253,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NoticiaViewCounter slug={slug} />
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex flex-wrap text-sm text-[#94A3B8]">
              <Link href="/" className="hover:text-[#FF4D30]">
                Início
              </Link>
              <span className="mx-2">/</span>
              <Link href="/noticias" className="hover:text-[#FF4D30]">
                Notícias
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/noticias/categoria/${noticia.categoria}`}
                className="hover:text-[#FF4D30]"
              >
                {getCategoriaLabel(noticia.categoria)}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#0F172A] font-medium line-clamp-1">
                {noticia.titulo}
              </span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <NoticiaBadge categoria={noticia.categoria} />

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            {noticia.titulo}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-[#94A3B8]">
            <time>{formatDate(noticia.publishedAt)}</time>
            <span>{readTime} min de leitura</span>
          </div>

          {/* Imagem hero */}
          {noticia.imagemUrl && (
            <div className="mt-6 relative w-full aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={noticia.imagemUrl}
                alt={noticia.imagemAlt || noticia.titulo}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="mt-8 max-w-none
              [&>p]:text-[18px] [&>p]:leading-[1.75] [&>p]:mb-7 [&>p]:text-[#333333]
              [&>h2]:text-[22px] [&>h2]:font-bold [&>h2]:text-[#0F172A] [&>h2]:mt-10 [&>h2]:mb-5
              [&>ul]:my-6 [&>ul]:pl-6 [&>ul>li]:text-[18px] [&>ul>li]:leading-[1.75] [&>ul>li]:text-[#333333] [&>ul>li]:mb-2
              [&_a]:text-[#FF4D30] [&_a]:underline [&_a]:decoration-[#FF4D30]/40 hover:[&_a]:decoration-[#FF4D30]
              [&_strong]:text-[#0F172A] [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
          />

          {/* Tags */}
          {noticia.tags && noticia.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {noticia.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-[#475569] text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-10">
            <NewsletterForm />
          </div>

          {/* CTA - antes das relacionadas */}
          {noticia.ctaExibir && (
            <NoticiaCTAConsulta
              texto={noticia.ctaTexto || undefined}
              link={noticia.ctaLink || undefined}
            />
          )}

          {/* Related */}
          <NoticiaRelacionadas
            noticias={relacionadas.map((r) => ({
              ...r,
              publishedAt: r.publishedAt?.toISOString() || null,
            }))}
          />
        </article>
      </div>
    </>
  );
}
