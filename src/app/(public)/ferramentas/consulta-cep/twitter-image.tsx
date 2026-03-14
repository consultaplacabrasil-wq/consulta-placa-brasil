import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Consulta CEP";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Consulta CEP",
    description: "Verifique se a transferência exige novo emplacamento",
    badge: "Grátis",
  });
}
