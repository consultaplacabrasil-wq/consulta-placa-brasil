"use client";

import { useState } from "react";

type TipoVeiculo = "automovel" | "motocicleta" | "caminhao" | "onibus";

const VALORES_SPVAT: Record<TipoVeiculo, { label: string; valor: number }> = {
  automovel: { label: "Automóvel", valor: 52.62 },
  motocicleta: { label: "Motocicleta", valor: 293.48 },
  caminhao: { label: "Caminhão", valor: 52.62 },
  onibus: { label: "Ônibus / Micro-ônibus", valor: 196.99 },
};

const COBERTURAS = [
  { descricao: "Morte", valor: "R$ 13.500,00" },
  { descricao: "Invalidez permanente", valor: "Até R$ 13.500,00" },
  { descricao: "Despesas médicas e suplementares", valor: "Até R$ 2.700,00" },
];

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CalculadoraDPVAT() {
  const [tipoVeiculo, setTipoVeiculo] = useState<TipoVeiculo>("automovel");
  const [anoVeiculo, setAnoVeiculo] = useState("");
  const [resultado, setResultado] = useState<{
    valor: number;
    tipo: string;
  } | null>(null);
  const [erro, setErro] = useState("");

  const anoAtual = new Date().getFullYear();

  function calcular() {
    if (!anoVeiculo) return;
    const ano = parseInt(anoVeiculo, 10);
    if (isNaN(ano) || ano < 1900 || ano > anoAtual + 1) {
      setErro(`Informe um ano válido entre 1900 e ${anoAtual + 1}.`);
      return;
    }
    setErro("");

    const info = VALORES_SPVAT[tipoVeiculo];
    setResultado({
      valor: info.valor,
      tipo: info.label,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Info box DPVAT → SPVAT */}
      <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Atenção:</strong> O DPVAT foi substituído pelo SPVAT (Seguro Obrigatório para
          Proteção de Vítimas de Acidentes de Trânsito) em 2024. A cobrança é feita junto com o
          licenciamento anual do veículo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de veículo */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de veículo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(VALORES_SPVAT) as TipoVeiculo[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTipoVeiculo(key)}
                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                  tipoVeiculo === key
                    ? "bg-[#FF4D30] text-white border-[#FF4D30] shadow-sm"
                    : "bg-white text-[#64748B] border-gray-200 hover:border-[#FF4D30]/40"
                }`}
              >
                {VALORES_SPVAT[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Ano do veículo */}
        <div className="md:col-span-2">
          <label
            htmlFor="ano-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Ano do veículo
          </label>
          <input
            id="ano-veiculo"
            type="number"
            inputMode="numeric"
            min="1900"
            max={anoAtual + 1}
            placeholder={`Ex: ${anoAtual}`}
            value={anoVeiculo}
            onChange={(e) => setAnoVeiculo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
          />
        </div>
      </div>

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!anoVeiculo}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular SPVAT / DPVAT 2026
      </button>

      {/* Erro de validação */}
      {erro && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Valor estimado */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
              Valor estimado do SPVAT 2026
            </h3>
            <p className="text-4xl font-bold text-[#0F172A]">
              {formatarMoeda(resultado.valor)}
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              Categoria: <strong>{resultado.tipo}</strong> — Valor anual aproximado
            </p>
          </div>

          {/* Coberturas incluídas */}
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-800 mb-3">
              Coberturas incluídas no SPVAT
            </h4>
            <div className="space-y-2">
              {COBERTURAS.map((cobertura, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-blue-700">{cobertura.descricao}</span>
                  <span className="font-semibold text-blue-900">{cobertura.valor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Como pagar */}
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <h4 className="text-sm font-semibold text-green-800 mb-2">
              Como pagar o SPVAT?
            </h4>
            <p className="text-sm text-green-700">
              O valor do SPVAT é cobrado automaticamente junto com o licenciamento anual do veículo
              (CRLV). Ao pagar o IPVA e o licenciamento, o seguro obrigatório já está incluso.
              Não é necessário fazer pagamento separado.
            </p>
          </div>

          {/* Diferença DPVAT vs SPVAT */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
            <h4 className="text-sm font-semibold text-[#0F172A] mb-2">
              Diferença entre DPVAT e SPVAT
            </h4>
            <div className="space-y-3 text-sm text-[#475569]">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-14 font-bold text-[#FF4D30]">DPVAT</span>
                <span>
                  Seguro de Danos Pessoais causados por Veículos Automotores de Via Terrestre.
                  Vigorou até 2023, administrado por consórcio de seguradoras privadas.
                </span>
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-14 font-bold text-[#FF4D30]">SPVAT</span>
                <span>
                  Seguro Obrigatório para Proteção de Vítimas de Acidentes de Trânsito. Entrou em
                  vigor em 2024, administrado pela Caixa Econômica Federal. Mantém as mesmas
                  coberturas com gestão pública.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
