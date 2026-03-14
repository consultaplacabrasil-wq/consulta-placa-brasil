import { Metadata } from "next";
import Link from "next/link";

import CalculadoraFreteAntt from "@/components/ferramentas/calculadora-frete-antt";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Calculadora de Frete ANTT | Consulta Placa Brasil",
  description:
    "Calcule o piso mínimo de frete rodoviário conforme a tabela ANTT. Informe eixos, tipo de carga, peso e distância para obter o valor estimado com pedágio.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/calculadora-frete-antt",
  },
  openGraph: {
    title: "Calculadora de Frete ANTT | Consulta Placa Brasil",
    description:
      "Simule o frete mínimo rodoviário pela tabela ANTT. Grátis, sem cadastro e com cálculo detalhado de pedágio por eixo.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-frete-antt",
    type: "website",
  },
};

export default function CalculadoraFreteAnttPage() {
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
            <span className="text-gray-300">Calculadora de Frete</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Frete ANTT
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule o valor mínimo de frete conforme a tabela piso da ANTT por tipo de carga, eixos e distância.
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
          <CalculadoraFreteAntt />
        </div>
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é a tabela de frete mínimo da ANTT?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A Agência Nacional de Transportes Terrestres (ANTT) é o órgão regulador
            responsável por estabelecer os pisos mínimos de frete para o transporte
            rodoviário de cargas no Brasil. Desde a publicação da Lei nº 13.703/2018,
            popularmente conhecida como Lei do Caminhoneiro, tornou-se obrigatório o
            cumprimento de valores mínimos de frete para proteger os transportadores
            autônomos e garantir condições justas de remuneração. O descumprimento
            desses pisos pode acarretar sanções administrativas e multas tanto para
            embarcadores quanto para transportadoras. Ao contratar um transportador autônomo, é possível{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              puxar placa de veículo
            </Link>{" "}
            para confirmar os dados do caminhão. Para entender melhor seus custos operacionais,
            utilize nossa calculadora de{" "}
            <Link href="/ferramentas/custo-km-caminhao" className="text-[#FF4D30] hover:underline font-medium">custo por quilômetro do caminhão</Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como é calculado o frete mínimo rodoviário?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O cálculo do frete mínimo leva em consideração diversos fatores essenciais:
            o peso da carga em toneladas, a distância percorrida em quilômetros, o tipo
            de carga transportada e o número de eixos do veículo. A ANTT define uma taxa
            base por tonelada-quilômetro que varia conforme a categoria da carga. Para
            carga geral, granel sólido, granel líquido, cargas frigorificadas e cargas
            perigosas, cada modalidade possui coeficientes específicos. Além do frete
            propriamente dito, é acrescida uma parcela referente ao pedágio, calculada
            com base no número de eixos do veículo multiplicado pela distância percorrida
            e pelo custo médio de pedágio por eixo-quilômetro.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Tipos de carga na tabela ANTT
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A tabela de pisos mínimos da ANTT classifica as cargas em cinco categorias
            principais. A carga geral abrange mercadorias diversas transportadas em
            embalagens, paletes ou volumes unitizados. O granel sólido inclui produtos
            como grãos, minérios e fertilizantes, transportados sem embalagem individual.
            O granel líquido compreende combustíveis, produtos químicos e outros fluidos.
            As cargas frigorificadas exigem controle de temperatura durante o transporte,
            como alimentos perecíveis e medicamentos. Por fim, as cargas perigosas
            englobam materiais inflamáveis, tóxicos, corrosivos e explosivos, que
            demandam veículos especializados e documentação específica conforme as
            normas do IBAMA e do Exército Brasileiro. Você pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa veicular
            </Link>{" "}
            para conferir o tipo e a situação de qualquer veículo de carga. Para comparar custos de combustível na sua
            frota, experimente nossa calculadora{" "}
            <Link href="/ferramentas/calculadora-flex" className="text-[#FF4D30] hover:underline font-medium">gasolina ou etanol</Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Importância do número de eixos no cálculo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O número de eixos do veículo influencia diretamente na parcela de pedágio
            do frete. Veículos com mais eixos pagam proporcionalmente mais pedágio por
            quilômetro percorrido, pois as tarifas das concessionárias são calculadas
            por eixo. Um caminhão de dois eixos paga significativamente menos pedágio
            do que uma composição de nove eixos na mesma rota. Por isso, a ANTT inclui
            essa variável na composição do piso mínimo, garantindo que o transportador
            seja adequadamente remunerado pelo custo real da operação. Veículos
            rodoviários de carga no Brasil utilizam configurações que variam de dois
            a nove eixos, dependendo da capacidade de carga e do tipo de implemento
            utilizado, como carretas, bitrens e rodotrens. Não se esqueça de calcular também o{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">IPVA do seu veículo</Link>{" "}
            para incluir esse custo no planejamento financeiro da operação.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores calculados por esta ferramenta são
              estimativas baseadas nas taxas de referência da ANTT. O frete efetivo
              pode variar conforme a resolução vigente, condições da rota, custos de
              seguro, taxas de carga e descarga, e negociação entre as partes. Consulte
              sempre a resolução ANTT mais recente para obter os pisos atualizados.
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
            <Link href="/ferramentas/custo-km-caminhao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo por Km do Caminhão</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo operacional por quilômetro rodado do seu caminhão.</p>
            </Link>
            <Link href="/ferramentas/calculadora-flex" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gasolina ou Etanol</h3>
              <p className="text-sm text-[#64748B]">Descubra qual combustível é mais vantajoso para a sua frota.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o valor do IPVA do seu veículo por estado e ano.</p>
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
            name: "Calculadora de Frete ANTT",
            description:
              "Calcule o piso mínimo de frete rodoviário conforme a tabela da ANTT. Informe eixos, tipo de carga, peso e distância para obter o valor estimado com pedágio.",
            url: "https://consultaplacabrasil.com/ferramentas/calculadora-frete-antt",
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
                name: "O que é a tabela de frete mínimo da ANTT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A tabela de frete mínimo da ANTT estabelece os pisos obrigatórios de remuneração para o transporte rodoviário de cargas no Brasil, conforme a Lei nº 13.703/2018. O objetivo é garantir condições justas para os caminhoneiros autônomos.",
                },
              },
              {
                "@type": "Question",
                name: "Como calcular o frete mínimo rodoviário pela ANTT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O frete mínimo é calculado multiplicando o peso da carga (em toneladas) pela distância (em km) e pela taxa ANTT por tonelada-quilômetro. A esse valor é somada a parcela de pedágio, calculada pelo número de eixos multiplicado pela distância e pelo custo de pedágio por eixo-km.",
                },
              },
              {
                "@type": "Question",
                name: "Quais tipos de carga são contemplados pela tabela ANTT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A ANTT classifica as cargas em cinco categorias: carga geral, granel sólido, granel líquido, carga frigorificada e carga perigosa. Cada categoria possui coeficientes específicos para o cálculo do piso mínimo de frete.",
                },
              },
              {
                "@type": "Question",
                name: "O número de eixos do caminhão influencia no valor do frete?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O número de eixos afeta diretamente a parcela de pedágio do frete. Veículos com mais eixos pagam mais pedágio por quilômetro, pois as tarifas das concessionárias são cobradas por eixo. Configurações vão de 2 a 9 eixos.",
                },
              },
              {
                "@type": "Question",
                name: "O que acontece se o frete cobrado for menor que o piso da ANTT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O descumprimento dos pisos mínimos de frete estabelecidos pela ANTT pode acarretar sanções administrativas e multas para embarcadores e transportadoras, conforme previsto na Lei nº 13.703/2018 e nas resoluções complementares da agência.",
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
                name: "Calculadora de Frete ANTT",
                item: "https://consultaplacabrasil.com/ferramentas/calculadora-frete-antt",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
