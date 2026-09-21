"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CONSULTA_PURPOSES,
  CONSULTA_PURPOSE_LABELS,
  type ConsultaPurpose,
} from "@/lib/consulta-purpose";

interface Props {
  requestId: string;
  apiService?: string;
}

export function ConsultaPlateForm({ requestId }: Props) {
  const [plate, setPlate] = useState("");
  // Declaração de finalidade exigida pela SENATRAN: nasce vazia, sem opção
  // pré-selecionada, para que a escolha seja um ato do solicitante.
  const [purpose, setPurpose] = useState<ConsultaPurpose | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function formatPlate(value: string) {
    return value
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase()
      .slice(0, 7);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const formatted = formatPlate(plate);
    if (formatted.length < 7) {
      setError("A placa deve ter 7 caracteres (ex: ABC1D23)");
      return;
    }

    if (!purpose) {
      setError("Selecione a finalidade da consulta para continuar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/consulta/executar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, plate: formatted, purpose }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao processar consulta");
        return;
      }

      router.push(`/relatorio/${data.reportId}`);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[#0F172A]">
          Informe a placa do veículo para consultar:
        </p>
        <Input
          type="text"
          placeholder="ABC1D23"
          value={plate}
          onChange={(e) => setPlate(formatPlate(e.target.value))}
          className="font-mono text-lg tracking-widest uppercase w-[160px]"
          maxLength={7}
          disabled={loading}
        />
      </div>

      <fieldset className="space-y-2" disabled={loading}>
        <legend className="text-sm font-medium text-[#0F172A] mb-2">
          Qual a finalidade desta consulta?
        </legend>
        <div className="space-y-2">
          {CONSULTA_PURPOSES.map((option) => (
            <label
              key={option}
              className="flex items-start gap-2.5 text-sm text-[#0F172A] cursor-pointer"
            >
              <input
                type="radio"
                name="purpose"
                value={option}
                checked={purpose === option}
                onChange={() => setPurpose(option)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#0066FF]"
                required
              />
              <span>{CONSULTA_PURPOSE_LABELS[option]}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-500 pt-1">
          A declaração é obrigatória e fica registrada junto à sua consulta.
          Ela existe por exigência da SENATRAN: o relatório só pode ser emitido
          para apoiar uma negociação concreta do veículo consultado.
        </p>
      </fieldset>

      <Button
        type="submit"
        disabled={loading || plate.length < 7 || !purpose}
        className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Consultando...
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Consultar
          </>
        )}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {loading && (
        <p className="text-sm text-blue-600">
          Buscando dados do veículo... Isso pode levar alguns segundos.
        </p>
      )}
    </form>
  );
}
