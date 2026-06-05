import { db } from "@/lib/db";
import { adminLogs } from "@/lib/db/schema";
import { headers } from "next/headers";

export interface AdminLogInput {
  adminId: string;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Record<string, unknown> | null;
}

/**
 * Registra uma ação administrativa crítica em admin_logs.
 * Captura o IP automaticamente. Nunca lança erro (log não pode quebrar a ação).
 */
export async function logAdminAction(input: AdminLogInput): Promise<void> {
  try {
    let ip = "desconhecido";
    try {
      const h = await headers();
      ip =
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        h.get("x-real-ip") ||
        "desconhecido";
    } catch {
      // headers() pode não estar disponível em alguns contextos
    }

    await db.insert(adminLogs).values({
      adminId: input.adminId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      details: input.details ?? null,
      ipAddress: ip,
    });
  } catch (err) {
    console.error("[admin-log] falha ao registrar log:", err);
  }
}
