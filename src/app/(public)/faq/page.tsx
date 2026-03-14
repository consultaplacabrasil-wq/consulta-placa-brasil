import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { faqs, faqPageSeo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, CreditCard, Shield, Calculator, FileText, Car } from "lucide-react";

const defaultFaqs = [
  // Consulta de Placa
  {
    question: "O que é a Consulta Placa Brasil?",
    answer: "A Consulta Placa Brasil é a plataforma mais completa de consulta veicular do Brasil. Além de relatórios detalhados sobre qualquer veículo pela placa, oferecemos mais de 40 ferramentas gratuitas como calculadoras de IPVA, simuladores de financiamento, decodificadores de chassi e geradores de contrato.",
    category: "consulta",
  },
  {
    question: "Como funciona a consulta veicular?",
    answer: "Basta digitar a placa do veículo no campo de busca da página inicial. Você verá um preview gratuito com dados básicos. Para o relatório completo com histórico, sinistro, leilão, gravame, débitos e multas, escolha o tipo de consulta e realize o pagamento.",
    category: "consulta",
  },
  {
    question: "A consulta cobre todos os estados do Brasil?",
    answer: "Sim! Temos cobertura nacional completa em todos os 27 estados e Distrito Federal. Funciona com placas no formato antigo (AAA-0000) e no padrão Mercosul (AAA0A00).",
    category: "consulta",
  },
  {
    question: "Quais informações aparecem no relatório?",
    answer: "O relatório pode incluir dados cadastrais, histórico de proprietários, registro de sinistro, leilão, roubo/furto, gravame (financiamento), débitos de IPVA, multas, recall pendente, quilometragem e valor na tabela FIPE.",
    category: "consulta",
  },
  {
    question: "Posso consultar placa de moto, caminhão ou ônibus?",
    answer: "Sim! A consulta funciona para qualquer veículo emplacado no Brasil: carros, motos, caminhões, ônibus, vans, tratores e utilitários.",
    category: "consulta",
  },
  // Pagamento
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida e o relatório é liberado em segundos após a confirmação do pagamento.",
    category: "pagamento",
  },
  {
    question: "Quanto custa a consulta?",
    answer: "Temos diferentes opções a partir de R$ 13,90. A consulta básica gratuita mostra dados cadastrais, e os relatórios pagos incluem informações detalhadas como sinistro, leilão, gravame e débitos. Confira todas as opções na página inicial.",
    category: "pagamento",
  },
  {
    question: "Vocês oferecem pacotes com desconto?",
    answer: "Sim! Temos pacotes para lojistas e despachantes que fazem muitas consultas. Os pacotes oferecem preços reduzidos por consulta e são ideais para uso profissional.",
    category: "pagamento",
  },
  {
    question: "Posso usar cupom de desconto?",
    answer: "Sim! Na página de checkout, insira o código do cupom para receber desconto. Acompanhe nossas redes sociais para promoções e cupons exclusivos.",
    category: "pagamento",
  },
  // Segurança
  {
    question: "Meus dados pessoais estão protegidos?",
    answer: "Sim! Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus dados pessoais e de pagamento são protegidos com as melhores práticas de segurança do mercado.",
    category: "seguranca",
  },
  {
    question: "A consulta de placa é legal?",
    answer: "Sim. A consulta de dados públicos de veículos é permitida por lei. Nosso sistema acessa apenas informações de registro público disponibilizadas pelos órgãos oficiais de trânsito (Detran, Denatran, Secretarias da Fazenda).",
    category: "seguranca",
  },
  {
    question: "Os dados da consulta são confiáveis?",
    answer: "Sim. Todas as informações são obtidas de bases de dados oficiais como Detran, Denatran e Secretarias da Fazenda estaduais, atualizadas regularmente.",
    category: "seguranca",
  },
  // Ferramentas
  {
    question: "As ferramentas do site são gratuitas?",
    answer: "Sim! Todas as mais de 40 ferramentas são 100% gratuitas e não exigem cadastro. Incluem calculadoras de IPVA, multas, financiamento, depreciação, FIPE, geradores de contrato com PDF, simuladores de quitação, juros abusivos e muito mais.",
    category: "ferramentas",
  },
  {
    question: "A Consulta Tabela FIPE é atualizada?",
    answer: "Sim! A consulta FIPE utiliza a API oficial que é atualizada mensalmente com os novos valores publicados pela Fundação Instituto de Pesquisas Econômicas. Os dados são buscados em tempo real a cada consulta.",
    category: "ferramentas",
  },
  {
    question: "Como funciona o gerador de contrato?",
    answer: "Nosso gerador de contrato permite criar contratos de compra e venda para 6 tipos de veículos (carro, moto, caminhão, embarcação, ônibus e outros) com 10 cláusulas jurídicas completas. Você pode baixar o contrato em PDF, copiar o texto ou imprimir diretamente.",
    category: "ferramentas",
  },
  {
    question: "Vocês têm ferramentas para financiamento?",
    answer: "Sim! Oferecemos um conjunto completo de ferramentas de financiamento: simulador com tabelas Price e SAC, calculadora de CET (Custo Efetivo Total), calculadora de juros abusivos, simulador de quitação antecipada, antecipação de parcelas, portabilidade entre bancos, refinanciamento e calculadora de IOF.",
    category: "ferramentas",
  },
];

