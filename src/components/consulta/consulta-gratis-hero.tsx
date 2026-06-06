"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Car, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { formatPlate, validatePlate, PLATE_ERROR_MESSAGE } from "@/constants";

interface PreviewVeiculo {
  placa: string;
  marcaModelo: string | null;
  anoFabricacao: string | null;
  anoModelo: string | null;
  cor: string | null;
  chassi: string | null;
  combustivel: string | null;
}

function Row({ label, value, alt }: { label: string; value: string | null; alt?: boolean }) {
  return (
    <div
      className={`flex items-start justify-between gap-3 px-4 py-2.5 ${
        alt ? "bg-[#F1F5F9]" : ""
      }`}
    >
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
        {label}
      </span>
      <span className="min-w-0 break-words text-right text-sm font-bold text-[#0F172A]">
        {value || "—"}
      </span>
    </div>
  );
}

export function ConsultaGratisHero() {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PreviewVeiculo | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = formatPlate(e.target.value);
    if (value.length <= 7) {
      setPlate(value);
      setError("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formatted = formatPlate(plate);

    if (!formatted) {
      setError("Digite a placa do veículo");
      return;
    }
    if (!validatePlate(formatted)) {
      setError(PLATE_ERROR_MESSAGE);
      return;
    }

    setLoading(true);
    setError("");
    setNotFound(null);
    try {
      const res = await fetch("/api/consulta/gratis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa: formatted }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404 || data?.notFound) {
          setNotFound(formatted);
        } else {
          setError(data?.error || "Não foi possível consultar agora. Tente novamente.");
        }
        return;
      }
      setResult(data.veiculo);
    } catch {
      setError("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function novaConsulta() {
    setResult(null);
    setNotFound(null);
    setPlate("");
    setError("");
  }

  function irParaConsultas() {
    const el = typeof document !== "undefined" ? document.getElementById("consultas") : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // ----- Resultado: preview do veículo + CTA de conversão -----
  if (result) {
    return (
      <div className="mx-auto w-full max-w-3xl text-left">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-black/5">
          {/* Cabeçalho */}
          <div className="flex items-center gap-2 bg-[#0F172A] px-5 py-4 text-white">
            <Car className="h-5 w-5 text-[#FF4D30]" />
            <h3 className="text-sm font-bold uppercase tracking-wide md:text-base">
              Informações sobre o veículo
            </h3>
          </div>

          {/* Corpo */}
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-[auto_1fr]">
            {/* Placa */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-44 overflow-hidden rounded-lg border-2 border-[#0F172A] bg-white shadow-sm">
                <div className="flex items-center justify-between bg-[#0B3CA3] px-2 py-1">
                  <span className="text-[8px] font-bold tracking-widest text-white">
                    BRASIL
                  </span>
                  <span className="text-[10px]">🇧🇷</span>
                </div>
                <div className="py-2 text-center text-2xl font-extrabold tracking-[0.15em] text-[#0F172A]">
                  {result.placa}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#15803D]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Prévia gratuita
              </span>
            </div>

            {/* Dados */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <p className="bg-[#0F172A] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#FF4D30]">
                  Veículo
                </p>
                {(() => {
                  const ano =
                    result.anoFabricacao || result.anoModelo
                      ? `${result.anoFabricacao || "—"} / ${result.anoModelo || "—"}`
                      : null;
                  const rows = [
                    { label: "Marca / Modelo", value: result.marcaModelo },
                    { label: "Fabricação / Modelo", value: ano },
                    { label: "Cor", value: result.cor },
                    { label: "Chassi", value: result.chassi },
                    { label: "Combustível", value: result.combustivel },
                  ].filter((r) => r.value);
                  return rows.map((r, i) => (
                    <Row key={r.label} label={r.label} value={r.value} alt={i % 2 === 0} />
                  ));
                })()}
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-dashed border-[#FF4D30]/40 bg-[#FFF5F3] p-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#FF4D30]">
                    Consulta
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Entrada</span>
                      <span className="font-bold text-[#0F172A]">{result.placa}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Tipo</span>
                      <span className="font-bold text-[#0F172A]">Gratuita</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
                  Estes são os dados básicos. O histórico completo é liberado na
                  consulta paga.
                </p>
              </div>
            </div>
          </div>

          {/* Conversão */}
          <div className="border-t border-gray-100 bg-[#F8FAFC] px-5 py-6 text-center">
            <h4 className="text-lg font-bold text-[#0F172A]">
              Quer o histórico completo deste veículo?
            </h4>
            <p className="mx-auto mt-1 max-w-xl text-sm text-[#64748B]">
              Leilão, sinistro, débitos, multas, gravame, roubo/furto, recall e muito
              mais. Não compre nem venda no escuro.
            </p>
            <button
              onClick={irParaConsultas}
              className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FF4D30] px-8 py-3.5 text-sm font-bold uppercase text-white shadow-md shadow-[#FF4D30]/30 transition-colors hover:bg-[#E8432A]"
            >
              Liberar consulta completa
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-3">
              <button
                onClick={novaConsulta}
                className="text-xs font-medium text-[#64748B] underline-offset-2 hover:text-[#0F172A] hover:underline"
              >
                Consultar outra placa
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----- Placa não encontrada na prévia → converte para a consulta paga -----
  if (notFound) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg shadow-black/5">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5F3]">
            <Search className="h-6 w-6 text-[#FF4D30]" />
          </div>
          <p className="text-sm text-[#64748B]">
            Não encontramos a prévia gratuita para a placa{" "}
            <span className="font-bold text-[#0F172A]">{notFound}</span>.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#64748B]">
            A <strong className="text-[#0F172A]">consulta completa</strong> acessa
            bases mais amplas, com histórico, débitos, multas, leilão, gravame e mais.
          </p>
          <button
            onClick={irParaConsultas}
            className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FF4D30] px-7 py-3 text-sm font-bold uppercase text-white shadow-md shadow-[#FF4D30]/30 transition-colors hover:bg-[#E8432A]"
          >
            Ver consultas
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-3">
            <button
              onClick={novaConsulta}
              className="text-xs font-medium text-[#64748B] underline-offset-2 hover:text-[#0F172A] hover:underline"
            >
              Tentar outra placa
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----- Formulário inicial -----
  return (
    <div className="mx-auto w-full max-w-lg">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Digite a placa  ex: ABC1D23"
              value={plate}
              onChange={handleChange}
              className="h-14 text-center text-xl font-bold uppercase tracking-[0.3em] rounded-xl border-2 border-gray-200 bg-white text-[#0F172A] placeholder:text-gray-300 placeholder:text-base placeholder:font-normal placeholder:tracking-normal shadow-sm focus:border-[#FF4D30]"
              maxLength={7}
              autoComplete="off"
              inputMode="text"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 shrink-0 gap-2 rounded-xl bg-[#FF4D30] px-8 text-base font-bold text-white shadow-md shadow-[#FF4D30]/30 hover:bg-[#E8432A]"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            {loading ? "Consultando..." : "Consultar Placa"}
          </Button>
        </div>
        {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-[#94A3B8]">
          <Lock className="h-3.5 w-3.5" />
          Consulta gratuita · Dados oficiais dos Detrans · Resultado na hora
        </p>
      </form>
    </div>
  );
}
