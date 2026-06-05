import ExcelJS from "exceljs";

const wb = new ExcelJS.Workbook();
wb.creator = "Consulta Placa Brasil";
wb.created = new Date();

// ============================================================
// ESTILOS REUTILIZÁVEIS
// ============================================================
const COLORS = {
  primary: "FF1E3A8A",
  primaryLight: "FFDBEAFE",
  success: "FF059669",
  successLight: "FFD1FAE5",
  warning: "FFF59E0B",
  warningLight: "FFFEF3C7",
  danger: "FFDC2626",
  dangerLight: "FFFEE2E2",
  gray: "FF6B7280",
  grayLight: "FFF3F4F6",
  white: "FFFFFFFF",
};

const HEADER_STYLE = {
  font: { bold: true, color: { argb: COLORS.white }, size: 12 },
  fill: { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.primary } },
  alignment: { horizontal: "center", vertical: "middle" },
  border: {
    top: { style: "thin", color: { argb: COLORS.primary } },
    bottom: { style: "thin", color: { argb: COLORS.primary } },
    left: { style: "thin", color: { argb: COLORS.primary } },
    right: { style: "thin", color: { argb: COLORS.primary } },
  },
};

const TITLE_STYLE = {
  font: { bold: true, size: 16, color: { argb: COLORS.primary } },
  alignment: { horizontal: "left", vertical: "middle" },
};

const SUBTITLE_STYLE = {
  font: { bold: true, size: 12, color: { argb: COLORS.gray } },
};

const CURRENCY_FORMAT = '"R$" #,##0.00';
const USD_FORMAT = '"U$" #,##0.00';
const PERCENT_FORMAT = "0.00%";

const TOTAL_STYLE = {
  font: { bold: true, color: { argb: COLORS.primary }, size: 12 },
  fill: { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.primaryLight } },
  border: {
    top: { style: "double", color: { argb: COLORS.primary } },
    bottom: { style: "double", color: { argb: COLORS.primary } },
  },
};

function applyBorder(cell, color = "FFE5E7EB") {
  cell.border = {
    top: { style: "thin", color: { argb: color } },
    bottom: { style: "thin", color: { argb: color } },
    left: { style: "thin", color: { argb: color } },
    right: { style: "thin", color: { argb: color } },
  };
}

// ============================================================
// CONFIG GLOBAL
// ============================================================
const CAMBIO_USD = 5.5; // Taxa de câmbio para conversão U$ → R$

// ============================================================
// ABA 1: RESUMO EXECUTIVO
// ============================================================
const wsResumo = wb.addWorksheet("📊 Resumo Executivo", {
  properties: { tabColor: { argb: COLORS.primary } },
});

wsResumo.getColumn("A").width = 5;
wsResumo.getColumn("B").width = 45;
wsResumo.getColumn("C").width = 18;
wsResumo.getColumn("D").width = 18;
wsResumo.getColumn("E").width = 18;
wsResumo.getColumn("F").width = 18;

wsResumo.mergeCells("B2:F2");
wsResumo.getCell("B2").value = "💰 Resumo de Custos Operacionais — Consulta Placa Brasil";
wsResumo.getCell("B2").style = {
  font: { bold: true, size: 18, color: { argb: COLORS.white } },
  alignment: { horizontal: "center", vertical: "middle" },
  fill: { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.primary } },
};
wsResumo.getRow(2).height = 35;

wsResumo.mergeCells("B3:F3");
wsResumo.getCell("B3").value = `Cenário Realista — 1 funcionário PJ — Atualizado em ${new Date().toLocaleDateString("pt-BR")}`;
wsResumo.getCell("B3").style = {
  font: { italic: true, color: { argb: COLORS.gray }, size: 11 },
  alignment: { horizontal: "center" },
};
wsResumo.getRow(3).height = 22;

// Cabeçalho
const headerRow = 5;
["Categoria", "Custo Mensal (Virtual)", "Custo Mensal (Sala Física)", "Custo Anual (Virtual)", "Custo Anual (Sala Física)"].forEach((header, i) => {
  const cell = wsResumo.getCell(headerRow, 2 + i);
  cell.value = header;
  cell.style = HEADER_STYLE;
});
wsResumo.getRow(headerRow).height = 30;

