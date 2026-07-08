// Migração única: cifra os CPF/CNPJ existentes (texto puro -> cifrado determinístico).
// Uso na VPS:
//   cd /var/www/consulta-placa-veiculos
//   set -a; . ./.env; set +a
//   node scripts/migrate-encrypt-cpf.mjs
// Requer PII_ENCRYPTION_KEY e DATABASE_URL no ambiente. Idempotente (pula já cifrados).

import pg from "pg";
import crypto from "crypto";

const PREFIX = "enc:v1:";

function getKeys() {
  const raw = process.env.PII_ENCRYPTION_KEY;
  if (!raw || raw.length < 32) throw new Error("PII_ENCRYPTION_KEY ausente/curta");
  const enc = crypto.createHash("sha256").update(raw).digest();
  const mac = crypto.createHash("sha256").update(Buffer.concat([enc, Buffer.from("pii-mac")])).digest();
  return { enc, mac };
}

function encryptPii(value) {
  if (!value) return null;
  const norm = String(value).replace(/\D/g, "");
  if (!norm) return null;
  const { enc, mac } = getKeys();
  const iv = crypto.createHmac("sha256", mac).update(norm).digest().subarray(0, 16);
  const cipher = crypto.createCipheriv("aes-256-cbc", enc, iv);
  const ct = Buffer.concat([cipher.update(norm, "utf8"), cipher.final()]);
  return PREFIX + Buffer.concat([iv, ct]).toString("base64");
}

const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rows } = await client.query(
  "SELECT id, cpf_cnpj FROM users WHERE cpf_cnpj IS NOT NULL AND cpf_cnpj NOT LIKE 'enc:v1:%'"
);
console.log("Registros a cifrar:", rows.length);
let ok = 0, skip = 0;
for (const r of rows) {
  const encv = encryptPii(r.cpf_cnpj);
  if (!encv) { skip++; continue; }
  try {
    await client.query("UPDATE users SET cpf_cnpj=$1 WHERE id=$2", [encv, r.id]);
    ok++;
  } catch (e) {
    console.error("Falha id", r.id, "-", e.message);
    skip++;
  }
}
console.log("Cifrados:", ok, "| Pulados:", skip);
await client.end();
