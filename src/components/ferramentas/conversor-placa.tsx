"use client";

import { useState } from "react";

type Direcao = "antiga-mercosul" | "mercosul-antiga";

const ANTIGO_REGEX = /^[A-Z]{3}-?[0-9]{4}$/;
const MERCOSUL_REGEX = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

const DIGITO_PARA_LETRA: Record<string, string> = {
  "0": "A",
  "1": "B",
  "2": "C",
  "3": "D",
  "4": "E",
  "5": "F",
  "6": "G",
  "7": "H",
  "8": "I",
  "9": "J",
};

const LETRA_PARA_DIGITO: Record<string, string> = {
  A: "0",
  B: "1",
  C: "2",
  D: "3",
  E: "4",
  F: "5",
  G: "6",
  H: "7",
  I: "8",
  J: "9",
};

function converterAntigaParaMercosul(placa: string): string | null {
  const limpa = placa.replace("-", "");
  if (!/^[A-Z]{3}[0-9]{4}$/.test(limpa)) return null;
  const letras = limpa.slice(0, 3);
  const d1 = limpa[3];
  const d2 = limpa[4];
  const d3 = limpa[5];
  const d4 = limpa[6];
  const letraMercosul = DIGITO_PARA_LETRA[d2];
  return `${letras}${d1}${letraMercosul}${d3}${d4}`;
}

function converterMercosulParaAntiga(placa: string): string | null {
  if (!MERCOSUL_REGEX.test(placa)) return null;
  const letras = placa.slice(0, 3);
  const d1 = placa[3];
  const letraMeio = placa[4];
  const d3 = placa[5];
  const d4 = placa[6];
  const digito = LETRA_PARA_DIGITO[letraMeio];
  if (digito === undefined) return null;
  return `${letras}-${d1}${digito}${d3}${d4}`;
}

/* ─── Renderização visual das placas (CSS only) ─── */

