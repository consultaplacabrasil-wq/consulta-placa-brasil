import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";
export const runtime = "edge";
export const alt = "Política de Privacidade";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return generateOgImage({
    title: "Política de Privacidade",
    description: "Como coletamos, usamos e protegemos seus dados pessoais",
    badge: "LGPD",
  });
}
