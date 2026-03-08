import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  Shield,
  Zap,
  Star,
  Award,
  ChevronRight,
  Car,
  FileText,
  Lock,
  BarChart3,
  AlertTriangle,
  Scale,
  Wrench,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { REPORT_FEATURES, formatCurrency, REPORT_PRICES } from "@/constants";

const reportData = {
  basico: {
    title: "Relatório Básico",
    subtitle: "Consulta gratuita com dados cadastrais essenciais",
    price: REPORT_PRICES.basic,
    priceLabel: "Grátis",
    color: "#475569",
    colorBg: "#F1F5F9",
    icon: FileText,
    features: REPORT_FEATURES.basic,
    detailedFeatures: [
      {
        icon: Car,
        title: "Dados Cadastrais",
        description: "Marca, modelo, ano de fabricação, ano do modelo, cor, tipo de combustível e categoria do veículo.",
      },
      {
        icon: Shield,
        title: "Situação do Veículo",
        description: "Status atualizado junto ao DENATRAN: regular, com restrições ou com impedimentos.",
      },
      {
        icon: AlertTriangle,
        title: "Indicador de Sinistro",
        description: "Verificação se o veículo possui registro de sinistro (colisão, incêndio, alagamento, etc).",
      },
      {
        icon: Scale,
        title: "Indicador de Leilão",
        description: "Verificação se o veículo já foi vendido em leilão, público ou privado.",
      },
    ],
    cta: "Consultar Grátis",
    ctaLink: "/consulta",
    ideal: "Ideal para uma verificação rápida antes de visitar o veículo.",
  },
  completo: {
    title: "Relatório Completo",
    subtitle: "Análise detalhada com todos os dados disponíveis do veículo",
    price: REPORT_PRICES.complete,
    priceLabel: formatCurrency(REPORT_PRICES.complete),
    color: "#FF4D30",
    colorBg: "#FFF5F3",
    icon: Shield,
    features: REPORT_FEATURES.complete,
    detailedFeatures: [
      {
        icon: FileText,
        title: "Histórico de Proprietários",
        description: "Quantidade de proprietários anteriores, UF de registro e tipo de pessoa (física/jurídica).",
      },
      {
        icon: AlertTriangle,
        title: "Detalhes de Sinistro",
        description: "Tipo de sinistro, data da ocorrência, gravidade, seguradora e situação do veículo após o evento.",
      },
      {
        icon: Scale,
        title: "Histórico de Leilão",
        description: "Data do leilão, leiloeiro, lote, comitente, condição do veículo e valor de arrematação.",
      },
      {
        icon: Lock,
        title: "Restrições e Gravames",
        description: "Financiamento ativo, alienação fiduciária, reserva de domínio e restrições judiciais.",
      },
      {
        icon: Shield,
        title: "Débitos e Multas",
        description: "IPVA, licenciamento, DPVAT, multas detalhadas com valor, data e órgão autuador.",
      },
      {
        icon: Car,
        title: "Recall e Quilometragem",
        description: "Recall pendente do fabricante e histórico de quilometragem registrada nos DETRANs.",
      },
    ],
    cta: "Comprar Relatório Completo",
    ctaLink: "/consulta",
    ideal: "Ideal para quem está negociando e quer segurança total na compra.",
  },
  premium: {
    title: "Relatório Premium",
    subtitle: "O mais completo do mercado: tudo do Completo + análise inteligente",
    price: REPORT_PRICES.premium,
    priceLabel: formatCurrency(REPORT_PRICES.premium),
    color: "#0F172A",
    colorBg: "#EEF2FF",
    icon: Award,
    features: REPORT_FEATURES.premium,
    detailedFeatures: [
      {
        icon: BarChart3,
        title: "Score de Risco (0-100)",
        description: "Pontuação exclusiva que avalia o risco de compra baseado em sinistro, leilão, débitos e mais.",
      },
      {
        icon: Scale,
        title: "Análise de Desvalorização",
        description: "Projeção de depreciação do veículo nos próximos 12, 24 e 36 meses baseada em dados de mercado.",
      },
      {
        icon: Wrench,
        title: "Custo Estimado de Manutenção",
        description: "Estimativa anual de gastos com manutenção preventiva e corretiva para o modelo específico.",
      },
      {
        icon: Star,
        title: "Comparativo de Mercado",
        description: "Tabela FIPE atualizada comparada com preços reais de venda em todo o Brasil.",
      },
      {
        icon: QrCode,
        title: "Selo de Verificação QR",
        description: "QR Code exclusivo que comprova a veracidade do relatório. Compartilhe com compradores/vendedores.",
      },
      {
        icon: Shield,
        title: "Tudo do Relatório Completo",
        description: "Inclui todos os 11 itens do relatório completo: histórico, sinistro, leilão, débitos e mais.",
      },
    ],
    cta: "Comprar Relatório Premium",
    ctaLink: "/consulta",
    ideal: "Ideal para profissionais, lojistas e quem busca a análise mais profunda.",
  },
};

