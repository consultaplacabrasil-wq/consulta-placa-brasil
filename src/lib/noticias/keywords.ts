// Palavras-chave estratégicas para linkagem interna
// Extraídas de análise de concorrente (alto volume de busca, não-navegacionais)
// Agrupadas por tema para facilitar a seleção contextual

interface KeywordGroup {
  tema: string;
  keywords: { texto: string; url: string }[];
}

const KEYWORD_GROUPS: KeywordGroup[] = [
  {
    tema: "consulta-placa",
    keywords: [
      { texto: "consulta placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar placa de carro", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta placa veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar veículo pela placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta de placa", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisar placa de carro", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisar placa", url: "https://consultaplacabrasil.com/" },
      { texto: "buscar placa", url: "https://consultaplacabrasil.com/" },
      { texto: "busca placa", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisa de placa", url: "https://consultaplacabrasil.com/" },
      { texto: "verificar placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta pela placa", url: "https://consultaplacabrasil.com/" },
    ],
  },
  {
    tema: "situacao-veiculo",
    keywords: [
      { texto: "consulta situação veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "situação do veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar situação do veículo pela placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta veículo por placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar veículo por placa", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisa de veículo pela placa", url: "https://consultaplacabrasil.com/" },
      { texto: "verificar situação do veículo", url: "https://consultaplacabrasil.com/" },
    ],
  },
  {
    tema: "compra-venda",
    keywords: [
      { texto: "consultar placa de veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "verificar placa de carro", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisa de carro por placa", url: "https://consultaplacabrasil.com/" },
      { texto: "buscar veículo pela placa", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta de veículo por placa", url: "https://consultaplacabrasil.com/" },
      { texto: "verificar procedência do veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "histórico do veículo pela placa", url: "https://consultaplacabrasil.com/" },
    ],
  },
  {
    tema: "documentacao",
    keywords: [
      { texto: "consultar renavam pela placa", url: "https://consultaplacabrasil.com/ferramentas/gerador-renavam" },
      { texto: "consulta chassi", url: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi" },
      { texto: "consulta chassi por placa", url: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi" },
      { texto: "verificar documentos do veículo", url: "https://consultaplacabrasil.com/ferramentas/verificador-documentos" },
      { texto: "renavam pela placa", url: "https://consultaplacabrasil.com/ferramentas/gerador-renavam" },
    ],
  },
  {
    tema: "fipe",
    keywords: [
      { texto: "consulta fipe pela placa", url: "https://consultaplacabrasil.com/ferramentas/consulta-fipe" },
      { texto: "tabela fipe por placa", url: "https://consultaplacabrasil.com/ferramentas/consulta-fipe" },
      { texto: "tabela fipe placa", url: "https://consultaplacabrasil.com/ferramentas/consulta-fipe" },
      { texto: "valor do veículo pela placa", url: "https://consultaplacabrasil.com/ferramentas/consulta-fipe" },
    ],
  },
  {
    tema: "recall",
    keywords: [
      { texto: "consulta recall", url: "https://consultaplacabrasil.com/ferramentas/consulta-recall" },
      { texto: "recall de veículos", url: "https://consultaplacabrasil.com/ferramentas/consulta-recall" },
      { texto: "consultar recall pela placa", url: "https://consultaplacabrasil.com/ferramentas/consulta-recall" },
      { texto: "verificar recall", url: "https://consultaplacabrasil.com/ferramentas/consulta-recall" },
    ],
  },
  {
    tema: "moto",
    keywords: [
      { texto: "consulta placa moto", url: "https://consultaplacabrasil.com/" },
      { texto: "pesquisa por placa de moto", url: "https://consultaplacabrasil.com/" },
      { texto: "consulta de placa de moto", url: "https://consultaplacabrasil.com/" },
      { texto: "placa de moto", url: "https://consultaplacabrasil.com/" },
    ],
  },
  {
    tema: "multas-ipva",
    keywords: [
      { texto: "calculadora de multas", url: "https://consultaplacabrasil.com/ferramentas/calculadora-multas" },
      { texto: "calculadora IPVA", url: "https://consultaplacabrasil.com/ferramentas/calculadora-ipva" },
      { texto: "consultar débitos do veículo", url: "https://consultaplacabrasil.com/" },
      { texto: "consultar multas pela placa", url: "https://consultaplacabrasil.com/" },
    ],
  },
  {
    tema: "mercosul",
    keywords: [
      { texto: "consulta placa Mercosul", url: "https://consultaplacabrasil.com/ferramentas/conversor-placa" },
      { texto: "consultar placa Mercosul", url: "https://consultaplacabrasil.com/ferramentas/conversor-placa" },
      { texto: "placa Mercosul", url: "https://consultaplacabrasil.com/ferramentas/conversor-placa" },
      { texto: "identificar placa Mercosul", url: "https://consultaplacabrasil.com/ferramentas/identificador-placa" },
    ],
  },
];

// Mapeamento de categoria para temas mais relevantes
const CATEGORIA_TEMAS: Record<string, string[]> = {
  detran: ["consulta-placa", "documentacao", "situacao-veiculo", "multas-ipva", "mercosul"],
  recalls: ["recall", "consulta-placa", "situacao-veiculo", "compra-venda"],
  "mercado-usados": ["compra-venda", "consulta-placa", "fipe", "situacao-veiculo", "documentacao"],
  legislacao: ["multas-ipva", "consulta-placa", "documentacao", "situacao-veiculo"],
  multas: ["multas-ipva", "consulta-placa", "situacao-veiculo", "documentacao"],
};

import { db } from "@/lib/db";
import { linksInternos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Busca links customizados do banco (gerenciados pelo admin).
 * Cada link pode ter múltiplos textos âncora e um peso (prioridade).
 */
async function buscarLinksCustomizados(): Promise<
  { texto: string; url: string }[]
> {
  try {
    const links = await db
      .select()
      .from(linksInternos)
      .where(eq(linksInternos.ativo, true));

    const resultado: { texto: string; url: string }[] = [];
    for (const link of links) {
      // Repetir conforme o peso (peso 3 = 3x mais chance)
      const peso = Math.min(link.peso || 1, 5);
      for (let i = 0; i < peso; i++) {
        for (const anchor of link.anchors || []) {
          resultado.push({ texto: anchor, url: link.url });
        }
      }
    }
    return resultado;
  } catch {
    return [];
  }
}

/**
 * Seleciona 1-2 keywords aleatórias relevantes para a categoria da notícia.
 * Combina keywords hardcoded + links customizados do banco.
 * Nunca retorna as mesmas keywords para evitar padrões de spam.
 */
export async function selecionarKeywords(
  categoria: string,
  quantidade: number = 2
): Promise<{ texto: string; url: string }[]> {
  const temasRelevantes = CATEGORIA_TEMAS[categoria] || ["consulta-placa", "compra-venda"];

  // Coletar keywords dos temas relevantes (hardcoded)
  const keywordsDisponiveis: { texto: string; url: string }[] = [];
  for (const tema of temasRelevantes) {
    const grupo = KEYWORD_GROUPS.find((g) => g.tema === tema);
    if (grupo) {
      keywordsDisponiveis.push(...grupo.keywords);
    }
  }

  // Adicionar links customizados do banco
  const linksCustom = await buscarLinksCustomizados();
  keywordsDisponiveis.push(...linksCustom);

  // Embaralhar
  const shuffled = shuffle(keywordsDisponiveis);

  // Retornar quantidade pedida, garantindo URLs diferentes
  const selecionadas: { texto: string; url: string }[] = [];
  const urlsUsadas = new Set<string>();

  for (const kw of shuffled) {
    if (selecionadas.length >= quantidade) break;
    // Evitar dois links para a mesma URL
    if (urlsUsadas.has(kw.url) && selecionadas.length >= 1) continue;
    selecionadas.push(kw);
    urlsUsadas.add(kw.url);
  }

  return selecionadas;
}

/**
 * Gera a instrução de linkagem para o prompt da IA.
 * Cada execução produz instruções diferentes (randomizadas).
 * Combina links hardcoded + links gerenciados pelo admin.
 */
export async function gerarInstrucaoLinkagem(categoria: string): Promise<string> {
  const keywords = await selecionarKeywords(categoria, 2);

  if (keywords.length === 0) return "";

  const linksInstrucao = keywords
    .map(
      (kw, i) =>
        `${i + 1}. Use o texto ancora "${kw.texto}" para linkar para ${kw.url}`
    )
    .join("\n");

  return `
LINKAGEM INTERNA (OBRIGATORIO):
Insira naturalmente no corpo da materia 1 ou 2 links internos usando texto ancora.
Os links devem estar contextualizados dentro de uma frase, nao isolados.
NAO coloque os links como lista ou no final de um paragrafo sozinhos.
Integre-os ao fluxo natural do texto.

Links para inserir nesta materia:
${linksInstrucao}

Formato HTML do link: <a href="URL">texto ancora</a>

Exemplo de boa integracao:
"Antes de fechar negocio, especialistas recomendam <a href="https://consultaplacabrasil.com/">consultar placa</a> do veiculo para verificar pendencias."

NAO use todos os links se nao fizerem sentido no contexto. Melhor 1 link bem integrado do que 2 forcados.`;
}
