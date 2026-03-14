import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Calculadora de Transferência";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Calculadora de Transferência",
    description: "Estime o custo total para transferir seu veículo entre estados",
    badge: "Grátis",
  });
}
