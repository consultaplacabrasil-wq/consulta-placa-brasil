import { Sparkles, Star, Wrench } from "lucide-react";

interface Quesito {
  nome: string;
  nota: number;
}
interface Manutencao {
  nivel: string;
  custoMedioAnual: string;
  resumo: string;
}
export interface Insights {
  satisfacao: number;
  quesitos: Quesito[];
  resumo: string;
  manutencao?: Manutencao;
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

        {/* Estimativa de manutenção */}
        {insights.manutencao && (
          <div style={{ marginTop: 16, border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f1f5f9", padding: "10px 16px" }}>
              <Wrench style={{ width: 16, height: 16, color: "#0891b2" }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Custo de manutenção (estimativa)
              </span>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
                <div style={{ flex: 1, minWidth: 130 }}>
                  <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Nível</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{insights.manutencao.nivel}</div>
                </div>
                <div style={{ flex: 2, minWidth: 180 }}>
                  <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Custo médio anual estimado</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{insights.manutencao.custoMedioAnual}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, margin: 0 }}>{insights.manutencao.resumo}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
