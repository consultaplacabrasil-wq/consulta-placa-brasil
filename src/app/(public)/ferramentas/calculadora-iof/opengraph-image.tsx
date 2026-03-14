import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de IOF no Financiamento";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de IOF",
    description: "Calcule o IOF cobrado no financiamento do seu veículo",
    badge: "Impostos",
  });
}
