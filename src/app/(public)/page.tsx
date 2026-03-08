import { Metadata } from "next";
import { PlateSearch } from "@/components/consulta/plate-search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  AlertTriangle,
  TrendingDown,
  Receipt,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Consulta Placa Brasil — Descubra tudo sobre qualquer veículo",
  description:
    "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais. Resultado instantâneo.",
};

const stats = [
  { label: "Consultas realizadas", value: "10.000+" },
  { label: "Estados cobertos", value: "27 + DF" },
  { label: "Satisfação", value: "4.8/5" },
  { label: "Tempo médio", value: "< 10s" },
];

const steps = [
  {
    icon: Search,
    title: "Digite a placa",
    description: "Insira a placa do veículo no campo de busca",
  },
  {
    icon: FileText,
    title: "Veja o preview",
    description: "Confira os dados básicos gratuitamente",
  },
  {
    icon: CreditCard,
    title: "Compre o relatório",
    description: "Escolha o tipo de relatório e pague com Pix ou cartão",
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
    description: "Dados cadastrais e situação geral",
    features: [
      "Marca, modelo, ano e cor",
      "Situação do veículo",
      "Indicador de sinistro",
      "Indicador de leilão",
    ],
    popular: false,
    cta: "Consultar Grátis",
  },
  {
    title: "Completo",
    price: "R$ 24,90",
    description: "Todos os dados disponíveis",
    features: [
      "Tudo do Básico",
      "Histórico de proprietários",
      "Detalhes de sinistro e leilão",
      "Roubo/furto e restrições",
      "Gravames e débitos",
      "Recall e quilometragem",
      "Tabela FIPE",
    ],
    popular: true,
    cta: "Comprar Relatório",
  },
  {
    title: "Premium",
    price: "R$ 39,90",
    description: "Completo + análise de risco",
    features: [
      "Tudo do Completo",
      "Score de risco (0-100)",
      "Análise de desvalorização",
      "Custo de manutenção",
      "Comparativo de mercado",
      "Selo de verificação QR",
    ],
    popular: false,
    cta: "Comprar Premium",
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    text: "Quase comprei um carro com sinistro grave. O relatório me salvou de um grande prejuízo!",
    rating: 5,
  },
  {
    name: "Ana Paula S.",
    text: "Uso diariamente na minha loja de usados. Os pacotes de crédito valem muito a pena.",
    rating: 5,
  },
  {
    name: "Roberto L.",
    text: "Relatório completo e rápido. Paguei com Pix e em segundos já tinha tudo.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Como funciona a consulta de placa?",
    a: "Basta digitar a placa do veículo no campo de busca. Em segundos, você terá acesso a um preview gratuito com dados básicos. Para o relatório completo, basta escolher o plano e pagar.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos Pix (confirmação instantânea), cartão de crédito (parcelamento em até 12x) e cartão de débito.",
  },
  {
    q: "O relatório é confiável?",
    a: "Sim. Nossos dados são obtidos de fontes oficiais e atualizados em tempo real. O relatório inclui selo de autenticidade com QR Code de verificação.",
  },
  {
    q: "Quanto tempo leva para gerar o relatório?",
    a: "Após a confirmação do pagamento, o relatório é gerado em menos de 10 segundos e fica disponível imediatamente para visualização e download em PDF.",
  },
  {
    q: "A consulta básica é realmente gratuita?",
    a: "Sim! A consulta básica exibe dados cadastrais públicos como marca, modelo, ano e cor, além de indicadores de sinistro e leilão, sem nenhum custo.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <div className="container relative mx-auto text-center">
          <Badge className="mb-6 bg-[#0066FF]/20 text-[#0066FF] hover:bg-[#0066FF]/30">
            Cobertura Nacional - 27 Estados + DF
          </Badge>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Descubra tudo sobre{" "}
            <span className="text-[#0066FF]">qualquer veículo</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
            Relatório completo com histórico, sinistro, leilão, débitos, multas
            e mais. Resultado em menos de 10 segundos.
          </p>
          <div className="mx-auto flex max-w-lg justify-center">
            <PlateSearch size="large" />
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Consulta básica gratuita - Sem necessidade de cadastro
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-[#E2E8F0] bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#0066FF]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#475569]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            Como funciona
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#475569]">
            Consulte qualquer veículo em 3 passos simples
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0066FF]/10">
                  <step.icon className="h-7 w-7 text-[#0066FF]" />
                </div>
                <div className="mb-2 text-sm font-semibold text-[#0066FF]">
                  Passo {i + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-[#475569]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            Tipos de Relatório
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#475569]">
            Escolha o nível de detalhamento ideal para sua necessidade
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reportTypes.map((report) => (
              <Card
                key={report.title}
                className={`relative transition-shadow hover:shadow-lg ${
                  report.popular ? "border-2 border-[#0066FF] shadow-md" : ""
                }`}
              >
                {report.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#0066FF] text-white">
                      Mais popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                  <p className="text-3xl font-bold text-[#0066FF]">
                    {report.price}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {report.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00C853]" />
                        <span className="text-sm text-[#475569]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            Por que escolher o Consulta Placa Brasil?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#475569]">
            A plataforma mais completa de consulta veicular do Brasil
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-sm">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/10">
                    <benefit.icon className="h-6 w-6 text-[#0066FF]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#0F172A]">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#475569]">
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
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            O que nossos clientes dizem
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#475569]">
            Milhares de pessoas já consultaram veículos com segurança
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-[#475569]">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A]">
            Perguntas Frequentes
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[#475569]">
            Tire suas dúvidas sobre a consulta veicular
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-[#0F172A]">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-[#475569]">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-4 py-16 text-white md:py-20">
        <div className="container mx-auto text-center">
          <Car className="mx-auto mb-6 h-12 w-12" />
          <h2 className="mb-4 text-3xl font-bold">
            Consulte agora antes de fechar negócio
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-blue-100">
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
