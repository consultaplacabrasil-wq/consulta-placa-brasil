import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Combustível por Viagem";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Combustível por Viagem",
    description: "Calcule litros, custo e divida entre passageiros para sua viagem",
    badge: "Grátis",
  });
}
