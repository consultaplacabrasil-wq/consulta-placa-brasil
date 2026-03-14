import { Metadata } from "next";
import Link from "next/link";
import AntecipacaoParcelas from "@/components/ferramentas/antecipacao-parcelas";

export const metadata: Metadata = {
  title: "Simulador de Antecipação de Parcelas | Consulta Placa",
  description:
    "Simule a economia ao antecipar parcelas do financiamento veicular. Calcule o desconto, novo saldo devedor e compare cenários com Price e SAC. Grátis.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/antecipacao-parcelas",
  },
  openGraph: {
    title: "Simulador de Antecipação de Parcelas | Consulta Placa",
    description:
      "Simule a economia ao antecipar parcelas do financiamento veicular. Veja o desconto obtido e o novo saldo devedor.",
    url: "https://consultaplacabrasil.com/ferramentas/antecipacao-parcelas",
    type: "website",
  },
};

export default function AntecipacaoParcelasPage() {
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
            <span className="text-gray-300">Antecipação de Parcelas</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Simulador de Antecipação de Parcelas
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Descubra quanto você pode economizar ao antecipar parcelas do seu financiamento veicular. Compare cenários e tome a melhor decisão.
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

      {/* Simulador */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <AntecipacaoParcelas />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona a antecipação de parcelas de financiamento?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A antecipação de parcelas é um direito garantido por lei a todo consumidor que possui um financiamento veicular no Brasil. Ao antecipar parcelas, o mutuário paga antes do vencimento e, em contrapartida, recebe um desconto proporcional aos juros que seriam cobrados nos meses futuros. Antes de antecipar, vale{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar placa</Link>{" "}
            do veículo para verificar se não há pendências cadastrais que possam impactar a negociação com a instituição financeira.
          </p>
          <p className="text-[#475569] leading-relaxed">
            De acordo com o Código de Defesa do Consumidor (artigo 52, parágrafo 2º), o consumidor tem o direito de liquidar antecipadamente o débito, total ou parcialmente, com redução proporcional dos juros e demais acréscimos. Isso significa que a instituição financeira é obrigada a conceder o desconto quando o cliente solicita a antecipação. O Banco Central também regulamenta essa prática por meio da Resolução nº 4.558, que reforça o direito à redução dos encargos financeiros.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Reduzir prazo ou reduzir parcela: qual a melhor opção?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Ao antecipar parcelas, o consumidor geralmente pode escolher entre duas modalidades. Na primeira, a antecipação reduz o prazo do financiamento, mantendo o valor das parcelas restantes inalterado. Essa opção costuma gerar maior economia total, pois elimina meses de cobrança de juros. Na segunda modalidade, o prazo permanece o mesmo, mas o valor de cada parcela futura diminui. Essa alternativa é mais indicada para quem precisa aliviar o orçamento mensal sem abrir mão do prazo original.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Para quem deseja simular o financiamento completo, recomendamos o{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">Simulador de Financiamento</Link>{" "}
            disponível em nosso site. Ele permite comparar cenários com Tabela Price e SAC, oferecendo uma visão detalhada de parcelas, juros e amortização ao longo de todo o contrato.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como o desconto é calculado na antecipação?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O desconto na antecipação é calculado trazendo o valor de cada parcela futura ao valor presente, descontando a taxa de juros mensal do contrato. Quanto mais distante a parcela antecipada estiver do momento atual, maior será o desconto obtido, pois há mais meses de juros a serem eliminados. Por exemplo, uma parcela que vence daqui a 30 meses terá um desconto significativamente maior do que uma que vence daqui a 5 meses.
          </p>
          <p className="text-[#475569] leading-relaxed">
            No sistema Price, todas as parcelas possuem o mesmo valor nominal, então o desconto varia conforme a distância temporal. Já no sistema SAC, as parcelas finais são menores (pois a amortização é constante e os juros decrescentes), mas o princípio do desconto permanece o mesmo. Em ambos os casos, o simulador acima calcula automaticamente o valor presente de cada parcela antecipada e apresenta a economia de forma detalhada.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para economizar com antecipação de parcelas
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A estratégia mais vantajosa costuma ser antecipar as últimas parcelas do contrato, pois são as que carregam mais juros acumulados. Além disso, é importante negociar diretamente com a instituição financeira para confirmar a taxa de desconto aplicada. Algumas instituições podem oferecer condições especiais em determinados períodos. Utilize também a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">calculadora de IPVA</Link>{" "}
            para planejar seus gastos anuais com o veículo e definir quanto pode destinar à antecipação.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Por fim, antes de realizar qualquer antecipação, verifique se o contrato de financiamento prevê alguma taxa administrativa para a operação. Embora a maioria dos contratos não cobre esse tipo de tarifa, é prudente confirmar para evitar surpresas. O planejamento financeiro adequado, aliado ao uso de ferramentas como este simulador, permite tomar decisões mais conscientes e economizar valores significativos ao longo do financiamento.
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
              <p className="text-sm text-[#64748B]">Simule parcelas, juros totais e tabela de amortização completa com Price e SAC.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Quitação Antecipada</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa quitar seu financiamento antes do prazo e economize nos juros.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de CET</h3>
              <p className="text-sm text-[#64748B]">Calcule o Custo Efetivo Total do financiamento incluindo tarifas e seguros embutidos.</p>
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
              name: "Simulador de Antecipação de Parcelas",
              description:
                "Simule a economia ao antecipar parcelas do financiamento veicular. Calcule o desconto, novo saldo devedor e compare cenários.",
              url: "https://consultaplacabrasil.com/ferramentas/antecipacao-parcelas",
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
                  name: "Tenho direito a desconto ao antecipar parcelas do financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. O Código de Defesa do Consumidor (artigo 52, parágrafo 2º) garante o direito à redução proporcional dos juros e demais acréscimos ao antecipar parcelas de qualquer financiamento.",
                  },
                },
                {
                  "@type": "Question",
                  name: "É melhor reduzir o prazo ou o valor da parcela ao antecipar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Reduzir o prazo costuma gerar maior economia total, pois elimina meses de juros. Reduzir o valor da parcela é indicado para quem precisa aliviar o orçamento mensal sem alterar o prazo do contrato.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como é calculado o desconto na antecipação de parcelas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O desconto é calculado trazendo cada parcela futura ao valor presente, descontando a taxa de juros mensal do contrato. Quanto mais distante a parcela antecipada, maior o desconto obtido.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Posso antecipar parcelas de financiamento com Tabela Price e SAC?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. A antecipação pode ser feita em ambos os sistemas. No Price, todas as parcelas têm o mesmo valor nominal. No SAC, as parcelas são decrescentes, mas o princípio do desconto é o mesmo.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O banco pode cobrar taxa para antecipar parcelas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Na maioria dos contratos, não há cobrança de taxa adicional para antecipação. Porém, é recomendável verificar as cláusulas do seu contrato antes de solicitar a operação à instituição financeira.",
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
                  name: "Antecipação de Parcelas",
                  item: "https://consultaplacabrasil.com/ferramentas/antecipacao-parcelas",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
