import { Metadata } from "next";
import Link from "next/link";
import { getPageBySlug } from "@/lib/get-page";
import {
  Shield,
  MapPin,
  Users,
  CheckCircle,
  Lock,
  Eye,
  Target,
  Award,
  Zap,
  Globe,
  Car,
  Calculator,
  Heart,
  TrendingUp,
} from "lucide-react";

const defaultDescription =
  "Conheça a Consulta Placa Brasil, uma empresa BYTX LTDA. Nossa missão é ser a maior plataforma de dados veiculares do Brasil com 40+ ferramentas gratuitas.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("sobre");
  return {
    title: page?.seoTitle || "Quem Somos | Consulta Placa Brasil",
    description: page?.seoDescription || defaultDescription,
    alternates: {
      canonical:
        page?.seoCanonical || "https://consultaplacabrasil.com/sobre",
    },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      title: page?.ogTitle || "Quem Somos | Consulta Placa Brasil",
      description: page?.ogDescription || defaultDescription,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/sobre",
      type: "website",
    },
  };
}

const stats = [
  { label: "Ferramentas gratuitas", value: "40+", icon: Calculator },
  { label: "Estados cobertos", value: "27 + DF", icon: MapPin },
  { label: "Disponibilidade", value: "24/7", icon: Zap },
  { label: "Dados protegidos", value: "100%", icon: Lock },
];

const valores = [
  {
    title: "Transparência",
    description:
      "Acreditamos que toda informação veicular deve ser acessível e compreensível. Nossos dados vêm de fontes oficiais e são apresentados de forma clara para que você tome decisões seguras.",
    icon: Eye,
  },
  {
    title: "Segurança",
    description:
      "Protegemos seus dados pessoais com criptografia de ponta a ponta e total conformidade com a LGPD. A privacidade dos nossos usuários é inegociável.",
    icon: Shield,
  },
  {
    title: "Inovação",
    description:
      "Desenvolvemos continuamente novas ferramentas e funcionalidades para atender às necessidades reais dos brasileiros. Somos movidos pela tecnologia e pela busca de soluções inteligentes.",
    icon: Target,
  },
  {
    title: "Excelência",
    description:
      "Cada ferramenta é projetada com foco na melhor experiência do usuário. Qualidade não é diferencial, é requisito. Buscamos a perfeição em cada detalhe.",
    icon: Award,
  },
  {
    title: "Acessibilidade",
    description:
      "Acreditamos que ferramentas essenciais para o dia a dia do proprietário de veículo devem ser gratuitas. Por isso, oferecemos mais de 40 ferramentas sem cobrar nada.",
    icon: Heart,
  },
  {
    title: "Cobertura Nacional",
    description:
      "Atuamos em todos os 27 estados brasileiros e no Distrito Federal. De Norte a Sul, nossos dados cobrem 100% do território nacional.",
    icon: Globe,
  },
];

