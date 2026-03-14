"use client";

import { useState } from "react";

type TipoVeiculo = "carro" | "moto" | "caminhao";

const TAXAS_DEPRECIACAO = [0.20, 0.15, 0.12, 0.10, 0.07];

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarPorcentagem(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + "%";
}

const FATOR_TIPO: Record<TipoVeiculo, number> = {
  carro: 1.0,
  moto: 1.1,
  caminhao: 0.85,
};

interface ResultadoDepreciacao {
  projecoes: {
    ano: number;
    taxa: number;
    valorInicio: number;
    valorFim: number;
    perdaAnual: number;
    depreciacaoAcumulada: number;
  }[];
  valorEstimadoAtual: number;
  idadeVeiculo: number;
  depreciacaoTotalPercent: number;
  depreciacaoTotalReais: number;
}

export default function CalculadoraDepreciacao() {
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [anoVeiculo, setAnoVeiculo] = useState("");
  const [tipo, setTipo] = useState<TipoVeiculo>("carro");
  const [resultado, setResultado] = useState<ResultadoDepreciacao | null>(null);

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setValorVeiculo("");
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setValorVeiculo(
      num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
  }

  function getValorNumerico(): number {
    if (!valorVeiculo) return 0;
    return parseFloat(valorVeiculo.replace(/\./g, "").replace(",", "."));
  }

  function calcular() {
    const valor = getValorNumerico();
    const ano = parseInt(anoVeiculo, 10);
    if (!valor || !ano) return;

    const anoAtual = new Date().getFullYear();
    const idadeVeiculo = anoAtual - ano;
    const fator = FATOR_TIPO[tipo];

    // Calcular valor estimado atual com base na idade
    let valorEstimadoAtual = valor;
    if (idadeVeiculo > 0) {
      // Retroagir depreciação para encontrar valor atual estimado a partir do valor informado
      // Aqui assumimos que o valor informado é o valor ATUAL do veículo
      valorEstimadoAtual = valor;
    }

    // Projetar depreciação para os próximos 5 anos
    const projecoes: ResultadoDepreciacao["projecoes"] = [];
    let valorAtual = valor;
    let depreciacaoAcumuladaTotal = 0;

    for (let i = 0; i < 5; i++) {
      const idadeFutura = idadeVeiculo + i + 1;
      // Usar taxa baseada na idade futura do veículo, ajustada pelo tipo
      let taxaBase: number;
      if (idadeFutura <= 1) {
        taxaBase = TAXAS_DEPRECIACAO[0];
      } else if (idadeFutura <= 2) {
        taxaBase = TAXAS_DEPRECIACAO[1];
      } else if (idadeFutura <= 3) {
        taxaBase = TAXAS_DEPRECIACAO[2];
      } else if (idadeFutura <= 4) {
        taxaBase = TAXAS_DEPRECIACAO[3];
      } else {
        taxaBase = TAXAS_DEPRECIACAO[4];
      }

      const taxaAjustada = taxaBase * fator;
      const perdaAnual = valorAtual * taxaAjustada;
      const valorFim = valorAtual - perdaAnual;
      depreciacaoAcumuladaTotal += perdaAnual;

      projecoes.push({
        ano: anoAtual + i + 1,
        taxa: taxaAjustada * 100,
        valorInicio: valorAtual,
        valorFim,
        perdaAnual,
        depreciacaoAcumulada: (depreciacaoAcumuladaTotal / valor) * 100,
      });

      valorAtual = valorFim;
    }

    const depreciacaoTotalReais = valor - valorAtual;
    const depreciacaoTotalPercent = (depreciacaoTotalReais / valor) * 100;

    setResultado({
      projecoes,
      valorEstimadoAtual: valor,
      idadeVeiculo,
      depreciacaoTotalPercent,
      depreciacaoTotalReais,
    });
  }

  const tiposVeiculo: { value: TipoVeiculo; label: string }[] = [
    { value: "carro", label: "Carro / SUV" },
    { value: "moto", label: "Motocicleta" },
    { value: "caminhao", label: "Caminhão" },
  ];

  const anoAtual = new Date().getFullYear();
  const anosDisponiveis: number[] = [];
  for (let a = anoAtual + 1; a >= anoAtual - 30; a--) {
    anosDisponiveis.push(a);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Valor do veículo */}
        <div className="md:col-span-2">
          <label
            htmlFor="valor-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Valor atual do veículo (R$)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="valor-veiculo"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={valorVeiculo}
              onChange={handleValorChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
            />
          </div>
        </div>

        {/* Ano do veículo */}
        <div>
          <label htmlFor="ano-veiculo" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Ano do veículo
          </label>
          <select
            id="ano-veiculo"
            value={anoVeiculo}
            onChange={(e) => setAnoVeiculo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            <option value="">Selecione o ano</option>
            {anosDisponiveis.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de veículo */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de veículo
          </label>
          <div className="grid grid-cols-3 gap-2">
            {tiposVeiculo.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTipo(t.value)}
                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                  tipo === t.value
                    ? "bg-[#FF4D30] text-white border-[#FF4D30] shadow-sm"
                    : "bg-white text-[#64748B] border-gray-200 hover:border-[#FF4D30]/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!valorVeiculo || !anoVeiculo}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#e6432a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular Depreciação
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Valor Atual
              </h3>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatarMoeda(resultado.valorEstimadoAtual)}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Veículo com {resultado.idadeVeiculo} {resultado.idadeVeiculo === 1 ? "ano" : "anos"}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 border border-red-100 text-center">
              <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wide mb-1">
                Perda em 5 Anos
              </h3>
              <p className="text-2xl font-bold text-red-700">
                {formatarMoeda(resultado.depreciacaoTotalReais)}
              </p>
              <p className="text-xs text-red-600 mt-1">
                {formatarPorcentagem(resultado.depreciacaoTotalPercent)} do valor atual
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center">
              <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-1">
                Valor em 5 Anos
              </h3>
              <p className="text-2xl font-bold text-blue-700">
                {formatarMoeda(
                  resultado.projecoes[resultado.projecoes.length - 1]?.valorFim ?? 0
                )}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Valor estimado do veículo
              </p>
            </div>
          </div>

          {/* Tabela de projeção */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Projeção de Depreciação — Próximos 5 Anos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    <th className="px-4 py-3 text-left font-semibold">Ano</th>
                    <th className="px-4 py-3 text-right font-semibold">Taxa</th>
                    <th className="px-4 py-3 text-right font-semibold">Valor Início</th>
                    <th className="px-4 py-3 text-right font-semibold">Perda no Ano</th>
                    <th className="px-4 py-3 text-right font-semibold">Valor Final</th>
                    <th className="px-4 py-3 text-right font-semibold">Depr. Acumulada</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.projecoes.map((p, i) => (
                    <tr
                      key={p.ano}
                      className={`border-b border-gray-100 ${
                        i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-[#0F172A]">{p.ano}</td>
                      <td className="px-4 py-3 text-right text-[#64748B]">
                        {formatarPorcentagem(p.taxa)}
                      </td>
                      <td className="px-4 py-3 text-right text-[#475569]">
                        {formatarMoeda(p.valorInicio)}
                      </td>
                      <td className="px-4 py-3 text-right text-red-600 font-medium">
                        -{formatarMoeda(p.perdaAnual)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#0F172A]">
                        {formatarMoeda(p.valorFim)}
                      </td>
                      <td className="px-4 py-3 text-right text-[#64748B]">
                        {formatarPorcentagem(p.depreciacaoAcumulada)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dica */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Dica:</strong> Veículos bem conservados, com baixa quilometragem e revisões
              em dia tendem a depreciar menos que a média do mercado. Cores neutras (branco, prata,
              preto) também ajudam a manter o valor de revenda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
