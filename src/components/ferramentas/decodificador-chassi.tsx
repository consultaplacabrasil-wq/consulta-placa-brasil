"use client";

import { useState } from "react";

const WMI_PAISES: Record<string, string> = {
  "9B": "Brasil",
  "9C": "Brasil",
  "9F": "Brasil",
  "1G": "EUA",
  "1F": "EUA",
  "2G": "Canadá",
  "3G": "México",
  WV: "Alemanha",
  WA: "Alemanha",
  VF: "França",
  ZA: "Itália",
  JH: "Japão",
  KN: "Coreia do Sul",
};

const WMI_FABRICANTES: Record<string, string> = {
  "9BW": "Volkswagen Brasil",
  "9BM": "Mercedes-Benz Brasil",
  "9BF": "Ford Brasil",
  "9BG": "General Motors Brasil",
  "9BH": "Honda Brasil",
  "9BR": "Renault Brasil",
  "9BS": "Scania Brasil",
};

const VIN_ANO: Record<string, number> = {
  F: 2015,
  G: 2016,
  H: 2017,
  J: 2018,
  K: 2019,
  L: 2020,
  M: 2021,
  N: 2022,
  P: 2023,
  R: 2024,
  S: 2025,
  T: 2026,
};

const TRANSLITERACOES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

const PESOS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

function calcularDigitoVerificador(vin: string): string {
  let soma = 0;
  for (let i = 0; i < 17; i++) {
    const char = vin[i];
    const valor = /\d/.test(char) ? parseInt(char, 10) : (TRANSLITERACOES[char] ?? 0);
    soma += valor * PESOS[i];
  }
  const resto = soma % 11;
  return resto === 10 ? "X" : String(resto);
}

interface Resultado {
  vin: string;
  pais: string | null;
  fabricante: string | null;
  anoModelo: number | null;
  digitoVerificador: string;
  digitoEsperado: string;
  digitoValido: boolean;
  wmi: string;
  vds: string;
  vis: string;
}

export default function DecodificadorChassi() {
  const [chassi, setChassi] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
    setChassi(valor.slice(0, 17));
    setErro("");
    setResultado(null);
  }

  function decodificar() {
    if (chassi.length !== 17) {
      setErro("O chassi deve ter exatamente 17 caracteres.");
      return;
    }

    if (/[IOQ]/.test(chassi)) {
      setErro("O chassi não pode conter as letras I, O ou Q.");
      return;
    }

    const wmi = chassi.slice(0, 3);
    const vds = chassi.slice(3, 9);
    const vis = chassi.slice(9, 17);
    const prefixoPais = chassi.slice(0, 2);
    const charAno = chassi[9];
    const digitoInformado = chassi[8];
    const digitoCalculado = calcularDigitoVerificador(chassi);

    setResultado({
      vin: chassi,
      pais: WMI_PAISES[prefixoPais] ?? null,
      fabricante: WMI_FABRICANTES[wmi] ?? null,
      anoModelo: VIN_ANO[charAno] ?? null,
      digitoVerificador: digitoInformado,
      digitoEsperado: digitoCalculado,
      digitoValido: digitoInformado === digitoCalculado,
      wmi,
      vds,
      vis,
    });
    setErro("");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Input */}
      <div>
        <label
          htmlFor="chassi-input"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Número do Chassi (VIN)
        </label>
        <input
          id="chassi-input"
          type="text"
          maxLength={17}
          placeholder="Ex: 9BWZZZ377VT004251"
          value={chassi}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg font-mono tracking-widest uppercase transition-colors"
        />
        <p className="text-xs text-[#64748B] mt-1">
          {chassi.length}/17 caracteres &mdash; letras I, O e Q não são permitidas
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
        onClick={decodificar}
        disabled={chassi.length !== 17}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Decodificar Chassi
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Posições decodificadas */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
              Estrutura do VIN
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-[#64748B] uppercase mb-1">
                  WMI (Posições 1-3)
                </p>
                <p className="text-2xl font-bold font-mono text-[#0F172A]">
                  {resultado.wmi}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  Identificação mundial do fabricante
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-[#64748B] uppercase mb-1">
                  VDS (Posições 4-9)
                </p>
                <p className="text-2xl font-bold font-mono text-[#0F172A]">
                  {resultado.vds}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  Descrição do veículo
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-[#64748B] uppercase mb-1">
                  VIS (Posições 10-17)
                </p>
                <p className="text-2xl font-bold font-mono text-[#0F172A]">
                  {resultado.vis}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  Identificação sequencial
                </p>
              </div>
            </div>
          </div>

          {/* Informações decodificadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* País */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                País de Fabricação
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.pais ?? "Não identificado"}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Prefixo: {resultado.vin.slice(0, 2)}
              </p>
            </div>

            {/* Fabricante */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Fabricante
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.fabricante ?? "Não identificado"}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                WMI: {resultado.wmi}
              </p>
            </div>

            {/* Ano do modelo */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
              <h4 className="text-sm font-semibold text-[#64748B] mb-1">
                Ano do Modelo
              </h4>
              <p className="text-xl font-bold text-[#0F172A]">
                {resultado.anoModelo ?? "Não identificado"}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Código: {resultado.vin[9]} (posição 10)
              </p>
            </div>

            {/* Dígito verificador */}
            <div
              className={`rounded-2xl p-5 border ${
                resultado.digitoValido
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              }`}
            >
              <h4
                className={`text-sm font-semibold mb-1 ${
                  resultado.digitoValido ? "text-green-800" : "text-red-800"
                }`}
              >
                Dígito Verificador (Posição 9)
              </h4>
              <p
                className={`text-xl font-bold ${
                  resultado.digitoValido ? "text-green-700" : "text-red-700"
                }`}
              >
                {resultado.digitoVerificador} &mdash;{" "}
                {resultado.digitoValido ? "Válido" : "Inválido"}
              </p>
              <p
                className={`text-xs mt-1 ${
                  resultado.digitoValido ? "text-green-600" : "text-red-600"
                }`}
              >
                {resultado.digitoValido
                  ? "O dígito verificador confere com o cálculo"
                  : `Esperado: ${resultado.digitoEsperado} — o chassi pode conter erro`}
              </p>
            </div>
          </div>

          {/* VIN completo destacado */}
          <div className="bg-[#0F172A] rounded-2xl p-6 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Chassi Completo
            </p>
            <p className="text-2xl md:text-3xl font-bold font-mono text-white tracking-[0.3em]">
              {resultado.vin}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