// Linhas
const resumoData = [
  { cat: "🖥️  Infraestrutura (VPS, domínios)", virtual: 56.65, fisica: 56.65 },
  { cat: "🤖 Ferramentas & SaaS (IA Claude)", virtual: 500.00, fisica: 500.00 },
  { cat: "🏢 Endereço / Sala", virtual: 99.00, fisica: 2200.00 },
  { cat: "👤 Funcionário PJ (1 pessoa)", virtual: 3000.00, fisica: 3000.00 },
  { cat: "📋 Contador (CNPJ)", virtual: 300.00, fisica: 300.00 },
  { cat: "💸 Variável: APIs (estimado)", virtual: 1500.00, fisica: 1500.00 },
];

resumoData.forEach((item, i) => {
  const row = headerRow + 1 + i;
  wsResumo.getCell(row, 2).value = item.cat;
  wsResumo.getCell(row, 3).value = item.virtual;
  wsResumo.getCell(row, 4).value = item.fisica;
  wsResumo.getCell(row, 5).value = { formula: `C${row}*12` };
  wsResumo.getCell(row, 6).value = { formula: `D${row}*12` };

  for (let col = 2; col <= 6; col++) {
    const cell = wsResumo.getCell(row, col);
    if (col >= 3) cell.numFmt = CURRENCY_FORMAT;
    applyBorder(cell);
  }
  wsResumo.getRow(row).height = 22;
});

// Total
const totalRow = headerRow + 1 + resumoData.length;
wsResumo.getCell(totalRow, 2).value = "TOTAL GERAL";
wsResumo.getCell(totalRow, 3).value = { formula: `SUM(C${headerRow + 1}:C${totalRow - 1})` };
wsResumo.getCell(totalRow, 4).value = { formula: `SUM(D${headerRow + 1}:D${totalRow - 1})` };
wsResumo.getCell(totalRow, 5).value = { formula: `SUM(E${headerRow + 1}:E${totalRow - 1})` };
wsResumo.getCell(totalRow, 6).value = { formula: `SUM(F${headerRow + 1}:F${totalRow - 1})` };

for (let col = 2; col <= 6; col++) {
  const cell = wsResumo.getCell(totalRow, col);
  cell.style = TOTAL_STYLE;
  if (col >= 3) cell.numFmt = CURRENCY_FORMAT;
}
wsResumo.getRow(totalRow).height = 28;

// Diferença sala
const difRow = totalRow + 2;
wsResumo.mergeCells(`B${difRow}:F${difRow}`);
wsResumo.getCell(`B${difRow}`).value = "💡 Análise: Virtual vs. Sala Física";
wsResumo.getCell(`B${difRow}`).style = SUBTITLE_STYLE;

const difRow2 = difRow + 1;
wsResumo.getCell(`B${difRow2}`).value = "Economia mensal escolhendo VIRTUAL";
wsResumo.getCell(`C${difRow2}`).value = { formula: `D${totalRow}-C${totalRow}` };
wsResumo.getCell(`C${difRow2}`).numFmt = CURRENCY_FORMAT;
wsResumo.getCell(`C${difRow2}`).font = { bold: true, color: { argb: COLORS.success } };

wsResumo.getCell(`B${difRow2 + 1}`).value = "Economia anual escolhendo VIRTUAL";
wsResumo.getCell(`C${difRow2 + 1}`).value = { formula: `F${totalRow}-E${totalRow}` };
wsResumo.getCell(`C${difRow2 + 1}`).numFmt = CURRENCY_FORMAT;
wsResumo.getCell(`C${difRow2 + 1}`).font = { bold: true, color: { argb: COLORS.success } };

// Observações
const obsRow = difRow2 + 4;
wsResumo.mergeCells(`B${obsRow}:F${obsRow}`);
wsResumo.getCell(`B${obsRow}`).value = "📝 Observações:";
wsResumo.getCell(`B${obsRow}`).style = SUBTITLE_STYLE;

const observacoes = [
  "• Os valores das APIs (APIBrasil) variam conforme o volume de consultas — ver aba 'APIs APIBrasil' para detalhamento.",
  "• Custo da IA Claude (R$ 500/mês) é estimativa baseada em uso moderado.",
  "• Salário do funcionário PJ definido em R$ 3.000/mês (perfil júnior-pleno).",
  "• Comparativo Virtual vs. Física considera Brasília (Brasil 21 / Concept Offices).",
  "• Para projeção de receita e break-even, ver aba 'Projeção'.",
];

observacoes.forEach((obs, i) => {
  const row = obsRow + 1 + i;
  wsResumo.mergeCells(`B${row}:F${row}`);
  wsResumo.getCell(`B${row}`).value = obs;
  wsResumo.getCell(`B${row}`).style = { font: { size: 10, color: { argb: COLORS.gray } } };
});

