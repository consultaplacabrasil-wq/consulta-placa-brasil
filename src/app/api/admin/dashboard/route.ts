import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, payments, reportRequests, reports } from "@/lib/db/schema";
import { eq, sql, and, gte, count } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Run all queries in parallel
    const [
      revenueResult,
      consultasTodayResult,
      activeUsersResult,
      pendingPaymentsResult,
      reportsMonthResult,
      recentPaymentsResult,
      recentConsultasResult,
      totalPaymentsMonthResult,
      refundsResult,
      cancelledResult,
      confirmedPaymentsResult,
    ] = await Promise.all([
      // Revenue this month
      db
        .select({ total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` })
        .from(payments)
        .where(
          and(
            gte(payments.createdAt, startOfMonth),
            eq(payments.status, "confirmed")
          )
        ),

      // Consultas today
      db
        .select({ count: count() })
        .from(reportRequests)
        .where(gte(reportRequests.createdAt, startOfDay)),

      // Active users (total users)
      db.select({ count: count() }).from(users),

      // Pending payments
      db
        .select({ count: count() })
        .from(payments)
        .where(eq(payments.status, "pending")),

      // Reports this month
      db
        .select({ count: count() })
        .from(reports)
        .where(gte(reports.createdAt, startOfMonth)),

      // Recent payments (last 5)
      db
        .select({
          id: payments.id,
          amount: payments.amount,
          method: payments.method,
          status: payments.status,
          createdAt: payments.createdAt,
          userName: users.name,
        })
        .from(payments)
        .leftJoin(users, eq(payments.userId, users.id))
        .orderBy(sql`${payments.createdAt} DESC`)
        .limit(5),

      // Recent consultas (last 5)
      db
        .select({
          id: reportRequests.id,
          plate: reportRequests.plate,
          reportType: reportRequests.reportType,
          status: reportRequests.status,
          createdAt: reportRequests.createdAt,
          userName: users.name,
        })
        .from(reportRequests)
        .leftJoin(users, eq(reportRequests.userId, users.id))
        .orderBy(sql`${reportRequests.createdAt} DESC`)
        .limit(5),

      // Total payments this month (all statuses)
      db
        .select({ count: count() })
        .from(payments)
        .where(gte(payments.createdAt, startOfMonth)),

      // Refunds this month
      db
        .select({ count: count() })
        .from(payments)
        .where(
          and(
            gte(payments.createdAt, startOfMonth),
            eq(payments.status, "refunded")
          )
        ),

      // Cancelled this month
      db
        .select({ count: count() })
        .from(payments)
        .where(
          and(
            gte(payments.createdAt, startOfMonth),
            eq(payments.status, "cancelled")
          )
        ),

      // Confirmed payments count this month (for ticket médio)
      db
        .select({
          count: count(),
          total: sql<string>`COALESCE(SUM(${payments.amount}), 0)`,
        })
        .from(payments)
        .where(
          and(
            gte(payments.createdAt, startOfMonth),
            eq(payments.status, "confirmed")
          )
        ),
    ]);

    const revenue = parseFloat(revenueResult[0]?.total || "0");
    const consultasToday = consultasTodayResult[0]?.count || 0;
    const activeUsers = activeUsersResult[0]?.count || 0;
    const pendingPayments = pendingPaymentsResult[0]?.count || 0;
    const reportsMonth = reportsMonthResult[0]?.count || 0;
    const totalPaymentsMonth = totalPaymentsMonthResult[0]?.count || 0;
    const refunds = refundsResult[0]?.count || 0;
    const cancelled = cancelledResult[0]?.count || 0;
    const confirmedCount = confirmedPaymentsResult[0]?.count || 0;
    const confirmedTotal = parseFloat(confirmedPaymentsResult[0]?.total || "0");
    const ticketMedio = confirmedCount > 0 ? confirmedTotal / confirmedCount : 0;

    // Conversion rate: confirmed / total
    const conversionRate =
      totalPaymentsMonth > 0
        ? ((confirmedCount / totalPaymentsMonth) * 100).toFixed(1)
        : "0.0";

    return NextResponse.json({
      stats: {
        revenue,
        consultasToday,
        activeUsers,
        pendingPayments,
        reportsMonth,
        ticketMedio,
        refunds,
        cancelled,
        conversionRate,
      },
      recentPayments: recentPaymentsResult.map((p) => ({
        id: p.id.slice(0, 8),
        user: p.userName || "Anônimo",
        amount: parseFloat(p.amount),
        method: p.method,
        status: p.status,
        date: p.createdAt,
      })),
      recentConsultas: recentConsultasResult.map((c) => ({
        id: c.id,
        plate: c.plate,
        type: c.reportType,
        user: c.userName || "Anônimo",
        status: c.status,
        date: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar estatísticas" },
      { status: 500 }
    );
  }
}
