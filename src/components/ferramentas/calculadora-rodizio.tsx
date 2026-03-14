"use client";

import { useState } from "react";
import { Car, AlertTriangle, Clock, MapPin, Info } from "lucide-react";

const diasSemana = [
  { nome: "Segunda", abrev: "SEG" },
  { nome: "Terça", abrev: "TER" },
  { nome: "Quarta", abrev: "QUA" },
  { nome: "Quinta", abrev: "QUI" },
  { nome: "Sexta", abrev: "SEX" },
  { nome: "Sábado", abrev: "SÁB" },
  { nome: "Domingo", abrev: "DOM" },
];

const rodizioSP: Record<number, string> = {
  1: "Segunda-feira",
  2: "Segunda-feira",
  3: "Terça-feira",
  4: "Terça-feira",
  5: "Quarta-feira",
  6: "Quarta-feira",
  7: "Quinta-feira",
  8: "Quinta-feira",
  9: "Sexta-feira",
  0: "Sexta-feira",
};

const diaIndexMap: Record<string, number> = {
  "Segunda-feira": 0,
  "Terça-feira": 1,
  "Quarta-feira": 2,
  "Quinta-feira": 3,
  "Sexta-feira": 4,
};

const finaisPorDia: Record<string, string> = {
  "Segunda-feira": "1 e 2",
  "Terça-feira": "3 e 4",
  "Quarta-feira": "5 e 6",
  "Quinta-feira": "7 e 8",
  "Sexta-feira": "9 e 0",
};

