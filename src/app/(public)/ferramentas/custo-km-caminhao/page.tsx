import { Metadata } from "next";
import Link from "next/link";

import CustoKmCaminhao from "@/components/ferramentas/custo-km-caminhao";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Custo por Km do Caminhão",
  description:
    "Calcule o custo por quilômetro do seu caminhão: diesel, pneus, manutenção e depreciação. Compare com o piso da ANTT e descubra o frete mínimo ideal.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/custo-km-caminhao",
  },
  openGraph: {
    title: "Custo por Km do Caminhão | Consulta Placa Brasil",
    description:
      "Calculadora gratuita de custo por km para caminhões. Inclui diesel, pneus, manutenção, depreciação e comparação com o piso mínimo da ANTT.",
    url: "https://consultaplacabrasil.com/ferramentas/custo-km-caminhao",
    type: "website",
  },
};

export default function CustoKmCaminhaoPage() {
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
            <span className="text-gray-300">Custo por Km</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Custo por Km do Caminhão
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule o custo operacional por quilômetro rodado com diesel, pneus, manutenção e depreciação.
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
          <CustoKmCaminhao />
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
            Como calcular o custo por quilômetro do caminhão?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Conhecer o custo por quilômetro do caminhão é essencial para qualquer transportador
            autônomo ou empresa de logística que deseja operar com lucratividade. Esse cálculo
            envolve a soma de todos os custos operacionais, tanto fixos quanto variáveis, divididos pela
            quilometragem percorrida. Sem esse controle, o caminhoneiro corre o risco de aceitar
            fretes que não cobrem sequer as despesas básicas de operação, comprometendo a
            sustentabilidade financeira do negócio. Para verificar dados de qualquer caminhão, faça uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta pela placa
            </Link>{" "}
            diretamente em nosso site. Compare seus resultados com o piso estabelecido
            pela nossa{" "}
            <Link href="/ferramentas/calculadora-frete-antt" className="text-[#FF4D30] hover:underline font-medium">calculadora de frete ANTT</Link>{" "}
            para garantir que seus fretes são rentáveis.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Combustível: a maior despesa variável
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O diesel representa, em média, entre 30% e 40% do custo total de operação de um
            caminhão no Brasil. O consumo médio varia conforme o tipo de veículo, a carga
            transportada, o terreno e o estilo de condução. Um caminhão toco (2 eixos) pode
            fazer entre 4 e 6 km/l, enquanto uma carreta carregada (5 eixos ou mais) costuma
            consumir entre 2 e 3,5 km/l. Com o preço do diesel oscilando próximo de R$ 6,00 o
            litro, esse custo impacta diretamente a rentabilidade de cada viagem. Para reduzir
            o consumo, recomenda-se manter o veículo bem regulado, calibrar os pneus
            regularmente e adotar uma condução econômica, evitando acelerações bruscas. Para veículos
            flex da frota, confira também nossa calculadora{" "}
            <Link href="/ferramentas/calculadora-flex" className="text-[#FF4D30] hover:underline font-medium">gasolina ou etanol</Link>{" "}
            e descubra o combustível mais econômico.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Pneus: custo significativo para frotas
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O custo com pneus é frequentemente subestimado, mas pode representar entre 10% e
            15% do custo operacional total. Um caminhão de 5 eixos utiliza 18 pneus, e cada
            unidade custa em torno de R$ 1.200 a R$ 2.500, dependendo da marca e especificação.
            A vida útil média de um pneu de caminhão varia de 60.000 a 120.000 km, influenciada
            pela qualidade das estradas, calibragem adequada e alinhamento do veículo. Considerar
            a recapagem como alternativa pode reduzir esse custo em até 40%, desde que feita por
            empresas certificadas. A calculadora acima considera automaticamente a quantidade de
            pneus com base no número de eixos do caminhão selecionado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Manutenção preventiva e corretiva
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A manutenção regular do caminhão inclui troca de óleo do motor, filtros de ar e
            combustível, pastilhas e lonas de freio, revisão da suspensão, troca de correias e
            inspeção geral de componentes. Especialistas recomendam destinar entre R$ 1.500 e
            R$ 3.000 por mês para manutenção, dependendo da idade e do estado do veículo.
            Caminhões mais antigos tendem a exigir gastos maiores com reparos corretivos. Manter
            um programa de manutenção preventiva rigoroso evita paradas inesperadas na estrada,
            que geram prejuízos com guincho, diárias e perda de frete.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Depreciação do caminhão
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A depreciação é a perda de valor do veículo ao longo do tempo. Em média, um caminhão
            perde cerca de 10% do seu valor por ano. Para um veículo avaliado em R$ 350.000,
            isso representa aproximadamente R$ 35.000 por ano ou R$ 2.917 por mês. Embora não
            seja uma despesa direta de bolso, a depreciação deve ser considerada no custo
            operacional, pois impacta o valor de revenda e a capacidade de renovação da frota.
            Caminhões bem conservados e com baixa quilometragem tendem a depreciar menos. Utilize
            nossa{" "}
            <Link href="/ferramentas/calculadora-depreciacao" className="text-[#FF4D30] hover:underline font-medium">calculadora de depreciação veicular</Link>{" "}
            para projetar a desvalorização do seu caminhão nos próximos anos.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Piso mínimo de frete da ANTT
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Desde 2018, a Agência Nacional de Transportes Terrestres (ANTT) estabelece pisos
            mínimos de frete rodoviário, com o objetivo de garantir remuneração justa aos
            transportadores. O piso é definido em R$ por tonelada por quilômetro (R$/ton.km) e
            varia conforme o tipo de carga e a distância percorrida. Conhecer o seu custo real
            por quilômetro e compará-lo com o piso da ANTT é fundamental para negociar valores
            de frete que cubram todos os custos operacionais e ainda gerem margem de lucro. Nossa
            calculadora sugere um frete mínimo por km com margem de 20% sobre o custo total,
            servindo como referência inicial para a precificação dos seus serviços de transporte.
            Antes de adquirir um caminhão usado, não deixe de{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              conferir placa de carro
            </Link>{" "}
            para checar a situação do veículo.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são estimativas baseadas nos dados
              informados pelo usuário e em médias de mercado. Os custos reais podem variar
              conforme o modelo do caminhão, condições das estradas, tipo de carga e outros
              fatores. Utilize os resultados como referência para planejamento e precificação
              de fretes.
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
            <Link href="/ferramentas/calculadora-frete-antt" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Frete ANTT</h3>
              <p className="text-sm text-[#64748B]">Calcule o piso mínimo de frete rodoviário pela tabela da ANTT.</p>
            </Link>
            <Link href="/ferramentas/calculadora-flex" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gasolina ou Etanol</h3>
              <p className="text-sm text-[#64748B]">Compare o custo entre combustíveis e escolha o mais econômico.</p>
            </Link>
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Depreciação</h3>
              <p className="text-sm text-[#64748B]">Estime quanto seu caminhão vai desvalorizar nos próximos anos.</p>
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
            name: "Custo por Km do Caminhão",
            description:
              "Calculadora de custo por quilômetro para caminhões. Inclui diesel, pneus, manutenção e depreciação com comparação ao piso da ANTT.",
            url: "https://consultaplacabrasil.com/ferramentas/custo-km-caminhao",
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
                name: "Qual o custo médio por km de um caminhão no Brasil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O custo médio por km de um caminhão no Brasil varia entre R$ 2,00 e R$ 5,00, dependendo do tipo de veículo, preço do diesel, estado de conservação e quilometragem mensal. Caminhões mais pesados com mais eixos tendem a ter custo por km mais elevado devido ao maior consumo de combustível e número de pneus.",
                },
              },
              {
                "@type": "Question",
                name: "Como calcular o custo do diesel por quilômetro?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para calcular o custo do diesel por km, divida o preço do litro do diesel pelo consumo médio do caminhão em km/l. Por exemplo, se o diesel custa R$ 6,30 e o caminhão faz 3,5 km/l, o custo de combustível por km será R$ 6,30 ÷ 3,5 = R$ 1,80 por km.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto custa a manutenção mensal de um caminhão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A manutenção mensal de um caminhão varia entre R$ 1.500 e R$ 3.000, dependendo da idade do veículo e da quilometragem rodada. Isso inclui troca de óleo, filtros, pastilhas de freio, revisão da suspensão e reparos preventivos. Caminhões mais antigos podem exigir gastos maiores com manutenção corretiva.",
                },
              },
              {
                "@type": "Question",
                name: "O que é o piso mínimo de frete da ANTT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O piso mínimo de frete da ANTT é o valor mínimo que deve ser pago pelo transporte rodoviário de cargas, estabelecido pela Agência Nacional de Transportes Terrestres. O valor é definido em R$ por tonelada por quilômetro (R$/ton.km) e serve como referência para garantir remuneração justa aos transportadores.",
                },
              },
              {
                "@type": "Question",
                name: "Como reduzir o custo por km do caminhão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para reduzir o custo por km, adote condução econômica para diminuir o consumo de diesel, mantenha os pneus calibrados e alinhados, faça manutenção preventiva regularmente, negocie melhores preços de combustível e pneus, considere a recapagem de pneus e planeje rotas mais eficientes para aumentar a quilometragem mensal e diluir os custos fixos.",
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
                name: "Custo por Km do Caminhão",
                item: "https://consultaplacabrasil.com/ferramentas/custo-km-caminhao",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
