import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { consultaAuditLog, users } from "@/lib/db/schema";
import { and, desc, eq, gte, lte, or, ilike, sql, type SQL } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";
import { CONSULTA_PURPOSE_LABELS } from "@/lib/consulta-purpose";

/**
 * Trilha de auditoria individualizada das consultas veiculares.
 *
 * Exigida pela Nota Técnica SENATRAN nº 554/2026, item 3.2.2.5, que determina
 * que a documentação das salvaguardas "deverá permanecer à disposição da
 * SENATRAN e da Autoridade Nacional de Proteção de Dados, nos termos do art.
 * 10, § 3º, da Lei nº 13.709/2018".
 *
 * A exportação em CSV existe justamente para atender a uma requisição desses
 * órgãos sem depender de acesso ao banco.
 */

export const dynamic = "force-dynamic";

const LIMITE_PADRAO = 300;
const LIMITE_CSV = 5000;

// Fuso de Brasília. O país não adota horário de verão desde 2019, então o
// deslocamento é estável.
const OFFSET_BR = "-03:00";

const OUTCOME_LABELS: Record<string, string> = {
  executed: "Executada",
  blocked_rate_limit: "Bloqueada — limite de volume",
  rejected_purpose: "Recusada — finalidade não declarada",
  rejected_plate: "Recusada — placa inválida",
  rejected_request: "Recusada — pedido inválido",
  failed: "Falha na consulta",
};

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

function fmtDateBR(d: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(d);
}

export async function GET(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q")?.trim();
    const outcome = sp.get("outcome")?.trim();
    const from = sp.get("from")?.trim();
    const to = sp.get("to")?.trim();
    const isCsv = sp.get("format") === "csv";

    const filtros: SQL[] = [];
    if (outcome && outcome !== "todos") {
      filtros.push(eq(consultaAuditLog.outcome, outcome));
    }
    if (from) {
      filtros.push(gte(consultaAuditLog.createdAt, new Date(`${from}T00:00:00${OFFSET_BR}`)));
    }
    if (to) {
      filtros.push(lte(consultaAuditLog.createdAt, new Date(`${to}T23:59:59.999${OFFSET_BR}`)));
    }
    if (q) {
      const termo = `%${q}%`;
      const busca = or(
        ilike(consultaAuditLog.plate, termo),
        ilike(users.name, termo),
        ilike(users.email, termo)
      );
      if (busca) filtros.push(busca);
    }
    const where = filtros.length ? and(...filtros) : undefined;

    const base = db
      .select({
        id: consultaAuditLog.id,
        createdAt: consultaAuditLog.createdAt,
        plate: consultaAuditLog.plate,
        purpose: consultaAuditLog.purpose,
        outcome: consultaAuditLog.outcome,
        detail: consultaAuditLog.detail,
        ipAddress: consultaAuditLog.ipAddress,
        userAgent: consultaAuditLog.userAgent,
        requestId: consultaAuditLog.requestId,
        userId: consultaAuditLog.userId,
        userName: users.name,
        userEmail: users.email,
      })
      .from(consultaAuditLog)
      .leftJoin(users, eq(consultaAuditLog.userId, users.id));

    const rows = await (where ? base.where(where) : base)
      .orderBy(desc(consultaAuditLog.createdAt))
      .limit(isCsv ? LIMITE_CSV : LIMITE_PADRAO);

    if (isCsv) {
      const cabecalho = [
        "Data/hora (Brasilia)",
        "Usuario",
        "E-mail",
        "ID do usuario",
        "Placa",
        "Finalidade declarada",
        "Desfecho",
        "Detalhe",
        "IP",
        "User-agent",
      ];
      const linhas = rows.map((r) =>
        [
          fmtDateBR(r.createdAt),
          r.userName ?? "",
          r.userEmail ?? "",
          r.userId,
          r.plate ?? "",
          r.purpose ? CONSULTA_PURPOSE_LABELS[r.purpose] : "",
          OUTCOME_LABELS[r.outcome] ?? r.outcome,
          r.detail ?? "",
          r.ipAddress ?? "",
          r.userAgent ?? "",
        ]
          .map(csvEscape)
          .join(";")
      );
      // BOM para o Excel abrir os acentos corretamente.
      const csv = "\uFEFF" + [cabecalho.map(csvEscape).join(";"), ...linhas].join("\r\n");
      const hoje = new Date().toISOString().slice(0, 10);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="trilha-auditoria-consultas-${hoje}.csv"`,
        },
      });
    }

    // Consolidado por desfecho, no mesmo recorte de filtros.
    const agregadoBase = db
      .select({
        outcome: consultaAuditLog.outcome,
        total: sql<number>`count(*)::int`,
      })
      .from(consultaAuditLog)
      .leftJoin(users, eq(consultaAuditLog.userId, users.id));

    const stats = await (where ? agregadoBase.where(where) : agregadoBase).groupBy(
      consultaAuditLog.outcome
    );

    return NextResponse.json({ rows, stats, limite: LIMITE_PADRAO });
  } catch (err) {
    console.error("Erro ao buscar trilha de auditoria:", err);
    return NextResponse.json(
      { error: "Erro ao buscar a trilha de auditoria" },
      { status: 500 }
    );
  }
}
