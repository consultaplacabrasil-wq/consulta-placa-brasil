"use client";

import { useState, useMemo } from "react";
import { Fuel, TrendingDown, TrendingUp, DollarSign, Gauge } from "lucide-react";

export default function CalculadoraFlex() {
  const [precoGasolina, setPrecoGasolina] = useState<string>("5.89");
  const [precoEtanol, setPrecoEtanol] = useState<string>("3.99");
  const [consumoGasolina, setConsumoGasolina] = useState<string>("12");
  const [kmMes, setKmMes] = useState<string>("1000");

  const resultado = useMemo(() => {
    const pg = parseFloat(precoGasolina) || 0;
    const pe = parseFloat(precoEtanol) || 0;
    const cg = parseFloat(consumoGasolina) || 0;
    const km = parseFloat(kmMes) || 1000;

    if (pg <= 0 || pe <= 0 || cg <= 0) return null;

    const consumoEtanol = cg * 0.7;
    const custoPorKmGasolina = pg / cg;
    const custoPorKmEtanol = pe / consumoEtanol;
    const razao = pe / pg;
    const etanolCompensa = razao < 0.7;
    const custoMensalGasolina = custoPorKmGasolina * km;
    const custoMensalEtanol = custoPorKmEtanol * km;
    const economiaMensal = Math.abs(custoMensalGasolina - custoMensalEtanol);
    const economiaAnual = economiaMensal * 12;
    const breakevenEtanol = pg * 0.7;
    const percentualEconomia = etanolCompensa
      ? ((custoMensalGasolina - custoMensalEtanol) / custoMensalGasolina) * 100
      : ((custoMensalEtanol - custoMensalGasolina) / custoMensalEtanol) * 100;

    return {
      etanolCompensa,
      razao,
      custoPorKmGasolina,
      custoPorKmEtanol,
      consumoEtanol,
      custoMensalGasolina,
      custoMensalEtanol,
      economiaMensal,
      economiaAnual,
      breakevenEtanol,
      percentualEconomia,
    };
  }, [precoGasolina, precoEtanol, consumoGasolina, kmMes]);

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const maxCusto = resultado
    ? Math.max(resultado.custoMensalGasolina, resultado.custoMensalEtanol)
    : 1;

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
          <Fuel className="w-5 h-5 text-[#FF4D30]" />
          Informe os preços e o consumo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="preco-gasolina"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Preço da Gasolina (R$/litro)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
                R$
              </span>
              <input
                id="preco-gasolina"
                type="text"
                inputMode="decimal"
                value={precoGasolina}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.,]/g, "");
                  setPrecoGasolina(val);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
                placeholder="5.89"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="preco-etanol"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Preço do Etanol (R$/litro)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
                R$
              </span>
              <input
                id="preco-etanol"
                type="text"
                inputMode="decimal"
                value={precoEtanol}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.,]/g, "");
                  setPrecoEtanol(val);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
                placeholder="3.99"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="consumo-gasolina"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Consumo médio com Gasolina (km/l)
            </label>
            <input
              id="consumo-gasolina"
              type="text"
              inputMode="decimal"
              value={consumoGasolina}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.,]/g, "");
                setConsumoGasolina(val);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
              placeholder="12"
            />
          </div>

          <div>
            <label
              htmlFor="km-mes"
              className="block text-sm font-semibold text-[#0F172A] mb-2"
            >
              Km rodados por mês{" "}
              <span className="text-[#94A3B8] font-normal">(opcional)</span>
            </label>
            <input
              id="km-mes"
              type="text"
              inputMode="numeric"
              value={kmMes}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setKmMes(val);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-all"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      {/* Resultado */}
      {resultado && (
        <>
          {/* Card de recomendação */}
          <div
            className={`rounded-2xl p-8 text-center text-white shadow-lg ${
              resultado.etanolCompensa
                ? "bg-gradient-to-br from-green-500 to-green-700"
                : "bg-gradient-to-br from-[#FF4D30] to-red-700"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              {resultado.etanolCompensa ? (
                <TrendingDown className="w-8 h-8" />
              ) : (
                <TrendingUp className="w-8 h-8" />
              )}
              <span className="text-lg font-medium opacity-90">Recomendação</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
              {resultado.etanolCompensa ? "USE ETANOL" : "USE GASOLINA"}
            </h3>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              {resultado.etanolCompensa
                ? `O etanol está ${(resultado.razao * 100).toFixed(0)}% do preço da gasolina (abaixo de 70%). Você economiza ${formatBRL(resultado.economiaMensal)}/mês.`
                : `O etanol está ${(resultado.razao * 100).toFixed(0)}% do preço da gasolina (acima de 70%). A gasolina é mais vantajosa e você economiza ${formatBRL(resultado.economiaMensal)}/mês.`}
            </p>
          </div>

          {/* Comparação visual */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#0F172A] mb-6">
              Comparação de custos mensais
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#0F172A]">
                    Gasolina
                  </span>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {formatBRL(resultado.custoMensalGasolina)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-5">
                  <div
                    className="bg-[#FF4D30] h-5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(resultado.custoMensalGasolina / maxCusto) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#0F172A]">
                    Etanol
                  </span>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {formatBRL(resultado.custoMensalEtanol)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-5">
                  <div
                    className="bg-green-500 h-5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(resultado.custoMensalEtanol / maxCusto) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Custo por km (Gasolina)
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatBRL(resultado.custoPorKmGasolina)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Custo por km (Etanol)
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatBRL(resultado.custoPorKmEtanol)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Consumo estimado (Etanol)
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {resultado.consumoEtanol.toFixed(1)} km/l
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Economia mensal
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatBRL(resultado.economiaMensal)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Economia anual
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatBRL(resultado.economiaAnual)}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-[#FF4D30]" />
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
                  Preço máximo do Etanol
                </span>
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">
                {formatBRL(resultado.breakevenEtanol)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Acima deste valor, gasolina compensa mais
              </p>
            </div>
          </div>

          {/* Percentual de economia */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-sm text-[#94A3B8] mb-1">Percentual de economia escolhendo o melhor combustível</p>
            <p className="text-4xl font-extrabold text-[#0F172A]">
              {resultado.percentualEconomia.toFixed(1)}%
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              Razão etanol/gasolina: {(resultado.razao * 100).toFixed(1)}%
              {resultado.razao < 0.7 ? " (< 70% — etanol vantajoso)" : " (>= 70% — gasolina vantajosa)"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}