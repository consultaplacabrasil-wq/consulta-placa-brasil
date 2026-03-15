import Link from "next/link";
import NoticiaBadge from "./NoticiaBadge";

interface NoticiaCardProps {
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publishedAt: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NoticiaCard({
  titulo,
  slug,
  resumo,
  categoria,
  publishedAt,
}: NoticiaCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <NoticiaBadge categoria={categoria} />
      <h2 className="mt-3 text-lg font-bold text-[#0F172A] line-clamp-2">
        <Link href={`/noticias/${slug}`} className="hover:text-[#FF4D30]">
          {titulo}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-[#475569] line-clamp-3">{resumo}</p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-[#94A3B8]">{formatDate(publishedAt)}</time>
        <Link
          href={`/noticias/${slug}`}
          className="text-sm font-semibold text-[#FF4D30] hover:underline"
        >
          Ler mais
        </Link>
      </div>
    </article>
  );
}
