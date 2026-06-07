import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments, reportRequests, coupons, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { checkPaymentStatus } from "@/lib/asaas";
import { sendPurchaseConfirmedEmail } from "@/lib/email";
import { requireRole } from "@/lib/auth/admin-guard";

// Status do Asaas que significam pagamento recebido/confirmado
const PAID_STATUSES = ["CONFIRMED", "RECEIVED", "RECEIVED_IN_CASH"];

// Verifica o status real de um pagamento direto no Asaas e, se já foi pago,
// aplica a mesma confirmação que o webhook faria (rede de segurança caso o
// webhook não dispare).
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id } = await params;

    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.id, id))
      .limit(1);

    if (!payment) {
      return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 });
    }

    if (!payment.asaasId) {
      return NextResponse.json(
        { error: "Este pagamento não possui ID do Asaas para consultar." },
        { status: 400 }
      );
    }

    const asaas = await checkPaymentStatus(payment.asaasId);
    if (!asaas) {
      return NextResponse.json(
        { error: "Não foi possível consultar o pagamento no Asaas." },
        { status: 502 }
      );
    }

    const isPaid = PAID_STATUSES.includes(asaas.status);

    // Já estava confirmado no nosso banco — nada a fazer
    if (payment.status === "confirmed") {
      return NextResponse.json({
        updated: false,
        paid: isPaid,
        asaasStatus: asaas.status,
        status: payment.status,
        message: "Pagamento já estava confirmado.",
      });
    }

    if (!isPaid) {
      return NextResponse.json({
        updated: false,
        paid: false,
        asaasStatus: asaas.status,
        status: payment.status,
        message: `Pagamento ainda não foi pago no Asaas (status: ${asaas.status}).`,
      });
    }

    // Asaas confirma o pagamento mas nosso banco está pendente → reconciliar
    await db
      .update(payments)
      .set({
        status: "confirmed",
        paidAt: asaas.confirmedDate ? new Date(asaas.confirmedDate) : new Date(),
      })
      .where(eq(payments.id, payment.id));

    await db
      .update(reportRequests)
      .set({ status: "processing" })
      .where(eq(reportRequests.paymentId, payment.id));

    // Incrementa o uso do cupom só agora (pagamento confirmado)
    if (payment.couponId) {
      await db
        .update(coupons)
        .set({ usageCount: sql`${coupons.usageCount} + 1` })
        .where(eq(coupons.id, payment.couponId));
    }

    // E-mail de compra aprovada
    try {
      const [u] = await db
        .select({ name: users.name, email: users.email })
        .from(users)
        .where(eq(users.id, payment.userId))
        .limit(1);
      if (u?.email) {
        await sendPurchaseConfirmedEmail(u.email, u.name || "Cliente", String(payment.amount));
      }
    } catch (e) {
      console.error("Erro ao enviar e-mail de compra (verificar):", e);
    }

    return NextResponse.json({
      updated: true,
      paid: true,
      asaasStatus: asaas.status,
      status: "confirmed",
      message: "Pagamento confirmado e consultas liberadas.",
    });
  } catch (err) {
    console.error("Verificar pagamento error:", err);
    return NextResponse.json(
      { error: "Erro ao verificar pagamento" },
      { status: 500 }
    );
  }
}
