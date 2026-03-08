"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MessageCircle, MapPin, Send } from "lucide-react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contato</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Tem dúvidas ou precisa de ajuda? Entre em contato conosco. Nossa equipe
            está pronta para atendê-lo.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                  Fale Conosco
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Estamos disponíveis de segunda a sexta, das 8h às 18h. Escolha o
                  canal de sua preferência para entrar em contato.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0066FF]/10 shrink-0">
                    <Mail className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">E-mail</p>
                    <a
                      href="mailto:contato@consultaplacabrasil.com.br"
                      className="text-[#0066FF] hover:underline text-sm"
                    >
                      contato@consultaplacabrasil.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0066FF]/10 shrink-0">
                    <Phone className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Telefone</p>
                    <a
                      href="tel:+5511999999999"
                      className="text-[#0066FF] hover:underline text-sm"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0066FF]/10 shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">WhatsApp</p>
                    <a
                      href="https://wa.me/5511999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066FF] hover:underline text-sm"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0066FF]/10 shrink-0">
                    <MapPin className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Endereço</p>
                    <p className="text-sm text-[#475569]">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {submitted ? (
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
                      className="mt-6 bg-[#0066FF] hover:bg-[#0052CC]"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                    >
                      Enviar nova mensagem
                    </Button>
                  </div>
                ) : (
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

                    <Button
                      type="submit"
                      className="w-full bg-[#0066FF] hover:bg-[#0052CC] h-12 text-base"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
