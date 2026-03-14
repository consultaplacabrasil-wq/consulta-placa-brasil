"use client";

import { useState, useMemo } from "react";

type Modo = "price" | "sac";

interface ParcelaInfo {
  numero: number;
  parcela: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcularPrice(
  principal: number,
  taxaMensal: number,
  prazo: number
): ParcelaInfo[] {
  const taxa = taxaMensal / 100;
  const fator = Math.pow(1 + taxa, prazo);
  const parcela = principal * ((taxa * fator) / (fator - 1));
  const tabela: ParcelaInfo[] = [];
  let saldo = principal;

  for (let i = 1; i <= prazo; i++) {
    const juros = saldo * taxa;
    const amortizacao = parcela - juros;
    saldo -= amortizacao;
    tabela.push({
      numero: i,
      parcela,
      amortizacao,
      juros,
      saldoDevedor: Math.max(saldo, 0),
    });
  }

  return tabela;
}

function calcularSAC(
  principal: number,
  taxaMensal: number,
  prazo: number
): ParcelaInfo[] {
  const taxa = taxaMensal / 100;
  const amortizacaoFixa = principal / prazo;
  const tabela: ParcelaInfo[] = [];
  let saldo = principal;

  for (let i = 1; i <= prazo; i++) {
    const juros = saldo * taxa;
    const parcela = amortizacaoFixa + juros;
    saldo -= amortizacaoFixa;
    tabela.push({
      numero: i,
      parcela,
      amortizacao: amortizacaoFixa,
      juros,
      saldoDevedor: Math.max(saldo, 0),
    });
  }

  return tabela;
}

export default function SimuladorFinanciamento() {
  const [valorVeiculo, setValorVeiculo] = useState<string>("60000");
  const [valorEntrada, setValorEntrada] = useState<string>("12000");
  const [taxaJuros, setTaxaJuros] = useState<string>("1.49");
  const [prazo, setPrazo] = useState<number>(48);
  const [modo, setModo] = useState<Modo>("price");
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const valorVeiculoNum = parseFloat(valorVeiculo.replace(/\D/g, "")) || 0;
  const valorEntradaNum = parseFloat(valorEntrada.replace(/\D/g, "")) || 0;
  const taxaJurosNum = parseFloat(taxaJuros.replace(",", ".")) || 0;
  const principal = Math.max(valorVeiculoNum - valorEntradaNum, 0);

  const tabela = useMemo(() => {
    if (principal <= 0 || taxaJurosNum <= 0 || prazo <= 0) return [];
    return modo === "price"
      ? calcularPrice(principal, taxaJurosNum, prazo)
      : calcularSAC(principal, taxaJurosNum, prazo);
  }, [principal, taxaJurosNum, prazo, modo]);

  const { totalPago, totalJuros, primeiraParcela, ultimaParcela } = useMemo(() => {
    return {
      totalPago: tabela.reduce((acc, p) => acc + p.parcela, 0),
      totalJuros: tabela.reduce((acc, p) => acc + p.juros, 0),
      primeiraParcela: tabela.length > 0 ? tabela[0].parcela : 0,
      ultimaParcela: tabela.length > 0 ? tabela[tabela.length - 1].parcela : 0,
    };
  }, [tabela]);

  function handleCurrencyInput(
    value: string,
    setter: (v: string) => void
  ) {
    const digits = value.replace(/\D/g, "");
    setter(digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    return num.toLocaleString("pt-BR");
  }

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Dados do Financiamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor do veículo */}
          <div>
            <label htmlFor="valor-veiculo-fin" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor do Veículo (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
              <input
                id="valor-veiculo-fin"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorVeiculo)}
                onChange={(e) =>
                  handleCurrencyInput(e.target.value, setValorVeiculo)
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="60.000"
              />
            </div>
          </div>

          {/* Valor de entrada */}
          <div>
            <label htmlFor="valor-entrada-fin" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor de Entrada (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
              <input
                id="valor-entrada-fin"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorEntrada)}
                onChange={(e) =>
                  handleCurrencyInput(e.target.value, setValorEntrada)
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="12.000"
              />
            </div>
          </div>

          {/* Taxa de juros */}
          <div>
            <label htmlFor="taxa-juros-fin" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Mensal (%)
            </label>
            <div className="relative">
              <input
                id="taxa-juros-fin"
                type="text"
                inputMode="decimal"
                value={taxaJuros}
                onChange={(e) => setTaxaJuros(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,49"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                %
              </span>
            </div>
          </div>

          {/* Modo */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Tipo de Amortização
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setModo("price")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  modo === "price"
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Tabela Price
              </button>
              <button
                type="button"
                onClick={() => setModo("sac")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  modo === "sac"
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Tabela SAC
              </button>
            </div>
          </div>
        </div>

        {/* Prazo slider */}
        <div className="mt-6">
          <label htmlFor="prazo-fin" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Prazo: <span className="text-[#FF4D30]">{prazo} meses</span>
          </label>
          <input
            id="prazo-fin"
            type="range"
            min={12}
            max={60}
            step={6}
            value={prazo}
            onChange={(e) => setPrazo(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D30]"
          />
          <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
            <span>12 meses</span>
            <span>24</span>
            <span>36</span>
            <span>48</span>
            <span>60 meses</span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {principal > 0 && taxaJurosNum > 0 && tabela.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                {modo === "price" ? "Valor da Parcela" : "Primeira Parcela"}
              </p>
              <p className="text-2xl font-bold text-[#FF4D30]">
                {formatCurrency(primeiraParcela)}
              </p>
            </div>
            {modo === "sac" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                  Última Parcela
                </p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {formatCurrency(ultimaParcela)}
                </p>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Total Financiado
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatCurrency(principal)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Total Pago
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatCurrency(totalPago)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Juros Totais
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totalJuros)}
              </p>
            </div>
          </div>

          {/* Tabela de amortização */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setMostrarTabela(!mostrarTabela)}
              aria-expanded={mostrarTabela}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-bold text-[#0F172A]">
                Tabela de Amortização
              </span>
              <svg
                className={`w-5 h-5 text-[#94A3B8] transition-transform ${
                  mostrarTabela ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mostrarTabela && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#475569]">
                      <th className="px-4 py-3 text-left font-semibold">N.º</th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Parcela
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Amortização
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Juros
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        Saldo Devedor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabela.map((linha) => (
                      <tr
                        key={linha.numero}
                        className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors"
                      >
                        <td className="px-4 py-3 text-[#334155] font-medium">
                          {linha.numero}
                        </td>
                        <td className="px-4 py-3 text-right text-[#0F172A] font-semibold">
                          {formatCurrency(linha.parcela)}
                        </td>
                        <td className="px-4 py-3 text-right text-[#16A34A]">
                          {formatCurrency(linha.amortizacao)}
                        </td>
                        <td className="px-4 py-3 text-right text-red-500">
                          {formatCurrency(linha.juros)}
                        </td>
                        <td className="px-4 py-3 text-right text-[#475569]">
                          {formatCurrency(linha.saldoDevedor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