export default async function SobrePage() {
  const page = await getPageBySlug("sobre");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0F172A] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF4D30]/10 px-4 py-1.5 text-sm font-medium text-[#FF4D30] mb-6 border border-[#FF4D30]/20">
            <Car className="h-4 w-4" />
            Uma empresa BYTX LTDA
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-4">
            {page?.title || "Quem Somos"}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A plataforma mais completa de consulta veicular e ferramentas
            gratuitas do Brasil, desenvolvida para proprietários de veículos,
            compradores, lojistas, despachantes e caminhoneiros.
          </p>
        </div>
      </section>

      {/* Dynamic content from admin (only if substantial content exists) */}
      {page?.content && page.content.replace(/<[^>]*>/g, "").trim().length > 100 ? (
        <section className="bg-white px-4 py-12 md:py-16">
          <div
            className="prose prose-gray mx-auto max-w-4xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </section>
      ) : (
        <>
          {/* Stats */}
          <section className="bg-white px-4 py-12 border-b border-gray-100">
            <div className="mx-auto max-w-4xl grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5F3]">
                    <stat.icon className="h-7 w-7 text-[#FF4D30]" />
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nossa História */}
          <section className="bg-white px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl space-y-5">
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Nossa História
              </h2>
              <p className="text-[#475569] leading-relaxed">
                O Consulta Placa Brasil nasceu da necessidade real de milhões de
                brasileiros que compram, vendem e financiam veículos todos os
                dias. Percebemos que as informações veiculares estavam dispersas,
                difíceis de acessar e, muitas vezes, caras. Decidimos mudar
                isso.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Desenvolvido pela{" "}
                <strong className="text-[#0F172A]">BYTX LTDA</strong>, empresa
                de infraestrutura digital sediada em Campinas, SP, o Consulta
                Placa Brasil reúne em uma única plataforma tudo o que o
                proprietário de veículo precisa: desde a{" "}
                <Link
                  href="/"
                  className="text-[#FF4D30] hover:underline font-medium"
                >
                  consulta de placa
                </Link>{" "}
                com relatório completo até mais de 40{" "}
                <Link
                  href="/ferramentas"
                  className="text-[#FF4D30] hover:underline font-medium"
                >
                  ferramentas gratuitas
                </Link>{" "}
                como calculadoras de IPVA, simuladores de financiamento,
                decodificadores de chassi, geradores de contrato com PDF e muito
                mais.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Somos mais do que um site de consulta. Somos um ecossistema
                completo de ferramentas veiculares construído para empoderar o
                consumidor brasileiro com informação, transparência e
                segurança.
              </p>
            </div>
          </section>

          {/* Missão e Visão */}
          <section className="bg-[#F8FAFC] px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Missão */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4D30]/10 mb-5">
                    <Target className="h-7 w-7 text-[#FF4D30]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                    Nossa Missão
                  </h2>
                  <p className="text-[#475569] leading-relaxed">
                    Democratizar o acesso à informação veicular no Brasil,
                    oferecendo a plataforma mais completa, confiável e acessível
                    do mercado. Queremos que cada brasileiro tenha em mãos as
                    ferramentas necessárias para tomar decisões seguras na
                    compra, venda, financiamento e manutenção do seu veículo,
                    eliminando a assimetria de informação que historicamente
                    favoreceu vendedores e instituições financeiras.
                  </p>
                </div>

                {/* Visão */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF4D30]/10 mb-5">
                    <TrendingUp className="h-7 w-7 text-[#FF4D30]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                    Nossa Visão
                  </h2>
                  <p className="text-[#475569] leading-relaxed">
                    Ser a maior e mais confiável plataforma de dados veiculares
                    do Brasil, referência nacional em consulta de placas,
                    ferramentas automotivas e informação para o consumidor. Nossa
                    visão é construir o ecossistema definitivo para tudo que
                    envolve veículos no país, impactando positivamente a vida de
                    milhões de brasileiros que dependem de transporte próprio no
                    seu dia a dia.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* O que oferecemos */}
          <section className="bg-white px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl space-y-5">
              <h2 className="text-2xl font-bold text-[#0F172A]">
                O que oferecemos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      Consulta veicular completa
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Relatórios com histórico, sinistro, leilão, gravame,
                      débitos e multas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      40+ ferramentas gratuitas
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Calculadoras, simuladores, geradores e validadores
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      Consulta Tabela FIPE
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Valores atualizados de carros, motos e caminhões
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      Ferramentas de financiamento
                    </p>
                    <p className="text-xs text-[#64748B]">
                      CET, juros abusivos, quitação, portabilidade e
                      refinanciamento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      Geradores de documentos
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Contratos com PDF, recibos, ATPV-e e propostas de
                      quitação
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC]">
                  <CheckCircle className="w-5 h-5 text-[#FF4D30] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      Cobertura nacional
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Todos os 27 estados e Distrito Federal, placa antiga e
                      Mercosul
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="bg-[#F8FAFC] px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
                Nossos Valores
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {valores.map((v) => (
                  <div
                    key={v.title}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF5F3] mb-4">
                      <v.icon className="h-6 w-6 text-[#FF4D30]" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Empresa */}
          <section className="bg-white px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-5">
                Sobre a BYTX
              </h2>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 space-y-4">
                <p className="text-[#475569] leading-relaxed">
                  O Consulta Placa Brasil é desenvolvido e operado pela{" "}
                  <strong className="text-[#0F172A]">BYTX LTDA</strong> (CNPJ:
                  65.649.904/0001-98), empresa brasileira de infraestrutura
                  digital sediada em Campinas, São Paulo.
                </p>
                <p className="text-[#475569] leading-relaxed">
                  A BYTX desenvolve e opera ativos digitais em múltiplos
                  segmentos, com foco em eficiência técnica, automação e
                  escalabilidade. O Consulta Placa Brasil é um dos projetos
                  da empresa, construído com tecnologia de ponta (Next.js,
                  TypeScript, PostgreSQL) para oferecer a melhor experiência
                  ao usuário brasileiro.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="text-sm">
                    <p className="text-[#94A3B8]">Razão Social</p>
                    <p className="font-semibold text-[#0F172A]">BYTX LTDA</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[#94A3B8]">CNPJ</p>
                    <p className="font-semibold text-[#0F172A]">
                      65.649.904/0001-98
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[#94A3B8]">Sede</p>
                    <p className="font-semibold text-[#0F172A]">
                      Campinas, SP
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[#94A3B8]">Contato</p>
                    <p className="font-semibold text-[#0F172A]">
                      contato@consultaplacabrasil.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            className="px-4 py-16"
            style={{
              background: "linear-gradient(135deg, #FF4D30 0%, #E8432A 100%)",
            }}
          >
            <div className="mx-auto max-w-4xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Conheça nossas ferramentas
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Mais de 40 ferramentas gratuitas para ajudar você na compra,
                venda, financiamento e manutenção do seu veículo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/ferramentas"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#FF4D30] font-bold hover:bg-gray-100 transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Ver ferramentas
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Car className="w-5 h-5" />
                  Consultar placa
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Quem Somos - Consulta Placa Brasil",
            description: defaultDescription,
            url: "https://consultaplacabrasil.com/sobre",
            mainEntity: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              legalName: "BYTX LTDA",
              url: "https://consultaplacabrasil.com",
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Campinas",
                addressRegion: "SP",
                addressCountry: "BR",
              },
            },
          }),
        }}
      />
    </div>
  );
}
