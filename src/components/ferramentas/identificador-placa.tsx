"use client";

import { useState } from "react";

const PLACA_ANTIGA = /^[A-Z]{3}[0-9]{4}$/;
const PLACA_MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

type PadraoPlaca = "mercosul" | "antigo";

interface CorPlaca {
  nome: string;
  fundo: string;
  texto: string;
  significado: string;
}

const CORES_PLACA: Record<string, CorPlaca> = {
  cinza_particular: {
    nome: "Cinza (Particular)",
    fundo: "#A0A0A0",
    texto: "#FFFFFF",
    significado: "Veículo particular — uso pessoal ou familiar.",
  },
  vermelha_comercial: {
    nome: "Vermelha (Comercial)",
    fundo: "#C0392B",
    texto: "#FFFFFF",
    significado: "Veículo de aluguel, táxi ou transporte remunerado.",
  },
  branca_mercosul: {
    nome: "Branca (Mercosul)",
    fundo: "#FFFFFF",
    texto: "#1E3A5F",
    significado: "Padrão unificado Mercosul — aplicável a todos os tipos de veículo.",
  },
};

interface Resultado {
  placa: string;
  padrao: PadraoPlaca;
  formatada: string;
  valida: boolean;
  categoria: string;
  cor: CorPlaca;
}

function identificarPlaca(placa: string): Resultado | null {
  const limpa = placa.replace(/[^A-Z0-9]/g, "").toUpperCase();

  if (PLACA_MERCOSUL.test(limpa)) {
    return {
      placa: limpa,
      padrao: "mercosul",
      formatada: limpa.slice(0, 3) + limpa.slice(3, 4) + limpa.slice(4, 5) + limpa.slice(5),
      valida: true,
      categoria: "Veículo automotor (padrão Mercosul)",
      cor: CORES_PLACA.branca_mercosul,
    };
  }

  if (PLACA_ANTIGA.test(limpa)) {
    return {
      placa: limpa,
      padrao: "antigo",
      formatada: limpa.slice(0, 3) + "-" + limpa.slice(3),
      valida: true,
      categoria: "Veículo automotor (padrão antigo brasileiro)",
      cor: CORES_PLACA.cinza_particular,
    };
  }

  return null;
}

function PlacaVisual({
  resultado,
}: {
  resultado: Resultado;
}) {
  if (resultado.padrao === "mercosul") {
    return (
      <div className="flex justify-center">
        <div className="relative w-[320px] h-[110px] rounded-lg border-[3px] border-[#1E3A5F] bg-white overflow-hidden shadow-lg">
          {/* Faixa azul superior Mercosul */}
          <div className="absolute top-0 left-0 right-0 h-[30px] bg-[#003399] flex items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              </div>
              <span className="text-white text-[10px] font-bold tracking-wider">MERCOSUL</span>
            </div>
            <div className="flex items-center">
              <svg viewBox="0 0 30 20" className="w-7 h-5">
                <rect width="30" height="20" fill="#009B3A" rx="1" />
                <polygon points="15,2 28,10 15,18 2,10" fill="#FEDF00" />
                <circle cx="15" cy="10" r="5" fill="#002776" />
              </svg>
            </div>
          </div>
          {/* Caracteres da placa */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
            <span className="text-[#1E3A5F] text-[48px] font-bold font-mono tracking-[0.15em] leading-none">
              {resultado.formatada}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Padrão antigo
  return (
    <div className="flex justify-center">
      <div className="relative w-[320px] h-[110px] rounded-lg border-[3px] border-[#555] bg-[#3C3C3C] overflow-hidden shadow-lg">
        {/* Faixa superior cinza */}
        <div className="absolute top-0 left-0 right-0 h-[26px] bg-[#555] flex items-center justify-between px-3">
          <span className="text-gray-300 text-[9px] font-bold tracking-wider">BRASIL</span>
          <svg viewBox="0 0 30 20" className="w-6 h-4">
            <rect width="30" height="20" fill="#009B3A" rx="1" />
            <polygon points="15,2 28,10 15,18 2,10" fill="#FEDF00" />
            <circle cx="15" cy="10" r="5" fill="#002776" />
          </svg>
        </div>
        {/* Caracteres da placa */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span className="text-white text-[48px] font-bold font-mono tracking-[0.15em] leading-none">
            {resultado.formatada}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function IdentificadorPlaca() {
  const [placa, setPlaca] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 7);
    setPlaca(valor);
    setErro("");
    setResultado(null);
  }

  function identificar() {
    if (placa.length < 7) {
      setErro("A placa deve ter 7 caracteres (3 letras + 4 alfanuméricos).");
      return;
    }

    const res = identificarPlaca(placa);

    if (!res) {
      setErro(
        "Placa inválida. Formatos aceitos: ABC1234 (antigo) ou ABC1D23 (Mercosul)."
      );
      return;
    }

    setResultado(res);
    setErro("");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Input */}
      <div>
        <label
          htmlFor="placa-input"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Placa do Veículo
        </label>
        <input
          id="placa-input"
          type="text"
          maxLength={7}
          placeholder="Ex: ABC1D23 ou ABC1234"
          value={placa}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg font-mono tracking-widest uppercase transition-colors"
        />
        <p className="text-xs text-[#64748B] mt-1">
          {placa.length}/7 caracteres &mdash; apenas letras e números
        </p>
      </div>

      {erro && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          {erro}
        </div>
      )}

      {/* Botão */}
      <button
        type="button"
        onClick={identificar}
        disabled={placa.length !== 7}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Identificar Placa
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Visualização da placa */}
          <PlacaVisual resultado={resultado} />

          {/* Informações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Padrão */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Padrão da Placa
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.padrao === "mercosul" ? "Mercosul" : "Antigo (Brasileiro)"}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                {resultado.padrao === "mercosul"
                  ? "Formato ABC1D23 — padrão unificado desde 2018"
                  : "Formato ABC-1234 — utilizado até 2018"}
              </p>
            </div>

            {/* Validação */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h4 className="text-sm font-semibold text-green-800 mb-1">
                Validação
              </h4>
              <p className="text-xl font-bold text-green-700">
                Placa Válida
              </p>
              <p className="text-xs text-green-600 mt-1">
                O formato da placa está correto e segue o padrão {resultado.padrao === "mercosul" ? "Mercosul" : "antigo"}
              </p>
            </div>

            {/* Categoria */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Categoria Provável
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.categoria}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Classificação com base no formato da placa
              </p>
            </div>

            {/* Cor e significado */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Cor da Placa e Significado
              </h4>
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-8 h-5 rounded border border-gray-300"
                  style={{ backgroundColor: resultado.cor.fundo }}
                />
                <p className="text-xl font-bold text-[#0F172A]">
                  {resultado.cor.nome}
                </p>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                {resultado.cor.significado}
              </p>
            </div>
          </div>

          {/* Formatação visual */}
          <div className="bg-[#0F172A] rounded-2xl p-6 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Placa Formatada
            </p>
            <p className="text-2xl md:text-3xl font-bold font-mono text-white tracking-[0.3em]">
              {resultado.formatada}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
