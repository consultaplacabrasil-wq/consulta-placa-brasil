"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FaqItem {
  question: string;
  answer: string;
}

const faqsByCategory: Record<string, FaqItem[]> = {
  consulta: [
    {
      question: "Como consultar a placa de um veículo?",
      answer:
        "Basta digitar a placa no campo de busca e clicar em consultar. Nosso sistema acessa bases oficiais dos Detrans e retorna um relatório completo em poucos segundos. Funciona com placa antiga e placa Mercosul.",
    },
    {
      question: "É possível pesquisar placa de carro gratuitamente?",
      answer:
        "Sim, a consulta básica é gratuita e mostra dados cadastrais do veículo. Para relatórios completos com histórico de sinistro, leilão, gravame e débitos, oferecemos diferentes opções de consulta.",
    },
    {
      question: "Como puxar placa de carro pelo celular?",
      answer:
        "Acesse nosso site pelo navegador do celular, digite a placa e faça a consulta normalmente. O sistema é 100% responsivo e funciona em qualquer dispositivo.",
    },
    {
      question: "Posso consultar placa de moto também?",
      answer:
        "Sim! A consulta funciona para carros, motos, caminhões e qualquer veículo emplacado no Brasil, em todos os 27 estados e Distrito Federal.",
    },
    {
      question: "Quais informações aparecem na consulta veicular?",
      answer:
        "O relatório pode incluir dados cadastrais, histórico de proprietários, registro de sinistro, leilão, roubo/furto, gravame, débitos, multas, recall pendente, quilometragem e tabela FIPE.",
    },
    {
      question: "É possível consultar o chassi pela placa?",
      answer:
        "Sim, nosso relatório inclui o número do chassi e o Renavam do veículo, além de todos os dados cadastrais nacionais e estaduais.",
    },
  ],
  pagamento: [
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida e o relatório é liberado em segundos após o pagamento.",
    },
    {
      question: "Quanto custa para consultar placa?",
      answer:
        "Temos diferentes opções de consulta a partir de R$ 13,90. A consulta básica gratuita mostra dados cadastrais, e os relatórios pagos incluem informações detalhadas como sinistro, leilão e débitos.",
    },
    {
      question: "Posso usar cupom de desconto?",
      answer:
        "Sim! Na página de checkout, insira o código do cupom para receber desconto. Fique atento às nossas promoções nas redes sociais.",
    },
    {
      question: "Vocês oferecem pacotes para quem consulta muitas placas?",
      answer:
        "Sim, temos pacotes para lojistas e despachantes que fazem muitas consultas. Os pacotes oferecem preços reduzidos por consulta e são ideais para uso profissional.",
    },
  ],
  seguranca: [
    {
      question: "Os dados da consulta são confiáveis?",
      answer:
        "Sim, todas as informações são obtidas de bases de dados oficiais como Detran, Denatran e Secretarias da Fazenda, atualizadas em tempo real.",
    },
    {
      question: "Meus dados pessoais estão protegidos?",
      answer:
        "Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD. Seus dados pessoais e de pagamento são protegidos com as melhores práticas de segurança.",
    },
    {
      question: "A consulta de placa é legal?",
      answer:
        "Sim, a consulta de dados públicos de veículos é permitida por lei. Nosso sistema acessa apenas informações de registro público disponibilizadas pelos órgãos oficiais de trânsito.",
    },
    {
      question: "Posso consultar a placa de qualquer veículo do Brasil?",
      answer:
        "Sim, temos cobertura nacional completa com todos os 27 estados e Distrito Federal. Funciona para veículos com placa antiga (AAA-0000) e placa Mercosul (AAA0A00).",
    },
  ],
};

const allFaqs = Object.values(faqsByCategory).flat();

const categoryTabs = [
  { value: "consulta", label: "Consulta" },
  { value: "pagamento", label: "Pagamento" },
  { value: "seguranca", label: "Segurança" },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
  );
}

export function FaqSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#C73A1E] uppercase tracking-wider mb-2">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Perguntas e Respostas
          </h2>
          <p className="mt-3 text-[#64748B]">
            Tire suas principais dúvidas sobre a plataforma
          </p>
        </div>

        <Tabs defaultValue="consulta">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex rounded-full border border-gray-200 bg-white p-1 h-auto">
              {categoryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border-0 data-[state=active]:bg-[#FF4D30] data-[state=active]:text-white text-[#0F172A] hover:bg-gray-50"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categoryTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <FaqAccordion items={faqsByCategory[tab.value]} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* FAQPage Schema — all questions from all tabs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
