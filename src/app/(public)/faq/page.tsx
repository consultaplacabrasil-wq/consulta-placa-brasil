import { Metadata } from "next";
import { db } from "@/lib/db";
import { faqs, faqPageSeo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultFaqs = [
  {
    question: "O que é a Consulta Placa Brasil?",
    answer: "A Consulta Placa Brasil é uma plataforma online que permite consultar informações detalhadas sobre veículos a partir da placa.",
  },
  {
    question: "Como funciona a consulta veicular?",
    answer: "O processo é simples: informe a placa do veículo, escolha o tipo de consulta e realize o pagamento. Em poucos segundos, você recebe o relatório completo.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim! Utilizamos criptografia e estamos em conformidade com a LGPD. Seus dados pessoais são protegidos com os mais altos padrões de segurança.",
  },
  {
    question: "A consulta cobre todos os estados do Brasil?",
    answer: "Sim! Cobertura nacional completa: todos os 27 estados e Distrito Federal.",
  },
  {
    question: "Posso consultar placas no formato Mercosul?",
    answer: "Sim! Aceitamos tanto o formato antigo (AAA-0000) quanto o formato Mercosul (AAA0A00).",
  },
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
    title: seo?.seoTitle || "Perguntas Frequentes - Consulta Placa Brasil",
    description: seo?.seoDescription || "Tire suas dúvidas sobre consulta de placa, formas de pagamento, segurança dos dados e cobertura nacional. Respostas rápidas sobre a Consulta Placa Brasil.",
    alternates: { canonical: seo?.seoCanonical || "https://consultaplacabrasil.com/faq" },
    robots: seo?.seoRobots || "index, follow",
    openGraph: {
      title: seo?.ogTitle || "Perguntas Frequentes",
      description: seo?.ogDescription || "Tire suas dúvidas sobre consulta de placa, pagamento e segurança dos dados.",
      images: seo?.ogImage ? [seo.ogImage] : undefined,
      url: seo?.ogUrl || "https://consultaplacabrasil.com/faq",
    },
  };
}

export default async function FaqPage() {
  const dbFaqs = await getFaqData();
  const faqList = dbFaqs || defaultFaqs.map((f, i) => ({ ...f, id: String(i), sortOrder: i, active: true }));

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
      <section className="bg-[#0F172A] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços de
            consulta veicular.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion className="space-y-4">
            {faqList.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
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

          {/* CTA */}
          <div className="mt-16 text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">
              Ainda tem dúvidas?
            </h2>
            <p className="text-[#475569] mb-6">
              Entre em contato com nossa equipe de suporte.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-[#FF4D30] text-white font-medium hover:bg-[#E8432A] transition-colors"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
