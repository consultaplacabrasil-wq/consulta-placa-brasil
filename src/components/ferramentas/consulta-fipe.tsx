"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TIPOS_VEICULO = [
  { value: "carros", label: "Carro" },
  { value: "motos", label: "Moto" },
  { value: "caminhoes", label: "Caminhão" },
] as const;

type TipoVeiculo = (typeof TIPOS_VEICULO)[number]["value"];

interface MarcaItem {
  codigo: string;
  nome: string;
}

interface ModeloItem {
  codigo: number;
  nome: string;
}

interface AnoItem {
  codigo: string;
  nome: string;
}

interface ResultadoFipe {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

const API_BASE = "https://parallelum.com.br/fipe/api/v1";

export default function ConsultaFipe() {
  const [tipo, setTipo] = useState<TipoVeiculo | "">("");
  const [marcaCodigo, setMarcaCodigo] = useState("");
  const [modeloCodigo, setModeloCodigo] = useState("");
  const [anoCodigo, setAnoCodigo] = useState("");

  const [marcas, setMarcas] = useState<MarcaItem[]>([]);
  const [modelos, setModelos] = useState<ModeloItem[]>([]);
  const [anos, setAnos] = useState<AnoItem[]>([]);
  const [resultado, setResultado] = useState<ResultadoFipe | null>(null);

  const [loadingMarcas, setLoadingMarcas] = useState(false);
  const [loadingModelos, setLoadingModelos] = useState(false);
  const [loadingAnos, setLoadingAnos] = useState(false);
  const [loadingResultado, setLoadingResultado] = useState(false);
  const [erro, setErro] = useState("");

  // Buscar marcas quando tipo muda
  useEffect(() => {
    if (!tipo) {
      setMarcas([]);
      setMarcaCodigo("");
      setModelos([]);
      setModeloCodigo("");
      setAnos([]);
      setAnoCodigo("");
      setResultado(null);
      return;
    }

    setMarcas([]);
    setMarcaCodigo("");
    setModelos([]);
    setModeloCodigo("");
    setAnos([]);
    setAnoCodigo("");
    setResultado(null);
    setErro("");
    setLoadingMarcas(true);

    let cancelled = false;
    fetch(`${API_BASE}/${tipo}/marcas`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar marcas");
        return res.json();
      })
      .then((data: MarcaItem[]) => { if (!cancelled) setMarcas(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setErro("Não foi possível carregar as marcas. Tente novamente."); })
      .finally(() => { if (!cancelled) setLoadingMarcas(false); });
    return () => { cancelled = true; };
  }, [tipo]);

  // Buscar modelos quando marca muda
  useEffect(() => {
    if (!tipo || !marcaCodigo) {
      setModelos([]);
      setModeloCodigo("");
      setAnos([]);
      setAnoCodigo("");
      setResultado(null);
      return;
    }

    setModelos([]);
    setModeloCodigo("");
    setAnos([]);
    setAnoCodigo("");
    setResultado(null);
    setErro("");
    setLoadingModelos(true);

    let cancelled = false;
    fetch(`${API_BASE}/${tipo}/marcas/${marcaCodigo}/modelos`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar modelos");
        return res.json();
      })
      .then((data: { modelos: ModeloItem[] }) => { if (!cancelled) setModelos(Array.isArray(data?.modelos) ? data.modelos : []); })
      .catch(() => { if (!cancelled) setErro("Não foi possível carregar os modelos. Tente novamente."); })
      .finally(() => { if (!cancelled) setLoadingModelos(false); });
    return () => { cancelled = true; };
  }, [tipo, marcaCodigo]);

  // Buscar anos quando modelo muda
  useEffect(() => {
    if (!tipo || !marcaCodigo || !modeloCodigo) {
      setAnos([]);
      setAnoCodigo("");
      setResultado(null);
      return;
    }

    setAnos([]);
    setAnoCodigo("");
    setResultado(null);
    setErro("");
    setLoadingAnos(true);

    let cancelled = false;
    fetch(`${API_BASE}/${tipo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar anos");
        return res.json();
      })
      .then((data: AnoItem[]) => { if (!cancelled) setAnos(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setErro("Não foi possível carregar os anos disponíveis. Tente novamente."); })
      .finally(() => { if (!cancelled) setLoadingAnos(false); });
    return () => { cancelled = true; };
  }, [tipo, marcaCodigo, modeloCodigo]);

  // Buscar resultado quando ano muda
  useEffect(() => {
    if (!tipo || !marcaCodigo || !modeloCodigo || !anoCodigo) {
      setResultado(null);
      return;
    }

    setResultado(null);
    setErro("");
    setLoadingResultado(true);

    let cancelled = false;
    fetch(`${API_BASE}/${tipo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar resultado");
        return res.json();
      })
      .then((data: ResultadoFipe) => { if (!cancelled) setResultado(data); })
      .catch(() => {
        if (!cancelled) setErro("Não foi possível consultar o valor FIPE. Tente novamente em alguns instantes.");
      })
      .finally(() => { if (!cancelled) setLoadingResultado(false); });
    return () => { cancelled = true; };
  }, [tipo, marcaCodigo, modeloCodigo, anoCodigo]);

