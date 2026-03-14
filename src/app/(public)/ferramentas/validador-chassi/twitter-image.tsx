import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Validador de Chassi VIN";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Validador de Chassi VIN",
    description: "Valide o chassi pelo dígito verificador ISO 3779",
    badge: "Grátis",
  });
}
