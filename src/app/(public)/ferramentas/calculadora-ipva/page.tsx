import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CalculadoraIPVA from "@/components/ferramentas/calculadora-ipva";

export const metadata: Metadata = {
  title: "Calculadora de IPVA 2026 | Consulta Placa Brasil",
  description:
    "Calcule o IPVA 2026 do seu veículo por estado. Simule parcelamento em até 5x, desconto à vista e confira a alíquota de cada UF. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/calculadora-ipva",
  },
  openGraph: {
    title: "Calculadora de IPVA 2026 | Consulta Placa Brasil",
    description:
      "Calcule o valor do IPVA 2026 do seu carro, moto ou caminhão. Veja a alíquota por estado, parcelas e desconto à vista.",
    url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-ipva",
    type: "website",
  },
};

export default function CalculadoraIPVAPage() {
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
            <span className="text-[#0F172A] font-medium">Calculadora de IPVA</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Calculadora de IPVA 2026
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubra quanto você vai pagar de IPVA em 2026. Informe o valor do veículo,
            selecione o estado e veja o resultado com opções de parcelamento e desconto à vista.
          </p>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <CalculadoraIPVA />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona o cálculo do IPVA 2026?
          </h2>
          <p className="text-[#475569]">
            O Imposto sobre a Propriedade de Veículos Automotores (IPVA) é um tributo estadual
            cobrado anualmente de todos os proprietários de veículos no Brasil. Antes de calcular
            o imposto, você pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar placa de veículo</Link> para
            obter os dados completos do automóvel. O valor do IPVA é
            calculado com base no valor venal do veículo — geralmente obtido pela Tabela FIPE —
            multiplicado pela alíquota definida por cada estado. Caso você tenha recebido alguma infração,
            utilize nossa <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">calculadora de multas de trânsito</Link> para
            consultar valores e pontos na CNH. Como cada unidade federativa possui
            autonomia para definir suas próprias alíquotas, o valor final do imposto pode variar
            significativamente de um estado para outro.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Alíquotas do IPVA por estado em 2026
          </h3>
          <p className="text-[#475569]">
            As alíquotas do IPVA para automóveis variam de 2% (em estados como Acre, Espírito Santo,
            Santa Catarina e Tocantins) até 4% (em São Paulo, Rio de Janeiro e Minas Gerais). Para
            motocicletas, as alíquotas são geralmente menores, variando entre 1% e 3,5%. Já para
            caminhões e ônibus, as alíquotas costumam ficar entre 1% e 1,5%, como incentivo ao
            transporte de cargas e passageiros. É importante verificar a legislação vigente do seu
            estado, pois as alíquotas podem ser atualizadas anualmente.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Desconto para pagamento à vista
          </h3>
          <p className="text-[#475569]">
            A maioria dos estados brasileiros oferece desconto para quem paga o IPVA em cota única
            (à vista). O percentual de desconto varia conforme o estado, mas geralmente fica entre
            3% e 10%. Na nossa calculadora, utilizamos um desconto padrão de 3%, que é o mínimo
            oferecido pela maioria dos Detrans. Pagar à vista é uma excelente estratégia para
            economizar, especialmente quando o valor do veículo é alto.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Parcelamento do IPVA 2026
          </h3>
          <p className="text-[#475569]">
            O parcelamento do IPVA é permitido na maioria dos estados em até 3 a 5 parcelas, sem
            acréscimo de juros. Entretanto, ao parcelar, o proprietário abre mão do desconto
            oferecido no pagamento à vista. Se você está pensando em financiar um veículo, experimente
            nosso <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">simulador de financiamento veicular</Link> para
            calcular parcelas e juros. As datas de vencimento das parcelas variam conforme
            o final da placa do veículo e o calendário definido pelo Detran de cada estado.
            Ficar atento ao calendário é fundamental para evitar multas e juros por atraso.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Quem está isento do IPVA?
          </h3>
          <p className="text-[#475569]">
            Existem diversas situações de isenção do IPVA previstas em lei. Veículos com mais de
            20 anos de fabricação são isentos na maioria dos estados (o prazo varia entre 10 e 30
            anos, dependendo da UF). Pessoas com deficiência (PcD) também podem solicitar isenção
            mediante laudo médico e processo administrativo junto ao Detran. Veículos oficiais,
            táxis, ambulâncias e veículos de entidades diplomáticas também costumam ter isenção.
            Veículos elétricos e híbridos possuem redução ou isenção total em vários estados,
            como incentivo à mobilidade sustentável. Para entender todos os gastos envolvidos na
            manutenção do seu veículo, confira a calculadora de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">custo total do veículo</Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            O que acontece se não pagar o IPVA?
          </h3>
          <p className="text-[#475569]">
            O não pagamento do IPVA acarreta multa de 0,33% ao dia (limitada a 20%) e juros com
            base na taxa Selic. Após determinado prazo, o débito é inscrito na Dívida Ativa do
            estado, o que pode resultar em protesto do CPF e negativação no SPC/Serasa. Além
            disso, o veículo com IPVA em atraso não pode ser licenciado, e circular sem
            licenciamento é infração gravíssima, sujeita a multa de R$ 293,47, 7 pontos na CNH
            e apreensão do veículo.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados pela calculadora são estimativas
              baseadas nas alíquotas vigentes e no valor informado pelo usuário. Para obter o
              valor exato do IPVA do seu veículo, consulte o site do Detran ou da Secretaria
              da Fazenda do seu estado.
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
            <Link href="/ferramentas/calculadora-multas" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Multas</h3>
              <p className="text-sm text-[#64748B]">Consulte valores, pontos na CNH e gravidade das infrações de trânsito do CTB.</p>
            </Link>
            <Link href="/ferramentas/simulador-financiamento" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Financiamento</h3>
              <p className="text-sm text-[#64748B]">Calcule parcelas, juros totais e compare Tabela Price e SAC no financiamento veicular.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa manter seu veículo por mês incluindo IPVA, seguro e combustível.</p>
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
            name: "Calculadora de IPVA 2026",
            description:
              "Calcule o valor do IPVA 2026 do seu veículo por estado. Simule parcelamento e desconto à vista.",
            url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-ipva",
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
                name: "Como é calculado o IPVA 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O IPVA é calculado multiplicando o valor venal do veículo (Tabela FIPE) pela alíquota definida por cada estado. A alíquota varia de 2% a 4% para carros, 1% a 3,5% para motos e 1% a 1,5% para caminhões.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o desconto para pagamento do IPVA à vista?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A maioria dos estados oferece desconto entre 3% e 10% para pagamento do IPVA em cota única. O percentual exato varia conforme a legislação de cada estado.",
                },
              },
              {
                "@type": "Question",
                name: "Em quantas vezes posso parcelar o IPVA 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O IPVA pode ser parcelado em até 3 a 5 vezes na maioria dos estados, sem cobrança de juros. Porém, ao parcelar, o proprietário perde o desconto do pagamento à vista.",
                },
              },
              {
                "@type": "Question",
                name: "Quem tem direito à isenção de IPVA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Podem ser isentos de IPVA: veículos com mais de 20 anos (prazo varia por estado), pessoas com deficiência (PcD), táxis, veículos oficiais, ambulâncias e, em alguns estados, veículos elétricos e híbridos.",
                },
              },
              {
                "@type": "Question",
                name: "O que acontece se eu não pagar o IPVA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O atraso no IPVA gera multa diária de 0,33% (até 20%) e juros pela Selic. O débito pode ser inscrito em Dívida Ativa, o veículo não pode ser licenciado e circular sem licenciamento é infração gravíssima com apreensão do veículo.",
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
                name: "Calculadora de IPVA 2026",
                item: "https://consultaplacabrasil.com.br/ferramentas/calculadora-ipva",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
