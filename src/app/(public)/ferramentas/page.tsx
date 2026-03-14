import { Metadata } from "next";
import { FerramentasGrid } from "@/components/ferramentas/ferramentas-grid";

export const metadata: Metadata = {
  title: "Ferramentas Veiculares Gratuitas | Consulta Placa",
  description:
    "Ferramentas gratuitas para veículos: calculadora de IPVA, simulador de financiamento, multas, chassi e mais. Use sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas",
  },
  openGraph: {
    title: "Ferramentas Veiculares Gratuitas | Consulta Placa Brasil",
    description:
      "Calculadoras e simuladores gratuitos para veículos. IPVA, financiamento, multas, chassi, etanol vs gasolina e mais.",
    url: "https://consultaplacabrasil.com/ferramentas",
  },
};

const ferramentas = [
  // Consulta e Placas
  {
    slug: "consulta-fipe",
    title: "Consulta Tabela FIPE",
    description: "Consulte o valor de mercado de qualquer veículo pela Tabela FIPE atualizada.",
    iconName: "Search",
    category: "consulta",
  },
  {
    slug: "identificador-placa",
    title: "Identificador de Placa",
    description: "Valide o formato da placa e identifique se é padrão antigo ou Mercosul.",
    iconName: "Eye",
    category: "consulta",
  },
  {
    slug: "conversor-placa",
    title: "Conversor de Placa",
    description: "Converta placas entre o formato antigo e Mercosul de forma automática.",
    iconName: "ArrowLeftRight",
    category: "consulta",
  },
  {
    slug: "gerador-placa",
    title: "Gerador Visual de Placa",
    description: "Visualize como fica a placa do seu veículo no padrão Mercosul ou antigo.",
    iconName: "Car",
    category: "consulta",
  },
  {
    slug: "decodificador-chassi",
    title: "Decodificador de Chassi (VIN)",
    description: "Extraia informações do número de chassi: fabricante, país de origem e ano do modelo.",
    iconName: "FileSearch",
    category: "consulta",
  },
  {
    slug: "consulta-recall",
    title: "Consulta de Recall",
    description: "Verifique recalls recentes por marca e acesse o portal oficial do SENATRAN.",
    iconName: "Bell",
    category: "consulta",
  },
  {
    slug: "calculadora-rodizio",
    title: "Rodízio de Veículos SP/RJ",
    description: "Descubra o dia de rodízio do seu veículo em São Paulo pela placa.",
    iconName: "Ban",
    category: "consulta",
  },

  // Impostos e Multas
  {
    slug: "calculadora-ipva",
    title: "Calculadora de IPVA 2026",
    description: "Calcule o valor do IPVA do seu veículo por estado. Simule parcelamento e desconto à vista.",
    iconName: "Calculator",
    category: "fiscal",
  },
  {
    slug: "calculadora-multas",
    title: "Calculadora de Multas",
    description: "Consulte o valor de qualquer infração do CTB, pontos na CNH e gravidade.",
    iconName: "AlertTriangle",
    category: "fiscal",
  },
  {
    slug: "simulador-pontos-cnh",
    title: "Simulador de Pontos na CNH",
    description: "Simule o acúmulo de pontos na CNH e calcule o risco de suspensão.",
    iconName: "Gauge",
    category: "fiscal",
  },
  {
    slug: "calculadora-dpvat",
    title: "Calculadora DPVAT/SPVAT",
    description: "Calcule o valor do seguro obrigatório SPVAT e conheça as coberturas incluídas.",
    iconName: "Shield",
    category: "fiscal",
  },

  // Compra e Venda
  {
    slug: "simulador-financiamento",
    title: "Simulador de Financiamento",
    description: "Simule parcelas, juros totais e tabela de amortização (Price e SAC) para veículos.",
    iconName: "CreditCard",
    category: "compra",
  },
  {
    slug: "calculadora-transferencia",
    title: "Calculadora de Transferência",
    description: "Estime o custo total para transferir um veículo, incluindo taxas do Detran.",
    iconName: "DollarSign",
    category: "compra",
  },
  {
    slug: "calculadora-depreciacao",
    title: "Calculadora de Depreciação",
    description: "Estime quanto seu veículo vai desvalorizar nos próximos anos.",
    iconName: "BarChart3",
    category: "compra",
  },
  {
    slug: "eletrico-vs-combustao",
    title: "Elétrico vs Combustão",
    description: "Compare o custo de propriedade entre um carro elétrico e um a combustão em 5 anos.",
    iconName: "Zap",
    category: "compra",
  },
  {
    slug: "gerador-contrato",
    title: "Gerador de Contrato",
    description: "Gere um contrato de compra e venda de veículo pronto para imprimir.",
    iconName: "ScrollText",
    category: "compra",
  },
  {
    slug: "consulta-cep",
    title: "Consulta CEP para Transferência",
    description: "Consulte CEPs de origem e destino para saber se precisará de novo emplacamento.",
    iconName: "MapPin",
    category: "compra",
  },

  // Uso Diário
  {
    slug: "calculadora-flex",
    title: "Gasolina ou Etanol?",
    description: "Descubra qual combustível é mais vantajoso para o seu veículo flex.",
    iconName: "Fuel",
    category: "uso",
  },
  {
    slug: "custo-total-veiculo",
    title: "Custo Total do Veículo por Ano",
    description: "Calcule quanto seu veículo custa por mês e por ano com todos os gastos inclusos.",
    iconName: "BarChart3",
    category: "uso",
  },
  {
    slug: "calculadora-combustivel",
    title: "Combustível por Viagem",
    description: "Calcule o custo de combustível para sua viagem com divisão por passageiro.",
    iconName: "MapPin",
    category: "uso",
  },
  {
    slug: "checklist-manutencao",
    title: "Checklist de Manutenção",
    description: "Checklist completo de manutenção por quilometragem para carro, moto e caminhão.",
    iconName: "ClipboardCheck",
    category: "uso",
  },

  // Documentação
  {
    slug: "verificador-documentos",
    title: "Verificador de Documentos",
    description: "Verifique vencimentos da CNH, licenciamento e outros documentos veiculares.",
    iconName: "FileText",
    category: "documentos",
  },

  // Profissional
  {
    slug: "calculadora-frete-antt",
    title: "Calculadora de Frete ANTT",
    description: "Calcule o valor mínimo de frete conforme a tabela piso da ANTT por eixo e distância.",
    iconName: "Truck",
    category: "profissional",
  },
  {
    slug: "custo-km-caminhao",
    title: "Custo por Km do Caminhão",
    description: "Calcule o custo operacional por quilômetro rodado para caminhoneiros e frotas.",
    iconName: "Wrench",
    category: "profissional",
  },
];

