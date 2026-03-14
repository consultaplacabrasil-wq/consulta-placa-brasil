import { Metadata } from "next";
import Link from "next/link";
import CalculadoraAtrasoParcelas from "@/components/ferramentas/atraso-parcelas";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Calculadora de Atraso de Parcelas",
  description:
    "Calcule multa, juros de mora, correção monetária e valor atualizado de parcelas em atraso. Suporte a múltiplas parcelas. Gratuita e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/atraso-parcelas",
  },
  openGraph: {
    title: "Calculadora de Atraso de Parcelas | Consulta Placa",
    description:
      "Calcule multa, juros e valor atualizado de parcelas atrasadas. Ferramenta gratuita com suporte a múltiplas parcelas.",
    url: "https://consultaplacabrasil.com/ferramentas/atraso-parcelas",
    type: "website",
  },
};

export default function AtrasoParcelasPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Atraso de Parcelas</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Atraso de Parcelas
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule multa, juros de mora, correção monetária e o valor total atualizado das suas parcelas em atraso. Adicione quantas parcelas precisar.
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
        <CalculadoraAtrasoParcelas />
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como calcular parcelas em atraso no Brasil?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Quando uma parcela de financiamento, boleto ou carnê vence sem pagamento, incidem encargos adicionais sobre o valor original. No Brasil, esses encargos são regulados pelo Código de Defesa do Consumidor (CDC) e pelo Código Civil, garantindo limites que protegem o consumidor. Antes de negociar qualquer dívida relacionada a veículos, recomendamos{" "}
            <Link href="/" className="text-[#C73A1E] hover:underline font-medium">consultar a placa</Link>{" "}
            para verificar a situação cadastral e identificar possíveis pendências financeiras vinculadas ao automóvel.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O primeiro encargo aplicado é a <strong>multa por atraso</strong>, que corresponde a um percentual fixo sobre o valor da parcela. De acordo com o artigo 52 do CDC, essa multa não pode ultrapassar 2% do valor da prestação. Qualquer cobrança acima desse limite pode ser considerada abusiva e contestada judicialmente ou junto aos órgãos de defesa do consumidor, como o Procon.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O segundo componente é o <strong>juros de mora</strong>, calculado proporcionalmente aos dias de atraso. A taxa padrão prevista no Código Civil é de 1% ao mês, o que equivale a aproximadamente 0,033% ao dia. Essa taxa incide sobre o valor original da parcela e cresce a cada dia sem pagamento. É importante diferenciar juros de mora de juros remuneratórios, que fazem parte do custo do financiamento e não se confundem com os encargos pelo atraso.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Correção monetária e seus efeitos
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Além da multa e dos juros, algumas instituições aplicam a <strong>correção monetária</strong> sobre parcelas em atraso. Esse mecanismo reajusta o valor da dívida com base em índices de inflação, como o IPCA ou o IGP-M. A correção protege o credor contra a perda do poder de compra, mas também eleva o montante total devido pelo consumidor. Para financiamentos de veículos, é comum que o contrato especifique qual índice será utilizado.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Se você está com parcelas de financiamento veicular em atraso, vale a pena utilizar o{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#C73A1E] hover:underline font-medium">simulador de financiamento</Link>{" "}
            para recalcular as condições do contrato. Também considere verificar se os juros cobrados estão dentro da média do mercado. Taxas muito acima da média podem ser consideradas abusivas, e o consumidor tem o direito de questionar e renegociar.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para evitar o acúmulo de parcelas atrasadas
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A melhor estratégia para evitar encargos é manter o pagamento em dia. Caso enfrente dificuldades financeiras, entre em contato com a instituição credora o quanto antes para negociar novas condições. Muitas financeiras oferecem opções de renegociação, como a extensão do prazo ou a incorporação do saldo devedor em novas parcelas. Quanto antes o consumidor buscar um acordo, menores serão os encargos acumulados.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Para quem deseja quitar a dívida de uma vez, consulte ferramentas como a de{" "}
            <Link href="/ferramentas/quitacao-antecipada" className="text-[#C73A1E] hover:underline font-medium">quitação antecipada</Link>{" "}
            para simular o valor total com desconto dos juros futuros. Manter as finanças organizadas e acompanhar os vencimentos é essencial para preservar o crédito e evitar restrições nos órgãos de proteção, como SPC e Serasa.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Utilize a calculadora acima para entender exatamente quanto cada parcela atrasada custa hoje. A ferramenta permite adicionar múltiplas parcelas, facilitando o cálculo do montante total em caso de mais de uma prestação vencida. Os valores apresentados servem como referência para negociações e planejamento financeiro.
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
            <Link href="/ferramentas/quitacao-antecipada" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Quitação Antecipada</h3>
              <p className="text-sm text-[#64748B]">Calcule o valor para quitar seu financiamento antes do prazo com desconto nos juros.</p>
            </Link>
            <Link href="/ferramentas/juros-abusivos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se os juros do seu financiamento estão acima da média do mercado.</p>
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
              name: "Calculadora de Atraso de Parcelas",
              description:
                "Calcule multa, juros de mora, correção monetária e valor atualizado de parcelas em atraso. Suporte a múltiplas parcelas.",
              url: "https://consultaplacabrasil.com/ferramentas/atraso-parcelas",
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
                  name: "Qual o valor máximo da multa por atraso de parcela?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Conforme o Código de Defesa do Consumidor (artigo 52, parágrafo 1º), a multa por atraso não pode ultrapassar 2% do valor da parcela. Qualquer cobrança acima desse percentual pode ser considerada abusiva.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como são calculados os juros de mora sobre parcelas atrasadas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Os juros de mora são calculados proporcionalmente aos dias de atraso. A taxa padrão prevista no Código Civil é de 1% ao mês, o que equivale a cerca de 0,033% ao dia, incidindo sobre o valor original da parcela.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que é a correção monetária em parcelas atrasadas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A correção monetária é um reajuste do valor da dívida com base em índices de inflação, como o IPCA ou o IGP-M. Ela compensa a perda do poder de compra do dinheiro ao longo do tempo e é aplicada proporcionalmente ao período de atraso.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Posso negociar parcelas em atraso diretamente com a financeira?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. A maioria das instituições financeiras oferece opções de renegociação, como extensão do prazo, redução de juros ou incorporação do saldo devedor em novas parcelas. Quanto antes entrar em contato, melhores tendem a ser as condições.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Parcelas atrasadas podem gerar restrição no CPF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. Após determinado período de inadimplência, a instituição credora pode registrar o débito nos órgãos de proteção ao crédito, como SPC e Serasa. Isso resulta em restrições que dificultam a obtenção de novos créditos e financiamentos.",
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
                  name: "Atraso de Parcelas",
                  item: "https://consultaplacabrasil.com/ferramentas/atraso-parcelas",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
