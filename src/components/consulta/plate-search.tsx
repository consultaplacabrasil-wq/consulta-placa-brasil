"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { formatPlate, validatePlate } from "@/constants";

interface PlateSearchProps {
  size?: "default" | "large";
  className?: string;
}

export function PlateSearch({ size = "default", className }: PlateSearchProps) {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLarge = size === "large";

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
      setError("Placa inválida. Use o formato ABC1D23 ou ABC1234");
      return;
    }

    setLoading(true);
    router.push(`/consulta/${formatted}`);
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
          className={`uppercase ${
            isLarge
              ? "h-14 text-lg px-6 font-semibold tracking-widest"
              : "h-11 text-base tracking-wider"
          } ${error ? "border-red-500" : ""}`}
          maxLength={7}
          autoComplete="off"
        />
        {error && (
          <p className="absolute -bottom-6 left-0 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading}
        className={`gap-2 bg-[#0066FF] hover:bg-[#0052CC] ${
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
