import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface BrasilApiFipePreco {
  valor: string;
  marca: string;
  modelo: string;
  anoModelo: number;
  combustivel: string;
  codigoFipe: string;
  mesReferencia: string;
}

// Proxy para a BrasilAPI: histórico de preços FIPE a partir do código.
// GET /api/fipe/015190-4
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ codigo: string }> }
) {
  const { codigo } = await params;
  const clean = (codigo || "").trim();
  if (!clean) {
    return NextResponse.json({ error: "Código FIPE não informado" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://brasilapi.com.br/api/fipe/preco/v1/${encodeURIComponent(clean)}`,
      { next: { revalidate: 60 * 60 * 12 } } // cache 12h
    );

    if (!res.ok) {
      return NextResponse.json({ precos: [] }, { status: 200 });
    }

    const data = (await res.json()) as BrasilApiFipePreco[];
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ precos: [] }, { status: 200 });
    }

    // Normaliza: valor numérico + ordena do mais antigo para o mais novo
    const precos = data
      .map((d) => ({
        mesReferencia: d.mesReferencia,
        marca: d.marca,
        modelo: d.modelo,
        anoModelo: d.anoModelo,
        combustivel: d.combustivel,
        valorTexto: d.valor,
        valor: Number(String(d.valor).replace(/[^\d,]/g, "").replace(",", ".")) || 0,
      }))
      .filter((d) => d.valor > 0);

    return NextResponse.json({ precos });
  } catch {
    return NextResponse.json({ precos: [] }, { status: 200 });
  }
}
