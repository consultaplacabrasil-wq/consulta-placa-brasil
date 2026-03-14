"use client";

import { useState, useMemo } from "react";

type Sistema = "price" | "sac";
type ModoAntecipacao = "reduzir-prazo" | "reduzir-parcela";

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

function calcularParcelaPrice(saldo: number, taxa: number, prazo: number): number {
  if (taxa === 0) return saldo / prazo;
  const fator = Math.pow(1 + taxa, prazo);
  return saldo * ((taxa * fator) / (fator - 1));
}

function calcularSaldoDevedorPrice(
  parcelaOriginal: number,
  taxa: number,
  parcelasRestantes: number
): number {
  if (taxa === 0) return parcelaOriginal * parcelasRestantes;
  const fator = Math.pow(1 + taxa, parcelasRestantes);
  return parcelaOriginal * ((fator - 1) / (taxa * fator));
}

function calcularSaldoDevedorSAC(
  parcelaAtual: number,
  taxa: number,
  parcelasRestantes: number
): number {
  // No SAC: parcela = amortização + juros, juros = saldo * taxa
  // amortização = saldo / parcelasRestantes (original)
  // Simplificação: saldo = amortização * parcelasRestantes
  // parcelaAtual = amortização + saldo * taxa
  // parcelaAtual = amortização + amortização * parcelasRestantes * taxa
  // amortização = parcelaAtual / (1 + parcelasRestantes * taxa)
  const amortizacao = parcelaAtual / (1 + parcelasRestantes * taxa);
  return amortizacao * parcelasRestantes;
}

