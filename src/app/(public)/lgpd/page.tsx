import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  UserCheck,
  Eye,
  FileEdit,
  Trash2,
  ArrowRightLeft,
  XCircle,
  Info,
} from "lucide-react";
import { LgpdForm } from "@/components/lgpd/lgpd-form";

export const metadata: Metadata = {
  title: "LGPD - Proteção de Dados Pessoais",
  description:
    "Conheça como a Consulta Placa Brasil trata seus dados pessoais conforme a LGPD. Exerça seus direitos de acesso, correção, eliminação e portabilidade de dados.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/lgpd",
  },
  openGraph: {
    title: "LGPD - Proteção de Dados | Consulta Placa Brasil",
    description:
      "Saiba como tratamos seus dados pessoais e exerça seus direitos conforme a Lei Geral de Proteção de Dados.",
    url: "https://consultaplacabrasil.com/lgpd",
  },
};

const rights = [
  {
    icon: Eye,
    title: "Acesso",
    description:
      "Você tem o direito de confirmar a existência de tratamento e acessar todos os seus dados pessoais que estão em nossa posse.",
  },
  {
    icon: FileEdit,
    title: "Correção",
    description:
      "Solicite a correção de dados pessoais incompletos, inexatos ou desatualizados a qualquer momento.",
  },
  {
    icon: Trash2,
    title: "Eliminação",
    description:
      "Você pode solicitar a eliminação dos dados pessoais tratados com base no seu consentimento.",
  },
  {
    icon: ArrowRightLeft,
    title: "Portabilidade",
    description:
      "Solicite a portabilidade dos seus dados pessoais a outro fornecedor de serviço ou produto.",
  },
  {
    icon: XCircle,
    title: "Revogação do Consentimento",
    description:
      "Revogue o consentimento previamente concedido para o tratamento dos seus dados pessoais.",
  },
  {
    icon: Info,
    title: "Informação",
    description:
      "Seja informado sobre as entidades públicas e privadas com as quais compartilhamos seus dados.",
  },
];

export default function LgpdPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LGPD</h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Conheça como tratamos seus dados e exerça seus direitos conforme a Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </div>
      </section>

      {/* Data Treatment */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D30]/10 mb-6">
              <Shield className="w-8 h-8 text-[#FF4D30]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
              Tratamento de Dados Pessoais
            </h2>
            <p className="text-[#475569] max-w-2xl mx-auto leading-relaxed">
              A Consulta Placa Brasil trata seus dados pessoais com responsabilidade e
              transparência, seguindo rigorosamente os princípios estabelecidos pela
              LGPD.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                O que coletamos
              </h3>
              <ul className="space-y-3 text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Dados cadastrais (nome, e-mail, CPF, telefone)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Dados de navegação (IP, cookies, páginas visitadas)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Dados de transações (histórico de consultas e pagamentos)
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                Por que coletamos
              </h3>
              <ul className="space-y-3 text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Prestação e melhoria dos serviços contratados
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Cumprimento de obrigações legais e fiscais
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D30] mt-2 shrink-0" />
                  Prevenção de fraudes e segurança da plataforma
                </li>
              </ul>
            </div>
          </div>

          {/* Rights */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D30]/10 mb-6">
              <UserCheck className="w-8 h-8 text-[#FF4D30]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
              Seus Direitos como Titular
            </h2>
            <p className="text-[#475569] max-w-2xl mx-auto">
              A LGPD garante a você uma série de direitos sobre seus dados pessoais.
              Conheça cada um deles:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {rights.map((right) => (
              <div
                key={right.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#FF4D30]/10 mb-4">
                  <right.icon className="w-6 h-6 text-[#FF4D30]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {right.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {right.description}
                </p>
              </div>
            ))}
          </div>

          {/* DPO Contact */}
          <div className="bg-[#FF4D30]/5 rounded-2xl p-8 border border-[#FF4D30]/10 mb-20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D30]/10 shrink-0">
                <Shield className="w-8 h-8 text-[#FF4D30]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Encarregado de Proteção de Dados (DPO)
                </h3>
                <p className="text-[#475569] mb-3">
                  Nosso Encarregado de Proteção de Dados está disponível para
                  esclarecer dúvidas e receber solicitações relacionadas ao tratamento
                  dos seus dados pessoais.
                </p>
                <p className="text-[#0F172A]">
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:consultaplacabrasil@gmail.com"
                    className="text-[#FF4D30] hover:underline"
                  >
                    consultaplacabrasil@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Data Request Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
                Solicitar Exercício de Direitos
              </h2>
              <p className="text-[#475569]">
                Preencha o formulário abaixo para exercer qualquer um dos seus
                direitos previstos na LGPD. Responderemos em até 15 dias úteis.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <LgpdForm />
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-12 text-center text-sm text-[#475569]">
            <p>
              Veja também:{" "}
              <Link href="/privacidade" className="text-[#FF4D30] hover:underline">
                Política de Privacidade
              </Link>
              {" · "}
              <Link href="/termos" className="text-[#FF4D30] hover:underline">
                Termos de Uso
              </Link>
              {" · "}
              <Link href="/cookies" className="text-[#FF4D30] hover:underline">
                Política de Cookies
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "LGPD - Proteção de Dados Pessoais",
            description:
              "Conheça como a Consulta Placa Brasil trata seus dados pessoais conforme a LGPD.",
            url: "https://consultaplacabrasil.com/lgpd",
          }),
        }}
      />
    </div>
  );
}
