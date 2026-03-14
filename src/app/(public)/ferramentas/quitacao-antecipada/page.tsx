import { Metadata } from "next";
import Link from "next/link";
import QuitacaoAntecipada from "@/components/ferramentas/quitacao-antecipada";

export const metadata: Metadata = {
  title: "Calculadora de Quitação Antecipada | Consulta Placa",
  description:
    "Calcule o valor de quitação antecipada do seu financiamento veicular. Descubra quanto economiza quitando antes do prazo com desconto nos juros.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/quitacao-antecipada",
  },
  openGraph: {
    title: "Calculadora de Quitação Antecipada | Consulta Placa",
    description:
      "Calcule o valor de quitação antecipada do seu financiamento veicular. Descubra quanto economiza quitando antes do prazo.",
    url: "https://consultaplacabrasil.com/ferramentas/quitacao-antecipada",
    type: "website",
  },
};

export default function QuitacaoAntecipadaPage() {
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
            <span className="text-gray-300">Quitação Antecipada</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Quitação Antecipada de Financiamento
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Descubra quanto você economiza quitando seu financiamento veicular antes do prazo. Compare o custo total das parcelas restantes com o valor de quitação.
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
        <QuitacaoAntecipada />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona a quitação antecipada de financiamento veicular?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A quitação antecipada é o direito que todo consumidor brasileiro tem de pagar o saldo devedor
            do seu financiamento antes do prazo contratado. De acordo com o Código de Defesa do Consumidor
            e a Lei 14.181/2021, as instituições financeiras são obrigadas a conceder desconto proporcional
            dos juros futuros quando o cliente opta por antecipar o pagamento. Antes de quitar, recomendamos{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar placa</Link>{" "}
            do veículo para garantir que toda a documentação esteja regularizada.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Na prática, ao quitar o financiamento antes do vencimento, você paga apenas o saldo devedor
            atualizado, sem os juros das parcelas que ainda não venceram. Isso pode representar uma economia
            significativa, especialmente nos primeiros meses do contrato, quando a proporção de juros
            nas parcelas é maior. Utilize o{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simulador de financiamento
            </Link>{" "}
            para comparar diferentes cenários de prazo e taxa.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Tabela Price ou SAC: qual sistema tem mais vantagem na quitação?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            No sistema Price, as parcelas são fixas, mas nos primeiros meses a maior parte do valor
            corresponde aos juros. Por isso, quitar antecipadamente no Price tende a gerar uma economia
            percentual maior, já que o saldo devedor diminui mais lentamente no início do contrato.
            No sistema SAC, a amortização é constante e os juros diminuem a cada mês, o que significa
            que o saldo devedor cai mais rápido. Ainda assim, a quitação antecipada no SAC também
            gera economia considerável ao eliminar os juros das parcelas futuras.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Para entender se os juros do seu contrato estão dentro dos padrões de mercado, utilize
            a{" "}
            <Link href="/ferramentas/juros-abusivos" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de juros abusivos
            </Link>. Taxas acima da média praticada pelo mercado podem ser contestadas junto ao banco
            ou em órgãos de defesa do consumidor.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Passo a passo para solicitar a quitação antecipada
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O primeiro passo é entrar em contato com a instituição financeira e solicitar o boleto
            de quitação com a data desejada de pagamento. O banco tem até 5 dias úteis para fornecer
            o valor atualizado com o desconto dos juros. Compare o valor informado pelo banco com o
            resultado desta calculadora para verificar se o desconto oferecido está correto. Após o
            pagamento, solicite o termo de quitação e providencie a baixa da alienação fiduciária
            no documento do veículo junto ao Detran.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Também é importante verificar o Custo Efetivo Total do financiamento original. Use a{" "}
            <Link href="/ferramentas/calculadora-cet" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de CET
            </Link>{" "}
            para conferir se todos os encargos estão sendo considerados corretamente. Lembre-se de que
            a quitação antecipada é um direito garantido por lei, e nenhuma instituição pode negar
            ou dificultar o processo. Caso encontre resistência, registre reclamação no Banco Central
            ou no Procon do seu estado.
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
              <p className="text-sm text-[#64748B]">Simule parcelas Price e SAC com tabela de amortização completa para seu veículo.</p>
            </Link>
            <Link href="/ferramentas/juros-abusivos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se a taxa de juros do seu financiamento está acima da média de mercado.</p>
            </Link>
            <Link href="/ferramentas/calculadora-cet" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de CET</h3>
              <p className="text-sm text-[#64748B]">Calcule o Custo Efetivo Total do financiamento incluindo tarifas e seguros.</p>
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
              name: "Calculadora de Quitação Antecipada de Financiamento",
              description:
                "Calcule o valor de quitação antecipada do seu financiamento veicular e descubra quanto economiza quitando antes do prazo.",
              url: "https://consultaplacabrasil.com/ferramentas/quitacao-antecipada",
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
                  name: "O que é quitação antecipada de financiamento?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A quitação antecipada é o pagamento do saldo devedor do financiamento antes do prazo final do contrato. O consumidor tem direito a desconto proporcional dos juros futuros, conforme previsto no Código de Defesa do Consumidor.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quanto economizo ao quitar o financiamento antecipadamente?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A economia depende do saldo devedor, da taxa de juros e do número de parcelas restantes. Quanto mais parcelas faltarem, maior a economia, pois os juros futuros são eliminados. Em financiamentos longos, a economia pode ultrapassar 30% do valor restante.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O banco pode negar a quitação antecipada?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Não. A quitação antecipada é um direito garantido pelo Código de Defesa do Consumidor (Art. 52, §2º) e pela Lei 14.181/2021. O banco tem até 5 dias úteis para fornecer o boleto com o valor atualizado e o desconto dos juros.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como é calculado o valor de quitação antecipada?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O valor de quitação corresponde ao saldo devedor atualizado até a data do pagamento, descontando os juros das parcelas que ainda não venceram. O cálculo varia conforme o sistema de amortização utilizado (Price ou SAC).",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que fazer após quitar o financiamento do veículo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Após a quitação, solicite o termo de quitação ao banco e providencie a baixa da alienação fiduciária no documento do veículo junto ao Detran. Isso libera o veículo de qualquer restrição financeira e permite a transferência livre.",
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
                  name: "Quitação Antecipada",
                  item: "https://consultaplacabrasil.com/ferramentas/quitacao-antecipada",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
