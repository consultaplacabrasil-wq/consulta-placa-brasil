import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Gerador de Contrato de Veículo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Contrato de Compra e Venda",
    description: "Gere contratos para carro, moto, caminhão, embarcação com download em PDF",
    badge: "PDF Grátis",
  });
}
