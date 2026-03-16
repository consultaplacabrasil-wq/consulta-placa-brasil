import Link from "next/link";
import Image from "next/image";
import NoticiaBadge from "./NoticiaBadge";

interface NoticiaCardProps {
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publishedAt: string | null;
  imagemUrl?: string | null;
  imagemAlt?: string | null;
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
  imagemUrl,
  imagemAlt,
}: NoticiaCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {imagemUrl && (
        <Link href={`/noticias/${slug}`} tabIndex={-1} aria-hidden>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={imagemUrl}
              alt={imagemAlt || titulo}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
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
      </div>
    </article>
  );
}
