"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  requestId: string;
  apiService?: string;
}

export function ConsultaPlateForm({ requestId }: Props) {
  const [plate, setPlate] = useState("");
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

    setLoading(true);
    try {
      const res = await fetch("/api/consulta/executar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, plate: formatted }),
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-medium text-[#0F172A]">
        Informe a placa do veículo para consultar:
      </p>
      <div className="flex flex-wrap gap-2 items-end">
        <div>
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
        <Button
          type="submit"
          disabled={loading || plate.length < 7}
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
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {loading && (
        <p className="text-sm text-blue-600">
          Buscando dados do veículo... Isso pode levar alguns segundos.
        </p>
      )}
    </form>
  );
}
