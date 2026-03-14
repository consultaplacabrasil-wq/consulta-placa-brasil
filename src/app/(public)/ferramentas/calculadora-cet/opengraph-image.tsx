import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de CET";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de CET",
    description: "Descubra o custo efetivo total do seu financiamento com todas as taxas",
    badge: "Transparência",
  });
}
