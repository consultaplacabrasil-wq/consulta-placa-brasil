import { Sparkles, Star, Wrench, Settings, GitCompare } from "lucide-react";

interface Quesito { nome: string; nota: number }
interface ManutencaoItem { item: string; custo: string; periodicidade: string }
interface Manutencao { nivel: string; custoMedioAnual: string; resumo: string; itens?: ManutencaoItem[] }
interface FichaTecnica {
  motor?: string; potencia?: string; consumoUrbano?: string; consumoEstrada?: string;
  aceleracao?: string; velocidadeMaxima?: string; portaMalas?: string; dimensoes?: string;
  cambio?: string; tracao?: string;
}
interface Similar { nome: string; consumo?: string; potencia?: string; portaMalas?: string; observacao?: string }
export interface Insights {
  satisfacao: number;
  quesitos: Quesito[];
  resumo: string;
  manutencao?: Manutencao;
  fichaTecnica?: FichaTecnica;
  similares?: Similar[];
}

// Barra de seção (replica o estilo do relatório, sem depender de import do page)
function Bar({ title, accent, icon: Icon }: { title: string; accent: string; icon: typeof Star }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
      padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderRadius: "8px 8px 0 0",
    }}>
      <Icon style={{ width: 18, height: 18, color: "#fff" }} />
      <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em" }}>{title}</span>
    </div>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "20px 24px" }}>
      {children}
    </div>
  );
}
const iaBadge = (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4, background: "#f5f3ff", color: "#7c3aed",
    fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 999,
  }}>
    <Sparkles style={{ width: 12, height: 12 }} /> Conteúdo gerado por IA · estimativa
  </span>
);

export function ModelInsightsView({ insights }: { insights: Insights | null }) {
  if (!insights || !insights.resumo) return null;
  const ft = insights.fichaTecnica;
  const ftRows = ft
    ? ([
        ["Motor", ft.motor], ["Potência", ft.potencia], ["Câmbio", ft.cambio], ["Tração", ft.tracao],
        ["Consumo cidade", ft.consumoUrbano], ["Consumo estrada", ft.consumoEstrada],
        ["0-100 km/h", ft.aceleracao], ["Velocidade máx.", ft.velocidadeMaxima],
        ["Porta-malas", ft.portaMalas], ["Dimensões", ft.dimensoes],
      ].filter(([, v]) => v && String(v).trim()) as [string, string][])
    : [];

  return (
    <>
      {/* ─── Avaliações do modelo ─── */}
      <div style={{ padding: "0 8px" }}>
        <Bar title="Avaliações do Modelo" accent="#7c3aed" icon={Star} />
        <Body>
          <div style={{ marginBottom: 14 }}>{iaBadge}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
            <div style={{
              gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between",
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
                <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, margin: "0 0 10px" }}>{insights.manutencao.resumo}</p>
                {insights.manutencao.itens && insights.manutencao.itens.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {insights.manutencao.itens.map((it, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 10px", background: i % 2 ? "#f8fafc" : "#fff", borderRadius: 6, border: "1px solid #f1f5f9" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{it.item}</div>
                          <div style={{ fontSize: 10, color: "#94a3b8" }}>{it.periodicidade}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#0891b2", whiteSpace: "nowrap" }}>{it.custo}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Body>
      </div>

      {/* ─── Ficha técnica ─── */}
      {ftRows.length > 0 && (
        <div style={{ padding: "0 8px" }}>
          <Bar title="Ficha Técnica do Modelo" accent="#0891b2" icon={Settings} />
          <Body>
            <div style={{ marginBottom: 12 }}>{iaBadge}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              {ftRows.map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 700, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
          </Body>
        </div>
      )}

      {/* ─── Comparativo com similares ─── */}
      {insights.similares && insights.similares.length > 0 && (
        <div style={{ padding: "0 8px" }}>
          <Bar title="Comparativo com Modelos Similares" accent="#1e293b" icon={GitCompare} />
          <Body>
            <div style={{ marginBottom: 12 }}>{iaBadge}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {insights.similares.map((s, i) => (
                <div key={i} style={{ border: "1px solid #e5e7eb", borderLeft: "4px solid #FF4D30", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{s.nome}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginBottom: s.observacao ? 6 : 0 }}>
                    {s.potencia && <span style={{ fontSize: 11, color: "#475569" }}><b>Potência:</b> {s.potencia}</span>}
                    {s.consumo && <span style={{ fontSize: 11, color: "#475569" }}><b>Consumo:</b> {s.consumo}</span>}
                    {s.portaMalas && <span style={{ fontSize: 11, color: "#475569" }}><b>Porta-malas:</b> {s.portaMalas}</span>}
                  </div>
                  {s.observacao && <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{s.observacao}</p>}
                </div>
              ))}
            </div>
          </Body>
        </div>
      )}
    </>
  );
}
