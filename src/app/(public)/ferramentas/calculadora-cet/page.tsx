import { Metadata } from "next";
import Link from "next/link";
import CalculadoraCET from "@/components/ferramentas/calculadora-cet";

export const metadata: Metadata = {
  title: "Calculadora de CET Financiamento | Consulta Placa",
  description:
    "Calcule o Custo Efetivo Total (CET) do seu financiamento com juros, IOF, TAC, seguro e taxas. Compare a taxa anunciada com o custo real. Grátis e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/calculadora-cet",
  },
  openGraph: {
    title: "Calculadora de CET Financiamento | Consulta Placa",
    description:
      "Descubra o custo efetivo total do seu financiamento com todas as taxas incluídas. Compare taxa nominal e CET real.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-cet",
    type: "website",
  },
};

export default function CalculadoraCETPage() {
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
            <span className="text-gray-300">Calculadora de CET</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de CET (Custo Efetivo Total)
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Descubra o custo real do seu financiamento. Compare a taxa de juros anunciada com o CET, que inclui IOF, TAC, seguro e todas as demais taxas.
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
        <CalculadoraCET />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é o CET e por que ele importa mais que a taxa de juros?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O Custo Efetivo Total (CET) é um indicador financeiro obrigatório, regulamentado pela{" "}
            <strong>Resolução n.º 3.517/2007 do Banco Central do Brasil</strong>, que representa o
            custo completo de uma operação de crédito para o consumidor. Diferente da taxa de juros
            nominal, o CET engloba todos os encargos e despesas incidentes sobre o financiamento:
            juros remuneratórios, IOF (Imposto sobre Operações Financeiras), TAC (Tarifa de Abertura
            de Crédito), seguro prestamista, tarifas de cadastro, avaliação do bem e quaisquer outros
            custos embutidos no contrato. Antes de fechar um financiamento, vale{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar a placa</Link>{" "}
            do veículo para verificar a situação cadastral e eventuais restrições.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Na prática, muitas instituições financeiras anunciam taxas de juros aparentemente baixas
            para atrair clientes, mas incorporam custos adicionais que elevam consideravelmente o
            preço final do financiamento. Um banco pode oferecer juros de 1,49% ao mês, mas, ao
            adicionar IOF, seguro obrigatório e tarifa de abertura, o CET mensal pode ultrapassar
            2,5%. Essa diferença, ao longo de 48 ou 60 meses, representa milhares de reais a mais
            no bolso do consumidor. Por isso, o Banco Central determina que toda instituição
            financeira informe o CET antes da assinatura do contrato, permitindo uma comparação
            justa entre propostas.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como os bancos escondem custos no financiamento veicular
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Existem diversas formas pelas quais custos são camuflados nos contratos de financiamento.
            A mais comum é o <strong>seguro prestamista</strong>, frequentemente apresentado como
            obrigatório quando, na verdade, o consumidor tem o direito de contratar o seguro com
            qualquer seguradora, e não apenas com a indicada pelo banco. Outra prática é a cobrança
            da <strong>TAC (Tarifa de Abertura de Crédito)</strong>, que pode variar de R$ 300 a
            R$ 1.500 dependendo da instituição. Há ainda a inclusão de serviços como proteção
            financeira, pacote de assistência e seguro de garantia mecânica, que inflam o valor
            financiado sem que o cliente perceba. Utilize o{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              Simulador de Financiamento
            </Link>{" "}
            para visualizar as parcelas e compare com o CET calculado aqui.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como usar esta calculadora de CET
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Informe o valor financiado, a taxa de juros mensal oferecida pela instituição e o prazo
            em meses. A calculadora estima automaticamente o IOF conforme a legislação vigente
            (0,38% fixo mais 0,0082% ao dia, limitado a 3% do valor da operação), mas você pode
            informar o valor exato se constar no contrato. Adicione a TAC, o seguro prestamista
            mensal e quaisquer outras taxas para obter o CET preciso. O resultado mostra a
            comparação visual entre a taxa anunciada e o custo efetivo real, além do detalhamento
            de cada componente de custo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Se você identificar que o CET está muito acima da taxa anunciada, considere negociar
            a remoção de tarifas ou buscar propostas em outras instituições. Lembre-se: o CET é
            o único indicador que permite uma comparação verdadeiramente justa entre financiamentos
            de diferentes bancos. Complementarmente, verifique também os custos de manutenção e
            impostos do veículo com as ferramentas de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              Custo Total do Veículo
            </Link>{" "}
            e{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              Calculadora de IPVA
            </Link>.
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
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Juros e Depreciação</h3>
              <p className="text-sm text-[#64748B]">Calcule quanto o veículo desvaloriza enquanto você ainda paga o financiamento.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa manter seu carro por mês incluindo IPVA, seguro e combustível.</p>
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
              name: "Calculadora de CET (Custo Efetivo Total)",
              description:
                "Calcule o Custo Efetivo Total do seu financiamento incluindo juros, IOF, TAC, seguro e todas as taxas. Compare a taxa anunciada com o custo real.",
              url: "https://consultaplacabrasil.com/ferramentas/calculadora-cet",
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
                  name: "O que é o CET (Custo Efetivo Total)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O CET é um indicador financeiro que representa o custo completo de uma operação de crédito, incluindo juros, IOF, TAC, seguros e todas as demais tarifas. É regulamentado pela Resolução 3.517/2007 do Banco Central e deve ser informado antes da assinatura do contrato.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a diferença entre taxa de juros e CET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A taxa de juros é apenas um dos componentes do custo do financiamento. O CET inclui, além dos juros, o IOF, tarifas bancárias, seguros obrigatórios e outros encargos. Por isso, o CET é sempre maior que a taxa de juros nominal anunciada.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O banco é obrigado a informar o CET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. De acordo com a Resolução 3.517/2007 do Banco Central, todas as instituições financeiras são obrigadas a informar o CET antes da contratação de qualquer operação de crédito, permitindo que o consumidor compare propostas de forma justa.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como o IOF é calculado no financiamento de veículos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O IOF sobre financiamento de veículos é composto por uma alíquota fixa de 0,38% sobre o valor financiado mais 0,0082% ao dia sobre o saldo devedor, limitado ao teto de 3% do valor total da operação.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que é a TAC no financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A TAC (Tarifa de Abertura de Crédito) é uma taxa cobrada pela instituição financeira para cobrir custos administrativos da análise e concessão do crédito. O valor varia entre instituições e pode ser negociado ou até eliminado na negociação.",
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
                  name: "Calculadora de CET",
                  item: "https://consultaplacabrasil.com/ferramentas/calculadora-cet",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
