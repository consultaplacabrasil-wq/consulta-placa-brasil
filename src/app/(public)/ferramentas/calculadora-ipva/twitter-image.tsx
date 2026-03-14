import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de IPVA 2026";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de IPVA 2026",
    description: "Calcule o IPVA do seu veículo por estado com parcelamento e desconto à vista",
    badge: "Grátis",
  });
}
