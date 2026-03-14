import { Metadata } from "next";
import Link from "next/link";

import CalculadoraIOF from "@/components/ferramentas/calculadora-iof";

export const metadata: Metadata = {
  title: "Calculadora de IOF no Financiamento | Consulta Placa",
  description:
    "Calcule o IOF cobrado no financiamento do seu veículo. Simule para Pessoa Física, Pessoa Jurídica ou Leasing com alíquotas atualizadas. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/calculadora-iof",
  },
  openGraph: {
    title: "Calculadora de IOF no Financiamento | Consulta Placa",
    description:
      "Calcule o IOF cobrado no financiamento do seu veículo. Simule para PF, PJ ou Leasing com alíquotas atualizadas.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-iof",
    type: "website",
  },
};

export default function CalculadoraIOFPage() {
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
            <span className="text-gray-300">Calculadora de IOF</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de IOF no Financiamento
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule o Imposto sobre Operações Financeiras cobrado no financiamento do seu veículo. Simule para Pessoa Física, Pessoa Jurídica ou Leasing.
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
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <CalculadoraIOF />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é o IOF no financiamento de veículos?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O IOF (Imposto sobre Operações Financeiras) é um tributo federal que incide sobre
            diversas operações de crédito, câmbio e seguros no Brasil. No contexto do financiamento
            de veículos, o IOF é cobrado sempre que o consumidor contrata um empréstimo para a
            aquisição de um automóvel, motocicleta, caminhão ou qualquer outro veículo automotor.
            O imposto é calculado com base no valor financiado e no prazo da operação, e seu custo
            é adicionado ao montante total do financiamento. Antes de financiar, é importante
            realizar uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta de placa do veículo
            </Link>{" "}
            para verificar se não existem restrições ou débitos pendentes.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como o IOF é calculado no financiamento?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O cálculo do IOF no financiamento de veículos é composto por duas parcelas distintas.
            A primeira é a alíquota fixa de 0,38%, cobrada uma única vez sobre o valor total da
            operação de crédito, independentemente do prazo contratado. A segunda é a alíquota
            diária, que varia conforme o tipo de tomador: para Pessoa Física (PF), a taxa diária
            é de 0,0082% ao dia, enquanto para Pessoa Jurídica (PJ) é de 0,0041% ao dia. O IOF
            diário é multiplicado pelo número de dias do contrato. A soma dessas duas parcelas
            resulta no IOF total, que possui um teto máximo de 3,00% para PF e 1,88% para PJ,
            garantindo que em financiamentos de longo prazo o imposto não ultrapasse esses limites.
            Para entender o custo total da operação, incluindo o IOF, utilize nossa{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de simulação de financiamento
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Diferença do IOF para Pessoa Física e Pessoa Jurídica
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A principal diferença entre o IOF cobrado de Pessoa Física e Pessoa Jurídica está
            na alíquota diária e no teto máximo. Para PF, a alíquota diária é de 0,0082% e o
            teto é de 3,00% do valor financiado. Já para PJ, a alíquota diária é menor, de
            0,0041%, e o teto é de 1,88%. Isso significa que, para um mesmo valor e prazo,
            a Pessoa Jurídica pagará menos IOF. A alíquota fixa de 0,38% é idêntica para
            ambos os casos. Para avaliar se o financiamento possui taxas abusivas, confira
            nossa ferramenta de{" "}
            <Link href="/ferramentas/juros-abusivos" className="text-[#FF4D30] hover:underline font-medium">
              verificação de juros abusivos
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Leasing: isenção de IOF no arrendamento mercantil
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O leasing, ou arrendamento mercantil, é uma modalidade de aquisição de veículos que
            não é considerada operação de crédito para fins de tributação, e por isso é isenta
            de IOF. Nessa modalidade, o veículo pertence à instituição financeira durante o
            contrato, e o cliente paga parcelas de arrendamento. Ao final do contrato, o
            comprador pode optar por adquirir o bem pelo valor residual garantido (VRG). A
            isenção de IOF é uma das principais vantagens do leasing em relação ao financiamento
            convencional, podendo representar uma economia significativa. Para calcular o custo
            efetivo total de cada modalidade, utilize a{" "}
            <Link href="/ferramentas/calculadora-cet" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de CET
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para reduzir o impacto do IOF
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Existem algumas estratégias para minimizar o impacto do IOF no financiamento do seu
            veículo. A primeira é dar a maior entrada possível, reduzindo o valor financiado e,
            consequentemente, a base de cálculo do imposto. Outra opção é considerar o leasing
            como alternativa ao financiamento tradicional, aproveitando a isenção de IOF. Também
            é possível optar por prazos mais curtos, já que o IOF diário é proporcional ao tempo
            do contrato, embora o teto máximo limite o valor em financiamentos longos. Compare
            sempre as condições oferecidas por diferentes instituições financeiras, pois o IOF
            é padronizado, mas as taxas de juros variam consideravelmente.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são estimativas baseadas nas
              alíquotas vigentes do IOF. As alíquotas podem ser alteradas por decreto
              presidencial. Para informações oficiais, consulte a Receita Federal do Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/calculadora-cet" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de CET</h3>
              <p className="text-sm text-[#64748B]">Calcule o Custo Efetivo Total do financiamento e compare propostas de diferentes bancos.</p>
            </Link>
            <Link href="/ferramentas/simulador-financiamento" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Financiamento</h3>
              <p className="text-sm text-[#64748B]">Simule parcelas, juros e valor total do financiamento do seu veículo.</p>
            </Link>
            <Link href="/ferramentas/juros-abusivos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se as taxas de juros do seu financiamento estão acima da média do mercado.</p>
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
            name: "Calculadora de IOF no Financiamento",
            description:
              "Calcule o IOF cobrado no financiamento do seu veículo. Simule para Pessoa Física, Pessoa Jurídica ou Leasing com alíquotas atualizadas.",
            url: "https://consultaplacabrasil.com/ferramentas/calculadora-iof",
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
                name: "O que é o IOF no financiamento de veículos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O IOF (Imposto sobre Operações Financeiras) é um tributo federal que incide sobre operações de crédito, incluindo financiamentos de veículos. Ele é composto por uma alíquota fixa de 0,38% e uma alíquota diária que varia conforme o tipo de pessoa (PF ou PJ).",
                },
              },
              {
                "@type": "Question",
                name: "Qual é a alíquota do IOF para Pessoa Física?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para Pessoa Física, o IOF tem alíquota fixa de 0,38% mais alíquota diária de 0,0082% por dia. O teto máximo é de 3,00% do valor financiado, independentemente do prazo.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é a alíquota do IOF para Pessoa Jurídica?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para Pessoa Jurídica, o IOF tem alíquota fixa de 0,38% mais alíquota diária de 0,0041% por dia. O teto máximo é de 1,88% do valor financiado.",
                },
              },
              {
                "@type": "Question",
                name: "O leasing tem IOF?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. O leasing (arrendamento mercantil) é isento de IOF, pois não é considerado operação de crédito para fins tributários. Essa é uma das vantagens do leasing em relação ao financiamento tradicional.",
                },
              },
              {
                "@type": "Question",
                name: "Como reduzir o IOF no financiamento?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para reduzir o IOF, você pode dar uma entrada maior (reduzindo o valor financiado), optar por prazos mais curtos ou considerar o leasing como alternativa ao financiamento convencional, já que o leasing é isento de IOF.",
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
                name: "Calculadora de IOF",
                item: "https://consultaplacabrasil.com/ferramentas/calculadora-iof",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
