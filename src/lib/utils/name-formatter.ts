// Preposições/artigos que ficam em minúsculo no meio do nome
const LOWERCASE_WORDS = new Set([
  "da", "de", "do", "das", "dos", "di",
  "e", "a", "o", "as", "os",
  "del", "des", "van", "von", "le", "la",
]);

/**
 * Formata um nome completo em Title Case preservando artigos/preposições minúsculos.
 * Ex: "JOÃO DA SILVA" → "João da Silva"
 *     "maria de fatima" → "Maria de Fátima"
 */
export function formatarNome(nome: string): string {
  return nome
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palavra, index) => {
      if (index > 0 && LOWERCASE_WORDS.has(palavra)) return palavra;
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}

/**
 * Valida se o nome tem pelo menos nome + sobrenome (2 palavras com mínimo 2 chars cada).
 */
export function validarNomeCompleto(nome: string): string | null {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length >= 2);
  if (partes.length < 2) {
    return "Digite seu nome e sobrenome completos";
  }
  if (nome.trim().length < 5) {
    return "Nome muito curto";
  }
  return null;
}
