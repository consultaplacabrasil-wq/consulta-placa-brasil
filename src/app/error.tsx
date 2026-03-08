"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <AlertTriangle className="mb-6 h-16 w-16 text-[#FF6D00]" />
      <h1 className="mb-2 text-2xl font-bold text-[#0F172A]">
        Algo deu errado
      </h1>
      <p className="mb-6 text-[#475569]">
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <Button
        onClick={reset}
        className="bg-[#0066FF] hover:bg-[#0052CC]"
      >
        Tentar novamente
      </Button>
    </div>
  );
}
