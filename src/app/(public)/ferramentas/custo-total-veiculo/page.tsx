import { Metadata } from "next";
import Link from "next/link";

import CustoTotalVeiculo from "@/components/ferramentas/custo-total-veiculo";

export const metadata: Metadata = {
  title: "Custo Total do Veículo por Ano | Consulta Placa Brasil",
  description:
    "Calcule o custo total anual do seu veículo: IPVA, combustível, manutenção, depreciação, seguro e financiamento. Veja o custo por mês e por km.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/custo-total-veiculo",
  },
  openGraph: {
    title: "Custo Total do Veículo por Ano | Consulta Placa Brasil",
    description:
      "Calcule todos os custos anuais do seu veículo: IPVA, combustível, manutenção, depreciação, seguro e financiamento. Grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/custo-total-veiculo",
    type: "website",
  },
};

export default function CustoTotalVeiculoPage() {
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
            <span className="text-gray-300">Custo Total do Veículo</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Custo Total do Veículo por Ano
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule quanto seu veículo custa por mês e por ano com IPVA, combustível, manutenção, seguro e depreciação.
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
          <CustoTotalVeiculo />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Custo de Veículo
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "Quanto custa manter um carro por ano no Brasil?",
                answer: "O custo anual de um veículo no Brasil inclui IPVA (2% a 4% do valor), combustível, manutenção (cerca de 3% do valor), depreciação (aproximadamente 10% ao ano), seguro e eventuais parcelas de financiamento. Para um carro de R$ 80.000, o custo total pode ultrapassar R$ 25.000 por ano.",
              },
              {
                question: "Como calcular o custo por quilômetro do meu carro?",
                answer: "Divida o custo total anual do veículo (IPVA + combustível + manutenção + depreciação + seguro + financiamento) pela quilometragem total percorrida no ano. Quanto mais você roda, menor tende a ser o custo por quilômetro, pois os custos fixos são diluídos.",
              },
              {
                question: "Qual a maior despesa de um veículo por ano?",
                answer: "Para a maioria dos proprietários, a depreciação (perda de valor) é o maior custo, representando cerca de 10% do valor do veículo por ano. Em seguida, combustível e financiamento costumam ser os maiores gastos, dependendo da quilometragem e do valor das parcelas.",
              },
              {
                question: "Vale a pena ter carro próprio ou usar transporte por aplicativo?",
                answer: "Depende da sua quilometragem mensal. Se você roda menos de 1.000 km por mês, pode ser mais econômico usar aplicativos de transporte. Calculando o custo total de propriedade (incluindo depreciação, IPVA, seguro e manutenção), é possível comparar com o gasto estimado em corridas de aplicativo.",
              },
              {
                question: "Como reduzir o custo total do meu veículo?",
                answer: "Algumas estratégias incluem: adotar direção econômica para reduzir o consumo de combustível, manter as revisões em dia para evitar reparos caros, comparar preços de seguro entre seguradoras, escolher veículos com menor depreciação e considerar a isenção de IPVA para veículos mais antigos.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-[#0F172A] font-semibold hover:text-[#FF4D30] transition-colors">
                  {item.question}
                  <span className="ml-4 text-[#FF4D30] group-open:rotate-45 transition-transform text-xl font-bold">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[#475569] leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como calcular o custo total de um veículo por ano?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Ter um carro no Brasil vai muito além do valor pago na concessionária ou no financiamento.
            O custo real de propriedade de um veículo inclui uma série de despesas fixas e variáveis
            que, somadas, podem representar uma parcela significativa do orçamento familiar. Antes de
            adquirir um veículo usado, é recomendável{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              buscar placa de carro
            </Link>{" "}
            para conferir o histórico e a procedência do automóvel. Conhecer
            todos esses gastos é fundamental para tomar decisões financeiras inteligentes, seja na
            hora de comprar um carro novo, trocar de veículo ou até avaliar se vale mais a pena
            utilizar transporte por aplicativo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            IPVA: o imposto anual obrigatório
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Imposto sobre a Propriedade de Veículos Automotores (IPVA) é cobrado anualmente por
            cada estado brasileiro e pode ser estimado com precisão usando nossa{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>
            . A alíquota varia conforme a unidade federativa, indo de 2% em
            estados como Santa Catarina e Tocantins até 4% em São Paulo, Rio de Janeiro e Minas
            Gerais. O cálculo é feito sobre o valor venal do veículo, geralmente baseado na Tabela
            FIPE. Para um carro de R$ 80.000 em São Paulo, por exemplo, o IPVA seria de R$ 3.200
            por ano, um valor que não pode ser ignorado no planejamento financeiro.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Combustível: o gasto que depende do seu uso
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O combustível costuma ser uma das maiores despesas para quem roda bastante. Se o seu
            veículo é flex, descubra qual combustível compensa mais com a calculadora{" "}
            <Link href="/ferramentas/calculadora-flex" className="text-[#FF4D30] hover:underline font-medium">
              gasolina ou etanol
            </Link>
            . O cálculo é simples: divida a quilometragem mensal pelo consumo médio do veículo
            (em km/l) e multiplique pelo preço do litro. Para quem percorre 1.500 km por mês com um carro
            que faz 10 km/l e abastece a R$ 5,79, o gasto mensal com combustível seria de
            aproximadamente R$ 868,50, totalizando mais de R$ 10.400 por ano. Veículos com
            melhor eficiência energética e motoristas que adotam direção econômica podem reduzir
            consideravelmente esse custo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Manutenção preventiva e corretiva
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Especialistas do setor automotivo estimam que o custo anual com manutenção corresponde
            a cerca de 3% do valor do veículo. Isso inclui revisões periódicas, troca de óleo,
            filtros, pastilhas de freio, pneus e eventuais reparos. Veículos mais antigos tendem
            a ter custos de manutenção mais elevados, enquanto carros novos costumam ter garantia
            de fábrica nos primeiros anos. Manter as revisões em dia é essencial para preservar o
            valor do automóvel e evitar gastos inesperados com reparos de maior porte.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Depreciação: a perda de valor ao longo do tempo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A depreciação é frequentemente chamada de &quot;custo invisível&quot; do veículo. Use
            a{" "}
            <Link href="/ferramentas/calculadora-depreciacao" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de depreciação
            </Link>{" "}
            para estimar a perda de valor do seu automóvel. Em
            média, um carro perde cerca de 10% do seu valor por ano, sendo que a maior
            desvalorização ocorre nos primeiros anos após a compra. Um veículo adquirido por
            R$ 80.000 pode valer apenas R$ 72.000 após um ano. Embora não seja um gasto direto
            do bolso, a depreciação impacta diretamente o patrimônio do proprietário e deve ser
            considerada no cálculo do custo total de propriedade.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Seguro e financiamento
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O seguro automotivo protege contra roubos, furtos, colisões e danos a terceiros.
            O valor varia conforme o perfil do motorista, região, modelo do veículo e cobertura
            escolhida. Já o financiamento, quando aplicável, adiciona parcelas mensais com juros
            ao custo do veículo. É importante incluir ambos no cálculo para ter uma visão realista
            do quanto seu carro realmente custa. Ao somar todas essas categorias (IPVA, combustível,
            manutenção, depreciação, seguro e financiamento), muitos proprietários se surpreendem ao
            descobrir que o custo total pode ultrapassar R$ 2.000 por mês, mesmo para veículos
            populares. Para verificar pendências e a situação do veículo, você pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              pesquisar veículo pela placa
            </Link>{" "}
            de forma rápida e gratuita.
          </p>

          <p className="text-[#475569] leading-relaxed">
            Explore outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência de veículo
            </Link>
            , o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são estimativas baseadas em médias
              de mercado. Os custos reais podem variar conforme o modelo do veículo, hábitos de
              condução, região e outros fatores. Utilize os resultados como referência para
              planejamento financeiro.
            </p>
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

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
            </Link>
            <Link href="/ferramentas/calculadora-flex" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gasolina ou Etanol</h3>
              <p className="text-sm text-[#64748B]">Descubra qual combustível compensa mais para o seu veículo flex comparando preços e eficiência de gasolina e etanol.</p>
            </Link>
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Depreciação</h3>
              <p className="text-sm text-[#64748B]">Calcule a depreciação estimada do seu veículo ao longo dos anos e descubra quanto ele valerá no futuro.</p>
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
            name: "Custo Total do Veículo por Ano",
            description:
              "Calcule o custo total anual do seu veículo incluindo IPVA, combustível, manutenção, depreciação, seguro e financiamento.",
            url: "https://consultaplacabrasil.com.br/ferramentas/custo-total-veiculo",
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
                name: "Quanto custa manter um carro por ano no Brasil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O custo anual de um veículo no Brasil inclui IPVA (2% a 4% do valor), combustível, manutenção (cerca de 3% do valor), depreciação (aproximadamente 10% ao ano), seguro e eventuais parcelas de financiamento. Para um carro de R$ 80.000, o custo total pode ultrapassar R$ 25.000 por ano.",
                },
              },
              {
                "@type": "Question",
                name: "Como calcular o custo por quilômetro do meu carro?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Divida o custo total anual do veículo (IPVA + combustível + manutenção + depreciação + seguro + financiamento) pela quilometragem total percorrida no ano. Quanto mais você roda, menor tende a ser o custo por quilômetro, pois os custos fixos são diluídos.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a maior despesa de um veículo por ano?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para a maioria dos proprietários, a depreciação (perda de valor) é o maior custo, representando cerca de 10% do valor do veículo por ano. Em seguida, combustível e financiamento costumam ser os maiores gastos, dependendo da quilometragem e do valor das parcelas.",
                },
              },
              {
                "@type": "Question",
                name: "Vale a pena ter carro próprio ou usar transporte por aplicativo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depende da sua quilometragem mensal. Se você roda menos de 1.000 km por mês, pode ser mais econômico usar aplicativos de transporte. Calculando o custo total de propriedade (incluindo depreciação, IPVA, seguro e manutenção), é possível comparar com o gasto estimado em corridas de aplicativo.",
                },
              },
              {
                "@type": "Question",
                name: "Como reduzir o custo total do meu veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Algumas estratégias incluem: adotar direção econômica para reduzir o consumo de combustível, manter as revisões em dia para evitar reparos caros, comparar preços de seguro entre seguradoras, escolher veículos com menor depreciação e considerar a isenção de IPVA para veículos mais antigos.",
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
                name: "Custo Total do Veículo",
                item: "https://consultaplacabrasil.com.br/ferramentas/custo-total-veiculo",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
