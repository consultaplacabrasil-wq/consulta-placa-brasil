import { Metadata } from "next";
import Link from "next/link";

import CalculadoraDepreciacao from "@/components/ferramentas/calculadora-depreciacao";

export const metadata: Metadata = {
  title: "Calculadora de Depreciação Veicular | Consulta Placa",
  description:
    "Calcule a depreciação do seu veículo para os próximos 5 anos. Descubra quanto seu carro, moto ou caminhão perde de valor por ano. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/calculadora-depreciacao",
  },
  openGraph: {
    title: "Calculadora de Depreciação Veicular | Consulta Placa",
    description:
      "Simule a depreciação do seu veículo e descubra quanto ele valerá nos próximos anos. Projeção detalhada por ano com taxas reais do mercado brasileiro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-depreciacao",
    type: "website",
  },
};

export default function CalculadoraDepreciacaoPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Calculadora de Depreciação</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Depreciação Veicular
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Estime quanto seu veículo vai desvalorizar nos próximos 5 anos com projeção detalhada por tipo.
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
        <div className="container mx-auto px-4 max-w-3xl">
          <CalculadoraDepreciacao />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é depreciação de veículos e por que ela importa?
          </h2>
          <p className="text-[#475569]">
            A depreciação veicular é a perda de valor que todo automóvel, motocicleta ou caminhão
            sofre ao longo do tempo. Trata-se de um dos maiores custos ocultos de possuir um
            veículo no Brasil, podendo representar uma perda de até 50% do valor original nos
            primeiros cinco anos de uso. Compreender como a depreciação funciona é essencial para
            tomar decisões financeiras inteligentes, seja na hora de comprar um veículo novo ou
            seminovo, planejar a troca, fazer uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              pesquisa de placa
            </Link>{" "}
            para verificar o histórico do automóvel, ou calcular o{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">custo total de propriedade do veículo</Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona o cálculo da depreciação?
          </h3>
          <p className="text-[#475569]">
            A depreciação de um veículo não ocorre de maneira uniforme. No primeiro ano, um carro
            zero-quilômetro pode perder até 20% do seu valor de mercado — é o período de maior
            desvalorização. No segundo ano, a taxa cai para aproximadamente 15%, seguida por 12%
            no terceiro ano, 10% no quarto e cerca de 7% ao ano a partir do quinto ano. Nossa
            calculadora utiliza essas taxas médias do mercado brasileiro, ajustadas conforme o
            tipo de veículo, para projetar o valor futuro do seu automóvel com precisão.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Fatores que influenciam a depreciação
          </h3>
          <p className="text-[#475569]">
            Diversos fatores impactam a velocidade com que um veículo perde valor. A marca e o
            modelo são determinantes: veículos populares com boa aceitação no mercado tendem a
            depreciar menos. A quilometragem é outro fator crucial — carros com uso acima da
            média (15.000 km/ano) desvalorizam mais rapidamente. O estado de conservação, o
            histórico de manutenção, a cor (cores neutras como branco, prata e preto são
            preferidas), a região do país e até o tipo de combustível também influenciam.
            Veículos flex, por exemplo, costumam ter melhor valor de revenda no Brasil do que
            modelos movidos exclusivamente a gasolina. Se está em dúvida entre um modelo elétrico e
            um a combustão, confira nosso{" "}
            <Link href="/ferramentas/eletrico-vs-combustao" className="text-[#FF4D30] hover:underline font-medium">comparador elétrico vs combustão</Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Diferença entre depreciação de carros, motos e caminhões
          </h3>
          <p className="text-[#475569]">
            Cada tipo de veículo apresenta um padrão distinto de depreciação. As motocicletas
            tendem a depreciar mais rapidamente que os automóveis, principalmente por conta do
            desgaste mecânico mais acentuado e da maior exposição às condições climáticas. Já os
            caminhões apresentam uma depreciação mais lenta, especialmente quando são de marcas
            reconhecidas e estão bem conservados, pois são veículos de trabalho com alta demanda
            no mercado de usados. Na nossa calculadora, aplicamos fatores de ajuste específicos
            para cada categoria, garantindo uma estimativa mais realista e próxima da realidade
            do mercado brasileiro.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para reduzir a depreciação do seu veículo
          </h3>
          <p className="text-[#475569]">
            Embora a depreciação seja inevitável, algumas estratégias podem minimizar a perda de
            valor. Manter as revisões em dia na concessionária ou oficina de confiança, guardar
            todos os comprovantes de manutenção, manter a quilometragem dentro da média anual,
            evitar modificações que descaracterizem o veículo e optar por cores de maior
            aceitação no mercado são práticas que ajudam a preservar o valor de revenda. Comprar
            um veículo seminovo com um ou dois anos de uso também é uma estratégia inteligente,
            pois você evita a maior faixa de depreciação que ocorre logo após a saída da
            concessionária. Também é possível{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              checar placa
            </Link>{" "}
            do veículo desejado para confirmar sua procedência. Para planejar melhor a compra, experimente também nosso{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">simulador de financiamento veicular</Link>{" "}
            e veja as parcelas e juros antes de fechar negócio.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados pela calculadora são estimativas
              baseadas em taxas médias de depreciação do mercado brasileiro. O valor real de
              revenda pode variar conforme marca, modelo, estado de conservação, quilometragem
              e condições do mercado. Para uma avaliação precisa, consulte a Tabela FIPE ou um
              especialista em avaliação veicular.
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
            <Link href="/ferramentas/simulador-financiamento" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Financiamento</h3>
              <p className="text-sm text-[#64748B]">Simule parcelas e juros para financiamento veicular e planeje sua compra.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Calcule quanto seu veículo custa por mês e por ano, incluindo todas as despesas.</p>
            </Link>
            <Link href="/ferramentas/eletrico-vs-combustao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Elétrico vs Combustão</h3>
              <p className="text-sm text-[#64748B]">Compare os custos entre carro elétrico e a combustão em até 60 meses.</p>
            </Link>
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

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Depreciação de Veículos",
            description:
              "Calcule a depreciação do seu veículo para os próximos 5 anos. Projeção detalhada com taxas reais do mercado brasileiro.",
            url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-depreciacao",
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
              url: "https://consultaplacabrasil.com.br",
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
                name: "Quanto um carro perde de valor por ano?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No primeiro ano, um carro novo perde em média 20% do seu valor. No segundo ano, a depreciação é de cerca de 15%, caindo para 12% no terceiro, 10% no quarto e aproximadamente 7% ao ano a partir do quinto ano de uso.",
                },
              },
              {
                "@type": "Question",
                name: "Motos depreciam mais que carros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, as motocicletas tendem a depreciar mais rapidamente que os automóveis, principalmente devido ao desgaste mecânico mais acentuado e à maior exposição às intempéries. Em média, a depreciação de uma moto é cerca de 10% maior que a de um carro.",
                },
              },
              {
                "@type": "Question",
                name: "Qual é a melhor idade para comprar um carro usado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Financeiramente, a melhor opção é comprar um veículo seminovo com 2 a 3 anos de uso. Nesse período, o carro já sofreu a maior faixa de depreciação (cerca de 35-40%) e ainda possui boa vida útil, garantia remanescente e tecnologia atualizada.",
                },
              },
              {
                "@type": "Question",
                name: "Quais fatores aumentam a depreciação de um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Os principais fatores que aceleram a depreciação são: alta quilometragem, falta de manutenção documentada, cores incomuns, modificações que descaracterizam o veículo, histórico de sinistros, e modelos com baixa aceitação no mercado de usados.",
                },
              },
              {
                "@type": "Question",
                name: "Como a depreciação afeta o custo total de um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A depreciação é frequentemente o maior custo de possuir um veículo, superando até mesmo gastos com combustível e manutenção. Um carro de R$ 100.000 pode perder mais de R$ 45.000 em cinco anos, o que representa um custo oculto de aproximadamente R$ 750 por mês.",
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
                name: "Calculadora de Depreciação de Veículos",
                item: "https://consultaplacabrasil.com.br/ferramentas/calculadora-depreciacao",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