// ============================================================
// ABA 2: CUSTOS FIXOS DETALHADOS
// ============================================================
const wsFixos = wb.addWorksheet("🖥️ Custos Fixos", {
  properties: { tabColor: { argb: "FF059669" } },
});

wsFixos.getColumn("A").width = 5;
wsFixos.getColumn("B").width = 40;
wsFixos.getColumn("C").width = 18;
wsFixos.getColumn("D").width = 18;
wsFixos.getColumn("E").width = 18;
wsFixos.getColumn("F").width = 18;
wsFixos.getColumn("G").width = 35;

wsFixos.mergeCells("B2:G2");
wsFixos.getCell("B2").value = "🖥️ Custos Fixos Mensais — Detalhamento";
wsFixos.getCell("B2").style = TITLE_STYLE;
wsFixos.getRow(2).height = 30;

const headerFixos = 4;
["Item", "Valor Original", "Periodicidade", "Custo Mensal (R$)", "Custo Anual (R$)", "Observação"].forEach((h, i) => {
  const cell = wsFixos.getCell(headerFixos, 2 + i);
  cell.value = h;
  cell.style = HEADER_STYLE;
});
wsFixos.getRow(headerFixos).height = 30;

const fixosData = [
  { item: "Domínio .com (consultaplacabrasil.com)", valor: 10, periodo: "U$ / ano", mensal: { formula: `(C5*${CAMBIO_USD})/12` }, obs: `Câmbio: R$ ${CAMBIO_USD.toFixed(2)}/USD` },
  { item: "Domínio .com.br", valor: 40, periodo: "R$ / ano", mensal: { formula: "C6/12" }, obs: "Registro.br" },
  { item: "VPS Hostinger (plano 12 meses)", valor: 599.88, periodo: "R$ / 12 meses", mensal: { formula: "C7/12" }, obs: "Custo médio: R$ 49,99/mês" },
  { item: "VPS Hostinger (plano 24 meses)", valor: 1055.76, periodo: "R$ / 24 meses", mensal: { formula: "C8/24" }, obs: "Custo médio: R$ 43,99/mês ⭐ MELHOR CUSTO" },
  { item: "IA Claude Code (subscription)", valor: 500, periodo: "R$ / mês", mensal: { formula: "C9" }, obs: "Plano padrão de uso" },
  { item: "Endereço Fiscal (Concept Offices)", valor: 99, periodo: "R$ / mês", mensal: { formula: "C10" }, obs: "Brasil 21 — virtual" },
  { item: "Email Google Workspace (1 usuário)", valor: 30, periodo: "R$ / mês", mensal: { formula: "C11" }, obs: "Recomendado para profissionalismo" },
  { item: "Backup automatizado (cloud)", valor: 50, periodo: "R$ / mês", mensal: { formula: "C12" }, obs: "S3, Backblaze ou similar" },
  { item: "Antivírus / Segurança", valor: 50, periodo: "R$ / mês", mensal: { formula: "C13" }, obs: "Bitdefender, Kaspersky" },
];

fixosData.forEach((item, i) => {
  const row = headerFixos + 1 + i;
  wsFixos.getCell(row, 2).value = item.item;
  wsFixos.getCell(row, 3).value = item.valor;
  wsFixos.getCell(row, 4).value = item.periodo;
  wsFixos.getCell(row, 5).value = item.mensal;
  wsFixos.getCell(row, 6).value = { formula: `E${row}*12` };
  wsFixos.getCell(row, 7).value = item.obs;

  // Highlight VPS 24 meses (melhor custo)
  if (i === 3) {
    for (let col = 2; col <= 7; col++) {
      wsFixos.getCell(row, col).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: COLORS.successLight },
      };
    }
  }

  wsFixos.getCell(row, 3).numFmt = item.periodo.includes("U$") ? USD_FORMAT : CURRENCY_FORMAT;
  wsFixos.getCell(row, 5).numFmt = CURRENCY_FORMAT;
  wsFixos.getCell(row, 6).numFmt = CURRENCY_FORMAT;
  for (let col = 2; col <= 7; col++) applyBorder(wsFixos.getCell(row, col));
});

