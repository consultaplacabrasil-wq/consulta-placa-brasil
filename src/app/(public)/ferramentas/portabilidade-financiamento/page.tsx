import { Metadata } from "next";
import Link from "next/link";
import PortabilidadeFinanciamento from "@/components/ferramentas/portabilidade-financiamento";

export const metadata: Metadata = {
  title: "Portabilidade de Financiamento | Consulta Placa",
  description:
    "Compare seu financiamento atual com outra proposta e descubra se vale a pena fazer a portabilidade. Calcule economia mensal e total. Grátis e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/portabilidade-financiamento",
  },
  openGraph: {
    title: "Portabilidade de Financiamento | Consulta Placa",
    description:
      "Compare seu banco atual com outro e veja quanto pode economizar na portabilidade do seu financiamento veicular.",
    url: "https://consultaplacabrasil.com/ferramentas/portabilidade-financiamento",
    type: "website",
  },
};

export default function PortabilidadeFinanciamentoPage() {
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
            <span className="text-gray-300">Portabilidade de Financiamento</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Portabilidade de Financiamento
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Compare as condições do seu financiamento atual com uma nova proposta e descubra se a portabilidade vale a pena para o seu bolso.
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

      {/* Calculadora */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <PortabilidadeFinanciamento />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é a portabilidade de financiamento veicular?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A portabilidade de crédito é um direito garantido pelo Banco Central do Brasil por
            meio da Resolução nº 4.292/2013. Ela permite que o consumidor transfira seu
            financiamento de veículo de uma instituição financeira para outra que ofereça
            condições mais vantajosas, como taxas de juros menores ou prazos mais adequados
            ao seu orçamento. Antes de iniciar o processo, recomendamos{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar a placa
            </Link>{" "}
            do veículo para garantir que a documentação esteja em ordem.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Na prática, o novo banco quita a dívida junto à instituição original e firma
            um novo contrato com o cliente. O saldo devedor é transferido, e as novas
            condições passam a valer imediatamente. O processo é regulamentado e as
            instituições financeiras são obrigadas a facilitar a operação, não podendo
            cobrar tarifas abusivas ou criar obstáculos para impedir a transferência.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona o processo de portabilidade?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O primeiro passo é solicitar ao banco atual o saldo devedor atualizado e as
            condições completas do contrato vigente. Com essas informações em mãos, o
            consumidor pode procurar outras instituições financeiras e negociar propostas
            melhores. Ao encontrar uma oferta vantajosa, basta formalizar a portabilidade
            junto ao novo banco, que cuidará de toda a operação.
          </p>
          <p className="text-[#475569] leading-relaxed">
            É importante destacar que, ao receber o pedido de portabilidade, o banco atual
            tem até 5 dias úteis para apresentar uma contraproposta. Muitos consumidores
            conseguem condições ainda melhores nessa etapa de negociação, sem precisar
            trocar de instituição. Use nossa{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simulador de financiamento
            </Link>{" "}
            para comparar cenários com diferentes taxas e prazos.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Custos e cuidados na portabilidade
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O processo de portabilidade pode envolver custos como nova avaliação do
            veículo, registro do novo contrato no cartório e emissão de novo gravame.
            Esses valores variam, mas geralmente ficam em torno de R$ 300 a R$ 800.
            Por isso, é fundamental calcular se a economia obtida com a redução dos
            juros compensa essas despesas. Também é essencial verificar o Custo Efetivo
            Total (CET) da nova proposta, que inclui todos os encargos do financiamento.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Outro ponto de atenção é o prazo restante do financiamento. Quanto mais
            parcelas faltam, maior tende a ser a economia gerada pela portabilidade.
            Para financiamentos com poucas parcelas restantes, a economia pode não
            justificar os custos da transferência. Verifique também se não há cláusulas
            de juros abusivos no seu contrato atual com nossa ferramenta de{" "}
            <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de multas
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Seus direitos na portabilidade de crédito
          </h3>
          <p className="text-[#475569] leading-relaxed">
            De acordo com a regulamentação do Bacen, a instituição financeira original
            não pode recusar o pedido de portabilidade nem cobrar multa por encerramento
            antecipado do contrato. O consumidor tem liberdade total para escolher o novo
            banco e negociar as condições que melhor atendam às suas necessidades. Em caso
            de irregularidades, é possível registrar reclamação no Banco Central, no Procon
            ou no portal consumidor.gov.br.
          </p>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/simulador-financiamento" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Financiamento</h3>
              <p className="text-sm text-[#64748B]">Simule parcelas com Tabela Price ou SAC e veja a tabela de amortização completa.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de CET</h3>
              <p className="text-sm text-[#64748B]">Calcule o Custo Efetivo Total do financiamento incluindo taxas e seguros.</p>
            </Link>
            <Link href="/ferramentas/calculadora-multas" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se os juros do seu financiamento estão acima da média de mercado.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calculadora de Portabilidade de Financiamento",
              description:
                "Compare seu financiamento atual com outra proposta e descubra se vale a pena fazer a portabilidade. Calcule economia mensal e total.",
              url: "https://consultaplacabrasil.com/ferramentas/portabilidade-financiamento",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "O que é portabilidade de financiamento veicular?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A portabilidade de financiamento é o direito do consumidor de transferir sua dívida de um banco para outro que ofereça condições melhores, como taxas de juros mais baixas. O processo é regulamentado pelo Banco Central por meio da Resolução nº 4.292/2013.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quanto custa fazer a portabilidade de financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Os custos de portabilidade geralmente ficam entre R$ 300 e R$ 800, incluindo nova avaliação do veículo, registro do contrato em cartório e emissão de gravame. O banco original não pode cobrar multa pelo encerramento antecipado.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O banco pode recusar a portabilidade de crédito?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Não. De acordo com a regulamentação do Banco Central, a instituição financeira original não pode recusar o pedido de portabilidade nem criar obstáculos para impedir a transferência. O banco tem 5 dias úteis para apresentar uma contraproposta.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quando vale a pena fazer a portabilidade de financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A portabilidade vale a pena quando a economia obtida com a redução dos juros supera os custos da transferência. Geralmente, quanto maior o saldo devedor e mais parcelas restantes, maior a economia. Recomenda-se usar uma calculadora para simular o cenário.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quanto tempo demora o processo de portabilidade?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O processo de portabilidade costuma levar entre 5 e 15 dias úteis. O banco original tem até 5 dias úteis para responder ao pedido e, se não apresentar contraproposta, o novo banco finaliza a operação nos dias seguintes.",
                  },
                },
              ],
            },
            {
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
                  name: "Portabilidade de Financiamento",
                  item: "https://consultaplacabrasil.com/ferramentas/portabilidade-financiamento",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
