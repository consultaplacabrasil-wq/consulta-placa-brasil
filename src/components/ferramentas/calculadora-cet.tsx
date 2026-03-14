"use client";

import { useState, useMemo } from "react";

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace(".", ",") + "%";
}

interface CETResult {
  jurosTotais: number;
  iof: number;
  tac: number;
  seguroTotal: number;
  outrasTaxasTotal: number;
  custoTotal: number;
  cetMensal: number;
  cetAnual: number;
  taxaNominalAnual: number;
  parcelaMensal: number;
}

function calcularIOF(valor: number, prazo: number): number {
  const iofFlat = valor * 0.0038;
  const iofDiario = valor * 0.000082 * (prazo * 30);
  const iofTotal = iofFlat + iofDiario;
  const iofMaximo = valor * 0.03;
  return Math.min(iofTotal, iofMaximo);
}

function calcularCET(
  valor: number,
  taxaMensal: number,
  prazo: number,
  iofManual: number | null,
  tacValor: number,
  seguroMensal: number,
  outrasTaxas: number
): CETResult | null {
  if (valor <= 0 || taxaMensal <= 0 || prazo <= 0) return null;

  const taxa = taxaMensal / 100;
  const fator = Math.pow(1 + taxa, prazo);
  const parcelaMensal = valor * ((taxa * fator) / (fator - 1));
  const totalPago = parcelaMensal * prazo;
  const jurosTotais = totalPago - valor;

  const iof = iofManual !== null ? iofManual : calcularIOF(valor, prazo);
  const seguroTotal = seguroMensal * prazo;
  const outrasTaxasTotal = outrasTaxas;

  const custoTotal = jurosTotais + iof + tacValor + seguroTotal + outrasTaxasTotal;

  const cetMensal = (custoTotal / valor / prazo) * 100 + taxaMensal;
  const cetAnual = (Math.pow(1 + cetMensal / 100, 12) - 1) * 100;
  const taxaNominalAnual = (Math.pow(1 + taxa, 12) - 1) * 100;

  return {
    jurosTotais,
    iof,
    tac: tacValor,
    seguroTotal,
    outrasTaxasTotal,
    custoTotal,
    cetMensal,
    cetAnual,
    taxaNominalAnual,
    parcelaMensal,
  };
}

