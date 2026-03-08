import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Tire suas dúvidas sobre a Consulta Placa Brasil. Veja as perguntas mais frequentes sobre consultas veiculares, preços, segurança e mais.",
};

const faqs = [
  {
    question: "O que é a Consulta Placa Brasil?",
    answer:
      "A Consulta Placa Brasil é uma plataforma online que permite consultar informações detalhadas sobre veículos a partir da placa. Nosso serviço reúne dados de diversas fontes oficiais para oferecer um relatório completo sobre o histórico do veículo, incluindo situação cadastral, débitos, restrições, sinistros e muito mais.",
  },
  {
    question: "Como funciona a consulta veicular?",
    answer:
      "O processo é simples e rápido: basta informar a placa do veículo no campo de consulta, escolher o tipo de relatório desejado e realizar o pagamento. Em poucos segundos, você recebe um relatório completo com todas as informações disponíveis sobre o veículo consultado.",
  },
  {
    question: "Quais tipos de relatório estão disponíveis?",
    answer:
      "Oferecemos diferentes tipos de relatório para atender às suas necessidades: Relatório Básico (dados cadastrais e situação do veículo), Relatório Completo (inclui histórico de sinistros, débitos, restrições, recalls e leilões) e Relatório Premium (todas as informações anteriores mais score de confiabilidade e análise de mercado).",
  },
  {
    question: "Quanto custa uma consulta?",
    answer:
      "Os valores variam conforme o tipo de relatório escolhido. O Relatório Básico tem um valor acessível a partir de R$ 9,90, o Relatório Completo a partir de R$ 29,90 e o Relatório Premium a partir de R$ 49,90. Também oferecemos pacotes com desconto para múltiplas consultas.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos diversas formas de pagamento para sua conveniência: cartão de crédito (Visa, Mastercard, Elo, American Express), cartão de débito, PIX (pagamento instantâneo com desconto), e boleto bancário. Todos os pagamentos são processados de forma segura.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim, a segurança dos seus dados é nossa prioridade máxima. Utilizamos criptografia SSL/TLS de 256 bits em todas as transações, nossos servidores são protegidos por firewalls de última geração e seguimos rigorosamente todas as diretrizes da Lei Geral de Proteção de Dados (LGPD). Seus dados pessoais nunca são compartilhados com terceiros sem sua autorização.",
  },
  {
    question: "Posso solicitar reembolso?",
    answer:
      "Sim. Caso o relatório não contenha as informações esperadas ou haja algum erro nos dados apresentados, você pode solicitar reembolso em até 7 dias após a compra, conforme o Código de Defesa do Consumidor. Basta entrar em contato com nosso suporte informando o motivo da solicitação.",
  },
  {
    question: "A consulta cobre todos os estados do Brasil?",
    answer:
      "Sim! Nossa plataforma oferece cobertura nacional completa, abrangendo todos os 27 estados brasileiros, incluindo o Distrito Federal. Independentemente de onde o veículo esteja registrado, conseguimos fornecer informações detalhadas e atualizadas.",
  },
  {
    question: "De onde vêm os dados das consultas?",
    answer:
      "Nossos dados são obtidos de fontes oficiais e confiáveis, incluindo bases do DETRAN, DENATRAN, Secretaria da Fazenda, seguradoras, leiloeiros credenciados e outros órgãos governamentais. As informações são atualizadas regularmente para garantir a máxima precisão dos relatórios.",
  },
  {
    question: "Como a Consulta Placa Brasil trata meus dados conforme a LGPD?",
    answer:
      "Estamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Coletamos apenas os dados estritamente necessários para a prestação do serviço, oferecemos total transparência sobre o uso dos dados, garantimos seus direitos de acesso, correção e exclusão, e contamos com um Encarregado de Proteção de Dados (DPO) dedicado. Você pode exercer seus direitos a qualquer momento através da nossa página de LGPD.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços de
            consulta veicular.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
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
              Entre em contato com nossa equipe de suporte. Estamos prontos para
              ajudá-lo.
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
