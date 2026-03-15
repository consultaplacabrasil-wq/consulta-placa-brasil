import Link from "next/link";

const CATEGORIAS: Record<string, { label: string; bg: string; text: string }> =
  {
    detran: {
      label: "Detran e Documentação",
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    recalls: {
      label: "Recalls e Segurança",
      bg: "bg-red-100",
      text: "text-red-700",
    },
    "mercado-usados": {
      label: "Mercado de Usados",
      bg: "bg-green-100",
      text: "text-green-700",
    },
    legislacao: {
      label: "Legislação e Trânsito",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
  };

export function getCategoriaLabel(slug: string): string {
  return CATEGORIAS[slug]?.label || slug;
}

export default function NoticiaBadge({
  categoria,
  linkable = true,
}: {
  categoria: string;
  linkable?: boolean;
}) {
  const config = CATEGORIAS[categoria] || {
    label: categoria,
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  const badge = (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );

  if (linkable) {
    return (
      <Link href={`/noticias/categoria/${categoria}`}>{badge}</Link>
    );
  }

  return badge;
}
