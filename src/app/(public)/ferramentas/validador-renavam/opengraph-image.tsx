import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Validador de RENAVAM";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Validador de RENAVAM",
    description: "Verifique se o número RENAVAM é válido pelo módulo 11",
    badge: "Grátis",
  });
}