function PlacaMercosul({ placa }: { placa: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-semibold text-[#64748B] mb-2">Placa Mercosul</span>
      <div className="relative w-[280px] h-[100px] rounded-lg border-[3px] border-[#003580] bg-white overflow-hidden shadow-lg">
        {/* Faixa azul superior */}
        <div className="absolute top-0 left-0 right-0 h-[26px] bg-[#003399] flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            </div>
            <span className="text-white text-[10px] font-bold tracking-wider">
              BRASIL
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[3px] h-4 bg-[#009B3A] rounded-sm" />
            <div className="w-[3px] h-4 bg-[#FEDF00] rounded-sm" />
            <div className="w-[3px] h-4 bg-[#002776] rounded-sm" />
          </div>
        </div>
        {/* Caracteres */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span className="text-[#003580] text-[40px] font-bold font-mono tracking-[0.12em] leading-none">
            {placa}
          </span>
        </div>
      </div>
    </div>
  );
}

function PlacaAntiga({ placa }: { placa: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-semibold text-[#64748B] mb-2">Placa Antiga</span>
      <div className="relative w-[280px] h-[100px] rounded-lg border-[3px] border-[#555] bg-[#444] overflow-hidden shadow-lg">
        {/* Faixa vermelha superior */}
        <div className="absolute top-0 left-0 right-0 h-[24px] bg-[#C0392B] flex items-center justify-between px-3">
          <span className="text-gray-200 text-[9px] font-bold tracking-wider">
            BRASIL
          </span>
          <svg viewBox="0 0 30 20" className="w-6 h-4">
            <rect width="30" height="20" fill="#009B3A" rx="1" />
            <polygon points="15,2 28,10 15,18 2,10" fill="#FEDF00" />
            <circle cx="15" cy="10" r="5" fill="#002776" />
          </svg>
        </div>
        {/* Caracteres */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span className="text-white text-[40px] font-bold font-mono tracking-[0.12em] leading-none">
            {placa}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */

export default function ConversorPlaca() {
  const [placa, setPlaca] = useState("");
  const [direcao, setDirecao] = useState<Direcao>("antiga-mercosul");
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState("");
  const [convertido, setConvertido] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = e.target.value.toUpperCase();
    if (direcao === "antiga-mercosul") {
      valor = valor.replace(/[^A-Z0-9-]/g, "").slice(0, 8);
    } else {
      valor = valor.replace(/[^A-Z0-9]/g, "").slice(0, 7);
    }
    setPlaca(valor);
    setErro("");
    setResultado(null);
    setConvertido(false);
  }

  function handleDirecaoChange(novaDirecao: Direcao) {
    setDirecao(novaDirecao);
    setPlaca("");
    setErro("");
    setResultado(null);
    setConvertido(false);
  }

  function handleConverter() {
    if (direcao === "antiga-mercosul") {
      if (!ANTIGO_REGEX.test(placa)) {
        setErro("Formato inválido. Use o formato antigo: ABC-1234 ou ABC1234 (3 letras + 4 números).");
        return;
      }
      const convertida = converterAntigaParaMercosul(placa);
      if (convertida) {
        setResultado(convertida);
        setConvertido(true);
      }
    } else {
      if (!MERCOSUL_REGEX.test(placa)) {
        setErro("Formato inválido. Use o formato Mercosul: ABC1D23 (3 letras, 1 número, 1 letra, 2 números).");
        return;
      }
      const letraMeio = placa[4];
      if (!(letraMeio in LETRA_PARA_DIGITO)) {
        setErro(`A 5ª posição deve ser uma letra entre A e J (encontrada: ${letraMeio}). Somente letras de A a J possuem correspondência com dígitos no padrão antigo.`);
        return;
      }
      const convertida = converterMercosulParaAntiga(placa);
      if (convertida) {
        setResultado(convertida);
        setConvertido(true);
      }
    }
  }

  const placeholderInput =
    direcao === "antiga-mercosul" ? "Ex: ABC-1234 ou ABC1234" : "Ex: ABC1C34";

  const formatoEsperado =
    direcao === "antiga-mercosul"
      ? "ABC-1234 ou ABC1234 (3 letras + 4 números)"
      : "ABC1D23 (3 letras, 1 número, 1 letra, 2 números)";

  const placaAntigaExibida =
    direcao === "antiga-mercosul"
      ? (placa ? (placa.includes("-") ? placa : placa.slice(0, 3) + "-" + placa.slice(3)) : "ABC-1234")
      : (resultado || "ABC-1234");

  const placaMercosulExibida =
    direcao === "antiga-mercosul"
      ? (resultado || "ABC1C34")
      : (placa || "ABC1C34");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      {/* Toggle de direção */}
      <div>
        <label className="block text-sm font-semibold text-[#0F172A] mb-3">
          Direção da Conversão
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <label
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
              direcao === "antiga-mercosul"
                ? "border-[#FF4D30] bg-[#FF4D30]/5 text-[#FF4D30] font-semibold"
                : "border-gray-200 text-[#475569] hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="direcao-conversao"
              value="antiga-mercosul"
              checked={direcao === "antiga-mercosul"}
              onChange={() => handleDirecaoChange("antiga-mercosul")}
              className="accent-[#FF4D30]"
            />
            Antiga → Mercosul
          </label>
          <label
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
              direcao === "mercosul-antiga"
                ? "border-[#FF4D30] bg-[#FF4D30]/5 text-[#FF4D30] font-semibold"
                : "border-gray-200 text-[#475569] hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="direcao-conversao"
              value="mercosul-antiga"
              checked={direcao === "mercosul-antiga"}
              onChange={() => handleDirecaoChange("mercosul-antiga")}
              className="accent-[#FF4D30]"
            />
            Mercosul → Antiga
          </label>
        </div>
      </div>

      {/* Input da placa */}
      <div>
        <label
          htmlFor="placa-conversor"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          {direcao === "antiga-mercosul"
            ? "Placa no Formato Antigo"
            : "Placa no Formato Mercosul"}
        </label>
        <input
          id="placa-conversor"
          type="text"
          maxLength={direcao === "antiga-mercosul" ? 8 : 7}
          placeholder={placeholderInput}
          value={placa}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg font-mono tracking-widest uppercase transition-colors"
        />
        <p className="text-xs text-[#64748B] mt-1">
          Formato esperado: {formatoEsperado}
        </p>
      </div>

      {/* Botão converter */}
      <button
        onClick={handleConverter}
        className="w-full py-3 px-6 bg-[#FF4D30] hover:bg-[#e8432a] text-white font-bold rounded-xl transition-colors shadow-sm"
      >
        Converter Placa
      </button>

      {/* Erro */}
      {erro && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          {erro}
        </div>
      )}

      {/* Resultado com sucesso */}
      {convertido && resultado && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Conversão realizada com sucesso!
        </div>
      )}

      {/* Visualização lado a lado */}
      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4 text-center">
          {convertido ? "Resultado da Conversão" : "Pré-visualização das Placas"}
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <PlacaAntiga placa={placaAntigaExibida} />
          {/* Seta de direção */}
          <div className="flex items-center text-[#FF4D30]">
            <svg className="w-8 h-8 rotate-90 sm:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <PlacaMercosul placa={placaMercosulExibida} />
        </div>
      </div>

      {/* Tabela de conversão */}
      <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
        <h4 className="text-sm font-semibold text-[#0F172A] mb-3">
          Tabela de Correspondência (2º dígito → letra)
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {Object.entries(DIGITO_PARA_LETRA).map(([digito, letra]) => (
            <div
              key={digito}
              className="bg-white rounded-lg border border-gray-100 py-2 px-1"
            >
              <span className="font-bold text-[#0F172A]">{digito}</span>
              <span className="text-[#64748B] mx-1">→</span>
              <span className="font-bold text-[#FF4D30]">{letra}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#64748B] mt-3">
          Na conversão para o padrão Mercosul, o 2º dígito (5ª posição) da placa antiga é substituído
          pela letra correspondente na tabela acima.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-[#64748B] mb-1">Formato Antigo</h4>
          <p className="text-lg font-bold text-[#0F172A]">ABC-1234</p>
          <p className="text-xs text-[#64748B] mt-1">
            3 letras + hífen + 4 números. Utilizado de 1990 a 2018.
          </p>
        </div>
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-[#64748B] mb-1">Formato Mercosul</h4>
          <p className="text-lg font-bold text-[#0F172A]">ABC1D23</p>
          <p className="text-xs text-[#64748B] mt-1">
            3 letras + 1 número + 1 letra + 2 números. Adotado desde 2018.
          </p>
        </div>
      </div>
    </div>
  );
}
