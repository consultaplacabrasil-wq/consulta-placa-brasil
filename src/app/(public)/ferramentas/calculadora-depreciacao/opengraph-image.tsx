import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de Depreciação";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de Depreciação",
    description: "Estime quanto seu veículo vai desvalorizar nos próximos 5 anos",
    badge: "Grátis",
  });
}
