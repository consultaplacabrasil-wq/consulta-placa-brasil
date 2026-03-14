import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ConsultaFipe from "@/components/ferramentas/consulta-fipe";

export const metadata: Metadata = {
  title: "Consulta Tabela FIPE 2026 | Consulta Placa Brasil",
  description:
    "Consulte a Tabela FIPE 2026 atualizada para carros, motos e caminhões. Descubra o valor de mercado do seu veículo grátis, sem cadastro e em tempo real.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/consulta-fipe",
  },
  openGraph: {
    title: "Consulta Tabela FIPE 2026 | Consulta Placa Brasil",
    description:
      "Consulte o valor do seu veículo na Tabela FIPE 2026 atualizada. Carros, motos e caminhões — grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/consulta-fipe",
    type: "website",
  },
};

export default function ConsultaFipePage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-[#64748B]">
            <Link href="/" className="hover:text-[#FF4D30] transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href="/ferramentas" className="hover:text-[#FF4D30] transition-colors">
              Ferramentas
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-[#0F172A] font-medium">Consulta Tabela FIPE</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Consulta Tabela FIPE 2026
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubra o valor de mercado do seu veículo na Tabela FIPE atualizada.
            Selecione o tipo, marca, modelo e ano para consultar o preço médio de carros, motos e caminhões.
          </p>
        </div>
      </section>

      {/* Consulta */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ConsultaFipe />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é a Tabela FIPE?
          </h2>
          <p className="text-[#475569]">
            A Tabela FIPE (Fundação Instituto de Pesquisas Econômicas) é a principal referência de
            preços de veículos no Brasil. Publicada mensalmente pela FIPE em parceria com a USP
            (Universidade de São Paulo), ela apresenta os valores médios de mercado para automóveis,
            motocicletas e caminhões em todo o território nacional. A tabela é amplamente utilizada
            por concessionárias, seguradoras, financeiras, despachantes e órgãos públicos como base
            para negociações, cálculo de impostos e avaliação de sinistros. Se você deseja calcular
            o IPVA do seu veículo com base no valor FIPE, utilize nossa{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA 2026
            </Link>{" "}
            com alíquotas atualizadas por estado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona a consulta da Tabela FIPE?
          </h3>
          <p className="text-[#475569]">
            A consulta é simples e gratuita. Basta selecionar o tipo de veículo (carro, moto ou
            caminhão), escolher a marca, o modelo e o ano de fabricação. O sistema consulta a API
            oficial da FIPE em tempo real e retorna o valor médio de mercado atualizado, além de
            informações como código FIPE, tipo de combustível e mês de referência. Os dados são
            atualizados mensalmente pela Fundação Instituto de Pesquisas Econômicas, garantindo que
            você tenha acesso ao preço mais recente e confiável do veículo consultado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Para que serve o valor da Tabela FIPE?
          </h3>
          <p className="text-[#475569]">
            O valor FIPE é utilizado em diversas situações do dia a dia. Na compra e venda de
            veículos usados, ele serve como referência para definir um preço justo de negociação.
            No cálculo do IPVA, a maioria dos estados utiliza o valor FIPE como base para aplicar
            a alíquota do imposto. As seguradoras também utilizam a tabela para definir o valor de
            indenização em caso de perda total ou roubo. Além disso, instituições financeiras
            consultam a FIPE para aprovar financiamentos e definir limites de crédito. Para quem
            está pensando em financiar um veículo, recomendamos o nosso{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simulador de financiamento veicular
            </Link>{" "}
            para comparar parcelas e taxas de juros.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            O valor FIPE é o preço final do veículo?
          </h3>
          <p className="text-[#475569]">
            Não. O valor da Tabela FIPE representa uma média de mercado e serve como referência,
            mas o preço real de um veículo pode variar conforme estado de conservação, quilometragem,
            localização geográfica, cor, opcionais instalados e condições de oferta e demanda da
            região. Veículos em excelente estado podem ser negociados acima da FIPE, enquanto
            veículos com histórico de sinistros, alta quilometragem ou pendências documentais
            tendem a ser vendidos abaixo. Use a FIPE como ponto de partida e considere esses
            fatores na hora de negociar. Ao avaliar um veículo usado, você também pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placas de veículos
            </Link>{" "}
            para obter informações detalhadas sobre o histórico do automóvel. Para entender quanto o seu veículo desvaloriza ao longo
            do tempo, experimente nossa{" "}
            <Link href="/ferramentas/calculadora-depreciacao" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de depreciação veicular
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Com que frequência a Tabela FIPE é atualizada?
          </h3>
          <p className="text-[#475569]">
            A Tabela FIPE é atualizada mensalmente pela Fundação Instituto de Pesquisas Econômicas.
            A cada mês, os pesquisadores coletam dados de transações reais de compra e venda em
            concessionárias, lojas de veículos usados e entre particulares em todo o Brasil. Essas
            informações são tratadas estatisticamente para gerar o valor médio de cada veículo. Por
            isso, é importante consultar a tabela atualizada antes de realizar qualquer transação,
            já que os valores podem oscilar de um mês para outro em função do mercado automotivo.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são obtidos diretamente da API da
              Tabela FIPE e representam médias de mercado. O preço real de compra ou venda de um
              veículo pode variar conforme as condições de negociação, estado do veículo e região.
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
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o IPVA 2026 do seu veículo com alíquotas atualizadas por estado e opções de parcelamento.</p>
            </Link>
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Depreciação</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto o seu veículo desvaloriza por ano e projete o valor futuro de revenda.</p>
            </Link>
            <Link href="/ferramentas/simulador-financiamento" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Financiamento</h3>
              <p className="text-sm text-[#64748B]">Simule parcelas e juros do financiamento veicular comparando Tabela Price e SAC.</p>
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
            name: "Consulta Tabela FIPE 2026",
            description:
              "Consulte a Tabela FIPE atualizada e descubra o valor de mercado de carros, motos e caminhões.",
            url: "https://consultaplacabrasil.com.br/ferramentas/consulta-fipe",
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
                name: "O que é a Tabela FIPE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A Tabela FIPE é uma referência de preços médios de veículos no Brasil, publicada mensalmente pela Fundação Instituto de Pesquisas Econômicas (FIPE) em parceria com a USP. Ela abrange carros, motos e caminhões.",
                },
              },
              {
                "@type": "Question",
                name: "Para que serve o valor da Tabela FIPE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O valor FIPE é usado como referência para compra e venda de veículos, cálculo do IPVA, definição de indenização por seguradoras e aprovação de financiamentos por instituições financeiras.",
                },
              },
              {
                "@type": "Question",
                name: "Com que frequência a Tabela FIPE é atualizada?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A Tabela FIPE é atualizada mensalmente pela Fundação Instituto de Pesquisas Econômicas com base em dados reais de transações de compra e venda em todo o Brasil.",
                },
              },
              {
                "@type": "Question",
                name: "O valor FIPE é o preço final do veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. O valor FIPE é uma média de mercado. O preço real pode variar conforme estado de conservação, quilometragem, região, cor e opcionais do veículo.",
                },
              },
              {
                "@type": "Question",
                name: "A consulta da Tabela FIPE é gratuita?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. A consulta da Tabela FIPE no Consulta Placa Brasil é totalmente gratuita, sem necessidade de cadastro. Basta selecionar tipo, marca, modelo e ano do veículo.",
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
                name: "Consulta Tabela FIPE",
                item: "https://consultaplacabrasil.com.br/ferramentas/consulta-fipe",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
