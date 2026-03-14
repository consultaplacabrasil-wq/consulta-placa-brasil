import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Contato";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return generateOgImage({
    title: "Contato",
    description: "Fale conosco por e-mail, telefone ou WhatsApp",
    badge: "Atendimento",
  });
}
