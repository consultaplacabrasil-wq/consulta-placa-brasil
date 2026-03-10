"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { ChevronRight, Loader2 } from "lucide-react";

interface ConsultaType {
  id: string;
  name: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  benefits: string[];
  popular: boolean;
  active: boolean;
}

interface Pacote {
  id: string;
  name: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  popular: boolean;
  active: boolean;
}

const defaultConsultas: ConsultaType[] = [
  {
    id: "consulta-completa",
    name: "Veículo Completo",
    description: "A consulta mais completa do mercado, com informações e dados exclusivos sobre o veículo!",
    price: "64.90",
    originalPrice: "74.90",
    benefits: [],
    popular: true,
    active: true,
  },
  {
    id: "consulta-essencial",
    name: "Veículo Essencial",
    description: "Informações essenciais sobre o veículo, que te ajudam a negociar com mais segurança e acertar na escolha do seu próximo carro.",
    price: "45.90",
    originalPrice: "52.90",
    benefits: [],
    popular: false,
    active: true,
  },
  {
    id: "consulta-leilao",
    name: "Leilão + Dados do Veículo",
    description: "Informações sobre o veículo de leilão, que te ajudam a negociar o melhor valor e evitar prejuízos!",
    price: "34.90",
    originalPrice: "40.90",
    benefits: [],
    popular: false,
    active: true,
  },
  {
    id: "consulta-gravame",
    name: "Gravame",
    description: "Informações sobre o status de financiamento do veículo que te ajudam a evitar problemas na hora da transferência!",
    price: "14.90",
    originalPrice: "17.90",
    benefits: [],
    popular: false,
    active: true,
  },
  {
    id: "consulta-cadastral",
    name: "Dados Cadastrais do Veículo",
    description: "Informações sobre a situação do veículo que te ajudam a validar dados cadastrais nacionais e estaduais!",
    price: "13.90",
    originalPrice: "15.90",
    benefits: [],
    popular: false,
    active: true,
  },
];

const defaultPacotes: Pacote[] = [
  { id: "pacote-1000", name: "PACOTE 1000", description: null, price: "800.00", originalPrice: "1000.00", popular: true, active: true },
  { id: "pacote-500", name: "PACOTE 500", description: null, price: "425.00", originalPrice: "500.00", popular: false, active: true },
  { id: "pacote-300", name: "PACOTE 300", description: null, price: "270.00", originalPrice: "300.00", popular: false, active: true },
  { id: "pacote-150", name: "PACOTE 150", description: null, price: "142.50", originalPrice: "150.00", popular: false, active: true },
];

export function ConsultasPacotes() {
  const [activeTab, setActiveTab] = useState<"consultas" | "pacotes">("consultas");
  const [consultas, setConsultas] = useState<ConsultaType[]>(defaultConsultas);
  const [pacotesList, setPacotesList] = useState<Pacote[]>(defaultPacotes);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const [consultasRes, pacotesRes] = await Promise.all([
          fetch("/api/admin/consultas-types"),
          fetch("/api/admin/pacotes"),
        ]);
        if (consultasRes.ok) {
          const data = await consultasRes.json();
          const active = data.filter((c: ConsultaType) => c.active);
          if (active.length > 0) setConsultas(active);
        }
        if (pacotesRes.ok) {
          const data = await pacotesRes.json();
          const active = data.filter((p: Pacote) => p.active);
          if (active.length > 0) setPacotesList(active);
        }
      } catch {
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl">
            Veja nossas outras consultas
          </h2>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">
            Diversas opções de consulta para você ter muito mais segurança durante
            a negociação de veículos usados e seminovos.
          </p>
          <p className="mt-1 text-[#64748B]">
            Consulte agora e faça a melhor escolha!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
            {consultas.length > 0 && (
              <button
                onClick={() => setActiveTab("consultas")}
                className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === "consultas"
                    ? "bg-[#FF4D30] text-white"
                    : "text-[#0F172A] hover:bg-gray-50"
                }`}
              >
                CONSULTAS
              </button>
            )}
            {pacotesList.length > 0 && (
              <button
                onClick={() => setActiveTab("pacotes")}
                className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === "pacotes"
                    ? "bg-[#FF4D30] text-white"
                    : "text-[#0F172A] hover:bg-gray-50"
                }`}
              >
                PACOTES
              </button>
            )}
          </div>
        </div>

        {/* Consultas Grid */}
        {activeTab === "consultas" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultas.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
                  item.popular
                    ? "border-[#FF4D30] shadow-md"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {item.popular && (
                  <span className="inline-flex self-start items-center rounded-full bg-[#FFF5F3] px-3 py-1 text-xs font-medium text-[#FF4D30] mb-2">
                    Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[#64748B] mb-3 flex-1">
                  {item.description}
                </p>

                {item.benefits && item.benefits.length > 0 && (
                  <ul className="mb-4 space-y-1.5">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#475569]">
                        <ChevronRight className="h-3 w-3 text-[#FF4D30] shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mb-4">
                  {item.originalPrice && (
                    <p className="text-sm text-red-400 line-through">
                      de {formatCurrency(Number(item.originalPrice))} por
                    </p>
                  )}
                  <p className="text-3xl font-bold text-[#0F172A]">
                    {formatCurrency(Number(item.price))}
                    <span className="text-sm font-normal text-[#64748B] ml-1">
                      /consulta
                    </span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      type: "consulta",
                      originalPrice: Number(item.originalPrice || item.price),
                      price: Number(item.price),
                    })
                  }
                  className="w-full rounded-lg bg-[#FF4D30] py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#E8432A]"
                >
                  COMPRAR CONSULTA
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pacotes Grid */}
        {activeTab === "pacotes" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pacotesList.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
                  item.popular
                    ? "border-[#FF4D30] shadow-md"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {item.popular && (
                  <span className="inline-flex self-start items-center rounded-full bg-[#FFF5F3] px-3 py-1 text-xs font-medium text-[#FF4D30] mb-3">
                    Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-[#64748B] mb-4 flex-1">
                    {item.description}
                  </p>
                )}

                <div className="mb-6">
                  {item.originalPrice && (
                    <>
                      <p className="text-sm text-gray-500">Compre</p>
                      <p className="text-base text-red-400 line-through">
                        {formatCurrency(Number(item.originalPrice))}
                      </p>
                      <p className="text-sm text-gray-500">e pague</p>
                    </>
                  )}
                  <p className="text-3xl font-bold text-[#0F172A]">
                    {formatCurrency(Number(item.price))}
                  </p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      type: "pacote",
                      originalPrice: Number(item.originalPrice || item.price),
                      price: Number(item.price),
                    })
                  }
                  className="mt-auto w-full rounded-lg bg-[#FF4D30] py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8432A]"
                >
                  Comprar pacote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
