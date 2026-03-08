import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Consulta Placa Brasil — Consulte qualquer veículo pela placa",
    template: "%s | Consulta Placa Brasil",
  },
  description:
    "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais. Resultado instantâneo.",
  keywords: [
    "consulta placa",
    "consultar placa",
    "consulta veicular",
    "relatório veicular",
    "sinistro",
    "leilão",
    "débitos veículo",
    "multas",
    "FIPE",
  ],
  authors: [{ name: "Consulta Placa Brasil" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://consultaplacabrasil.com.br",
    siteName: "Consulta Placa Brasil",
    title: "Consulta Placa Brasil — Consulte qualquer veículo pela placa",
    description:
      "Relatório completo com histórico, sinistro, leilão, débitos, multas e mais. Resultado instantâneo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${lexend.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
