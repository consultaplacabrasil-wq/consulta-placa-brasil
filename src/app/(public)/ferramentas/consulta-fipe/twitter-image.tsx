import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Tabela FIPE 2026";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Tabela FIPE 2026",
    description: "Consulte o valor de mercado de qualquer veículo pela FIPE",
    badge: "Atualizada",
  });
}
