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
  saldo: number,
  taxaMensal: number,
  prazo: number
): number {
  const taxa = taxaMensal / 100;
  if (taxa === 0) return saldo / prazo;
  const fator = Math.pow(1 + taxa, prazo);
  return saldo * ((taxa * fator) / (fator - 1));
}

export default function PortabilidadeFinanciamento() {
  const [saldoDevedor, setSaldoDevedor] = useState<string>("45000");
  const [taxaAtual, setTaxaAtual] = useState<string>("1.99");
  const [parcelasRestantes, setParcelasRestantes] = useState<string>("36");
  const [parcelaAtual, setParcelaAtual] = useState<string>("1650");
  const [taxaNova, setTaxaNova] = useState<string>("1.29");
  const [prazoNovo, setPrazoNovo] = useState<string>("36");

  const saldoNum = parseFloat(saldoDevedor.replace(/\D/g, "")) || 0;
  const taxaAtualNum = parseFloat(taxaAtual.replace(",", ".")) || 0;
  const parcelasRestantesNum = parseInt(parcelasRestantes) || 0;
  const parcelaAtualNum = parseFloat(parcelaAtual.replace(/\D/g, "")) || 0;
  const taxaNovaNum = parseFloat(taxaNova.replace(",", ".")) || 0;
  const prazoNovoNum = parseInt(prazoNovo) || 0;

  const resultado = useMemo(() => {
    if (
      saldoNum <= 0 ||
      taxaAtualNum <= 0 ||
      parcelasRestantesNum <= 0 ||
      parcelaAtualNum <= 0 ||
      taxaNovaNum <= 0 ||
      prazoNovoNum <= 0
    )
      return null;

    const novaParcela = calcularParcelaPrice(saldoNum, taxaNovaNum, prazoNovoNum);
    const totalBancoAtual = parcelaAtualNum * parcelasRestantesNum;
    const totalNovoBanco = novaParcela * prazoNovoNum;
    const custoPortabilidade = 500;
    const economiaTotal = totalBancoAtual - totalNovoBanco - custoPortabilidade;
    const economiaMensal = parcelaAtualNum - novaParcela;

    return {
      novaParcela,
      totalBancoAtual,
      totalNovoBanco,
      economiaTotal,
      economiaMensal,
      custoPortabilidade,
      valePena: economiaTotal > 0,
    };
  }, [saldoNum, taxaAtualNum, parcelasRestantesNum, parcelaAtualNum, taxaNovaNum, prazoNovoNum]);

  function handleCurrencyInput(value: string, setter: (v: string) => void) {
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
        {/* Banco Atual */}
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Banco Atual
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="saldo-devedor" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Saldo Devedor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
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

          <div>
            <label htmlFor="taxa-atual" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Taxa de Juros Mensal (%)
            </label>
            <div className="relative">
              <input
                id="taxa-atual"
                type="text"
                inputMode="decimal"
                value={taxaAtual}
                onChange={(e) => setTaxaAtual(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1,99"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                %
              </span>
            </div>
          </div>

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
              placeholder="36"
            />
          </div>

          <div>
            <label htmlFor="parcela-atual" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Valor da Parcela Atual (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
              <input
                id="parcela-atual"
                type="text"
                inputMode="numeric"
                value={displayCurrency(parcelaAtual)}
                onChange={(e) => handleCurrencyInput(e.target.value, setParcelaAtual)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1.650"
              />
            </div>
          </div>
        </div>

        {/* Novo Banco */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6">
            Novo Banco
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="taxa-nova" className="block text-sm font-semibold text-[#0F172A] mb-2">
                Taxa de Juros Mensal (%)
              </label>
              <div className="relative">
                <input
                  id="taxa-nova"
                  type="text"
                  inputMode="decimal"
                  value={taxaNova}
                  onChange={(e) => setTaxaNova(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                  placeholder="1,29"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                  %
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="prazo-novo" className="block text-sm font-semibold text-[#0F172A] mb-2">
                Prazo Desejado (meses)
              </label>
              <input
                id="prazo-novo"
                type="text"
                inputMode="numeric"
                value={prazoNovo}
                onChange={(e) => setPrazoNovo(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="36"
              />
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
              onClick={() => {
                setSaldoDevedor("45000");
                setTaxaAtual("1.99");
                setParcelasRestantes("36");
                setParcelaAtual("1650");
                setTaxaNova("1.29");
                setPrazoNovo("36");
              }}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Redefinir valores
            </button>
          </div>

          {/* Comparação lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banco Atual */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Banco Atual</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Parcela mensal</span>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {formatCurrency(parcelaAtualNum)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Parcelas restantes</span>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {parcelasRestantesNum}x
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Taxa mensal</span>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {taxaAtualNum.toFixed(2)}%
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#475569]">Total a pagar</span>
                  <span className="text-xl font-bold text-[#0F172A]">
                    {formatCurrency(resultado.totalBancoAtual)}
                  </span>
                </div>
              </div>
            </div>

            {/* Novo Banco */}
            <div className="bg-white rounded-2xl border-2 border-[#FF4D30]/30 shadow-sm p-6 relative">
              <div className="absolute -top-3 right-4 bg-[#FF4D30] text-white text-xs font-bold px-3 py-1 rounded-full">
                Nova proposta
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#FF4D30]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Novo Banco</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Parcela mensal</span>
                  <span className="text-lg font-bold text-[#FF4D30]">
                    {formatCurrency(resultado.novaParcela)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Prazo</span>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {prazoNovoNum}x
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#64748B]">Taxa mensal</span>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {taxaNovaNum.toFixed(2)}%
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#475569]">Total a pagar</span>
                  <span className="text-xl font-bold text-[#0F172A]">
                    {formatCurrency(resultado.totalNovoBanco)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Economia em destaque */}
          <div
            className={`rounded-2xl p-6 md:p-8 text-center ${
              resultado.valePena
                ? "bg-emerald-50 border-2 border-emerald-200"
                : "bg-red-50 border-2 border-red-200"
            }`}
          >
            <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-2">
              {resultado.valePena ? "Economia total estimada" : "Custo adicional estimado"}
            </p>
            <p
              className={`text-4xl md:text-5xl font-bold mb-2 ${
                resultado.valePena ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {resultado.valePena ? "" : "+ "}
              {formatCurrency(Math.abs(resultado.economiaTotal))}
            </p>
            <p className="text-sm text-[#64748B] mb-4">
              Economia mensal de{" "}
              <span className="font-bold">
                {formatCurrency(resultado.economiaMensal)}
              </span>{" "}
              por parcela
            </p>
            <p className="text-xs text-[#94A3B8]">
              * Considera custo estimado de portabilidade de {formatCurrency(resultado.custoPortabilidade)}
            </p>
          </div>

          {/* Recomendação */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-3">
              {resultado.valePena
                ? "A portabilidade vale a pena!"
                : "A portabilidade pode não compensar"}
            </h3>
            {resultado.valePena ? (
              <p className="text-[#475569] leading-relaxed">
                Com base nos dados informados, transferir seu financiamento para o novo banco
                pode gerar uma economia de{" "}
                <strong className="text-emerald-600">
                  {formatCurrency(resultado.economiaTotal)}
                </strong>{" "}
                ao longo do contrato, mesmo considerando o custo estimado de portabilidade de{" "}
                {formatCurrency(resultado.custoPortabilidade)}. Sua parcela mensal cairia de{" "}
                {formatCurrency(parcelaAtualNum)} para{" "}
                <strong className="text-[#FF4D30]">
                  {formatCurrency(resultado.novaParcela)}
                </strong>
                . Recomendamos solicitar a portabilidade e negociar condições ainda melhores
                com seu banco atual antes de fechar a operação.
              </p>
            ) : (
              <p className="text-[#475569] leading-relaxed">
                Com os valores informados, a portabilidade resultaria em um custo adicional de{" "}
                <strong className="text-red-600">
                  {formatCurrency(Math.abs(resultado.economiaTotal))}
                </strong>{" "}
                ao considerar o custo de portabilidade de{" "}
                {formatCurrency(resultado.custoPortabilidade)}. Neste cenário, pode ser mais
                vantajoso manter o contrato no banco atual ou buscar condições melhores em
                outras instituições. Tente negociar uma taxa menor diretamente com seu banco.
              </p>
            )}
          </div>

          {/* Detalhamento */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">
              Detalhamento da comparação
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-[#64748B]">Total banco atual ({parcelasRestantesNum}x de {formatCurrency(parcelaAtualNum)})</span>
                <span className="text-sm font-bold text-[#0F172A]">{formatCurrency(resultado.totalBancoAtual)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-[#64748B]">Total novo banco ({prazoNovoNum}x de {formatCurrency(resultado.novaParcela)})</span>
                <span className="text-sm font-bold text-[#0F172A]">{formatCurrency(resultado.totalNovoBanco)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-[#64748B]">Custo de portabilidade (estimado)</span>
                <span className="text-sm font-bold text-[#0F172A]">{formatCurrency(resultado.custoPortabilidade)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-[#475569]">Diferença líquida</span>
                <span
                  className={`text-lg font-bold ${
                    resultado.valePena ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {resultado.valePena ? "-" : "+"}{" "}
                  {formatCurrency(Math.abs(resultado.economiaTotal))}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
