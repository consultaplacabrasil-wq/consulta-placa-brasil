import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Identificador de Placa";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Identificador de Placa",
    description: "Descubra se a placa é Mercosul ou antiga e veja a representação visual",
    badge: "Grátis",
  });
}
