import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Proposta de Quitação";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Proposta de Quitação",
    description: "Gere uma proposta formal de quitação para enviar ao banco",
    badge: "Grátis",
  });
}
