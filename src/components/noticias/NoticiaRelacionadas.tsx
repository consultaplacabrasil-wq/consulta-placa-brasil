import NoticiaCard from "./NoticiaCard";

interface NoticiaRelacionada {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publishedAt: string | null;
}

export default function NoticiaRelacionadas({
  noticias,
}: {
  noticias: NoticiaRelacionada[];
}) {
  if (noticias.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
        Notícias Relacionadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {noticias.map((n) => (
          <NoticiaCard key={n.id} {...n} />
        ))}
      </div>
    </section>
  );
}
