import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Custo por Km do Caminhão";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Custo por Km do Caminhão",
    description: "Custo operacional completo por quilômetro para caminhoneiros",
    badge: "Profissional",
  });
}
