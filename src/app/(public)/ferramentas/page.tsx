import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Car,
  CreditCard,
  FileSearch,
  Fuel,
  Gauge,
  FileText,
  AlertTriangle,
  CalendarDays,
  DollarSign,
  Truck,
  Zap,
  Eye,
  BarChart3,
  Wrench,
  ArrowLeftRight,
  ClipboardCheck,
  MapPin,
  Ban,
  ScrollText,
  Search,
  Bell,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ferramentas Veiculares Gratuitas | Consulta Placa",
  description:
    "Ferramentas gratuitas para veículos: calculadora de IPVA, simulador de financiamento, multas, chassi e mais. Use sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas",
  },
  openGraph: {
    title: "Ferramentas Veiculares Gratuitas | Consulta Placa Brasil",
    description:
      "Calculadoras e simuladores gratuitos para veículos. IPVA, financiamento, multas, chassi, etanol vs gasolina e mais.",
    url: "https://consultaplacabrasil.com.br/ferramentas",
  },
};

const ferramentas = [
  {
    slug: "calculadora-ipva",
    title: "Calculadora de IPVA 2026",
    description: "Calcule o valor do IPVA do seu veículo por estado. Simule parcelamento e desconto à vista.",
    icon: Calculator,
    category: "fiscal",
  },
  {
    slug: "calculadora-multas",
    title: "Calculadora de Multas",
    description: "Consulte o valor de qualquer infração do CTB, pontos na CNH e gravidade.",
    icon: AlertTriangle,
    category: "fiscal",
  },
  {
    slug: "simulador-financiamento",
    title: "Simulador de Financiamento",
    description: "Simule parcelas, juros totais e tabela de amortização (Price e SAC) para financiamento de veículos.",
    icon: CreditCard,
    category: "compra",
  },
  {
    slug: "calculadora-flex",
    title: "Gasolina ou Etanol?",
    description: "Descubra qual combustível é mais vantajoso para o seu veículo flex.",
    icon: Fuel,
    category: "uso",
  },
  {
    slug: "decodificador-chassi",
    title: "Decodificador de Chassi (VIN)",
    description: "Extraia informações do número de chassi: fabricante, país de origem e ano do modelo.",
    icon: FileSearch,
    category: "consulta",
  },
  {
    slug: "identificador-placa",
    title: "Identificador de Placa",
    description: "Valide o formato da placa e identifique se é padrão antigo ou Mercosul.",
    icon: Eye,
    category: "consulta",
  },
  {
    slug: "simulador-pontos-cnh",
    title: "Simulador de Pontos na CNH",
    description: "Simule o acúmulo de pontos na CNH e calcule o risco de suspensão.",
    icon: Gauge,
    category: "fiscal",
  },
  {
    slug: "verificador-documentos",
    title: "Verificador de Documentos",
    description: "Verifique vencimentos da CNH, licenciamento e outros documentos veiculares.",
    icon: FileText,
    category: "documentos",
  },
  {
    slug: "calculadora-transferencia",
    title: "Calculadora de Transferência",
    description: "Estime o custo total para transferir um veículo, incluindo taxas do Detran.",
    icon: DollarSign,
    category: "compra",
  },
  {
    slug: "custo-total-veiculo",
    title: "Custo Total do Veículo por Ano",
    description: "Calcule quanto seu veículo custa por mês e por ano com todos os gastos inclusos.",
    icon: BarChart3,
    category: "uso",
  },
  {
    slug: "calculadora-depreciacao",
    title: "Calculadora de Depreciação",
    description: "Estime quanto seu veículo vai desvalorizar nos próximos anos.",
    icon: BarChart3,
    category: "compra",
  },
  {
    slug: "eletrico-vs-combustao",
    title: "Elétrico vs Combustão",
    description: "Compare o custo de propriedade entre um carro elétrico e um a combustão em 5 anos.",
    icon: Zap,
    category: "compra",
  },
  {
    slug: "calculadora-frete-antt",
    title: "Calculadora de Frete ANTT",
    description: "Calcule o valor mínimo de frete conforme a tabela piso da ANTT por eixo e distância.",
    icon: Truck,
    category: "profissional",
  },
  {
    slug: "custo-km-caminhao",
    title: "Custo por Km do Caminhão",
    description: "Calcule o custo operacional por quilômetro rodado para caminhoneiros e frotas.",
    icon: Wrench,
    category: "profissional",
  },
  {
    slug: "gerador-placa",
    title: "Gerador Visual de Placa",
    description: "Visualize como fica a placa do seu veículo no padrão Mercosul ou antigo.",
    icon: Car,
    category: "consulta",
  },
  {
    slug: "conversor-placa",
    title: "Conversor de Placa",
    description: "Converta placas entre o formato antigo e Mercosul de forma automática.",
    icon: ArrowLeftRight,
    category: "consulta",
  },
  {
    slug: "checklist-manutencao",
    title: "Checklist de Manutenção",
    description: "Checklist completo de manutenção por quilometragem para carro, moto e caminhão.",
    icon: ClipboardCheck,
    category: "uso",
  },
  {
    slug: "calculadora-combustivel",
    title: "Combustível por Viagem",
    description: "Calcule o custo de combustível para sua viagem com divisão por passageiro.",
    icon: MapPin,
    category: "uso",
  },
  {
    slug: "calculadora-rodizio",
    title: "Rodízio de Veículos SP/RJ",
    description: "Descubra o dia de rodízio do seu veículo em São Paulo pela placa.",
    icon: Ban,
    category: "consulta",
  },
  {
    slug: "gerador-contrato",
    title: "Gerador de Contrato",
    description: "Gere um contrato de compra e venda de veículo pronto para imprimir.",
    icon: ScrollText,
    category: "compra",
  },
  {
    slug: "consulta-fipe",
    title: "Consulta Tabela FIPE",
    description: "Consulte o valor de mercado de qualquer veículo pela Tabela FIPE atualizada.",
    icon: Search,
    category: "consulta",
  },
  {
    slug: "consulta-recall",
    title: "Consulta de Recall",
    description: "Verifique recalls recentes por marca e acesse o portal oficial do SENATRAN.",
    icon: Bell,
    category: "consulta",
  },
  {
    slug: "consulta-cep",
    title: "Consulta CEP para Transferência",
    description: "Consulte CEPs de origem e destino para saber se precisará de novo emplacamento.",
    icon: MapPin,
    category: "compra",
  },
  {
    slug: "calculadora-dpvat",
    title: "Calculadora DPVAT/SPVAT",
    description: "Calcule o valor do seguro obrigatório SPVAT e conheça as coberturas incluídas.",
    icon: Shield,
    category: "fiscal",
  },
];

