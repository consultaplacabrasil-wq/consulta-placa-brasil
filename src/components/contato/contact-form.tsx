"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
          Mensagem Enviada!
        </h3>
        <p className="text-[#475569]">
          Obrigado pelo contato. Retornaremos em até 24 horas úteis.
        </p>
        <Button
          className="mt-6 bg-[#FF4D30] hover:bg-[#E8432A]"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }}
        >
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-[#0F172A] mb-2">
        Envie sua mensagem
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome"
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

      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Sobre o que deseja falar?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Escreva sua mensagem aqui..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {erro && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {erro}
        </div>
      )}

      <Button
        type="submit"
        disabled={enviando}
        className="w-full bg-[#FF4D30] hover:bg-[#E8432A] h-12 text-base disabled:opacity-50"
      >
        {enviando ? (
          "Enviando..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Enviar Mensagem
          </>
        )}
      </Button>
    </form>
  );
}
