"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function ConsultaTesteForm() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function formatPlate(value: string) {
    return value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 7);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formatted = formatPlate(plate);
    if (formatted.length < 7) {
      setError("A placa deve ter 7 caracteres (ex: ABC1D23)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/consulta/teste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: formatted }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao processar consulta");
        return;
      }

      setSuccess("Consulta realizada com sucesso!");
      setTimeout(() => {
        router.push(`/relatorio/${data.reportId}`);
      }, 500);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-sm max-w-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Placa do veículo</label>
            <Input
              type="text"
              placeholder="ABC1D23"
              value={plate}
              onChange={(e) => setPlate(formatPlate(e.target.value))}
              className="font-mono text-xl tracking-widest uppercase"
              maxLength={7}
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || plate.length < 7}
            className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Consultando...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Consultar (Teste)
              </>
            )}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600 font-medium">{success}</p>}
          {loading && <p className="text-sm text-blue-600">Buscando dados... pode levar alguns segundos.</p>}
        </form>
      </CardContent>
    </Card>
  );
}
