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

/**
 * Compartilhamento público do relatório (página /r/[id]/[token]).
 *
 * DESLIGADO por padrão. A cláusula 3.1.5 do contrato com o SERPRO veda ceder os
 * dados obtidos a terceiros sem autorização expressa do controlador, e o link
 * público é justamente uma cessão a quem não fez a consulta nem declarou
 * finalidade. Só habilite (COMPARTILHAMENTO_PUBLICO=true) após confirmação
 * escrita do SERPRO/SENATRAN.
 *
 * O token continua sendo gerado: a conferência de identificadores usa a mesma
 * assinatura para autorizar a chamada feita a partir da tela do próprio dono.
 */
export function compartilhamentoPublicoAtivo(): boolean {
  return process.env.COMPARTILHAMENTO_PUBLICO === "true";
}

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
