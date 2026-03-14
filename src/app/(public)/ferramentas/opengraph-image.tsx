import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "29 Ferramentas Gratuitas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "29 Ferramentas Gratuitas",
    description: "Calculadoras, simuladores e geradores para veículos",
    badge: "Todas grátis",
  });
}
