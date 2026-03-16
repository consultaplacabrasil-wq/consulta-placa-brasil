"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { ChevronRight, Loader2 } from "lucide-react";

interface ConsultaType {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal: number;
  beneficios: string[];
  popular: boolean;
  ativo: boolean;
}

interface Pacote {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  valorOriginal: number;
  popular: boolean;
}

const defaultConsultas: ConsultaType[] = [
  {
    id: "consulta-completa",
    nome: "Veículo Completo",
    descricao: "A consulta mais completa do mercado, com informações e dados exclusivos sobre o veículo!",
    preco: 64.90,
    precoOriginal: 74.90,
    beneficios: [],
    popular: true,
    ativo: true,
  },
  {
    id: "consulta-essencial",
    nome: "Veículo Essencial",
    descricao: "Informações essenciais sobre o veículo, que te ajudam a negociar com mais segurança e acertar na escolha do seu próximo carro.",
    preco: 45.90,
    precoOriginal: 52.90,
    beneficios: [],
    popular: false,
    ativo: true,
  },
  {
    id: "consulta-leilao",
    nome: "Leilão + Dados do Veículo",
    descricao: "Informações sobre o veículo de leilão, que te ajudam a negociar o melhor valor e evitar prejuízos!",
    preco: 34.90,
    precoOriginal: 40.90,
    beneficios: [],
    popular: false,
    ativo: true,
  },
  {
    id: "consulta-gravame",
    nome: "Gravame",
    descricao: "Informações sobre o status de financiamento do veículo que te ajudam a evitar problemas na hora da transferência!",
    preco: 14.90,
    precoOriginal: 17.90,
    beneficios: [],
    popular: false,
    ativo: true,
  },
  {
    id: "consulta-cadastral",
    nome: "Dados Cadastrais do Veículo",
    descricao: "Informações sobre a situação do veículo que te ajudam a validar dados cadastrais nacionais e estaduais!",
    preco: 13.90,
    precoOriginal: 15.90,
    beneficios: [],
    popular: false,
    ativo: true,
  },
];

const defaultPacotes: Pacote[] = [
  { id: "pacote-1000", nome: "PACOTE 1000", descricao: "", valor: 800.00, valorOriginal: 1000.00, popular: true },
  { id: "pacote-500", nome: "PACOTE 500", descricao: "", valor: 425.00, valorOriginal: 500.00, popular: false },
  { id: "pacote-300", nome: "PACOTE 300", descricao: "", valor: 270.00, valorOriginal: 300.00, popular: false },
  { id: "pacote-150", nome: "PACOTE 150", descricao: "", valor: 142.50, valorOriginal: 150.00, popular: false },
];

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
        let loadedConsultas: ConsultaType[] = [];
        let loadedPacotes: Pacote[] = [];
        if (consultasRes.ok) {
          const data = await consultasRes.json();
          loadedConsultas = data.filter((c: ConsultaType) => c.ativo !== false);
        }
        if (pacotesRes.ok) {
          const data = await pacotesRes.json();
          loadedPacotes = data;
        }
        setConsultas(loadedConsultas.length > 0 ? loadedConsultas : defaultConsultas);
        setPacotesList(loadedPacotes.length > 0 ? loadedPacotes : defaultPacotes);
      } catch {
        setConsultas(defaultConsultas);
        setPacotesList(defaultPacotes);
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
