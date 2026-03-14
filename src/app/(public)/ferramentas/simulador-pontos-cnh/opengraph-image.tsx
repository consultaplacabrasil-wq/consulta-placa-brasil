import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Simulador de Pontos CNH";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Simulador de Pontos CNH",
    description: "Simule pontos na CNH e calcule o risco de suspensão",
    badge: "Grátis",
  });
}
