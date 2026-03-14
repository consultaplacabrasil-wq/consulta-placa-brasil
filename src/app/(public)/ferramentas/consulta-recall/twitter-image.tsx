import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Consulta de Recall";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Consulta de Recall",
    description: "Verifique recalls recentes por marca e modelo do veículo",
    badge: "Segurança",
  });
}
