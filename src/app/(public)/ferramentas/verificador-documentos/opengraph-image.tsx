import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Verificador de Documentos";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Verificador de Documentos",
    description: "Verifique vencimento da CNH e calendário de licenciamento",
    badge: "Grátis",
  });
}
