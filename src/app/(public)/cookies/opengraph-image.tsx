import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";
export const runtime = "edge";
export const alt = "Política de Cookies";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return generateOgImage({
    title: "Política de Cookies",
    description: "Como utilizamos cookies para melhorar sua experiência",
    badge: "Legal",
  });
}