// Total
const totalFixosRow = headerFixos + 1 + fixosData.length;
wsFixos.getCell(totalFixosRow, 2).value = "TOTAL CUSTOS FIXOS (sem VPS 24 meses)";
wsFixos.getCell(totalFixosRow, 5).value = { formula: `SUM(E${headerFixos + 1}:E${totalFixosRow - 1})-E${headerFixos + 4}` };
wsFixos.getCell(totalFixosRow, 6).value = { formula: `E${totalFixosRow}*12` };
for (let col = 2; col <= 7; col++) {
  wsFixos.getCell(totalFixosRow, col).style = TOTAL_STYLE;
}
wsFixos.getCell(totalFixosRow, 5).numFmt = CURRENCY_FORMAT;
wsFixos.getCell(totalFixosRow, 6).numFmt = CURRENCY_FORMAT;
wsFixos.getRow(totalFixosRow).height = 28;

// Nota
const noteFixos = totalFixosRow + 2;
wsFixos.mergeCells(`B${noteFixos}:G${noteFixos}`);
wsFixos.getCell(`B${noteFixos}`).value = "💡 Recomendação: contrate o plano de 24 meses do VPS para economizar 12% (R$ 6/mês). A linha em verde já está descontada do total.";
wsFixos.getCell(`B${noteFixos}`).style = { font: { italic: true, color: { argb: COLORS.success } } };

// ============================================================
// ABA 3: COMPARATIVO SALA — VIRTUAL vs FÍSICA
// ============================================================
const wsSala = wb.addWorksheet("🏢 Comparativo Sala", {
  properties: { tabColor: { argb: "FFF59E0B" } },
});

wsSala.getColumn("A").width = 5;
wsSala.getColumn("B").width = 35;
wsSala.getColumn("C").width = 25;
wsSala.getColumn("D").width = 25;
wsSala.getColumn("E").width = 25;

wsSala.mergeCells("B2:E2");
wsSala.getCell("B2").value = "🏢 Comparativo: Endereço Virtual vs. Sala Física";
wsSala.getCell("B2").style = TITLE_STYLE;
wsSala.getRow(2).height = 30;

const headerSala = 4;
["Item", "Endereço Virtual (Concept)", "Sala Física (Brasília nobre)", "Sala Física (Brasília média)"].forEach((h, i) => {
  const cell = wsSala.getCell(headerSala, 2 + i);
  cell.value = h;
  cell.style = HEADER_STYLE;
});
wsSala.getRow(headerSala).height = 30;

const salaData = [
  { item: "Aluguel/Endereço fiscal (mensal)", virtual: 99, nobre: 2200, media: 1200 },
  { item: "Condomínio", virtual: 0, nobre: 600, media: 300 },
  { item: "IPTU (rateado/mês)", virtual: 0, nobre: 150, media: 80 },
  { item: "Conta de luz", virtual: 0, nobre: 350, media: 200 },
  { item: "Internet dedicada", virtual: 0, nobre: 200, media: 130 },
  { item: "Água", virtual: 0, nobre: 80, media: 50 },
  { item: "Limpeza (semanal)", virtual: 0, nobre: 400, media: 200 },
  { item: "Móveis/equipamentos (rateado em 24m)", virtual: 0, nobre: 250, media: 150 },
  { item: "Manutenção e reparos", virtual: 0, nobre: 100, media: 50 },
];

salaData.forEach((item, i) => {
  const row = headerSala + 1 + i;
  wsSala.getCell(row, 2).value = item.item;
  wsSala.getCell(row, 3).value = item.virtual;
  wsSala.getCell(row, 4).value = item.nobre;
  wsSala.getCell(row, 5).value = item.media;

  for (let col = 2; col <= 5; col++) {
    const cell = wsSala.getCell(row, col);
    if (col >= 3) cell.numFmt = CURRENCY_FORMAT;
    applyBorder(cell);
  }
});

// Totais
const totalSalaRow = headerSala + 1 + salaData.length;
wsSala.getCell(totalSalaRow, 2).value = "TOTAL MENSAL";
for (let col = 3; col <= 5; col++) {
  wsSala.getCell(totalSalaRow, col).value = { formula: `SUM(${String.fromCharCode(64 + col)}${headerSala + 1}:${String.fromCharCode(64 + col)}${totalSalaRow - 1})` };
  wsSala.getCell(totalSalaRow, col).numFmt = CURRENCY_FORMAT;
}
for (let col = 2; col <= 5; col++) wsSala.getCell(totalSalaRow, col).style = TOTAL_STYLE;
wsSala.getRow(totalSalaRow).height = 28;

