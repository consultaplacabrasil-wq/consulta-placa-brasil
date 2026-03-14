import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CustoTotalVeiculo from "@/components/ferramentas/custo-total-veiculo";

export const metadata: Metadata = {
  title: "Custo Total do Veículo por Ano | Consulta Placa Brasil",
  description:
    "Calcule o custo total anual do seu veículo: IPVA, combustível, manutenção, depreciação, seguro e financiamento. Descubra quanto seu carro custa por mês e por km.",
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
            <span className="text-[#0F172A] font-medium">Custo Total do Veículo</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Custo Total do Veículo por Ano
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubra quanto o seu carro realmente custa por mês, por ano e por quilômetro
            rodado. Inclua IPVA, combustível, manutenção, depreciação, seguro e financiamento
            para ter uma visão completa dos seus gastos.
          </p>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <CustoTotalVeiculo />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como calcular o custo total de um veículo por ano?
          </h2>
          <p className="text-[#475569]">
            Ter um carro no Brasil vai muito além do valor pago na concessionária ou no financiamento.
            O custo real de propriedade de um veículo inclui uma série de despesas fixas e variáveis
            que, somadas, podem representar uma parcela significativa do orçamento familiar. Conhecer
            todos esses gastos é fundamental para tomar decisões financeiras inteligentes, seja na
            hora de comprar um carro novo, trocar de veículo ou até avaliar se vale mais a pena
            utilizar transporte por aplicativo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            IPVA: o imposto anual obrigatório
          </h3>
          <p className="text-[#475569]">
            O Imposto sobre a Propriedade de Veículos Automotores (IPVA) é cobrado anualmente por
            cada estado brasileiro. A alíquota varia conforme a unidade federativa, indo de 2% em
            estados como Santa Catarina e Tocantins até 4% em São Paulo, Rio de Janeiro e Minas
            Gerais. O cálculo é feito sobre o valor venal do veículo, geralmente baseado na Tabela
            FIPE. Para um carro de R$ 80.000 em São Paulo, por exemplo, o IPVA seria de R$ 3.200
            por ano — um valor que não pode ser ignorado no planejamento financeiro.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Combustível: o gasto que depende do seu uso
          </h3>
          <p className="text-[#475569]">
            O combustível costuma ser uma das maiores despesas para quem roda bastante. O cálculo
            é simples: divida a quilometragem mensal pelo consumo médio do veículo (em km/l) e
            multiplique pelo preço do litro. Para quem percorre 1.500 km por mês com um carro
            que faz 10 km/l e abastece a R$ 5,79, o gasto mensal com combustível seria de
            aproximadamente R$ 868,50, totalizando mais de R$ 10.400 por ano. Veículos com
            melhor eficiência energética e motoristas que adotam direção econômica podem reduzir
            consideravelmente esse custo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Manutenção preventiva e corretiva
          </h3>
          <p className="text-[#475569]">
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
          <p className="text-[#475569]">
            A depreciação é frequentemente chamada de &quot;custo invisível&quot; do veículo. Em
            média, um carro perde cerca de 10% do seu valor por ano, sendo que a maior
            desvalorização ocorre nos primeiros anos após a compra. Um veículo adquirido por
            R$ 80.000 pode valer apenas R$ 72.000 após um ano. Embora não seja um gasto direto
            do bolso, a depreciação impacta diretamente o patrimônio do proprietário e deve ser
            considerada no cálculo do custo total de propriedade.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Seguro e financiamento
          </h3>
          <p className="text-[#475569]">
            O seguro automotivo protege contra roubos, furtos, colisões e danos a terceiros.
            O valor varia conforme o perfil do motorista, região, modelo do veículo e cobertura
            escolhida. Já o financiamento, quando aplicável, adiciona parcelas mensais com juros
            ao custo do veículo. É importante incluir ambos no cálculo para ter uma visão realista
            do quanto seu carro realmente custa. Ao somar todas essas categorias — IPVA, combustível,
            manutenção, depreciação, seguro e financiamento — muitos proprietários se surpreendem ao
            descobrir que o custo total pode ultrapassar R$ 2.000 por mês, mesmo para veículos
            populares.
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
