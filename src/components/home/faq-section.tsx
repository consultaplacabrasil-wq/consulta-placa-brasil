"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Como funciona a consulta de placa veicular?",
    answer:
      "Basta digitar a placa do veículo no campo de busca e clicar em consultar. Nosso sistema acessa diversas bases de dados oficiais e retorna um relatório completo com todas as informações disponíveis sobre o veículo em poucos segundos.",
  },
  {
    question: "Quais informações estão disponíveis no relatório?",
    answer:
      "O relatório pode incluir dados cadastrais, histórico de proprietários, registro de sinistros, leilão, roubo/furto, gravames, débitos, multas, recall pendente, quilometragem, tabela FIPE, entre outros. As informações variam conforme o tipo de consulta escolhida.",
  },
  {
    question: "A consulta básica é realmente gratuita?",
    answer:
      "Sim! A consulta básica é totalmente gratuita e não requer cadastro. Ela mostra dados cadastrais gerais, situação do veículo, tipo, UF de registro e indicadores de sinistro e leilão. Para informações mais detalhadas, você pode adquirir um relatório completo ou premium.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos pagamento via Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida, pois o relatório é liberado imediatamente após a confirmação do pagamento.",
  },
  {
    question: "Os dados do relatório são confiáveis e atualizados?",
    answer:
      "Sim, nossas informações são obtidas de bases de dados oficiais e atualizadas regularmente. Trabalhamos com fontes como DETRAN, DENATRAN, Secretarias da Fazenda e outros órgãos governamentais para garantir a máxima precisão dos dados.",
  },
  {
    question: "Como funcionam os pacotes de consultas?",
    answer:
      "Os pacotes permitem comprar múltiplas consultas com desconto. Quanto maior o pacote, maior a economia por consulta. São ideais para lojistas, revendedores e profissionais que realizam consultas frequentes. Os créditos não expiram.",
  },
  {
    question: "Posso consultar veículos de qualquer estado do Brasil?",
    answer:
      "Sim! Nossa plataforma tem cobertura nacional, abrangendo todos os 27 estados brasileiros e o Distrito Federal. Você pode consultar qualquer veículo registrado em território nacional, tanto no formato de placa antigo quanto no padrão Mercosul.",
  },
  {
    question: "Meus dados pessoais estão seguros na plataforma?",
    answer:
      "Absolutamente. Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus dados pessoais e de pagamento são protegidos com os mais altos padrões de segurança do mercado.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-bold text-[#1A1A2E]">
            Perguntas e Respostas
          </h2>
          <p className="mt-3 text-[#64748B]">
            Tire suas principais dúvidas sobre a plataforma
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <h3 className="text-sm font-semibold text-[#1A1A2E] md:text-base">
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
