"use client";

import { useState } from "react";

type TipoOperacao = "pf" | "pj" | "leasing";

const TIPOS_OPERACAO: Record<TipoOperacao, { label: string; descricao: string }> = {
  pf: { label: "Financiamento PF", descricao: "Pessoa Física" },
  pj: { label: "Financiamento PJ", descricao: "Pessoa Jurídica" },
  leasing: { label: "Leasing", descricao: "Arrendamento Mercantil" },
};

const ALIQUOTAS = {
  pf: { fixa: 0.0038, diaria: 0.000082, teto: 0.03 },
  pj: { fixa: 0.0038, diaria: 0.000041, teto: 0.0188 },
};

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarPercentual(valor: number): string {
  return (valor * 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }) + "%";
}

interface Resultado {
  iofFixo: number;
  iofDiario: number;
  iofTotal: number;
  iofPercentual: number;
  iofPorParcela: number;
  foiLimitado: boolean;
}

export default function CalculadoraIOF() {
  const [valorFinanciado, setValorFinanciado] = useState("");
  const [prazoMeses, setPrazoMeses] = useState("");
  const [tipoOperacao, setTipoOperacao] = useState<TipoOperacao>("pf");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState("");

  function parseMoeda(valor: string): number {
    return parseFloat(valor.replace(/\./g, "").replace(",", ".")) || 0;
  }

  function formatarInput(valor: string): string {
    const numeros = valor.replace(/\D/g, "");
    if (!numeros) return "";
    const numero = parseInt(numeros, 10) / 100;
    return numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function calcular() {
    const valor = parseMoeda(valorFinanciado);
    const prazo = parseInt(prazoMeses, 10);

    if (!valor || valor <= 0) {
      setErro("Informe um valor financiado válido.");
      setResultado(null);
      return;
    }
    if (!prazo || prazo <= 0 || prazo > 600) {
      setErro("Informe um prazo válido entre 1 e 600 meses.");
      setResultado(null);
      return;
    }

    setErro("");

    if (tipoOperacao === "leasing") {
      setResultado({
        iofFixo: 0,
        iofDiario: 0,
        iofTotal: 0,
        iofPercentual: 0,
        iofPorParcela: 0,
        foiLimitado: false,
      });
      return;
    }

    const aliquota = ALIQUOTAS[tipoOperacao];
    const dias = prazo * 30;

    const iofFixo = valor * aliquota.fixa;
    let iofDiario = valor * aliquota.diaria * dias;
    let iofTotal = iofFixo + iofDiario;
    const tetoValor = valor * aliquota.teto;
    let foiLimitado = false;

    if (iofTotal > tetoValor) {
      iofTotal = tetoValor;
      iofDiario = tetoValor - iofFixo;
      foiLimitado = true;
    }

    const iofPercentual = iofTotal / valor;
    const iofPorParcela = iofTotal / prazo;

    setResultado({
      iofFixo,
      iofDiario,
      iofTotal,
      iofPercentual,
      iofPorParcela,
      foiLimitado,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Info box */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>O que é o IOF?</strong> O Imposto sobre Operações Financeiras incide sobre
          operações de crédito, incluindo financiamentos de veículos. A alíquota varia conforme
          o tipo de pessoa (PF ou PJ) e o prazo da operação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Tipo de operação */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de operação
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(TIPOS_OPERACAO) as TipoOperacao[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTipoOperacao(key);
                  setResultado(null);
                }}
                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                  tipoOperacao === key
                    ? "bg-[#FF4D30] text-white border-[#FF4D30] shadow-sm"
                    : "bg-white text-[#64748B] border-gray-200 hover:border-[#FF4D30]/40"
                }`}
              >
                <span className="block">{TIPOS_OPERACAO[key].label}</span>
                <span className="block text-xs mt-0.5 opacity-75">
                  {TIPOS_OPERACAO[key].descricao}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Valor financiado */}
        <div>
          <label
            htmlFor="valor-financiado"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Valor financiado (R$)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="valor-financiado"
              type="text"
              inputMode="numeric"
              placeholder="50.000,00"
              value={valorFinanciado}
              onChange={(e) => setValorFinanciado(formatarInput(e.target.value))}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
            />
          </div>
        </div>

        {/* Prazo */}
        <div>
          <label
            htmlFor="prazo-meses"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Prazo (meses)
          </label>
          <input
            id="prazo-meses"
            type="number"
            inputMode="numeric"
            min="1"
            max="600"
            placeholder="Ex: 48"
            value={prazoMeses}
            onChange={(e) => setPrazoMeses(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
          />
        </div>
      </div>

      {/* Alíquotas vigentes */}
      {tipoOperacao !== "leasing" && (
        <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
          <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
            Alíquotas vigentes para {tipoOperacao === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
          </h4>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-[#64748B]">Fixa</span>
              <p className="font-bold text-[#0F172A]">0,38%</p>
            </div>
            <div>
              <span className="text-[#64748B]">Diária</span>
              <p className="font-bold text-[#0F172A]">
                {tipoOperacao === "pf" ? "0,0082%" : "0,0041%"}
              </p>
            </div>
            <div>
              <span className="text-[#64748B]">Teto máximo</span>
              <p className="font-bold text-[#0F172A]">
                {tipoOperacao === "pf" ? "3,00%" : "1,88%"}
              </p>
            </div>
          </div>
        </div>
      )}

      {tipoOperacao === "leasing" && (
        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Leasing é isento de IOF.</strong> O arrendamento mercantil (leasing) não é
            considerado operação de crédito para fins de IOF, portanto não há incidência do
            imposto nessa modalidade. Essa é uma das vantagens do leasing em relação ao
            financiamento tradicional.
          </p>
        </div>
      )}

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!valorFinanciado || !prazoMeses}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular IOF
      </button>

      {/* Erro */}
      {erro && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-4">
          {tipoOperacao === "leasing" ? (
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center">
              <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                IOF no Leasing
              </h3>
              <p className="text-4xl font-bold text-emerald-700">Isento</p>
              <p className="text-sm text-emerald-600 mt-2">
                O leasing (arrendamento mercantil) é isento de IOF. Você economiza em relação
                ao financiamento tradicional.
              </p>
            </div>
          ) : (
            <>
              {/* IOF Total */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  IOF total do financiamento
                </h3>
                <p className="text-4xl font-bold text-[#0F172A]">
                  {formatarMoeda(resultado.iofTotal)}
                </p>
                {resultado.foiLimitado && (
                  <p className="text-xs text-amber-600 mt-1 font-medium">
                    Valor limitado pelo teto máximo de {tipoOperacao === "pf" ? "3,00%" : "1,88%"}
                  </p>
                )}
              </div>

              {/* Cards detalhados */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-[#64748B] font-medium">IOF Fixo</span>
                  <p className="text-lg font-bold text-[#0F172A] mt-1">
                    {formatarMoeda(resultado.iofFixo)}
                  </p>
                  <span className="text-xs text-[#94A3B8]">Alíquota de 0,38%</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-[#64748B] font-medium">IOF Diário</span>
                  <p className="text-lg font-bold text-[#0F172A] mt-1">
                    {formatarMoeda(resultado.iofDiario)}
                  </p>
                  <span className="text-xs text-[#94A3B8]">
                    {tipoOperacao === "pf" ? "0,0082%" : "0,0041%"}/dia
                  </span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-[#64748B] font-medium">IOF como % do valor</span>
                  <p className="text-lg font-bold text-[#FF4D30] mt-1">
                    {formatarPercentual(resultado.iofPercentual)}
                  </p>
                  <span className="text-xs text-[#94A3B8]">Do valor financiado</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <span className="text-xs text-[#64748B] font-medium">IOF por parcela</span>
                  <p className="text-lg font-bold text-[#0F172A] mt-1">
                    {formatarMoeda(resultado.iofPorParcela)}
                  </p>
                  <span className="text-xs text-[#94A3B8]">Diluído em {prazoMeses}x</span>
                </div>
              </div>

              {/* Explicação dos componentes */}
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-3">
                  Como o IOF é calculado?
                </h4>
                <div className="space-y-3 text-sm text-[#475569]">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-20 font-bold text-[#FF4D30]">Fixo</span>
                    <span>
                      Alíquota fixa de 0,38% cobrada uma única vez sobre o valor total financiado,
                      independentemente do prazo.
                    </span>
                  </div>
                  <div className="border-t border-gray-200" />
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-20 font-bold text-[#FF4D30]">Diário</span>
                    <span>
                      Alíquota diária de {tipoOperacao === "pf" ? "0,0082%" : "0,0041%"} multiplicada
                      pelo número de dias do financiamento. Quanto maior o prazo, maior o IOF diário.
                    </span>
                  </div>
                  <div className="border-t border-gray-200" />
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-20 font-bold text-[#FF4D30]">Teto</span>
                    <span>
                      A soma do IOF fixo e diário é limitada ao teto de{" "}
                      {tipoOperacao === "pf" ? "3,00%" : "1,88%"} do valor financiado. Mesmo em
                      prazos longos, o IOF nunca ultrapassa esse limite.
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
