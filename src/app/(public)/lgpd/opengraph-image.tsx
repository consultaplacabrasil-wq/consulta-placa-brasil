import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "LGPD";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "LGPD",
    description: "Seus direitos e como tratamos seus dados pessoais",
    badge: "Proteção de Dados",
  });
}
