// Busca o histórico de preços FIPE a partir do código (via BrasilAPI), no servidor.
export interface FipePreco {
  mesReferencia: string;
  valor: number;
  valorTexto: string;
  anoModelo: number;
  combustivel: string;
}

export async function getFipePrecos(codigo: string): Promise<FipePreco[]> {
  const clean = (codigo || "").trim();
  if (!clean) return [];
  try {
    const res = await fetch(
      `https://brasilapi.com.br/api/fipe/preco/v1/${encodeURIComponent(clean)}`,
      { next: { revalidate: 60 * 60 * 12 } } // cache 12h
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .map((d) => ({
        mesReferencia: String(d.mesReferencia || ""),
        anoModelo: Number(d.anoModelo) || 0,
        combustivel: String(d.combustivel || ""),
        valorTexto: String(d.valor || ""),
        valor: Number(String(d.valor).replace(/[^\d,]/g, "").replace(",", ".")) || 0,
      }))
      .filter((d) => d.valor > 0);
  } catch {
    return [];
  }
}
