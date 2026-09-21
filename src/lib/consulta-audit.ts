import { db } from "@/lib/db";
import { consultaAuditLog } from "@/lib/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import type { ConsultaPurpose } from "@/lib/consulta-purpose";

// Reexportados para que a rota importe tudo de um unico modulo.
export {
  CONSULTA_PURPOSES,
  CONSULTA_PURPOSE_LABELS,
  isConsultaPurpose,
} from "@/lib/consulta-purpose";
export type { ConsultaPurpose } from "@/lib/consulta-purpose";

/**
 * Salvaguardas do legítimo interesse exigidas pela Nota Técnica SENATRAN
 * nº 554/2026 (item 3.2.2.5), no processo SEI 50000.029673/2026-67:
 *
 *  1. declaração expressa da finalidade pelo solicitante no momento da consulta;
 *  2. limitação do volume de consultas por usuário;
 *  3. trilha de auditoria individualizada.
 *
 * A documentação gerada aqui deve permanecer à disposição da SENATRAN e da
 * ANPD, nos termos do art. 10, § 3º, da Lei nº 13.709/2018.
 */

// ──────────────────────────── Limite de volume ────────────────────────────

export type ConsultaOutcome =
  | "executed"
  | "blocked_rate_limit"
  | "rejected_purpose"
  | "rejected_plate"
  | "rejected_request"
  | "failed";

function intFromEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Duas janelas: uma diária, que contém picos, e uma mensal, que contém volume
 * acumulado. Ajustáveis por variável de ambiente para calibrar sem deploy.
 */
export const CONSULTA_RATE_LIMITS = {
  diario: {
    windowMs: DAY_MS,
    max: intFromEnv("CONSULTA_LIMITE_DIARIO", 10),
    label: "24 horas",
  },
  mensal: {
    windowMs: 30 * DAY_MS,
    max: intFromEnv("CONSULTA_LIMITE_MENSAL", 30),
    label: "30 dias",
  },
} as const;

export interface RateLimitVerdict {
  allowed: boolean;
  /** Janela que barrou a consulta, quando allowed === false. */
  window?: keyof typeof CONSULTA_RATE_LIMITS;
  used?: number;
  max?: number;
}

/** Conta consultas efetivamente executadas pelo usuário dentro da janela. */
async function countExecuted(userId: string, windowMs: number): Promise<number> {
  const since = new Date(Date.now() - windowMs);
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(consultaAuditLog)
    .where(
      and(
        eq(consultaAuditLog.userId, userId),
        eq(consultaAuditLog.outcome, "executed"),
        gte(consultaAuditLog.createdAt, since)
      )
    );
  return rows[0]?.count ?? 0;
}

/**
 * Verifica as duas janelas. Em caso de falha do banco, libera a consulta — o
 * fluxo inteiro depende do mesmo banco para gravar o relatório, de modo que
 * uma indisponibilidade já interrompe a operação mais adiante.
 */
export async function checkConsultaRateLimit(
  userId: string
): Promise<RateLimitVerdict> {
  try {
    for (const key of ["diario", "mensal"] as const) {
      const limit = CONSULTA_RATE_LIMITS[key];
      const used = await countExecuted(userId, limit.windowMs);
      if (used >= limit.max) {
        return { allowed: false, window: key, used, max: limit.max };
      }
    }
    return { allowed: true };
  } catch (err) {
    console.error("[consulta-audit] falha ao apurar limite de volume:", err);
    return { allowed: true };
  }
}

export function rateLimitMessage(verdict: RateLimitVerdict): string {
  const key = verdict.window ?? "diario";
  const limit = CONSULTA_RATE_LIMITS[key];
  return (
    `Você atingiu o limite de ${limit.max} consultas em ${limit.label}. ` +
    "Esse limite existe por exigência da SENATRAN, para garantir que cada " +
    "consulta esteja ligada a uma negociação concreta. Seu crédito não foi " +
    "utilizado. Se precisar de um volume maior, fale com o nosso suporte."
  );
}

// ─────────────────────────── Trilha de auditoria ───────────────────────────

export interface ConsultaAuditInput {
  userId: string;
  outcome: ConsultaOutcome;
  requestId?: string | null;
  plate?: string | null;
  purpose?: ConsultaPurpose | null;
  detail?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Registra a tentativa de consulta. Nunca lança: a auditoria não pode derrubar
 * a operação, mas a falha é reportada no console para investigação.
 */
export async function logConsultaAudit(
  input: ConsultaAuditInput
): Promise<void> {
  try {
    await db.insert(consultaAuditLog).values({
      userId: input.userId,
      requestId: input.requestId ?? null,
      plate: input.plate ?? null,
      purpose: input.purpose ?? null,
      outcome: input.outcome,
      detail: input.detail ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    });
  } catch (err) {
    console.error("[consulta-audit] falha ao registrar trilha:", err);
  }
}

/** Extrai o IP de origem respeitando os cabeçalhos de proxy. */
export function getClientIp(headers: Headers): string | null {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip");
}
