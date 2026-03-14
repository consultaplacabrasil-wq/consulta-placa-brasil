"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface DadosCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

function aplicarMascaraCep(valor: string): string {
  const soNumeros = valor.replace(/\D/g, "").slice(0, 8);
  if (soNumeros.length <= 5) return soNumeros;
  return `${soNumeros.slice(0, 5)}-${soNumeros.slice(5)}`;
}

function cepLimpo(cep: string): string {
  return cep.replace(/\D/g, "");
}

interface SecaoCepProps {
  titulo: string;
  id: string;
  cep: string;
  setCep: (v: string) => void;
  dados: DadosCep | null;
  erro: string;
  carregando: boolean;
  onBuscar: () => void;
}

function SecaoCep({ titulo, id, cep, setCep, dados, erro, carregando, onBuscar }: SecaoCepProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCep(aplicarMascaraCep(e.target.value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onBuscar();
    }
  }

  return (
    <div className="flex-1">
      <h3 className="text-lg font-bold text-[#0F172A] mb-3">{titulo}</h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor={id} className="block text-sm font-semibold text-[#0F172A] mb-2">
            CEP
          </label>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            value={cep}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={9}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg transition-colors"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={onBuscar}
            disabled={cepLimpo(cep).length !== 8 || carregando}
            className="px-5 py-3 rounded-xl bg-[#FF4D30] text-white font-semibold hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-sm whitespace-nowrap"
          >
            {carregando ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {erro && (
        <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
          <p className="text-sm text-red-700">{erro}</p>
        </div>
      )}

      {dados && !erro && (
        <div className="mt-4 bg-[#F8FAFC] rounded-xl p-4 border border-gray-100 space-y-2">
          {dados.logradouro && (
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Logradouro</span>
              <span className="text-[#0F172A] font-medium text-right">{dados.logradouro}</span>
            </div>
          )}
          {dados.bairro && (
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Bairro</span>
              <span className="text-[#0F172A] font-medium">{dados.bairro}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B]">Cidade</span>
            <span className="text-[#0F172A] font-medium">{dados.localidade}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B]">Estado (UF)</span>
            <span className="text-[#0F172A] font-bold">{dados.uf}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConsultaCep() {
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [dadosOrigem, setDadosOrigem] = useState<DadosCep | null>(null);
  const [dadosDestino, setDadosDestino] = useState<DadosCep | null>(null);
  const [erroOrigem, setErroOrigem] = useState("");
  const [erroDestino, setErroDestino] = useState("");
  const [carregandoOrigem, setCarregandoOrigem] = useState(false);
  const [carregandoDestino, setCarregandoDestino] = useState(false);

  const buscarCep = useCallback(async (
    cep: string,
    setDados: (d: DadosCep | null) => void,
    setErro: (e: string) => void,
    setCarregando: (c: boolean) => void
  ) => {
    const limpo = cepLimpo(cep);
    if (limpo.length !== 8) {
      setErro("Digite um CEP válido com 8 dígitos.");
      return;
    }

    setCarregando(true);
    setErro("");
    setDados(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);

      if (!response.ok) {
        setErro("Erro ao consultar o CEP. Tente novamente.");
        return;
      }

      const data: DadosCep = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado. Verifique o número informado.");
        return;
      }

      setDados(data);
    } catch {
      setErro("Falha na conexão. Verifique sua internet e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const mesmoEstado = dadosOrigem && dadosDestino ? dadosOrigem.uf === dadosDestino.uf : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SecaoCep
          titulo="CEP de Origem"
          id="cep-origem"
          cep={cepOrigem}
          setCep={setCepOrigem}
          dados={dadosOrigem}
          erro={erroOrigem}
          carregando={carregandoOrigem}
          onBuscar={() => buscarCep(cepOrigem, setDadosOrigem, setErroOrigem, setCarregandoOrigem)}
        />

        <SecaoCep
          titulo="CEP de Destino"
          id="cep-destino"
          cep={cepDestino}
          setCep={setCepDestino}
          dados={dadosDestino}
          erro={erroDestino}
          carregando={carregandoDestino}
          onBuscar={() => buscarCep(cepDestino, setDadosDestino, setErroDestino, setCarregandoDestino)}
        />
      </div>

      {/* Resultado da comparação */}
      {dadosOrigem && dadosDestino && mesmoEstado !== null && (
        <div className="mt-8 space-y-4">
          {mesmoEstado ? (
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">&#10003;</span>
                <div>
                  <h4 className="font-bold text-green-800 text-lg">
                    Mesmo estado — {dadosOrigem.uf}
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    A origem ({dadosOrigem.localidade}/{dadosOrigem.uf}) e o destino ({dadosDestino.localidade}/{dadosDestino.uf}) estão
                    no mesmo estado. A transferência veicular será mais simples e <strong>não será necessário
                    novo emplacamento</strong>. Basta atualizar o CRV (Certificado de Registro do Veículo)
                    no Detran do estado.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">&#9888;</span>
                <div>
                  <h4 className="font-bold text-amber-800 text-lg">
                    Estados diferentes — {dadosOrigem.uf} para {dadosDestino.uf}
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    A origem ({dadosOrigem.localidade}/{dadosOrigem.uf}) e o destino ({dadosDestino.localidade}/{dadosDestino.uf}) estão em estados
                    diferentes. <strong>Será necessário novo emplacamento</strong> no estado de destino,
                    com confecção de placas no padrão Mercosul, além de vistoria veicular obrigatória.
                    Isso implica custos adicionais na transferência.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Link para calculadora */}
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 text-center">
            <p className="text-[#475569] mb-3">
              Deseja saber quanto custará a transferência veicular
              {!mesmoEstado ? " entre estados" : ""}?
            </p>
            <Link
              href="/ferramentas/calculadora-transferencia"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-[#FF4D30] text-white font-bold hover:bg-[#E8432A] transition-colors shadow-sm"
            >
              Calcular custos de transferência
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
