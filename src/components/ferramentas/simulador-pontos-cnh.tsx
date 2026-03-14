"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";

interface InfracaoTipo {
  descricao: string;
  pontos: number;
  gravissima: boolean;
}

interface InfracaoRegistrada {
  id: string;
  descricao: string;
  pontos: number;
  gravissima: boolean;
  data: string;
}

const infracoesDisponiveis: InfracaoTipo[] = [
  { descricao: "Avançar semáforo vermelho", pontos: 7, gravissima: true },
  { descricao: "Excesso de velocidade acima de 50%", pontos: 7, gravissima: true },
  { descricao: "Excesso de velocidade entre 20% e 50%", pontos: 5, gravissima: false },
  { descricao: "Excesso de velocidade até 20%", pontos: 4, gravissima: false },
  { descricao: "Dirigir sem cinto de segurança", pontos: 5, gravissima: false },
  { descricao: "Utilizar celular ao volante", pontos: 5, gravissima: false },
  { descricao: "Estacionar em local proibido", pontos: 5, gravissima: false },
  { descricao: "Ultrapassagem em local proibido", pontos: 5, gravissima: false },
  { descricao: "Dirigir com CNH vencida", pontos: 5, gravissima: false },
  { descricao: "Conduzir moto sem capacete", pontos: 7, gravissima: true },
];

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function getVencimento(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  date.setFullYear(date.getFullYear() + 1);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isAtivo(dateStr: string): boolean {
  const date = new Date(dateStr + "T00:00:00");
  const vencimento = new Date(date);
  vencimento.setFullYear(vencimento.getFullYear() + 1);
  return vencimento > new Date();
}

export function SimuladorPontosCNH() {
  const [infracoes, setInfracoes] = useState<InfracaoRegistrada[]>([]);
  const [infracaoSelecionada, setInfracaoSelecionada] = useState<number>(0);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [reincidente, setReincidente] = useState(false);

  const adicionarInfracao = () => {
    if (!dataSelecionada) return;
    const tipo = infracoesDisponiveis[infracaoSelecionada];
    const nova: InfracaoRegistrada = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      descricao: tipo.descricao,
      pontos: tipo.pontos,
      gravissima: tipo.gravissima,
      data: dataSelecionada,
    };
    setInfracoes((prev) => [...prev, nova]);
    setDataSelecionada("");
  };

  const removerInfracao = (id: string) => {
    setInfracoes((prev) => prev.filter((inf) => inf.id !== id));
  };

  const infracoesAtivas = useMemo(
    () => infracoes.filter((inf) => isAtivo(inf.data)),
    [infracoes]
  );

  const pontosAtivos = useMemo(
    () => infracoesAtivas.reduce((sum, inf) => sum + inf.pontos, 0),
    [infracoesAtivas]
  );

  const temGravissima = useMemo(
    () => infracoesAtivas.some((inf) => inf.gravissima),
    [infracoesAtivas]
  );

  const limiteSuspensao = reincidente ? 30 : 20;

  const riscoSuspensao = pontosAtivos >= limiteSuspensao || temGravissima;
  const progresso = Math.min((pontosAtivos / limiteSuspensao) * 100, 100);

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {/* Formulário para adicionar infração */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">
          Adicionar Infração
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="tipo-infracao" className="block text-sm font-semibold text-[#0F172A] mb-1">
                Tipo de infração
              </label>
              <select
                id="tipo-infracao"
                value={infracaoSelecionada}
                onChange={(e) => setInfracaoSelecionada(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] bg-white appearance-none cursor-pointer transition-colors"
              >
                {infracoesDisponiveis.map((inf, idx) => (
                  <option key={idx} value={idx}>
                    {inf.descricao} ({inf.pontos} pts
                    {inf.gravissima ? " - Gravíssima" : ""})
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="data-infracao" className="block text-sm font-semibold text-[#0F172A] mb-1">
                Data da infração
              </label>
              <input
                id="data-infracao"
                type="date"
                value={dataSelecionada}
                max={hoje}
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] transition-colors"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={adicionarInfracao}
                disabled={!dataSelecionada}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF4D30] text-white font-semibold hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5" />
                Adicionar
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="reincidente"
              checked={reincidente}
              onChange={(e) => setReincidente(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#FF4D30] focus:ring-[#FF4D30]"
            />
            <label htmlFor="reincidente" className="text-sm text-[#475569]">
              Motorista reincidente (já teve CNH suspensa anteriormente)
            </label>
          </div>
        </div>
      </div>

      {/* Painel de Resultado */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">
          Resumo da Pontuação
        </h2>

        {/* Total de pontos */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#475569]">
            Pontos ativos nos últimos 12 meses
          </span>
          <span className="text-2xl font-bold text-[#0F172A]">
            {pontosAtivos}{" "}
            <span className="text-sm font-normal text-[#94A3B8]">
              / {limiteSuspensao} pts
            </span>
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progresso}%`,
              backgroundColor:
                progresso >= 100
                  ? "#EF4444"
                  : progresso >= 75
                  ? "#F59E0B"
                  : progresso >= 50
                  ? "#F59E0B"
                  : "#22C55E",
            }}
          />
        </div>

        {/* Alerta de risco */}
        {infracoes.length > 0 && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl mb-2 ${
              riscoSuspensao
                ? "bg-red-50 border border-red-200"
                : pontosAtivos >= limiteSuspensao * 0.75
                ? "bg-yellow-50 border border-yellow-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            {riscoSuspensao ? (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            ) : pontosAtivos >= limiteSuspensao * 0.75 ? (
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={`font-semibold text-sm ${
                  riscoSuspensao
                    ? "text-red-800"
                    : pontosAtivos >= limiteSuspensao * 0.75
                    ? "text-yellow-800"
                    : "text-green-800"
                }`}
              >
                {riscoSuspensao
                  ? temGravissima
                    ? "Suspensão imediata da CNH!"
                    : "CNH em risco de suspensão!"
                  : pontosAtivos >= limiteSuspensao * 0.75
                  ? "Atenção: pontuação elevada"
                  : "Pontuação dentro do limite"}
              </p>
              <p
                className={`text-xs mt-1 ${
                  riscoSuspensao
                    ? "text-red-600"
                    : pontosAtivos >= limiteSuspensao * 0.75
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {riscoSuspensao
                  ? temGravissima
                    ? "Infrações gravíssimas podem resultar em suspensão imediata do direito de dirigir, independentemente da pontuação acumulada."
                    : `Você atingiu ou ultrapassou o limite de ${limiteSuspensao} pontos em 12 meses. A CNH pode ser suspensa.`
                  : pontosAtivos >= limiteSuspensao * 0.75
                  ? `Você está próximo do limite de ${limiteSuspensao} pontos. Dirija com cuidado.`
                  : `Você ainda pode acumular até ${limiteSuspensao - pontosAtivos} pontos antes de atingir o limite de suspensão.`}
              </p>
            </div>
          </div>
        )}

        {/* Info reincidência */}
        <p className="text-xs text-[#94A3B8] mt-2">
          Limite para suspensão:{" "}
          {reincidente
            ? "30 pontos (motorista reincidente)"
            : "20 pontos (1ª vez)"}
          . Os pontos vencem após 12 meses da data da infração.
        </p>
      </div>

      {/* Lista de infrações */}
      {infracoes.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Infrações Registradas ({infracoes.length})
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0F172A] text-white text-left">
                  <th className="px-6 py-3 font-semibold text-sm">Descrição</th>
                  <th className="px-6 py-3 font-semibold text-sm text-center">
                    Pontos
                  </th>
                  <th className="px-6 py-3 font-semibold text-sm">
                    Data da Infração
                  </th>
                  <th className="px-6 py-3 font-semibold text-sm">
                    Vencimento dos Pontos
                  </th>
                  <th className="px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="px-6 py-3 font-semibold text-sm text-center">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {infracoes.map((inf, idx) => {
                  const ativo = isAtivo(inf.data);
                  return (
                    <tr
                      key={inf.id}
                      className={`border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      } ${!ativo ? "opacity-50" : ""}`}
                    >
                      <td className="px-6 py-4 text-sm text-[#334155]">
                        {inf.descricao}
                        {inf.gravissima && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                            Gravíssima
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4D30]/10 text-[#FF4D30] font-bold text-sm">
                          {inf.pontos}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#334155]">
                        {formatDate(inf.data)}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#334155]">
                        {getVencimento(inf.data)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            ativo
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-gray-100 text-gray-500 border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              ativo ? "bg-red-500" : "bg-gray-400"
                            }`}
                          />
                          {ativo ? "Ativo" : "Vencido"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => removerInfracao(inf.id)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remover infração"
                          aria-label="Remover infração"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4 p-6 pt-0">
            {infracoes.map((inf) => {
              const ativo = isAtivo(inf.data);
              return (
                <div
                  key={inf.id}
                  className={`bg-gray-50 rounded-xl p-4 space-y-3 ${
                    !ativo ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0F172A]">
                        {inf.descricao}
                      </p>
                      {inf.gravissima && (
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                          Gravíssima
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removerInfracao(inf.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Remover infração"
                      aria-label="Remover infração"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-[#475569]">
                        <strong>Data:</strong> {formatDate(inf.data)}
                      </span>
                      <span className="text-[#475569]">
                        <strong>Vence:</strong> {getVencimento(inf.data)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FF4D30]/10 text-[#FF4D30] font-bold text-xs">
                        {inf.pontos}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                          ativo
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        {ativo ? "Ativo" : "Vencido"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {infracoes.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-[#334155]">
            Nenhuma infração registrada
          </p>
          <p className="text-sm text-[#94A3B8] mt-1">
            Selecione uma infração e a data para começar a simulação.
          </p>
        </div>
      )}

      {/* Legenda */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-[#0F172A] mb-3">
          Como funciona a pontuação da CNH?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#475569]">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <span>
              <strong>Gravíssima (7 pts):</strong> pode causar suspensão imediata
              da CNH
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
            <span>
              <strong>Grave (5 pts):</strong> infração com alto risco ao trânsito
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
            <span>
              <strong>Média (4 pts):</strong> infração com risco moderado
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
            <span>
              <strong>Leve (3 pts):</strong> infração com menor gravidade
            </span>
          </div>
        </div>
        <p className="text-xs text-[#94A3B8] mt-4">
          Simulação com base no Código de Trânsito Brasileiro (CTB). Os pontos
          vencem 12 meses após a data da infração. Limite de suspensão: 20 pontos
          (1ª vez) ou 30 pontos (reincidência). Este simulador é apenas
          informativo e não substitui a consulta oficial ao DETRAN.
        </p>
      </div>
    </div>
  );
}
