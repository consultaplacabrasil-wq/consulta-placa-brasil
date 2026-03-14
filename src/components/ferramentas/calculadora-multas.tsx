"use client";

import { useState, useMemo } from "react";
import { Search, AlertTriangle, Filter } from "lucide-react";

interface Infracao {
  codigo: string;
  descricao: string;
  valor: number;
  pontos: number;
  gravidade: "leve" | "média" | "grave" | "gravíssima";
}

const infracoes: Infracao[] = [
  {
    codigo: "162-I",
    descricao: "Dirigir veículo sem possuir CNH ou Permissão para Dirigir",
    valor: 880.41,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "165",
    descricao: "Dirigir sob a influência de álcool ou substância psicoativa",
    valor: 2934.7,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "173",
    descricao: "Avançar o sinal vermelho do semáforo",
    valor: 293.47,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "175",
    descricao: "Excesso de velocidade superior a 50% acima da permitida",
    valor: 880.41,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "174-I",
    descricao: "Excesso de velocidade entre 20% e 50% acima da permitida",
    valor: 195.23,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "174-II",
    descricao: "Excesso de velocidade em até 20% acima da permitida",
    valor: 130.16,
    pontos: 4,
    gravidade: "média",
  },
  {
    codigo: "167",
    descricao: "Deixar de usar o cinto de segurança",
    valor: 293.47,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "244-V",
    descricao: "Conduzir motocicleta sem capacete de segurança",
    valor: 293.47,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "181-I",
    descricao: "Estacionar o veículo em local proibido pela sinalização",
    valor: 195.23,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "220-I",
    descricao: "Ultrapassar outro veículo em local proibido pela sinalização",
    valor: 293.47,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "163",
    descricao: "Dirigir com CNH vencida há mais de 30 dias",
    valor: 293.47,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "230-VI",
    descricao: "Conduzir veículo sem o licenciamento anual obrigatório",
    valor: 293.47,
    pontos: 7,
    gravidade: "gravíssima",
  },
  {
    codigo: "252-I",
    descricao: "Utilizar celular ao dirigir o veículo",
    valor: 293.47,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "193",
    descricao: "Deixar de dar preferência de passagem ao pedestre na faixa",
    valor: 293.47,
    pontos: 5,
    gravidade: "grave",
  },
  {
    codigo: "208",
    descricao: "Participar de racha ou competição não autorizada em via pública",
    valor: 880.41,
    pontos: 7,
    gravidade: "gravíssima",
  },
];

const gravidades = ["todas", "leve", "média", "grave", "gravíssima"] as const;

const gravidadeCores: Record<string, string> = {
  gravíssima: "bg-red-100 text-red-800 border-red-200",
  grave: "bg-orange-100 text-orange-800 border-orange-200",
  média: "bg-yellow-100 text-yellow-800 border-yellow-200",
  leve: "bg-green-100 text-green-800 border-green-200",
};

const gravidadeDot: Record<string, string> = {
  gravíssima: "bg-red-500",
  grave: "bg-orange-500",
  média: "bg-yellow-500",
  leve: "bg-green-500",
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CalculadoraMultas() {
  const [busca, setBusca] = useState("");
  const [gravidade, setGravidade] = useState<string>("todas");

  const resultados = useMemo(() => {
    return infracoes.filter((inf) => {
      const matchBusca =
        busca === "" ||
        inf.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        inf.codigo.toLowerCase().includes(busca.toLowerCase());

      const matchGravidade =
        gravidade === "todas" || inf.gravidade === gravidade;

      return matchBusca && matchGravidade;
    });
  }, [busca, gravidade]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Campo de busca */}
          <div className="flex-1 relative">
            <label htmlFor="busca-infracoes" className="sr-only">Buscar infrações</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="busca-infracoes"
              type="text"
              placeholder="Buscar por descrição ou código CTB (ex: 165, celular, álcool)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] placeholder:text-gray-400 transition-colors"
            />
          </div>

          {/* Filtro de gravidade */}
          <div className="relative">
            <label htmlFor="filtro-gravidade" className="sr-only">Filtrar por gravidade</label>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="filtro-gravidade"
              value={gravidade}
              onChange={(e) => setGravidade(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] bg-white appearance-none cursor-pointer transition-colors min-w-[200px]"
            >
              {gravidades.map((g) => (
                <option key={g} value={g}>
                  {g === "todas"
                    ? "Todas as gravidades"
                    : g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contagem de resultados */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-[#64748B]">
          {resultados.length === 0
            ? "Nenhuma infração encontrada"
            : `${resultados.length} ${resultados.length > 1 ? "infrações encontradas" : "infração encontrada"}`}
        </p>
        {(busca || gravidade !== "todas") && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              setGravidade("todas");
            }}
            className="text-sm text-[#FF4D30] hover:underline font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Tabela desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0F172A] text-white text-left">
              <th className="px-6 py-4 font-semibold text-sm">Código CTB</th>
              <th className="px-6 py-4 font-semibold text-sm">Descrição</th>
              <th className="px-6 py-4 font-semibold text-sm">Valor da Multa</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Pontos CNH</th>
              <th className="px-6 py-4 font-semibold text-sm">Gravidade</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((inf, idx) => (
              <tr
                key={inf.codigo}
                className={`border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-6 py-4 font-mono font-bold text-[#0F172A]">
                  Art. {inf.codigo}
                </td>
                <td className="px-6 py-4 text-[#334155] text-sm leading-relaxed">
                  {inf.descricao}
                </td>
                <td className="px-6 py-4 font-semibold text-[#0F172A] whitespace-nowrap">
                  {formatCurrency(inf.valor)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4D30]/10 text-[#FF4D30] font-bold text-sm">
                    {inf.pontos}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${gravidadeCores[inf.gravidade]}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${gravidadeDot[inf.gravidade]}`}
                    />
                    {inf.gravidade.charAt(0).toUpperCase() +
                      inf.gravidade.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resultados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <AlertTriangle className="w-10 h-10 mb-3" />
            <p className="font-medium">Nenhuma infração encontrada</p>
            <p className="text-sm mt-1">Tente alterar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Cards mobile */}
      <div className="md:hidden space-y-4">
        {resultados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <AlertTriangle className="w-10 h-10 mb-3" />
            <p className="font-medium">Nenhuma infração encontrada</p>
            <p className="text-sm mt-1">Tente alterar os filtros de busca</p>
          </div>
        )}
        {resultados.map((inf) => (
          <div
            key={inf.codigo}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono font-bold text-[#0F172A]">
                Art. {inf.codigo}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${gravidadeCores[inf.gravidade]}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${gravidadeDot[inf.gravidade]}`}
                />
                {inf.gravidade.charAt(0).toUpperCase() +
                  inf.gravidade.slice(1)}
              </span>
            </div>
            <p className="text-sm text-[#334155] leading-relaxed">
              {inf.descricao}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="font-semibold text-[#0F172A] text-lg">
                {formatCurrency(inf.valor)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#64748B]">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FF4D30]/10 text-[#FF4D30] font-bold text-xs">
                  {inf.pontos}
                </span>
                pontos
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-[#0F172A] mb-3">Legenda de Gravidade</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(gravidadeCores).map(([key, classes]) => (
            <span
              key={key}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${classes}`}
            >
              <span className={`w-2 h-2 rounded-full ${gravidadeDot[key]}`} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          ))}
        </div>
        <p className="text-xs text-[#94A3B8] mt-3">
          Valores atualizados conforme o Código de Trânsito Brasileiro (CTB).
          Os valores das multas podem sofrer reajustes anuais.
        </p>
      </div>
    </div>
  );
}
