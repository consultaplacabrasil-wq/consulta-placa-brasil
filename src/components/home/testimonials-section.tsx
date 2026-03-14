"use client";

import { Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  city: string;
  text: string;
  rating: number;
}

const testimonialsByProfile: Record<string, Testimonial[]> = {
  compradores: [
    {
      name: "Carlos M.",
      role: "Comprador particular",
      city: "São Paulo, SP",
      text: "Antes de fechar negócio, fiz a consulta da placa do carro e descobri sinistro grave. Me salvou de um prejuízo enorme!",
      rating: 5,
    },
    {
      name: "Ana Beatriz R.",
      role: "Compradora particular",
      city: "Rio de Janeiro, RJ",
      text: "Usei para pesquisar a placa de um carro que vi no OLX. Em segundos já tinha o relatório completo com histórico.",
      rating: 5,
    },
    {
      name: "Roberto L.",
      role: "Comprador particular",
      city: "Belo Horizonte, MG",
      text: "Consegui consultar o veículo pela placa rapidamente. Paguei com Pix e em segundos já tinha tudo.",
      rating: 5,
    },
    {
      name: "Fernanda S.",
      role: "Compradora particular",
      city: "Curitiba, PR",
      text: "Precisava verificar a placa do carro antes de comprar. O relatório mostrou débitos que o vendedor nem mencionou.",
      rating: 5,
    },
  ],
  lojistas: [
    {
      name: "Marcos A.",
      role: "Lojista de usados",
      city: "Goiânia, GO",
      text: "Na minha loja de usados, faço consulta de placa de veículo de cada carro que entra no estoque. Indispensável.",
      rating: 5,
    },
    {
      name: "Patrícia V.",
      role: "Lojista de usados",
      city: "Salvador, BA",
      text: "Uso diariamente para buscar placa de carro dos veículos que recebo na troca. Rápido e confiável.",
      rating: 5,
    },
    {
      name: "Diego F.",
      role: "Lojista de seminovos",
      city: "Brasília, DF",
      text: "Já evitei comprar veículo de leilão graças à pesquisa de placa. O sistema mostra tudo de forma clara.",
      rating: 5,
    },
    {
      name: "Luciana M.",
      role: "Lojista de usados",
      city: "Fortaleza, CE",
      text: "Melhor plataforma para consultar placa que já usei. Informações completas e atualizadas para minha revenda.",
      rating: 5,
    },
  ],
  despachantes: [
    {
      name: "José Ricardo P.",
      role: "Despachante",
      city: "Recife, PE",
      text: "Como despachante, preciso consultar placa de veículo o dia todo. A rapidez do sistema faz diferença no meu trabalho.",
      rating: 5,
    },
    {
      name: "Sandra B.",
      role: "Despachante",
      city: "Porto Alegre, RS",
      text: "Uso para puxar placa de carro dos clientes antes de iniciar a transferência. Nunca tive problema.",
      rating: 5,
    },
    {
      name: "Wellington C.",
      role: "Despachante",
      city: "Manaus, AM",
      text: "A consulta veicular pela placa é completa. Mostra gravame, sinistro, débitos e tudo que preciso para o cliente.",
      rating: 5,
    },
    {
      name: "Rita de Cássia O.",
      role: "Despachante",
      city: "Campinas, SP",
      text: "Faço pesquisa de veículo por placa para mais de 50 clientes por mês. O sistema nunca me deixou na mão.",
      rating: 5,
    },
  ],
};

const tabs = [
  { value: "compradores", label: "Compradores" },
  { value: "lojistas", label: "Lojistas" },
  { value: "despachantes", label: "Despachantes" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
            Depoimentos
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            O que nossos clientes dizem
          </h2>
        </div>

        <Tabs defaultValue="compradores">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex rounded-full border border-gray-200 bg-white p-1 h-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border-0 data-[state=active]:bg-[#FF4D30] data-[state=active]:text-white text-[#0F172A] hover:bg-gray-50"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {testimonialsByProfile[tab.value].map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="border-0 shadow-sm rounded-xl"
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#FF4D30] text-[#FF4D30]"
                            />
                          )
                        )}
                      </div>
                      <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                          {testimonial.city}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
