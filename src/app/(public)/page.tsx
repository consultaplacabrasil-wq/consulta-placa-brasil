import { Metadata } from "next";
import Link from "next/link";
import { PlateSearch } from "@/components/consulta/plate-search";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Shield,
  Zap,
  FileText,
  CheckCircle,
  Star,
  Search,
  CreditCard,
  Clock,
  MapPin,
  Lock,
  Car,
  Receipt,
  ChevronRight,
  Users,
  BarChart3,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { REPORT_FEATURES, formatCurrency, REPORT_PRICES } from "@/constants";
import { ConsultasPacotes } from "@/components/home/consultas-pacotes";
import { FaqSection } from "@/components/home/faq-section";

export const metadata: Metadata = {
  title: "Consulta Placa Brasil — Descubra tudo sobre qualquer veículo",
  description:
    "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais. Resultado instantâneo.",
};

const stats = [
  { icon: Users, label: "Consultas realizadas", value: "10.000+" },
  { icon: MapPin, label: "Estados cobertos", value: "27 + DF" },
  { icon: Star, label: "Satisfação", value: "4.8/5" },
  { icon: Zap, label: "Tempo médio", value: "< 10s" },
];

const steps = [
  {
    icon: Search,
    title: "Digite a placa",
    description: "Insira a placa do veículo no campo de busca",
    color: "bg-[#FF4D30]",
  },
  {
    icon: FileText,
    title: "Veja o preview",
    description: "Confira os dados básicos gratuitamente",
    color: "bg-[#FF8C00]",
  },
  {
    icon: CreditCard,
    title: "Compre o relatório",
    description: "Escolha o tipo de relatório e pague com Pix ou cartão",
    color: "bg-[#22C55E]",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Segurança na compra",
    description: "Evite veículos com sinistro, roubo ou leilão oculto",
  },
  {
    icon: Zap,
    title: "Resultado instantâneo",
    description: "Relatório gerado em menos de 10 segundos",
  },
  {
    icon: MapPin,
    title: "Cobertura nacional",
    description: "Dados de todos os 27 estados e Distrito Federal",
  },
  {
    icon: Lock,
    title: "Dados protegidos",
    description: "Criptografia e conformidade com a LGPD",
  },
  {
    icon: Clock,
    title: "Histórico completo",
    description: "Proprietários, quilometragem, manutenção e mais",
  },
  {
    icon: Receipt,
    title: "Débitos e multas",
    description: "IPVA, licenciamento e multas detalhadas",
  },
];