const categorias = [
  { value: "todos", label: "Todas" },
  { value: "fiscal", label: "Cálculos Fiscais" },
  { value: "compra", label: "Compra e Venda" },
  { value: "uso", label: "Uso Diário" },
  { value: "consulta", label: "Consulta" },
  { value: "documentos", label: "Documentação" },
  { value: "profissional", label: "Profissional" },
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
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ferramentas.map((ferramenta) => (
              <Link
                key={ferramenta.slug}
                href={`/ferramentas/${ferramenta.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-[#FF4D30]/20 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 mb-4 group-hover:bg-[#FF4D30]/20 transition-colors">
                  <ferramenta.icon className="w-6 h-6 text-[#FF4D30]" />
                </div>
                <h2 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#FF4D30] transition-colors">
                  {ferramenta.title}
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {ferramenta.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Ferramentas gratuitas para consulta veicular
          </h2>
          <p className="text-[#475569]">
            O Consulta Placa Brasil oferece uma coleção completa de ferramentas gratuitas para
            proprietários de veículos, compradores, lojistas de usados, despachantes e caminhoneiros.
            Todas as calculadoras e simuladores funcionam diretamente no seu navegador, sem necessidade
            de cadastro ou instalação.
          </p>
          <p className="text-[#475569]">
            Utilize a calculadora de IPVA para saber quanto vai pagar de imposto em 2026, simule o
            financiamento do seu próximo veículo, descubra se vale mais a pena abastecer com gasolina
            ou etanol, decodifique o número do chassi para verificar a autenticidade do veículo e
            muito mais.
          </p>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ferramentas Veiculares Gratuitas",
            description:
              "Coleção de ferramentas gratuitas para consulta veicular: calculadoras, simuladores e verificadores.",
            url: "https://consultaplacabrasil.com.br/ferramentas",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: ferramentas.map((f, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: f.title,
                description: f.description,
                url: `https://consultaplacabrasil.com.br/ferramentas/${f.slug}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
