import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CalculadoraCombustivel from "@/components/ferramentas/calculadora-combustivel";

export const metadata: Metadata = {
  title: "Calculadora de Combustível por Viagem | Consulta Placa Brasil",
  description:
    "Calcule o custo de combustível da sua viagem. Informe distância, consumo e preço do litro para saber litros necessários, custo total e por passageiro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/calculadora-combustivel",
  },
  openGraph: {
    title: "Calculadora de Combustível por Viagem | Consulta Placa Brasil",
    description:
      "Calcule o custo de combustível da sua viagem. Informe distância, consumo e preço do litro para saber litros necessários, custo total e por passageiro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-combustivel",
    type: "website",
  },
};

export default function CalculadoraCombustivelPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-[#0F172A] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/ferramentas" className="hover:text-white transition-colors">
              Ferramentas
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Calculadora de Combustível</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 pb-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Calculadora de Combustível por Viagem
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Planeje o custo de combustível da sua viagem. Calcule litros necessários,
            custo total, custo por passageiro e quantas paradas para abastecer.
          </p>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl -mt-8">
          <CalculadoraCombustivel />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como calcular o custo de combustível de uma viagem?
          </h2>
          <p className="text-[#475569]">
            Planejar o gasto com combustível é uma etapa fundamental antes de qualquer viagem de
            carro no Brasil. Seja uma viagem de férias, uma mudança ou um deslocamento a trabalho,
            saber antecipadamente quanto você vai gastar com combustível evita surpresas e ajuda no
            controle financeiro. O cálculo é simples: divida a distância total da viagem pelo consumo
            médio do seu veículo (em km/l) para descobrir quantos litros serão necessários. Em seguida,
            multiplique pela quantidade de litros pelo preço do combustível na sua região. Nossa
            calculadora faz esse cálculo automaticamente e ainda oferece informações extras, como o
            número de paradas para abastecimento e a divisão do custo entre passageiros. Se você viaja
            com frequência, confira também a nossa{" "}
            <Link href="/ferramentas/calculadora-flex" className="text-[#FF4D30] hover:underline font-medium">
              calculadora flex
            </Link>{" "}
            para descobrir se compensa abastecer com gasolina ou etanol.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para economizar combustível em viagens longas
          </h3>
          <p className="text-[#475569]">
            Existem diversas estratégias para reduzir o consumo de combustível durante viagens rodoviárias.
            Manter a velocidade constante entre 90 e 110 km/h é uma das mais eficazes, pois a resistência
            do ar aumenta exponencialmente em velocidades mais altas. Calibrar os pneus corretamente antes
            da viagem também faz diferença: pneus com pressão abaixo do recomendado aumentam o atrito com
            o solo e elevam o consumo. Evite carregar peso desnecessário no porta-malas e, se possível,
            retire o bagageiro de teto quando ele não estiver em uso. O uso moderado do ar-condicionado em
            rodovias tem impacto menor do que na cidade, mas em trajetos urbanos, abrir as janelas pode ser
            mais econômico. Para entender todos os custos envolvidos na manutenção do seu veículo, utilize
            nossa ferramenta de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              custo total do veículo
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como medir o consumo médio do seu veículo
          </h3>
          <p className="text-[#475569]">
            Para obter um resultado preciso na calculadora, é importante conhecer o consumo real do seu
            carro. O método mais confiável é o seguinte: abasteça o tanque completo e zere o hodômetro
            parcial. Rode normalmente até precisar abastecer novamente e complete o tanque. Divida os
            quilômetros rodados pela quantidade de litros abastecidos — esse é o seu consumo médio em km/l.
            Repita o processo pelo menos duas vezes para obter uma média mais confiável. Lembre-se de que
            o consumo na estrada costuma ser significativamente melhor do que na cidade, então considere
            isso ao planejar viagens rodoviárias. Veículos mais modernos com injeção eletrônica e câmbio
            automático CVT tendem a apresentar consumos mais eficientes em estrada. Se está
            avaliando um carro usado para viagens, é possível{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              pesquisar veículo pela placa
            </Link>{" "}
            e verificar informações importantes antes da compra.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Planejando paradas para abastecimento
          </h3>
          <p className="text-[#475569]">
            Em viagens muito longas, planejar onde você vai parar para abastecer é tão importante quanto
            calcular o custo. Nossa calculadora considera um tanque médio de 50 litros para estimar o
            número de paradas necessárias. Em regiões remotas do Brasil, os postos de combustível podem
            ser distantes entre si, e os preços podem variar bastante. Uma boa prática é pesquisar os
            preços nos postos ao longo da rota antes de viajar. Aplicativos de navegação e sites
            especializados mostram o preço do combustível em tempo real nos postos de cada cidade. Se
            está considerando trocar para um veículo elétrico e quer comparar os custos, experimente
            nosso comparador{" "}
            <Link href="/ferramentas/eletrico-vs-combustao" className="text-[#FF4D30] hover:underline font-medium">
              elétrico vs combustão
            </Link>{" "}
            para uma análise detalhada.
          </p>

          <p className="text-[#475569]">
            <Link
              href="/ferramentas"
              className="text-[#FF4D30] font-semibold hover:underline"
            >
              Veja todas as ferramentas veiculares gratuitas
            </Link>{" "}
            disponíveis no Consulta Placa Brasil, incluindo calculadora de IPVA, simulador de
            financiamento, decodificador de chassi e muito mais.
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
            <Link href="/ferramentas/calculadora-flex" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gasolina ou Etanol?</h3>
              <p className="text-sm text-[#64748B]">Descubra qual combustível é mais econômico para o seu veículo flex.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Calcule quanto custa manter seu veículo por mês incluindo IPVA, seguro e combustível.</p>
            </Link>
            <Link href="/ferramentas/eletrico-vs-combustao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Elétrico vs Combustão</h3>
              <p className="text-sm text-[#64748B]">Compare os custos entre veículos elétricos e a combustão ao longo dos anos.</p>
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
            name: "Calculadora de Combustível por Viagem",
            description:
              "Calculadora gratuita para calcular o custo de combustível de viagens de carro. Informe distância, consumo médio e preço do litro para obter o custo total, litros necessários e custo por passageiro.",
            url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-combustivel",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            author: {
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
                name: "Como calcular quantos litros de combustível vou gastar na viagem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Divida a distância total da viagem (em km) pelo consumo médio do seu veículo (em km/l). Por exemplo, uma viagem de 500 km com um carro que faz 12 km/l vai consumir aproximadamente 41,7 litros de combustível.",
                },
              },
              {
                "@type": "Question",
                name: "Como calcular o custo total de combustível de uma viagem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Primeiro calcule os litros necessários (distância ÷ consumo) e depois multiplique pelo preço do litro do combustível. Por exemplo: 500 km ÷ 12 km/l = 41,7 litros × R$ 5,89 = R$ 245,41 de custo total.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o consumo médio de um carro popular no Brasil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Um carro popular 1.0 faz em média 12 a 14 km/l na cidade e 14 a 17 km/l na estrada com gasolina. Com etanol, o consumo é cerca de 30% maior. Carros 1.6 ou 2.0 costumam fazer entre 9 e 12 km/l na cidade.",
                },
              },
              {
                "@type": "Question",
                name: "Como dividir o custo do combustível entre passageiros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Calcule o custo total da viagem e divida pelo número de passageiros. Nossa calculadora faz essa divisão automaticamente. Basta informar o número de pessoas que vão dividir o custo no campo 'Número de passageiros'.",
                },
              },
              {
                "@type": "Question",
                name: "Quantas paradas para abastecer vou precisar fazer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depende da capacidade do tanque do seu veículo e do consumo médio. A maioria dos carros populares tem tanque de 45 a 55 litros. Nossa calculadora estima o número de paradas considerando um tanque médio de 50 litros.",
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
                name: "Calculadora de Combustível",
                item: "https://consultaplacabrasil.com.br/ferramentas/calculadora-combustivel",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
