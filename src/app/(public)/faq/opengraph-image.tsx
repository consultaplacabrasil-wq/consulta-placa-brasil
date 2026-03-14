import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Perguntas Frequentes";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Perguntas Frequentes",
    description: "Tire suas dúvidas sobre consulta de placa e nossos serviços",
    badge: "FAQ",
  });
}
