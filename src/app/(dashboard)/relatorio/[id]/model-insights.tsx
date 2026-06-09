"use client";

import { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { ModelInsightsView, type Insights } from "./model-insights-view";

export function ModelInsights({ modelo }: { modelo: string }) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!modelo) {
      setLoading(false);
      return;
    }
    fetch(`/api/modelo/insights?modelo=${encodeURIComponent(modelo)}`)
      .then((r) => r.json())
      .then((d) => setInsights(d.insights || null))
      .catch(() => setInsights(null))
      .finally(() => setLoading(false));
  }, [modelo]);

  if (loading) {
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
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "20px 24px", display: "flex", alignItems: "center", gap: 10, color: "#94a3b8" }}>
          <Loader2 className="animate-spin" style={{ width: 18, height: 18 }} />
          <span style={{ fontSize: 13 }}>Gerando avaliações do modelo...</span>
        </div>
      </div>
    );
  }

  return <ModelInsightsView insights={insights} />;
}
