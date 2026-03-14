import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Simulador de Financiamento";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Simulador de Financiamento",
    description: "Simule parcelas Price e SAC com tabela de amortização completa",
    badge: "Grátis",
  });
}
