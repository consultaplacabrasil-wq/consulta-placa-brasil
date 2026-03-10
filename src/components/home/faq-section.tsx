"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    id: "1",
    question: "Como funciona a consulta de placa veicular?",
    answer: "Basta digitar a placa do veículo no campo de busca e clicar em consultar. Nosso sistema acessa diversas bases de dados oficiais e retorna um relatório completo em poucos segundos.",
  },
  {
    id: "2",
    question: "Quais informações estão disponíveis no relatório?",
    answer: "O relatório pode incluir dados cadastrais, histórico de proprietários, registro de sinistros, leilão, roubo/furto, gravames, débitos, multas, recall pendente, quilometragem e tabela FIPE.",
  },
  {
    id: "3",
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos pagamento via Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida.",
  },
  {
    id: "4",
    question: "Os dados são confiáveis e atualizados?",
    answer: "Sim, nossas informações são obtidas de bases de dados oficiais como DETRAN, DENATRAN e Secretarias da Fazenda.",
  },
  {
    id: "5",
    question: "Posso consultar veículos de qualquer estado?",
    answer: "Sim! Cobertura nacional completa: todos os 27 estados e Distrito Federal, tanto placa antiga quanto Mercosul.",
  },
  {
    id: "6",
    question: "Meus dados pessoais estão seguros?",
    answer: "Utilizamos criptografia de ponta a ponta e estamos em conformidade com a LGPD.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqList, setFaqList] = useState<FaqItem[]>(defaultFaqs);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/admin/faq");
        if (res.ok) {
          const data = await res.json();
          const activeFaqs = data.filter((f: { active: boolean }) => f.active);
          if (activeFaqs.length > 0) {
            setFaqList(activeFaqs);
          }
        }
      } catch {
        // Use defaults
      }
    }
    fetchFaqs();
  }, []);

  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Perguntas e Respostas
          </h2>
          <p className="mt-3 text-[#64748B]">
            Tire suas principais dúvidas sobre a plataforma
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, index) => (
            <div
              key={faq.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <h3 className="text-sm font-semibold text-[#0F172A] md:text-base">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#FF4D30] transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-4 text-sm text-[#64748B] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
