import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Portabilidade de Financiamento";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Portabilidade de Financiamento",
    description: "Compare seu banco atual com outro e veja quanto pode economizar",
    badge: "Compare",
  });
}
