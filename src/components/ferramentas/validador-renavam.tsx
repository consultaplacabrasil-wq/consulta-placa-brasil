"use client";

import { useState } from "react";

interface ResultadoValidacao {
  valido: boolean;
  digitos: number[];
  pesos: number[];
  produtos: number[];
  soma: number;
  resto: number;
  digitoEsperado: number;
  digitoInformado: number;
}

function validarRenavam(renavam: string): ResultadoValidacao | null {
  if (renavam.length !== 11) return null;

  const digitos = renavam.split("").map(Number);
  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Os primeiros 10 dígitos são usados no cálculo
  const primeiros10 = digitos.slice(0, 10);
  // Aplicar pesos da direita para a esquerda nos primeiros 10 dígitos
  const produtos = primeiros10.map((d, i) => {
    const pesoIndex = pesos.length - 1 - (primeiros10.length - 1 - i);
    return d * pesos[pesoIndex];
  });

  const soma = produtos.reduce((acc, val) => acc + val, 0);
  const resto = soma % 11;
  const digitoEsperado = resto >= 10 ? 0 : resto;
  const digitoInformado = digitos[10];

  return {
    valido: digitoEsperado === digitoInformado,
    digitos,
    pesos,
    produtos,
    soma,
    resto,
    digitoEsperado,
    digitoInformado,
  };
}

export default function ValidadorRenavam() {
  const [renavam, setRenavam] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<ResultadoValidacao | null>(null);

  function handleValidar() {
    setErro("");
    setResultado(null);

    const limpo = renavam.replace(/\D/g, "");

    if (!limpo) {
      setErro("Por favor, digite o número do RENAVAM.");
      return;
    }

    if (limpo.length !== 11) {
      setErro("O RENAVAM deve conter exatamente 11 dígitos.");
      return;
    }

    const res = validarRenavam(limpo);
    if (!res) {
      setErro("Não foi possível validar o RENAVAM informado.");
      return;
    }

    setResultado(res);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Input */}
      <div>
        <label
          htmlFor="renavam-input"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Número do RENAVAM
        </label>
        <input
          id="renavam-input"
          type="text"
          inputMode="numeric"
          maxLength={11}
          placeholder="Ex: 63abornar19"
          value={renavam}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 11);
            setRenavam(val);
            setErro("");
            setResultado(null);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors text-center text-xl tracking-[0.3em] font-mono"
        />
        <p className="text-xs text-[#64748B] mt-1">
          Digite os 11 dígitos numéricos do RENAVAM
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
        onClick={handleValidar}
        className="mt-6 w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Validar RENAVAM
      </button>

      {/* Resultado */}
      {resultado && (
        <div className="mt-8 space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setRenavam("");
                setErro("");
                setResultado(null);
              }}
              className="text-sm text-[#FF4D30] hover:underline font-medium"
            >
              Limpar tudo
            </button>
          </div>

          {/* Card principal de resultado */}
          {resultado.valido ? (
            <div className="rounded-2xl p-6 border-2 bg-green-50 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-green-800">
                  RENAVAM Válido
                </h3>
              </div>
              <p className="text-sm text-green-700">
                O dígito verificador confere. O número {renavam} possui estrutura
                numérica válida segundo o algoritmo módulo 11.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl p-6 border-2 bg-red-50 border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-red-800">
                  RENAVAM Inválido
                </h3>
              </div>
              <p className="text-sm text-red-700">
                O dígito verificador não confere. O 11.º dígito informado
                é <strong>{resultado.digitoInformado}</strong>, mas o dígito
                esperado pelo algoritmo módulo 11
                é <strong>{resultado.digitoEsperado}</strong>.
              </p>
            </div>
          )}

          {/* Detalhamento do cálculo */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
            <h4 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
              Detalhamento do Cálculo (Módulo 11)
            </h4>

            {/* Tabela de dígitos, pesos e produtos */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="text-[#64748B]">
                    <th className="pb-2 font-semibold">Posição</th>
                    {resultado.digitos.slice(0, 10).map((_, i) => (
                      <th key={i} className="pb-2 font-semibold">
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#0F172A] font-mono">
                    <td className="py-1 text-[#64748B] font-sans font-semibold text-left pr-2">
                      Dígito
                    </td>
                    {resultado.digitos.slice(0, 10).map((d, i) => (
                      <td key={i} className="py-1">
                        {d}
                      </td>
                    ))}
                  </tr>
                  <tr className="text-[#475569] font-mono">
                    <td className="py-1 text-[#64748B] font-sans font-semibold text-left pr-2">
                      Peso
                    </td>
                    {resultado.pesos.map((p, i) => (
                      <td key={i} className="py-1">
                        {p}
                      </td>
                    ))}
                  </tr>
                  <tr className="text-[#FF4D30] font-bold font-mono">
                    <td className="py-1 text-[#64748B] font-sans font-semibold text-left pr-2">
                      Produto
                    </td>
                    {resultado.produtos.map((p, i) => (
                      <td key={i} className="py-1">
                        {p}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Resumo */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                <p className="text-xs text-[#64748B] font-semibold">Soma</p>
                <p className="text-lg font-bold text-[#0F172A]">
                  {resultado.soma}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                <p className="text-xs text-[#64748B] font-semibold">
                  Resto (÷ 11)
                </p>
                <p className="text-lg font-bold text-[#0F172A]">
                  {resultado.resto}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                <p className="text-xs text-[#64748B] font-semibold">
                  Dígito Esperado
                </p>
                <p className="text-lg font-bold text-[#0F172A]">
                  {resultado.digitoEsperado}
                </p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                <p className="text-xs text-[#64748B] font-semibold">
                  Dígito Informado
                </p>
                <p
                  className={`text-lg font-bold ${
                    resultado.valido ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {resultado.digitoInformado}
                </p>
              </div>
            </div>

            {/* Explicação */}
            <p className="mt-4 text-xs text-[#64748B] leading-relaxed">
              O algoritmo multiplica cada um dos 10 primeiros dígitos do RENAVAM
              pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 (da direita para a
              esquerda), soma os produtos, calcula o resto da divisão por 11 e
              compara com o 11.º dígito. Se o resto for maior ou igual a 10, o
              dígito verificador é 0.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
