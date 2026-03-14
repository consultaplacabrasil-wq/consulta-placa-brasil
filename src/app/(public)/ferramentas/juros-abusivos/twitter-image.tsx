import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Juros Abusivos no Financiamento";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Juros Abusivos no Financiamento",
    description: "Compare sua taxa com a média do Banco Central e descubra se há abusividade",
    badge: "Seus Direitos",
  });
}
