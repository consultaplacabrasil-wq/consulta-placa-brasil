"use client";

import { useState, useMemo } from "react";

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

const ALIQUOTAS_IPVA: Record<string, number> = {
  SP: 4, RJ: 4, MG: 4, PR: 3.5, RS: 3, SC: 2,
  BA: 3.5, GO: 3.5, DF: 3.5, MS: 3.5, PE: 3,
  CE: 3, AM: 3, MT: 3, RN: 3, RO: 3, RR: 3,
  AC: 2, AL: 3, AP: 3, ES: 2, MA: 2.5, PA: 2.5,
  PB: 2.5, PI: 2.5, SE: 2.5, TO: 2,
};

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

interface Resultado {
  ipva: number;
  combustivel: number;
  manutencao: number;
  depreciacao: number;
  seguro: number;
  financiamento: number;
  totalAnual: number;
  totalMensal: number;
  custoPorKm: number;
  kmAnual: number;
}

export default function CustoTotalVeiculo() {
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [kmMes, setKmMes] = useState("");
  const [consumo, setConsumo] = useState("");
  const [precoCombustivel, setPrecoCombustivel] = useState("");
  const [valorSeguro, setValorSeguro] = useState("");
  const [parcelaFinanciamento, setParcelaFinanciamento] = useState("");
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
    const valor = parseValor(valorVeiculo);
    const km = parseValor(kmMes);
    const cons = parseValor(consumo);
    const preco = parseValor(precoCombustivel);
    const seguro = parseValor(valorSeguro);
    const parcela = parseValor(parcelaFinanciamento);

    if (!valor || !estado || !km || !cons || !preco) return;
    if (cons <= 0) return;

    const aliquota = (ALIQUOTAS_IPVA[estado] ?? 3) / 100;
    const ipva = valor * aliquota;
    const combustivel = (km / cons) * preco * 12;
    const manutencao = valor * 0.03;
    const depreciacao = valor * 0.10;
    const financiamento = parcela * 12;
    const kmAnual = km * 12;

    const totalAnual = ipva + combustivel + manutencao + depreciacao + seguro + financiamento;
    const totalMensal = totalAnual / 12;
    const custoPorKm = kmAnual > 0 ? totalAnual / kmAnual : 0;

    setResultado({
      ipva,
      combustivel,
      manutencao,
      depreciacao,
      seguro,
      financiamento,
      totalAnual,
      totalMensal,
      custoPorKm,
      kmAnual,
    });
  }

  function getPorcentagem(valor: number): string {
    if (!resultado || resultado.totalAnual === 0) return "0";
    return ((valor / resultado.totalAnual) * 100).toFixed(1);
  }

  const categorias = useMemo(
    () =>
      resultado
        ? [
            { nome: "IPVA", valor: resultado.ipva, cor: "bg-red-500" },
            { nome: "Combustível", valor: resultado.combustivel, cor: "bg-amber-500" },
            { nome: "Manutenção", valor: resultado.manutencao, cor: "bg-blue-500" },
            { nome: "Depreciação", valor: resultado.depreciacao, cor: "bg-purple-500" },
            { nome: "Seguro", valor: resultado.seguro, cor: "bg-green-500" },
            { nome: "Financiamento", valor: resultado.financiamento, cor: "bg-cyan-500" },
          ]
        : [],
    [resultado]
  );

  const podCalcular = valorVeiculo && estado && kmMes && consumo && precoCombustivel;

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
              onChange={(e) => handleMoedaChange(e, setValorVeiculo)}
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

        {/* Km por mês */}
        <div>
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

        {/* Consumo */}
        <div>
          <label htmlFor="consumo" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Consumo médio
          </label>
          <div className="relative">
            <input
              id="consumo"
              type="text"
              inputMode="decimal"
              placeholder="10"
              value={consumo}
              onChange={(e) => handleNumeroChange(e, setConsumo)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km/l
            </span>
          </div>
        </div>

        {/* Preço combustível */}
        <div>
          <label
            htmlFor="preco-combustivel"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Preço do combustível
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="preco-combustivel"
              type="text"
              inputMode="decimal"
              placeholder="5,79"
              value={precoCombustivel}
              onChange={(e) => handleMoedaChange(e, setPrecoCombustivel)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /litro
            </span>
          </div>
        </div>

        {/* Seguro anual */}
        <div>
          <label htmlFor="seguro" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Seguro anual
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="seguro"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={valorSeguro}
              onChange={(e) => handleMoedaChange(e, setValorSeguro)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
          </div>
        </div>

        {/* Financiamento */}
        <div>
          <label
            htmlFor="financiamento"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Parcela do financiamento{" "}
            <span className="text-[#64748B] font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
              R$
            </span>
            <input
              id="financiamento"
              type="text"
              inputMode="numeric"
              placeholder="0,00"
              value={parcelaFinanciamento}
              onChange={(e) => handleMoedaChange(e, setParcelaFinanciamento)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              /mês
            </span>
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
        Calcular Custo Total
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setValorVeiculo("");
                setEstado("");
                setKmMes("");
                setConsumo("");
                setPrecoCombustivel("");
                setValorSeguro("");
                setParcelaFinanciamento("");
                setResultado(null);
              }}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Limpar tudo
            </button>
          </div>
          {/* Resumo principal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Custo Mensal
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                {formatarMoeda(resultado.totalMensal)}
              </p>
            </div>
            <div className="bg-[#FF4D30]/5 rounded-2xl p-5 border border-[#FF4D30]/10 text-center">
              <h3 className="text-sm font-semibold text-[#FF4D30] uppercase tracking-wide mb-1">
                Custo Anual
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                {formatarMoeda(resultado.totalAnual)}
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Custo por Km
              </h3>
              <p className="text-3xl font-bold text-[#0F172A]">
                {formatarMoeda(resultado.custoPorKm)}
              </p>
            </div>
          </div>

          {/* Barra de composição visual */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-4">
              Composição do custo anual
            </h3>
            <div className="flex rounded-full overflow-hidden h-4 mb-4" role="img" aria-label="Gráfico de composição do custo anual">
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
                    <span className="text-sm font-semibold text-[#0F172A] w-28 text-right">
                      {formatarMoeda(cat.valor)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                <span className="text-sm font-bold text-[#0F172A]">Total Anual</span>
                <span className="text-lg font-bold text-[#FF4D30]">
                  {formatarMoeda(resultado.totalAnual)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">
                Quilometragem anual
              </h4>
              <p className="text-2xl font-bold text-blue-700">
                {resultado.kmAnual.toLocaleString("pt-BR")} km
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h4 className="text-sm font-semibold text-green-800 mb-1">
                Alíquota IPVA ({estado})
              </h4>
              <p className="text-2xl font-bold text-green-700">
                {(ALIQUOTAS_IPVA[estado] ?? 3).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
