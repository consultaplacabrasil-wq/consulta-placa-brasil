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
    const payload: AsaasWebhookPayload = await request.json();

    // Validate webhook token - Asaas sends it in different ways
    const incomingToken =
      request.headers.get("asaas-access-token") ||
      request.nextUrl.searchParams.get("access_token") ||
      "";
    const expectedToken = await getWebhookToken();

    if (expectedToken && incomingToken !== expectedToken) {
      console.warn("Webhook: invalid token received:", incomingToken ? "token mismatch" : "no token");
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const { event, payment: asaasPayment } = payload;

    console.log(`Webhook received: ${event} for asaas payment ${asaasPayment.id} (ref: ${asaasPayment.externalReference})`);

    // Find payment in DB by externalReference (our payment ID) or by asaasId
    let dbPayment = null;

    if (asaasPayment.externalReference) {
      const [found] = await db
        .select()
        .from(payments)
        .where(eq(payments.id, asaasPayment.externalReference))
        .limit(1);
      dbPayment = found;
    }

    if (!dbPayment) {
      const [found] = await db
        .select()
        .from(payments)
        .where(eq(payments.asaasId, asaasPayment.id))
        .limit(1);
      dbPayment = found;
    }

    if (!dbPayment) {
      console.warn(`Webhook: payment not found for asaas ${asaasPayment.id} / ref ${asaasPayment.externalReference}`);
      return NextResponse.json({ received: true });
    }

    const paymentDbId = dbPayment.id;

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
