import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import NoticiaCard from "./NoticiaCard";

export default async function UltimasNoticias() {
  const ultimas = await db
    .select({
      id: noticias.id,
      titulo: noticias.titulo,
      slug: noticias.slug,
      resumo: noticias.resumo,
      categoria: noticias.categoria,
      publishedAt: noticias.publishedAt,
    })
    .from(noticias)
    .where(eq(noticias.status, "published"))
    .orderBy(desc(noticias.publishedAt))
    .limit(3);

  if (ultimas.length === 0) return null;

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0F172A] text-center">
          Últimas Notícias Automotivas
        </h2>
        <p className="mt-2 text-center text-[#475569]">
          Fique por dentro do mercado automotivo brasileiro
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ultimas.map((n) => (
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

        <div className="mt-8 text-center">
          <Link
            href="/noticias"
            className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg text-[#0F172A] font-semibold hover:bg-gray-50 transition-colors"
          >
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </section>
  );
}
