import { Metadata } from "next";
import Link from "next/link";
import SimuladorFinanciamento from "@/components/ferramentas/simulador-financiamento";

export const metadata: Metadata = {
  title: "Simulador de Financiamento Veicular | Consulta Placa Brasil",
  description:
    "Simule o financiamento do seu veículo com Tabela Price ou SAC. Calcule parcelas, juros totais e veja a tabela de amortização. Grátis e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com.br/ferramentas/simulador-financiamento",
  },
  openGraph: {
    title: "Simulador de Financiamento Veicular | Consulta Placa Brasil",
    description:
      "Calcule parcelas, juros totais e tabela de amortização do financiamento do seu carro. Tabela Price e SAC.",
    url: "https://consultaplacabrasil.com.br/ferramentas/simulador-financiamento",
    type: "website",
  },
};

export default function SimuladorFinanciamentoPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simulador de Financiamento de Veículos
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Calcule o valor das parcelas, juros totais e veja a tabela de
            amortização completa do seu financiamento. Compare Tabela Price e SAC.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 max-w-4xl py-4">
        <ol className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <li>
            <Link href="/" className="hover:text-[#FF4D30] transition-colors">
              Início
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/ferramentas"
              className="hover:text-[#FF4D30] transition-colors"
            >
              Ferramentas
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#0F172A] font-medium">
            Simulador de Financiamento
          </li>
        </ol>
      </nav>

      {/* Simulador */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <SimuladorFinanciamento />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona o financiamento de veículos no Brasil?
          </h2>
          <p className="text-[#475569]">
            O financiamento de veículos é uma das formas mais comuns de aquisição
            de carros e motos no Brasil. De acordo com dados do Banco Central,
            milhões de contratos de financiamento são firmados anualmente no país,
            movimentando bilhões de reais. Além das parcelas, é importante considerar
            custos como o IPVA — use nossa{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">calculadora de IPVA</Link> para
            estimar esse valor. Para o consumidor, entender como
            funcionam as parcelas e os juros é fundamental para tomar uma decisão
            consciente e evitar comprometer o orçamento familiar.
          </p>
          <p className="text-[#475569]">
            Existem dois sistemas principais de amortização utilizados nos
            financiamentos de veículos: a <strong>Tabela Price</strong> e o{" "}
            <strong>Sistema de Amortização Constante (SAC)</strong>. Na Tabela
            Price, as parcelas são fixas do início ao fim do contrato, o que
            facilita o planejamento financeiro. No entanto, nos primeiros meses, a
            maior parte da parcela corresponde aos juros, e a amortização do saldo
            devedor é menor. Já no sistema SAC, a amortização é constante em todas
            as parcelas, mas o valor da parcela diminui ao longo do tempo, pois os
            juros incidem sobre um saldo devedor cada vez menor.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para contratar um financiamento de veículo
          </h3>
          <p className="text-[#475569]">
            Antes de assinar o contrato, é importante comparar as taxas de juros
            oferecidas por diferentes instituições financeiras. A taxa de juros
            mensal pode variar significativamente entre bancos, financeiras e
            cooperativas de crédito. Além disso, o valor da entrada é um fator
            determinante: quanto maior a entrada, menor o valor financiado e,
            consequentemente, menores os juros totais pagos ao final do contrato.
            Especialistas recomendam uma entrada mínima de 20% do valor do veículo.
          </p>
          <p className="text-[#475569]">
            Outro ponto importante é o prazo de financiamento. Embora prazos mais
            longos resultem em parcelas menores, o custo total com juros aumenta
            consideravelmente. Um financiamento de 60 meses, por exemplo, pode
            resultar em juros totais que ultrapassam 50% do valor financiado,
            dependendo da taxa aplicada. Não se esqueça de verificar a{" "}
            <Link href="/ferramentas/calculadora-depreciacao" className="text-[#FF4D30] hover:underline font-medium">calculadora de depreciação</Link> para
            entender quanto o veículo pode perder de valor durante o período do financiamento. Utilize nosso simulador acima para
            comparar diferentes cenários e encontrar a melhor opção para o seu
            bolso.
          </p>
          <p className="text-[#475569]">
            Também é essencial verificar o Custo Efetivo Total (CET) do
            financiamento, que inclui não apenas os juros, mas também seguros,
            tarifas administrativas e impostos embutidos no contrato. O CET é o
            indicador mais confiável para comparar propostas de diferentes
            instituições. Por lei, todas as instituições financeiras são obrigadas
            a informar o CET antes da assinatura do contrato.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Tabela Price vs SAC: qual escolher?
          </h3>
          <p className="text-[#475569]">
            A escolha entre Price e SAC depende do seu perfil financeiro. Se você
            prefere parcelas fixas e previsíveis, a Tabela Price é mais indicada.
            Se deseja pagar menos juros ao final do contrato e pode arcar com
            parcelas maiores no início, o SAC é a melhor opção. Em geral, o
            sistema SAC resulta em um custo total menor, pois o saldo devedor é
            amortizado mais rapidamente. Para uma visão completa de todos os gastos,
            confira a ferramenta de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">custo total do veículo</Link>.
            Use este simulador para visualizar a
            diferença entre os dois sistemas e tomar a melhor decisão para o seu
            financiamento.
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
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o IPVA 2026 do seu veículo por estado com parcelamento e desconto à vista.</p>
            </Link>
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Depreciação</h3>
              <p className="text-sm text-[#64748B]">Estime quanto seu veículo pode desvalorizar ao longo dos anos.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa manter seu veículo por mês incluindo IPVA, seguro e combustível.</p>
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
              name: "Simulador de Financiamento de Veículos",
              description:
                "Simule o financiamento do seu veículo com Tabela Price ou SAC. Calcule parcelas, juros totais e veja a tabela de amortização completa.",
              url: "https://consultaplacabrasil.com.br/ferramentas/simulador-financiamento",
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
                url: "https://consultaplacabrasil.com.br",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "O que é a Tabela Price no financiamento de veículos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A Tabela Price é um sistema de amortização onde todas as parcelas têm o mesmo valor fixo. Nos primeiros meses, a maior parte da parcela corresponde aos juros, enquanto a amortização aumenta progressivamente ao longo do contrato.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a diferença entre Tabela Price e SAC?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Na Tabela Price, as parcelas são fixas do início ao fim. No SAC (Sistema de Amortização Constante), a amortização é fixa e as parcelas diminuem ao longo do tempo. O SAC geralmente resulta em menos juros totais pagos.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a taxa de juros média para financiamento de veículos no Brasil?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A taxa de juros média para financiamento de veículos no Brasil varia entre 1,2% e 2,5% ao mês, dependendo do banco, perfil do comprador, valor de entrada e prazo. É fundamental comparar propostas de diferentes instituições financeiras.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quanto de entrada devo dar no financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Especialistas recomendam uma entrada mínima de 20% do valor do veículo. Quanto maior a entrada, menor o valor financiado e menores os juros totais pagos ao final do contrato.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que é o Custo Efetivo Total (CET)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O CET é o indicador que engloba todos os custos do financiamento: juros, seguros, tarifas administrativas e impostos. Por lei, toda instituição financeira deve informar o CET antes da assinatura do contrato, sendo o melhor indicador para comparar propostas.",
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
                  item: "https://consultaplacabrasil.com.br",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Ferramentas",
                  item: "https://consultaplacabrasil.com.br/ferramentas",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Simulador de Financiamento",
                  item: "https://consultaplacabrasil.com.br/ferramentas/simulador-financiamento",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
