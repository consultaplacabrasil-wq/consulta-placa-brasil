"use client";

import { useState, useMemo } from "react";

interface Parcela {
  id: number;
  valor: string;
  dataVencimento: string;
  dataPagamento: string;
  taxaJurosMora: string;
  multaAtraso: string;
}

interface ResultadoParcela {
  id: number;
  valorOriginal: number;
  diasAtraso: number;
  valorMulta: number;
  valorJurosMora: number;
  correcaoMonetaria: number;
  totalParcela: number;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcularDiasAtraso(vencimento: string, pagamento: string): number {
  const dataVenc = new Date(vencimento + "T00:00:00");
  const dataPag = new Date(pagamento + "T00:00:00");
  const diff = dataPag.getTime() - dataVenc.getTime();
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(dias, 0);
}

function getToday(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

let nextId = 1;

function criarParcela(): Parcela {
  return {
    id: nextId++,
    valor: "",
    dataVencimento: "",
    dataPagamento: getToday(),
    taxaJurosMora: "1",
    multaAtraso: "2",
  };
}

export default function CalculadoraAtrasoParcelas() {
  const [parcelas, setParcelas] = useState<Parcela[]>([criarParcela()]);
  const [calculado, setCalculado] = useState(false);

  function atualizarParcela(id: number, campo: keyof Parcela, valor: string) {
    setParcelas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
    setCalculado(false);
  }

  function adicionarParcela() {
    setParcelas((prev) => [...prev, criarParcela()]);
    setCalculado(false);
  }

  function removerParcela(id: number) {
    if (parcelas.length <= 1) return;
    setParcelas((prev) => prev.filter((p) => p.id !== id));
    setCalculado(false);
  }

  function limparTudo() {
    nextId = 1;
    setParcelas([criarParcela()]);
    setCalculado(false);
  }

  const resultados: ResultadoParcela[] = useMemo(() => {
    if (!calculado) return [];

    return parcelas
      .map((p) => {
        const valorOriginal = parseFloat(p.valor.replace(/\D/g, "")) / 100 || 0;
        if (valorOriginal <= 0 || !p.dataVencimento || !p.dataPagamento) {
          return null;
        }

        const diasAtraso = calcularDiasAtraso(p.dataVencimento, p.dataPagamento);
        const taxaMulta = parseFloat(p.multaAtraso.replace(",", ".")) || 0;
        const taxaJurosMensal = parseFloat(p.taxaJurosMora.replace(",", ".")) || 0;

        const multaEfetiva = Math.min(taxaMulta, 2);
        const valorMulta = diasAtraso > 0 ? valorOriginal * (multaEfetiva / 100) : 0;

        const taxaDiaria = taxaJurosMensal / 30 / 100;
        const valorJurosMora = valorOriginal * taxaDiaria * diasAtraso;

        const ipcaMensal = 0.5;
        const correcaoMonetaria =
          diasAtraso > 0
            ? valorOriginal * ((ipcaMensal / 100) * (diasAtraso / 30))
            : 0;

        const totalParcela =
          valorOriginal + valorMulta + valorJurosMora + correcaoMonetaria;

        return {
          id: p.id,
          valorOriginal,
          diasAtraso,
          valorMulta,
          valorJurosMora,
          correcaoMonetaria,
          totalParcela,
        };
      })
      .filter((r): r is ResultadoParcela => r !== null);
  }, [parcelas, calculado]);

  const grandTotal = useMemo(
    () => resultados.reduce((acc, r) => acc + r.totalParcela, 0),
    [resultados]
  );

  const totalOriginal = useMemo(
    () => resultados.reduce((acc, r) => acc + r.valorOriginal, 0),
    [resultados]
  );

  const totalAcrescimos = useMemo(
    () => grandTotal - totalOriginal,
    [grandTotal, totalOriginal]
  );

  function handleCurrencyInput(id: number, value: string) {
    const digits = value.replace(/\D/g, "");
    atualizarParcela(id, "valor", digits);
  }

  function displayCurrency(value: string): string {
    const num = parseInt(value) || 0;
    if (num === 0) return "";
    return (num / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handleCalcular() {
    setCalculado(true);
  }

  const podCalcular = parcelas.some(
    (p) =>
      parseFloat(p.valor.replace(/\D/g, "")) > 0 &&
      p.dataVencimento &&
      p.dataPagamento
  );

  return (
    <div className="space-y-8">
      {/* Parcelas */}
      {parcelas.map((parcela, index) => (
        <div
          key={parcela.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0F172A]">
              {parcelas.length > 1
                ? `Parcela ${index + 1}`
                : "Dados da Parcela"}
            </h2>
            {parcelas.length > 1 && (
              <button
                type="button"
                onClick={() => removerParcela(parcela.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Remover
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valor da parcela */}
            <div>
              <label
                htmlFor={`valor-${parcela.id}`}
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Valor da Parcela Original (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                  R$
                </span>
                <input
                  id={`valor-${parcela.id}`}
                  type="text"
                  inputMode="numeric"
                  value={displayCurrency(parcela.valor)}
                  onChange={(e) =>
                    handleCurrencyInput(parcela.id, e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                  placeholder="500,00"
                />
              </div>
            </div>

            {/* Data de vencimento */}
            <div>
              <label
                htmlFor={`vencimento-${parcela.id}`}
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Data de Vencimento
              </label>
              <input
                id={`vencimento-${parcela.id}`}
                type="date"
                value={parcela.dataVencimento}
                onChange={(e) =>
                  atualizarParcela(parcela.id, "dataVencimento", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              />
            </div>

            {/* Data de pagamento */}
            <div>
              <label
                htmlFor={`pagamento-${parcela.id}`}
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Data de Pagamento
              </label>
              <input
                id={`pagamento-${parcela.id}`}
                type="date"
                value={parcela.dataPagamento}
                onChange={(e) =>
                  atualizarParcela(parcela.id, "dataPagamento", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
              />
            </div>

            {/* Taxa de juros mora */}
            <div>
              <label
                htmlFor={`juros-${parcela.id}`}
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Taxa de Juros de Mora (% ao mês)
              </label>
              <div className="relative">
                <input
                  id={`juros-${parcela.id}`}
                  type="text"
                  inputMode="decimal"
                  value={parcela.taxaJurosMora}
                  onChange={(e) =>
                    atualizarParcela(parcela.id, "taxaJurosMora", e.target.value)
                  }
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                  placeholder="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                  %
                </span>
              </div>
            </div>

            {/* Multa por atraso */}
            <div className="md:col-span-2">
              <label
                htmlFor={`multa-${parcela.id}`}
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Multa por Atraso (%)
              </label>
              <div className="relative">
                <input
                  id={`multa-${parcela.id}`}
                  type="text"
                  inputMode="decimal"
                  value={parcela.multaAtraso}
                  onChange={(e) =>
                    atualizarParcela(parcela.id, "multaAtraso", e.target.value)
                  }
                  className="w-full md:w-1/2 pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/30 focus:border-[#FF4D30] transition-colors"
                  placeholder="2"
                />
                <span className="absolute right-3 md:right-[calc(50%+0.75rem)] top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                  %
                </span>
              </div>
              <p className="text-xs text-amber-600 mt-1.5">
                Conforme o CDC, a multa por atraso não pode ultrapassar 2% do valor da parcela.
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={adicionarParcela}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-gray-300 text-[#64748B] hover:border-[#FF4D30] hover:text-[#FF4D30] transition-colors font-semibold text-sm"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Adicionar outra parcela
        </button>

        <button
          type="button"
          onClick={handleCalcular}
          disabled={!podCalcular}
          className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#FF4D30] text-white font-bold text-sm hover:bg-[#e5432a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Calcular Atraso
        </button>

        <button
          type="button"
          onClick={limparTudo}
          className="text-sm text-[#FF4D30] hover:underline font-medium px-4 py-3"
        >
          Limpar tudo
        </button>
      </div>

      {/* Resultados */}
      {calculado && resultados.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Resultado</h2>

          {/* Cards por parcela */}
          {resultados.map((r, index) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">
                {resultados.length > 1
                  ? `Parcela ${index + 1}`
                  : "Detalhamento"}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Valor Original
                  </p>
                  <p className="text-lg font-bold text-[#0F172A]">
                    {formatCurrency(r.valorOriginal)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Dias em Atraso
                  </p>
                  <p className="text-lg font-bold text-[#0F172A]">
                    {r.diasAtraso} {r.diasAtraso === 1 ? "dia" : "dias"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Multa (2%)
                  </p>
                  <p className="text-lg font-bold text-red-500">
                    {formatCurrency(r.valorMulta)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Juros de Mora
                  </p>
                  <p className="text-lg font-bold text-red-500">
                    {formatCurrency(r.valorJurosMora)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Correção Monetária
                  </p>
                  <p className="text-lg font-bold text-amber-600">
                    {formatCurrency(r.correcaoMonetaria)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Total Atualizado
                  </p>
                  <p className="text-lg font-bold text-[#FF4D30]">
                    {formatCurrency(r.totalParcela)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className="bg-[#0F172A] rounded-2xl p-6 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Total Original
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalOriginal)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Total de Acréscimos
                </p>
                <p className="text-2xl font-bold text-red-400">
                  {formatCurrency(totalAcrescimos)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Valor Total a Pagar
                </p>
                <p className="text-2xl font-bold text-[#FF4D30]">
                  {formatCurrency(grandTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Aviso legal */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Importante:</strong> conforme o Código de Defesa do
              Consumidor (CDC), a multa por atraso não pode ultrapassar 2% do
              valor da parcela. A correção monetária estimada utiliza o IPCA
              médio de aproximadamente 0,5% ao mês, de forma proporcional aos
              dias de atraso. Os valores apresentados são estimativas e podem
              variar conforme as condições contratuais.
            </p>
          </div>
        </div>
      )}

      {calculado && resultados.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-[#64748B]">
            Preencha pelo menos o valor e as datas de uma parcela para calcular.
          </p>
        </div>
      )}
    </div>
  );
}