type ReportType = keyof typeof reportData;

export async function generateStaticParams() {
  return [{ tipo: "basico" }, { tipo: "completo" }, { tipo: "premium" }];
}

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }): Promise<Metadata> {
  const { tipo } = await params;
  const data = reportData[tipo as ReportType];
  if (!data) return {};
  return {
    title: `${data.title} - Consulta Placa Brasil`,
    description: data.subtitle,
  };
}

export default async function ReportTypePage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  const data = reportData[tipo as ReportType];
  if (!data) notFound();

  const Icon = data.icon;
  const otherReports = Object.entries(reportData)
    .filter(([key]) => key !== tipo)
    .map(([key, val]) => ({ key, ...val }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] px-4 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
        <div className="relative mx-auto max-w-4xl text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: data.colorBg }}>
            <Icon className="h-10 w-10" style={{ color: data.color }} />
          </div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h1>
          <p className="mx-auto mb-6 max-w-xl text-lg text-gray-300">{data.subtitle}</p>
          <div className="mb-8">
            {data.price === 0 ? (
              <span className="text-5xl font-bold text-[#FF4D30]">Grátis</span>
            ) : (
              <div>
                <span className="text-5xl font-bold text-[#FF4D30]">{data.priceLabel}</span>
                <span className="ml-2 text-gray-400">pagamento único</span>
              </div>
            )}
          </div>
          <Link href={data.ctaLink}>
            <Button size="lg" className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold px-8 h-12 rounded-xl gap-2">
              {data.cta}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-400">{data.ideal}</p>
        </div>
      </section>

      {/* Features List */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: data.color }}>
              O que está incluso
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Itens do {data.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
            {data.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <CheckCircle className="h-5 w-5 shrink-0 text-[#FF4D30]" />
                <span className="text-sm font-medium text-[#0F172A]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A]">Detalhes de cada item</h2>
            <p className="mt-3 text-[#64748B]">Entenda exatamente o que você recebe</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.detailedFeatures.map((df) => {
              const DfIcon = df.icon;
              return (
                <Card key={df.title} className="border-0 shadow-sm">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: data.colorBg }}>
                      <DfIcon className="h-6 w-6" style={{ color: data.color }} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-[#0F172A]">{df.title}</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{df.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Pronto para consultar?
          </h2>
          <p className="text-[#64748B] mb-8">
            Digite a placa do veículo e tenha acesso ao {data.title.toLowerCase()} em segundos.
          </p>
          <Link href={data.ctaLink}>
            <Button size="lg" className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold px-10 h-12 rounded-xl gap-2">
              {data.cta}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Reports */}
      <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-[#0F172A] mb-8">
            Compare com outros relatórios
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {otherReports.map((report) => {
              const RIcon = report.icon;
              return (
                <Link key={report.key} href={`/relatorios/${report.key}`}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: report.colorBg }}>
                          <RIcon className="h-5 w-5" style={{ color: report.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#0F172A]">{report.title}</h3>
                          <p className="text-sm font-bold" style={{ color: report.color }}>
                            {report.priceLabel}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-[#64748B] mb-3">{report.subtitle}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {report.features.slice(0, 3).map((f) => (
                          <span key={f} className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs text-[#475569]">
                            <CheckCircle className="h-3 w-3 text-[#FF4D30]" />
                            {f}
                          </span>
                        ))}
                        <span className="text-xs text-[#FF4D30] font-medium px-2.5 py-1">
                          +{report.features.length - 3} itens
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
