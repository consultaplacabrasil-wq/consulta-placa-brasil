import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador de ATPV-e";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gerador de ATPV-e",
    description: "Modelo de autorização de transferência de veículo",
    badge: "Grátis",
  });
}
