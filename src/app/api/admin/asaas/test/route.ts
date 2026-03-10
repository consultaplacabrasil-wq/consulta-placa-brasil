import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { apiKey, baseUrl } = await req.json();

    if (!apiKey || !baseUrl) {
      return NextResponse.json({ error: "API Key e URL são obrigatórios" }, { status: 400 });
    }

    const res = await fetch(`${baseUrl}/finance/balance`, {
      headers: {
        accept: "application/json",
        access_token: apiKey,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Falha na autenticação com Asaas" }, { status: 401 });
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      balance: data.balance,
    });
  } catch {
    return NextResponse.json({ error: "Erro ao conectar com Asaas" }, { status: 500 });
  }
}
