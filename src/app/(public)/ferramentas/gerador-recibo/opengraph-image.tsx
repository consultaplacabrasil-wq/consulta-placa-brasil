import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador de Recibo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Gerador de Recibo",
    description: "Recibo de compra e venda de veículo pronto para imprimir",
    badge: "Grátis",
  });
}