  function extrairValorNumerico(valorStr: string): string {
    // "R$ 45.000,00" -> "45000.00"
    return valorStr
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="space-y-5">
        {/* Tipo de veículo */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de veículo
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TIPOS_VEICULO.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTipo(t.value)}
                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                  tipo === t.value
                    ? "bg-[#FF4D30] text-white border-[#FF4D30] shadow-sm"
                    : "bg-white text-[#64748B] border-gray-200 hover:border-[#FF4D30]/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marca */}
        {tipo && (
          <div>
            <label htmlFor="marca" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Marca
            </label>
            {loadingMarcas ? (
              <div className="flex items-center gap-2 py-3 text-sm text-[#64748B]">
                <svg className="animate-spin h-4 w-4 text-[#FF4D30]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Carregando marcas...
              </div>
            ) : (
              <select
                id="marca"
                value={marcaCodigo}
                onChange={(e) => setMarcaCodigo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
              >
                <option value="">Selecione a marca</option>
                {marcas.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.nome}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Modelo */}
        {marcaCodigo && (
          <div>
            <label htmlFor="modelo" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Modelo
            </label>
            {loadingModelos ? (
              <div className="flex items-center gap-2 py-3 text-sm text-[#64748B]">
                <svg className="animate-spin h-4 w-4 text-[#FF4D30]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Carregando modelos...
              </div>
            ) : (
              <select
                id="modelo"
                value={modeloCodigo}
                onChange={(e) => setModeloCodigo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
              >
                <option value="">Selecione o modelo</option>
                {modelos.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.nome}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Ano */}
        {modeloCodigo && (
          <div>
            <label htmlFor="ano" className="block text-sm font-semibold text-[#0F172A] mb-2">
              Ano
            </label>
            {loadingAnos ? (
              <div className="flex items-center gap-2 py-3 text-sm text-[#64748B]">
                <svg className="animate-spin h-4 w-4 text-[#FF4D30]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Carregando anos...
              </div>
            ) : (
              <select
                id="ano"
                value={anoCodigo}
                onChange={(e) => setAnoCodigo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
              >
                <option value="">Selecione o ano</option>
                {anos.map((a) => (
                  <option key={a.codigo} value={a.codigo}>
                    {a.nome}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Erro */}
        {erro && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-sm text-red-700">{erro}</p>
            <button
              type="button"
              onClick={() => {
                setErro("");
                // Re-trigger the last step by toggling the relevant state
                if (anoCodigo) {
                  const tmp = anoCodigo;
                  setAnoCodigo("");
                  setTimeout(() => setAnoCodigo(tmp), 50);
                } else if (modeloCodigo) {
                  const tmp = modeloCodigo;
                  setModeloCodigo("");
                  setTimeout(() => setModeloCodigo(tmp), 50);
                } else if (marcaCodigo) {
                  const tmp = marcaCodigo;
                  setMarcaCodigo("");
                  setTimeout(() => setMarcaCodigo(tmp), 50);
                } else if (tipo) {
                  const tmp = tipo;
                  setTipo("");
                  setTimeout(() => setTipo(tmp), 50);
                }
              }}
              className="mt-2 text-sm font-semibold text-red-700 underline hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading resultado */}
        {loadingResultado && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <svg className="animate-spin h-8 w-8 text-[#FF4D30]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-[#64748B]">Consultando Tabela FIPE...</p>
          </div>
        )}

        {/* Resultado */}
        {resultado && (
          <div className="mt-4 space-y-5">
            {/* Valor principal */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 text-center">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Valor médio de mercado
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-[#0F172A]">
                {resultado.Valor}
              </p>
              <p className="text-sm text-[#64748B] mt-2">
                Referência: {resultado.MesReferencia}
              </p>
            </div>

            {/* Detalhes */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Código FIPE</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{resultado.CodigoFipe}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Marca</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{resultado.Marca}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Modelo</span>
                  <span className="text-sm font-semibold text-[#0F172A] text-right max-w-[60%]">{resultado.Modelo}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Ano modelo</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{resultado.AnoModelo}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Combustível</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{resultado.Combustivel}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#64748B]">Mês de referência</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{resultado.MesReferencia}</span>
                </div>
              </div>
            </div>

            {/* Botão IPVA */}
            <Link
              href={`/ferramentas/calculadora-ipva?valor=${extrairValorNumerico(resultado.Valor)}`}
              className="block w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] transition-colors shadow-sm text-center"
            >
              Calcular IPVA com este valor
            </Link>

            {/* Nova consulta */}
            <button
              type="button"
              onClick={() => {
                setTipo("");
                setMarcaCodigo("");
                setModeloCodigo("");
                setAnoCodigo("");
                setResultado(null);
                setErro("");
              }}
              className="block w-full py-3 rounded-xl border border-gray-200 text-[#64748B] font-medium text-sm hover:border-[#FF4D30]/40 hover:text-[#FF4D30] transition-colors text-center"
            >
              Fazer nova consulta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
