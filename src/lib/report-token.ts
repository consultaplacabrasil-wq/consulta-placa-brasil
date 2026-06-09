import crypto from "crypto";

// Token de compartilhamento público do relatório.
// Determinístico (HMAC do id) — não precisa de coluna no banco.
const SECRET = process.env.AUTH_SECRET || "consulta-placa-brasil-fallback-secret";

export function generateReportToken(reportId: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(`report:${reportId}`)
    .digest("hex")
    .slice(0, 32);
}

export function verifyReportToken(reportId: string, token: string): boolean {
  const expected = generateReportToken(reportId);
  if (!token || token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
