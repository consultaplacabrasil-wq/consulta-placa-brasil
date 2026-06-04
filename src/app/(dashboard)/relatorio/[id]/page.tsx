import { redirect, notFound } from "next/navigation";
import { DownloadPdfButton } from "./download-pdf-button";
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
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

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

const HIDDEN_KEYS = new Set(["error", "errors", "_erros", "message", "status_code", "tax", "balance", "valor_consulta"]);

// Renderizador genérico: exibe qualquer objeto/array/valor de forma legível
function renderGenericData(value: unknown, depth = 0): React.ReactNode {
  if (value === null || value === undefined || value === "") return null;

  // Primitivo
  if (typeof value !== "object") {
    return <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 700 }}>{String(value)}</span>;
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
  const v = data.veiculo || {};
  const str = (val: unknown) => (val ? String(val) : "");

  const tipoLabel = report.type === "basic" ? "Consulta Veicular Segura" : report.type === "complete" ? "Consulta Veicular Segura" : "Consulta Veicular Completa";
  const gravameRaw = data.gravame as Record<string, unknown> | undefined;
  const gravameList: Record<string, string | null>[] = Array.isArray(gravameRaw?.gravame) ? (gravameRaw.gravame as Record<string, string | null>[]) : [];
  const hasGravame = gravameList.length > 0;
  const hasActiveGravame = gravameList.some((g) => !String(g.situacao || "").toLowerCase().includes("baixado"));
  const hasDebitos = data.debitos && Object.keys(data.debitos).length > 0;
  const isOk = (val: unknown) => { const x = str(val).toLowerCase(); return !x || x === "0" || x === "0.00" || x === "quitado" || x === "regular" || x === "nada consta" || x === "nenhum"; };

  const dateStr = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(report.createdAt);

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

      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <DownloadPdfButton />
      </div>

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
                  Gerado em: {dateStr}{request.consultaName ? ` | ${request.consultaName}` : ""}
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

          {/* ═══════════════ ALERTAS ═══════════════ */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "0 8px" }}>
            <AlertBadge icon={FileText} label="Dados Cadastrais" danger={false} />
            {data.debitos && <AlertBadge icon={CreditCard} label={hasDebitos ? "Possui Débitos" : "Sem Débitos"} danger={!!hasDebitos} />}
            {data.gravame && <AlertBadge icon={Lock} label={hasActiveGravame ? "Gravame Ativo!" : hasGravame ? "Gravame Baixado" : "Sem Gravame"} danger={hasActiveGravame} />}
            {data.roubo_furto && <AlertBadge icon={Shield} label="Roubo/Furto" danger={false} />}
            {data.leilao && <AlertBadge icon={AlertTriangle} label="Leilão" danger={false} />}
            {data.recall && <AlertBadge icon={AlertTriangle} label="Recall" danger={false} />}
          </div>

          {/* ═══════════════ DADOS ORIGINAIS ═══════════════ */}
          <div style={{ padding: "0 8px" }}>
            <SectionBar icon={Car} title="Dados Originais do Veículo" accent="#FF4D30" />
            <SectionBody>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                <FieldRow icon={Car} label="Placa" value={str(v.placa) || report.plate} />
                <FieldRow icon={Car} label="Marca / Modelo" value={v.fabricante ? `${v.fabricante} / ${v.modelo || ""}` : str(v.modelo)} />
                <FieldRow icon={Hash} label="Chassi" value={str(v.chassi)} />
                <FieldRow icon={Hash} label="Nº Motor" value={str(v.numero_motor)} />
                <FieldRow icon={Hash} label="RENAVAM" value={str(v.renavam)} />
                <FieldRow icon={Fuel} label="Combustível" value={str(v.combustivel)} />
                <FieldRow icon={Palette} label="Cor" value={str(v.cor)} />
                <FieldRow icon={Car} label="Tipo de Veículo" value={str(v.tipo_veiculo || v.tipo)} />
                <FieldRow icon={MapPin} label="Município / UF" value={v.cidade ? `${v.cidade} / ${v.uf_jurisdicao || v.uf_faturado || ""}` : str(v.uf_jurisdicao || v.uf_faturado)} />
                <FieldRow icon={Calendar} label="Ano Fabricação" value={str(v.ano_fabricacao)} />
                <FieldRow icon={Calendar} label="Ano Modelo" value={str(v.ano_modelo)} />
                <FieldRow icon={MapPin} label="UF Faturado" value={str(v.uf_faturado)} />
                <FieldRow icon={Car} label="Espécie" value={str(v.especie)} />
                <FieldRow icon={Car} label="Categoria" value={str(v.categoria)} />
                <FieldRow icon={Car} label="Carroceria" value={str(v.tipo_carroceria)} />
                <FieldRow icon={Gauge} label="Potência" value={v.potencia ? `${v.potencia} CV` : undefined} />
                <FieldRow icon={Gauge} label="Cilindradas" value={v.cilindradas ? `${v.cilindradas} cc` : undefined} />
                <FieldRow icon={Users} label="Lotação / Passageiros" value={str(v.quantidade_lugares || v.capacidade_passageiros)} />
                <FieldRow icon={Globe} label="Nacionalidade" value={str(v.nacionalidade)} />
                <FieldRow label="Peso Bruto Total" value={v.peso_bruto_total ? `${v.peso_bruto_total} kg` : undefined} />
                <FieldRow label="Cap. Máx. Tração" value={str(v.capacidade_max_tracao)} />
                <FieldRow label="Nº Eixos" value={str(v.quantidade_eixo)} />
                <FieldRow label="Nº Caixa de Câmbio" value={str(v.numero_caixa_cambio)} />
                <FieldRow label="Carga" value={v.carga ? `${v.carga} kg` : undefined} />
                <FieldRow label="Nº Carroceria" value={str(v.numero_carroceria)} />
              </div>
            </SectionBody>
          </div>

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
          <GenericSection icon={Shield} title="Roubo e Furto" accent="#dc2626" data={data.roubo_furto} />

          {/* ═══════════════ RECALL ═══════════════ */}
          <GenericSection icon={AlertTriangle} title="Recall do Fabricante" accent="#0891b2" data={data.recall} />

          {/* ═══════════════ PROPRIETÁRIO ═══════════════ */}
          <GenericSection icon={Users} title="Proprietário Atual" accent="#1e293b" data={data.proprietario} />

          {/* ═══════════════ RESTRIÇÕES JUDICIAIS (RENAJUD) ═══════════════ */}
          <GenericSection icon={Lock} title="Restrições Judiciais (Renajud)" accent="#1e293b" data={data.renajud} />

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
