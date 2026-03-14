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

function calcularParcelaPrice(
  principal: number,
  taxaMensal: number,
  prazo: number
): number {
  if (taxaMensal === 0) return principal / prazo;
  const taxa = taxaMensal / 100;
  const fator = Math.pow(1 + taxa, prazo);
  return principal * ((taxa * fator) / (fator - 1));
}

export default function SimuladorRefinanciamento() {
  // Financiamento atual
  const [saldoDevedor, setSaldoDevedor] = useState<string>("45000");
  const [parcelasRestantes, setParcelasRestantes] = useState<string>("30");
  const [parcelaAtual, setParcelaAtual] = useState<string>("1800");
  const [taxaAtual, setTaxaAtual] = useState<string>("1.89");

  // Refinanciamento
  const [novaTaxa, setNovaTaxa] = useState<string>("1.49");
  const [novoPrazo, setNovoPrazo] = useState<string>("48");
  const [valorLiberado, setValorLiberado] = useState<string>("");

  const [calculado, setCalculado] = useState(false);

  const saldoNum = parseFloat(saldoDevedor.replace(/\D/g, "")) || 0;
  const parcelasRestNum = parseInt(parcelasRestantes) || 0;
  const parcelaAtualNum = parseFloat(parcelaAtual.replace(/\D/g, "")) || 0;
  const taxaAtualNum = parseFloat(taxaAtual.replace(",", ".")) || 0;
  const novaTaxaNum = parseFloat(novaTaxa.replace(",", ".")) || 0;
  const novoPrazoNum = parseInt(novoPrazo) || 0;
  const valorLiberadoNum = parseFloat(valorLiberado.replace(/\D/g, "")) || 0;

  const resultado = useMemo(() => {
    if (saldoNum <= 0 || parcelasRestNum <= 0 || parcelaAtualNum <= 0 || novoPrazoNum <= 0) {
      return null;
    }

    // Financiamento atual
    const totalPagoAtual = parcelaAtualNum * parcelasRestNum;
    const jurosRestantesAtual = totalPagoAtual - saldoNum;

    // Novo financiamento (saldo devedor + valor liberado adicional)
    const novoSaldo = saldoNum + valorLiberadoNum;
    const novaParcela = calcularParcelaPrice(novoSaldo, novaTaxaNum, novoPrazoNum);
    const totalPagoNovo = novaParcela * novoPrazoNum;
    const jurosNovo = totalPagoNovo - novoSaldo;

    // Comparações
    const diferencaParcela = novaParcela - parcelaAtualNum;
    const diferencaTotal = totalPagoNovo - totalPagoAtual;

    // Custo do valor liberado em juros
    let custoValorLiberado = 0;
    if (valorLiberadoNum > 0) {
      const parcelaSemLiberacao = calcularParcelaPrice(saldoNum, novaTaxaNum, novoPrazoNum);
      const totalSemLiberacao = parcelaSemLiberacao * novoPrazoNum;
      custoValorLiberado = totalPagoNovo - totalSemLiberacao - valorLiberadoNum;
    }

    const aumentaCusto = totalPagoNovo > totalPagoAtual;

    return {
      novaParcela,
      totalPagoAtual,
      totalPagoNovo,
      jurosRestantesAtual,
      jurosNovo,
      diferencaParcela,
      diferencaTotal,
      custoValorLiberado,
      aumentaCusto,
      novoSaldo,
    };
  }, [saldoNum, parcelasRestNum, parcelaAtualNum, taxaAtualNum, novaTaxaNum, novoPrazoNum, valorLiberadoNum]);

  function handleCurrencyInput(value: string, setter: (v: string) => void) {
    const digits = value.replace(/\D/g, "");
    setter(digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    return num.toLocaleString("pt-BR");
  }

  function handleSimular() {
    setCalculado(true);
  }

  function handleLimpar() {
    setSaldoDevedor("45000");
    setParcelasRestantes("30");
    setParcelaAtual("1800");
    setTaxaAtual("1.89");
    setNovaTaxa("1.49");
    setNovoPrazo("48");
    setValorLiberado("");
    setCalculado(false);
  }

  return (
    <div className="space-y-8">
      {/* Alerta */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
        <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <p className="font-semibold text-amber-800 text-sm">Atenção ao refinanciar</p>
          <p className="text-amber-700 text-sm mt-1">
            Refinanciar pode reduzir a parcela mas aumentar o custo total. Analise com cuidado.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Financiamento Atual
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saldo devedor */}
          <div>
            <label htmlFor="saldo-devedor" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Saldo Devedor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">R$</span>
              <input
                id="saldo-devedor"
                type="text"
                inputMode="numeric"
                value={displayCurrency(saldoDevedor)}
                onChange={(e) => handleCurrencyInput(e.target.value, setSaldoDevedor)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="45.000"
              />
            </div>
          </div>

          {/* Parcelas restantes */}
          <div>
            <label htmlFor="parcelas-restantes" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Parcelas Restantes
            </label>
            <input
              id="parcelas-restantes"
              type="text"
              inputMode="numeric"
              value={parcelasRestantes}
              onChange={(e) => setParcelasRestantes(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              placeholder="30"
            />
          </div>

          {/* Valor parcela atual */}
          <div>
            <label htmlFor="parcela-atual" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor da Parcela Atual (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">R$</span>
              <input
                id="parcela-atual"
                type="text"
                inputMode="numeric"
                value={displayCurrency(parcelaAtual)}
                onChange={(e) => handleCurrencyInput(e.target.value, setParcelaAtual)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1.800"
              />
            </div>
          </div>

          {/* Taxa juros atual */}
          <div>
            <label htmlFor="taxa-atual" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Atual (% a.m.)
            </label>
            <div className="relative">
              <input
                id="taxa-atual"
                type="text"
                inputMode="decimal"
                value={taxaAtual}
                onChange={(e) => setTaxaAtual(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,89"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Refinanciamento */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Condições do Refinanciamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nova taxa */}
          <div>
            <label htmlFor="nova-taxa" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Nova Taxa de Juros (% a.m.)
            </label>
            <div className="relative">
              <input
                id="nova-taxa"
                type="text"
                inputMode="decimal"
                value={novaTaxa}
                onChange={(e) => setNovaTaxa(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,49"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">%</span>
            </div>
          </div>

          {/* Novo prazo */}
          <div>
            <label htmlFor="novo-prazo" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Novo Prazo (meses)
            </label>
            <input
              id="novo-prazo"
              type="text"
              inputMode="numeric"
              value={novoPrazo}
              onChange={(e) => setNovoPrazo(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              placeholder="48"
            />
          </div>

          {/* Valor liberado adicional */}
          <div className="md:col-span-2">
            <label htmlFor="valor-liberado" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor Liberado Adicional (R$)
              <span className="text-[#64748B] font-normal ml-1">- opcional</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">R$</span>
              <input
                id="valor-liberado"
                type="text"
                inputMode="numeric"
                value={valorLiberado ? displayCurrency(valorLiberado) : ""}
                onChange={(e) => handleCurrencyInput(e.target.value, setValorLiberado)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Quando o refinanciamento libera dinheiro extra além do saldo devedor.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleSimular}
            className="flex-1 bg-[#FF4D30] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#E8432A] transition-colors shadow-sm"
          >
            Simular Refinanciamento
          </button>
          <button
            type="button"
            onClick={handleLimpar}
            className="py-3 px-6 rounded-xl font-semibold text-[#64748B] bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Resultados */}
      {calculado && resultado && (
        <>
          {/* Alerta de custo maior */}
          {resultado.aumentaCusto && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-red-800 text-sm">O refinanciamento aumenta o custo total!</p>
                <p className="text-red-700 text-sm mt-1">
                  Você pagará {formatCurrency(Math.abs(resultado.diferencaTotal))} a mais no total.
                  A parcela pode cair, mas o custo final sobe. Avalie se isso faz sentido para sua situação.
                </p>
              </div>
            </div>
          )}

          {/* Comparação antes vs depois */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-[#0F172A] mb-6">
              Comparação: Antes vs Depois
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Antes */}
              <div className="bg-[#F8FAFC] rounded-xl p-5 border border-gray-100">
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">Financiamento Atual</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Parcela mensal</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(parcelaAtualNum)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Parcelas restantes</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{parcelasRestNum} meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Total restante a pagar</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(resultado.totalPagoAtual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Juros restantes</span>
                    <span className="text-sm font-semibold text-red-600">{formatCurrency(resultado.jurosRestantesAtual)}</span>
                  </div>
                </div>
              </div>

              {/* Depois */}
              <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#FF4D30]/20">
                <h3 className="text-sm font-semibold text-[#FF4D30] uppercase tracking-wide mb-4">Refinanciamento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Nova parcela mensal</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(resultado.novaParcela)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Novo prazo</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{novoPrazoNum} meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Total a pagar</span>
                    <span className="text-sm font-semibold text-[#0F172A]">{formatCurrency(resultado.totalPagoNovo)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#64748B]">Juros totais</span>
                    <span className="text-sm font-semibold text-red-600">{formatCurrency(resultado.jurosNovo)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Nova Parcela
              </p>
              <p className="text-2xl font-bold text-[#FF4D30]">
                {formatCurrency(resultado.novaParcela)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Diferença na Parcela
              </p>
              <p className={`text-2xl font-bold ${resultado.diferencaParcela <= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {resultado.diferencaParcela <= 0 ? "-" : "+"}{formatCurrency(Math.abs(resultado.diferencaParcela))}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Diferença no Custo Total
              </p>
              <p className={`text-2xl font-bold ${resultado.diferencaTotal <= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {resultado.diferencaTotal <= 0 ? "-" : "+"}{formatCurrency(Math.abs(resultado.diferencaTotal))}
              </p>
            </div>
          </div>

          {/* Valor liberado */}
          {valorLiberadoNum > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                Custo Real do Valor Liberado
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">Valor Recebido</p>
                  <p className="text-xl font-bold text-[#0F172A]">{formatCurrency(valorLiberadoNum)}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">Juros sobre o Valor Extra</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(resultado.custoValorLiberado)}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">Custo Real do Dinheiro</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(valorLiberadoNum + resultado.custoValorLiberado)}</p>
                </div>
              </div>
              <p className="text-sm text-[#64748B] mt-4">
                Ao liberar {formatCurrency(valorLiberadoNum)} no refinanciamento, você pagará{" "}
                {formatCurrency(resultado.custoValorLiberado)} em juros adicionais sobre esse valor.
                Ou seja, o custo real do dinheiro recebido é de{" "}
                {formatCurrency(valorLiberadoNum + resultado.custoValorLiberado)}.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
