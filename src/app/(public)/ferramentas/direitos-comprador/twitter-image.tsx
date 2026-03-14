import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Direitos do Comprador de Veículos";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Direitos do Comprador",
    description: "Conheça seus direitos na compra, financiamento e transferência de veículos",
    badge: "Seus Direitos",
  });
}