const totalAnualRow = totalSalaRow + 1;
wsSala.getCell(totalAnualRow, 2).value = "TOTAL ANUAL";
for (let col = 3; col <= 5; col++) {
  wsSala.getCell(totalAnualRow, col).value = { formula: `${String.fromCharCode(64 + col)}${totalSalaRow}*12` };
  wsSala.getCell(totalAnualRow, col).numFmt = CURRENCY_FORMAT;
  wsSala.getCell(totalAnualRow, col).font = { bold: true, color: { argb: COLORS.danger } };
}
wsSala.getCell(totalAnualRow, 2).font = { bold: true };

// Diferença
const difSalaRow = totalAnualRow + 2;
wsSala.mergeCells(`B${difSalaRow}:E${difSalaRow}`);
wsSala.getCell(`B${difSalaRow}`).value = "💰 Quanto você economiza por ano escolhendo VIRTUAL:";
wsSala.getCell(`B${difSalaRow}`).style = SUBTITLE_STYLE;

wsSala.getCell(`C${difSalaRow + 1}`).value = "vs. Nobre:";
wsSala.getCell(`D${difSalaRow + 1}`).value = { formula: `D${totalAnualRow}-C${totalAnualRow}` };
wsSala.getCell(`D${difSalaRow + 1}`).numFmt = CURRENCY_FORMAT;
wsSala.getCell(`D${difSalaRow + 1}`).font = { bold: true, color: { argb: COLORS.success }, size: 13 };

wsSala.getCell(`C${difSalaRow + 2}`).value = "vs. Média:";
wsSala.getCell(`D${difSalaRow + 2}`).value = { formula: `E${totalAnualRow}-C${totalAnualRow}` };
wsSala.getCell(`D${difSalaRow + 2}`).numFmt = CURRENCY_FORMAT;
wsSala.getCell(`D${difSalaRow + 2}`).font = { bold: true, color: { argb: COLORS.success }, size: 13 };

// ============================================================
// ABA 4: APIs APIBRASIL (CUSTO VARIÁVEL)
// ============================================================
const wsAPIs = wb.addWorksheet("🔌 APIs APIBrasil", {
  properties: { tabColor: { argb: "FF7C3AED" } },
});

wsAPIs.getColumn("A").width = 5;
wsAPIs.getColumn("B").width = 32;
wsAPIs.getColumn("C").width = 14;
wsAPIs.getColumn("D").width = 14;
wsAPIs.getColumn("E").width = 16;
wsAPIs.getColumn("F").width = 16;
wsAPIs.getColumn("G").width = 35;

wsAPIs.mergeCells("B2:G2");
wsAPIs.getCell("B2").value = "🔌 Custos Variáveis — APIs APIBrasil";
wsAPIs.getCell("B2").style = TITLE_STYLE;
wsAPIs.getRow(2).height = 30;

wsAPIs.mergeCells("B3:G3");
wsAPIs.getCell("B3").value = "Insira a quantidade estimada de consultas por mês na coluna 'Quantidade' para projeção automática";
wsAPIs.getCell("B3").style = { font: { italic: true, color: { argb: COLORS.gray } } };

const headerAPI = 5;
["API", "Custo/Consulta", "Quantidade/Mês", "Custo Mensal", "Custo Anual", "Observação"].forEach((h, i) => {
  const cell = wsAPIs.getCell(headerAPI, 2 + i);
  cell.value = h;
  cell.style = HEADER_STYLE;
});
wsAPIs.getRow(headerAPI).height = 30;

const apisData = [
  { api: "FIPE (Beta)", custo: 0.06, qtd: 100, obs: "Valor de mercado FIPE" },
  { api: "Tabela FIPE Crédito", custo: 0.06, qtd: 50, obs: "Para análise de crédito" },
  { api: "Placa FIPE (com Chassi)", custo: 0.10, qtd: 100, obs: "FIPE + chassi mascarado" },
  { api: "Base Nacional Online", custo: 2.34, qtd: 80, obs: "Dados SENATRAN" },
  { api: "Histórico Km", custo: 2.50, qtd: 30, obs: "Quilometragem do veículo" },
  { api: "Decodificador Precificador", custo: 3.75, qtd: 100, obs: "Identifica e precifica" },
  { api: "Recall V2", custo: 3.75, qtd: 30, obs: "Status de recall" },
  { api: "Decodificados Agregados", custo: 5.25, qtd: 20, obs: "Dados consolidados" },
  { api: "Base Estadual V3", custo: 10.75, qtd: 50, obs: "DETRAN (débitos, multas)" },
  { api: "Gravame V2", custo: 11.75, qtd: 40, obs: "Financiamento ativo" },
  { api: "Leilão V2", custo: 21.12, qtd: 20, obs: "Histórico de leilão" },
  { api: "Leilão Conjugado", custo: 27.52, qtd: 10, obs: "Múltiplos itens" },
  { api: "Veículos Total", custo: 30.00, qtd: 15, obs: "Consulta completa" },
];

