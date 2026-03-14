import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Rodízio de Veículos SP";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Rodízio de Veículos SP",
    description: "Descubra o dia de restrição do seu veículo em São Paulo",
    badge: "Grátis",
  });
}
