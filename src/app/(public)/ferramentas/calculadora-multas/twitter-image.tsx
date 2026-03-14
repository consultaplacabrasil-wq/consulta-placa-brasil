import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de Multas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de Multas",
    description: "Valor atualizado de qualquer infração do CTB com pontos na CNH",
    badge: "Grátis",
  });
}
