import { Metadata } from "next";
import Link from "next/link";
import SimuladorRefinanciamento from "@/components/ferramentas/refinanciamento";

export const metadata: Metadata = {
  title: "Simulador de Refinanciamento | Consulta Placa",
  description:
    "Simule o refinanciamento do seu veículo e descubra se vale a pena trocar de contrato. Compare parcelas, juros totais e veja o custo real da operação.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/refinanciamento",
  },
  openGraph: {
    title: "Refinanciamento de Veículo | Consulta Placa Brasil",
    description:
      "Simule o refinanciamento e veja se vale a pena reduzir a parcela. Compare antes e depois com cálculo de custo real.",
    url: "https://consultaplacabrasil.com/ferramentas/refinanciamento",
    type: "website",
  },
};

export default function RefinanciamentoPage() {
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
            <span className="text-gray-300">Refinanciamento</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Simulador de Refinanciamento de Veículo
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Compare as condições do seu financiamento atual com uma proposta de refinanciamento e descubra se a troca de contrato realmente compensa.
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
        <SimuladorRefinanciamento />
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é o refinanciamento de veículo?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O refinanciamento de veículo consiste em substituir o contrato de financiamento vigente por um novo,
            geralmente com condições diferentes de prazo, taxa de juros ou valor da parcela. Essa operação é
            oferecida por bancos e financeiras como uma alternativa para quem está com dificuldade em manter
            as parcelas em dia ou deseja aproveitar taxas mais baixas disponíveis no mercado. Antes de fechar
            qualquer negócio envolvendo veículos, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar a placa</Link>{" "}
            para verificar a situação cadastral e a procedência do bem.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Quando o refinanciamento faz sentido?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O refinanciamento pode ser vantajoso em cenários específicos. O primeiro caso é quando a taxa de juros
            do mercado caiu significativamente desde a contratação do financiamento original. Se você consegue uma
            taxa mensal mais baixa, é possível reduzir tanto a parcela quanto o custo total. O segundo cenário é
            quando há necessidade urgente de aliviar o orçamento mensal, mesmo que isso signifique pagar mais juros
            no longo prazo. Em ambos os casos, a análise precisa considerar o saldo devedor atualizado e o número
            de parcelas que ainda restam.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            A armadilha da parcela menor
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Um dos erros mais comuns ao refinanciar é olhar apenas para o valor da parcela. Muitas propostas oferecem
            parcelas significativamente menores, mas estendem o prazo de pagamento, o que aumenta o custo total com
            juros. Por exemplo, um saldo devedor de R$ 40.000 com 24 parcelas restantes de R$ 2.100 custa R$ 50.400
            no total. Refinanciando esse mesmo saldo em 48 parcelas de R$ 1.300, o total sobe para R$ 62.400. A
            parcela caiu R$ 800, mas o custo total subiu R$ 12.000. Esse é o tipo de análise que nosso simulador
            facilita.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Valor liberado no refinanciamento: vale a pena?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Algumas instituições oferecem a possibilidade de liberar um valor adicional em dinheiro no momento do
            refinanciamento. Isso acontece porque o veículo pode ter um valor de mercado superior ao saldo devedor,
            permitindo que a diferença seja emprestada. Porém, esse dinheiro extra é incorporado ao novo financiamento
            e incide juros ao longo de todo o prazo. Use a{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de financiamento
            </Link>{" "}
            para entender melhor como funcionam os juros compostos em financiamentos veiculares.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para negociar o refinanciamento
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Antes de aceitar uma proposta, pesquise ofertas em diferentes bancos e financeiras. Compare não apenas
            a taxa de juros, mas o Custo Efetivo Total (CET), que inclui tarifas, seguros e impostos embutidos.
            Considere também a portabilidade de crédito, que permite transferir a dívida para outra instituição com
            melhores condições sem precisar refinanciar. Se a motivação é quitar o financiamento mais rápido,
            avalie a possibilidade de amortização antecipada no contrato atual, que pode ser mais econômica do que
            um novo contrato. Para ter uma visão completa da sua situação, combine a análise de refinanciamento com
            o cálculo do{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              custo total do veículo
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
              <p className="text-sm text-[#64748B]">Calcule parcelas, juros totais e tabela de amortização no modo Price ou SAC.</p>
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
              name: "Simulador de Refinanciamento de Veículo",
              description:
                "Simule o refinanciamento do seu veículo e compare parcelas, juros totais e custo real da operação.",
              url: "https://consultaplacabrasil.com/ferramentas/refinanciamento",
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
                  name: "O que é refinanciamento de veículo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Refinanciamento de veículo é a substituição do contrato de financiamento atual por um novo, com condições diferentes de prazo, taxa de juros ou valor de parcela. A operação pode incluir liberação de valor adicional em dinheiro.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Refinanciar o veículo vale a pena?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Depende do cenário. Se a nova taxa de juros for significativamente menor e o prazo não aumentar muito, pode valer a pena. Porém, se o prazo for estendido, o custo total pode aumentar mesmo com parcela menor. É essencial comparar o total pago em ambos os cenários.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a diferença entre refinanciamento e portabilidade de crédito?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Na portabilidade, você transfere a dívida para outro banco com melhores condições, mantendo o saldo devedor e prazo semelhantes. No refinanciamento, um novo contrato é feito, podendo alterar prazo, taxa e até liberar valor adicional. A portabilidade costuma ser mais vantajosa quando a taxa caiu.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Posso liberar dinheiro extra ao refinanciar meu veículo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim, algumas instituições permitem liberar um valor adicional se o veículo vale mais do que o saldo devedor. Porém, esse valor extra é incorporado ao novo financiamento e gera juros ao longo de todo o prazo, tornando o custo real desse dinheiro muito superior ao valor recebido.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quais cuidados devo ter ao refinanciar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Compare o Custo Efetivo Total (CET) e não apenas a taxa de juros. Verifique se há tarifas de contratação, seguros embutidos e IOF adicional. Analise o total pago no contrato atual versus o total do refinanciamento. Uma parcela menor nem sempre significa economia real.",
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
                  name: "Refinanciamento",
                  item: "https://consultaplacabrasil.com/ferramentas/refinanciamento",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