export default function CalculadoraCET() {
  const [valorFinanciado, setValorFinanciado] = useState("50000");
  const [taxaJuros, setTaxaJuros] = useState("1.79");
  const [prazo, setPrazo] = useState(48);
  const [iofAuto, setIofAuto] = useState(true);
  const [iofManual, setIofManual] = useState("");
  const [tac, setTac] = useState("0");
  const [seguro, setSeguro] = useState("0");
  const [outrasTaxas, setOutrasTaxas] = useState("0");

  const valorNum = parseFloat(valorFinanciado.replace(/\D/g, "")) || 0;
  const taxaNum = parseFloat(taxaJuros.replace(",", ".")) || 0;
  const iofManualNum = iofAuto ? null : (parseFloat(iofManual.replace(/\D/g, "")) || 0);
  const tacNum = parseFloat(tac.replace(/\D/g, "")) || 0;
  const seguroNum = parseFloat(seguro.replace(",", ".")) || 0;
  const outrasTaxasNum = parseFloat(outrasTaxas.replace(/\D/g, "")) || 0;

  const resultado = useMemo(() => {
    return calcularCET(valorNum, taxaNum, prazo, iofManualNum, tacNum, seguroNum, outrasTaxasNum);
  }, [valorNum, taxaNum, prazo, iofManualNum, tacNum, seguroNum, outrasTaxasNum]);

  function handleCurrencyInput(value: string, setter: (v: string) => void) {
    const digits = value.replace(/\D/g, "");
    setter(digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    return num.toLocaleString("pt-BR");
  }

  const breakdownItems = resultado
    ? [
        { label: "Juros totais", value: resultado.jurosTotais, color: "text-red-600" },
        { label: "IOF", value: resultado.iof, color: "text-amber-600" },
        { label: "TAC (abertura de crédito)", value: resultado.tac, color: "text-orange-600" },
        { label: "Seguro prestamista total", value: resultado.seguroTotal, color: "text-blue-600" },
        { label: "Outras taxas", value: resultado.outrasTaxasTotal, color: "text-purple-600" },
      ]
    : [];

  const barMaxWidth = resultado
    ? Math.max(resultado.cetAnual, resultado.taxaNominalAnual)
    : 100;

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Dados do Financiamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor financiado */}
          <div>
            <label htmlFor="valor-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor Financiado (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">R$</span>
              <input
                id="valor-cet"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorFinanciado)}
                onChange={(e) => handleCurrencyInput(e.target.value, setValorFinanciado)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="50.000"
              />
            </div>
          </div>

          {/* Taxa de juros mensal */}
          <div>
            <label htmlFor="taxa-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Mensal (%)
            </label>
            <div className="relative">
              <input
                id="taxa-cet"
                type="text"
                inputMode="decimal"
                value={taxaJuros}
                onChange={(e) => setTaxaJuros(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,79"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">%</span>
            </div>
          </div>

          {/* TAC */}
          <div>
            <label htmlFor="tac-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
              TAC / Taxa de Abertura (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">R$</span>
              <input
                id="tac-cet"
                type="text"
                inputMode="numeric"
                value={displayCurrency(tac)}
                onChange={(e) => handleCurrencyInput(e.target.value, setTac)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          {/* Seguro prestamista */}
          <div>
            <label htmlFor="seguro-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Seguro Prestamista Mensal (R$)
            </label>
            <div className="relative">
              <input
                id="seguro-cet"
                type="text"
                inputMode="decimal"
                value={seguro}
                onChange={(e) => setSeguro(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">R$/mês</span>
            </div>
          </div>

          {/* Outras taxas */}
          <div>
            <label htmlFor="outras-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Outras Taxas (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">R$</span>
              <input
                id="outras-cet"
                type="text"
                inputMode="numeric"
                value={displayCurrency(outrasTaxas)}
                onChange={(e) => handleCurrencyInput(e.target.value, setOutrasTaxas)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          {/* IOF */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              IOF (Imposto sobre Operações Financeiras)
            </label>
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setIofAuto(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  iofAuto
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Calcular automaticamente
              </button>
              <button
                type="button"
                onClick={() => setIofAuto(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  !iofAuto
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Informar valor
              </button>
            </div>
            {iofAuto ? (
              <p className="text-sm text-[#64748B]">
                IOF estimado: {resultado ? formatCurrency(resultado.iof) : "R$ 0,00"}{" "}
                <span className="text-xs">(0,38% fixo + 0,0082%/dia, máx. 3%)</span>
              </p>
            ) : (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">R$</span>
                <input
                  id="iof-cet"
                  type="text"
                  inputMode="numeric"
                  value={displayCurrency(iofManual)}
                  onChange={(e) => handleCurrencyInput(e.target.value, setIofManual)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                  placeholder="0"
                />
              </div>
            )}
          </div>
        </div>

        {/* Prazo slider */}
        <div className="mt-6">
          <label htmlFor="prazo-cet" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Prazo: <span className="text-[#FF4D30]">{prazo} meses</span>
          </label>
          <input
            id="prazo-cet"
            type="range"
            min={6}
            max={72}
            step={6}
            value={prazo}
            onChange={(e) => setPrazo(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D30]"
          />
          <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
            <span>6</span>
            <span>12</span>
            <span>24</span>
            <span>36</span>
            <span>48</span>
            <span>60</span>
            <span>72 meses</span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setValorFinanciado("50000");
                setTaxaJuros("1.79");
                setPrazo(48);
                setIofAuto(true);
                setIofManual("");
                setTac("0");
                setSeguro("0");
                setOutrasTaxas("0");
              }}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Redefinir valores
            </button>
          </div>

          {/* Cards de comparação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Taxa Nominal Anual
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatPercent(resultado.taxaNominalAnual)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">Apenas juros</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#FF4D30]/30 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#FF4D30] uppercase tracking-wide mb-1">
                CET Anual (Real)
              </p>
              <p className="text-2xl font-bold text-[#FF4D30]">
                {formatPercent(resultado.cetAnual)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">Juros + todas as taxas</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Diferença
              </p>
              <p className="text-2xl font-bold text-amber-600">
                +{formatPercent(resultado.cetAnual - resultado.taxaNominalAnual)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">Custos ocultos</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                Custo Total (R$)
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(resultado.custoTotal)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">Juros + taxas</p>
            </div>
          </div>

          {/* CET Mensal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                  CET Mensal
                </p>
                <p className="text-xl font-bold text-[#FF4D30]">
                  {formatPercent(resultado.cetMensal)}
                </p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">
                  Parcela Estimada
                </p>
                <p className="text-xl font-bold text-[#0F172A]">
                  {formatCurrency(resultado.parcelaMensal)}
                </p>
              </div>
            </div>
          </div>

          {/* Barra de comparação visual */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">
              Taxa Anunciada vs CET Real
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#475569]">Taxa anunciada (nominal)</span>
                  <span className="text-sm font-bold text-[#0F172A]">{formatPercent(resultado.taxaNominalAnual)} a.a.</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-[#0F172A] h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${Math.min((resultado.taxaNominalAnual / barMaxWidth) * 100, 100)}%`, minWidth: "60px" }}
                  >
                    <span className="text-xs font-bold text-white">{formatPercent(resultado.taxaNominalAnual)}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#475569]">CET real (custo efetivo total)</span>
                  <span className="text-sm font-bold text-[#FF4D30]">{formatPercent(resultado.cetAnual)} a.a.</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-[#FF4D30] h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${Math.min((resultado.cetAnual / barMaxWidth) * 100, 100)}%`, minWidth: "60px" }}
                  >
                    <span className="text-xs font-bold text-white">{formatPercent(resultado.cetAnual)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de detalhamento */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Detalhamento dos Custos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F1F5F9] text-[#475569]">
                    <th className="px-5 py-3 text-left font-semibold">Componente</th>
                    <th className="px-5 py-3 text-right font-semibold">Valor (R$)</th>
                    <th className="px-5 py-3 text-right font-semibold">% do Custo Total</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdownItems.map((item) => (
                    <tr key={item.label} className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                      <td className="px-5 py-3 text-[#334155] font-medium">{item.label}</td>
                      <td className={`px-5 py-3 text-right font-semibold ${item.color}`}>
                        {formatCurrency(item.value)}
                      </td>
                      <td className="px-5 py-3 text-right text-[#475569]">
                        {resultado.custoTotal > 0
                          ? formatPercent((item.value / resultado.custoTotal) * 100, 1)
                          : "0,0%"}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#0F172A] bg-[#F8FAFC]">
                    <td className="px-5 py-3 text-[#0F172A] font-bold">Custo Total</td>
                    <td className="px-5 py-3 text-right font-bold text-[#FF4D30]">
                      {formatCurrency(resultado.custoTotal)}
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-[#0F172A]">100,0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Informação importante */}
          <div className="bg-[#FFF7ED] border border-amber-200 rounded-2xl p-5">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-amber-800 mb-1">Atenção ao comparar financiamentos</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  O CET é o indicador mais importante ao comparar financiamentos. Sempre compare o CET, não apenas a taxa de juros.
                  Bancos e financeiras podem anunciar taxas de juros baixas, mas embútir custos no IOF, seguro obrigatório e tarifas
                  administrativas que elevam significativamente o custo real da operação.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
