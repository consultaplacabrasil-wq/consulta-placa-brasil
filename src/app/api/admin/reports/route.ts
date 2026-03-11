import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq, sql, gte, count, desc } from "drizzle-orm";

export async function GET() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = now.getDate();

    // Stats
    const [totalResult, monthResult, byTypeResult, topPlatesResult] = await Promise.all([
      db.select({ count: count() }).from(reports),

      db
        .select({ count: count() })
        .from(reports)
        .where(gte(reports.createdAt, startOfMonth)),

      db
        .select({
          type: reports.type,
          count: count(),
        })
        .from(reports)
        .groupBy(reports.type),

      db
        .select({
          plate: reports.plate,
          count: count(),
          lastQuery: sql<string>`MAX(${reports.createdAt})`,
        })
        .from(reports)
        .groupBy(reports.plate)
        .orderBy(sql`COUNT(*) DESC`)
        .limit(5),
    ]);

    const total = totalResult[0]?.count || 0;
    const monthCount = monthResult[0]?.count || 0;
    const avgPerDay = daysInMonth > 0 ? Math.round(monthCount / daysInMonth) : 0;

    // Calculate paid percentage
    const typeStats = byTypeResult.map((r) => ({
      type: r.type,
      count: r.count,
    }));

    const totalByType = typeStats.reduce((sum, t) => sum + t.count, 0);
    const paidCount = typeStats
      .filter((t) => t.type === "complete" || t.type === "premium")
      .reduce((sum, t) => sum + t.count, 0);
    const paidPercentage = totalByType > 0 ? Math.round((paidCount / totalByType) * 100) : 0;

    const distribution = typeStats.map((t) => ({
      type: t.type,
      count: t.count,
      percentage: totalByType > 0 ? Math.round((t.count / totalByType) * 100) : 0,
    }));

    const topPlates = topPlatesResult.map((p) => ({
      plate: p.plate,
      count: p.count,
      lastQuery: p.lastQuery,
    }));

    return NextResponse.json({
      stats: { total, monthCount, avgPerDay, paidPercentage },
      distribution,
      topPlates,
    });
  } catch (error) {
    console.error("Reports stats error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar estatísticas de relatórios" },
      { status: 500 }
    );
  }
}
