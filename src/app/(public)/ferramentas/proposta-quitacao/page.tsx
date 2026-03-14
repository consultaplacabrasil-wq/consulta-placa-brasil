import { Metadata } from "next";
import Link from "next/link";

import PropostaQuitacao from "@/components/ferramentas/proposta-quitacao";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gerador de Proposta de Quitação",
  description:
    "Gere uma proposta formal de quitação de financiamento para enviar ao banco. Modelo gratuito com base legal no CDC, pronto para copiar ou imprimir.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/proposta-quitacao",
  },
  openGraph: {
    title: "Proposta de Quitação | Consulta Placa",
    description:
      "Gere uma proposta formal de quitação para enviar ao banco. Gratuito e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/proposta-quitacao",
    type: "website",
  },
};

export default function PropostaQuitacaoPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Proposta de Quitação</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de Proposta de Quitação de Financiamento
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Crie uma proposta formal de quitação antecipada para enviar ao seu banco ou financeira, com fundamentação legal no Código de Defesa do Consumidor.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Gratuita
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Sem cadastro
            </span>
          </div>
        </div>
      </section>

      {/* Gerador */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <PropostaQuitacao />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Proposta de Quitação de Financiamento
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "O banco é obrigado a aceitar minha proposta de quitação?",
                answer: "Não. A proposta de quitação é uma negociação entre as partes. O banco não é obrigado a aceitar o valor proposto, mas o Código de Defesa do Consumidor garante ao consumidor o direito de solicitar a quitação antecipada com redução proporcional dos juros. A instituição financeira deve analisar a proposta e apresentar uma contraproposta, se for o caso.",
              },
              {
                question: "Qual o desconto médio que os bancos costumam conceder na quitação?",
                answer: "Os descontos variam conforme a instituição financeira, o tempo de atraso e o perfil do cliente. Em média, os bancos concedem descontos de 20% a 60% sobre o saldo devedor total, especialmente em contratos com muitas parcelas em atraso. Propostas à vista costumam receber descontos maiores do que propostas de pagamento parcelado.",
              },
              {
                question: "Posso enviar a proposta de quitação por e-mail?",
                answer: "Sim. A proposta pode ser enviada por e-mail, carta registrada ou entregue presencialmente em uma agência do banco. O envio por e-mail é a forma mais prática e rápida. Guarde sempre o comprovante de envio e solicite confirmação de recebimento para ter um registro da comunicação.",
              },
              {
                question: "Quais são meus direitos ao quitar um financiamento antecipadamente?",
                answer: "O artigo 52, parágrafo 2º, do Código de Defesa do Consumidor garante ao consumidor o direito à liquidação antecipada do débito, total ou parcialmente, mediante redução proporcional dos juros e demais acréscimos. Isso significa que o banco deve descontar os juros das parcelas futuras que não serão cobradas. A Lei nº 14.181/2021 também reforça a proteção ao consumidor superendividado.",
              },
              {
                question: "Em quanto tempo o banco deve responder à minha proposta?",
                answer: "Embora não exista um prazo legal específico para resposta, as normas do Banco Central do Brasil orientam as instituições financeiras a responderem solicitações de clientes em prazo razoável. Na proposta gerada, sugerimos o prazo de 10 dias úteis. Caso o banco não responda, o consumidor pode registrar uma reclamação no Banco Central ou no Procon.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-[#0F172A] font-semibold hover:text-[#FF4D30] transition-colors">
                  {item.question}
                  <span className="ml-4 text-[#FF4D30] group-open:rotate-45 transition-transform text-xl font-bold">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[#475569] leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como negociar a quitação de um financiamento com o banco
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Negociar a quitação de um financiamento de veículo é uma estratégia inteligente para
            quem deseja encerrar o contrato antes do prazo e economizar nos juros. O Código de
            Defesa do Consumidor, em seu artigo 52, parágrafo 2º, assegura ao consumidor o direito
            de liquidar antecipadamente qualquer dívida, com a devida redução proporcional dos juros
            e encargos financeiros. Isso significa que, ao propor a quitação, o banco deve
            obrigatoriamente recalcular o saldo devedor, descontando os juros que seriam cobrados
            nas parcelas futuras. Antes de iniciar a negociação, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar a situação do veículo pela placa
            </Link>{" "}
            para verificar se não existem pendências ou restrições que possam interferir no processo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Estratégias para obter um bom desconto na quitação
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para maximizar suas chances de obter um desconto significativo, algumas estratégias podem
            ser adotadas. Primeiro, reúna todas as informações do contrato: valor original, parcelas
            pagas, saldo devedor atualizado e taxa de juros. Quanto maior o número de parcelas
            restantes, maior tende a ser o desconto obtido, pois há mais juros futuros a serem
            abatidos. Propostas de pagamento à vista costumam receber descontos maiores do que
            propostas de pagamento parcelado. Além disso, se você está com parcelas em atraso, o
            banco tem interesse em receber ao menos uma parte do valor, o que pode favorecer a
            negociação. Utilize também a{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de financiamento
            </Link>{" "}
            para simular diferentes cenários e entender o impacto dos juros no valor total.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Seus direitos conforme o Código de Defesa do Consumidor
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O CDC é a principal base legal para a negociação de quitação de financiamentos. O artigo
            6º, inciso V, garante ao consumidor a modificação de cláusulas contratuais que
            estabeleçam prestações desproporcionais, além da revisão de fatos supervenientes que as
            tornem excessivamente onerosas. Já o artigo 52, parágrafo 2º, estabelece o direito à
            quitação antecipada com desconto proporcional dos juros. A Lei nº 14.181/2021 trouxe
            avanços importantes ao criar mecanismos de prevenção e tratamento do superendividamento
            do consumidor, facilitando a renegociação de dívidas em condições mais justas. Essas
            legislações, combinadas, oferecem ao consumidor uma base sólida para negociar com
            instituições financeiras em condições mais equilibradas.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas práticas para enviar sua proposta de quitação
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Ao enviar sua proposta de quitação, seja formal e objetivo. Inclua todos os dados do
            contrato para facilitar a identificação pela instituição financeira. Apresente um valor
            realista, considerando que descontos muito agressivos podem ser rejeitados de imediato.
            Uma boa prática é começar com um valor abaixo do que você realmente pode pagar, deixando
            margem para uma contraproposta. Envie a proposta por e-mail com confirmação de leitura
            ou por carta registrada, mantendo o comprovante de envio. Se o banco não responder em
            prazo razoável, registre uma reclamação no Banco Central do Brasil ou no Procon da sua
            cidade. Explore também as demais{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas gratuitas
            </Link>{" "}
            do Consulta Placa Brasil para auxiliar na gestão do seu veículo financiado.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> O modelo de proposta gerado por esta ferramenta é de caráter
              informativo e genérico. Cada instituição financeira possui critérios próprios de
              análise e aceitação de propostas de quitação. Para situações que envolvam valores
              elevados ou particularidades jurídicas, recomenda-se a consulta a um advogado
              especializado. O Consulta Placa Brasil não se responsabiliza pelo resultado da
              negociação.
            </p>
          </div>
        </div>
      </section>

      {/* Voltar para ferramentas */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link
            href="/ferramentas"
            className="inline-flex items-center text-[#FF4D30] font-semibold hover:underline transition-colors"
          >
            ← Ver todas as ferramentas
          </Link>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/quitacao-antecipada" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Quitação Antecipada</h3>
              <p className="text-sm text-[#64748B]">Simule a quitação antecipada do seu financiamento e descubra quanto pode economizar nos juros restantes.</p>
            </Link>
            <Link href="/ferramentas/atraso-parcelas" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Atraso de Parcelas</h3>
              <p className="text-sm text-[#64748B]">Calcule multas, juros de mora e encargos sobre parcelas em atraso do seu financiamento veicular.</p>
            </Link>
            <Link href="/ferramentas/juros-abusivos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se as taxas de juros do seu financiamento estão acima da média de mercado e conheça seus direitos.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gerador de Proposta de Quitação de Financiamento",
            description:
              "Gere uma proposta formal de quitação de financiamento para enviar ao banco, com fundamentação legal no Código de Defesa do Consumidor. Gratuito e sem cadastro.",
            url: "https://consultaplacabrasil.com/ferramentas/proposta-quitacao",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            provider: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              url: "https://consultaplacabrasil.com",
            },
          }),
        }}
      />

      {/* Schema: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O banco é obrigado a aceitar minha proposta de quitação?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. A proposta de quitação é uma negociação entre as partes. O banco não é obrigado a aceitar o valor proposto, mas o Código de Defesa do Consumidor garante ao consumidor o direito de solicitar a quitação antecipada com redução proporcional dos juros. A instituição financeira deve analisar a proposta e apresentar uma contraproposta, se for o caso.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o desconto médio que os bancos costumam conceder na quitação?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Os descontos variam conforme a instituição financeira, o tempo de atraso e o perfil do cliente. Em média, os bancos concedem descontos de 20% a 60% sobre o saldo devedor total, especialmente em contratos com muitas parcelas em atraso. Propostas à vista costumam receber descontos maiores do que propostas de pagamento parcelado.",
                },
              },
              {
                "@type": "Question",
                name: "Posso enviar a proposta de quitação por e-mail?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. A proposta pode ser enviada por e-mail, carta registrada ou entregue presencialmente em uma agência do banco. O envio por e-mail é a forma mais prática e rápida. Guarde sempre o comprovante de envio e solicite confirmação de recebimento para ter um registro da comunicação.",
                },
              },
              {
                "@type": "Question",
                name: "Quais são meus direitos ao quitar um financiamento antecipadamente?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O artigo 52, parágrafo 2º, do Código de Defesa do Consumidor garante ao consumidor o direito à liquidação antecipada do débito, total ou parcialmente, mediante redução proporcional dos juros e demais acréscimos. Isso significa que o banco deve descontar os juros das parcelas futuras que não serão cobradas. A Lei nº 14.181/2021 também reforça a proteção ao consumidor superendividado.",
                },
              },
              {
                "@type": "Question",
                name: "Em quanto tempo o banco deve responder à minha proposta?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Embora não exista um prazo legal específico para resposta, as normas do Banco Central do Brasil orientam as instituições financeiras a responderem solicitações de clientes em prazo razoável. Na proposta gerada, sugerimos o prazo de 10 dias úteis. Caso o banco não responda, o consumidor pode registrar uma reclamação no Banco Central ou no Procon.",
                },
              },
            ],
          }),
        }}
      />

      {/* Schema: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://consultaplacabrasil.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ferramentas",
                item: "https://consultaplacabrasil.com/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Proposta de Quitação de Financiamento",
                item: "https://consultaplacabrasil.com/ferramentas/proposta-quitacao",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
