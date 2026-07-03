import * as OTPAuth from "otpauth";
import QRCode from "qrcode";

const ISSUER = "Consulta Placa Brasil";
const PARAMS = { algorithm: "SHA1", digits: 6, period: 30 } as const;

// Segredo em base32 (formato usado pelos apps autenticadores).
export function generateSecret(): string {
  return new OTPAuth.Secret({ size: 20 }).base32;
}

function makeTotp(secretBase32: string, email?: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: ISSUER,
    label: email || "usuario",
    ...PARAMS,
    secret: OTPAuth.Secret.fromBase32(secretBase32),
  });
}

// URI otpauth:// para gerar o QR Code no app autenticador.
export function buildOtpAuthUrl(email: string, secret: string): string {
  return makeTotp(secret, email).toString();
}

export async function buildQrDataUrl(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl, { margin: 1, width: 220 });
}

// Valida o código de 6 dígitos. window:1 tolera pequena diferença de relógio.
export function verifyToken(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  const clean = token.replace(/\s+/g, "");
  try {
    const delta = makeTotp(secret).validate({ token: clean, window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}
