"use client";

import { useState, useMemo } from "react";
import { Fuel, MapPin, DollarSign, Users, ArrowLeftRight, GaugeCircle } from "lucide-react";

export default function CalculadoraCombustivel() {
  const [distancia, setDistancia] = useState<string>("500");
  const [consumo, setConsumo] = useState<string>("12");
  const [precoCombustivel, setPrecoCombustivel] = useState<string>("5.89");
  const [passageiros, setPassageiros] = useState<string>("1");
  const [idaEVolta, setIdaEVolta] = useState<boolean>(false);

  const resultado = useMemo(() => {
    const dist = parseFloat(distancia) || 0;
    const cons = parseFloat(consumo) || 0;
    const preco = parseFloat(precoCombustivel) || 0;
    const pass = parseInt(passageiros) || 1;

    if (dist <= 0 || cons <= 0 || preco <= 0) return null;

    const distanciaTotal = idaEVolta ? dist * 2 : dist;
    const litrosNecessarios = distanciaTotal / cons;
    const custoTotal = litrosNecessarios * preco;
    const custoPorKm = preco / cons;
    const custoPorPassageiro = custoTotal / pass;
    const tanqueMedio = 50;
    const paradasAbastecimento = Math.ceil(litrosNecessarios / tanqueMedio) - 1;

    return {
      distanciaTotal,
      litrosNecessarios,
      custoTotal,
      custoPorKm,
      custoPorPassageiro,
      passageiros: pass,
      paradasAbastecimento: paradasAbastecimento < 0 ? 0 : paradasAbastecimento,
      tanquesCompletos: litrosNecessarios / tanqueMedio,
    };
  }, [distancia, consumo, precoCombustivel, passageiros, idaEVolta]);

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
          <Fuel className="w-5 h-5 text-[#FF4D30]" />
          Dados da viagem
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="distancia"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Distância da viagem (km)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
                km
              </span>
              <input
                id="distancia"
                type="number"
                step="1"
                min="0"
                value={distancia}
                onChange={(e) => setDistancia(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
                placeholder="500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="consumo"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Consumo médio do veículo (km/l)
            </label>
            <input
              id="consumo"
              type="number"
              step="0.1"
              min="0"
              value={consumo}
              onChange={(e) => setConsumo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
              placeholder="12"
            />
          </div>

          <div>
            <label
              htmlFor="preco-combustivel"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Preço do combustível (R$/litro)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
                R$
              </span>
              <input
                id="preco-combustivel"
                type="number"
                step="0.01"
                min="0"
                value={precoCombustivel}
                onChange={(e) => setPrecoCombustivel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
                placeholder="5.89"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="passageiros"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Número de passageiros{" "}
              <span className="text-[#94A3B8] font-normal">(opcional, para dividir)</span>
            </label>
            <input
              id="passageiros"
              type="number"
              step="1"
              min="1"
              value={passageiros}
              onChange={(e) => setPassageiros(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
              placeholder="1"
            />
          </div>
        </div>

        {/* Toggle ida e volta */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIdaEVolta(!idaEVolta)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              idaEVolta ? "bg-[#FF4D30]" : "bg-gray-200"
            }`}
            aria-pressed={idaEVolta}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                idaEVolta ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-semibold text-[#0F172A] flex items-center gap-1.5">
            <ArrowLeftRight className="w-4 h-4 text-[#FF4D30]" />
            Ida e volta (dobrar distância)
          </span>
        </div>
      </div>

      {/* Resultado */}
      {resultado && (
        <>
          {/* Card principal de custo */}
          <div className="rounded-2xl p-8 text-center text-white shadow-lg bg-gradient-to-br from-[#FF4D30] to-red-700">
            <div className="flex items-center justify-center gap-3 mb-3">
              <DollarSign className="w-8 h-8" />
              <span className="text-lg font-medium opacity-90">Custo total da viagem</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
              {formatBRL(resultado.custoTotal)}
            </h3>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              {resultado.distanciaTotal.toLocaleString("pt-BR")} km
              {idaEVolta ? " (ida e volta)" : " (somente ida)"} —{" "}
              {resultado.litrosNecessarios.toFixed(1)} litros de combustível
            </p>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Litros necessários
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {resultado.litrosNecessarios.toFixed(1)} L
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <GaugeCircle className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Custo por km
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatBRL(resultado.custoPorKm)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Distância total
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {resultado.distanciaTotal.toLocaleString("pt-BR")} km
              </p>
              {idaEVolta && (
                <p className="text-xs text-[#94A3B8] mt-1">Ida e volta incluídas</p>
              )}
            </div>

            {resultado.passageiros > 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                    Custo por passageiro
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formatBRL(resultado.custoPorPassageiro)}
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Dividido entre {resultado.passageiros} passageiros
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Paradas para abastecer
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {resultado.paradasAbastecimento}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Considerando tanque médio de 50 litros
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Custo total
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatBRL(resultado.custoTotal)}
              </p>
            </div>
          </div>

          {/* Resumo visual */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-sm text-[#94A3B8] mb-1">Proporção do tanque utilizada</p>
            <p className="text-4xl font-extrabold text-[#0F172A]">
              {resultado.tanquesCompletos.toFixed(1)}x
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              {resultado.tanquesCompletos <= 1
                ? "A viagem pode ser feita com um único tanque"
                : `Você precisará de aproximadamente ${Math.ceil(resultado.tanquesCompletos)} tanques completos`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