export function CalculadoraRodizio() {
  const [finalPlaca, setFinalPlaca] = useState<string>("");
  const [cidade, setCidade] = useState<string>("sao-paulo");
  const [resultado, setResultado] = useState<{
    dia: string;
    diaIndex: number;
  } | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  function handleConsultar() {
    if (finalPlaca === "") return;

    if (cidade === "sao-paulo") {
      const final = parseInt(finalPlaca);
      const dia = rodizioSP[final];
      setResultado({ dia, diaIndex: diaIndexMap[dia] });
    } else {
      setResultado(null);
    }
    setMostrarResultado(true);
  }

  return (
    <div className="space-y-6">
      {/* Formulário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Final da placa */}
          <div className="flex-1">
            <label
              htmlFor="final-placa"
              className="block text-sm font-medium text-[#0F172A] mb-2"
            >
              Final da placa
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="final-placa"
                value={finalPlaca}
                onChange={(e) => {
                  setFinalPlaca(e.target.value);
                  setMostrarResultado(false);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] bg-white appearance-none cursor-pointer transition-colors"
              >
                <option value="">Selecione o final da placa</option>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n.toString()}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cidade */}
          <div className="flex-1">
            <label
              htmlFor="cidade"
              className="block text-sm font-medium text-[#0F172A] mb-2"
            >
              Cidade
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="cidade"
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                  setMostrarResultado(false);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] bg-white appearance-none cursor-pointer transition-colors"
              >
                <option value="sao-paulo">São Paulo</option>
                <option value="rio-de-janeiro">Rio de Janeiro</option>
              </select>
            </div>
          </div>

          {/* Botão */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleConsultar}
              disabled={finalPlaca === ""}
              className="w-full md:w-auto px-8 py-3 bg-[#FF4D30] text-white font-semibold rounded-xl hover:bg-[#e6442b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Consultar
            </button>
          </div>
        </div>
      </div>

      {/* Resultado SP */}
      {mostrarResultado && cidade === "sao-paulo" && resultado && (
        <div className="space-y-6">
          {/* Card principal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF4D30]/10">
                <AlertTriangle className="w-5 h-5 text-[#FF4D30]" />
              </span>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Resultado do Rodízio — São Paulo
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Final da placa
                </p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {finalPlaca}
                </p>
              </div>
              <div className="bg-[#FF4D30]/5 rounded-xl p-4 border border-[#FF4D30]/10">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Dia de restrição
                </p>
                <p className="text-2xl font-bold text-[#FF4D30]">
                  {resultado.dia}
                </p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Horários de restrição
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF4D30]" />
                  <p className="text-lg font-bold text-[#0F172A]">
                    7h–10h e 17h–20h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendário visual da semana */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#0F172A] mb-4">
              Calendário semanal de restrição
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {diasSemana.map((dia, idx) => {
                const isRestrito = idx === resultado.diaIndex;
                return (
                  <div
                    key={dia.abrev}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl text-center transition-all ${
                      isRestrito
                        ? "bg-[#FF4D30] text-white shadow-lg shadow-[#FF4D30]/25 scale-105"
                        : idx >= 5
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : "bg-[#F8FAFC] text-[#64748B] border border-gray-100"
                    }`}
                  >
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {dia.abrev}
                    </span>
                    <span
                      className={`text-sm font-bold mt-1 ${
                        isRestrito ? "text-white" : ""
                      }`}
                    >
                      {isRestrito
                        ? "Restrito"
                        : idx >= 5
                          ? "Livre"
                          : "Liberado"}
                    </span>
                    {isRestrito && (
                      <span className="text-[10px] mt-1 opacity-90">
                        7h–10h / 17h–20h
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Multa */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </span>
              <h3 className="font-semibold text-[#0F172A]">
                Multa por descumprimento do rodízio
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-100 text-center">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Valor da multa
                </p>
                <p className="text-2xl font-bold text-[#FF4D30]">R$ 130,16</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Pontos na CNH
                </p>
                <p className="text-2xl font-bold text-orange-600">4 pontos</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 text-center">
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">
                  Gravidade
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  Infração média
                </p>
              </div>
            </div>
            <p className="text-sm text-[#64748B] mt-4">
              O descumprimento do rodízio municipal de São Paulo é enquadrado
              como infração de trânsito de natureza média, conforme o Art. 187-I
              do CTB. O motorista pode ser autuado uma vez por cada período
              (manhã e tarde).
            </p>
          </div>

          {/* Tabela de rodízio completa */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#0F172A] mb-4">
              Tabela completa do rodízio de São Paulo
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0F172A] text-white text-left">
                    <th className="px-6 py-3 font-semibold text-sm rounded-tl-xl">
                      Dia da semana
                    </th>
                    <th className="px-6 py-3 font-semibold text-sm">
                      Final da placa
                    </th>
                    <th className="px-6 py-3 font-semibold text-sm rounded-tr-xl">
                      Horários
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(finaisPorDia).map(([dia, finais], idx) => {
                    const isAtual = dia === resultado.dia;
                    return (
                      <tr
                        key={dia}
                        className={`border-t border-gray-50 transition-colors ${
                          isAtual
                            ? "bg-[#FF4D30]/5 font-semibold"
                            : idx % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50/30"
                        }`}
                      >
                        <td
                          className={`px-6 py-3 ${
                            isAtual ? "text-[#FF4D30]" : "text-[#0F172A]"
                          }`}
                        >
                          {dia}
                          {isAtual && (
                            <span className="ml-2 text-xs bg-[#FF4D30] text-white px-2 py-0.5 rounded-full">
                              Seu veículo
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-6 py-3 font-mono ${
                            isAtual ? "text-[#FF4D30]" : "text-[#334155]"
                          }`}
                        >
                          {finais}
                        </td>
                        <td className="px-6 py-3 text-[#334155]">
                          7h–10h e 17h–20h
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Resultado RJ */}
      {mostrarResultado && cidade === "rio-de-janeiro" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </span>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0F172A]">
                Rio de Janeiro — Sem rodízio permanente
              </h3>
              <p className="text-[#475569] leading-relaxed">
                Atualmente, a cidade do Rio de Janeiro <strong>não possui um
                sistema de rodízio permanente de veículos</strong>. Diferente de
                São Paulo, onde o rodízio municipal funciona todos os dias úteis
                no centro expandido, o Rio de Janeiro não adota essa medida de
                forma contínua.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Eventualmente, a Prefeitura do Rio pode implementar restrições
                temporárias de circulação em situações específicas, como grandes
                eventos, obras viárias ou emergências climáticas. Recomendamos
                acompanhar os canais oficiais da <strong>CET-Rio</strong> e da
                <strong> Prefeitura do Rio de Janeiro</strong> para informações
                atualizadas sobre qualquer restrição de trânsito vigente.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> Mesmo sem rodízio, fique atento a faixas
                  exclusivas de ônibus (BRS) e corredores expressos (BRT), que
                  possuem horários de restrição para veículos particulares e podem
                  gerar multa caso desrespeitados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informações complementares */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-[#0F172A] mb-3">
          Sobre o rodízio de veículos em São Paulo
        </h3>
        <div className="space-y-2 text-sm text-[#64748B]">
          <p>
            O rodízio municipal de veículos de São Paulo funciona no chamado{" "}
            <strong className="text-[#0F172A]">centro expandido</strong>, uma
            área delimitada pelas marginais e grandes avenidas. A restrição vale
            de segunda a sexta-feira, nos horários de pico: das 7h às 10h e das
            17h às 20h.
          </p>
          <p>
            Veículos com placas de qualquer estado estão sujeitos ao rodízio
            quando circulam na zona restrita. Feriados municipais, estaduais e
            nacionais são exceções — nesses dias, não há restrição de
            circulação.
          </p>
          <p className="text-xs text-[#94A3B8] mt-3">
            Informações baseadas nas regras vigentes do rodízio municipal de São
            Paulo (Decreto Municipal nº 58.584/2018). Verifique atualizações no
            site oficial da CET-SP.
          </p>
        </div>
      </div>
    </div>
  );
}
