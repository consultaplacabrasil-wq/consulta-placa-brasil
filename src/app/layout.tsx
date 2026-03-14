import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://consultaplacabrasil.com.br"),
  title: {
    default: "Consulta Placa Brasil | Consultar Placa de Veículo, Carro e Moto",
    template: "%s | Consulta Placa Brasil",
  },
  description:
    "Consulte qualquer veículo pela placa. Pesquise placa de carro, moto ou caminhão e receba relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  keywords: [
    "consulta placa",
    "consultar placa",
    "consulta veicular",
    "consultar placa de veículo",
    "consultar placa de carro",
    "pesquisar placa de carro",
    "puxar placa de carro",
    "buscar placa",
    "consulta placa moto",
    "verificar placa",
    "relatório veicular",
    "sinistro",
    "leilão",
    "gravame",
    "débitos veículo",
    "multas",
    "FIPE",
    "consulta placa mercosul",
  ],
  authors: [{ name: "Consulta Placa Brasil" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://consultaplacabrasil.com.br",
    siteName: "Consulta Placa Brasil",
    title: "Consulta Placa Brasil | Consultar Placa de Veículo, Carro e Moto",
    description:
      "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consulta Placa Brasil | Consultar Placa de Veículo, Carro e Moto",
    description:
      "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, gravame, débitos e multas.",
  },
  alternates: {
    canonical: "https://consultaplacabrasil.com.br",
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
      <head>
        <AnalyticsScripts />
      </head>
      <body className={`${lexend.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
