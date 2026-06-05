import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, payments, reportRequests, coupons } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireRole("admin", "editor");
  if (error) return error;

  try {
    const { id } = await params;

    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        cpfCnpj: users.cpfCnpj,
        role: users.role,
        active: users.active,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });

    // Histórico de compras (pagamentos) com cupom
    const compras = await db
      .select({
        id: payments.id,
        amount: payments.amount,
        method: payments.method,
        status: payments.status,
        installments: payments.installments,
        discountAmount: payments.discountAmount,
        paidAt: payments.paidAt,
        createdAt: payments.createdAt,
        couponCode: coupons.code,
      })
      .from(payments)
      .leftJoin(coupons, eq(payments.couponId, coupons.id))
      .where(eq(payments.userId, id))
      .orderBy(desc(payments.createdAt));

    // Consultas (report requests)
    const consultas = await db
      .select({
        id: reportRequests.id,
        plate: reportRequests.plate,
        reportType: reportRequests.reportType,
        consultaName: reportRequests.consultaName,
        status: reportRequests.status,
        createdAt: reportRequests.createdAt,
      })
      .from(reportRequests)
      .where(eq(reportRequests.userId, id))
      .orderBy(desc(reportRequests.createdAt));

    // Resumo
    const pagos = compras.filter((c) => c.status === "confirmed" || c.status === "received");
    const totalGasto = pagos.reduce((sum, c) => sum + Number(c.amount), 0);

    return NextResponse.json({
      user,
      compras,
      consultas,
      resumo: {
        totalCompras: compras.length,
        comprasPagas: pagos.length,
        totalGasto,
        totalConsultas: consultas.length,
      },
    });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar dados do cliente" }, { status: 500 });
  }
}
