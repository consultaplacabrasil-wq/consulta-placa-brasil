"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "loading" | "disabled" | "setup" | "enabled";

export default function SegurancaPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  async function loadStatus() {
    try {
      const r = await fetch("/api/admin/2fa");
      const d = await r.json();
      setStatus(d.enabled ? "enabled" : "disabled");
    } catch {
      setStatus("disabled");
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function startSetup() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/2fa", { method: "POST" });
      const d = await r.json();
      setQr(d.qr);
      setSecret(d.secret);
      setCode("");
      setStatus("setup");
    } catch {
      setError("Erro ao iniciar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  async function confirmEnable() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/2fa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || "Código inválido.");
        return;
      }
      setMsg("2FA ativado com sucesso! A partir de agora, o login vai pedir o código.");
      setStatus("enabled");
      setCode("");
    } catch {
      setError("Erro ao confirmar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/2fa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || "Código inválido.");
        return;
      }
      setMsg("2FA desativado.");
      setStatus("disabled");
      setCode("");
    } catch {
      setError("Erro ao desativar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Segurança — Verificação em duas etapas (2FA)</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Adicione uma camada extra de proteção ao seu login usando um app autenticador
        (Google Authenticator, Microsoft Authenticator, Authy, etc.).
      </p>

      {status === "loading" && (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="h-4 w-4 animate-spin" /> Carregando...</div>
      )}

      {msg && <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">{msg}</div>}
      {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}

      {status === "disabled" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldAlert className="h-6 w-6 text-amber-500" />
            <span className="font-semibold text-[#0F172A]">2FA está desativado</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Recomendado para contas administrativas. Ative para exigir um código do celular a cada login.</p>
          <Button onClick={startSetup} disabled={busy} className="bg-[#FF4D30] hover:bg-[#E8432A] text-white">
            {busy ? "..." : "Ativar 2FA"}
          </Button>
        </div>
      )}

      {status === "setup" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <p className="text-sm text-gray-700"><strong>Passo 1:</strong> abra seu app autenticador e escaneie o QR Code abaixo (ou digite o código manual).</p>
          {qr && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt="QR Code 2FA" width={220} height={220} className="border rounded-lg" />
          )}
          <p className="text-xs text-gray-500">Código manual (se não puder escanear): <code className="bg-gray-100 px-2 py-1 rounded break-all">{secret}</code></p>
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="code"><strong>Passo 2:</strong> digite o código de 6 dígitos</Label>
            <Input id="code" inputMode="numeric" placeholder="000000" value={code} onChange={(e) => setCode(e.target.value)} className="tracking-widest" />
          </div>
          <div className="flex gap-2">
            <Button onClick={confirmEnable} disabled={busy || code.length < 6} className="bg-[#FF4D30] hover:bg-[#E8432A] text-white">
              {busy ? "..." : "Confirmar e ativar"}
            </Button>
            <Button variant="outline" onClick={() => { setStatus("disabled"); setError(""); }} disabled={busy}>Cancelar</Button>
          </div>
        </div>
      )}

      {status === "enabled" && (
        <div className="rounded-xl border border-green-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-green-600" />
            <span className="font-semibold text-[#0F172A]">2FA está ATIVO</span>
          </div>
          <p className="text-sm text-gray-600">Seu login exige o código do app autenticador. Para desativar, informe um código atual.</p>
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="dcode">Código atual (para desativar)</Label>
            <Input id="dcode" inputMode="numeric" placeholder="000000" value={code} onChange={(e) => setCode(e.target.value)} className="tracking-widest" />
          </div>
          <Button variant="outline" onClick={disable} disabled={busy || code.length < 6} className="border-red-300 text-red-600 hover:bg-red-50">
            {busy ? "..." : "Desativar 2FA"}
          </Button>
        </div>
      )}
    </div>
  );
}
