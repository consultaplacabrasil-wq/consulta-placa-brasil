import { Metadata } from "next";
import Link from "next/link";

import CalculadoraFlex from "@/components/ferramentas/calculadora-flex";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gasolina ou Etanol? Calculadora Flex",
  description:
    "Descubra se é melhor abastecer com gasolina ou etanol no seu veículo flex. Calculadora gratuita com comparação de custo por km e economia mensal.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/calculadora-flex",
  },
  openGraph: {
    title: "Gasolina ou Etanol? Calculadora Flex | Consulta Placa Brasil",
    description:
      "Descubra se é melhor abastecer com gasolina ou etanol no seu veículo flex. Calculadora gratuita com comparação de custo por km e economia mensal.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-flex",
    type: "website",
  },
};

export default function CalculadoraFlexPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Gasolina ou Etanol</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gasolina ou Etanol?
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Descubra qual combustível é mais vantajoso para o seu veículo flex com base nos preços e no consumo médio.
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
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl -mt-8">
          <CalculadoraFlex />
        </div>
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como saber se vale mais a pena gasolina ou etanol?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A dúvida entre abastecer com gasolina ou etanol é uma das mais comuns entre os motoristas
            brasileiros que possuem veículos flex. Se você ainda não conhece todos os dados do seu
            automóvel, faça uma{" "}
            <Link href="/" className="text-[#C73A1E] hover:underline font-medium">consulta veicular</Link> gratuita
            para descobrir modelo, ano e tipo de combustível.
          </p>
          <p className="text-[#475569] leading-relaxed">
            A resposta depende de uma conta simples, mas que
            poucos fazem corretamente: é preciso comparar não apenas o preço por litro, mas o custo
            real por quilômetro rodado, levando em conta a diferença de rendimento entre os dois
            combustíveis. Para uma visão completa dos gastos com o veículo, utilize nossa ferramenta
            de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#C73A1E] hover:underline font-medium">custo total do veículo</Link>,
            que inclui combustível, IPVA, seguro e manutenção.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            A regra dos 70% funciona mesmo?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A regra dos 70% é amplamente utilizada e recomendada por engenheiros automotivos e pelo
            Inmetro. Ela funciona assim: divida o preço do litro do etanol pelo preço do litro da
            gasolina. Se o resultado for menor que 0,70 (ou 70%), o etanol é mais vantajoso. Caso
            contrário, abasteça com gasolina.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Essa regra existe porque o etanol rende em média 30% menos que a gasolina, ou seja,
            o motor consome mais etanol para percorrer a mesma distância. Nossa calculadora aplica
            essa fórmula automaticamente e vai além, mostrando o custo por quilômetro, a economia
            mensal e o preço máximo do etanol para que ele continue compensando.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Fatores que influenciam o consumo de combustível
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O consumo real do seu veículo pode variar dependendo de diversos fatores: condições do
            trânsito (cidade versus estrada), calibragem dos pneus, uso do ar-condicionado, peso
            transportado, estado de manutenção do motor e estilo de condução. Veículos mais novos
            com injeção eletrônica otimizada tendem a aproveitar melhor o etanol, enquanto modelos
            mais antigos podem apresentar rendimento inferior.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Para um resultado mais preciso, sugerimos que você faça a medição real do consumo do seu
            carro: abasteça o tanque completo, zere o hodômetro, rode normalmente e, no próximo
            abastecimento completo, divida os quilômetros rodados pelos litros abastecidos.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Vantagens ambientais do etanol
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Além da questão econômica, o etanol é considerado um combustível mais sustentável. Por ser
            produzido a partir da cana-de-açúcar, a emissão líquida de CO₂ é significativamente menor
            em comparação à gasolina, que é um combustível fóssil derivado do petróleo. Se a
            sustentabilidade é prioridade para você, confira também nosso comparador{" "}
            <Link href="/ferramentas/eletrico-vs-combustao" className="text-[#C73A1E] hover:underline font-medium">elétrico vs combustão</Link>.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O Brasil é referência mundial na produção de etanol, e abastecer com esse combustível contribui para
            a redução da pegada de carbono do transporte nacional. Não se esqueça de verificar o valor do imposto
            anual com a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#C73A1E] hover:underline font-medium">calculadora de IPVA</Link>.
            Use nossa calculadora acima para
            fazer a comparação com os preços atuais da sua região e descubra quanto você pode
            economizar por mês e por ano.
          </p>

          <p className="text-[#475569] leading-relaxed">
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
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa manter seu veículo por mês incluindo IPVA, seguro e combustível.</p>
            </Link>
            <Link href="/ferramentas/eletrico-vs-combustao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Elétrico vs Combustão</h3>
              <p className="text-sm text-[#64748B]">Compare os custos entre veículos elétricos e a combustão ao longo dos anos.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o IPVA 2026 do seu veículo por estado com parcelamento e desconto à vista.</p>
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
            name: "Calculadora Flex: Gasolina ou Etanol?",
            description:
              "Calculadora gratuita para descobrir se é melhor abastecer com gasolina ou etanol no seu veículo flex. Compara custo por km e economia mensal.",
            url: "https://consultaplacabrasil.com/ferramentas/calculadora-flex",
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
                name: "Como saber se é melhor abastecer com gasolina ou etanol?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Divida o preço do etanol pelo preço da gasolina. Se o resultado for menor que 0,70 (70%), o etanol é mais vantajoso. Caso contrário, abasteça com gasolina. Essa regra considera que o etanol rende cerca de 30% menos que a gasolina.",
                },
              },
              {
                "@type": "Question",
                name: "Por que o etanol rende menos que a gasolina?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O etanol possui menor poder calorífico que a gasolina, ou seja, gera menos energia por litro queimado. Em média, um veículo flex consome 30% mais etanol para percorrer a mesma distância que percorreria com gasolina.",
                },
              },
              {
                "@type": "Question",
                name: "A regra dos 70% é confiável?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, a regra dos 70% é amplamente aceita por engenheiros automotivos e pelo Inmetro. Ela é uma simplificação eficaz que funciona para a maioria dos veículos flex. Para maior precisão, meça o consumo real do seu veículo com cada combustível.",
                },
              },
              {
                "@type": "Question",
                name: "Usar etanol estraga o motor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. Veículos flex são projetados para funcionar com gasolina, etanol ou qualquer mistura dos dois. O sistema de injeção eletrônica ajusta automaticamente os parâmetros do motor para o combustível utilizado.",
                },
              },
              {
                "@type": "Question",
                name: "Posso misturar gasolina e etanol no tanque?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, veículos flex podem rodar com qualquer proporção de gasolina e etanol no tanque. O sistema de injeção identifica a mistura e faz os ajustes necessários automaticamente. Não há risco de danos ao motor.",
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
                name: "Gasolina ou Etanol",
                item: "https://consultaplacabrasil.com/ferramentas/calculadora-flex",
              },
            ],
          }),
        }}
      />
    </div>
  );
}