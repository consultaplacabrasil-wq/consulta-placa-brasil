import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reportRequests, users, payments, reports } from "@/lib/db/schema";
import { eq, sql, and, gte, count, or, ilike, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Stats
    const [totalMonthResult, completedMonthResult, allConsultasResult] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(reportRequests)
          .where(gte(reportRequests.createdAt, startOfMonth)),
        db
          .select({ count: count() })
          .from(reportRequests)
          .where(
            and(
              gte(reportRequests.createdAt, startOfMonth),
              eq(reportRequests.status, "completed")
            )
          ),
        db.select({ count: count() }).from(reportRequests),
      ]);

    const totalMonth = totalMonthResult[0]?.count || 0;
    const completedMonth = completedMonthResult[0]?.count || 0;
    const successRate =
      totalMonth > 0 ? ((completedMonth / totalMonth) * 100).toFixed(1) : "0.0";

    // Build search condition
    const searchConditions = search
      ? or(
          ilike(reportRequests.plate, `%${search}%`),
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.cpfCnpj, `%${search}%`)
        )
      : undefined;

    // Count total for pagination
    const countQuery = db
      .select({ count: count() })
      .from(reportRequests)
      .leftJoin(users, eq(reportRequests.userId, users.id));

    if (searchConditions) {
      countQuery.where(searchConditions);
    }

    const [totalResult] = await countQuery;

    // Fetch consultas
    const consultasQuery = db
      .select({
        id: reportRequests.id,
        plate: reportRequests.plate,
        reportType: reportRequests.reportType,
        status: reportRequests.status,
        createdAt: reportRequests.createdAt,
        paymentId: reportRequests.paymentId,
        userId: reportRequests.userId,
        userName: users.name,
        userEmail: users.email,
      })
      .from(reportRequests)
      .leftJoin(users, eq(reportRequests.userId, users.id))
      .orderBy(desc(reportRequests.createdAt))
      .limit(limit)
      .offset(offset);

    if (searchConditions) {
      consultasQuery.where(searchConditions);
    }

    const consultas = await consultasQuery;

    return NextResponse.json({
      stats: {
        totalMonth,
        successRate,
        total: totalResult?.count || 0,
      },
      consultas,
      pagination: {
        page,
        limit,
        total: totalResult?.count || 0,
        totalPages: Math.ceil((totalResult?.count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Consultas error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar consultas" },
      { status: 500 }
    );
  }
}
