"use client";

import { useState, useMemo } from "react";

const TAXAS_MEDIAS_BC: Record<number, number> = {
  2020: 1.45,
  2021: 1.35,
  2022: 1.75,
  2023: 1.85,
  2024: 1.63,
  2025: 1.58,
  2026: 1.55,
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcularTotalPago(
  valorFinanciado: number,
  taxaMensal: number,
  prazo: number
): number {
  const taxa = taxaMensal / 100;
  if (taxa <= 0 || prazo <= 0) return 0;
  const fator = Math.pow(1 + taxa, prazo);
  const parcela = valorFinanciado * ((taxa * fator) / (fator - 1));
  return parcela * prazo;
}

function calcularParcela(
  valorFinanciado: number,
  taxaMensal: number,
  prazo: number
): number {
  const taxa = taxaMensal / 100;
  if (taxa <= 0 || prazo <= 0) return 0;
  const fator = Math.pow(1 + taxa, prazo);
  return valorFinanciado * ((taxa * fator) / (fator - 1));
}

export default function JurosAbusivos() {
  const [taxaContrato, setTaxaContrato] = useState<string>("2.90");
  const [valorFinanciado, setValorFinanciado] = useState<string>("45000");
  const [prazo, setPrazo] = useState<string>("48");
  const [valorParcela, setValorParcela] = useState<string>("1450");
  const [anoContrato, setAnoContrato] = useState<number>(2024);
  const [calculado, setCalculado] = useState(false);

  const taxaContNum = parseFloat(taxaContrato.replace(",", ".")) || 0;
  const valorFinNum = parseInt(valorFinanciado.replace(/\D/g, "")) || 0;
  const prazoNum = parseInt(prazo) || 0;
  const parcelaNum = parseInt(valorParcela.replace(/\D/g, "")) || 0;

  const taxaMediaBC = TAXAS_MEDIAS_BC[anoContrato] || 1.55;

  const resultado = useMemo(() => {
    if (!calculado || taxaContNum <= 0 || valorFinNum <= 0 || prazoNum <= 0)
      return null;

    const diferencaPercentual =
      ((taxaContNum - taxaMediaBC) / taxaMediaBC) * 100;
    const isAbusivo = diferencaPercentual > 50;

    const totalContrato = calcularTotalPago(valorFinNum, taxaContNum, prazoNum);
    const totalMediaBC = calcularTotalPago(valorFinNum, taxaMediaBC, prazoNum);
    const economia = totalContrato - totalMediaBC;

    const parcelaContrato = calcularParcela(
      valorFinNum,
      taxaContNum,
      prazoNum
    );
    const parcelaMedia = calcularParcela(valorFinNum, taxaMediaBC, prazoNum);

    return {
      diferencaPercentual,
      isAbusivo,
      totalContrato,
      totalMediaBC,
      economia,
      parcelaContrato,
      parcelaMedia,
      taxaMediaBC,
    };
  }, [calculado, taxaContNum, valorFinNum, prazoNum, taxaMediaBC]);

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

  function handleCalcular() {
    setCalculado(true);
  }

  function handleLimpar() {
    setTaxaContrato("2.90");
    setValorFinanciado("45000");
    setPrazo("48");
    setValorParcela("1450");
    setAnoContrato(2024);
    setCalculado(false);
  }

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">
          Dados do Contrato de Financiamento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Taxa de juros do contrato */}
          <div>
            <label
              htmlFor="taxa-contrato"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Taxa de Juros do Contrato (% ao mês)
            </label>
            <div className="relative">
              <input
                id="taxa-contrato"
                type="text"
                inputMode="decimal"
                value={taxaContrato}
                onChange={(e) => {
                  setTaxaContrato(e.target.value);
                  setCalculado(false);
                }}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="2,90"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                %
              </span>
            </div>
          </div>

          {/* Valor financiado */}
          <div>
            <label
              htmlFor="valor-financiado"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Valor Financiado (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
              <input
                id="valor-financiado"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorFinanciado)}
                onChange={(e) => {
                  handleCurrencyInput(e.target.value, setValorFinanciado);
                  setCalculado(false);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="45.000"
              />
            </div>
          </div>

          {/* Prazo */}
          <div>
            <label
              htmlFor="prazo-contrato"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Prazo do Financiamento (meses)
            </label>
            <input
              id="prazo-contrato"
              type="text"
              inputMode="numeric"
              value={prazo}
              onChange={(e) => {
                setPrazo(e.target.value.replace(/\D/g, ""));
                setCalculado(false);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              placeholder="48"
            />
          </div>

          {/* Valor da parcela */}
          <div>
            <label
              htmlFor="valor-parcela"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Valor da Parcela (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">
                R$
              </span>
              <input
                id="valor-parcela"
                type="text"
                inputMode="numeric"
                value={displayCurrency(valorParcela)}
                onChange={(e) => {
                  handleCurrencyInput(e.target.value, setValorParcela);
                  setCalculado(false);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                placeholder="1.450"
              />
            </div>
          </div>

          {/* Ano do contrato */}
          <div className="md:col-span-2">
            <label
              htmlFor="ano-contrato"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Ano do Contrato
            </label>
            <select
              id="ano-contrato"
              value={anoContrato}
              onChange={(e) => {
                setAnoContrato(parseInt(e.target.value));
                setCalculado(false);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
            >
              {Object.keys(TAXAS_MEDIAS_BC)
                .sort()
                .map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
            </select>
            <p className="text-xs text-[#94A3B8] mt-1">
              Taxa média do Banco Central para financiamento de veículos em{" "}
              {anoContrato}: <strong>{taxaMediaBC.toFixed(2)}% a.m.</strong>
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={handleCalcular}
            disabled={taxaContNum <= 0 || valorFinNum <= 0 || prazoNum <= 0}
            className="flex-1 bg-[#FF4D30] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#e6432a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Analisar Contrato
          </button>
          <button
            type="button"
            onClick={handleLimpar}
            className="px-6 py-3.5 rounded-xl border border-gray-200 text-[#64748B] font-semibold hover:bg-gray-50 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Resultado principal */}
      {resultado && (
        <>
          {/* Card de veredito */}
          <div
            className={`rounded-2xl p-6 md:p-8 text-center shadow-sm border ${
              resultado.isAbusivo
                ? "bg-red-50 border-red-200"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                resultado.isAbusivo ? "bg-red-100" : "bg-emerald-100"
              }`}
            >
              {resultado.isAbusivo ? (
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <h3
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                resultado.isAbusivo ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {resultado.isAbusivo
                ? "Possíveis juros abusivos detectados"
                : "Taxa dentro da média"}
            </h3>
            <p
              className={`text-lg ${
                resultado.isAbusivo ? "text-red-600" : "text-emerald-600"
              }`}
            >
              Sua taxa está{" "}
              <strong>
                {Math.abs(resultado.diferencaPercentual).toFixed(1)}%{" "}
                {resultado.diferencaPercentual > 0 ? "acima" : "abaixo"}
              </strong>{" "}
              da média do Banco Central para {anoContrato}
            </p>
          </div>

          {/* Comparativo lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-4">
                Seu Contrato
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#64748B]">Taxa mensal</p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {taxaContNum.toFixed(2)}% a.m.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Parcela calculada</p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {formatCurrency(resultado.parcelaContrato)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Total pago</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(resultado.totalContrato)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Juros totais</p>
                  <p className="text-lg font-bold text-red-500">
                    {formatCurrency(resultado.totalContrato - valorFinNum)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
              <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-4">
                Taxa Média do Banco Central
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#64748B]">Taxa mensal</p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {taxaMediaBC.toFixed(2)}% a.m.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Parcela calculada</p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {formatCurrency(resultado.parcelaMedia)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Total pago</p>
                  <p className="text-xl font-bold text-emerald-600">
                    {formatCurrency(resultado.totalMediaBC)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B]">Juros totais</p>
                  <p className="text-lg font-bold text-emerald-500">
                    {formatCurrency(resultado.totalMediaBC - valorFinNum)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Economia potencial */}
          {resultado.economia > 0 && (
            <div className="bg-[#0F172A] rounded-2xl p-6 md:p-8 text-center">
              <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold mb-2">
                Economia potencial com ação revisional
              </p>
              <p className="text-3xl md:text-4xl font-bold text-[#FF4D30]">
                {formatCurrency(resultado.economia)}
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Diferença entre o total pago no seu contrato e o total com a
                taxa média do Banco Central
              </p>
            </div>
          )}

          {/* Orientações */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">
              {resultado.isAbusivo
                ? "Como proceder diante de juros abusivos"
                : "Orientações sobre o seu contrato"}
            </h3>
            {resultado.isAbusivo ? (
              <div className="space-y-4 text-[#475569] text-sm leading-relaxed">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FF4D30] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <p>
                    <strong>Reúna a documentação:</strong> separe o contrato de
                    financiamento, comprovantes de pagamento das parcelas e
                    extratos bancários.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FF4D30] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <p>
                    <strong>Consulte um advogado especialista:</strong> procure
                    um profissional com experiência em direito do consumidor e
                    revisão contratual.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FF4D30] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <p>
                    <strong>Ação revisional de contrato:</strong> é possível
                    entrar com uma ação judicial para revisar as cláusulas
                    abusivas e reduzir os juros ao patamar praticado pelo
                    mercado.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FF4D30] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <p>
                    <strong>Negocie diretamente com o banco:</strong> antes de
                    recorrer à Justiça, tente uma renegociação com a
                    instituição financeira apresentando os dados comparativos.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FF4D30] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <p>
                    <strong>Registre reclamação no Banco Central:</strong> acesse
                    o site do Banco Central para registrar a reclamação formal
                    contra a instituição financeira.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-[#475569] text-sm leading-relaxed">
                <p>
                  Sua taxa de juros está dentro da faixa considerada razoável
                  pelo mercado, com base na média praticada no período do seu
                  contrato.
                </p>
                <p>
                  Mesmo assim, vale a pena acompanhar as taxas de juros do
                  mercado. Se houver queda significativa, pode ser vantajoso
                  buscar uma portabilidade de crédito para outra instituição
                  financeira com condições melhores.
                </p>
                <p>
                  Considere também a possibilidade de antecipar parcelas para
                  reduzir o custo total do financiamento, já que os juros
                  incidem sobre o saldo devedor restante.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
