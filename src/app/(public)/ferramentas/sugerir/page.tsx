import { Metadata } from "next";
import Link from "next/link";
import { SugestaoForm } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Sugerir Ferramenta",
  description:
    "Sugira uma nova ferramenta veicular para o Consulta Placa Brasil. Sua ideia pode virar uma ferramenta gratuita para milhares de pessoas.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/sugerir",
  },
  robots: { index: false, follow: true },
};

export default function SugerirFerramentaPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center text-sm text-gray-400 mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/ferramentas"
              className="hover:text-white transition-colors"
            >
              Ferramentas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Sugerir Ferramenta</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Sugira uma nova ferramenta
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Sentiu falta de alguma calculadora, simulador ou gerador? Conte para
            nós e nossa equipe vai avaliar a criação. Você pode sugerir quantas
            ferramentas quiser de uma só vez.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <SugestaoForm />
          </div>
        </div>
      </section>
    </div>
  );
}
