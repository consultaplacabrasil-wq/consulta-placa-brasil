import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gasolina ou Etanol?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gasolina ou Etanol?",
    description: "Descubra qual combustível é mais vantajoso para seu veículo flex",
    badge: "Grátis",
  });
}
