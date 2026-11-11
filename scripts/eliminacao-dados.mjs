// Eliminação programada de dados pessoais — Consulta Placa Brasil.
//
// Cumpre o compromisso de eliminação assumido na avaliação de legítimo
// interesse (LIA) e na política de privacidade: arts. 15 e 16 da Lei nº
// 13.709/2018 e cláusulas do contrato SERPRO (dados da base SENATRAN não podem
// ser mantidos além da finalidade).
//
// Uso:  node scripts/eliminacao-dados.mjs --dry-run   (só conta, não altera)
//       node scripts/eliminacao-dados.mjs             (executa)
//
// Requer DATABASE_URL (.env.local ou .env). Agendado por cron no servidor:
// ver scripts/vps/06-agendar-eliminacao.sh.
//
// O que faz:
//   1. Relatórios vencidos  -> esvazia o conteúdo (data = {}) e remove pdf_url.
//      A linha permanece: a tela continua exibindo "Relatório não disponível".
//   2. Trilha de auditoria  -> apaga registros além de RETENCAO_TRILHA_DIAS
//      (padrão 1825 = 5 anos).
//   3. Logs de API          -> apaga registros além de RETENCAO_LOGS_API_DIAS
//      (padrão 180, em razão do art. 15 do Marco Civil da Internet), exceto os
//      registros desta própria rotina, que servem de evidência da eliminação.
//
// Os prazos espelham src/lib/retencao.ts (fonte única dos prazos). Se mudar um
// padrão lá, mude aqui.
//
// Cada execução real grava uma linha em api_logs (endpoint "eliminacao-dados")
// com as quantidades, como comprovação para a SENATRAN e a ANPD.

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Client } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

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
      return;
    } catch {
      /* tenta o próximo */
    }
  }
}

function dias(nome, padrao) {
  const parsed = Number.parseInt(process.env[nome] ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : padrao;
}

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida.");
  process.exit(1);
}

const RELATORIO_DIAS = dias("RETENCAO_RELATORIO_DIAS", 30);
const TRILHA_DIAS = dias("RETENCAO_TRILHA_DIAS", 5 * 365);
const LOGS_API_DIAS = dias("RETENCAO_LOGS_API_DIAS", 180);

// Condições compartilhadas entre a contagem (dry-run) e a execução.
const RELATORIOS_VENCIDOS = `
  FROM reports
  WHERE (data <> '{}'::jsonb OR pdf_url IS NOT NULL)
    AND COALESCE(expires_at, created_at + make_interval(days => $1)) < NOW()`;

const TRILHA_ANTIGA = `
  FROM consulta_audit_log
  WHERE created_at < NOW() - make_interval(days => $1)`;

const LOGS_API_ANTIGOS = `
  FROM api_logs
  WHERE created_at < NOW() - make_interval(days => $1)
    AND endpoint <> 'eliminacao-dados'`;

async function contar(client, from, param) {
  const { rows } = await client.query(`SELECT count(*)::int AS n ${from}`, [param]);
  return rows[0].n;
}

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const inicio = Date.now();

  try {
    const alvo = {
      relatorios: await contar(client, RELATORIOS_VENCIDOS, RELATORIO_DIAS),
      trilha: await contar(client, TRILHA_ANTIGA, TRILHA_DIAS),
      logsApi: await contar(client, LOGS_API_ANTIGOS, LOGS_API_DIAS),
    };

    console.log(
      `[${new Date().toISOString()}] ${DRY_RUN ? "DRY-RUN" : "EXECUÇÃO"} — ` +
        `prazos: relatório ${RELATORIO_DIAS}d, trilha ${TRILHA_DIAS}d, logs de API ${LOGS_API_DIAS}d`
    );
    console.log(`  relatórios vencidos a esvaziar : ${alvo.relatorios}`);
    console.log(`  trilha de auditoria a apagar   : ${alvo.trilha}`);
    console.log(`  logs de API a apagar           : ${alvo.logsApi}`);

    if (DRY_RUN) {
      console.log("Nada foi alterado (--dry-run).");
      return;
    }

    await client.query("BEGIN");
    const r1 = await client.query(
      `UPDATE reports SET data = '{}'::jsonb, pdf_url = NULL ${RELATORIOS_VENCIDOS.replace(
        /^\s*FROM reports/,
        ""
      )}`,
      [RELATORIO_DIAS]
    );
    const r2 = await client.query(`DELETE ${TRILHA_ANTIGA}`, [TRILHA_DIAS]);
    const r3 = await client.query(`DELETE ${LOGS_API_ANTIGOS}`, [LOGS_API_DIAS]);

    const resultado = {
      relatoriosEsvaziados: r1.rowCount,
      trilhaApagada: r2.rowCount,
      logsApiApagados: r3.rowCount,
      prazosDias: { relatorio: RELATORIO_DIAS, trilha: TRILHA_DIAS, logsApi: LOGS_API_DIAS },
    };

    // Comprovação da execução (não contém dado pessoal).
    await client.query(
      `INSERT INTO api_logs (id, endpoint, method, status_code, response_time_ms, request_body)
       VALUES (gen_random_uuid()::text, 'eliminacao-dados', 'CRON', 200, $1, $2::jsonb)`,
      [Date.now() - inicio, JSON.stringify(resultado)]
    );
    await client.query("COMMIT");

    console.log(`Concluído:`, JSON.stringify(resultado));
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Falha na eliminação (transação desfeita):", err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
