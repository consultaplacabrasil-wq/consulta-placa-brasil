import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";
export const runtime = "edge";
export const alt = "Termos de Uso";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return generateOgImage({
    title: "Termos de Uso",
    description: "Termos e condições de uso da plataforma Consulta Placa Brasil",
    badge: "Legal",
  });
}
