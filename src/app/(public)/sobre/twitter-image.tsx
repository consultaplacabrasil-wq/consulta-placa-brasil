import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";
export const runtime = "edge";
export const alt = "Quem Somos";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return generateOgImage({
    title: "Quem Somos",
    description: "Conheça a Consulta Placa Brasil, operada pela CONSULTA PLACA BRASIL LTDA",
    badge: "Sobre",
  });
}