apisData.forEach((item, i) => {
  const row = headerAPI + 1 + i;
  wsAPIs.getCell(row, 2).value = item.api;
  wsAPIs.getCell(row, 3).value = item.custo;
  wsAPIs.getCell(row, 4).value = item.qtd;
  wsAPIs.getCell(row, 5).value = { formula: `C${row}*D${row}` };
  wsAPIs.getCell(row, 6).value = { formula: `E${row}*12` };
  wsAPIs.getCell(row, 7).value = item.obs;

  wsAPIs.getCell(row, 3).numFmt = CURRENCY_FORMAT;
  wsAPIs.getCell(row, 5).numFmt = CURRENCY_FORMAT;
  wsAPIs.getCell(row, 6).numFmt = CURRENCY_FORMAT;

  // Destaque para campo editável
  wsAPIs.getCell(row, 4).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: COLORS.warningLight },
  };
  wsAPIs.getCell(row, 4).font = { bold: true, color: { argb: COLORS.warning } };

  for (let col = 2; col <= 7; col++) applyBorder(wsAPIs.getCell(row, col));
});

const totalAPIRow = headerAPI + 1 + apisData.length;
wsAPIs.getCell(totalAPIRow, 2).value = "TOTAL APIs";
wsAPIs.getCell(totalAPIRow, 4).value = { formula: `SUM(D${headerAPI + 1}:D${totalAPIRow - 1})` };
wsAPIs.getCell(totalAPIRow, 5).value = { formula: `SUM(E${headerAPI + 1}:E${totalAPIRow - 1})` };
wsAPIs.getCell(totalAPIRow, 6).value = { formula: `SUM(F${headerAPI + 1}:F${totalAPIRow - 1})` };
for (let col = 2; col <= 7; col++) wsAPIs.getCell(totalAPIRow, col).style = TOTAL_STYLE;
wsAPIs.getCell(totalAPIRow, 5).numFmt = CURRENCY_FORMAT;
wsAPIs.getCell(totalAPIRow, 6).numFmt = CURRENCY_FORMAT;
wsAPIs.getRow(totalAPIRow).height = 28;

const noteAPIRow = totalAPIRow + 2;
wsAPIs.mergeCells(`B${noteAPIRow}:G${noteAPIRow}`);
wsAPIs.getCell(`B${noteAPIRow}`).value = "💡 Os campos AMARELOS na coluna 'Quantidade/Mês' são editáveis. Altere conforme sua expectativa real de vendas.";
wsAPIs.getCell(`B${noteAPIRow}`).style = { font: { italic: true, color: { argb: COLORS.warning } } };

const noteAPI2 = noteAPIRow + 1;
wsAPIs.mergeCells(`B${noteAPI2}:G${noteAPI2}`);
wsAPIs.getCell(`B${noteAPI2}`).value = "📌 Recarga mínima na APIBrasil: R$ 100 (créditos pré-pagos). Recomendamos manter saldo de 1,5x o consumo mensal.";
wsAPIs.getCell(`B${noteAPI2}`).style = { font: { italic: true, color: { argb: COLORS.gray } } };

// ============================================================
// ABA 5: FUNCIONÁRIO PJ
// ============================================================
const wsFunc = wb.addWorksheet("👤 Funcionário PJ", {
  properties: { tabColor: { argb: "FF0891B2" } },
});

wsFunc.getColumn("A").width = 5;
wsFunc.getColumn("B").width = 40;
wsFunc.getColumn("C").width = 18;
wsFunc.getColumn("D").width = 18;
wsFunc.getColumn("E").width = 35;

wsFunc.mergeCells("B2:E2");
wsFunc.getCell("B2").value = "👤 Custos com Funcionário PJ";
wsFunc.getCell("B2").style = TITLE_STYLE;
wsFunc.getRow(2).height = 30;

