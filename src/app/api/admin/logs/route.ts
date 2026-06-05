import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminLogs, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const logs = await db
      .select({
        id: adminLogs.id,
        action: adminLogs.action,
        entity: adminLogs.entity,
        entityId: adminLogs.entityId,
        details: adminLogs.details,
        ipAddress: adminLogs.ipAddress,
        createdAt: adminLogs.createdAt,
        adminName: users.name,
        adminEmail: users.email,
      })
      .from(adminLogs)
      .leftJoin(users, eq(adminLogs.adminId, users.id))
      .orderBy(desc(adminLogs.createdAt))
      .limit(300);

    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar logs" }, { status: 500 });
  }
}
