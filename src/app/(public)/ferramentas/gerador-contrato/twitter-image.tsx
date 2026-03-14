import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador de Contrato";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gerador de Contrato",
    description: "Contrato de compra e venda de veículo pronto para imprimir",
    badge: "Grátis",
  });
}
