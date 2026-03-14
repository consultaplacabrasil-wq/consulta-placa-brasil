import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";
import { Shield, MapPin, Users, CheckCircle, Lock, Eye, Target, Award } from "lucide-react";

const defaultDescription = "Conheça a Consulta Placa Brasil: missão, visão, valores e nossa história de compromisso com a segurança veicular.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("sobre");
  return {
    title: page?.seoTitle || "Sobre Nós - Consulta Placa Brasil",
    description: page?.seoDescription || defaultDescription,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/sobre" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      title: page?.ogTitle || "Sobre Nós",
      description: page?.ogDescription || defaultDescription,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/sobre",
    },
  };
}

const stats = [
  { label: "Estados cobertos", value: "27", icon: MapPin },
  { label: "Consultas realizadas", value: "10.000+", icon: Users },
  { label: "Disponibilidade", value: "24/7", icon: CheckCircle },
  { label: "Dados protegidos", value: "100%", icon: Lock },
];

const values = [
  { title: "Transparência", description: "Dados claros e verificáveis de fontes oficiais.", icon: Eye },
  { title: "Segurança", description: "Proteção total dos dados conforme LGPD.", icon: Shield },
  { title: "Precisão", description: "Informações atualizadas em tempo real.", icon: Target },
  { title: "Excelência", description: "Qualidade em cada consulta realizada.", icon: Award },
];

export default async function SobrePage() {
  const page = await getPageBySlug("sobre");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Sobre Nós"}</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Conheça a plataforma mais completa de consulta veicular do Brasil
          </p>
        </div>
      </section>

      {/* Dynamic content from admin */}
      {page?.content ? (
        <section className="bg-white px-4 py-12 md:py-16">
          <div
            className="prose prose-gray mx-auto max-w-4xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </section>
      ) : (
        <>
          {/* Stats */}
          <section className="bg-white px-4 py-12">
            <div className="mx-auto max-w-6xl grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5F3]">
                    <stat.icon className="h-7 w-7 text-[#FF4D30]" />
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                  <p className="text-sm text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mission */}
          <section className="bg-[#F8FAFC] px-4 py-12 md:py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Nossa Missão</h2>
              <p className="text-[#64748B] leading-relaxed mb-8">
                Oferecer a plataforma mais completa e confiável de consulta veicular do Brasil, proporcionando segurança e transparência nas negociações de veículos usados e seminovos.
              </p>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Nossos Valores</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF5F3]">
                      <v.icon className="h-6 w-6 text-[#FF4D30]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F172A]">{v.title}</h3>
                      <p className="text-sm text-[#64748B]">{v.description}</p>
                    </div>
                  </div>
                ))}
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
            name: page?.seoTitle || "Sobre Nós - Consulta Placa Brasil",
            description: page?.seoDescription || defaultDescription,
            url: "https://consultaplacabrasil.com/sobre",
            mainEntity: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              url: "https://consultaplacabrasil.com",
            },
          }),
        }}
      />
    </div>
  );
}
