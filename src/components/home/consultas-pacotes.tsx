"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { ChevronRight, Loader2 } from "lucide-react";
import { PremiumFeaturedCard } from "@/components/consulta/premium-featured-card";

interface ConsultaType {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal: number;
  beneficios: string[];
  popular: boolean;
  ativo: boolean;
  apiService?: string;
}

interface Pacote {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  valorOriginal: number;
  popular: boolean;
  ativo: boolean;
  credits?: number;
  apiService?: string;
}

export function ConsultasPacotes() {
  const [activeTab, setActiveTab] = useState<"consultas" | "pacotes">("consultas");
  const [consultas, setConsultas] = useState<ConsultaType[]>([]);
  const [pacotesList, setPacotesList] = useState<Pacote[]>([]);
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
          setConsultas(data.filter((c: ConsultaType) => c.ativo !== false));
        }
        if (pacotesRes.ok) {
          const data = await pacotesRes.json();
          setPacotesList(data.filter((p: Pacote) => p.ativo !== false));
        }
      } catch {
        // Se falhar ao buscar da API, não mostra nada (admin controla)
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

  // Se não tem nenhuma consulta nem pacote ativo, não mostra a seção
  if (consultas.length === 0 && pacotesList.length === 0) {
    return null;
  }

  // Ajusta tab ativa se uma das categorias estiver vazia
  const effectiveTab = activeTab === "consultas" && consultas.length === 0
    ? "pacotes"
    : activeTab === "pacotes" && pacotesList.length === 0
    ? "consultas"
    : activeTab;

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

        {/* Card de destaque do Premium */}
        {(() => {
          const premium = consultas.find((c) => c.apiService === "premium");
          if (!premium) return null;
          return (
            <PremiumFeaturedCard
              item={premium}
              onBuy={(p) =>
                addItem({
                  id: p.id,
                  name: p.nome,
                  type: "consulta",
                  originalPrice: p.precoOriginal || p.preco,
                  price: p.preco,
                  apiService: p.apiService || "premium",
                })
              }
            />
          );
        })()}

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
            {consultas.length > 0 && (
              <button
                onClick={() => setActiveTab("consultas")}
                className={`rounded-full px-8 py-2.5 text-sm font-semibold transition-colors ${
                  effectiveTab === "consultas"
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
                  effectiveTab === "pacotes"
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
        {effectiveTab === "consultas" && (
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
                  {item.nome}
                </h3>
                <p className="text-sm text-[#64748B] mb-3 flex-1">
                  {item.descricao}
                </p>

                {item.beneficios && item.beneficios.length > 0 && (
                  <ul className="mb-4 space-y-1.5">
                    {item.beneficios.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#475569]">
                        <ChevronRight className="h-3 w-3 text-[#FF4D30] shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mb-4">
                  {item.precoOriginal > 0 && (
                    <p className="text-sm text-red-400 line-through">
                      de {formatCurrency(item.precoOriginal)} por
                    </p>
                  )}
                  <p className="text-3xl font-bold text-[#0F172A]">
                    {formatCurrency(item.preco)}
                    <span className="text-sm font-normal text-[#64748B] ml-1">
                      /consulta
                    </span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.nome,
                      type: "consulta",
                      originalPrice: item.precoOriginal || item.preco,
                      price: item.preco,
                      apiService: item.apiService || "completa",
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
        {effectiveTab === "pacotes" && (
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
                  {item.nome}
                </h3>
                {item.descricao && (
                  <p className="text-sm text-[#64748B] mb-4 flex-1">
                    {item.descricao}
                  </p>
                )}

                <div className="mb-6">
                  {item.valorOriginal > 0 && (
                    <>
                      <p className="text-sm text-gray-500">Compre</p>
                      <p className="text-base text-red-400 line-through">
                        {formatCurrency(item.valorOriginal)}
                      </p>
                      <p className="text-sm text-gray-500">e pague</p>
                    </>
                  )}
                  <p className="text-3xl font-bold text-[#0F172A]">
                    {formatCurrency(item.valor)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.nome,
                      type: "pacote",
                      originalPrice: item.valorOriginal || item.valor,
                      price: item.valor,
                      apiService: item.apiService || "completa",
                      credits: item.credits || 1,
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
