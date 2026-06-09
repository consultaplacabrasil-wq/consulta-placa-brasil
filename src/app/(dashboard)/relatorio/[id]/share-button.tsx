"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ plate }: { plate: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `Consulta veicular — placa ${plate}`;
    const text = `Relatório da placa ${plate} — Consulta Placa Brasil`;

    // Web Share API (mobile / navegadores compatíveis)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // usuário cancelou ou não suportado — cai no fallback
      }
    }

    // Fallback: copia o link
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silencioso */
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="gap-2 font-semibold border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copiado!" : "Compartilhar"}
    </Button>
  );
}
