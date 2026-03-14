import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador Visual de Placa";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gerador Visual de Placa",
    description: "Visualize sua placa nos padrões Mercosul e antigo em tempo real",
    badge: "Grátis",
  });
}
