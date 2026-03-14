import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Conversor de Placa";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Conversor de Placa",
    description: "Converta placas entre formato antigo e Mercosul automaticamente",
    badge: "Grátis",
  });
}
