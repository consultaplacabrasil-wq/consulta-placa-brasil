import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, payments, reportRequests, reports } from "@/lib/db/schema";
import { eq, sql, and, gte, count, isNotNull, desc } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

interface DayRow { dia: string; qtd: number; receita: string }
interface TopRow { nome: string; qtd: number }

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      revenueResult, revenueTodayResult, consultasTodayResult,
      totalUsersResult, activeUsersResult, inactiveUsersResult,
      pendingPaymentsResult, reportsMonthResult,
      recentPaymentsResult, recentConsultasResult,
      totalPaymentsMonthResult, couponsUsedResult, confirmedPaymentsResult,
    ] = await Promise.all([
      db.select({ total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments)
        .where(and(gte(payments.createdAt, startOfMonth), eq(payments.status, "confirmed"))),
      db.select({ total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments)
        .where(and(gte(payments.createdAt, startOfDay), eq(payments.status, "confirmed"))),
      db.select({ count: count() }).from(reportRequests).where(gte(reportRequests.createdAt, startOfDay)),
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.active, true)),
      db.select({ count: count() }).from(users).where(eq(users.active, false)),
      db.select({ count: count() }).from(payments).where(eq(payments.status, "pending")),
      db.select({ count: count() }).from(reports).where(gte(reports.createdAt, startOfMonth)),
      db.select({
        id: payments.id, amount: payments.amount, method: payments.method,
        status: payments.status, createdAt: payments.createdAt, userName: users.name,
      }).from(payments).leftJoin(users, eq(payments.userId, users.id))
        .orderBy(desc(payments.createdAt)).limit(5),
      db.select({
        id: reportRequests.id, plate: reportRequests.plate, reportType: reportRequests.reportType,
        status: reportRequests.status, createdAt: reportRequests.createdAt, userName: users.name,
      }).from(reportRequests).leftJoin(users, eq(reportRequests.userId, users.id))
        .orderBy(desc(reportRequests.createdAt)).limit(5),
      db.select({ count: count() }).from(payments).where(gte(payments.createdAt, startOfMonth)),
      db.select({ count: count() }).from(payments)
        .where(and(gte(payments.createdAt, startOfMonth), eq(payments.status, "confirmed"), isNotNull(payments.couponId))),
      db.select({ count: count(), total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments)
        .where(and(gte(payments.createdAt, startOfMonth), eq(payments.status, "confirmed"))),
    ]);

    // ── Gráficos (últimos 7 dias) ──────────────────────────────
    // Não-críticos: se algum falhar, retorna vazio sem derrubar a dashboard.
    const safeRows = async (q: Promise<{ rows: unknown[] }>) => {
      try {
        return (await q).rows;
      } catch (e) {
        console.error("Dashboard chart query falhou:", e);
        return [];
      }
    };

    const salesRows = await safeRows(db.execute(sql`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS dia,
             COUNT(*)::int AS qtd,
             COALESCE(SUM(amount), 0)::text AS receita
      FROM payments
      WHERE status = 'confirmed' AND created_at >= NOW() - INTERVAL '6 days'
      GROUP BY dia ORDER BY dia
    `));
    const regsRows = await safeRows(db.execute(sql`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS dia,
             COUNT(*)::int AS qtd, '0' AS receita
      FROM users
      WHERE created_at >= NOW() - INTERVAL '6 days'
      GROUP BY dia ORDER BY dia
    `));
    const topRows = await safeRows(db.execute(sql`
      SELECT COALESCE(consulta_name, report_type::text) AS nome, COUNT(*)::int AS qtd
      FROM report_requests
      GROUP BY nome ORDER BY qtd DESC LIMIT 5
    `));

    // Monta série de 7 dias completa (preenche dias sem dados)
    const buildSeries = (rows: DayRow[]) => {
      const map = new Map(rows.map((r) => [r.dia, r]));
      const out: { dia: string; label: string; qtd: number; receita: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const r = map.get(key);
        out.push({
          dia: key,
          label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
          qtd: r ? Number(r.qtd) : 0,
          receita: r ? Number(r.receita) : 0,
        });
      }
      return out;
    };

    const salesSeries = buildSeries(salesRows as unknown as DayRow[]);
    const regsSeries = buildSeries(regsRows as unknown as DayRow[]);
    const topConsultas = (topRows as unknown as TopRow[]).map((r) => ({ nome: r.nome, qtd: Number(r.qtd) }));

    const totalPaymentsMonth = totalPaymentsMonthResult[0]?.count || 0;
    const confirmedCount = confirmedPaymentsResult[0]?.count || 0;
    const confirmedTotal = parseFloat(confirmedPaymentsResult[0]?.total || "0");
    const ticketMedio = confirmedCount > 0 ? confirmedTotal / confirmedCount : 0;
    const conversionRate = totalPaymentsMonth > 0 ? ((confirmedCount / totalPaymentsMonth) * 100).toFixed(1) : "0.0";

    return NextResponse.json({
      stats: {
        revenue: parseFloat(revenueResult[0]?.total || "0"),
        revenueToday: parseFloat(revenueTodayResult[0]?.total || "0"),
        consultasToday: consultasTodayResult[0]?.count || 0,
        totalUsers: totalUsersResult[0]?.count || 0,
        activeUsers: activeUsersResult[0]?.count || 0,
        inactiveUsers: inactiveUsersResult[0]?.count || 0,
        pendingPayments: pendingPaymentsResult[0]?.count || 0,
        reportsMonth: reportsMonthResult[0]?.count || 0,
        couponsUsed: couponsUsedResult[0]?.count || 0,
        ticketMedio,
        conversionRate,
      },
      charts: { salesSeries, regsSeries, topConsultas },
      recentPayments: recentPaymentsResult.map((p) => ({
        id: p.id.slice(0, 8), user: p.userName || "Anônimo",
        amount: parseFloat(p.amount), method: p.method, status: p.status, date: p.createdAt,
      })),
      recentConsultas: recentConsultasResult.map((c) => ({
        id: c.id, plate: c.plate, type: c.reportType,
        user: c.userName || "Anônimo", status: c.status, date: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Erro ao carregar estatísticas" }, { status: 500 });
  }
}
