import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Refinanciamento de Veículo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Refinanciamento de Veículo",
    description: "Simule o refinanciamento e veja se vale a pena reduzir a parcela",
    badge: "Simulador",
  });
}
