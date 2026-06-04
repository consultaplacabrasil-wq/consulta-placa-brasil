// Cria ou promove um usuário a administrador.
// Uso: node scripts/criar-admin.mjs "email@exemplo.com" "SenhaForte#123" "Nome Completo"
//
// Lê DATABASE_URL do .env / .env.local automaticamente.

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import bcrypt from "bcryptjs";

const { Client } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const content = readFileSync(join(rootDir, file), "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const idx = trimmed.indexOf("=");
        if (idx === -1) continue;
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    } catch {
      /* arquivo não existe */
    }
  }
}

async function main() {
  loadEnv();

  const [, , email, password, ...nameParts] = process.argv;
  const name = nameParts.join(" ") || "Administrador";

  if (!email || !password) {
    console.error('Uso: node scripts/criar-admin.mjs "email@exemplo.com" "SenhaForte#123" "Nome Completo"');
    process.exit(1);
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL não encontrada no .env");
    process.exit(1);
  }

  const ssl = dbUrl.includes("localhost") ? false : { rejectUnauthorized: false };
  const client = new Client({ connectionString: dbUrl, ssl });
  await client.connect();

  const emailNorm = email.toLowerCase().trim();
  const hashed = await bcrypt.hash(password, 12);

  // Verifica se já existe
  const existing = await client.query("SELECT id, role FROM users WHERE email = $1 LIMIT 1", [emailNorm]);

  if (existing.rows.length > 0) {
    await client.query(
      "UPDATE users SET password = $1, role = 'admin', email_verified = true, updated_at = NOW() WHERE email = $2",
      [hashed, emailNorm]
    );
    console.log(`✅ Usuário ${emailNorm} ATUALIZADO para admin com nova senha.`);
  } else {
    await client.query(
      `INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, 'admin', true, NOW(), NOW())`,
      [name, emailNorm, hashed]
    );
    console.log(`✅ Usuário admin ${emailNorm} CRIADO com sucesso.`);
  }

  await client.end();
  console.log("\nAgora faça login em /login com esse e-mail e senha.");
}

main().catch((err) => {
  console.error("❌ Erro:", err.message);
  process.exit(1);
});