const reportTypes = [
  {
    title: "Básico",
    price: "Grátis",
    priceValue: REPORT_PRICES.basic,
    description: "Dados cadastrais e situação geral",
    features: REPORT_FEATURES.basic,
    popular: false,
    cta: "Consultar Grátis",
    accent: "border-gray-200",
  },
  {
    title: "Completo",
    price: formatCurrency(REPORT_PRICES.complete),
    priceValue: REPORT_PRICES.complete,
    description: "Todos os dados disponíveis",
    features: REPORT_FEATURES.complete,
    popular: true,
    cta: "Comprar Relatório",
    accent: "border-[#FF4D30]",
  },
  {
    title: "Premium",
    price: formatCurrency(REPORT_PRICES.premium),
    priceValue: REPORT_PRICES.premium,
    description: "Completo + análise de risco",
    features: REPORT_FEATURES.premium,
    popular: false,
    cta: "Comprar Premium",
    accent: "border-[#1A1A2E]",
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    role: "Comprador particular",
    text: "Quase comprei um carro com sinistro grave. O relatório me salvou de um grande prejuízo!",
    rating: 5,
  },
  {
    name: "Ana Paula S.",
    role: "Lojista de usados",
    text: "Uso diariamente na minha loja de usados. Os pacotes de crédito valem muito a pena.",
    rating: 5,
  },
  {
    name: "Roberto L.",
    role: "Comprador particular",
    text: "Relatório completo e rápido. Paguei com Pix e em segundos já tinha tudo.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1A1A2E] px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#2D2D4E] to-[#1A1A2E]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D30]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF8C00]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FF4D30]/15 px-4 py-1.5 text-sm font-medium text-[#FF4D30] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D30] animate-pulse" />
                Cobertura Nacional - 27 Estados + DF
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                Descubra tudo sobre{" "}
                <span className="text-[#FF4D30]">qualquer veículo</span>
              </h1>
              <p className="mb-8 text-lg text-gray-300 leading-relaxed max-w-xl">
                Relatório completo com histórico, sinistro, leilão, débitos, multas
                e mais. Resultado em menos de 10 segundos.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                  Consulta básica grátis
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                  Sem cadastro necessário
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                  Dados atualizados
                </span>
              </div>
            </div>

            {/* Right - Search Card */}
            <div className="flex justify-center lg:justify-end">
              <PlateSearch size="large" variant="card" className="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0ED]">
                  <stat.icon className="h-5 w-5 text-[#FF4D30]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1A1A2E]">{stat.value}</p>
                  <p className="text-xs text-[#94A3B8]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
              Simples e rápido
            </span>
            <h2 className="text-3xl font-bold text-[#1A1A2E]">
              Como funciona
            </h2>
            <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
              Consulte qualquer veículo em 3 passos simples
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
                )}
                <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-bold text-[#64748B]">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1A1A2E]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748B]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
              Planos e preços
            </span>
            <h2 className="text-3xl font-bold text-[#1A1A2E]">
              Tipos de Relatório
            </h2>
            <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
              Escolha o nível de detalhamento ideal para sua necessidade
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reportTypes.map((report) => (
              <div
                key={report.title}
                className={`relative rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-xl ${report.accent} ${
                  report.popular ? "shadow-lg scale-[1.02]" : "shadow-sm"
                }`}
              >
                {report.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FF4D30] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-[#FF4D30]/25">
                      <Award className="h-3.5 w-3.5" />
                      Mais Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-[#1A1A2E]">{report.title}</h3>
                  <p className="text-sm text-[#64748B] mt-1">{report.description}</p>
                  <p className="mt-4 text-4xl font-bold text-[#FF4D30]">
                    {report.price}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {report.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                      <span className="text-sm text-[#475569]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/consulta">
                  <Button
                    className={`w-full h-11 font-semibold rounded-xl ${
                      report.popular
                        ? "bg-[#FF4D30] hover:bg-[#E8432A] text-white shadow-md shadow-[#FF4D30]/20"
                        : "bg-[#1A1A2E] hover:bg-[#2D2D4E] text-white"
                    }`}
                  >
                    {report.cta}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
              Vantagens
            </span>
            <h2 className="text-3xl font-bold text-[#1A1A2E]">
              Por que escolher o Consulta Placa Brasil?
            </h2>
            <p className="mt-3 text-[#64748B] max-w-xl mx-auto">
              A plataforma mais completa de consulta veicular do Brasil
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0ED]">
                    <benefit.icon className="h-6 w-6 text-[#FF4D30]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1A1A2E]">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#64748B]">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
              Depoimentos
            </span>
            <h2 className="text-3xl font-bold text-[#1A1A2E]">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-sm rounded-xl">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#FF8C00] text-[#FF8C00]"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#94A3B8]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultas & Pacotes */}
      <ConsultasPacotes />

      {/* FAQ */}
      <FaqSection />

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-[#FF4D30] to-[#E8432A] px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 mb-6">
            <Car className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Consulte agora antes de fechar negócio
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
            Não corra riscos. Verifique o histórico completo do veículo antes de
            comprar.
          </p>
          <div className="mx-auto flex max-w-lg justify-center">
            <PlateSearch size="large" />
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Consulta Placa Brasil",
            url: "https://consultaplacabrasil.com.br",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://consultaplacabrasil.com.br/consulta/{placa}",
              "query-input": "required name=placa",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Consulta Placa Brasil",
            url: "https://consultaplacabrasil.com.br",
            description:
              "Plataforma de consulta veicular completa com relatórios detalhados.",
          }),
        }}
      />
    </div>
  );
}
