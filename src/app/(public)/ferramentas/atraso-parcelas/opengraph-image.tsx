import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Parcelas em Atraso";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Parcelas em Atraso",
    description: "Calcule multa, juros e valor atualizado de parcelas atrasadas",
    badge: "Calculadora",
  });
}
