import type { Metadata } from "next";
import { Shield, Eye, Target, MapPin, Users, CheckCircle, Lock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Consulta Placa Brasil: missão, visão, valores e nossa história de compromisso com a segurança veicular.",
};

const stats = [
  { label: "Estados cobertos", value: "27", icon: MapPin },
  { label: "Consultas realizadas", value: "10.000+", icon: Users },
  { label: "Disponibilidade", value: "24/7", icon: CheckCircle },
  { label: "Dados protegidos", value: "100%", icon: Lock },
];

const values = [
  {
    title: "Transparência",
    description:
      "Acreditamos que todo comprador ou proprietário de veículo tem o direito de acessar informações completas e confiáveis sobre o histórico do automóvel.",
    icon: Eye,
  },
  {
    title: "Segurança",
    description:
      "Todos os dados são tratados com os mais altos padrões de segurança, em total conformidade com a LGPD e as melhores práticas do mercado.",
    icon: Shield,
  },
  {
    title: "Precisão",
    description:
      "Nossas consultas são realizadas diretamente em bases oficiais, garantindo informações atualizadas e precisas para a sua tomada de decisão.",
    icon: Target,
  },
];

export default function SobrePage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0066FF] text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre a Consulta Placa Brasil
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Somos a plataforma líder em consulta veicular no Brasil. Nossa missão é
            oferecer informações confiáveis e acessíveis para que você tome decisões
            seguras na compra e venda de veículos.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0066FF]/10 mb-4">
                  <stat.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
                <p className="text-sm text-[#475569] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#0066FF] mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Nossa Missão</h2>
              <p className="text-[#475569] leading-relaxed">
                Democratizar o acesso a informações veiculares no Brasil, oferecendo
                consultas rápidas, confiáveis e acessíveis para que qualquer pessoa possa
                verificar o histórico completo de um veículo antes de realizar uma
                negociação.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#0066FF] mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Nossa Visão</h2>
              <p className="text-[#475569] leading-relaxed">
                Ser reconhecida como a plataforma mais confiável e completa de consulta
                veicular do Brasil, contribuindo para um mercado automotivo mais seguro e
                transparente para compradores e vendedores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-4">
            Nossos Valores
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-2xl mx-auto">
            Os princípios que guiam cada aspecto do nosso trabalho e do serviço que
            oferecemos a você.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0066FF]/10 mb-5">
                  <value.icon className="w-7 h-7 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#475569] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
            Segurança e Confiança
          </h2>
          <p className="text-[#475569] mb-12 max-w-2xl mx-auto">
            Sua segurança é nossa prioridade. Trabalhamos com os mais altos padrões de
            proteção de dados e confiabilidade.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Dados Criptografados" },
              { icon: Lock, label: "LGPD Compliant" },
              { icon: Award, label: "Fontes Oficiais" },
              { icon: CheckCircle, label: "Pagamento Seguro" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <badge.icon className="w-10 h-10 text-[#0066FF]" />
                <span className="text-sm font-medium text-[#0F172A]">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
