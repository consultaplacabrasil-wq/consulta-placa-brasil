import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Checklist de Manutenção";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Checklist de Manutenção",
    description: "Manutenção preventiva por quilometragem para carro, moto e caminhão",
    badge: "Grátis",
  });
}
