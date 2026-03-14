import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora DPVAT/SPVAT";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora DPVAT/SPVAT",
    description: "Valor do seguro obrigatório com coberturas incluídas",
    badge: "2026",
  });
}
