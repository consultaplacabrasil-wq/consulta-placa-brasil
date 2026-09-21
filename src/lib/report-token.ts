import crypto from "crypto";
import { RETENCAO } from "@/lib/retencao";

// Token de compartilhamento público do relatório.
//
// O token carrega a própria validade: `<expiração>.<assinatura>`. A expiração
// vai em base 36 e entra na assinatura, de modo que não pode ser esticada sem
// invalidar o token. Não há coluna no banco — a verificação é autocontida.
//
// Tokens antigos, sem expiração, deixam de ser aceitos: eram permanentes e é
// justamente essa permanência que a política de retenção corrige. A tela do
// relatório gera um link novo a cada acesso do dono, então compartilhar de novo
// resolve qualquer link vencido.
const SECRET = process.env.AUTH_SECRET || "consulta-placa-brasil-fallback-secret";

const DIA_MS = 24 * 60 * 60 * 1000;

function assinar(reportId: string, expSegundos: number): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(`report:${reportId}:${expSegundos}`)
    .digest("hex")
    .slice(0, 32);
}

export function generateReportToken(reportId: string): string {
  const expMs = Date.now() + RETENCAO.linkCompartilhamentoDias * DIA_MS;
  const expSegundos = Math.floor(expMs / 1000);
  return `${expSegundos.toString(36)}.${assinar(reportId, expSegundos)}`;
}

export function verifyReportToken(reportId: string, token: string): boolean {
  if (!token) return false;

  const partes = token.split(".");
  if (partes.length !== 2) return false;

  const [expBase36, assinatura] = partes;
  const expSegundos = Number.parseInt(expBase36, 36);
  if (!Number.isFinite(expSegundos)) return false;

  // Vencido: nega antes de qualquer comparação criptográfica.
  if (Date.now() > expSegundos * 1000) return false;

  const esperada = assinar(reportId, expSegundos);
  if (assinatura.length !== esperada.length) return false;

  try {
    return crypto.timingSafeEqual(
      Buffer.from(assinatura),
      Buffer.from(esperada)
    );
  } catch {
    return false;
  }
}
