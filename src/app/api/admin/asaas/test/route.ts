import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { apiKey, baseUrl } = await req.json();

    if (!apiKey || !baseUrl) {
      return NextResponse.json({ error: "API Key e URL são obrigatórios" }, { status: 400 });
    }

    let res: Response;
    try {
      res = await fetch(`${baseUrl}/finance/balance`, {
        headers: {
          accept: "application/json",
          access_token: apiKey,
        },
      });
    } catch (netErr) {
      // O servidor não conseguiu nem alcançar o Asaas (rede/firewall/DNS)
      const msg = netErr instanceof Error ? netErr.message : String(netErr);
      return NextResponse.json(
        { error: `Não foi possível alcançar o Asaas (rede do servidor): ${msg}` },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const detail =
        data?.errors?.[0]?.description || data?.message || `HTTP ${res.status}`;
      return NextResponse.json(
        { error: `Asaas recusou a chave (${res.status}): ${detail}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      balance: data.balance,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Erro ao testar conexão: ${msg}` }, { status: 500 });
  }
}
