import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments, users } from "@/lib/db/schema";
import { eq, sql, and, gte, count, or, ilike, desc } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Stats
    const [revenueResult, pendingResult, refundsResult, cancelledResult, confirmedCountResult] =
      await Promise.all([
        db
          .select({ total: sql<string>`COALESCE(SUM(${payments.amount}), 0)` })
          .from(payments)
          .where(
            and(gte(payments.createdAt, startOfMonth), eq(payments.status, "confirmed"))
          ),
        db
          .select({ count: count() })
          .from(payments)
          .where(eq(payments.status, "pending")),
        db
          .select({ count: count() })
          .from(payments)
          .where(
            and(gte(payments.createdAt, startOfMonth), eq(payments.status, "refunded"))
          ),
        db
          .select({ count: count() })
          .from(payments)
          .where(
            and(gte(payments.createdAt, startOfMonth), eq(payments.status, "cancelled"))
          ),
        db
          .select({
            count: count(),
            total: sql<string>`COALESCE(SUM(${payments.amount}), 0)`,
          })
          .from(payments)
          .where(
            and(gte(payments.createdAt, startOfMonth), eq(payments.status, "confirmed"))
          ),
      ]);

    const revenue = parseFloat(revenueResult[0]?.total || "0");
    const confirmedCount = confirmedCountResult[0]?.count || 0;
    const confirmedTotal = parseFloat(confirmedCountResult[0]?.total || "0");
    const ticketMedio = confirmedCount > 0 ? confirmedTotal / confirmedCount : 0;

    // Search
    const searchConditions = search
      ? or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(payments.id, `%${search}%`),
          ilike(payments.asaasId, `%${search}%`)
        )
      : undefined;

    // Count
    const countQuery = db
      .select({ count: count() })
      .from(payments)
      .leftJoin(users, eq(payments.userId, users.id));

    if (searchConditions) {
      countQuery.where(searchConditions);
    }

    const [totalResult] = await countQuery;

    // Fetch payments
    const paymentsQuery = db
      .select({
        id: payments.id,
        userId: payments.userId,
        asaasId: payments.asaasId,
        amount: payments.amount,
        method: payments.method,
        status: payments.status,
        installments: payments.installments,
        couponId: payments.couponId,
        discountAmount: payments.discountAmount,
        paidAt: payments.paidAt,
        createdAt: payments.createdAt,
        userName: users.name,
        userEmail: users.email,
      })
      .from(payments)
      .leftJoin(users, eq(payments.userId, users.id))
      .orderBy(desc(payments.createdAt))
      .limit(limit)
      .offset(offset);

    if (searchConditions) {
      paymentsQuery.where(searchConditions);
    }

    const paymentsList = await paymentsQuery;

    return NextResponse.json({
      stats: {
        revenue,
        ticketMedio,
        pending: pendingResult[0]?.count || 0,
        refunds: refundsResult[0]?.count || 0,
        cancelled: cancelledResult[0]?.count || 0,
      },
      payments: paymentsList,
      pagination: {
        page,
        limit,
        total: totalResult?.count || 0,
        totalPages: Math.ceil((totalResult?.count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Payments error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar pagamentos" },
      { status: 500 }
    );
  }
}
