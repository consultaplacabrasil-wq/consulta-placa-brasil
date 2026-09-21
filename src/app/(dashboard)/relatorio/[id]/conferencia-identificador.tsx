"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Resultado = "confere" | "diverge" | null;

interface Props {
  reportId: string;
  token: string;
  temChassi: boolean;
  temMotor: boolean;
}

/**
 * Mecanismo de conferência de correspondência (Nota Técnica SENATRAN 554/2026,
 * item 4.1.4.2). O usuário digita o número gravado no veículo e recebe apenas
 * "confere" ou "diverge" — o número oficial permanece no servidor.
 */
export function ConferenciaIdentificador({ reportId, token, temChassi, temMotor }: Props) {
  const [chassi, setChassi] = useState("");
  const [motor, setMotor] = useState("");
  const [resultado, setResultado] = useState<{ chassi?: Resultado; motor?: Resultado }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const podeConferir = chassi.trim().length >= 6 || motor.trim().length >= 6;

  async function handleConferir(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload: Record<string, string> = { token };
      if (chassi.trim()) payload.chassi = chassi.trim();
      if (motor.trim()) payload.motor = motor.trim();

      const res = await fetch(`/api/relatorio/${reportId}/conferir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não foi possível conferir agora.");
        return;
      }
      setResultado(data);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 14,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  function Veredito({ valor }: { valor: Resultado }) {
    if (valor === null || valor === undefined) return null;
    const ok = valor === "confere";
    const Icon = ok ? CheckCircle : XCircle;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
        <Icon style={{ width: 16, height: 16, color: ok ? "#22c55e" : "#ef4444" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: ok ? "#16a34a" : "#dc2626" }}>
          {ok ? "Confere com o registro oficial" : "Diverge do registro oficial"}
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleConferir} className="no-print" style={{ padding: "14px 20px 18px" }}>
      <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, margin: "0 0 12px" }}>
        Digite o número <strong>gravado no veículo</strong> para confirmar se ele
        corresponde ao registro oficial. Conferimos no servidor e devolvemos apenas
        o resultado.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {temChassi && (
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              Chassi gravado no veículo
            </label>
            <input
              type="text"
              value={chassi}
              onChange={(e) => setChassi(e.target.value)}
              placeholder="17 caracteres"
              maxLength={20}
              disabled={loading}
              style={inputStyle}
            />
            <Veredito valor={resultado.chassi ?? null} />
          </div>
        )}

        {temMotor && (
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              Nº do motor gravado no bloco
            </label>
            <input
              type="text"
              value={motor}
              onChange={(e) => setMotor(e.target.value)}
              placeholder="Número do motor"
              maxLength={30}
              disabled={loading}
              style={inputStyle}
            />
            <Veredito valor={resultado.motor ?? null} />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !podeConferir}
        style={{
          marginTop: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: podeConferir && !loading ? "#0066FF" : "#94a3b8",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 700,
          cursor: podeConferir && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Conferindo..." : "Conferir"}
      </button>

      {error && <p style={{ fontSize: 13, color: "#dc2626", marginTop: 10 }}>{error}</p>}
    </form>
  );
}