const headerFunc = 4;
["Item", "Mensal", "Anual", "Observação"].forEach((h, i) => {
  const cell = wsFunc.getCell(headerFunc, 2 + i);
  cell.value = h;
  cell.style = HEADER_STYLE;
});
wsFunc.getRow(headerFunc).height = 30;

const funcData = [
  { item: "Pró-labore / Pagamento PJ", valor: 3000, obs: "Perfil júnior-pleno (atendimento/comercial)" },
  { item: "Bônus/Comissões (10% sobre meta)", valor: 300, obs: "Variável conforme performance" },
  { item: "Vale-refeição/alimentação (opcional PJ)", valor: 600, obs: "Sodexo, Caju, Flash" },
  { item: "Vale-transporte (opcional PJ)", valor: 250, obs: "Se não for home office" },
  { item: "Plano de saúde básico (opcional)", valor: 350, obs: "Hapvida, Notredame" },
  { item: "Equipamento (notebook, rateado em 24m)", valor: 200, obs: "R$ 4.800 / 24 meses" },
];

funcData.forEach((item, i) => {
  const row = headerFunc + 1 + i;
  wsFunc.getCell(row, 2).value = item.item;
  wsFunc.getCell(row, 3).value = item.valor;
  wsFunc.getCell(row, 4).value = { formula: `C${row}*12` };
  wsFunc.getCell(row, 5).value = item.obs;

  wsFunc.getCell(row, 3).numFmt = CURRENCY_FORMAT;
  wsFunc.getCell(row, 4).numFmt = CURRENCY_FORMAT;
  for (let col = 2; col <= 5; col++) applyBorder(wsFunc.getCell(row, col));
});

const totalFuncRow = headerFunc + 1 + funcData.length;
wsFunc.getCell(totalFuncRow, 2).value = "TOTAL FUNCIONÁRIO";
wsFunc.getCell(totalFuncRow, 3).value = { formula: `SUM(C${headerFunc + 1}:C${totalFuncRow - 1})` };
wsFunc.getCell(totalFuncRow, 4).value = { formula: `SUM(D${headerFunc + 1}:D${totalFuncRow - 1})` };
for (let col = 2; col <= 5; col++) wsFunc.getCell(totalFuncRow, col).style = TOTAL_STYLE;
wsFunc.getCell(totalFuncRow, 3).numFmt = CURRENCY_FORMAT;
wsFunc.getCell(totalFuncRow, 4).numFmt = CURRENCY_FORMAT;
wsFunc.getRow(totalFuncRow).height = 28;

const noteFuncRow = totalFuncRow + 2;
wsFunc.mergeCells(`B${noteFuncRow}:E${noteFuncRow}`);
wsFunc.getCell(`B${noteFuncRow}`).value = "💡 Como PJ, o profissional emite NF mensal. Você não paga FGTS, INSS patronal, 13º, férias proporcionais ou aviso prévio.";
wsFunc.getCell(`B${noteFuncRow}`).style = { font: { italic: true, color: { argb: COLORS.gray } } };

const noteFunc2 = noteFuncRow + 1;
wsFunc.mergeCells(`B${noteFunc2}:E${noteFunc2}`);
wsFunc.getCell(`B${noteFunc2}`).value = "⚠️ ATENÇÃO: PJ exige cuidado com pejotização. O profissional precisa ter autonomia, sem subordinação direta, ou risco de ação trabalhista.";
wsFunc.getCell(`B${noteFunc2}`).style = { font: { italic: true, color: { argb: COLORS.danger } } };

// ============================================================
// ABA 6: PROJEÇÃO FINANCEIRA (BREAK-EVEN)
// ============================================================
const wsProj = wb.addWorksheet("📈 Projeção", {
  properties: { tabColor: { argb: "FFDC2626" } },
});

wsProj.getColumn("A").width = 5;
wsProj.getColumn("B").width = 35;
wsProj.getColumn("C").width = 20;
wsProj.getColumn("D").width = 20;
wsProj.getColumn("E").width = 35;

wsProj.mergeCells("B2:E2");
wsProj.getCell("B2").value = "📈 Projeção: Quantas Consultas para o Negócio Pagar Suas Contas?";
wsProj.getCell("B2").style = TITLE_STYLE;
wsProj.getRow(2).height = 30;

// Premissas
const premissasRow = 4;
wsProj.mergeCells(`B${premissasRow}:E${premissasRow}`);
wsProj.getCell(`B${premissasRow}`).value = "📋 Premissas (cenário virtual)";
wsProj.getCell(`B${premissasRow}`).style = SUBTITLE_STYLE;

