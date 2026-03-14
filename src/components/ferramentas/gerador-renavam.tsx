"use client";

import { useState, useCallback } from "react";

/**
 * Gera um RENAVAM válido de 11 dígitos.
 * Algoritmo: 9 dígitos aleatórios + 2 dígitos verificadores (módulo 11).
 * Pesos aplicados da direita para a esquerda: 3, 2, 9, 8, 7, 6, 5, 4, 3, 2.
 */
function gerarRenavam(): string {
  // Gerar 10 dígitos base (o 11º será o dígito verificador)
  const digitos: number[] = [];
  for (let i = 0; i < 10; i++) {
    digitos.push(Math.floor(Math.random() * 10));
  }

  // Pesos aplicados da direita para a esquerda
  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += digitos[i] * pesos[i];
  }

  const resto = (soma * 10) % 11;
  const digitoVerificador = resto >= 10 ? 0 : resto;

  digitos.push(digitoVerificador);
  return digitos.join("");
}

function formatarRenavam(renavam: string): string {
  // Formata como XXXX.XXXXXX-X
  return `${renavam.slice(0, 4)}.${renavam.slice(4, 10)}-${renavam.slice(10)}`;
}

export default function GeradorRenavam() {
  const [renavams, setRenavams] = useState<string[]>([]);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [copiadoTodos, setCopiadoTodos] = useState(false);

  const handleGerar = useCallback(() => {
    const novos: string[] = [];
    for (let i = 0; i < quantidade; i++) {
      novos.push(gerarRenavam());
    }
    setRenavams(novos);
    setCopiado(null);
    setCopiadoTodos(false);
  }, [quantidade]);

  const copiarUm = useCallback(async (renavam: string) => {
    try {
      await navigator.clipboard.writeText(renavam);
      setCopiado(renavam);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      /* fallback silencioso */
    }
  }, []);

  const copiarTodos = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(renavams.join("\n"));
      setCopiadoTodos(true);
      setTimeout(() => setCopiadoTodos(false), 2000);
    } catch {
      /* fallback silencioso */
    }
  }, [renavams]);

  const quantidades = [1, 5, 10];

  return (
    <div className="space-y-8">
      {/* Painel principal */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
        {/* Seleção de quantidade */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-3">
            Quantidade de RENAVAMs
          </label>
          <div className="flex gap-3">
            {quantidades.map((qtd) => (
              <button
                key={qtd}
                onClick={() => setQuantidade(qtd)}
                className={`px-5 py-3 rounded-xl border font-semibold transition-colors ${
                  quantidade === qtd
                    ? "border-[#FF4D30] bg-[#FF4D30]/5 text-[#FF4D30]"
                    : "border-gray-200 text-[#475569] hover:border-gray-300"
                }`}
              >
                {qtd}
              </button>
            ))}
          </div>
        </div>

        {/* Botão gerar */}
        <button
          onClick={handleGerar}
          className="w-full py-4 rounded-xl bg-[#FF4D30] hover:bg-[#e6442b] text-white font-bold text-lg transition-colors shadow-sm"
        >
          Gerar RENAVAM
        </button>

        {/* Resultados */}
        {renavams.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#0F172A]">
                {renavams.length === 1
                  ? "RENAVAM gerado"
                  : `${renavams.length} RENAVAMs gerados`}
              </h3>
              {renavams.length > 1 && (
                <button
                  onClick={copiarTodos}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#FF4D30] hover:text-[#e6442b] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {copiadoTodos ? "Copiados!" : "Copiar todos"}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {renavams.map((renavam, index) => (
                <div
                  key={`${renavam}-${index}`}
                  className="flex items-center justify-between bg-[#F8FAFC] rounded-xl border border-gray-100 px-5 py-4"
                >
                  <div>
                    <span className="text-lg font-mono font-bold text-[#0F172A] tracking-wide">
                      {formatarRenavam(renavam)}
                    </span>
                    <span className="block text-xs text-[#64748B] mt-0.5">
                      {renavam}
                    </span>
                  </div>
                  <button
                    onClick={() => copiarUm(renavam)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#475569] hover:border-[#FF4D30] hover:text-[#FF4D30] transition-colors"
                    title="Copiar RENAVAM"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {copiado === renavam ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explicação do algoritmo */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">
          Como funciona o algoritmo de geração do RENAVAM?
        </h3>
        <p className="text-[#475569] leading-relaxed">
          O RENAVAM (Registro Nacional de Veículos Automotores) é composto por 11
          dígitos numéricos. Os 10 primeiros dígitos formam a base do registro, e o
          último dígito é o verificador, calculado pelo algoritmo de módulo 11.
        </p>

        <div className="bg-[#F8FAFC] rounded-xl border border-gray-100 p-5 space-y-3">
          <h4 className="text-sm font-bold text-[#0F172A]">
            Passo a passo do cálculo:
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[#475569]">
            <li>
              <strong>Gerar 10 dígitos base:</strong> Os primeiros 10 dígitos são
              gerados aleatoriamente (de 0 a 9).
            </li>
            <li>
              <strong>Aplicar os pesos:</strong> Cada dígito é multiplicado pelo
              peso correspondente, da esquerda para a direita:{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-[#0F172A] font-mono text-xs">
                3, 2, 9, 8, 7, 6, 5, 4, 3, 2
              </code>
            </li>
            <li>
              <strong>Somar os produtos:</strong> Todos os resultados das
              multiplicações são somados.
            </li>
            <li>
              <strong>Calcular o dígito verificador:</strong> Multiplica-se a soma
              por 10 e aplica-se o módulo 11. Se o resultado for maior ou igual a 10,
              o dígito verificador será 0.
            </li>
            <li>
              <strong>Montar o RENAVAM:</strong> Os 10 dígitos base são concatenados
              com o dígito verificador, formando o número completo de 11 dígitos.
            </li>
          </ol>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl border border-gray-100 p-5">
          <h4 className="text-sm font-bold text-[#0F172A] mb-2">
            Exemplo prático:
          </h4>
          <div className="text-sm text-[#475569] space-y-1">
            <p>
              Dígitos base:{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-[#0F172A] font-mono text-xs">
                7 3 2 8 1 0 5 6 4 9
              </code>
            </p>
            <p>
              Pesos:{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-[#0F172A] font-mono text-xs">
                3 2 9 8 7 6 5 4 3 2
              </code>
            </p>
            <p>
              Produtos: 21 + 6 + 18 + 64 + 7 + 0 + 25 + 24 + 12 + 18 ={" "}
              <strong>195</strong>
            </p>
            <p>
              Dígito verificador: (195 &times; 10) mod 11 = 1950 mod 11 ={" "}
              <strong>3</strong>
            </p>
            <p>
              RENAVAM final:{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-[#0F172A] font-mono text-xs">
                73281056493
              </code>
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl border border-amber-100 p-5">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Aviso:</strong> Esta ferramenta tem como objetivo ajudar
            estudantes, programadores, analistas e testadores a gerar números de
            RENAVAM válidos para testar softwares em desenvolvimento. Os números são
            gerados de forma aleatória, respeitando as regras de criação do documento.
            A má utilização dos dados gerados é de total responsabilidade do usuário.
          </p>
        </div>
      </div>
    </div>
  );
}
