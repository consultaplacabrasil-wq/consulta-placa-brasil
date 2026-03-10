"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { formatPlate, validatePlate, PLATE_ERROR_MESSAGE } from "@/constants";

interface PlateSearchProps {
  size?: "default" | "large";
  variant?: "default" | "card";
  className?: string;
}

export function PlateSearch({ size = "default", variant = "default", className }: PlateSearchProps) {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLarge = size === "large";
  const isCard = variant === "card";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = formatPlate(e.target.value);
    if (value.length <= 7) {
      setPlate(value);
      setError("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
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
    router.push(`/consulta/${formatted}`);
  }

  if (isCard) {
    return (
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl bg-[#F8FAFC] border border-gray-200 p-6 shadow-lg shadow-black/5 ${className || ""}`}
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Placa do veículo
          </label>
          <Input
            type="text"
            placeholder="ABC1D23"
            value={plate}
            onChange={handleChange}
            className="h-14 text-center text-2xl font-bold tracking-[0.3em] uppercase border-2 border-gray-200 rounded-xl focus:border-[#FF4D30] focus:ring-[#FF4D30]/20"
            maxLength={7}
            autoComplete="off"
          />
          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 gap-2 bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold text-base rounded-xl shadow-md shadow-[#FF4D30]/25"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          Consultar Agora
        </Button>
        <p className="mt-3 text-center text-xs text-gray-400">
          Consulta básica gratuita - Sem cadastro
        </p>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-lg flex-col gap-2 sm:flex-row ${className || ""}`}
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Digite a placa (ex: ABC1D23)"
          value={plate}
          onChange={handleChange}
          className={`uppercase rounded-xl border-2 ${
            isLarge
              ? "h-14 text-lg px-6 font-semibold tracking-widest"
              : "h-11 text-base tracking-wider"
          } ${error ? "border-red-500" : "border-white/30 bg-white/10 text-white placeholder:text-white/50"}`}
          maxLength={7}
          autoComplete="off"
        />
        {error && (
          <p className="absolute -bottom-6 left-0 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading}
        className={`gap-2 bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold rounded-xl shadow-md shadow-[#FF4D30]/25 ${
          isLarge ? "h-14 px-8 text-lg" : "h-11 px-6"
        }`}
      >
        {loading ? (
          <Loader2 className={`animate-spin ${isLarge ? "h-5 w-5" : "h-4 w-4"}`} />
        ) : (
          <Search className={isLarge ? "h-5 w-5" : "h-4 w-4"} />
        )}
        Consultar
      </Button>
    </form>
  );
}
