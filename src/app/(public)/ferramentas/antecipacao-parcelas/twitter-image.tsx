import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Antecipação de Parcelas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Antecipação de Parcelas",
    description: "Simule a economia ao antecipar parcelas do financiamento",
    badge: "Grátis",
  });
}
