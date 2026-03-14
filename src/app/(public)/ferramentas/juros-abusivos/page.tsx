import { Metadata } from "next";
import Link from "next/link";
import JurosAbusivos from "@/components/ferramentas/juros-abusivos";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Calculadora de Juros Abusivos",
  description:
    "Compare a taxa de juros do seu financiamento com a média do Banco Central e descubra se há cobrança abusiva. Verifique seus direitos como consumidor.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/juros-abusivos",
  },
  openGraph: {
    title: "Juros Abusivos no Financiamento | Consulta Placa Brasil",
    description:
      "Compare sua taxa com a média do Banco Central e descubra se há abusividade no seu financiamento de veículo.",
    url: "https://consultaplacabrasil.com/ferramentas/juros-abusivos",
    type: "website",
  },
};

export default function JurosAbusivosPage() {
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
            <span className="text-gray-300">Juros Abusivos</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Juros Abusivos em Financiamento
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Compare a taxa de juros do seu contrato com a média do Banco Central e descubra se você está pagando juros abusivos no financiamento do veículo.
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
        <JurosAbusivos />
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
            O que são juros abusivos em financiamento de veículos?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Juros abusivos em financiamento de veículos ocorrem quando a instituição financeira cobra
            taxas de juros muito superiores à média praticada pelo mercado. O Código de Defesa do
            Consumidor (CDC), em seu artigo 51, considera nulas as cláusulas contratuais que
            estabeleçam obrigações consideradas abusivas ou que coloquem o consumidor em desvantagem
            exagerada. Antes de fechar qualquer financiamento, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar a placa</Link> do
            veículo para verificar sua procedência e situação cadastral completa.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O Banco Central do Brasil publica regularmente a taxa média de juros praticada pelas
            instituições financeiras em operações de crédito para aquisição de veículos. Essa taxa
            serve como referência para identificar possíveis abusos. Quando a taxa cobrada no seu
            contrato excede significativamente a média do mercado, há indícios de cobrança abusiva
            que podem ser questionados judicialmente por meio de uma ação revisional.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Como identificar juros abusivos no seu contrato
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O primeiro passo é verificar a taxa de juros mensal descrita no contrato de financiamento
            e compará-la com a taxa média do Banco Central para o período em que o contrato foi
            firmado. Se a taxa do seu contrato for superior a 50% da média praticada, há fortes
            indícios de abusividade. Utilize nossa calculadora acima para fazer essa comparação
            de forma rápida e precisa. Para entender o custo total da operação, considere também
            usar nosso{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">simulador de financiamento</Link> com
            tabela de amortização completa.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além da taxa de juros, fique atento a cobranças indevidas como tarifas de abertura de
            crédito não informadas previamente, seguros embutidos sem sua autorização e taxas
            administrativas excessivas. O Custo Efetivo Total (CET) deve ser informado antes da
            assinatura do contrato, conforme determinação do Banco Central. Utilize a{" "}
            <Link href="/ferramentas/calculadora-cet" className="text-[#FF4D30] hover:underline font-medium">calculadora de CET</Link> para
            verificar se o custo efetivo está condizente com o que foi contratado.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Seus direitos como consumidor segundo o CDC
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O consumidor brasileiro é protegido pelo Código de Defesa do Consumidor e pela
            jurisprudência consolidada dos tribunais superiores. O Superior Tribunal de Justiça (STJ)
            reconhece que as instituições financeiras não estão sujeitas à Lei de Usura, mas que as
            taxas cobradas não podem ser excessivamente superiores à média de mercado. Caso
            constatada a abusividade, o consumidor pode solicitar a revisão judicial do contrato,
            com a adequação da taxa de juros ao patamar médio praticado pelo mercado.
          </p>
          <p className="text-[#475569] leading-relaxed">
            É importante ressaltar que a ação revisional não impede o consumidor de continuar
            pagando as parcelas do financiamento. Na verdade, manter os pagamentos em dia fortalece
            a posição do consumidor perante o Judiciário. A diferença apurada entre o valor pago
            e o valor que seria devido com a taxa justa pode ser restituída ao consumidor ou
            compensada nas parcelas restantes. Para quem deseja quitar o financiamento
            antecipadamente, recomendamos verificar a{" "}
            <Link href="/ferramentas/quitacao-antecipada" className="text-[#FF4D30] hover:underline font-medium">calculadora de quitação antecipada</Link> e
            conhecer seus direitos de desconto proporcional dos juros futuros.
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
              <p className="text-sm text-[#64748B]">Calcule o valor para quitar seu financiamento antes do prazo e economize nos juros.</p>
            </Link>
            <Link href="/ferramentas/calculadora-cet" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de CET</h3>
              <p className="text-sm text-[#64748B]">Descubra o Custo Efetivo Total do seu financiamento incluindo todas as taxas e encargos.</p>
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
              name: "Calculadora de Juros Abusivos em Financiamento",
              description:
                "Compare a taxa de juros do seu financiamento de veículo com a média do Banco Central e descubra se há cobrança abusiva.",
              url: "https://consultaplacabrasil.com/ferramentas/juros-abusivos",
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
                  name: "O que são juros abusivos em financiamento de veículos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Juros abusivos ocorrem quando a instituição financeira cobra taxas de juros muito superiores à média praticada pelo mercado. Quando a taxa do contrato excede em mais de 50% a média do Banco Central, há fortes indícios de abusividade que podem ser questionados judicialmente.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como saber se estou pagando juros abusivos no financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Compare a taxa de juros mensal do seu contrato com a taxa média divulgada pelo Banco Central para financiamento de veículos no período em que o contrato foi assinado. Se a diferença for superior a 50%, há indícios de abusividade.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que é uma ação revisional de financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A ação revisional é um processo judicial em que o consumidor solicita a revisão das cláusulas do contrato de financiamento, buscando a redução dos juros cobrados ao patamar médio praticado pelo mercado. A diferença paga a mais pode ser restituída.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a taxa média de juros para financiamento de veículos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A taxa média varia conforme o período. Em 2024, a média do Banco Central para financiamento de veículos ficou em torno de 1,63% ao mês. Esse valor é utilizado como referência para identificar possíveis cobranças abusivas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Posso continuar pagando as parcelas durante a ação revisional?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim, e é altamente recomendável. Continuar pagando as parcelas em dia fortalece a posição do consumidor perante o Judiciário. A diferença entre o valor pago e o valor justo pode ser restituída ou compensada nas parcelas futuras.",
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
                  name: "Juros Abusivos",
                  item: "https://consultaplacabrasil.com/ferramentas/juros-abusivos",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
