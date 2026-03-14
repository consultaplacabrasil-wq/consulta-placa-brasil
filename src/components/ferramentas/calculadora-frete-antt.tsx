"use client";

import { useState } from "react";

const EIXOS_OPTIONS = [
  { value: 2, label: "2 eixos" },
  { value: 3, label: "3 eixos" },
  { value: 4, label: "4 eixos" },
  { value: 5, label: "5 eixos" },
  { value: 6, label: "6 eixos" },
  { value: 7, label: "7 eixos" },
  { value: 9, label: "9 eixos" },
];

const TIPOS_CARGA = [
  { value: "geral", label: "Carga Geral" },
  { value: "granel_solido", label: "Granel Sólido" },
  { value: "granel_liquido", label: "Granel Líquido" },
  { value: "frigorificado", label: "Frigorificado" },
  { value: "perigosa", label: "Carga Perigosa" },
];

// Taxa ANTT (R$ por tonelada x km)
const TAXA_ANTT = 0.2055;

// Pedágio por eixo x km
const PEDAGIO_POR_EIXO_KM = 0.0110;

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarDecimal(valor: number, casas: number = 4): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

interface ResultadoCalculo {
  freteMinimo: number;
  valorPorTonKm: number;
  parcelaPedagio: number;
  totalComPedagio: number;
  peso: number;
  distancia: number;
  eixos: number;
  tipoCarga: string;
}

export default function CalculadoraFreteAntt() {
  const [eixos, setEixos] = useState<number>(2);
  const [tipoCarga, setTipoCarga] = useState("geral");
  const [peso, setPeso] = useState("");
  const [distancia, setDistancia] = useState("");
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [erro, setErro] = useState("");

  function handleNumericInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) {
    const raw = e.target.value.replace(/[^0-9.,]/g, "");
    setter(raw);
  }

  function parseNumero(valor: string): number {
    if (!valor) return 0;
    return parseFloat(valor.replace(/\./g, "").replace(",", "."));
  }

  function calcular() {
    const pesoNum = parseNumero(peso);
    const distanciaNum = parseNumero(distancia);

    if (pesoNum <= 0 || distanciaNum <= 0) {
      setErro("Informe um peso e uma distância maiores que zero.");
      return;
    }
    setErro("");

    const freteMinimo = pesoNum * distanciaNum * TAXA_ANTT;
    const valorPorTonKm = TAXA_ANTT;
    const parcelaPedagio = distanciaNum * eixos * PEDAGIO_POR_EIXO_KM;
    const totalComPedagio = freteMinimo + parcelaPedagio;

    const tipoLabel =
      TIPOS_CARGA.find((t) => t.value === tipoCarga)?.label ?? tipoCarga;

    setResultado({
      freteMinimo,
      valorPorTonKm,
      parcelaPedagio,
      totalComPedagio,
      peso: pesoNum,
      distancia: distanciaNum,
      eixos,
      tipoCarga: tipoLabel,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Número de eixos */}
        <div>
          <label
            htmlFor="eixos"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Número de eixos
          </label>
          <select
            id="eixos"
            value={eixos}
            onChange={(e) => setEixos(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            {EIXOS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de carga */}
        <div>
          <label
            htmlFor="tipo-carga"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Tipo de carga
          </label>
          <select
            id="tipo-carga"
            value={tipoCarga}
            onChange={(e) => setTipoCarga(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            {TIPOS_CARGA.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Peso da carga */}
        <div>
          <label
            htmlFor="peso"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Peso da carga (toneladas)
          </label>
          <div className="relative">
            <input
              id="peso"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 25"
              value={peso}
              onChange={(e) => handleNumericInput(e, setPeso)}
              className="w-full px-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm font-medium">
              ton
            </span>
          </div>
        </div>

        {/* Distância */}
        <div>
          <label
            htmlFor="distancia"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Distância (km)
          </label>
          <div className="relative">
            <input
              id="distancia"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 500"
              value={distancia}
              onChange={(e) => handleNumericInput(e, setDistancia)}
              className="w-full px-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm font-medium">
              km
            </span>
          </div>
        </div>
      </div>

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!peso || !distancia}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular frete mínimo ANTT
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
          {/* Total estimado */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
              Total com pedágio
            </h3>
            <p className="text-4xl font-bold text-[#0F172A]">
              {formatarMoeda(resultado.totalComPedagio)}
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              {resultado.tipoCarga} — {resultado.peso} ton x{" "}
              {resultado.distancia} km — {resultado.eixos} eixos
            </p>
          </div>

          {/* Tabela de detalhamento */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0F172A] text-white">
                  <th className="text-left px-5 py-3 text-sm font-semibold">
                    Item
                  </th>
                  <th className="text-right px-5 py-3 text-sm font-semibold">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-[#475569]">
                    Taxa ANTT (R$/ton x km)
                  </td>
                  <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                    R$ {formatarDecimal(resultado.valorPorTonKm)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-[#475569]">
                    Valor mínimo de frete
                  </td>
                  <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                    {formatarMoeda(resultado.freteMinimo)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-[#475569]">
                    Parcela de pedágio ({resultado.eixos} eixos x{" "}
                    {resultado.distancia} km x R${" "}
                    {formatarDecimal(PEDAGIO_POR_EIXO_KM)})
                  </td>
                  <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                    {formatarMoeda(resultado.parcelaPedagio)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#F8FAFC] border-t-2 border-[#FF4D30]">
                  <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">
                    Total com pedágio
                  </td>
                  <td className="px-5 py-4 text-lg font-bold text-[#FF4D30] text-right">
                    {formatarMoeda(resultado.totalComPedagio)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Aviso */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Atenção:</strong> Os valores apresentados são estimativas
              baseadas na tabela de pisos mínimos de frete da ANTT (Agência
              Nacional de Transportes Terrestres). O frete real pode variar
              conforme negociação, condições da rota, sazonalidade e custos
              adicionais como seguros e taxas de carga/descarga. Consulte a
              resolução ANTT vigente para valores atualizados.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
