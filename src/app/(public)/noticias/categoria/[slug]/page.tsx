import { Metadata } from "next";
import { db } from "@/lib/db";
import { noticias, noticiasConfig } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import NoticiaCard from "@/components/noticias/NoticiaCard";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getConfig(slug: string) {
  const result = await db
    .select()
    .from(noticiasConfig)
    .where(eq(noticiasConfig.categoria, slug))
    .limit(1);
  return result[0] || null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig(slug);
  if (!config) return { title: "Categoria não encontrada" };

  return {
    title: `Notícias sobre ${config.categoriaLabel}`,
    description: `Últimas notícias sobre ${config.categoriaLabel} no mercado automotivo brasileiro.`,
    alternates: {
      canonical: `https://consultaplacabrasil.com/noticias/categoria/${slug}`,
    },
    openGraph: { type: "website" },
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const config = await getConfig(slug);
  if (!config) notFound();

  const page = Math.max(1, parseInt(pageParam || "1"));
  const limit = 12;
  const offset = (page - 1) * limit;

  const whereClause = and(
    eq(noticias.status, "published"),
    eq(noticias.categoria, slug)
  );

  const [result, [{ count }], todasCategorias] = await Promise.all([
    db
      .select({
        id: noticias.id,
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
        publishedAt: noticias.publishedAt,
        imagemUrl: noticias.imagemUrl,
        imagemAlt: noticias.imagemAlt,
      })
      .from(noticias)
      .where(whereClause)
      .orderBy(desc(noticias.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(noticias)
      .where(whereClause),
    db.select().from(noticiasConfig).where(eq(noticiasConfig.ativa, true)),
  ]);

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-[#94A3B8]">
            <Link href="/" className="hover:text-[#FF4D30]">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/noticias" className="hover:text-[#FF4D30]">
              Notícias
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A] font-medium">
              {config.categoriaLabel}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Notícias sobre {config.categoriaLabel}
        </h1>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/noticias"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
          >
            Todas
          </Link>
          {todasCategorias.map((cat) => (
            <Link
              key={cat.categoria}
              href={`/noticias/categoria/${cat.categoria}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                cat.categoria === slug
                  ? "bg-[#FF4D30] text-white"
                  : "bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
              }`}
            >
              {cat.categoriaLabel}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((n) => (
            <NoticiaCard
              key={n.id}
              titulo={n.titulo}
              slug={n.slug}
              resumo={n.resumo}
              categoria={n.categoria}
              publishedAt={n.publishedAt?.toISOString() || null}
              imagemUrl={n.imagemUrl}
              imagemAlt={n.imagemAlt}
            />
          ))}
        </div>

        {result.length === 0 && (
          <p className="text-center text-[#94A3B8] mt-12">
            Nenhuma notícia nesta categoria ainda.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/noticias/categoria/${slug}?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Anterior
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-[#475569]">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/noticias/categoria/${slug}?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Próxima
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
