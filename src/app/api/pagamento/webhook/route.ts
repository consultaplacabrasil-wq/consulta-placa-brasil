import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

// Asaas webhook events
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
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate webhook token (timing-safe comparison)
    const webhookToken = request.headers.get("asaas-access-token") || "";
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN || "";
    if (
      !expectedToken ||
      !webhookToken ||
      webhookToken.length !== expectedToken.length ||
      !timingSafeEqual(Buffer.from(webhookToken), Buffer.from(expectedToken))
    ) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    const payload: AsaasWebhookPayload = await request.json();
    const { event, payment } = payload;

    switch (event) {
      case "PAYMENT_CONFIRMED":
      case "PAYMENT_RECEIVED":
        // TODO: Generate report, update payment status, send email
        console.log(`Payment confirmed: ${payment.id}`);
        break;

      case "PAYMENT_OVERDUE":
        // TODO: Mark as expired, notify user
        console.log(`Payment overdue: ${payment.id}`);
        break;

      case "PAYMENT_DELETED":
        // TODO: Cancel request
        console.log(`Payment deleted: ${payment.id}`);
        break;

      case "PAYMENT_REFUNDED":
        // TODO: Register refund, revoke access
        console.log(`Payment refunded: ${payment.id}`);
        break;

      case "PAYMENT_CHARGEBACK_REQUESTED":
        // TODO: Alert admin, freeze account
        console.log(`Chargeback requested: ${payment.id}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    );
  }
}
