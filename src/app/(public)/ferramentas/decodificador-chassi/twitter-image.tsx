import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Decodificador de Chassi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Decodificador de Chassi",
    description: "Descubra fabricante, país e ano do veículo pelo número do chassi",
    badge: "Grátis",
  });
}