const categories = [
  { id: "consulta", label: "Consulta de Placa", icon: Search, count: 5 },
  { id: "pagamento", label: "Pagamento", icon: CreditCard, count: 4 },
  { id: "seguranca", label: "Segurança e Dados", icon: Shield, count: 3 },
  { id: "ferramentas", label: "Ferramentas", icon: Calculator, count: 4 },
];

async function getFaqData() {
  try {
    const faqList = await db.select().from(faqs).where(eq(faqs.active, true)).orderBy(faqs.sortOrder);
    return faqList.length > 0 ? faqList : null;
  } catch {
    return null;
  }
}

async function getSeoData() {
  try {
    const [seo] = await db.select().from(faqPageSeo).limit(1);
    return seo || null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoData();
  return {
    title: seo?.seoTitle || "Perguntas Frequentes | Consulta Placa",
    description: seo?.seoDescription || "Tire suas dúvidas sobre consulta de placa, formas de pagamento, segurança dos dados e cobertura nacional. Respostas rápidas sobre a Consulta Placa Brasil.",
    alternates: { canonical: seo?.seoCanonical || "https://consultaplacabrasil.com/faq" },
    robots: seo?.seoRobots || "index, follow",
    openGraph: {
      title: seo?.ogTitle || "Perguntas Frequentes",
      description: seo?.ogDescription || "Tire suas dúvidas sobre consulta de placa, pagamento e segurança dos dados.",
      images: seo?.ogImage ? [seo.ogImage] : undefined,
      url: seo?.ogUrl || "https://consultaplacabrasil.com/faq",
      type: "website",
    },
  };
}

export default async function FaqPage() {
  const dbFaqs = await getFaqData();

  const faqList = dbFaqs
    ? dbFaqs.map((f) => ({ ...f, category: "consulta" }))
    : defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">FAQ</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Perguntas Frequentes
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Encontre respostas para as dúvidas mais comuns sobre consulta veicular,
            pagamentos, segurança e nossas ferramentas gratuitas.
          </p>
        </div>
      </section>

      {/* Category Summary */}
      <section className="py-8 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF5F3] transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF4D30]/10 group-hover:bg-[#FF4D30]/20 transition-colors">
                  <cat.icon className="w-5 h-5 text-[#FF4D30]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{cat.label}</p>
                  <p className="text-xs text-[#94A3B8]">{cat.count} perguntas</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {categories.map((cat) => {
            const catFaqs = faqList.filter((f) => (f as { category?: string }).category === cat.id);
            if (catFaqs.length === 0) return null;
            return (
              <div key={cat.id} id={cat.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF4D30]/10">
                    <cat.icon className="w-5 h-5 text-[#FF4D30]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">{cat.label}</h2>
                </div>
                <Accordion className="space-y-3">
                  {catFaqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id || `${cat.id}-${index}`}
                      value={`${cat.id}-${index}`}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm px-6"
                    >
                      <AccordionTrigger className="text-left text-[#0F172A] font-semibold hover:text-[#FF4D30] hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#475569] leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CTA Contato */}
            <div className="rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4D30]/10 mb-4">
                <FileText className="w-7 h-7 text-[#FF4D30]" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">
                Ainda tem dúvidas?
              </h2>
              <p className="text-sm text-[#475569] mb-5">
                Entre em contato com nossa equipe de suporte.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-[#FF4D30] text-white font-medium hover:bg-[#E8432A] transition-colors"
              >
                Fale Conosco
              </Link>
            </div>

            {/* CTA Ferramentas */}
            <div className="rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4D30]/10 mb-4">
                <Car className="w-7 h-7 text-[#FF4D30]" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">
                Conheça nossas ferramentas
              </h2>
              <p className="text-sm text-[#475569] mb-5">
                Mais de 40 ferramentas gratuitas para veículos.
              </p>
              <Link
                href="/ferramentas"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-[#0F172A] text-white font-medium hover:bg-[#1E293B] transition-colors"
              >
                Ver Ferramentas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
