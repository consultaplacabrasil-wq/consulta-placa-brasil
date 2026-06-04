"use client";

import { formatCurrency } from "@/constants";
import { Check, Star, ShieldCheck } from "lucide-react";

interface PremiumItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal: number;
  apiService?: string;
}

// O que o Relatório Premium entrega (lista rica para o card de destaque)
const PREMIUM_BENEFITS = [
  "Dados cadastrais nacionais",
  "Marca, modelo e versão",
  "Ano de fabricação/modelo",
  "Decodificador de chassi",
  "Ficha técnica completa",
  "Débitos (IPVA e DPVAT)",
  "Licenciamento",
  "Multas detalhadas (Renainf)",
  "Gravame / financiamento",
  "Histórico de leilão",
  "Score de risco de leilão",
  "Roubo e furto",
  "Recall do fabricante",
  "Situação do veículo",
  "Relatório em PDF para imprimir",
];

export function PremiumFeaturedCard({
  item,
  onBuy,
}: {
  item: PremiumItem;
  onBuy: (item: PremiumItem) => void;
}) {
  return (
    <div className="mx-auto mb-10 max-w-5xl">
      <div className="overflow-hidden rounded-2xl border-2 border-[#FF4D30] shadow-xl shadow-[#FF4D30]/10">
        {/* Banner Recomendado */}
        <div className="bg-gradient-to-r from-[#FF4D30] to-[#E8432A] py-2.5 text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-white">
            <Star className="h-4 w-4 fill-white" />
            Recomendado — Mais Completo
          </span>
        </div>

        <div className="bg-white p-6 md:p-8">
          {/* Topo */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#0F172A]">{item.nome}</h3>
              <p className="mt-1 text-sm font-semibold text-[#FF4D30]">
                + de 15 informações sobre o veículo
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#FFF5F3] px-4 py-3">
              <ShieldCheck className="h-6 w-6 text-[#FF4D30]" />
              <div className="text-sm leading-tight">
                <span className="block font-bold text-[#0F172A]">A consulta mais completa</span>
                <span className="text-[#64748B]">do mercado</span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <p className="mt-4 text-[#475569] leading-relaxed">
            Quer saber tudo sobre o veículo antes de comprar? Faça a consulta mais completa
            do mercado! Você valida dados cadastrais, sabe se o veículo já foi a leilão, tem
            multas, débitos, gravame, roubo/furto, recall e muito mais — tudo em um único relatório.
          </p>

          {/* Grid de benefícios */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {PREMIUM_BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[#FF4D30]" />
                <span className="text-sm text-[#334155]">{b}</span>
              </div>
            ))}
          </div>

          {/* Rodapé: preço + botão */}
          <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {item.precoOriginal > 0 && (
                <p className="text-sm text-red-400 line-through">
                  De {formatCurrency(item.precoOriginal)} por
                </p>
              )}
              <p className="text-4xl font-bold text-[#0F172A]">
                {formatCurrency(item.preco)}
                <span className="ml-1 text-base font-normal text-[#64748B]">/consulta</span>
              </p>
            </div>
            <button
              onClick={() => onBuy(item)}
              className="rounded-xl bg-[#FF4D30] px-8 py-4 text-base font-bold uppercase text-white shadow-lg shadow-[#FF4D30]/30 transition-colors hover:bg-[#E8432A]"
            >
              Comprar Relatório Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
