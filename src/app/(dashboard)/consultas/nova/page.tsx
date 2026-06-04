"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { ChevronRight, Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

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

export default function NovaConsultaPage() {
  const router = useRouter();
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
        // silencioso
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function comprarConsulta(item: ConsultaType) {
    addItem({
      id: item.id,
      name: item.nome,
      type: "consulta",
      originalPrice: item.precoOriginal || item.preco,
      price: item.preco,
      apiService: item.apiService || "completa",
    });
    router.push("/checkout");
  }

  function comprarPacote(item: Pacote) {
    addItem({
      id: item.id,
      name: item.nome,
      type: "pacote",
      originalPrice: item.valorOriginal || item.valor,
      price: item.valor,
      apiService: item.apiService || "completa",
      credits: item.credits || 1,
    });
    router.push("/checkout");
  }

  const effectiveTab =
    activeTab === "consultas" && consultas.length === 0
      ? "pacotes"
      : activeTab === "pacotes" && pacotesList.length === 0
      ? "consultas"
      : activeTab;

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/consultas"
            className="inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#FF4D30] mb-1"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A]">Nova Consulta</h1>
          <p className="text-sm text-[#64748B]">
            Escolha o tipo de consulta ou um pacote e finalize a compra
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
        </div>
      ) : consultas.length === 0 && pacotesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingCart className="h-12 w-12 text-[#94A3B8] mb-3" />
          <p className="text-[#475569] font-medium">Nenhuma consulta disponível no momento</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex justify-center">
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

          {/* Consultas */}
          {effectiveTab === "consultas" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {consultas.map((item) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
                    item.popular ? "border-[#FF4D30] shadow-md" : "border-gray-200 shadow-sm"
                  }`}
                >
                  {item.popular && (
                    <span className="inline-flex self-start items-center rounded-full bg-[#FFF5F3] px-3 py-1 text-xs font-medium text-[#FF4D30] mb-2">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.nome}</h3>
                  <p className="text-sm text-[#64748B] mb-3 flex-1">{item.descricao}</p>

                  {item.beneficios && item.beneficios.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {item.beneficios.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#475569]">
                          <ChevronRight className="h-3 w-3 text-[#FF4D30] shrink-0" />
                          {b}
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
                      <span className="text-sm font-normal text-[#64748B] ml-1">/consulta</span>
                    </p>
                  </div>

                  <button
                    onClick={() => comprarConsulta(item)}
                    className="w-full rounded-lg bg-[#FF4D30] py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#E8432A]"
                  >
                    Comprar Consulta
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pacotes */}
          {effectiveTab === "pacotes" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pacotesList.map((item) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
                    item.popular ? "border-[#FF4D30] shadow-md" : "border-gray-200 shadow-sm"
                  }`}
                >
                  {item.popular && (
                    <span className="inline-flex self-start items-center rounded-full bg-[#FFF5F3] px-3 py-1 text-xs font-medium text-[#FF4D30] mb-3">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.nome}</h3>
                  {item.descricao && (
                    <p className="text-sm text-[#64748B] mb-4 flex-1">{item.descricao}</p>
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
                    <p className="text-3xl font-bold text-[#0F172A]">{formatCurrency(item.valor)}</p>
                  </div>

                  <button
                    onClick={() => comprarPacote(item)}
                    className="mt-auto w-full rounded-lg bg-[#FF4D30] py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8432A]"
                  >
                    Comprar pacote
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
