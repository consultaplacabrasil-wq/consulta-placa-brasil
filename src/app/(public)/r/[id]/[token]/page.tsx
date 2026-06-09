import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyReportToken } from "@/lib/report-token";
import { ReportContent } from "@/app/(dashboard)/relatorio/[id]/page";
import { DownloadPdfButton } from "@/app/(dashboard)/relatorio/[id]/download-pdf-button";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return { title: "Relatório Veicular | Consulta Placa Brasil", robots: { index: false, follow: false } };
}

interface Props {
  params: Promise<{ id: string; token: string }>;
}

export default async function PublicReportPage({ params }: Props) {
  const { id, token } = await params;
  if (!verifyReportToken(id, token)) notFound();

  const report = await db.select().from(reports).where(eq(reports.id, id)).limit(1).then((r) => r[0]);
  if (!report) notFound();

  const [request] = await db
    .select()
    .from(reportRequests)
    .where(eq(reportRequests.id, report.requestId))
    .limit(1);

  return (
    <div style={{ background: "#f1f5f9", padding: "24px 16px", minHeight: "60vh" }}>
      {/* Faixa de origem / CTA */}
      <div className="no-print" style={{ maxWidth: 820, margin: "0 auto 16px" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12,
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 18px",
        }}>
          <span style={{ fontSize: 13, color: "#475569" }}>
            Relatório compartilhado via <strong style={{ color: "#0f172a" }}>Consulta Placa Brasil</strong>
          </span>
          <Link
            href="/#consultas"
            style={{
              background: "#FF4D30", color: "#fff", fontSize: 13, fontWeight: 700,
              padding: "8px 16px", borderRadius: 8, textDecoration: "none",
            }}
          >
            Fazer minha consulta
          </Link>
        </div>
      </div>

      <ReportContent
        report={report}
        consultaName={request?.consultaName ?? null}
        headerActions={<DownloadPdfButton />}
      />
    </div>
  );
}
