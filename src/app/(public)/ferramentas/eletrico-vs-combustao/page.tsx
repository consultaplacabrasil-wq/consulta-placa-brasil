import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import EletricoVsCombustao from "@/components/ferramentas/eletrico-vs-combustao";

export const metadata: Metadata = {
  title: "Elétrico vs Combustão: Comparador de Custos | Consulta Placa Brasil",
  description:
    "Compare os custos entre carro elétrico e a combustão. Calcule custo mensal, ponto de equilíbrio e economia acumulada em 60 meses. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/eletrico-vs-combustao",
  },
  openGraph: {
    title: "Elétrico vs Combustão: Comparador de Custos | Consulta Placa Brasil",
    description:
      "Compare os custos entre carro elétrico e a combustão. Descubra o ponto de equilíbrio e qual veículo é mais econômico em 5 anos.",
    url: "https://consultaplacabrasil.com.br/ferramentas/eletrico-vs-combustao",
    type: "website",
  },
};

export default function EletricoVsCombustaoPage() {
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
            <span className="text-[#0F172A] font-medium">Elétrico vs Combustão</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Elétrico vs Combustão: Comparador de Custos
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubra qual tipo de veículo é mais econômico para o seu perfil. Compare o custo
            mensal de abastecimento, calcule o ponto de equilíbrio e veja o custo acumulado
            em até 60 meses.
          </p>
        </div>
      </section>

      {/* Comparador */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <EletricoVsCombustao />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Carro elétrico ou a combustão: qual é mais econômico?
          </h2>
          <p className="text-[#475569]">
            A escolha entre um carro elétrico e um veículo a combustão vai muito além do preço
            na concessionária. Embora os carros elétricos costumem ter um valor de compra mais
            elevado, o custo operacional — especialmente o gasto com energia — é significativamente
            menor. Para tomar a melhor decisão, é fundamental comparar o custo total de propriedade
            ao longo de vários anos, considerando tanto o investimento inicial quanto as despesas
            recorrentes com abastecimento.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona o comparador de custos?
          </h3>
          <p className="text-[#475569]">
            Nosso comparador calcula o custo mensal de abastecimento de cada tipo de veículo e
            projeta o custo acumulado ao longo de 60 meses (5 anos). Para o carro elétrico,
            o cálculo é baseado no consumo em km/kWh e no preço da energia elétrica por quilowatt-hora.
            Para o veículo a combustão, utilizamos o consumo em km/l e o preço do litro de gasolina.
            A ferramenta também identifica o ponto de equilíbrio (breakeven), ou seja, o momento em
            que a economia no abastecimento do elétrico compensa a diferença no preço de compra.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Vantagens do carro elétrico no custo operacional
          </h3>
          <p className="text-[#475569]">
            O custo por quilômetro de um carro elétrico é, em média, de 3 a 5 vezes menor do que o
            de um veículo movido a gasolina. Um elétrico com consumo de 6 km/kWh e energia a
            R$ 0,90/kWh gasta apenas R$ 0,15 por quilômetro. Já um carro a combustão com consumo
            de 12 km/l e gasolina a R$ 5,79/l custa R$ 0,48 por quilômetro — mais que o triplo.
            Além disso, veículos elétricos exigem menos manutenção, pois não possuem motor a
            explosão, câmbio tradicional, embreagem, correia dentada nem sistema de escapamento.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            O ponto de equilíbrio: quando o elétrico compensa?
          </h3>
          <p className="text-[#475569]">
            O ponto de equilíbrio depende de três fatores principais: a diferença de preço entre
            os veículos, a quilometragem mensal percorrida e os custos de energia e combustível
            da sua região. Quanto maior a quilometragem mensal, mais rápido o elétrico se paga.
            Para motoristas que rodam acima de 2.000 km por mês, o retorno do investimento costuma
            ocorrer em menos de 3 anos. Já para quem roda pouco, pode levar mais de 5 anos para
            recuperar a diferença de preço.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Incentivos fiscais para veículos elétricos no Brasil
          </h3>
          <p className="text-[#475569]">
            Diversos estados brasileiros já oferecem isenção total ou parcial de IPVA para veículos
            elétricos e híbridos. Estados como Maranhão, Pernambuco, Rio Grande do Norte e Piauí
            concedem isenção total, enquanto São Paulo oferece desconto na alíquota. Esses
            incentivos podem representar uma economia de milhares de reais por ano e devem ser
            considerados na análise de custo total. Vale ressaltar que a política de incentivos
            varia conforme a legislação estadual e pode ser alterada ao longo do tempo — consulte
            sempre a Secretaria da Fazenda do seu estado para informações atualizadas.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são estimativas baseadas nos dados
              informados pelo usuário. O comparador considera apenas o custo de aquisição e
              abastecimento. Custos como IPVA, seguro, manutenção e depreciação não estão incluídos
              nesta simulação. Utilize os resultados como referência para planejamento financeiro.
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
            name: "Comparador Elétrico vs Combustão",
            description:
              "Compare os custos entre carro elétrico e a combustão. Calcule custo mensal, ponto de equilíbrio e economia acumulada em 60 meses.",
            url: "https://consultaplacabrasil.com.br/ferramentas/eletrico-vs-combustao",
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
                name: "Carro elétrico é mais barato que carro a combustão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O custo operacional do carro elétrico é significativamente menor: o gasto com energia elétrica por quilômetro é de 3 a 5 vezes inferior ao da gasolina. Porém, o preço de compra costuma ser mais alto. O ponto de equilíbrio depende da quilometragem e dos preços de energia e combustível da sua região.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto custa carregar um carro elétrico por mês?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depende da quilometragem e do consumo do veículo. Um carro elétrico com consumo de 6 km/kWh, rodando 1.500 km/mês com energia a R$ 0,90/kWh, gasta aproximadamente R$ 225 por mês — muito menos que os R$ 723 que um carro a combustão com 12 km/l gastaria com gasolina a R$ 5,79/l.",
                },
              },
              {
                "@type": "Question",
                name: "Em quantos anos o carro elétrico se paga?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O tempo de retorno depende da diferença de preço entre os veículos e da quilometragem mensal. Para motoristas que rodam 1.500 km/mês, o retorno costuma ocorrer entre 3 e 5 anos. Quanto mais quilômetros percorridos, mais rápido o investimento se paga.",
                },
              },
              {
                "@type": "Question",
                name: "Carro elétrico paga IPVA no Brasil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Depende do estado. Alguns estados como Maranhão, Pernambuco, Rio Grande do Norte e Piauí oferecem isenção total de IPVA para veículos elétricos. São Paulo oferece desconto na alíquota. Consulte a legislação do seu estado para informações atualizadas.",
                },
              },
              {
                "@type": "Question",
                name: "Como comparar o custo de um carro elétrico com um a combustão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para uma comparação justa, some o preço de compra com o custo de abastecimento ao longo de vários anos (recomendamos 5 anos / 60 meses). Compare o custo total do elétrico (preço + energia elétrica) com o do combustão (preço + gasolina). Use nosso comparador gratuito para fazer esse cálculo automaticamente.",
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
                name: "Elétrico vs Combustão",
                item: "https://consultaplacabrasil.com.br/ferramentas/eletrico-vs-combustao",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
