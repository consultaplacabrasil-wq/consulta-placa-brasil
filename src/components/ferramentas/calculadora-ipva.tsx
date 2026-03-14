"use client";

import { useState } from "react";

const ALIQUOTAS_IPVA: Record<string, { carro: number; moto: number; caminhao: number }> = {
  AC: { carro: 2.0, moto: 1.0, caminhao: 1.0 },
  AL: { carro: 3.0, moto: 2.75, caminhao: 1.0 },
  AM: { carro: 3.0, moto: 2.0, caminhao: 1.5 },
  AP: { carro: 3.0, moto: 1.5, caminhao: 1.5 },
  BA: { carro: 2.5, moto: 2.5, caminhao: 1.0 },
  CE: { carro: 3.0, moto: 2.0, caminhao: 1.0 },
  DF: { carro: 3.5, moto: 2.0, caminhao: 1.0 },
  ES: { carro: 2.0, moto: 1.0, caminhao: 1.0 },
  GO: { carro: 3.75, moto: 3.0, caminhao: 1.25 },
  MA: { carro: 2.5, moto: 2.0, caminhao: 1.0 },
  MG: { carro: 4.0, moto: 2.0, caminhao: 1.0 },
  MS: { carro: 3.5, moto: 2.0, caminhao: 1.5 },
  MT: { carro: 3.0, moto: 1.0, caminhao: 1.5 },
  PA: { carro: 2.5, moto: 1.0, caminhao: 1.0 },
  PB: { carro: 2.5, moto: 2.5, caminhao: 1.0 },
  PE: { carro: 3.0, moto: 2.0, caminhao: 1.0 },
  PI: { carro: 2.5, moto: 2.0, caminhao: 1.0 },
  PR: { carro: 3.5, moto: 3.5, caminhao: 1.0 },
  RJ: { carro: 4.0, moto: 2.0, caminhao: 1.0 },
  RN: { carro: 3.0, moto: 2.0, caminhao: 1.0 },
  RO: { carro: 3.0, moto: 2.0, caminhao: 1.0 },
  RR: { carro: 3.0, moto: 2.0, caminhao: 1.5 },
  RS: { carro: 3.0, moto: 2.0, caminhao: 1.0 },
  SC: { carro: 2.0, moto: 1.0, caminhao: 1.0 },
  SE: { carro: 2.5, moto: 2.0, caminhao: 1.0 },
  SP: { carro: 4.0, moto: 2.0, caminhao: 1.5 },
  TO: { carro: 2.0, moto: 2.0, caminhao: 1.0 },
};

const ESTADOS = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "PR", nome: "Paraná" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "TO", nome: "Tocantins" },
];

type TipoVeiculo = "carro" | "moto" | "caminhao";

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CalculadoraIPVA() {
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState<TipoVeiculo>("carro");
  const [resultado, setResultado] = useState<{
    ipva: number;
    aliquota: number;
    descontoVista: number;
    parcelas: number[];
  } | null>(null);

  const DESCONTO_VISTA = 0.03;

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
    if (!valor || !estado) return;

    const aliquota = ALIQUOTAS_IPVA[estado]?.[tipo] ?? 0;
    const ipva = valor * (aliquota / 100);
    const descontoVista = ipva * (1 - DESCONTO_VISTA);

    const parcelas: number[] = [];
    for (let i = 1; i <= 5; i++) {
      parcelas.push(ipva / i);
    }

    setResultado({ ipva, aliquota, descontoVista, parcelas });
  }

  const tiposVeiculo: { value: TipoVeiculo; label: string }[] = [
    { value: "carro", label: "Carro / Utilitário" },
    { value: "moto", label: "Motocicleta" },
    { value: "caminhao", label: "Caminhão / Ônibus" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Valor do veículo */}
        <div className="md:col-span-2">
          <label
            htmlFor="valor-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Valor do veículo (FIPE)
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

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Estado (UF)
          </label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            <option value="">Selecione o estado</option>
            {ESTADOS.map((e) => (
              <option key={e.uf} value={e.uf}>
                {e.nome} ({e.uf})
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
        disabled={!valorVeiculo || !estado}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular IPVA 2026
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
              Valor do IPVA 2026
            </h3>
            <p className="text-4xl font-bold text-[#0F172A]">
              {formatarMoeda(resultado.ipva)}
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              Alíquota aplicada: <strong>{resultado.aliquota.toFixed(2)}%</strong> (
              {ESTADOS.find((e) => e.uf === estado)?.nome})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Desconto à vista */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h4 className="text-sm font-semibold text-green-800 mb-1">
                À vista (desconto de {(DESCONTO_VISTA * 100).toFixed(0)}%)
              </h4>
              <p className="text-2xl font-bold text-green-700">
                {formatarMoeda(resultado.descontoVista)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Economia de {formatarMoeda(resultado.ipva - resultado.descontoVista)}
              </p>
            </div>

            {/* Parcelamento */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">
                Parcelamento (até 5x)
              </h4>
              <div className="space-y-1">
                {resultado.parcelas.map((parcela, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-blue-700">{i + 1}x de</span>
                    <span className="font-semibold text-blue-900">
                      {formatarMoeda(parcela)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
