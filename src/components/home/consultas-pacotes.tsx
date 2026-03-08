"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { ChevronRight } from "lucide-react";

const consultas = [
  {
    id: "consulta-completa",
    name: "Veículo Completo",
    description:
      "A consulta mais completa do mercado, com informações e dados exclusivos sobre o veículo!",
    originalPrice: 74.9,
    price: 64.9,
    popular: true,
    detailsLink: "#",
  },
  {
    id: "consulta-essencial",
    name: "Veículo Essencial",
    description:
      "Informações essenciais sobre o veículo, que te ajudam a negociar com mais segurança e acertar na escolha do seu próximo carro.",
    originalPrice: 52.9,
    price: 45.9,
    popular: false,
    detailsLink: "#",
  },
  {
    id: "consulta-leilao",
    name: "Leilão + Dados do Veículo",
    description:
      "Informações sobre o veículo de leilão, que te ajudam a negociar o melhor valor e evitar prejuízos!",
    originalPrice: 40.9,
    price: 34.9,
    popular: false,
    detailsLink: "#",
  },
  {
    id: "consulta-gravame",
    name: "Gravame",
    description:
      "Informações sobre o status de financiamento do veículo que te ajudam a evitar problemas na hora da transferência!",
    originalPrice: 17.9,
    price: 14.9,
    popular: false,
    detailsLink: "#",
  },
  {
    id: "consulta-cadastral",
    name: "Dados Cadastrais do Veículo",
    description:
      "Informações sobre a situação do veículo que te ajudam a validar dados cadastrais nacionais e estaduais!",
    originalPrice: 15.9,
    price: 13.9,
    popular: false,
    detailsLink: "#",
  },
];

const pacotes = [
  {
    id: "pacote-1000",
    name: "PACOTE 1000",
    originalPrice: 1000.0,
    price: 800.0,
    popular: true,
  },
  {
    id: "pacote-500",
    name: "PACOTE 500",
    originalPrice: 500.0,
    price: 425.0,
    popular: false,
  },
  {
    id: "pacote-300",
    name: "PACOTE 300",
    originalPrice: 300.0,
    price: 270.0,
    popular: false,
  },
  {
    id: "pacote-150",
    name: "PACOTE 150",
    originalPrice: 150.0,
    price: 142.5,
    popular: false,
  },
];

export function ConsultasPacotes() {
  const [activeTab, setActiveTab] = useState<"consultas" | "pacotes">("consultas");
  const { addItem } = useCartStore();

  return (
    <section className="bg-[#F9FAFB] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1B4D6E] md:text-4xl">
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
            <button
              onClick={() => setActiveTab("consultas")}
              className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "consultas"
                  ? "bg-[#1A6CB5] text-white"
                  : "text-[#1A1A2E] hover:bg-gray-50"
              }`}
            >
              CONSULTAS
            </button>
            <button
              onClick={() => setActiveTab("pacotes")}
              className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "pacotes"
                  ? "bg-[#1A6CB5] text-white"
                  : "text-[#1A1A2E] hover:bg-gray-50"
              }`}
            >
              PACOTES
            </button>
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
                    ? "border-[#22C55E] shadow-md"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                <a
                  href={item.detailsLink}
                  className="text-sm font-medium text-[#1A6CB5] hover:underline mb-3 inline-flex items-center gap-1"
                >
                  Ver mais detalhes <ChevronRight className="h-3 w-3" />
                </a>

                {item.popular && (
                  <span className="inline-flex self-start items-center rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-medium text-[#22C55E] mb-2">
                    Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 flex-1">
                  {item.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm text-red-400 line-through">
                    de {formatCurrency(item.originalPrice)} por
                  </p>
                  <p className="text-3xl font-bold text-[#22681A]">
                    {formatCurrency(item.price)}
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
                      originalPrice: item.originalPrice,
                      price: item.price,
                    })
                  }
                  className="w-full rounded-lg bg-[#1A6CB5] py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#155A96]"
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
            {pacotes.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
                  item.popular
                    ? "border-[#22C55E] shadow-md"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {item.popular && (
                  <span className="inline-flex self-start items-center rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-medium text-[#22C55E] mb-3">
                    Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">
                  {item.name}
                </h3>

                <div className="mb-6">
                  <p className="text-sm text-gray-500">Compre</p>
                  <p className="text-base text-red-400 line-through">
                    {formatCurrency(item.originalPrice)}
                  </p>
                  <p className="text-sm text-gray-500">e pague</p>
                  <p className="text-3xl font-bold text-[#22681A]">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      type: "pacote",
                      originalPrice: item.originalPrice,
                      price: item.price,
                    })
                  }
                  className="mt-auto w-full rounded-lg bg-[#1A6CB5] py-3 text-sm font-bold text-white transition-colors hover:bg-[#155A96]"
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
