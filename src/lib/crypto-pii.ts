import crypto from "crypto";

// Criptografia DETERMINÍSTICA de dados pessoais (CPF/CNPJ) em repouso.
// Determinística = mesmo valor gera o mesmo texto cifrado, preservando a
// checagem de duplicidade e o índice único. Usa IV sintético derivado do
// próprio valor (padrão SIV) com HMAC, e AES-256-CBC.
//
// Formato armazenado: "enc:v1:" + base64(iv[16] + ciphertext)
// Valores sem o prefixo são tratados como legado (texto puro) — retrocompatível.

const PREFIX = "enc:v1:";

function getKeys(): { enc: Buffer; mac: Buffer } {
  const raw = process.env.PII_ENCRYPTION_KEY;
  if (!raw || raw.length < 32) {
    throw new Error("PII_ENCRYPTION_KEY ausente ou muito curta (use 64 caracteres hex).");
  }
  const enc = crypto.createHash("sha256").update(raw).digest(); // 32 bytes
  const mac = crypto.createHash("sha256").update(Buffer.concat([enc, Buffer.from("pii-mac")])).digest();
  return { enc, mac };
}

// Retorna null para valores vazios; caso contrário, normaliza (só dígitos) e cifra.
export function encryptPii(value: string | null | undefined): string | null {
  if (!value) return null;
  const norm = String(value).replace(/\D/g, "");
  if (!norm) return null;
  const { enc, mac } = getKeys();
  const iv = crypto.createHmac("sha256", mac).update(norm).digest().subarray(0, 16);
  const cipher = crypto.createCipheriv("aes-256-cbc", enc, iv);
  const ct = Buffer.concat([cipher.update(norm, "utf8"), cipher.final()]);
  return PREFIX + Buffer.concat([iv, ct]).toString("base64");
}

// Descriptografa; se não estiver no formato cifrado (legado), retorna como está.
export function decryptPii(stored: string | null | undefined): string | null {
  if (!stored) return null;
  if (!stored.startsWith(PREFIX)) return stored;
  try {
    const { enc } = getKeys();
    const buf = Buffer.from(stored.slice(PREFIX.length), "base64");
    const iv = buf.subarray(0, 16);
    const ct = buf.subarray(16);
    const decipher = crypto.createDecipheriv("aes-256-cbc", enc, iv);
    const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
    return pt.toString("utf8");
  } catch {
    return stored;
  }
}

export function isEncrypted(value: string | null | undefined): boolean {
  return !!value && value.startsWith(PREFIX);
}
