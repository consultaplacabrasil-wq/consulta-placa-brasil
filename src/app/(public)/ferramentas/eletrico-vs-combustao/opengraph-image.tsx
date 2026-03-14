import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Elétrico vs Combustão";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Elétrico vs Combustão",
    description: "Compare custos de propriedade em 5 anos e descubra o breakeven",
    badge: "Comparador",
  });
}
