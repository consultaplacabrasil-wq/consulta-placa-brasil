import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, gte } from "drizzle-orm";

// Stopwords em português — palavras sem valor semântico
const STOPWORDS = new Set([
  "com", "por", "para", "que", "dos", "das", "nos", "nas",
  "uma", "uns", "umas", "ele", "ela", "eles", "elas",
  "seu", "sua", "seus", "suas", "este", "esta", "esse",
  "essa", "isso", "aqui", "ali", "mais", "muito", "como",
  "sobre", "entre", "desde", "apos", "antes", "depois",
  "pode", "tem", "sao", "foi", "sera", "ter", "ser",
  "novo", "nova", "novos", "novas", "outro", "outra",
  "tambem", "ainda", "mesmo", "toda", "todo", "todos",
]);

function extrairRaiz(palavra: string): string {
  // Stemming simplificado para português
  return palavra
    .replace(/(acao|acoes|amento|amentos|encia|encias|mente)$/, "")
    .replace(/(ando|endo|indo|ido|ida|idos|idas)$/, "")
    .replace(/(avel|ivel|oso|osa|osos|osas)$/, "")
    .replace(/(ador|adores|adora|adoras)$/, "")
    .replace(/(eiro|eira|eiros|eiras)$/, "")
    .replace(/(agem|agens)$/, "")
    .replace(/(oes|aes|aos)$/, "")
    .replace(/(es|is|os|as|ns|a|o)$/, "");
}

function normalizar(texto: string): string[] {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-/]/g, " ") // "Detran-DF" → "Detran DF"
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((p) => p.length > 2)
    .filter((p) => !STOPWORDS.has(p))
    .map(extrairRaiz)
    .filter((p) => p.length > 2);
}

function similaridade(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);

  // Interseção
  const comuns = [...setA].filter((p) => setB.has(p)).length;

  // Jaccard: interseção / união
  const uniao = new Set([...setA, ...setB]).size;
  return comuns / uniao;
}

export async function isDuplicata(
  url: string,
  titulo: string
): Promise<boolean> {
  // Camada 1: URL exata
  const porUrl = await db
    .select({ id: noticias.id })
    .from(noticias)
    .where(eq(noticias.origemUrlOriginal, url))
    .limit(1);

  if (porUrl.length > 0) return true;

  // Camada 2: Similaridade de titulo (ultimos 7 dias)
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const recentes = await db
    .select({ titulo: noticias.titulo })
    .from(noticias)
    .where(gte(noticias.createdAt, seteDiasAtras));

  const palavrasNovo = normalizar(titulo);

  for (const existente of recentes) {
    const palavrasExistente = normalizar(existente.titulo);
    if (similaridade(palavrasNovo, palavrasExistente) > 0.3) {
      return true;
    }
  }

  return false;
}
