"use client";

import { useState, useMemo } from "react";

const TIPOS_VEICULO = [
  { eixos: 2, nome: "2 eixos (Toco)", pneus: 6 },
  { eixos: 3, nome: "3 eixos (Truck)", pneus: 10 },
  { eixos: 4, nome: "4 eixos (Bitruck)", pneus: 14 },
  { eixos: 5, nome: "5 eixos (Carreta LS)", pneus: 18 },
  { eixos: 6, nome: "6 eixos (Carreta 3 eixos)", pneus: 22 },
  { eixos: 7, nome: "7 eixos (Bitrem)", pneus: 26 },
  { eixos: 8, nome: "8 eixos (Rodotrem curto)", pneus: 30 },
  { eixos: 9, nome: "9 eixos (Rodotrem)", pneus: 34 },
];

const ANTT_MINIMO_TON_KM = 0.2055;

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarDecimal(valor: number, casas = 4): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

interface Resultado {
  custoCombustivelKm: number;
  custoPneuKm: number;
  custoManutencaoKm: number;
  depreciacaoKm: number;
  custoFixoKm: number;
  custoVariavelKm: number;
  custoTotalKm: number;
  freteMinKm: number;
  custoMensal: number;
  numPneus: number;
}

export default function CustoKmCaminhao() {
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [consumo, setConsumo] = useState("");
  const [precoDiesel, setPrecoDiesel] = useState("");
  const [custoPneuValor, setCustoPneuValor] = useState("");
  const [custoPneuVidaUtil, setCustoPneuVidaUtil] = useState("");
  const [custoManutencao, setCustoManutencao] = useState("");
  const [kmMes, setKmMes] = useState("");
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState("");

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
    const eixos = parseInt(tipoVeiculo);
    const cons = parseValor(consumo);
    const diesel = parseValor(precoDiesel);
    const pneuValor = parseValor(custoPneuValor);
    const pneuVida = parseValor(custoPneuVidaUtil);
    const manutencao = parseValor(custoManutencao);
    const km = parseValor(kmMes);
    const valor = parseValor(valorVeiculo);

    if (!eixos || !cons || !diesel || !km || !valor) {
      setErro("Preencha todos os campos obrigatórios com valores maiores que zero.");
      return;
    }
    setErro("");

    const tipo = TIPOS_VEICULO.find((t) => t.eixos === eixos);
    if (!tipo) return;

    const numPneus = tipo.pneus;

    // Custo combustível por km
    const custoCombustivelKm = diesel / cons;

    // Custo pneu por km
    const custoPneuKm =
      pneuValor > 0 && pneuVida > 0
        ? (pneuValor * numPneus) / pneuVida
        : 0;

    // Custo manutenção por km
    const custoManutencaoKm = manutencao > 0 ? manutencao / km : 0;

    // Depreciação por km (10% ao ano / 12 meses / km_mes)
    const depreciacaoMensal = (valor * 0.1) / 12;
    const depreciacaoKm = depreciacaoMensal / km;

    // Custos variáveis = combustível + pneu
    const custoVariavelKm = custoCombustivelKm + custoPneuKm;

    // Custos fixos = manutenção + depreciação
    const custoFixoKm = custoManutencaoKm + depreciacaoKm;

    // Custo total por km
    const custoTotalKm = custoVariavelKm + custoFixoKm;

    // Frete mínimo por km (custo total + 20% margem)
    const freteMinKm = custoTotalKm * 1.2;

    // Custo mensal total
    const custoMensal = custoTotalKm * km;

    setResultado({
      custoCombustivelKm,
      custoPneuKm,
      custoManutencaoKm,
      depreciacaoKm,
      custoFixoKm,
      custoVariavelKm,
      custoTotalKm,
      freteMinKm,
      custoMensal,
      numPneus,
    });
  }

  function getPorcentagem(valor: number): string {
    if (!resultado || resultado.custoTotalKm === 0) return "0";
    return ((valor / resultado.custoTotalKm) * 100).toFixed(1);
  }

  const categorias = useMemo(
    () =>
      resultado
        ? [
            { nome: "Combustível", valor: resultado.custoCombustivelKm, cor: "bg-amber-500" },
            { nome: "Pneus", valor: resultado.custoPneuKm, cor: "bg-blue-500" },
            { nome: "Manutenção", valor: resultado.custoManutencaoKm, cor: "bg-green-500" },
            { nome: "Depreciação", valor: resultado.depreciacaoKm, cor: "bg-purple-500" },
          ]
        : [],
    [resultado]
  );

  const podCalcular =
    tipoVeiculo && consumo && precoDiesel && kmMes && valorVeiculo;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de veículo */}
        <div className="md:col-span-2">
          <label
            htmlFor="tipo-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Tipo do caminhão (nº de eixos)
          </label>
          <select
            id="tipo-veiculo"
            value={tipoVeiculo}
            onChange={(e) => setTipoVeiculo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            <option value="">Selecione o tipo de caminhão</option>
            {TIPOS_VEICULO.map((t) => (
              <option key={t.eixos} value={t.eixos}>
                {t.nome} — {t.pneus} pneus
              </option>
            ))}
          </select>
        </div>

        {/* Consumo diesel */}
        <div>
          <label
            htmlFor="consumo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Consumo médio de diesel
          </label>
          <div className="relative">
            <input
              id="consumo"
              type="text"
              inputMode="decimal"
              placeholder="3,5"
              value={consumo}
              onChange={(e) => handleNumeroChange(e, setConsumo)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km/l
            </span>
          </div>
        </div>

        {/* Preço diesel */}
        <div>
          <label
            htmlFor="preco-diesel"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Preço do diesel
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-diesel"
              type="text"
              inputMode="decimal"
              placeholder="6,30"
              value={precoDiesel}
              onChange={(e) => handleMoedaChange(e, setPrecoDiesel)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /litro
            </span>
          </div>
        </div>

        {/* Custo pneu unitário */}
        <div>
          <label
            htmlFor="custo-pneu"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Custo unitário do pneu{" "}
            <span className="text-[#64748B] font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="custo-pneu"
              type="text"
              inputMode="numeric"
              placeholder="1.500,00"
              value={custoPneuValor}
              onChange={(e) => handleMoedaChange(e, setCustoPneuValor)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
          </div>
        </div>

        {/* Vida útil do pneu */}
        <div>
          <label
            htmlFor="vida-util-pneu"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Vida útil do pneu{" "}
            <span className="text-[#64748B] font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <input
              id="vida-util-pneu"
              type="text"
              inputMode="numeric"
              placeholder="80.000"
              value={custoPneuVidaUtil}
              onChange={(e) => handleNumeroChange(e, setCustoPneuVidaUtil)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km
            </span>
          </div>
        </div>

        {/* Custo manutenção mensal */}
        <div>
          <label
            htmlFor="custo-manutencao"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Custo manutenção mensal{" "}
            <span className="text-[#64748B] font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="custo-manutencao"
              type="text"
              inputMode="numeric"
              placeholder="2.000,00"
              value={custoManutencao}
              onChange={(e) => handleMoedaChange(e, setCustoManutencao)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /mês
            </span>
          </div>
        </div>

        {/* Km por mês */}
        <div>
          <label
            htmlFor="km-mes"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Quilômetros rodados por mês
          </label>
          <div className="relative">
            <input
              id="km-mes"
              type="text"
              inputMode="numeric"
              placeholder="12.000"
              value={kmMes}
              onChange={(e) => handleNumeroChange(e, setKmMes)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km
            </span>
          </div>
        </div>

        {/* Valor do veículo */}
        <div>
          <label
            htmlFor="valor-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Valor do caminhão{" "}
            <span className="text-[#64748B] font-normal">(para depreciação)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="valor-veiculo"
              type="text"
              inputMode="numeric"
              placeholder="350.000,00"
              value={valorVeiculo}
              onChange={(e) => handleMoedaChange(e, setValorVeiculo)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Botão calcular */}
      <button
        type="button"
        onClick={calcular}
        disabled={!podCalcular}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular Custo por Km
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
          {/* Cards principais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FF4D30]/5 rounded-2xl p-5 border border-[#FF4D30]/10 text-center">
              <h3 className="text-sm font-semibold text-[#FF4D30] uppercase tracking-wide mb-1">
                Custo Total / Km
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                R$ {formatarDecimal(resultado.custoTotalKm)}
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Custo Mensal
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                {formatarMoeda(resultado.custoMensal)}
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Frete Mínimo / Km
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                R$ {formatarDecimal(resultado.freteMinKm)}
              </p>
            </div>
          </div>

          {/* Custos fixos vs variáveis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">
                Custo Variável / Km
              </h4>
              <p className="text-2xl font-bold text-blue-700">
                R$ {formatarDecimal(resultado.custoVariavelKm)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Combustível + Pneus
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100 text-center">
              <h4 className="text-sm font-semibold text-purple-800 mb-1">
                Custo Fixo / Km
              </h4>
              <p className="text-2xl font-bold text-purple-700">
                R$ {formatarDecimal(resultado.custoFixoKm)}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Manutenção + Depreciação
              </p>
            </div>
          </div>

          {/* Barra de composição visual */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-4">
              Composição do custo por km
            </h3>
            <div className="flex rounded-full overflow-hidden h-4 mb-4" role="img" aria-label="Gráfico de composição do custo por km">
              {categorias.map(
                (cat) =>
                  cat.valor > 0 && (
                    <div
                      key={cat.nome}
                      className={`${cat.cor} transition-all`}
                      style={{
                        width: `${getPorcentagem(cat.valor)}%`,
                      }}
                      title={`${cat.nome}: ${getPorcentagem(cat.valor)}%`}
                      aria-label={`${cat.nome}: ${getPorcentagem(cat.valor)}%`}
                    />
                  )
              )}
            </div>

            {/* Tabela detalhada */}
            <div className="space-y-2">
              {categorias.map((cat) => (
                <div
                  key={cat.nome}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${cat.cor} flex-shrink-0`}
                    />
                    <span className="text-sm font-medium text-[#0F172A]">
                      {cat.nome}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#64748B]">
                      {getPorcentagem(cat.valor)}%
                    </span>
                    <span className="text-sm font-semibold text-[#0F172A] w-32 text-right">
                      R$ {formatarDecimal(cat.valor)} /km
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                <span className="text-sm font-bold text-[#0F172A]">
                  Custo Total por Km
                </span>
                <span className="text-lg font-bold text-[#FF4D30]">
                  R$ {formatarDecimal(resultado.custoTotalKm)}
                </span>
              </div>
            </div>
          </div>

          {/* Comparação ANTT */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">
              Comparação com piso mínimo da ANTT
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-amber-700 mb-1">
                  Piso ANTT (R$/ton.km)
                </p>
                <p className="text-xl font-bold text-amber-800">
                  R$ {ANTT_MINIMO_TON_KM.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-700 mb-1">
                  Seu custo total / km
                </p>
                <p className="text-xl font-bold text-amber-800">
                  R$ {formatarDecimal(resultado.custoTotalKm)}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-700 mb-1">
                  Frete mínimo sugerido / km
                </p>
                <p className="text-xl font-bold text-amber-800">
                  R$ {formatarDecimal(resultado.freteMinKm)}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  (custo + 20% margem)
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-4">
              * O piso mínimo da ANTT é referência por tonelada × quilômetro. Compare com seu custo
              por km considerando a carga média transportada.
            </p>
          </div>

          {/* Info pneus */}
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <h4 className="text-sm font-semibold text-green-800 mb-1">
              Quantidade de pneus considerada
            </h4>
            <p className="text-2xl font-bold text-green-700">
              {resultado.numPneus} pneus
            </p>
            <p className="text-xs text-green-600 mt-1">
              Baseado no tipo de caminhão selecionado
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
