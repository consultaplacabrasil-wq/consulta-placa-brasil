"use client";

import { useState } from "react";

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

interface Resultado {
  custoMensalEletrico: number;
  custoMensalCombustao: number;
  economiaMensal: number;
  diferencaPreco: number;
  breakevenMeses: number | null;
  custoAcumulado60Eletrico: number;
  custoAcumulado60Combustao: number;
  tabelaAcumulada: { mes: number; eletrico: number; combustao: number }[];
  vencedor: "eletrico" | "combustao" | "empate";
}

export default function EletricoVsCombustao() {
  const [precoEletrico, setPrecoEletrico] = useState("");
  const [precoCombustao, setPrecoCombustao] = useState("");
  const [kmMes, setKmMes] = useState("");
  const [precoKwh, setPrecoKwh] = useState("0,90");
  const [precoGasolina, setPrecoGasolina] = useState("");
  const [consumoEletrico, setConsumoEletrico] = useState("6");
  const [consumoCombustao, setConsumoCombustao] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function handleMoedaChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setter("");
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setter(
      num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  function handleNumeroChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) {
    const raw = e.target.value.replace(/[^0-9.,]/g, "");
    setter(raw);
  }

  function parseValor(str: string): number {
    if (!str) return 0;
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
  }

  function calcular() {
    const pEletrico = parseValor(precoEletrico);
    const pCombustao = parseValor(precoCombustao);
    const km = parseValor(kmMes);
    const kwh = parseValor(precoKwh);
    const gasolina = parseValor(precoGasolina);
    const consEletrico = parseValor(consumoEletrico);
    const consCombustao = parseValor(consumoCombustao);

    if (!pEletrico || !pCombustao || !km || !kwh || !gasolina || !consEletrico || !consCombustao) return;

    // Custo mensal de energia: km/mês / (km/kWh) * preço kWh
    const custoMensalEletrico = (km / consEletrico) * kwh;
    // Custo mensal de combustível: km/mês / (km/l) * preço gasolina
    const custoMensalCombustao = (km / consCombustao) * gasolina;

    const economiaMensal = custoMensalCombustao - custoMensalEletrico;
    const diferencaPreco = pEletrico - pCombustao;

    // Breakeven: diferença de preço de compra / economia mensal
    let breakevenMeses: number | null = null;
    if (economiaMensal > 0 && diferencaPreco > 0) {
      breakevenMeses = Math.ceil(diferencaPreco / economiaMensal);
    } else if (diferencaPreco <= 0 && economiaMensal >= 0) {
      // Elétrico é mais barato de comprar E mais barato de rodar
      breakevenMeses = 0;
    }

    // Tabela acumulada a cada 12 meses (até 60)
    const tabelaAcumulada: { mes: number; eletrico: number; combustao: number }[] = [];
    for (let m = 12; m <= 60; m += 12) {
      tabelaAcumulada.push({
        mes: m,
        eletrico: pEletrico + custoMensalEletrico * m,
        combustao: pCombustao + custoMensalCombustao * m,
      });
    }

    const custoAcumulado60Eletrico = pEletrico + custoMensalEletrico * 60;
    const custoAcumulado60Combustao = pCombustao + custoMensalCombustao * 60;

    let vencedor: "eletrico" | "combustao" | "empate" = "empate";
    if (custoAcumulado60Eletrico < custoAcumulado60Combustao) {
      vencedor = "eletrico";
    } else if (custoAcumulado60Combustao < custoAcumulado60Eletrico) {
      vencedor = "combustao";
    }

    setResultado({
      custoMensalEletrico,
      custoMensalCombustao,
      economiaMensal,
      diferencaPreco,
      breakevenMeses,
      custoAcumulado60Eletrico,
      custoAcumulado60Combustao,
      tabelaAcumulada,
      vencedor,
    });
  }

  const podCalcular =
    precoEletrico && precoCombustao && kmMes && precoKwh && precoGasolina && consumoEletrico && consumoCombustao;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preço carro elétrico */}
        <div>
          <label htmlFor="preco-eletrico" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Preço do carro elétrico
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-eletrico"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={precoEletrico}
              onChange={(e) => handleMoedaChange(e, setPrecoEletrico)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
          </div>
        </div>

        {/* Preço carro combustão */}
        <div>
          <label htmlFor="preco-combustao" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Preço do carro a combustão
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-combustao"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={precoCombustao}
              onChange={(e) => handleMoedaChange(e, setPrecoCombustao)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
          </div>
        </div>

        {/* Km por mês */}
        <div className="md:col-span-2">
          <label htmlFor="km-mes" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Quilômetros por mês
          </label>
          <div className="relative">
            <input
              id="km-mes"
              type="text"
              inputMode="numeric"
              placeholder="1.500"
              value={kmMes}
              onChange={(e) => handleNumeroChange(e, setKmMes)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km
            </span>
          </div>
        </div>

        {/* Preço kWh */}
        <div>
          <label htmlFor="preco-kwh" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Preço do kWh
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-kwh"
              type="text"
              inputMode="decimal"
              placeholder="0,90"
              value={precoKwh}
              onChange={(e) => handleMoedaChange(e, setPrecoKwh)}
              className="w-full pl-12 pr-16 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /kWh
            </span>
          </div>
        </div>

        {/* Preço gasolina */}
        <div>
          <label htmlFor="preco-gasolina" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Preço da gasolina
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-gasolina"
              type="text"
              inputMode="decimal"
              placeholder="5,79"
              value={precoGasolina}
              onChange={(e) => handleMoedaChange(e, setPrecoGasolina)}
              className="w-full pl-12 pr-16 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /litro
            </span>
          </div>
        </div>

        {/* Consumo elétrico */}
        <div>
          <label htmlFor="consumo-eletrico" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Consumo do elétrico
          </label>
          <div className="relative">
            <input
              id="consumo-eletrico"
              type="text"
              inputMode="decimal"
              placeholder="6"
              value={consumoEletrico}
              onChange={(e) => handleNumeroChange(e, setConsumoEletrico)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km/kWh
            </span>
          </div>
        </div>

        {/* Consumo combustão */}
        <div>
          <label htmlFor="consumo-combustao" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Consumo do combustão
          </label>
          <div className="relative">
            <input
              id="consumo-combustao"
              type="text"
              inputMode="decimal"
              placeholder="12"
              value={consumoCombustao}
              onChange={(e) => handleNumeroChange(e, setConsumoCombustao)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km/l
            </span>
          </div>
        </div>
      </div>

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!podCalcular}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#e6432a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Comparar Custos
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Cards de custo mensal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100 text-center">
              <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                Custo Mensal - Elétrico
              </h3>
              <p className="text-3xl font-bold text-green-800">
                {formatarMoeda(resultado.custoMensalEletrico)}
              </p>
              <p className="text-xs text-green-600 mt-1">energia elétrica</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 text-center">
              <h3 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">
                Custo Mensal - Combustão
              </h3>
              <p className="text-3xl font-bold text-orange-800">
                {formatarMoeda(resultado.custoMensalCombustao)}
              </p>
              <p className="text-xs text-orange-600 mt-1">gasolina</p>
            </div>
          </div>

          {/* Economia mensal */}
          <div className={`rounded-2xl p-5 border text-center ${
            resultado.economiaMensal > 0
              ? "bg-[#FF4D30]/5 border-[#FF4D30]/10"
              : "bg-blue-50 border-blue-100"
          }`}>
            <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wide mb-1">
              {resultado.economiaMensal > 0
                ? "Economia mensal com o elétrico"
                : "Economia mensal com o combustão"}
            </h3>
            <p className="text-3xl font-bold text-[#FF4D30]">
              {formatarMoeda(Math.abs(resultado.economiaMensal))}
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              {formatarMoeda(Math.abs(resultado.economiaMensal) * 12)} por ano
            </p>
          </div>

          {/* Breakeven */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
              Ponto de equilíbrio (breakeven)
            </h3>
            {resultado.breakevenMeses === null ? (
              <p className="text-[#475569]">
                O carro a combustão é mais econômico neste cenário. O investimento no elétrico não se paga
                com a economia no abastecimento.
              </p>
            ) : resultado.breakevenMeses === 0 ? (
              <p className="text-[#475569]">
                O carro elétrico é mais barato para comprar <strong>e</strong> mais econômico para rodar.
                A vantagem é imediata!
              </p>
            ) : (
              <div>
                <p className="text-4xl font-bold text-[#0F172A]">
                  {resultado.breakevenMeses} {resultado.breakevenMeses === 1 ? "mês" : "meses"}
                </p>
                <p className="text-[#475569] mt-2">
                  A diferença de preço de{" "}
                  <strong>{formatarMoeda(resultado.diferencaPreco)}</strong> será compensada
                  pela economia no abastecimento em aproximadamente{" "}
                  <strong>
                    {resultado.breakevenMeses >= 12
                      ? `${Math.floor(resultado.breakevenMeses / 12)} ano${Math.floor(resultado.breakevenMeses / 12) > 1 ? "s" : ""} e ${resultado.breakevenMeses % 12} ${resultado.breakevenMeses % 12 === 1 ? "mês" : "meses"}`
                      : `${resultado.breakevenMeses} ${resultado.breakevenMeses === 1 ? "mês" : "meses"}`}
                  </strong>
                  .
                </p>
              </div>
            )}
          </div>

          {/* Tabela acumulada */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-4">
              Custo acumulado ao longo de 60 meses (compra + abastecimento)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-[#0F172A]">Período</th>
                    <th className="text-right py-3 px-2 font-semibold text-green-700">Elétrico</th>
                    <th className="text-right py-3 px-2 font-semibold text-orange-700">Combustão</th>
                    <th className="text-right py-3 px-2 font-semibold text-[#64748B]">Diferença</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 text-[#475569]">Compra (mês 0)</td>
                    <td className="py-3 px-2 text-right font-medium text-[#0F172A]">
                      {formatarMoeda(parseValor(precoEletrico))}
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-[#0F172A]">
                      {formatarMoeda(parseValor(precoCombustao))}
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-[#64748B]">
                      {formatarMoeda(parseValor(precoEletrico) - parseValor(precoCombustao))}
                    </td>
                  </tr>
                  {resultado.tabelaAcumulada.map((linha) => {
                    const diff = linha.eletrico - linha.combustao;
                    return (
                      <tr key={linha.mes} className="border-b border-gray-100">
                        <td className="py-3 px-2 text-[#475569]">
                          {linha.mes} meses ({linha.mes / 12} {linha.mes / 12 === 1 ? "ano" : "anos"})
                        </td>
                        <td className="py-3 px-2 text-right font-medium text-[#0F172A]">
                          {formatarMoeda(linha.eletrico)}
                        </td>
                        <td className="py-3 px-2 text-right font-medium text-[#0F172A]">
                          {formatarMoeda(linha.combustao)}
                        </td>
                        <td className={`py-3 px-2 text-right font-medium ${
                          diff < 0 ? "text-green-600" : diff > 0 ? "text-red-500" : "text-[#64748B]"
                        }`}>
                          {diff < 0 ? "−" : "+"} {formatarMoeda(Math.abs(diff))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vencedor */}
          <div className={`rounded-2xl p-6 border text-center ${
            resultado.vencedor === "eletrico"
              ? "bg-green-50 border-green-200"
              : resultado.vencedor === "combustao"
              ? "bg-orange-50 border-orange-200"
              : "bg-gray-50 border-gray-200"
          }`}>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">
              {resultado.vencedor === "eletrico"
                ? "O carro elétrico vence em 5 anos!"
                : resultado.vencedor === "combustao"
                ? "O carro a combustão vence em 5 anos!"
                : "Empate em 5 anos!"}
            </h3>
            <p className="text-[#475569]">
              {resultado.vencedor === "eletrico" ? (
                <>
                  Em 60 meses, o custo total do elétrico é{" "}
                  <strong>{formatarMoeda(resultado.custoAcumulado60Eletrico)}</strong>, contra{" "}
                  <strong>{formatarMoeda(resultado.custoAcumulado60Combustao)}</strong> do combustão.
                  Economia de{" "}
                  <strong className="text-green-700">
                    {formatarMoeda(resultado.custoAcumulado60Combustao - resultado.custoAcumulado60Eletrico)}
                  </strong>.
                </>
              ) : resultado.vencedor === "combustao" ? (
                <>
                  Em 60 meses, o custo total do combustão é{" "}
                  <strong>{formatarMoeda(resultado.custoAcumulado60Combustao)}</strong>, contra{" "}
                  <strong>{formatarMoeda(resultado.custoAcumulado60Eletrico)}</strong> do elétrico.
                  Economia de{" "}
                  <strong className="text-orange-700">
                    {formatarMoeda(resultado.custoAcumulado60Eletrico - resultado.custoAcumulado60Combustao)}
                  </strong>.
                </>
              ) : (
                <>
                  Ambos os veículos possuem custo total idêntico em 60 meses:{" "}
                  <strong>{formatarMoeda(resultado.custoAcumulado60Eletrico)}</strong>.
                </>
              )}
            </p>
          </div>

          {/* Info IPVA */}
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">
              Isenção de IPVA para veículos elétricos
            </h4>
            <p className="text-sm text-blue-700">
              Alguns estados brasileiros oferecem isenção total ou parcial de IPVA para veículos
              elétricos e híbridos, como Maranhão, Pernambuco, Rio Grande do Norte, Piauí, Rio
              Grande do Sul, Mato Grosso do Sul, entre outros. Em São Paulo, há desconto de até
              50% na alíquota. Essa economia adicional <strong>não está incluída</strong> neste
              cálculo, mas pode tornar o elétrico ainda mais vantajoso. Consulte a legislação
              do seu estado para mais detalhes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
