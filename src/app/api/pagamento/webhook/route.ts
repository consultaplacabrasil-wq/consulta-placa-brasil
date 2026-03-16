import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments, reportRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getWebhookToken } from "@/lib/asaas";

type AsaasEvent =
  | "PAYMENT_CONFIRMED"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_OVERDUE"
  | "PAYMENT_DELETED"
  | "PAYMENT_REFUNDED"
  | "PAYMENT_CHARGEBACK_REQUESTED";

interface AsaasWebhookPayload {
  event: AsaasEvent;
  payment: {
    id: string;
    status: string;
    value: number;
    externalReference: string;
    confirmedDate?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate webhook token
    const incomingToken = request.headers.get("asaas-access-token") || "";
    const expectedToken = await getWebhookToken();

    if (!expectedToken || !incomingToken || incomingToken !== expectedToken) {
      console.warn("Webhook: invalid token");
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const payload: AsaasWebhookPayload = await request.json();
    const { event, payment: asaasPayment } = payload;
    const paymentDbId = asaasPayment.externalReference;

    console.log(`Webhook received: ${event} for payment ${asaasPayment.id} (ref: ${paymentDbId})`);

    if (!paymentDbId) {
      console.warn("Webhook: no externalReference");
      return NextResponse.json({ received: true });
    }

    // Find payment in DB
    const [dbPayment] = await db
      .select()
      .from(payments)
      .where(eq(payments.id, paymentDbId))
      .limit(1);

    if (!dbPayment) {
      console.warn(`Webhook: payment ${paymentDbId} not found in DB`);
      return NextResponse.json({ received: true });
    }

    switch (event) {
      case "PAYMENT_CONFIRMED":
      case "PAYMENT_RECEIVED": {
        // Update payment status to confirmed
        await db
          .update(payments)
          .set({
            status: "confirmed",
            asaasId: asaasPayment.id,
            paidAt: new Date(),
          })
          .where(eq(payments.id, paymentDbId));

        // Update report requests to processing
        await db
          .update(reportRequests)
          .set({ status: "processing" })
          .where(eq(reportRequests.paymentId, paymentDbId));

        console.log(`Payment ${paymentDbId} confirmed`);
        break;
      }

      case "PAYMENT_OVERDUE": {
        await db
          .update(payments)
          .set({ status: "overdue" })
          .where(eq(payments.id, paymentDbId));

        console.log(`Payment ${paymentDbId} overdue`);
        break;
      }

      case "PAYMENT_DELETED": {
        await db
          .update(payments)
          .set({ status: "cancelled" })
          .where(eq(payments.id, paymentDbId));

        await db
          .update(reportRequests)
          .set({ status: "cancelled" })
          .where(eq(reportRequests.paymentId, paymentDbId));

        console.log(`Payment ${paymentDbId} cancelled`);
        break;
      }

      case "PAYMENT_REFUNDED": {
        await db
          .update(payments)
          .set({ status: "refunded" })
          .where(eq(payments.id, paymentDbId));

        await db
          .update(reportRequests)
          .set({ status: "cancelled" })
          .where(eq(reportRequests.paymentId, paymentDbId));

        console.log(`Payment ${paymentDbId} refunded`);
        break;
      }

      case "PAYMENT_CHARGEBACK_REQUESTED": {
        await db
          .update(payments)
          .set({ status: "chargeback" })
          .where(eq(payments.id, paymentDbId));

        await db
          .update(reportRequests)
          .set({ status: "cancelled" })
          .where(eq(reportRequests.paymentId, paymentDbId));

        console.log(`Payment ${paymentDbId} chargeback`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    );
  }
}
