// Extrai as notícias do backup e converte a coluna tags (JSON -> array PostgreSQL)
// Gera backups/noticias-fix.sql pronto para importar no VPS.
import { readFileSync, writeFileSync } from "fs";

const sql = readFileSync("backups/backup-banco-2026-06-02T16-56-21.sql", "utf8");

// 1) Extrai a seção noticias
const lines = sql.split("\n");
let cap = false;
const sec = [];
for (const l of lines) {
  if (l.includes("Tabela: noticias (")) cap = true;
  else if (l.startsWith("-- Tabela:") && cap) break;
  if (cap) sec.push(l);
}
const secText = sec.join("\n");

// 2) Isola o trecho de VALUES (do primeiro "(" após VALUES até o ";" final)
const valuesIdx = secText.indexOf("VALUES");
const afterValues = secText.slice(valuesIdx + "VALUES".length);
const endIdx = afterValues.lastIndexOf(";");
const valuesPart = afterValues.slice(0, endIdx);

// 3) Parser: separa tuplas de nível superior "(...)"
function splitTuples(str) {
  const tuples = [];
  let depth = 0, inStr = false, start = -1;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (inStr) {
      if (c === "'") {
        if (str[i + 1] === "'") { i++; continue; } // '' escape
        inStr = false;
      }
      continue;
    }
    if (c === "'") { inStr = true; continue; }
    if (c === "(") { if (depth === 0) start = i + 1; depth++; }
    else if (c === ")") { depth--; if (depth === 0) tuples.push(str.slice(start, i)); }
  }
  return tuples;
}

// 4) Parser: separa campos de nível superior por vírgula
function splitFields(tuple) {
  const fields = [];
  let inStr = false, start = 0, depth = 0;
  for (let i = 0; i < tuple.length; i++) {
    const c = tuple[i];
    if (inStr) {
      if (c === "'") { if (tuple[i + 1] === "'") { i++; continue; } inStr = false; }
      continue;
    }
    if (c === "'") { inStr = true; continue; }
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "," && depth === 0) { fields.push(tuple.slice(start, i)); start = i + 1; }
  }
  fields.push(tuple.slice(start));
  return fields.map((f) => f.trim());
}

// 5) Converte um valor de tags (string SQL com JSON) -> literal de array PG
function fixTags(field) {
  if (field === "NULL" || field === "null") return "NULL";
  // field é algo como '["a","b"]'
  if (!field.startsWith("'")) return "'{}'";
  let inner = field.slice(1, -1).replace(/''/g, "'"); // remove aspas SQL externas + unescape
  try {
    const arr = JSON.parse(inner);
    if (!Array.isArray(arr) || arr.length === 0) return "'{}'";
    const elems = arr.map((e) => '"' + String(e).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"');
    const pgArr = "{" + elems.join(",") + "}";
    return "'" + pgArr.replace(/'/g, "''") + "'";
  } catch {
    return "'{}'";
  }
}

const TAGS_INDEX = 6; // 7ª coluna
const tuples = splitTuples(valuesPart);
let fixed = 0;
const newTuples = tuples.map((t) => {
  const fields = splitFields(t);
  if (fields.length >= TAGS_INDEX + 1) {
    const before = fields[TAGS_INDEX];
    fields[TAGS_INDEX] = fixTags(before);
    if (before !== fields[TAGS_INDEX]) fixed++;
  }
  return "(" + fields.join(", ") + ")";
});

const colList = secText.slice(secText.indexOf("INSERT INTO"), valuesIdx).trim();
const outSql =
  `DELETE FROM noticias;\n` +
  `${colList} VALUES\n` +
  newTuples.join(",\n") + ";\n";

writeFileSync("backups/noticias-fix.sql", outSql);
console.log(`Tuplas: ${tuples.length} | tags convertidas: ${fixed}`);
console.log("Arquivo gerado: backups/noticias-fix.sql");
console.log("Amostra de uma tupla:");
console.log(newTuples[0].slice(0, 300));
