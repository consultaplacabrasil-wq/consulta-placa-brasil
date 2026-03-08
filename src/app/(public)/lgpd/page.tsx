"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Shield,
  UserCheck,
  FileEdit,
  Trash2,
  ArrowRightLeft,
  Eye,
  XCircle,
  Info,
  Send,
} from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    requestType: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0066FF] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LGPD</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Conheça como tratamos seus dados e exerça seus direitos conforme a Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </div>
      </section>

      {/* Data Treatment */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0066FF]/10 mb-6">
              <Shield className="w-8 h-8 text-[#0066FF]" />
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
                  Dados cadastrais (nome, e-mail, CPF, telefone)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
                  Dados de navegação (IP, cookies, páginas visitadas)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
                  Prestação e melhoria dos serviços contratados
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
                  Cumprimento de obrigações legais e fiscais
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0" />
                  Prevenção de fraudes e segurança da plataforma
                </li>
              </ul>
            </div>
          </div>

          {/* Rights */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0066FF]/10 mb-6">
              <UserCheck className="w-8 h-8 text-[#0066FF]" />
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#0066FF]/10 mb-4">
                  <right.icon className="w-6 h-6 text-[#0066FF]" />
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
          <div className="bg-[#0066FF]/5 rounded-2xl p-8 border border-[#0066FF]/10 mb-20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0066FF]/10 shrink-0">
                <Shield className="w-8 h-8 text-[#0066FF]" />
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
                    href="mailto:dpo@consultaplacabrasil.com.br"
                    className="text-[#0066FF] hover:underline"
                  >
                    dpo@consultaplacabrasil.com.br
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
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                    Solicitação Enviada!
                  </h3>
                  <p className="text-[#475569] mb-6">
                    Sua solicitação foi recebida com sucesso. Nosso DPO entrará em
                    contato em até 15 dias úteis.
                  </p>
                  <Button
                    className="bg-[#0066FF] hover:bg-[#0052CC]"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        cpf: "",
                        requestType: "",
                        details: "",
                      });
                    }}
                  >
                    Nova solicitação
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestType">Tipo de solicitação</Label>
                      <select
                        id="requestType"
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecione...</option>
                        <option value="acesso">Acesso aos dados</option>
                        <option value="correcao">Correção de dados</option>
                        <option value="eliminacao">Eliminação de dados</option>
                        <option value="portabilidade">Portabilidade</option>
                        <option value="revogacao">Revogação de consentimento</option>
                        <option value="informacao">
                          Informação sobre compartilhamento
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Detalhes da solicitação</Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Descreva detalhadamente sua solicitação..."
                      rows={5}
                      value={formData.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0066FF] hover:bg-[#0052CC] h-12 text-base"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </Button>

                  <p className="text-xs text-[#475569] text-center">
                    Ao enviar este formulário, você confirma que é o titular dos dados
                    pessoais informados. Sua identidade poderá ser verificada antes do
                    atendimento da solicitação.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
