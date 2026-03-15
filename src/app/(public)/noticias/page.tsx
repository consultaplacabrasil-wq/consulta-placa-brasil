import { Metadata } from "next";
import { db } from "@/lib/db";
import { noticias, noticiasConfig } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import NoticiaCard from "@/components/noticias/NoticiaCard";

export const metadata: Metadata = {
  title: "Notícias Automotivas",
  description:
    "Informações sobre o mercado automotivo brasileiro. Notícias sobre Detran, recalls, mercado de usados e legislação de trânsito.",
  alternates: { canonical: "https://consultaplacabrasil.com/noticias" },
  openGraph: { type: "website" },
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1"));
  const limit = 12;
  const offset = (page - 1) * limit;

  const whereClause = eq(noticias.status, "published");

  const [result, [{ count }], categorias] = await Promise.all([
    db
      .select({
        id: noticias.id,
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
        publishedAt: noticias.publishedAt,
      })
      .from(noticias)
      .where(whereClause)
      .orderBy(desc(noticias.publishedAt), desc(noticias.createdAt))
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
            <span className="text-[#0F172A] font-medium">Notícias</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Notícias Automotivas
        </h1>
        <p className="mt-2 text-[#475569]">
          Informações sobre o mercado automotivo brasileiro
        </p>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/noticias"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-[#FF4D30] text-white"
          >
            Todas
          </Link>
          {categorias.map((cat) => (
            <Link
              key={cat.categoria}
              href={`/noticias/categoria/${cat.categoria}`}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
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
            />
          ))}
        </div>

        {result.length === 0 && (
          <p className="text-center text-[#94A3B8] mt-12">
            Nenhuma notícia publicada ainda.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/noticias?page=${page - 1}`}
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
                href={`/noticias?page=${page + 1}`}
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
