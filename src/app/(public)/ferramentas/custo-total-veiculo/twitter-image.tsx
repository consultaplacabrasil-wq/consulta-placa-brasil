import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Custo Total do Veículo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Custo Total do Veículo",
    description: "Quanto seu carro custa por mês com IPVA, combustível e manutenção",
    badge: "Grátis",
  });
}