export default function FerramentasPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ferramentas Veiculares Gratuitas
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Calculadoras, simuladores e verificadores para ajudar você na compra, venda e manutenção
            do seu veículo. Todas gratuitas e sem cadastro.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {ferramentas.length} ferramentas disponíveis
          </p>
        </div>
      </section>

      {/* Grid with Category Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <FerramentasGrid ferramentas={ferramentas} />
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Ferramentas gratuitas para consulta veicular
          </h2>
          <p className="text-[#475569]">
            O Consulta Placa Brasil oferece {ferramentas.length} ferramentas gratuitas para
            proprietários de veículos, compradores, lojistas de usados, despachantes e caminhoneiros.
            Todas as calculadoras e simuladores funcionam diretamente no seu navegador, sem necessidade
            de cadastro ou instalação.
          </p>
          <p className="text-[#475569]">
            Utilize a calculadora de IPVA para saber quanto vai pagar de imposto em 2026, simule o
            financiamento do seu próximo veículo, descubra se vale mais a pena abastecer com gasolina
            ou etanol, decodifique o número do chassi para verificar a autenticidade do veículo,
            consulte a Tabela FIPE atualizada, verifique recalls, gere contratos de compra e venda
            e muito mais.
          </p>
          <p className="text-[#475569]">
            Para caminhoneiros e transportadores, oferecemos a calculadora de frete ANTT com o piso
            mínimo atualizado e a calculadora de custo por quilômetro, essenciais para precificação
            de fretes e controle de custos operacionais.
          </p>
        </div>
      </section>

      {/* Schema — all tools listed for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ferramentas Veiculares Gratuitas",
            description:
              "Coleção de ferramentas gratuitas para consulta veicular: calculadoras, simuladores e verificadores.",
            url: "https://consultaplacabrasil.com/ferramentas",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: ferramentas.map((f, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: f.title,
                description: f.description,
                url: `https://consultaplacabrasil.com/ferramentas/${f.slug}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
