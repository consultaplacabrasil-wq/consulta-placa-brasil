import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Autenticação necessária" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plate, reportType, method } = body;

    if (!plate || !reportType || !method) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const prices: Record<string, number> = {
      basic: 0,
      complete: 24.9,
      premium: 39.9,
    };

    const amount = prices[reportType];
    if (amount === undefined) {
      return NextResponse.json(
        { error: "Tipo de relatório inválido" },
        { status: 400 }
      );
    }

    // TODO: Create payment via Asaas API
    // For now, return mock payment data
    const paymentData = {
      id: `pay_${crypto.randomUUID()}`,
      plate,
      reportType,
      method,
      amount,
      status: "pending",
      // PIX QR Code would come from Asaas
      pixQrCode: method === "pix" ? "mock-qr-code-base64" : undefined,
      pixCopyPaste: method === "pix" ? "mock-pix-copy-paste" : undefined,
    };

    return NextResponse.json(paymentData);
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
