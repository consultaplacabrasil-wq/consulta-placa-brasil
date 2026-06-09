import { Sparkles, Star } from "lucide-react";

interface Quesito {
  nome: string;
  nota: number;
}
export interface Insights {
  satisfacao: number;
  quesitos: Quesito[];
  resumo: string;
}

// Presentacional (sem "use client"): pode ser usado no servidor e no cliente.
// Renderiza a própria seção; não exibe nada se não houver dados.
export function ModelInsightsView({ insights }: { insights: Insights | null }) {
  if (!insights || !insights.resumo) return null;

  return (
    <div style={{ padding: "0 8px" }}>
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #7c3aeddd 100%)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderRadius: "8px 8px 0 0",
      }}>
        <Star style={{ width: 18, height: 18, color: "#fff" }} />
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}>
          Avaliações do Modelo
        </span>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#f5f3ff", color: "#7c3aed",
            fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "3px 8px", borderRadius: 999,
          }}>
            <Sparkles style={{ width: 12, height: 12 }} /> Conteúdo gerado por IA
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
          {/* Satisfação geral */}
          <div style={{
            gridColumn: "1 / -1",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#0f172a", borderRadius: 10, padding: "14px 18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Star style={{ width: 20, height: 20, color: "#facc15", fill: "#facc15" }} />
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Satisfação geral do modelo</span>
            </div>
            <span style={{ color: "#facc15", fontSize: 24, fontWeight: 900 }}>
              {insights.satisfacao.toFixed(1)}<span style={{ fontSize: 13, color: "#94a3b8" }}>/10</span>
            </span>
          </div>

          {/* Quesitos */}
          {insights.quesitos.map((q) => {
            const pct = Math.max(0, Math.min(100, (q.nota / 10) * 100));
            return (
              <div key={q.nome}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{q.nome}</span>
                  <span style={{ fontSize: 12, color: "#0f172a", fontWeight: 800 }}>{q.nota.toFixed(1)}</span>
                </div>
                <div style={{ height: 7, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(to right, #FF4D30, #ff6b52)", borderRadius: 999 }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 18, padding: "14px 16px", background: "#f8fafc", borderRadius: 8, borderLeft: "4px solid #7c3aed" }}>
          <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, margin: 0 }}>{insights.resumo}</p>
        </div>
      </div>
    </div>
  );
}
