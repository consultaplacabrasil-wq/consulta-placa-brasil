"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export function LgpdForm() {
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

  if (submitted) {
    return (
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
          className="bg-[#FF4D30] hover:bg-[#E8432A]"
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
    );
  }

  return (
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
            <option value="informacao">Informação sobre compartilhamento</option>
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
        className="w-full bg-[#FF4D30] hover:bg-[#E8432A] h-12 text-base"
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
  );
}
