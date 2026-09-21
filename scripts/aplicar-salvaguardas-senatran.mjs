// Aplica no banco as estruturas das salvaguardas exigidas pela SENATRAN
// (Nota Técnica nº 554/2026, item 3.2.2.5 — processo SEI 50000.029673/2026-67).
//
// Uso: node scripts/aplicar-salvaguardas-senatran.mjs
//      node scripts/aplicar-salvaguardas-senatran.mjs --dry-run
//
// Requer DATABASE_URL no .env.local.
//
// Por que um script e não `drizzle-kit migrate`: a pasta drizzle/ está
// dessincronizada (o projeto sempre usou db:push, sem gerar migrations), então
// `migrate` tentaria recriar colunas já existentes. E `.gitignore` ignora
// *.sql, de modo que migrations geradas nem chegam à VPS.
//
// Todas as instruções são idempotentes e ADITIVAS: nada é removido ou alterado
// em dados existentes. Rodar duas vezes não causa efeito.

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

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
      console.log(`✓ Variáveis carregadas de ${file}`);
      return;
    } catch {
      /* tenta o próximo */
    }
  }
}

const PASSOS = [
  {
    nome: "Tipo enum consulta_purpose",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consulta_purpose') THEN
          CREATE TYPE "public"."consulta_purpose" AS ENUM('compra', 'venda', 'negociacao');
        END IF;
      END $$;`,
  },
  {
    nome: "Coluna report_requests.purpose",
    sql: `ALTER TABLE "report_requests" ADD COLUMN IF NOT EXISTS "purpose" "public"."consulta_purpose";`,
  },
  {
    nome: "Coluna report_requests.purpose_declared_at",
    sql: `ALTER TABLE "report_requests" ADD COLUMN IF NOT EXISTS "purpose_declared_at" timestamp;`,
  },
  {
    nome: "Tabela consulta_audit_log",
    sql: `
      CREATE TABLE IF NOT EXISTS "consulta_audit_log" (
        "id" text PRIMARY KEY NOT NULL,
        "user_id" text NOT NULL,
        "request_id" text,
        "plate" varchar(10),
        "purpose" "public"."consulta_purpose",
        "outcome" varchar(40) NOT NULL,
        "detail" text,
        "ip_address" varchar(45),
        "user_agent" text,
        "created_at" timestamp DEFAULT now() NOT NULL
      );`,
  },
  {
    nome: "FK consulta_audit_log.user_id → users.id",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'consulta_audit_log_user_id_users_id_fk'
        ) THEN
          ALTER TABLE "consulta_audit_log"
            ADD CONSTRAINT "consulta_audit_log_user_id_users_id_fk"
            FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
        END IF;
      END $$;`,
  },
  {
    nome: "FK consulta_audit_log.request_id → report_requests.id",
    sql: `
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'consulta_audit_log_request_id_report_requests_id_fk'
        ) THEN
          ALTER TABLE "consulta_audit_log"
            ADD CONSTRAINT "consulta_audit_log_request_id_report_requests_id_fk"
            FOREIGN KEY ("request_id") REFERENCES "public"."report_requests"("id");
        END IF;
      END $$;`,
  },
  {
    nome: "Índice consulta_audit_user_idx",
    sql: `CREATE INDEX IF NOT EXISTS "consulta_audit_user_idx" ON "consulta_audit_log" USING btree ("user_id");`,
  },
  {
    nome: "Índice consulta_audit_plate_idx",
    sql: `CREATE INDEX IF NOT EXISTS "consulta_audit_plate_idx" ON "consulta_audit_log" USING btree ("plate");`,
  },
  {
    nome: "Índice consulta_audit_created_idx",
    sql: `CREATE INDEX IF NOT EXISTS "consulta_audit_created_idx" ON "consulta_audit_log" USING btree ("created_at");`,
  },
];

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  loadEnv();

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("✗ DATABASE_URL não encontrada. Verifique o .env.local.");
    process.exit(1);
  }

  if (dryRun) {
    console.log("\n── DRY RUN — nada será executado ──\n");
    for (const p of PASSOS) console.log(`• ${p.nome}\n${p.sql.trim()}\n`);
    return;
  }

  const client = new Client({ connectionString: url });
  await client.connect();
  console.log("✓ Conectado ao banco\n");

  try {
    // Tudo em uma transação: ou aplica inteiro, ou não aplica nada.
    await client.query("BEGIN");
    for (const passo of PASSOS) {
      await client.query(passo.sql);
      console.log(`  ✓ ${passo.nome}`);
    }
    await client.query("COMMIT");
    console.log("\n✓ Salvaguardas aplicadas com sucesso.");

    const { rows } = await client.query(`
      SELECT
        (SELECT count(*) FROM information_schema.columns
          WHERE table_name = 'report_requests' AND column_name IN ('purpose','purpose_declared_at')) AS colunas,
        (SELECT count(*) FROM information_schema.tables
          WHERE table_name = 'consulta_audit_log') AS tabela;
    `);
    console.log(`  Verificação: ${rows[0].colunas}/2 colunas, ${rows[0].tabela}/1 tabela.`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("\n✗ Falhou — nada foi aplicado (rollback):", err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
