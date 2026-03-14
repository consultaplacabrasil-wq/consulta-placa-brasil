"use client";

import { useState, useMemo } from "react";

type Sistema = "price" | "sac";

interface ParcelaRestante {
  numero: number;
  parcela: number;
  juros: number;
  amortizacao: number;
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

function formatPercent(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + "%";
}

function calcularTabelaPrice(
  valorFinanciado: number,
  taxaMensal: number,
  prazoTotal: number
): ParcelaRestante[] {
  const taxa = taxaMensal / 100;
  const fator = Math.pow(1 + taxa, prazoTotal);
  const parcela = valorFinanciado * ((taxa * fator) / (fator - 1));
  const tabela: ParcelaRestante[] = [];
  let saldo = valorFinanciado;

  for (let i = 1; i <= prazoTotal; i++) {
    const juros = saldo * taxa;
    const amortizacao = parcela - juros;
    saldo -= amortizacao;
    tabela.push({
      numero: i,
      parcela,
      juros,
      amortizacao,
      saldoDevedor: Math.max(saldo, 0),
    });
  }

  return tabela;
}

function calcularTabelaSAC(
  valorFinanciado: number,
  taxaMensal: number,
  prazoTotal: number
): ParcelaRestante[] {
  const taxa = taxaMensal / 100;
  const amortizacaoFixa = valorFinanciado / prazoTotal;
  const tabela: ParcelaRestante[] = [];
  let saldo = valorFinanciado;

  for (let i = 1; i <= prazoTotal; i++) {
    const juros = saldo * taxa;
    const parcela = amortizacaoFixa + juros;
    saldo -= amortizacaoFixa;
    tabela.push({
      numero: i,
      parcela,
      juros,
      amortizacao: amortizacaoFixa,
      saldoDevedor: Math.max(saldo, 0),
    });
  }

  return tabela;
}

export default function QuitacaoAntecipada() {
  const [valorFinanciado, setValorFinanciado] = useState<string>("50000");
  const [taxaJuros, setTaxaJuros] = useState<string>("1.49");
  const [prazoTotal, setPrazoTotal] = useState<string>("48");
  const [parcelasPagas, setParcelasPagas] = useState<string>("12");
  const [valorParcela, setValorParcela] = useState<string>("1450");
  const [sistema, setSistema] = useState<Sistema>("price");
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const valorFinanciadoNum = parseFloat(valorFinanciado.replace(/\D/g, "")) || 0;
  const taxaJurosNum = parseFloat(taxaJuros.replace(",", ".")) || 0;
  const prazoTotalNum = parseInt(prazoTotal) || 0;
  const parcelasPagasNum = parseInt(parcelasPagas) || 0;
  const valorParcelaNum = parseFloat(valorParcela.replace(/\D/g, "")) || 0;

  const resultado = useMemo(() => {
    if (
      valorFinanciadoNum <= 0 ||
      taxaJurosNum <= 0 ||
      prazoTotalNum <= 0 ||
      parcelasPagasNum < 0 ||
      parcelasPagasNum >= prazoTotalNum ||
      valorParcelaNum <= 0
    ) {
      return null;
    }

    const tabelaCompleta =
      sistema === "price"
        ? calcularTabelaPrice(valorFinanciadoNum, taxaJurosNum, prazoTotalNum)
        : calcularTabelaSAC(valorFinanciadoNum, taxaJurosNum, prazoTotalNum);

    // Saldo devedor atual (após as parcelas pagas)
    const saldoDevedorAtual =
      parcelasPagasNum > 0
        ? tabelaCompleta[parcelasPagasNum - 1].saldoDevedor
        : valorFinanciadoNum;

    // Parcelas restantes
    const parcelasRestantes = tabelaCompleta.slice(parcelasPagasNum);
    const numParcelasRestantes = prazoTotalNum - parcelasPagasNum;

    // Juros futuros que seriam pagos
    const jurosFuturos = parcelasRestantes.reduce((acc, p) => acc + p.juros, 0);

    // Total que seria pago até o final
    const totalAteOFinal = parcelasRestantes.reduce((acc, p) => acc + p.parcela, 0);

    // Valor de quitação: saldo devedor atual (sem os juros futuros)
    const valorQuitacao = saldoDevedorAtual;

    // Economia total
    const economiaBruta = totalAteOFinal - valorQuitacao;

    // Percentual de desconto
    const percentualDesconto =
      totalAteOFinal > 0 ? (economiaBruta / totalAteOFinal) * 100 : 0;

    return {
      saldoDevedorAtual,
      valorQuitacao,
      totalAteOFinal,
      economiaBruta,
      jurosFuturos,
      percentualDesconto,
      numParcelasRestantes,
      parcelasRestantes,
    };
  }, [valorFinanciadoNum, taxaJurosNum, prazoTotalNum, parcelasPagasNum, valorParcelaNum, sistema]);

  function handleCurrencyInput(value: string, setter: (v: string) => void) {
    const digits = value.replace(/\D/g, "");
    setter(digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    return num.toLocaleString("pt-BR");
  }

  function limpar() {
    setValorFinanciado("50000");
    setTaxaJuros("1.49");
    setPrazoTotal("48");
    setParcelasPagas("12");
    setValorParcela("1450");
    setSistema("price");
    setMostrarTabela(false);
  }

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Dados do Financiamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor original do financiamento */}
          <div>
            <label htmlFor="valor-financiado" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor Original do Financiamento (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                R$
              </span>
              <input
                id="valor-financiado"
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
            <label htmlFor="taxa-juros-quit" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Mensal (%)
            </label>
            <div className="relative">
              <input
                id="taxa-juros-quit"
                type="text"
                inputMode="decimal"
                value={taxaJuros}
                onChange={(e) => setTaxaJuros(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,49"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                %
              </span>
            </div>
          </div>

          {/* Prazo total */}
          <div>
            <label htmlFor="prazo-total" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Prazo Total (meses)
            </label>
            <input
              id="prazo-total"
              type="number"
              min={1}
              max={120}
              value={prazoTotal}
              onChange={(e) => setPrazoTotal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              placeholder="48"
            />
          </div>

          {/* Parcelas já pagas */}
          <div>
            <label htmlFor="parcelas-pagas" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Parcelas Já Pagas
            </label>
            <input
              id="parcelas-pagas"
              type="number"
              min={0}
              max={prazoTotalNum - 1}
              value={parcelasPagas}
              onChange={(e) => setParcelasPagas(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              placeholder="12"
            />
          </div>

          {/* Valor da parcela atual */}
          <div>
            <label htmlFor="valor-parcela" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor da Parcela Atual (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                R$
              </span>
              <input
                id="valor-parcela"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorParcela)}
                onChange={(e) => handleCurrencyInput(e.target.value, setValorParcela)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1.450"
              />
            </div>
          </div>

          {/* Sistema */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Sistema de Amortização
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSistema("price")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  sistema === "price"
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Tabela Price
              </button>
              <button
                type="button"
                onClick={() => setSistema("sac")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  sistema === "sac"
                    ? "bg-[#FF4D30] text-white shadow-sm"
                    : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
                }`}
              >
                Tabela SAC
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={limpar}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Limpar
            </button>
          </div>

          {/* Cards de comparação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pagar tudo até o final */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h3 className="text-lg font-bold text-[#0F172A]">Pagar até o final</h3>
              </div>
              <p className="text-sm text-[#64748B] mb-3">
                {resultado.numParcelasRestantes} parcelas restantes
              </p>
              <p className="text-3xl font-bold text-red-600 mb-2">
                {formatCurrency(resultado.totalAteOFinal)}
              </p>
              <p className="text-sm text-[#64748B]">
                Inclui {formatCurrency(resultado.jurosFuturos)} em juros
              </p>
            </div>

            {/* Quitar agora */}
            <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm p-6 relative">
              <div className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Recomendado
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="text-lg font-bold text-[#0F172A]">Quitar agora</h3>
              </div>
              <p className="text-sm text-[#64748B] mb-3">
                Saldo devedor atual
              </p>
              <p className="text-3xl font-bold text-emerald-600 mb-2">
                {formatCurrency(resultado.valorQuitacao)}
              </p>
              <p className="text-sm text-[#64748B]">
                Sem juros futuros
              </p>
            </div>
          </div>

          {/* Economia */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Sua economia com a quitação antecipada</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Economia Total
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(resultado.economiaBruta)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Juros Economizados
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(resultado.jurosFuturos)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Percentual de Desconto
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatPercent(resultado.percentualDesconto)}
                </p>
              </div>
            </div>
          </div>

          {/* Tabela de parcelas restantes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setMostrarTabela(!mostrarTabela)}
              aria-expanded={mostrarTabela}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-bold text-[#0F172A]">
                Parcelas Restantes e Juros
              </span>
              <svg
                className={`w-5 h-5 text-[#64748B] transition-transform ${
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
                      <th className="px-4 py-3 text-right font-semibold">Parcela</th>
                      <th className="px-4 py-3 text-right font-semibold">Amortização</th>
                      <th className="px-4 py-3 text-right font-semibold">Juros</th>
                      <th className="px-4 py-3 text-right font-semibold">Saldo Devedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.parcelasRestantes.map((linha) => (
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
