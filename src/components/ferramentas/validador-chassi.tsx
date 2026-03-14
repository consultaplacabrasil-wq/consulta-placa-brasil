"use client";

import { useState } from "react";

const TRANSLITERACOES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

const PESOS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const CARACTERES_VALIDOS = /^[A-HJ-NPR-Z0-9]+$/;

const WMI_PAISES: Record<string, string> = {
  "1": "Estados Unidos",
  "2": "Canadá",
  "3": "México",
  "6": "Austrália",
  "9": "Brasil",
  J: "Japão",
  K: "Coreia do Sul",
  L: "China",
  S: "Reino Unido",
  V: "França / Espanha",
  W: "Alemanha",
  Z: "Itália",
};

const VIN_ANO: Record<string, number> = {
  A: 2010, B: 2011, C: 2012, D: 2013, E: 2014,
  F: 2015, G: 2016, H: 2017, J: 2018, K: 2019,
  L: 2020, M: 2021, N: 2022, P: 2023, R: 2024,
  S: 2025, T: 2026, V: 2027, W: 2028, X: 2029,
  Y: 2030, "1": 2031, "2": 2032, "3": 2033,
  "4": 2034, "5": 2035, "6": 2036, "7": 2037,
  "8": 2038, "9": 2039,
};

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

interface CheckResult {
  nome: string;
  descricao: string;
  passou: boolean;
  detalhe: string;
}

interface ValidacaoResultado {
  valido: boolean;
  checks: CheckResult[];
  digitoCalculado: string;
  digitoInformado: string;
  pais: string | null;
  anoModelo: number | null;
}

export default function ValidadorChassi() {
  const [chassi, setChassi] = useState("");
  const [resultado, setResultado] = useState<ValidacaoResultado | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value.toUpperCase().replace(/[IOQ]/g, "").replace(/[^A-Z0-9]/g, "");
    setChassi(valor.slice(0, 17));
    setResultado(null);
  }

  function validar() {
    const checks: CheckResult[] = [];

    // Check 1: Comprimento
    const checkComprimento = chassi.length === 17;
    checks.push({
      nome: "Comprimento",
      descricao: "O chassi deve ter exatamente 17 caracteres",
      passou: checkComprimento,
      detalhe: checkComprimento
        ? "17 caracteres informados"
        : `${chassi.length} caracteres informados (esperado: 17)`,
    });

    // Check 2: Caracteres proibidos (I, O, Q)
    const temProibidos = /[IOQ]/.test(chassi);
    checks.push({
      nome: "Caracteres proibidos",
      descricao: "Não pode conter as letras I, O ou Q",
      passou: !temProibidos,
      detalhe: !temProibidos
        ? "Nenhum caractere proibido encontrado"
        : "Contém letras I, O ou Q (confundíveis com 1, 0 ou 9)",
    });

    // Check 3: Caracteres válidos
    const caracteresOk = CARACTERES_VALIDOS.test(chassi) && chassi.length > 0;
    checks.push({
      nome: "Caracteres válidos",
      descricao: "Somente A-H, J-N, P, R-Z e 0-9 são permitidos",
      passou: caracteresOk,
      detalhe: caracteresOk
        ? "Todos os caracteres são válidos conforme ISO 3779"
        : "Contém caracteres inválidos para o padrão VIN",
    });

    // Check 4: Dígito verificador (apenas se os checks anteriores passaram)
    let digitoCalculado = "";
    let digitoInformado = "";
    let digitoOk = false;

    if (checkComprimento && !temProibidos && caracteresOk) {
      digitoCalculado = calcularDigitoVerificador(chassi);
      digitoInformado = chassi[8];
      digitoOk = digitoCalculado === digitoInformado;
    }

    checks.push({
      nome: "Dígito verificador (posição 9)",
      descricao: "O 9º caractere deve corresponder ao cálculo ISO 3779",
      passou: digitoOk,
      detalhe: checkComprimento && !temProibidos && caracteresOk
        ? digitoOk
          ? `Dígito informado: ${digitoInformado} — confere com o cálculo`
          : `Dígito informado: ${digitoInformado} — esperado: ${digitoCalculado}`
        : "Não foi possível calcular (erros nos checks anteriores)",
    });

    const todosPassaram = checks.every((c) => c.passou);

    // Informações bônus
    let pais: string | null = null;
    let anoModelo: number | null = null;

    if (todosPassaram) {
      const primeiroChar = chassi[0];
      pais = WMI_PAISES[primeiroChar] ?? null;
      const charAno = chassi[9];
      anoModelo = VIN_ANO[charAno] ?? null;
    }

    setResultado({
      valido: todosPassaram,
      checks,
      digitoCalculado,
      digitoInformado,
      pais,
      anoModelo,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Input */}
      <div>
        <label
          htmlFor="validador-chassi-input"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Número do Chassi (VIN)
        </label>
        <input
          id="validador-chassi-input"
          type="text"
          maxLength={17}
          placeholder="Ex: 9BWZZZ377VT004251"
          value={chassi}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg font-mono tracking-widest uppercase transition-colors"
        />
        <p className="text-xs text-[#64748B] mt-1">
          {chassi.length}/17 caracteres - letras I, O e Q são filtradas automaticamente
        </p>
      </div>

      {/* Botão */}
      <button
        type="button"
        onClick={validar}
        disabled={chassi.length === 0}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Validar Chassi
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          {/* Card principal — Válido ou Inválido */}
          <div
            className={`rounded-2xl p-8 text-center border-2 ${
              resultado.valido
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                resultado.valido ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {resultado.valido ? (
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                resultado.valido ? "text-green-700" : "text-red-700"
              }`}
            >
              {resultado.valido ? "Chassi Válido" : "Chassi Inválido"}
            </h2>
            <p
              className={`text-sm ${
                resultado.valido ? "text-green-600" : "text-red-600"
              }`}
            >
              {resultado.valido
                ? "O número de chassi informado passou em todas as verificações."
                : "O número de chassi informado não passou em uma ou mais verificações."}
            </p>
            <p className="text-lg font-mono tracking-[0.3em] mt-4 text-[#0F172A] font-bold">
              {chassi}
            </p>
          </div>

          {/* Detalhamento dos checks */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
              Detalhamento da Validação
            </h3>
            <div className="space-y-3">
              {resultado.checks.map((check, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border flex items-start gap-3 ${
                    check.passou
                      ? "bg-white border-green-100"
                      : "bg-white border-red-100"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                      check.passou ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {check.passou ? (
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0F172A] text-sm">
                      {check.nome}
                    </p>
                    <p className="text-xs text-[#64748B] mb-1">
                      {check.descricao}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        check.passou ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {check.detalhe}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informações bônus (se válido) */}
          {resultado.valido && (
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
                Informações Básicas Identificadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-[#64748B] uppercase mb-1">
                    País de Origem (WMI)
                  </p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {resultado.pais ?? "Não identificado"}
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    Primeiro caractere: {chassi[0]}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-[#64748B] uppercase mb-1">
                    Ano do Modelo (posição 10)
                  </p>
                  <p className="text-xl font-bold text-[#0F172A]">
                    {resultado.anoModelo ?? "Não identificado"}
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    Código: {chassi[9]}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] mt-4">
                Para informações detalhadas (fabricante, modelo, seções WMI/VDS/VIS), utilize o{" "}
                <a href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
                  Decodificador de Chassi
                </a>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
