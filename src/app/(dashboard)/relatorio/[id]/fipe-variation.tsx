import { Gauge, TrendingUp, TrendingDown } from "lucide-react";
import type { FipePreco } from "@/lib/fipe";

function fmt(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

// "junho de 2026" -> "jun/26"
function mesCurto(m: string) {
  const meses: Record<string, string> = {
    janeiro: "jan", fevereiro: "fev", março: "mar", abril: "abr", maio: "mai", junho: "jun",
    julho: "jul", agosto: "ago", setembro: "set", outubro: "out", novembro: "nov", dezembro: "dez",
  };
  const parts = m.toLowerCase().replace(" de ", " ").split(" ");
  const mm = meses[parts[0]] || parts[0]?.slice(0, 3) || m;
  const yy = parts[1]?.slice(-2) || "";
  return `${mm}/${yy}`;
}

// Componente presentacional (server-side). Renderiza a própria seção;
// não exibe nada se não houver dados.
export function FipeVariation({ precos }: { precos: FipePreco[] }) {
  if (!precos || precos.length === 0) return null;

  const serie = precos.slice(-6);
  const atual = serie[serie.length - 1];
  const anterior = serie.length > 1 ? serie[serie.length - 2] : null;
  const variacao = anterior ? ((atual.valor - anterior.valor) / anterior.valor) * 100 : 0;
  const max = Math.max(...serie.map((s) => s.valor));
  const min = Math.min(...serie.map((s) => s.valor));
  const range = max - min || 1;
  const subiu = variacao >= 0;

  return (
    <div style={{ padding: "0 8px" }}>
      <div style={{
        background: "linear-gradient(135deg, #0891b2 0%, #0891b2dd 100%)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderRadius: "8px 8px 0 0",
      }}>
        <Gauge style={{ width: 18, height: 18, color: "#fff" }} />
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}>
          Tabela FIPE e Variação de Preço
        </span>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "20px 24px" }}>
        {/* Valor atual */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
              Valor FIPE atual
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a" }}>{fmt(atual.valor)}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Ref.: {mesCurto(atual.mesReferencia)} · {atual.combustivel}</div>
          </div>
          {anterior && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: subiu ? "#f0fdf4" : "#fef2f2",
              color: subiu ? "#16a34a" : "#dc2626",
              border: `1px solid ${subiu ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: 999, padding: "6px 12px", fontSize: 13, fontWeight: 800,
            }}>
              {subiu ? <TrendingUp style={{ width: 16, height: 16 }} /> : <TrendingDown style={{ width: 16, height: 16 }} />}
              {subiu ? "+" : ""}{variacao.toFixed(2)}%
            </div>
          )}
        </div>

        {/* Gráfico de barras */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, height: 130, paddingTop: 8 }}>
          {serie.map((s, i) => {
            const h = 20 + ((s.valor - min) / range) * 80;
            const isLast = i === serie.length - 1;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#475569" }}>{fmt(s.valor).replace("R$", "").trim()}</span>
                <div style={{
                  width: "100%", height: `${h}%`, minHeight: 6,
                  background: isLast ? "linear-gradient(to top, #FF4D30, #ff6b52)" : "#cbd5e1",
                  borderRadius: "4px 4px 0 0",
                }} />
                <span style={{ fontSize: 9, color: "#94a3b8" }}>{mesCurto(s.mesReferencia)}</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>
          Variação da tabela FIPE nos últimos {serie.length} meses · Fonte: FIPE/BrasilAPI
        </p>
      </div>
    </div>
  );
}