const premissas = [
  { label: "Custo fixo mensal (sem APIs)", valor: 4000, obs: "Infra + IA + Endereço + Funcionário + Contador" },
  { label: "Ticket médio por consulta", valor: 49.90, obs: "Pacote Essencial (mais vendido)" },
  { label: "Custo médio por consulta (APIs)", valor: 31.15, obs: "Custo das APIs do pacote Essencial" },
  { label: "Margem por consulta (R$)", valor: { formula: "C7-C8" }, obs: "Ticket - custo APIs" },
];

premissas.forEach((p, i) => {
  const row = premissasRow + 1 + i;
  wsProj.getCell(row, 2).value = p.label;
  wsProj.getCell(row, 3).value = p.valor;
  wsProj.getCell(row, 5).value = p.obs;
  wsProj.getCell(row, 3).numFmt = CURRENCY_FORMAT;
  wsProj.getCell(row, 3).font = { bold: true };
  for (let col = 2; col <= 5; col++) applyBorder(wsProj.getCell(row, col));
});

// Break-even calculation
const breakRow = premissasRow + 6;
wsProj.mergeCells(`B${breakRow}:E${breakRow}`);
wsProj.getCell(`B${breakRow}`).value = "🎯 Break-even (Ponto de Equilíbrio)";
wsProj.getCell(`B${breakRow}`).style = SUBTITLE_STYLE;

wsProj.getCell(`B${breakRow + 1}`).value = "Consultas necessárias por mês para cobrir custos fixos:";
wsProj.getCell(`C${breakRow + 1}`).value = { formula: `CEILING(C5/C9, 1)` };
wsProj.getCell(`C${breakRow + 1}`).font = { bold: true, color: { argb: COLORS.danger }, size: 14 };

wsProj.getCell(`B${breakRow + 2}`).value = "Faturamento bruto necessário:";
wsProj.getCell(`C${breakRow + 2}`).value = { formula: `C${breakRow + 1}*C7` };
wsProj.getCell(`C${breakRow + 2}`).numFmt = CURRENCY_FORMAT;
wsProj.getCell(`C${breakRow + 2}`).font = { bold: true, color: { argb: COLORS.danger } };

wsProj.getCell(`B${breakRow + 3}`).value = "Consultas por dia útil (22 dias):";
wsProj.getCell(`C${breakRow + 3}`).value = { formula: `CEILING(C${breakRow + 1}/22, 1)` };
wsProj.getCell(`C${breakRow + 3}`).font = { bold: true, color: { argb: COLORS.warning } };

// Cenários de venda
const cenRow = breakRow + 6;
wsProj.mergeCells(`B${cenRow}:E${cenRow}`);
wsProj.getCell(`B${cenRow}`).value = "💵 Cenários de Vendas (consultas Essencial/mês)";
wsProj.getCell(`B${cenRow}`).style = SUBTITLE_STYLE;

const cenHeader = cenRow + 1;
["Volume", "Faturamento Bruto", "Custo Total (Fixo + APIs)", "Lucro Líquido"].forEach((h, i) => {
  const cell = wsProj.getCell(cenHeader, 2 + i);
  cell.value = h;
  cell.style = HEADER_STYLE;
});
wsProj.getRow(cenHeader).height = 28;

const cenarios = [50, 100, 200, 300, 500, 1000];
cenarios.forEach((qtd, i) => {
  const row = cenHeader + 1 + i;
  wsProj.getCell(row, 2).value = `${qtd} consultas/mês`;
  wsProj.getCell(row, 3).value = { formula: `${qtd}*C7` };
  wsProj.getCell(row, 4).value = { formula: `C5+(${qtd}*C8)` };
  wsProj.getCell(row, 5).value = { formula: `C${row}-D${row}` };

  for (let col = 3; col <= 5; col++) {
    wsProj.getCell(row, col).numFmt = CURRENCY_FORMAT;
    applyBorder(wsProj.getCell(row, col));
  }
  applyBorder(wsProj.getCell(row, 2));

  // Destaque para lucro positivo/negativo
  wsProj.getCell(row, 5).font = {
    bold: true,
    color: { argb: i < 2 ? COLORS.danger : COLORS.success },
  };
});

// Salvar
const buffer = await wb.xlsx.writeBuffer();
const fs = await import("fs");
fs.writeFileSync("./custos-operacionais-consulta-placa.xlsx", buffer);
console.log("✅ Excel gerado: custos-operacionais-consulta-placa.xlsx");
