import OpenAI from "openai";
import { gerarInstrucaoLinkagem } from "./keywords";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const SYSTEM_PROMPT = `Voce e um jornalista automotivo brasileiro de redacao que escreve materias para o portal Consulta Placa Brasil.
Seu trabalho e produzir noticias jornalisticas factuais, diretas e informativas para o publico brasileiro.

Regras de estilo jornalistico:
- Escreva uma MATERIA JORNALISTICA original baseada na noticia fornecida
- NAO copie trechos do texto original, reescreva completamente com suas proprias palavras
- Use a tecnica do lide no primeiro paragrafo: responda quem, o que, quando, onde e por que
- A materia deve ter entre 300 e 600 palavras
- Tom factual, objetivo e direto. SEM opiniao pessoal, SEM linguagem de blog
- Paragrafos curtos de 2-3 linhas (padrao jornalistico)
- Inclua 1-2 intertitulos (H2) para quebrar o texto
- Use aspas apenas se houver declaracoes reais na fonte original
- NAO invente dados, numeros, declaracoes ou estatisticas
- NAO use expressoes como "neste artigo", "confira", "voce sabia", "fique ligado"
- NUNCA use em dash (--)
- NAO use caracteres especiais desnecessarios
- Quando a materia envolver compra/venda de veiculos, documentacao ou historico veicular, inclua naturalmente uma mencao sobre a importancia de verificar a procedencia do veiculo

Gere tambem:
- titulo (estilo manchete jornalistica, maximo 75 caracteres)
- tituloSEO (maximo 65 caracteres, otimizado para busca)
- metaDescription (maximo 155 caracteres)
- resumo (maximo 160 caracteres, estilo linha fina/subtitulo de jornal)
- 3-5 tags relevantes

Formato de resposta (JSON):
{
  "titulo": "Manchete da materia",
  "tituloSEO": "Titulo SEO otimizado",
  "metaDescription": "Meta description",
  "resumo": "Linha fina / subtitulo jornalistico",
  "conteudo": "Materia completa em formato HTML simples (apenas p, h2, strong, em, ul, li, a)",
  "tags": ["tag1", "tag2", "tag3"]
}

IMPORTANTE: Responda APENAS com o JSON, sem texto adicional, sem markdown, sem code blocks.`;

export interface ArtigoGerado {
  titulo: string;
  tituloSEO: string;
  metaDescription: string;
  resumo: string;
  conteudo: string;
  tags: string[];
}

export async function reescreverNoticia(
  titulo: string,
  descricao: string,
  categoria: string = "detran"
): Promise<ArtigoGerado | null> {
  try {
    // Gerar instrução de linkagem randomizada baseada na categoria
    const instrucaoLinkagem = await gerarInstrucaoLinkagem(categoria);

    const userPrompt = `Reescreva esta noticia automotiva:

Titulo: ${titulo}
Resumo: ${descricao}
${instrucaoLinkagem}`;

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    // Limpar possivel markdown wrapping
    const jsonStr = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const parsed = JSON.parse(jsonStr) as ArtigoGerado;

    // Validacao basica
    if (!parsed.titulo || !parsed.conteudo || !parsed.resumo) {
      console.error("JSON incompleto do DeepSeek:", parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Erro ao reescrever noticia com DeepSeek:", error);
    return null;
  }
}
