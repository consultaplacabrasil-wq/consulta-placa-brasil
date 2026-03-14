"use client";

import { useState } from "react";

const ESTADOS_BR = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const MESES_LICENCIAMENTO: Record<number, string> = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  0: "Outubro",
};

function calcularIdade(dataNascimento: Date, dataReferencia: Date): number {
  let idade = dataReferencia.getFullYear() - dataNascimento.getFullYear();
  const mesRef = dataReferencia.getMonth();
  const mesNasc = dataNascimento.getMonth();
  if (mesRef < mesNasc || (mesRef === mesNasc && dataReferencia.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
}

function calcularValidadeCNH(dataNascimento: Date, dataEmissao: Date): { vencimento: Date; anos: number } {
  const idadeNaEmissao = calcularIdade(dataNascimento, dataEmissao);

  let anos: number;
  if (idadeNaEmissao >= 70) {
    anos = 3;
  } else if (idadeNaEmissao >= 50) {
    anos = 5;
  } else {
    anos = 10;
  }

  const vencimento = new Date(dataEmissao);
  vencimento.setFullYear(vencimento.getFullYear() + anos);

  return { vencimento, anos };
}

type StatusAlerta = "verde" | "amarelo" | "vermelho";

function classificarStatus(vencimento: Date): { status: StatusAlerta; mensagem: string } {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const venc = new Date(vencimento);
  venc.setHours(0, 0, 0, 0);

  const diffMs = venc.getTime() - hoje.getTime();
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 0) {
    return { status: "vermelho", mensagem: `CNH vencida há ${Math.abs(diffDias)} dia(s)` };
  } else if (diffDias <= 60) {
    return { status: "amarelo", mensagem: `CNH vence em ${diffDias} dia(s)` };
  } else {
    return { status: "verde", mensagem: `CNH válida — vence em ${diffDias} dia(s)` };
  }
}

function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface Resultado {
  vencimentoCNH: Date;
  validadeAnos: number;
  mesLicenciamento: string;
  finalPlaca: number;
  statusCNH: { status: StatusAlerta; mensagem: string };
  idadeAtual: number;
  faixaEtaria: string;
}

export default function VerificadorDocumentos() {
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [finalPlaca, setFinalPlaca] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function verificar() {
    setErro("");
    setResultado(null);

    if (!dataNascimento || !dataEmissao || !finalPlaca || !estado) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const nascDate = new Date(dataNascimento + "T00:00:00");
    const emissaoDate = new Date(dataEmissao + "T00:00:00");

    if (isNaN(nascDate.getTime()) || isNaN(emissaoDate.getTime())) {
      setErro("Datas inválidas. Verifique os valores informados.");
      return;
    }

    if (emissaoDate <= nascDate) {
      setErro("A data de emissão da CNH deve ser posterior à data de nascimento.");
      return;
    }

    const idadeNaEmissao = calcularIdade(nascDate, emissaoDate);
    if (idadeNaEmissao < 18) {
      setErro("A idade na data de emissão deve ser de pelo menos 18 anos.");
      return;
    }

    const final = parseInt(finalPlaca, 10);
    if (isNaN(final) || final < 0 || final > 9) {
      setErro("O final da placa deve ser um dígito de 0 a 9.");
      return;
    }

    const { vencimento, anos } = calcularValidadeCNH(nascDate, emissaoDate);
    const statusCNH = classificarStatus(vencimento);
    const mesLicenciamento = MESES_LICENCIAMENTO[final];
    const idadeAtual = calcularIdade(nascDate, new Date());

    let faixaEtaria: string;
    if (idadeAtual >= 70) {
      faixaEtaria = "Acima de 70 anos — validade de 3 anos";
    } else if (idadeAtual >= 50) {
      faixaEtaria = "De 50 a 69 anos — validade de 5 anos";
    } else {
      faixaEtaria = "Até 49 anos — validade de 10 anos";
    }

    setResultado({
      vencimentoCNH: vencimento,
      validadeAnos: anos,
      mesLicenciamento,
      finalPlaca: final,
      statusCNH,
      idadeAtual,
      faixaEtaria,
    });
  }

  const statusColors: Record<StatusAlerta, { bg: string; border: string; text: string; icon: string }> = {
    verde: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" },
    amarelo: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "text-yellow-600" },
    vermelho: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="data-nascimento"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Data de Nascimento
          </label>
          <input
            id="data-nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => {
              setDataNascimento(e.target.value);
              setErro("");
              setResultado(null);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
          />
          <p className="text-xs text-[#64748B] mt-1">
            Utilizada para calcular a validade da CNH
          </p>
        </div>

        <div>
          <label
            htmlFor="data-emissao"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Data de Emissão da CNH
          </label>
          <input
            id="data-emissao"
            type="date"
            value={dataEmissao}
            onChange={(e) => {
              setDataEmissao(e.target.value);
              setErro("");
              setResultado(null);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
          />
          <p className="text-xs text-[#64748B] mt-1">
            Data impressa no documento da CNH
          </p>
        </div>

        <div>
          <label
            htmlFor="final-placa"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Final da Placa do Veículo
          </label>
          <input
            id="final-placa"
            type="number"
            min={0}
            max={9}
            placeholder="Ex: 7"
            value={finalPlaca}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
              setFinalPlaca(val);
              setErro("");
              setResultado(null);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
          />
          <p className="text-xs text-[#64748B] mt-1">
            Último dígito da placa (0 a 9)
          </p>
        </div>

        <div>
          <label
            htmlFor="estado-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Estado do Veículo (UF)
          </label>
          <select
            id="estado-veiculo"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setErro("");
              setResultado(null);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
          >
            <option value="">Selecione o estado</option>
            {ESTADOS_BR.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#64748B] mt-1">
            Estado onde o veículo está registrado
          </p>
        </div>
      </div>

      {erro && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          {erro}
        </div>
      )}

      {/* Botão */}
      <button
        type="button"
        onClick={verificar}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Verificar Documentos
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Alerta visual principal */}
          <div
            className={`rounded-2xl p-6 border-2 ${statusColors[resultado.statusCNH.status].bg} ${statusColors[resultado.statusCNH.status].border}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-3xl ${statusColors[resultado.statusCNH.status].icon}`}
              >
                {resultado.statusCNH.status === "verde" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {resultado.statusCNH.status === "amarelo" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
                {resultado.statusCNH.status === "vermelho" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </span>
              <h3
                className={`text-xl font-bold ${statusColors[resultado.statusCNH.status].text}`}
              >
                {resultado.statusCNH.status === "verde" && "Documentação em dia"}
                {resultado.statusCNH.status === "amarelo" && "Atenção — Vencimento próximo"}
                {resultado.statusCNH.status === "vermelho" && "CNH Vencida"}
              </h3>
            </div>
            <p className={`text-sm ${statusColors[resultado.statusCNH.status].text}`}>
              {resultado.statusCNH.mensagem}
            </p>
          </div>

          {/* Cards de resultado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vencimento CNH */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Vencimento da CNH
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {formatarData(resultado.vencimentoCNH)}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Validade de {resultado.validadeAnos} ano(s) a partir da emissão
              </p>
            </div>

            {/* Faixa etária */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Faixa Etária Atual
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.idadeAtual} anos
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                {resultado.faixaEtaria}
              </p>
            </div>

            {/* Mês do licenciamento */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Mês do Licenciamento
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.mesLicenciamento}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Final de placa {resultado.finalPlaca} — Estado: {estado}
              </p>
            </div>

            {/* Regras de validade */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Regras de Validade da CNH
              </h4>
              <ul className="text-sm text-[#0F172A] space-y-1 mt-2">
                <li className={resultado.validadeAnos === 10 ? "font-bold text-[#FF4D30]" : ""}>
                  Até 49 anos: 10 anos
                </li>
                <li className={resultado.validadeAnos === 5 ? "font-bold text-[#FF4D30]" : ""}>
                  De 50 a 69 anos: 5 anos
                </li>
                <li className={resultado.validadeAnos === 3 ? "font-bold text-[#FF4D30]" : ""}>
                  Acima de 70 anos: 3 anos
                </li>
              </ul>
            </div>
          </div>

          {/* Calendário de licenciamento */}
          <div className="bg-[#0F172A] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Calendário de Licenciamento por Final de Placa
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(MESES_LICENCIAMENTO).map(([digit, mes]) => (
                <div
                  key={digit}
                  className={`rounded-xl px-3 py-2 text-center text-sm ${
                    parseInt(digit) === resultado.finalPlaca
                      ? "bg-[#FF4D30] text-white font-bold"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <span className="block text-lg font-bold">{digit}</span>
                  <span className="block text-xs">{mes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
