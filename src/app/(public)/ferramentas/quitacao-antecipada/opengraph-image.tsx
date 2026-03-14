import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Quitação Antecipada";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Quitação Antecipada",
    description: "Calcule quanto economiza quitando seu financiamento antes do prazo",
    badge: "Grátis",
  });
}
