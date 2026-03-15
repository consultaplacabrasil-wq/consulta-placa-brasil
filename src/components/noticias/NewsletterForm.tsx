"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "inline" | "compact";
}

export default function NewsletterForm({
  variant = "inline",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Erro ao processar inscrição");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-xl border border-green-200 bg-green-50 p-6 ${
          variant === "compact" ? "p-4" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-4 w-4 text-[#FF4D30]" />
          <span className="text-sm font-semibold text-[#0F172A]">
            Newsletter semanal
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Seu email"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#FF4D30] focus:ring-1 focus:ring-[#FF4D30]"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-[#FF4D30] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E8432A] transition-colors disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Assinar"
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-xs text-red-600">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF4D30]/10">
          <Mail className="h-5 w-5 text-[#FF4D30]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Receba as principais notícias do mercado automotivo
          </h3>
          <p className="text-sm text-[#64748B]">
            Compilação semanal, sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Digite seu melhor email"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#FF4D30] focus:ring-1 focus:ring-[#FF4D30]"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-[#FF4D30] px-6 py-3 text-sm font-bold text-white hover:bg-[#E8432A] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Quero receber"
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
