"use client";

import { useState } from "react";

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

// Taxa de transferência Detran aproximada por estado (R$)
const TAXA_TRANSFERENCIA_DETRAN: Record<string, number> = {
  AC: 220, AL: 250, AM: 230, AP: 210, BA: 280, CE: 260, DF: 300,
  ES: 240, GO: 270, MA: 230, MG: 310, MS: 260, MT: 250, PA: 230,
  PB: 240, PE: 270, PI: 220, PR: 290, RJ: 340, RN: 240, RO: 220,
  RR: 210, RS: 280, SC: 260, SE: 230, SP: 350, TO: 220,
};

// Alíquota de ITCMD por estado (% sobre valor do veículo) para doação/herança
const ITCMD_ALIQUOTA: Record<string, number> = {
  AC: 4, AL: 4, AM: 2, AP: 4, BA: 4, CE: 4, DF: 4,
  ES: 4, GO: 4, MA: 3, MG: 5, MS: 4, MT: 4, PA: 4,
  PB: 4, PE: 5, PI: 4, PR: 4, RJ: 5, RN: 3, RO: 4,
  RR: 4, RS: 4, SC: 4, SE: 4, SP: 4, TO: 2,
};

const TAXA_VISTORIA = 150;
const TAXA_EMPLACAMENTO = 180;

type TipoTransferencia = "compra_venda" | "doacao" | "heranca";

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

interface ResultadoCalculo {
  taxaDetran: number;
  taxaVistoria: number;
  taxaEmplacamento: number;
  itcmd: number;
  total: number;
  mudaEstado: boolean;
  tipoTransferencia: TipoTransferencia;
  aliquotaItcmd: number;
}

export default function CalculadoraTransferencia() {
  const [estadoOrigem, setEstadoOrigem] = useState("");
  const [estadoDestino, setEstadoDestino] = useState("");
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [tipoTransferencia, setTipoTransferencia] = useState<TipoTransferencia>("compra_venda");
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

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
    if (!valor || !estadoOrigem || !estadoDestino) return;

    const mudaEstado = estadoOrigem !== estadoDestino;
    const taxaDetran = TAXA_TRANSFERENCIA_DETRAN[estadoDestino] ?? 280;
    const taxaVistoria = TAXA_VISTORIA;
    const taxaEmplacamento = mudaEstado ? TAXA_EMPLACAMENTO : 0;

    let itcmd = 0;
    let aliquotaItcmd = 0;
    if (tipoTransferencia === "doacao" || tipoTransferencia === "heranca") {
      aliquotaItcmd = ITCMD_ALIQUOTA[estadoDestino] ?? 4;
      itcmd = valor * (aliquotaItcmd / 100);
    }

    const total = taxaDetran + taxaVistoria + taxaEmplacamento + itcmd;

    setResultado({
      taxaDetran,
      taxaVistoria,
      taxaEmplacamento,
      itcmd,
      total,
      mudaEstado,
      tipoTransferencia,
      aliquotaItcmd,
    });
  }

  const tiposTransferencia: { value: TipoTransferencia; label: string }[] = [
    { value: "compra_venda", label: "Compra e Venda" },
    { value: "doacao", label: "Doação" },
    { value: "heranca", label: "Herança" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado de origem */}
        <div>
          <label htmlFor="estado-origem" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Estado de origem
          </label>
          <select
            id="estado-origem"
            value={estadoOrigem}
            onChange={(e) => setEstadoOrigem(e.target.value)}
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

        {/* Estado de destino */}
        <div>
          <label htmlFor="estado-destino" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Estado de destino
          </label>
          <select
            id="estado-destino"
            value={estadoDestino}
            onChange={(e) => setEstadoDestino(e.target.value)}
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

        {/* Valor do veículo */}
        <div>
          <label
            htmlFor="valor-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Valor do veículo (R$)
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

        {/* Tipo de transferência */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de transferência
          </label>
          <div className="grid grid-cols-3 gap-2">
            {tiposTransferencia.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTipoTransferencia(t.value)}
                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                  tipoTransferencia === t.value
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
        disabled={!valorVeiculo || !estadoOrigem || !estadoDestino}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#e6432a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Calcular custos de transferência
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Total estimado */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
              Custo total estimado
            </h3>
            <p className="text-4xl font-bold text-[#0F172A]">
              {formatarMoeda(resultado.total)}
            </p>
            <p className="text-sm text-[#64748B] mt-1">
              Transferência por{" "}
              <strong>
                {resultado.tipoTransferencia === "compra_venda"
                  ? "compra e venda"
                  : resultado.tipoTransferencia === "doacao"
                  ? "doação"
                  : "herança"}
              </strong>
              {resultado.mudaEstado
                ? " — com mudança de estado"
                : " — mesmo estado"}
            </p>
          </div>

          {/* Tabela de custos detalhados */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0F172A] text-white">
                  <th className="text-left px-5 py-3 text-sm font-semibold">Item</th>
                  <th className="text-right px-5 py-3 text-sm font-semibold">Valor estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-[#475569]">
                    Taxa de transferência (Detran)
                  </td>
                  <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                    {formatarMoeda(resultado.taxaDetran)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-[#475569]">
                    Taxa de vistoria veicular
                  </td>
                  <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                    {formatarMoeda(resultado.taxaVistoria)}
                  </td>
                </tr>
                {resultado.mudaEstado && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm text-[#475569]">
                      Emplacamento (mudança de estado)
                    </td>
                    <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                      {formatarMoeda(resultado.taxaEmplacamento)}
                    </td>
                  </tr>
                )}
                {resultado.itcmd > 0 && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm text-[#475569]">
                      ITCMD — {resultado.tipoTransferencia === "doacao" ? "doação" : "herança"}{" "}
                      ({resultado.aliquotaItcmd}%)
                    </td>
                    <td className="px-5 py-3 text-sm text-[#0F172A] font-semibold text-right">
                      {formatarMoeda(resultado.itcmd)}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-[#F8FAFC] border-t-2 border-[#FF4D30]">
                  <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">
                    Total estimado
                  </td>
                  <td className="px-5 py-4 text-lg font-bold text-[#FF4D30] text-right">
                    {formatarMoeda(resultado.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Aviso */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Atenção:</strong> Os valores apresentados são estimativas aproximadas com base
              em taxas médias praticadas pelos Detrans estaduais. O custo real pode variar conforme a
              tabela vigente de cada estado, tipo de veículo e outros fatores. Para valores exatos,
              consulte o Detran do estado de destino.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
