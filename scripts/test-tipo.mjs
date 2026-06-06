// Descobre/confirma o "tipo" da APIBrasil a usar na consulta grátis (Agregados Simples).
// Uso:  node scripts/test-tipo.mjs PLACA [tipo1 tipo2 ...]
// Ex.:  node scripts/test-tipo.mjs ABC1D23
// Lê APIBRASIL_BEARER_TOKEN de .env.local (não imprime o token).
import { readFileSync } from "fs";

function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        let v = m[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        process.env[m[1]] = v;
      }
    }
  } catch {}
}
loadEnv();

const TOKEN = process.env.APIBRASIL_BEARER_TOKEN;
if (!TOKEN) { console.error("APIBRASIL_BEARER_TOKEN ausente em .env.local"); process.exit(1); }

const placa = (process.argv[2] || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
if (!placa) { console.error("Informe a placa: node scripts/test-tipo.mjs ABC1D23"); process.exit(1); }

const candidatos = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["agregados-simples", "agregados", "agregados-v2"]; // simples primeiro (mais barato)

const URL = "https://gateway.apibrasil.io/api/v2/consulta/veiculos/credits";

async function testar(tipo) {
  const t0 = Date.now();
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ tipo, placa }),
    });
    const ms = Date.now() - t0;
    const json = await res.json().catch(() => ({}));
    const ok = res.ok && json && json.error !== true;
    console.log(`\n=== tipo: "${tipo}" | HTTP ${res.status} | ${ms}ms | ${ok ? "OK" : "FALHOU"} ===`);
    if (!ok) {
      console.log("mensagem:", json.message || JSON.stringify(json).slice(0, 200));
      return;
    }
    const d = json.data || json.response || json;
    // mostra as chaves de topo e tenta extrair os campos da tela de preview
    console.log("chaves do data:", Object.keys(d).slice(0, 30).join(", "));
    console.log(JSON.stringify(d, null, 2).slice(0, 1500));
  } catch (e) {
    console.log(`\n=== tipo: "${tipo}" | ERRO: ${e.message} ===`);
  }
}

console.log(`Placa: ${placa} | testando tipos: ${candidatos.join(", ")}`);
for (const tipo of candidatos) {
  await testar(tipo);
}
