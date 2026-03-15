import { Metadata } from "next";
import { PlateSearch } from "@/components/consulta/plate-search";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Shield,
  Zap,
  CheckCircle,
  Star,
  Search,
  CreditCard,
  Clock,
  MapPin,
  Lock,
  Car,
  Receipt,
  Users,
  FileText,
} from "lucide-react";
import { ConsultasPacotes } from "@/components/home/consultas-pacotes";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import UltimasNoticias from "@/components/noticias/UltimasNoticias";
import { FaqSection } from "@/components/home/faq-section";

export const metadata: Metadata = {
  title: "Consultar Placa de Veículo, Carro e Moto",
  description:
    "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  alternates: {
    canonical: "https://consultaplacabrasil.com",
  },
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
    color: "bg-[#FF4D30]",
  },
  {
    icon: CreditCard,
    title: "Compre o relatório",
    description: "Escolha o tipo de relatório e pague com Pix ou cartão",
    color: "bg-[#FF4D30]",
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


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white px-4 py-16 md:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FF4D30] px-4 py-1.5 text-sm font-medium text-white mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Cobertura Nacional | 27 Estados + DF
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-[#0F172A] md:text-5xl">
                Consulta Placa{" "}
                <span className="text-[#FF4D30]">Brasil</span>
              </h1>
              <p className="mb-8 text-lg text-[#64748B] leading-relaxed max-w-xl">
                Maior portal para consulta de placas e veículos dos Detrans do Brasil, com informações completas, atualizadas e confiáveis para proprietários, despachantes e profissionais do setor automotivo.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-[#64748B]">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#FF4D30]" />
                  Consulta básica grátis
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#FF4D30]" />
                  Sem cadastro necessário
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#FF4D30]" />
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
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5F3]">
                  <stat.icon className="h-5 w-5 text-[#FF4D30]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">{stat.value}</p>
                  <p className="text-xs text-[#64748B]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultas & Pacotes (dinâmicos do banco) */}
      <ConsultasPacotes />

      {/* How it works */}
      <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#C73A1E] uppercase tracking-wider mb-2">
              Simples e rápido
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
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
                <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748B]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-[#C73A1E] uppercase tracking-wider mb-2">
              Vantagens
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF5F3]">
                    <benefit.icon className="h-6 w-6 text-[#FF4D30]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#0F172A]">
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

      {/* Ultimas Noticias */}
      <UltimasNoticias />

      {/* Testimonials */}
      <TestimonialsSection />

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

      {/* Schema Markup — WebSite with SearchAction (sitelinks search box) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Consulta Placa Brasil",
            url: "https://consultaplacabrasil.com",
            description:
              "Plataforma de consulta veicular com relatório completo de veículos pela placa.",
            publisher: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://consultaplacabrasil.com/consulta/{placa}",
              },
              "query-input": "required name=placa",
            },
          }),
        }}
      />

      {/* Schema Markup — Organization with full details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Consulta Placa Brasil",
            legalName: "Consulta Placa Brasil",
            url: "https://consultaplacabrasil.com",
            logo: "https://consultaplacabrasil.com/logo.png",
            description:
              "Plataforma de consulta veicular completa com relatórios detalhados de veículos, motos e caminhões em todos os estados do Brasil.",
            foundingDate: "2024",
            contactPoint: {
              "@type": "ContactPoint",
              email: "contato@consultaplacabrasil.com",
              contactType: "customer service",
              areaServed: "BR",
              availableLanguage: "Portuguese",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Campinas",
              addressRegion: "SP",
              addressCountry: "BR",
            },
            areaServed: {
              "@type": "Country",
              name: "Brazil",
            },
            serviceArea: {
              "@type": "Country",
              name: "Brazil",
            },
            knowsAbout: [
              "Consulta veicular",
              "Consulta de placa",
              "Relatório veicular",
              "Histórico de veículos",
              "Tabela FIPE",
              "Sinistro veicular",
              "Gravame",
              "Débitos veiculares",
            ],
          }),
        }}
      />

      {/* Schema Markup — SoftwareApplication with ratings (rich snippets with stars) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Consulta Placa Brasil",
            url: "https://consultaplacabrasil.com",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            description:
              "Consulte qualquer veículo pela placa e receba relatório completo com histórico, sinistro, leilão, gravame, débitos e multas.",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "13.90",
              highPrice: "64.90",
              priceCurrency: "BRL",
              offerCount: "5",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "2847",
              ratingCount: "3120",
              bestRating: "5",
              worstRating: "1",
            },
            featureList:
              "Consulta de placa, Relatório de sinistro, Histórico de leilão, Gravame, Débitos e multas, Tabela FIPE, Consulta por chassi, Consulta Renavam",
            screenshot: "https://consultaplacabrasil.com/opengraph-image",
            author: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
            },
          }),
        }}
      />

      {/* Schema Markup — Service offerings (Google understands service types) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Consulta Placa Veicular",
            serviceType: "Consulta de Placa de Veículo",
            description:
              "Serviço de consulta veicular completa pela placa do veículo. Relatório com dados cadastrais, histórico de proprietários, sinistro, leilão, gravame, débitos, multas e tabela FIPE.",
            provider: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              url: "https://consultaplacabrasil.com",
            },
            areaServed: {
              "@type": "Country",
              name: "Brazil",
            },
            audience: {
              "@type": "Audience",
              audienceType:
                "Compradores de veículos, Lojistas de usados, Despachantes",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Consultas Veiculares",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Veículo Completo",
                    description:
                      "Consulta completa com todos os dados do veículo, sinistro, leilão, gravame, débitos e multas",
                  },
                  price: "64.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Veículo Essencial",
                    description:
                      "Informações essenciais sobre o veículo para negociar com segurança",
                  },
                  price: "45.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Leilão + Dados do Veículo",
                    description:
                      "Informações sobre veículo de leilão para evitar prejuízos",
                  },
                  price: "34.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Gravame",
                    description:
                      "Status de financiamento do veículo para evitar problemas na transferência",
                  },
                  price: "14.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Dados Cadastrais do Veículo",
                    description:
                      "Dados cadastrais nacionais e estaduais do veículo",
                  },
                  price: "13.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/InStock",
                },
              ],
            },
          }),
        }}
      />

      {/* Schema Markup — BreadcrumbList (navigation in SERP) */}
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
            ],
          }),
        }}
      />
    </div>
  );
}
