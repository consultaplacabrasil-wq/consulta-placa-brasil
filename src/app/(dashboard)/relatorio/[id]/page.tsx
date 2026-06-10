import { redirect, notFound } from "next/navigation";
import { DownloadPdfButton } from "./download-pdf-button";
import { ShareButton } from "./share-button";
import { ModelInsights } from "./model-insights";
import { ModelInsightsView } from "./model-insights-view";
import { FipeVariation } from "./fipe-variation";
import { getFipePrecos } from "@/lib/fipe";
import { getCachedInsights } from "@/lib/modelo/insights-cache";
import { getBlogReviews } from "@/lib/modelo/blog-reviews";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Car,
  CreditCard,
  FileText,
  Lock,
  Shield,
  Fuel,
  Palette,
  Hash,
  Gauge,
  MapPin,
  Calendar,
  Globe,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { generateReportToken } from "@/lib/report-token";

type ReportRow = typeof reports.$inferSelect;

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Relatório ${id}`, robots: { index: false, follow: false } };
}

/* ─────────────────────────────────────────────────────────
   INLINE-STYLED COMPONENTS (for print fidelity)
   ───────────────────────────────────────────────────────── */

function SectionBar({ icon: Icon, title, accent = "#FF4D30" }: { icon: LucideIcon; title: string; accent?: string }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderRadius: "8px 8px 0 0",
    }}>
      <Icon style={{ width: 18, height: 18, color: "#fff" }} />
      <span style={{
        color: "#fff",
        fontWeight: 800,
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
      }}>{title}</span>
    </div>
  );
}

function SectionBody({ children, border = true }: { children: React.ReactNode; border?: boolean }) {
  return (
    <div style={{
      background: "#fff",
      border: border ? "1px solid #e5e7eb" : "none",
      borderTop: "none",
      borderRadius: "0 0 8px 8px",
      padding: "20px 24px",
    }}>
      {children}
    </div>
  );
}

function FieldRow({ icon: Icon, label, value }: { icon?: LucideIcon; label: string; value: string | number | undefined | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      padding: "10px 0",
      borderBottom: "1px solid #f1f5f9",
    }}>
      {Icon && <Icon style={{ width: 14, height: 14, color: "#FF4D30", marginTop: 2, flexShrink: 0 }} />}
      <div style={{ flex: 1 }}>
        <span style={{ display: "block", fontSize: "10px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ display: "block", fontSize: "13px", color: "#1e293b", fontWeight: 700, marginTop: 2 }}>
          {String(value)}
        </span>
      </div>
    </div>
  );
}

function AlertBadge({ icon: Icon, label, danger }: { icon: LucideIcon; label: string; danger: boolean }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 20px",
      minWidth: 130,
      borderRadius: 10,
      background: danger ? "#fef2f2" : "#f0fdf4",
      border: `2px solid ${danger ? "#fecaca" : "#bbf7d0"}`,
    }}>
      <Icon style={{ width: 28, height: 28, color: danger ? "#ef4444" : "#22c55e", marginBottom: 8 }} />
      <span style={{
        fontSize: "10px",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: danger ? "#dc2626" : "#16a34a",
        textAlign: "center",
        lineHeight: 1.3,
      }}>{label}</span>
    </div>
  );
}

function DebitLine({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid #f1f5f9",
      borderLeft: `4px solid ${ok ? "#22c55e" : "#ef4444"}`,
      background: ok ? "#f0fdf4" : "#fef2f2",
      borderRadius: 6,
      marginBottom: 6,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {ok
          ? <CheckCircle style={{ width: 16, height: 16, color: "#22c55e" }} />
          : <XCircle style={{ width: 16, height: 16, color: "#ef4444" }} />
        }
        <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{label}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: ok ? "#16a34a" : "#dc2626" }}>{value}</span>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ height: 1, background: "linear-gradient(to right, transparent, #FF4D30, transparent)", margin: "4px 0", opacity: 0.2 }} />
  );
}

function humanizeLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Detecta sinal de ocorrência/pendência num objeto de risco (recursivo, conservador):
// procura booleano true em chaves como constaOcorrencia, possui*, pendente, ativo, remarcado.
function temOcorrencia(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(temOcorrencia);
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const key = k.toLowerCase();
    if (typeof v === "boolean" && v === true && /(consta|possui|pendente|ativ|remarc|restric)/.test(key)) {
      return true;
    }
    if (v && typeof v === "object" && temOcorrencia(v)) return true;
  }
  return false;
}

// Extrai a quantidade de proprietários do retorno (estrutura variável)
function extrairQtdProprietarios(obj: unknown): string {
  if (!obj || typeof obj !== "object") return "";
  const o = obj as Record<string, unknown>;
  for (const [k, v] of Object.entries(o)) {
    if (/(quant|qtd|total|numero).*propriet|propriet.*(quant|qtd|total)/i.test(k) &&
        (typeof v === "number" || (typeof v === "string" && /^\d+$/.test(v)))) {
      return String(v);
    }
  }
  for (const [k, v] of Object.entries(o)) {
    if (/propriet/i.test(k) && Array.isArray(v) && v.length > 0) return String(v.length);
    if (v && typeof v === "object") {
      const nested = extrairQtdProprietarios(v);
      if (nested) return nested;
    }
  }
  return "";
}

// Remove marca repetida em sequência (ex.: "FIAT/FIAT/SIENA" → "FIAT/SIENA")
function dedupeMarcaModelo(s: string): string {
  if (!s) return s;
  const parts = s.split("/").map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (out.length === 0 || out[out.length - 1].toUpperCase() !== p.toUpperCase()) {
      out.push(p);
    }
  }
  return out.join("/");
}

const HIDDEN_KEYS = new Set(["error", "errors", "_erros", "message", "status_code", "tax", "balance", "valor_consulta"]);

// Renderizador genérico: exibe qualquer objeto/array/valor de forma legível
function renderGenericData(value: unknown, depth = 0): React.ReactNode {
  if (value === null || value === undefined || value === "") return null;

  // Primitivo
  if (typeof value !== "object") {
    let display: string;
    if (typeof value === "boolean") {
      display = value ? "Sim" : "Não";
    } else {
      const s = String(value).trim();
      const low = s.toLowerCase();
      display = low === "true" ? "Sim" : low === "false" ? "Não" : s;
    }
    return <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 700 }}>{display}</span>;
  }

  // Array
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {value.map((item, i) => (
          <div key={i} style={{
            border: "1px solid #e5e7eb",
            borderLeft: "4px solid #FF4D30",
            borderRadius: 8,
            padding: "12px 16px",
            background: "#fff",
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
              Registro {i + 1}
            </div>
            {renderGenericData(item, depth + 1)}
          </div>
        ))}
      </div>
    );
  }

  // Objeto
  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([k, v]) => !HIDDEN_KEYS.has(k) && v !== null && v !== undefined && v !== ""
  );
  if (entries.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: depth === 0 ? "1fr 1fr" : "1fr", gap: "0 24px" }}>
      {entries.map(([k, v]) => {
        const isNested = typeof v === "object" && v !== null;
        if (isNested) {
          return (
            <div key={k} style={{ gridColumn: "1 / -1", padding: "8px 0" }}>
              <span style={{ display: "block", fontSize: 11, color: "#FF4D30", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                {humanizeLabel(k)}
              </span>
              {renderGenericData(v, depth + 1)}
            </div>
          );
        }
        return <FieldRow key={k} label={humanizeLabel(k)} value={String(v)} />;
      })}
    </div>
  );
}

// Seção genérica que só renderiza se houver dados
function GenericSection({ icon, title, accent, data }: {
  icon: LucideIcon; title: string; accent: string; data: unknown;
}) {
  const content = renderGenericData(data);
  if (!content) return null;
  return (
    <div style={{ padding: "0 8px" }}>
      <SectionBar icon={icon} title={title} accent={accent} />
      <SectionBody>{content}</SectionBody>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────── */

export async function ReportContent({ report, consultaName, headerActions }: {
  report: ReportRow;
  consultaName: string | null;
  headerActions?: ReactNode;
}) {
  const data = report.data as {
    veiculo?: Record<string, unknown>;
    debitos?: Record<string, unknown>;
    multas?: Record<string, unknown>;
    gravame?: Record<string, unknown>;
    leilao?: Record<string, unknown>;
    roubo_furto?: Record<string, unknown>;
    recall?: Record<string, unknown>;
    proprietario?: Record<string, unknown>;
    renajud?: Record<string, unknown>;
  };
  const vRaw = data.veiculo || {};
  const str = (val: unknown) => (val ? String(val) : "");

  // Achata o shape aninhado da "Agregados Simples" (marca{}, ano{}, estado{})
  // para chaves planas, mantendo o que já vier plano (Agregados v2).
  const v: Record<string, unknown> = { ...vRaw };
  if (v.marca && typeof v.marca === "object") {
    const m = v.marca as Record<string, unknown>;
    v.marcaModelo = v.marcaModelo || m.modelo || m.fabricante;
    v.marca = m.fabricante;
  }
  if (v.ano && typeof v.ano === "object") {
    const a = v.ano as Record<string, unknown>;
    v.anoFabricacao = v.anoFabricacao || a.fabricacao;
    v.anoModelo = v.anoModelo || a.modelo;
  }
  if (v.estado && typeof v.estado === "object") {
    const e = v.estado as Record<string, unknown>;
    v.municipio = v.municipio || e.municipio;
    v.uf = v.uf || e.uf;
  }

  // Lê o primeiro campo presente (aceita camelCase do agregados e snake_case legado).
  // Ignora objetos para evitar "[object Object]".
  const g = (...keys: string[]): string => {
    for (const k of keys) {
      const val = v[k];
      if (val !== undefined && val !== null && val !== "" && typeof val !== "object") {
        return String(val);
      }
    }
    return "";
  };

  // Modelo do veículo
  const modeloStr = dedupeMarcaModelo(
    g("marcaModelo", "marca_modelo") ||
    [g("marca", "fabricante"), g("modelo")].filter(Boolean).join("/") ||
    ""
  );

  // Código FIPE (pode vir como array [{codigo}], objeto, string camelCase ou snake_case)
  function extrairCodigoFipe(val: unknown): string {
    if (!val) return "";
    if (typeof val === "string") return val.trim();
    if (Array.isArray(val) && val.length > 0) {
      const first = val[0] as Record<string, unknown>;
      return String(first?.codigo || first?.codigoFipe || "").trim();
    }
    if (typeof val === "object") {
      const o = val as Record<string, unknown>;
      return String(o.codigo || o.codigoFipe || "").trim();
    }
    return "";
  }
  const fipeCodigo = extrairCodigoFipe(vRaw.codigoFipe || vRaw.codigo_fipe || vRaw.fipe);

  // Dados externos renderizados no servidor (garante presença no PDF)
  const fipePrecos = await getFipePrecos(fipeCodigo);
  const cachedInsights = await getCachedInsights(modeloStr);
  const blogReviews = await getBlogReviews(g("marca", "fabricante"), g("familia") || g("modelo") || modeloStr);

  const tipoLabel = report.type === "basic" ? "Consulta Veicular Segura" : report.type === "complete" ? "Consulta Veicular Segura" : "Consulta Veicular Completa";
  const gravameRaw = data.gravame as Record<string, unknown> | undefined;
  const gravameList: Record<string, string | null>[] = Array.isArray(gravameRaw?.gravame) ? (gravameRaw.gravame as Record<string, string | null>[]) : [];
  const hasGravame = gravameList.length > 0;
  const hasActiveGravame = gravameList.some((g) => !String(g.situacao || "").toLowerCase().includes("baixado"));
  const hasDebitos = data.debitos && Object.keys(data.debitos).length > 0;
  const isOk = (val: unknown) => { const x = str(val).toLowerCase(); return !x || x === "0" || x === "0.00" || x === "quitado" || x === "regular" || x === "nada consta" || x === "nenhum"; };

  const dateStr = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(report.createdAt);

  // ── Análise de comercialização (estimativa, com base nos itens consultados) ──
  const temModulosRisco = !!(data.debitos || data.gravame || data.leilao || data.roubo_furto || data.recall);
  const anoModeloNum = parseInt(g("anoModelo", "ano_modelo")) || 0;
  const idadeVeiculo = anoModeloNum ? new Date().getFullYear() - anoModeloNum : 0;
  const fatoresComercializacao: { label: string; ok: boolean }[] = [];
  let scoreComercializacao = 100;
  if (data.debitos) {
    if (hasDebitos) { scoreComercializacao -= 12; fatoresComercializacao.push({ label: "Débitos pendentes", ok: false }); }
    else fatoresComercializacao.push({ label: "Sem débitos", ok: true });
  }
  if (data.gravame) {
    if (hasActiveGravame) { scoreComercializacao -= 25; fatoresComercializacao.push({ label: "Gravame ativo (financiamento)", ok: false }); }
    else fatoresComercializacao.push({ label: "Sem gravame ativo", ok: true });
  }
  if (idadeVeiculo >= 15) { scoreComercializacao -= 12; fatoresComercializacao.push({ label: `Idade do veículo: ${idadeVeiculo} anos`, ok: false }); }
  else if (idadeVeiculo >= 10) { scoreComercializacao -= 6; fatoresComercializacao.push({ label: `Idade do veículo: ${idadeVeiculo} anos`, ok: true }); }
  else if (idadeVeiculo > 0) { fatoresComercializacao.push({ label: `Idade do veículo: ${idadeVeiculo} anos`, ok: true }); }
  scoreComercializacao = Math.max(0, Math.min(100, scoreComercializacao));
  const verdictComercializacao =
    scoreComercializacao >= 80 ? { label: "Baixo risco de recusa", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" }
    : scoreComercializacao >= 55 ? { label: "Risco moderado", color: "#b45309", bg: "#fffbeb", border: "#fde68a" }
    : { label: "Risco elevado", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body { margin: 0 !important; padding: 0 !important; }
          body * { visibility: hidden !important; }
          .report-root, .report-root * { visibility: visible !important; }
          .report-root { position: absolute; left: 0; top: 0; width: 100%; padding: 0; }
          .no-print { display: none !important; }
          @page { margin: 8mm; size: A4; }
        }
      `}</style>

      {headerActions && (
        <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
          {headerActions}
        </div>
      )}

      <div className="report-root" style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>

        {/* ═══════════════ HEADER ═══════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: 10,
          padding: "28px 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative diagonal stripe */}
          <div style={{
            position: "absolute",
            top: -30,
            left: -20,
            width: 180,
            height: 180,
            background: "#FF4D30",
            transform: "rotate(-15deg)",
            opacity: 0.15,
            borderRadius: 20,
          }} />
          <div style={{
            position: "absolute",
            bottom: -40,
            right: -30,
            width: 120,
            height: 120,
            background: "#FF4D30",
            borderRadius: "50%",
            opacity: 0.08,
          }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/consulta-placa-brasil-logo-relatorios.png" alt="Consulta Placa Brasil" style={{ height: 30 }} />
                <div style={{ fontSize: 10, color: "#ffffff", letterSpacing: "0.05em", marginTop: 4 }}>consultaplacabrasil.com</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  {tipoLabel}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                  Gerado em: {dateStr}{consultaName ? ` | ${consultaName}` : ""}
                </div>
              </div>
            </div>

            {/* Placa Mercosul */}
            <div style={{
              background: "#fff",
              borderRadius: 8,
              border: "3px solid #003399",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}>
              <div style={{ background: "#003399", color: "#fff", fontSize: 7, fontWeight: 900, textAlign: "center", padding: "2px 0", letterSpacing: "0.3em" }}>
                BRASIL
              </div>
              <div style={{ padding: "6px 18px" }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", letterSpacing: "0.12em", fontFamily: "monospace" }}>
                  {report.plate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Red accent line */}
        <div style={{ height: 4, background: "linear-gradient(to right, #FF4D30, #ff6b52, #FF4D30)" }} />

        {/* Content area */}
        <div style={{ background: "#f8fafc", padding: "24px 0", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ═══════════════ RESUMO DA CONSULTA ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Shield} title="Resumo da Consulta" accent="#0f172a" />
            <SectionBody>
              {(() => {
                const riscos: string[] = [];
                if (hasDebitos) riscos.push("Débitos pendentes");
                if (hasActiveGravame) riscos.push("Gravame ativo (financiamento)");
                const temRisco = riscos.length > 0;
                return (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: temRisco ? "#fffbeb" : "#f0fdf4",
                    border: `2px solid ${temRisco ? "#fde68a" : "#bbf7d0"}`,
                  }}>
                    {temRisco
                      ? <AlertTriangle style={{ width: 28, height: 28, color: "#f59e0b", flexShrink: 0 }} />
                      : <CheckCircle style={{ width: 28, height: 28, color: "#22c55e", flexShrink: 0 }} />}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: temRisco ? "#b45309" : "#16a34a" }}>
                        {temRisco ? "Atenção: itens que merecem cuidado" : "Nenhum risco identificado nos itens consultados"}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        {temRisco
                          ? riscos.join(" · ")
                          : "Os itens verificados nesta consulta não apresentaram pendências."}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </SectionBody>
          </div>

          {/* ═══════════════ GRADE DE INDICADORES ═══════════════ */}
          {(() => {
            const cards: { icon: LucideIcon; label: string; status: string; danger: boolean }[] = [];
            cards.push({ icon: FileText, label: "Dados Cadastrais", status: "Tudo ok", danger: false });
            if (data.proprietario) {
              const qtd = extrairQtdProprietarios(data.proprietario);
              cards.push({ icon: Users, label: "Proprietários", status: qtd || "Consultado", danger: false });
            }
            if (data.debitos) cards.push({ icon: CreditCard, label: "Débitos", status: hasDebitos ? "Possui problemas" : "Tudo ok", danger: !!hasDebitos });
            if (data.multas) { const p = temOcorrencia(data.multas); cards.push({ icon: AlertTriangle, label: "Multas / Infrações", status: p ? "Possui problemas" : "Tudo ok", danger: p }); }
            if (data.gravame) cards.push({ icon: Lock, label: "Gravame", status: hasActiveGravame ? "Possui problemas" : "Tudo ok", danger: hasActiveGravame });
            if (data.leilao) { const p = temOcorrencia(data.leilao); cards.push({ icon: AlertTriangle, label: "Leilão", status: p ? "Possui problemas" : "Tudo ok", danger: p }); }
            if (data.roubo_furto) { const p = temOcorrencia(data.roubo_furto); cards.push({ icon: Shield, label: "Roubo e Furto", status: p ? "Possui problemas" : "Tudo ok", danger: p }); }
            if (data.recall) { const p = temOcorrencia(data.recall); cards.push({ icon: AlertTriangle, label: "Recall", status: p ? "Fique atento" : "Tudo ok", danger: p }); }
            if (data.renajud) { const p = temOcorrencia(data.renajud); cards.push({ icon: Lock, label: "Restrições Renajud", status: p ? "Possui problemas" : "Tudo ok", danger: p }); }
            cards.push({ icon: Shield, label: "Comercialização", status: scoreComercializacao >= 80 ? "Baixo risco" : scoreComercializacao >= 55 ? "Risco moderado" : "Risco elevado", danger: scoreComercializacao < 55 });
            return (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, padding: "0 8px" }}>
                {cards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} style={{
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      gap: 6, padding: "14px 10px", borderRadius: 10,
                      background: c.danger ? "#fef2f2" : "#f0fdf4",
                      border: `1.5px solid ${c.danger ? "#fecaca" : "#bbf7d0"}`,
                      textAlign: "center",
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.3 }}>{c.label}</span>
                      <Icon style={{ width: 22, height: 22, color: c.danger ? "#ef4444" : "#22c55e" }} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: c.danger ? "#dc2626" : "#16a34a" }}>{c.status}</span>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* ═══════════════ DADOS ORIGINAIS ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Car} title="Dados Originais do Veículo" accent="#FF4D30" />
            <SectionBody>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                <FieldRow icon={Car} label="Placa" value={g("placa") || report.plate} />
                <FieldRow icon={Car} label="Marca / Modelo" value={dedupeMarcaModelo(g("marcaModelo", "marca_modelo") || [g("marca", "fabricante"), g("modelo")].filter(Boolean).join("/"))} />
                <FieldRow icon={Hash} label="Chassi" value={g("chassi")} />
                <FieldRow icon={Hash} label="Nº Motor" value={g("numMotor", "numero_motor", "numeroMotor")} />
                <FieldRow icon={Hash} label="RENAVAM" value={g("renavam")} />
                <FieldRow icon={Fuel} label="Combustível" value={g("combustivel", "codigoCombustivel", "combustivel_descricao")} />
                <FieldRow icon={Palette} label="Cor" value={g("corVeiculo", "cor")} />
                <FieldRow icon={Car} label="Tipo de Veículo" value={g("tipoVeiculo", "tipo_veiculo", "tipo")} />
                <FieldRow icon={MapPin} label="Município / UF" value={[g("municipio", "cidade"), g("uf", "ufJurisdicao", "uf_jurisdicao", "ufFaturado", "uf_faturado")].filter(Boolean).join(" / ")} />
                <FieldRow icon={Calendar} label="Ano Fabricação" value={g("anoFabricacao", "ano_fabricacao")} />
                <FieldRow icon={Calendar} label="Ano Modelo" value={g("anoModelo", "ano_modelo")} />
                <FieldRow icon={Car} label="Espécie" value={g("especieVeiculo", "especie")} />
                <FieldRow icon={Car} label="Categoria" value={g("categoria")} />
                <FieldRow icon={Car} label="Carroceria" value={g("tipoCarroceria", "tipo_carroceria")} />
                <FieldRow icon={Gauge} label="Potência" value={g("potencia") ? `${g("potencia")} CV` : undefined} />
                <FieldRow icon={Gauge} label="Cilindradas" value={g("cilindradas") ? `${g("cilindradas")} cc` : undefined} />
                <FieldRow icon={Users} label="Lotação / Passageiros" value={g("capacidadePassageiro", "quantidade_lugares", "capacidade_passageiros")} />
                <FieldRow icon={Globe} label="Nacionalidade / Procedência" value={g("nacionalidade", "procedencia")} />
                <FieldRow label="Peso Bruto Total" value={g("pbt", "peso_bruto_total") ? `${g("pbt", "peso_bruto_total")} kg` : undefined} />
                <FieldRow label="Cap. Máx. Tração" value={g("capMaxTracao", "capacidade_max_tracao")} />
                <FieldRow label="Nº Eixos" value={g("eixos", "quantidade_eixo")} />
                <FieldRow label="Caixa de Câmbio" value={g("caixaCambio", "numero_caixa_cambio")} />
                <FieldRow label="Cap. Carga" value={g("capacidadeCarga", "carga") ? `${g("capacidadeCarga", "carga")} kg` : undefined} />
                <FieldRow label="Nº Carroceria" value={g("numCarroceria", "numero_carroceria")} />
                <FieldRow label="Família" value={g("familia")} />
                <FieldRow label="Cilindros" value={g("cilindros")} />
              </div>
            </SectionBody>
          </div>

          {/* ═══════════════ ANÁLISE DE COMERCIALIZAÇÃO ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Shield} title="Análise de Comercialização (estimativa)" accent="#0f172a" />
            <SectionBody>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  width: 110, height: 110, borderRadius: "50%",
                  border: `6px solid ${verdictComercializacao.border}`, background: verdictComercializacao.bg,
                }}>
                  <span style={{ fontSize: 30, fontWeight: 900, color: verdictComercializacao.color, lineHeight: 1 }}>{scoreComercializacao}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>/ 100</span>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: verdictComercializacao.color, marginBottom: 8 }}>
                    {verdictComercializacao.label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {fatoresComercializacao.map((f) => (
                      <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}>
                        {f.ok
                          ? <CheckCircle style={{ width: 14, height: 14, color: "#22c55e", flexShrink: 0 }} />
                          : <AlertTriangle style={{ width: 14, height: 14, color: "#f59e0b", flexShrink: 0 }} />}
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6, marginTop: 14, marginBottom: 0 }}>
                Indicador estimado de facilidade de revenda, com base nos itens desta consulta e na idade do veículo.
                {!temModulosRisco && " Para uma análise completa (leilão, sinistro, roubo/furto e débitos), utilize a consulta Premium."}
              </p>
            </SectionBody>
          </div>

          {/* ═══════════════ TABELA FIPE (server-side) ═══════════════ */}
          <FipeVariation precos={fipePrecos} />

          {/* ═══════════════ DÉBITOS ═══════════════ */}
          {data.debitos && (
            <div style={{ padding: "0 8px" }}>
              <SectionBar icon={CreditCard} title="Débitos Veiculares" accent="#1e293b" />
              <SectionBody>
                {hasDebitos ? (
                  <div>
                    {Object.entries(data.debitos!).map(([key, val]) => {
                      const display = typeof val === "object" && val !== null ? JSON.stringify(val) : String(val ?? "Nada consta");
                      return <DebitLine key={key} label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} value={display} ok={isOk(val)} />;
                    })}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                    <CheckCircle style={{ width: 20, height: 20, color: "#22c55e" }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Nenhum débito encontrado para este veículo</span>
                  </div>
                )}
              </SectionBody>
            </div>
          )}

          {/* ═══════════════ GRAVAME ═══════════════ */}
          {data.gravame && (
            <div style={{ padding: "0 8px" }}>
              <SectionBar icon={Lock} title="Gravame (Financiamento)" accent="#1e293b" />
              <SectionBody>
                {hasGravame ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {gravameList.map((g, i) => {
                      const baixado = String(g.situacao || "").toLowerCase().includes("baixado");
                      return (
                        <div key={i} style={{
                          borderLeft: `5px solid ${baixado ? "#22c55e" : "#f59e0b"}`,
                          background: baixado ? "#f0fdf4" : "#fffbeb",
                          borderRadius: 8,
                          padding: "16px 20px",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            {baixado
                              ? <CheckCircle style={{ width: 18, height: 18, color: "#22c55e" }} />
                              : <AlertTriangle style={{ width: 18, height: 18, color: "#f59e0b" }} />
                            }
                            <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#334155" }}>
                              {String(g.situacao || g.gravame || `Gravame ${i + 1}`)}
                            </span>
                          </div>
                          <Divider />
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px", marginTop: 8 }}>
                            <FieldRow label="Placa" value={g.placa} />
                            <FieldRow label="Chassi" value={g.chassi} />
                            <FieldRow label="RENAVAM" value={g.renavam} />
                            <FieldRow label="UF" value={g.ufPlaca || g.uf} />
                            <FieldRow label="Agente Financeiro" value={g.agente} />
                            <FieldRow label="Nº Contrato" value={g.contrato} />
                            <FieldRow label="Nº Gravame" value={g.numero} />
                            <FieldRow label="Doc. Financiado" value={g.documentoFinanciado} />
                            <FieldRow label="Observações" value={g.observacoes} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                    <CheckCircle style={{ width: 20, height: 20, color: "#22c55e" }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Nenhum gravame encontrado para este veículo</span>
                  </div>
                )}
              </SectionBody>
            </div>
          )}

          {/* ═══════════════ MULTAS (RENAINF) ═══════════════ */}
          <GenericSection icon={AlertTriangle} title="Multas e Infrações (Renainf)" accent="#b45309" data={data.multas} />

          {/* ═══════════════ LEILÃO ═══════════════ */}
          <GenericSection icon={AlertTriangle} title="Histórico de Leilão" accent="#7c3aed" data={data.leilao} />

          {/* ═══════════════ ROUBO E FURTO ═══════════════ */}
          <GenericSection icon={Shield} title="Roubo e Furto" accent="#1e293b" data={data.roubo_furto} />

          {/* ═══════════════ RECALL ═══════════════ */}
          <GenericSection icon={AlertTriangle} title="Recall do Fabricante" accent="#0891b2" data={data.recall} />

          {/* ═══════════════ PROPRIETÁRIO ═══════════════ */}
          <GenericSection icon={Users} title="Proprietário Atual" accent="#1e293b" data={data.proprietario} />

          {/* ═══════════════ RESTRIÇÕES JUDICIAIS (RENAJUD) ═══════════════ */}
          <GenericSection icon={Lock} title="Restrições Judiciais (Renajud)" accent="#1e293b" data={data.renajud} />

          {/* ═══════════════ AVALIAÇÕES DO MODELO (IA) ═══════════════ */}
          {cachedInsights
            ? <ModelInsightsView insights={cachedInsights} />
            : (modeloStr ? <ModelInsights modelo={modeloStr} /> : null)}

          {/* ═══════════════ REVIEW DO NOSSO BLOG ═══════════════ */}
          {blogReviews.length > 0 && (
            <div style={{ padding: "0 8px" }}>
              <SectionBar icon={FileText} title="Veja no nosso blog" accent="#1e293b" />
              <SectionBody>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {blogReviews.map((b) => (
                    <a
                      key={b.slug}
                      href={`/noticias/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", gap: 12, alignItems: "center",
                        border: "1px solid #e5e7eb", borderRadius: 8, padding: 10,
                        textDecoration: "none",
                      }}
                    >
                      {b.imagemUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.imagemUrl} alt={b.titulo} style={{ width: 84, height: 60, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}>{b.titulo}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{b.resumo}</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#FF4D30" }}>Ler matéria →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </SectionBody>
            </div>
          )}

          {/* ═══════════════ COMO VERIFICAR O VEÍCULO ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Shield} title="Como verificar o veículo pessoalmente" accent="#0891b2" />
            <SectionBody>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 14, lineHeight: 1.6 }}>
                Antes de fechar negócio, confira fisicamente estes pontos para evitar fraudes e confronte com os dados deste relatório:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { t: "CRLV (documento)", d: "Confira se os dados do documento batem com os do veículo e com esta consulta. No CRLV em papel, a faixa azul (“República Federativa do Brasil”) solta tinta ao ser raspada — sinal de original. Na versão digital, leia o QR Code pelo app oficial do Detran." },
                  { t: "Placa", d: "Em placas Mercosul, leia o QR Code com o aplicativo oficial e confronte os dados no portal da Senatran. Em placas antigas, verifique se o lacre da placa traseira não está rompido ou danificado." },
                  { t: "Chassi", d: "Localize o chassi gravado no veículo (cofre do motor, coluna da porta) e compare com o número deste relatório. Qualquer divergência é um forte sinal de adulteração." },
                  { t: "Número do motor", d: "Compare o número gravado no bloco do motor com o número informado nesta consulta. Eles devem ser idênticos, sem qualquer divergência." },
                  { t: "Etiquetas de identificação", d: "Verifique se as peças mantêm as etiquetas de fábrica. A ausência pode indicar peças de origem irregular (de veículos roubados ou furtados)." },
                  { t: "Vidros", d: "Os vidros devem ter a gravação dos últimos dígitos do chassi. Faltas, divergências ou vidros sem gravação merecem atenção." },
                ].map((item) => (
                  <div key={item.t} style={{
                    borderLeft: "4px solid #0891b2",
                    background: "#f0f9ff",
                    borderRadius: 6,
                    padding: "10px 14px",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                      {item.t}
                    </div>
                    <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>
                      {item.d}
                    </div>
                  </div>
                ))}
              </div>
            </SectionBody>
          </div>

          {/* ═══════════════ OBSERVAÇÕES ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Shield} title="Observações" accent="#64748b" />
            <SectionBody>
              <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.7 }}>
                <p style={{ marginBottom: 8 }}>
                  Ainda que empregando os melhores esforços, o sistema Consulta Placa Brasil se exime de qualquer
                  responsabilidade pela eventual inclusão ou não inclusão ou informação errônea de algum dado do veículo
                  em razão de atraso ou falta do encaminhamento dos dados em qualquer uma das consultas oferecidas.
                </p>
                <p>
                  O sistema Consulta Placa Brasil não pode ser utilizado como garantidor do veículo e nem das informações
                  prestadas. Sua única função é apresentar o máximo de informações disponíveis no momento da consulta.
                </p>
              </div>
            </SectionBody>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <div style={{ height: 2, background: "linear-gradient(to right, transparent, #FF4D30, transparent)", marginBottom: 12, opacity: 0.3 }} />
            <span style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.15em" }}>consultaplacabrasil.com</span>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PÁGINA PRIVADA (dono logado)
   ───────────────────────────────────────────────────────── */
export default async function RelatorioPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { id } = await params;

  let report = await db.select().from(reports).where(eq(reports.id, id)).limit(1).then((r) => r[0]);
  if (!report) report = await db.select().from(reports).where(eq(reports.requestId, id)).limit(1).then((r) => r[0]);
  if (!report) notFound();

  const [request] = await db.select().from(reportRequests)
    .where(and(eq(reportRequests.id, report.requestId), eq(reportRequests.userId, session.user.id))).limit(1);
  if (!request) notFound();

  const token = generateReportToken(report.id);
  const sharePath = `/r/${report.id}/${token}`;

  return (
    <ReportContent
      report={report}
      consultaName={request.consultaName}
      headerActions={
        <>
          <ShareButton plate={report.plate} path={sharePath} />
          <DownloadPdfButton />
        </>
      }
    />
  );
}
