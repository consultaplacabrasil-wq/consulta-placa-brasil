"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterFooterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        setMessage(data.error || "Erro ao processar");
        return;
      }
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Erro de conexão");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
        <p className="text-xs text-green-400">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Seu email"
        className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#FF4D30]"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-[#FF4D30] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E8432A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Quero receber"
        )}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">{message}</p>
      )}
    </form>
  );
}
