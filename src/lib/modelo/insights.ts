import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export interface ModeloQuesito {
  nome: string;
  nota: number; // 0-10
}

export interface ModeloManutencao {
  nivel: string; // "Baixo" | "Médio" | "Alto"
  custoMedioAnual: string; // ex.: "R$ 1.500 a R$ 2.500"
  resumo: string;
}

export interface ModeloInsights {
  satisfacao: number; // 0-10
  quesitos: ModeloQuesito[];
  resumo: string;
  manutencao?: ModeloManutencao;
}

const QUESITOS = [
  "Conforto",
  "Consumo na cidade",
  "Consumo na estrada",
  "Manutenção",
  "Performance",
  "Porta-malas",
  "Tecnologia",
];

const SYSTEM_PROMPT = `Você é um especialista automotivo brasileiro. A partir do nome de um modelo de veículo, produza uma avaliação AGREGADA do MODELO (não de um veículo específico), no estilo "opinião do dono", baseada no conhecimento geral de mercado sobre esse modelo no Brasil.

Regras:
- Avalie o MODELO em geral, não o exemplar consultado.
- Dê notas de 0 a 10 (com uma casa decimal) para cada quesito.
- O resumo deve ter entre 300 e 600 caracteres, citando pontos fortes e pontos de atenção do modelo, em tom factual e equilibrado.
- NÃO invente defeitos específicos, recalls ou números de vendas. Fale de características gerais do modelo.
- Responda em português do Brasil.

Quesitos obrigatórios (use exatamente estes nomes): ${QUESITOS.join(", ")}.

Inclua também uma estimativa de MANUTENÇÃO do modelo (custo e facilidade), baseada no conhecimento geral de mercado:
- nivel: "Baixo", "Médio" ou "Alto"
- custoMedioAnual: uma faixa estimada em reais (ex.: "R$ 1.500 a R$ 2.500"), considerando uso normal
- resumo: texto curto (200-400 caracteres) sobre custo de peças, disponibilidade, revisões e pontos de atenção de manutenção. Deixe claro que é uma ESTIMATIVA do modelo.

Formato de resposta (JSON puro, sem markdown, sem texto extra):
{
  "satisfacao": 8.8,
  "quesitos": [{"nome": "Conforto", "nota": 9.0}, ...todos os quesitos...],
  "resumo": "texto...",
  "manutencao": { "nivel": "Médio", "custoMedioAnual": "R$ 1.500 a R$ 2.500", "resumo": "texto..." }
}`;

export async function gerarInsightsModelo(modelo: string): Promise<ModeloInsights | null> {
  if (!process.env.DEEPSEEK_API_KEY) return null;
  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1200,
      temperature: 0.6,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Modelo do veículo: ${modelo}` },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content || response.choices[0]?.finish_reason === "length") return null;

    const jsonStr = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(jsonStr) as ModeloInsights;

    if (!parsed.resumo || !Array.isArray(parsed.quesitos) || parsed.quesitos.length === 0) {
      return null;
    }

    // Normaliza notas para o intervalo 0-10
    parsed.satisfacao = Math.max(0, Math.min(10, Number(parsed.satisfacao) || 0));
    parsed.quesitos = parsed.quesitos
      .filter((q) => q && q.nome)
      .map((q) => ({ nome: String(q.nome), nota: Math.max(0, Math.min(10, Number(q.nota) || 0)) }));

    return parsed;
  } catch (error) {
    console.error("Erro ao gerar insights do modelo:", error);
    return null;
  }
}
