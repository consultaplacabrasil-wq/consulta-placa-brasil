import Link from "next/link";
import { Clock } from "lucide-react";
import { MENSAGEM_RELATORIO_EXPIRADO } from "@/lib/retencao";

/**
 * Exibido no lugar do relatório quando o prazo de acesso se esgota.
 *
 * A limitação de prazo decorre da política de retenção (arts. 15 e 16 da Lei
 * nº 13.709/2018). A tela explica o motivo em vez de tratar o caso como "não
 * encontrado", para que o usuário entenda o que aconteceu.
 */
export function RelatorioExpirado() {
  return (
    <div style={{ background: "#f1f5f9", padding: "48px 16px", minHeight: "60vh" }}>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
        <Clock style={{ width: 40, height: 40, color: "#94a3b8", margin: "0 auto 16px" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 12px" }}>
          Relatório não disponível
        </h1>
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 24px" }}>
          {MENSAGEM_RELATORIO_EXPIRADO}
        </p>
        <Link
          href="/#consultas"
          style={{
            display: "inline-block",
            background: "#FF4D30",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            padding: "10px 22px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Fazer uma nova consulta
        </Link>
      </div>
    </div>
  );
}
