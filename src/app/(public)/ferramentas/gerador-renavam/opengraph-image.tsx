import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador de RENAVAM";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gerador de RENAVAM",
    description: "Gere números RENAVAM válidos para testes de software",
    badge: "Desenvolvedores",
  });
}