export default function AntecipacaoParcelas() {
  const [valorParcela, setValorParcela] = useState<string>("1500");
  const [taxaJuros, setTaxaJuros] = useState<string>("1.49");
  const [parcelasRestantes, setParcelasRestantes] = useState<number>(36);
  const [qtdAntecipar, setQtdAntecipar] = useState<number>(6);
  const [sistema, setSistema] = useState<Sistema>("price");
  const [modoAntecipacao, setModoAntecipacao] = useState<ModoAntecipacao>("reduzir-prazo");
  const [calculado, setCalculado] = useState(false);

  const valorParcelaNum = parseFloat(valorParcela.replace(/\D/g, "")) || 0;
  const taxaNum = parseFloat(taxaJuros.replace(",", ".")) / 100 || 0;

  const maxAntecipar = Math.max(parcelasRestantes - 1, 1);

  const resultados = useMemo(() => {
    if (valorParcelaNum <= 0 || taxaNum <= 0 || parcelasRestantes <= 0 || qtdAntecipar <= 0) {
      return null;
    }

    const qtdReal = Math.min(qtdAntecipar, parcelasRestantes - 1);

    if (sistema === "price") {
      // Saldo devedor atual
      const saldoAtual = calcularSaldoDevedorPrice(valorParcelaNum, taxaNum, parcelasRestantes);

      // Custo total se pagar no prazo original
      const custoOriginal = valorParcelaNum * parcelasRestantes;

      // Valor presente das parcelas antecipadas (últimas parcelas, descontando juros futuros)
      let valorAntecipacao = 0;
      const parcelasDescontadas: { numero: number; valorOriginal: number; valorPresente: number; desconto: number }[] = [];

      for (let i = 0; i < qtdReal; i++) {
        // Antecipando as últimas parcelas
        const parcelaIndex = parcelasRestantes - i; // parcela do final
        const mesesRestantesParaEssa = parcelaIndex;
        const valorPresente = valorParcelaNum / Math.pow(1 + taxaNum, mesesRestantesParaEssa);
        valorAntecipacao += valorPresente;
        parcelasDescontadas.push({
          numero: parcelaIndex,
          valorOriginal: valorParcelaNum,
          valorPresente,
          desconto: valorParcelaNum - valorPresente,
        });
      }

      const novasParcelasRestantes = parcelasRestantes - qtdReal;
      const novoSaldoDevedor = calcularSaldoDevedorPrice(valorParcelaNum, taxaNum, novasParcelasRestantes);

      if (modoAntecipacao === "reduzir-prazo") {
        const custoNovo = valorAntecipacao + valorParcelaNum * novasParcelasRestantes;
        const economia = custoOriginal - custoNovo;
        const descontoObtido = (valorParcelaNum * qtdReal) - valorAntecipacao;

        return {
          saldoAtual,
          valorAntecipacao,
          economia,
          descontoObtido,
          novoSaldoDevedor,
          novoPrazo: novasParcelasRestantes,
          novaParcela: valorParcelaNum,
          custoOriginal,
          custoNovo,
          parcelasDescontadas: parcelasDescontadas.reverse(),
          prazoOriginal: parcelasRestantes,
          parcelaOriginal: valorParcelaNum,
        };
      } else {
        // Reduzir parcela: manter prazo, recalcular parcela com novo saldo
        const novoSaldoAposAntecipacao = saldoAtual - valorAntecipacao;
        const novaParcela = calcularParcelaPrice(novoSaldoAposAntecipacao, taxaNum, parcelasRestantes);
        const custoNovo = novaParcela * parcelasRestantes;
        const economia = custoOriginal - custoNovo;

        return {
          saldoAtual,
          valorAntecipacao,
          economia,
          descontoObtido: (valorParcelaNum * qtdReal) - valorAntecipacao,
          novoSaldoDevedor: novoSaldoAposAntecipacao,
          novoPrazo: parcelasRestantes,
          novaParcela,
          custoOriginal,
          custoNovo,
          parcelasDescontadas: parcelasDescontadas.reverse(),
          prazoOriginal: parcelasRestantes,
          parcelaOriginal: valorParcelaNum,
        };
      }
    } else {
      // SAC
      const saldoAtual = calcularSaldoDevedorSAC(valorParcelaNum, taxaNum, parcelasRestantes);
      const amortizacaoFixa = saldoAtual / parcelasRestantes;

      // Custo total original (SAC)
      let custoOriginal = 0;
      let saldoTemp = saldoAtual;
      for (let i = 0; i < parcelasRestantes; i++) {
        const juros = saldoTemp * taxaNum;
        custoOriginal += amortizacaoFixa + juros;
        saldoTemp -= amortizacaoFixa;
      }

      // Valor presente das últimas parcelas
      let valorAntecipacao = 0;
      const parcelasDescontadas: { numero: number; valorOriginal: number; valorPresente: number; desconto: number }[] = [];

      let saldoCalc = saldoAtual;
      const parcelasOriginais: number[] = [];
      for (let i = 0; i < parcelasRestantes; i++) {
        const juros = saldoCalc * taxaNum;
        parcelasOriginais.push(amortizacaoFixa + juros);
        saldoCalc -= amortizacaoFixa;
      }

      const qtdReal2 = Math.min(qtdAntecipar, parcelasRestantes - 1);

      for (let i = 0; i < qtdReal2; i++) {
        const idx = parcelasRestantes - 1 - i;
        const parcelaNum = idx + 1;
        const valorOriginalParcela = parcelasOriginais[idx];
        const valorPresente = valorOriginalParcela / Math.pow(1 + taxaNum, parcelaNum);
        valorAntecipacao += valorPresente;
        parcelasDescontadas.push({
          numero: parcelaNum,
          valorOriginal: valorOriginalParcela,
          valorPresente,
          desconto: valorOriginalParcela - valorPresente,
        });
      }

      const novasParcelasRestantes = parcelasRestantes - qtdReal2;

      if (modoAntecipacao === "reduzir-prazo") {
        const novoSaldo = saldoAtual - valorAntecipacao;
        let custoNovo = valorAntecipacao;
        let saldoN = novoSaldo;
        const novaAmort = novoSaldo / novasParcelasRestantes;
        for (let i = 0; i < novasParcelasRestantes; i++) {
          const juros = saldoN * taxaNum;
          custoNovo += novaAmort + juros;
          saldoN -= novaAmort;
        }
        const economia = custoOriginal - custoNovo;
        const descontoObtido = parcelasDescontadas.reduce((s, p) => s + p.desconto, 0);

        return {
          saldoAtual,
          valorAntecipacao,
          economia,
          descontoObtido,
          novoSaldoDevedor: saldoAtual - valorAntecipacao,
          novoPrazo: novasParcelasRestantes,
          novaParcela: (saldoAtual - valorAntecipacao) / novasParcelasRestantes + (saldoAtual - valorAntecipacao) * taxaNum,
          custoOriginal,
          custoNovo,
          parcelasDescontadas: parcelasDescontadas.reverse(),
          prazoOriginal: parcelasRestantes,
          parcelaOriginal: valorParcelaNum,
        };
      } else {
        const novoSaldo = saldoAtual - valorAntecipacao;
        const novaAmort = novoSaldo / parcelasRestantes;
        const novaParcela = novaAmort + novoSaldo * taxaNum;
        let custoNovo = 0;
        let saldoN = novoSaldo;
        for (let i = 0; i < parcelasRestantes; i++) {
          const juros = saldoN * taxaNum;
          custoNovo += novaAmort + juros;
          saldoN -= novaAmort;
        }
        const economia = custoOriginal - custoNovo;
        const descontoObtido = parcelasDescontadas.reduce((s, p) => s + p.desconto, 0);

        return {
          saldoAtual,
          valorAntecipacao,
          economia,
          descontoObtido,
          novoSaldoDevedor: novoSaldo,
          novoPrazo: parcelasRestantes,
          novaParcela,
          custoOriginal,
          custoNovo,
          parcelasDescontadas: parcelasDescontadas.reverse(),
          prazoOriginal: parcelasRestantes,
          parcelaOriginal: valorParcelaNum,
        };
      }
    }
  }, [valorParcelaNum, taxaNum, parcelasRestantes, qtdAntecipar, sistema, modoAntecipacao]);

  function handleCurrencyInput(value: string, setter: (v: string) => void) {
    const digits = value.replace(/\D/g, "");
    setter(digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    return num.toLocaleString("pt-BR");
  }

  function handleCalcular() {
    setCalculado(true);
  }

  function handleRedefinir() {
    setValorParcela("1500");
    setTaxaJuros("1.49");
    setParcelasRestantes(36);
    setQtdAntecipar(6);
    setSistema("price");
    setModoAntecipacao("reduzir-prazo");
    setCalculado(false);
  }

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Dados do Financiamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor da parcela */}
          <div>
            <label htmlFor="valor-parcela-ant" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor da Parcela (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                R$
              </span>
              <input
                id="valor-parcela-ant"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorParcela)}
                onChange={(e) => {
                  handleCurrencyInput(e.target.value, setValorParcela);
                  setCalculado(false);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1.500"
              />
            </div>
          </div>

          {/* Taxa de juros */}
          <div>
            <label htmlFor="taxa-juros-ant" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Mensal (%)
            </label>
            <div className="relative">
              <input
                id="taxa-juros-ant"
                type="text"
                inputMode="decimal"
                value={taxaJuros}
                onChange={(e) => {
                  setTaxaJuros(e.target.value);
                  setCalculado(false);
                }}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,49"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                %
              </span>
            </div>
          </div>

          {/* Parcelas restantes */}
          <div>
            <label htmlFor="parcelas-restantes-ant" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Parcelas Restantes
            </label>
            <input
              id="parcelas-restantes-ant"
              type="number"
              min={2}
              max={120}
              value={parcelasRestantes}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 2;
                setParcelasRestantes(val);
                if (qtdAntecipar >= val) setQtdAntecipar(Math.max(val - 1, 1));
                setCalculado(false);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
            />
          </div>

          {/* Sistema */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Sistema de Amortização
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setSistema("price"); setCalculado(false); }}
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
                onClick={() => { setSistema("sac"); setCalculado(false); }}
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

        {/* Slider: quantas parcelas antecipar */}
        <div className="mt-6">
          <label htmlFor="qtd-antecipar" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Parcelas a antecipar: <span className="text-[#FF4D30]">{qtdAntecipar} {qtdAntecipar === 1 ? "parcela" : "parcelas"}</span>
          </label>
          <input
            id="qtd-antecipar"
            type="range"
            min={1}
            max={maxAntecipar}
            step={1}
            value={Math.min(qtdAntecipar, maxAntecipar)}
            onChange={(e) => {
              setQtdAntecipar(parseInt(e.target.value));
              setCalculado(false);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D30]"
          />
          <div className="flex justify-between text-xs text-[#64748B] mt-1">
            <span>1 parcela</span>
            <span>{maxAntecipar} parcelas</span>
          </div>
        </div>

        {/* Modo de antecipação */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            O que deseja fazer ao antecipar?
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setModoAntecipacao("reduzir-prazo"); setCalculado(false); }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                modoAntecipacao === "reduzir-prazo"
                  ? "bg-[#FF4D30] text-white shadow-sm"
                  : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
              }`}
            >
              Reduzir prazo
            </button>
            <button
              type="button"
              onClick={() => { setModoAntecipacao("reduzir-parcela"); setCalculado(false); }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                modoAntecipacao === "reduzir-parcela"
                  ? "bg-[#FF4D30] text-white shadow-sm"
                  : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
              }`}
            >
              Reduzir parcela
            </button>
          </div>
        </div>

        {/* Botão calcular */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleCalcular}
            className="w-full py-3.5 bg-[#FF4D30] hover:bg-[#E5432A] text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Simular Antecipação
          </button>
        </div>
      </div>

      {/* Resultados */}
      {calculado && resultados && (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleRedefinir}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Redefinir valores
            </button>
          </div>

          {/* Cards de resultado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Economia Total
              </p>
              <p className="text-2xl font-bold text-[#16A34A]">
                {formatCurrency(resultados.economia)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                {modoAntecipacao === "reduzir-prazo" ? "Novo Prazo" : "Nova Parcela"}
              </p>
              <p className="text-2xl font-bold text-[#FF4D30]">
                {modoAntecipacao === "reduzir-prazo"
                  ? `${resultados.novoPrazo} meses`
                  : formatCurrency(resultados.novaParcela)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Desconto Obtido
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatCurrency(resultados.descontoObtido)}
              </p>
            </div>
          </div>

          {/* Cards secundários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Valor a Pagar na Antecipação
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatCurrency(resultados.valorAntecipacao)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Novo Saldo Devedor
              </p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatCurrency(resultados.novoSaldoDevedor)}
              </p>
            </div>
          </div>

          {/* Tabela comparativa */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Comparativo Antes e Depois
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F1F5F9] text-[#475569]">
                    <th className="px-4 py-3 text-left font-semibold">Item</th>
                    <th className="px-4 py-3 text-right font-semibold">Antes</th>
                    <th className="px-4 py-3 text-right font-semibold">Depois</th>
                    <th className="px-4 py-3 text-right font-semibold">Diferença</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                    <td className="px-4 py-3 text-[#334155] font-medium">Valor da Parcela</td>
                    <td className="px-4 py-3 text-right text-[#0F172A]">{formatCurrency(resultados.parcelaOriginal)}</td>
                    <td className="px-4 py-3 text-right text-[#0F172A] font-semibold">{formatCurrency(resultados.novaParcela)}</td>
                    <td className="px-4 py-3 text-right text-[#16A34A]">
                      {resultados.parcelaOriginal - resultados.novaParcela > 0
                        ? `- ${formatCurrency(resultados.parcelaOriginal - resultados.novaParcela)}`
                        : formatCurrency(0)}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                    <td className="px-4 py-3 text-[#334155] font-medium">Prazo Restante</td>
                    <td className="px-4 py-3 text-right text-[#0F172A]">{resultados.prazoOriginal} meses</td>
                    <td className="px-4 py-3 text-right text-[#0F172A] font-semibold">{resultados.novoPrazo} meses</td>
                    <td className="px-4 py-3 text-right text-[#16A34A]">
                      {resultados.prazoOriginal - resultados.novoPrazo > 0
                        ? `- ${resultados.prazoOriginal - resultados.novoPrazo} meses`
                        : "0 meses"}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                    <td className="px-4 py-3 text-[#334155] font-medium">Saldo Devedor</td>
                    <td className="px-4 py-3 text-right text-[#0F172A]">{formatCurrency(resultados.saldoAtual)}</td>
                    <td className="px-4 py-3 text-right text-[#0F172A] font-semibold">{formatCurrency(resultados.novoSaldoDevedor)}</td>
                    <td className="px-4 py-3 text-right text-[#16A34A]">
                      - {formatCurrency(resultados.saldoAtual - resultados.novoSaldoDevedor)}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                    <td className="px-4 py-3 text-[#334155] font-medium">Custo Total</td>
                    <td className="px-4 py-3 text-right text-[#0F172A]">{formatCurrency(resultados.custoOriginal)}</td>
                    <td className="px-4 py-3 text-right text-[#0F172A] font-semibold">{formatCurrency(resultados.custoNovo)}</td>
                    <td className="px-4 py-3 text-right text-[#16A34A] font-semibold">
                      - {formatCurrency(resultados.economia)}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors">
                    <td className="px-4 py-3 text-[#334155] font-medium">Economia (%)</td>
                    <td className="px-4 py-3 text-right text-[#64748B]">-</td>
                    <td className="px-4 py-3 text-right text-[#64748B]">-</td>
                    <td className="px-4 py-3 text-right text-[#16A34A] font-semibold">
                      {resultados.custoOriginal > 0
                        ? formatPercent((resultados.economia / resultados.custoOriginal) * 100)
                        : "0,00%"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detalhamento das parcelas antecipadas */}
          {resultados.parcelasDescontadas.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Parcelas Antecipadas (com desconto)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#475569]">
                      <th className="px-4 py-3 text-left font-semibold">Parcela</th>
                      <th className="px-4 py-3 text-right font-semibold">Valor Original</th>
                      <th className="px-4 py-3 text-right font-semibold">Valor com Desconto</th>
                      <th className="px-4 py-3 text-right font-semibold">Desconto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.parcelasDescontadas.map((p) => (
                      <tr
                        key={p.numero}
                        className="border-t border-gray-100 hover:bg-[#FFFBFA] transition-colors"
                      >
                        <td className="px-4 py-3 text-[#334155] font-medium">{p.numero}ª</td>
                        <td className="px-4 py-3 text-right text-[#0F172A]">{formatCurrency(p.valorOriginal)}</td>
                        <td className="px-4 py-3 text-right text-[#16A34A] font-semibold">{formatCurrency(p.valorPresente)}</td>
                        <td className="px-4 py-3 text-right text-[#FF4D30]">{formatCurrency(p.desconto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
