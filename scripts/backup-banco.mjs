// Script de backup do banco de dados Neon → arquivo SQL local
// Uso: node scripts/backup-banco.mjs
// Requer: DATABASE_URL no arquivo .env.local

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Client } = pkg;

// Carregar .env.local manualmente
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
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
      break;
    } catch {
      // arquivo não existe, tenta o próximo
    }
  }
}

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
  if (typeof val === "number") return String(val);
  if (val instanceof Date) return `'${val.toISOString()}'`;
  if (typeof val === "object") return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function backupBanco() {
  loadEnv();

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL não encontrada no .env.local");
    process.exit(1);
  }

  console.log("🔌 Conectando ao banco de dados...");
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  console.log("✓ Conectado com sucesso!\n");

  // Buscar todas as tabelas do schema public
  const tablesRes = await client.query(`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `);

  const tables = tablesRes.rows.map((r) => r.tablename);
  console.log(`📋 Tabelas encontradas (${tables.length}):`);
  tables.forEach((t) => console.log(`   - ${t}`));

  const lines = [];
  const now = new Date().toISOString();

  lines.push(`-- ============================================================`);
  lines.push(`-- Backup Consulta Placa Brasil`);
  lines.push(`-- Gerado em: ${now}`);
  lines.push(`-- Banco: Neon PostgreSQL (sa-east-1)`);
  lines.push(`-- ============================================================`);
  lines.push(``);
  lines.push(`SET client_encoding = 'UTF8';`);
  lines.push(`SET standard_conforming_strings = on;`);
  lines.push(``);

  let totalRows = 0;

  for (const table of tables) {
    console.log(`\n📦 Exportando tabela: ${table}`);

    // Buscar colunas
    const colsRes = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);

    const columns = colsRes.rows.map((r) => r.column_name);

    // Buscar dados
    const dataRes = await client.query(`SELECT * FROM "${table}"`);
    const rows = dataRes.rows;

    lines.push(`-- Tabela: ${table} (${rows.length} registros)`);
    lines.push(`TRUNCATE TABLE "${table}" CASCADE;`);

    if (rows.length > 0) {
      const colList = columns.map((c) => `"${c}"`).join(", ");
      lines.push(`INSERT INTO "${table}" (${colList}) VALUES`);

      const valueRows = rows.map((row) => {
        const vals = columns.map((col) => escapeSql(row[col]));
        return `  (${vals.join(", ")})`;
      });

      lines.push(valueRows.join(",\n") + ";");
      totalRows += rows.length;
    }

    lines.push(``);
    console.log(`   ✓ ${rows.length} registros exportados`);
  }

  lines.push(`-- ============================================================`);
  lines.push(`-- Total: ${totalRows} registros em ${tables.length} tabelas`);
  lines.push(`-- ============================================================`);

  // Salvar arquivo
  const backupDir = join(rootDir, "backups");
  mkdirSync(backupDir, { recursive: true });

  const timestamp = now.replace(/[:.]/g, "-").slice(0, 19);
  const filename = `backup-banco-${timestamp}.sql`;
  const filepath = join(backupDir, filename);

  writeFileSync(filepath, lines.join("\n"), "utf-8");

  await client.end();

  console.log(`\n✅ Backup concluído!`);
  console.log(`📁 Arquivo: backups/${filename}`);
  console.log(`📊 ${totalRows} registros em ${tables.length} tabelas`);
  console.log(`📏 Tamanho: ${(readFileSync(filepath).length / 1024).toFixed(1)} KB`);
}

backupBanco().catch((err) => {
  console.error("❌ Erro no backup:", err.message);
  process.exit(1);
});
