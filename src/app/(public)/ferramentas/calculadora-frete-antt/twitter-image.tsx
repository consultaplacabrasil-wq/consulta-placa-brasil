import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de Frete ANTT";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de Frete ANTT",
    description: "Calcule o piso mínimo de frete por tipo de carga e distância",
    badge: "Profissional",
  });
}
