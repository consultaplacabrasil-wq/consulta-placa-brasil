import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export interface ModeloQuesito {
  nome: string;
  nota: number; // 0-10
}

export interface ModeloManutencaoItem {
  item: string;
  custo: string; // faixa, ex.: "R$ 150 a R$ 300"
  periodicidade: string; // ex.: "a cada 10.000 km"
}

export interface ModeloManutencao {
  nivel: string; // "Baixo" | "Médio" | "Alto"
  custoMedioAnual: string; // ex.: "R$ 1.500 a R$ 2.500"
  resumo: string;
  itens?: ModeloManutencaoItem[];
}

export interface ModeloFichaTecnica {
  motor?: string;
  potencia?: string;
  consumoUrbano?: string;
  consumoEstrada?: string;
  aceleracao?: string;
  velocidadeMaxima?: string;
  portaMalas?: string;
  dimensoes?: string;
  cambio?: string;
  tracao?: string;
}

export interface ModeloSimilar {
  nome: string;
  consumo?: string;
  potencia?: string;
  portaMalas?: string;
  observacao?: string;
}

export interface ModeloInsights {
  satisfacao: number; // 0-10
  quesitos: ModeloQuesito[];
  resumo: string;
  manutencao?: ModeloManutencao;
  fichaTecnica?: ModeloFichaTecnica;
  similares?: ModeloSimilar[];
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

Inclua também uma estimativa de MANUTENÇÃO do modelo (custo e facilidade):
- nivel: "Baixo", "Médio" ou "Alto"
- custoMedioAnual: faixa estimada (ex.: "R$ 1.500 a R$ 2.500")
- resumo: texto curto (200-400 caracteres) sobre peças, revisões e pontos de atenção.
- itens: lista de 4 a 6 itens comuns de manutenção, cada um com item, custo (FAIXA, ex.: "R$ 150 a R$ 300") e periodicidade. NÃO dê valores exatos, sempre faixas.

Inclua FICHA TÉCNICA aproximada do modelo (valores típicos de fábrica):
- motor, potencia, consumoUrbano, consumoEstrada, aceleracao (0-100), velocidadeMaxima, portaMalas, dimensoes, cambio, tracao.
- Use valores APROXIMADOS conhecidos do modelo. Se não tiver certeza de um campo, deixe-o como string vazia "" (NÃO invente).

Inclua COMPARATIVO com 2 a 3 modelos SIMILARES/concorrentes (similares):
- cada um com nome, consumo, potencia, portaMalas e observacao (1 frase).

IMPORTANTE: todos os números técnicos são ESTIMATIVAS/aproximados. Não invente dados que não conhece — prefira deixar vazio.

Formato de resposta (JSON puro, sem markdown, sem texto extra):
{
  "satisfacao": 8.8,
  "quesitos": [{"nome": "Conforto", "nota": 9.0}, ...todos os quesitos...],
  "resumo": "texto...",
  "manutencao": { "nivel": "Médio", "custoMedioAnual": "R$ 1.500 a R$ 2.500", "resumo": "texto...", "itens": [{"item":"Troca de óleo e filtro","custo":"R$ 150 a R$ 300","periodicidade":"a cada 10.000 km"}] },
  "fichaTecnica": { "motor": "1.0 12V Flex", "potencia": "75 cv", "consumoUrbano": "12 km/l", "consumoEstrada": "14 km/l", "aceleracao": "13s (0-100)", "velocidadeMaxima": "165 km/h", "portaMalas": "300 L", "dimensoes": "3,9m x 1,7m x 1,5m", "cambio": "Manual 5 marchas", "tracao": "Dianteira" },
  "similares": [{"nome":"Modelo X","consumo":"13 km/l","potencia":"80 cv","portaMalas":"310 L","observacao":"..."}]
}`;

export async function gerarInsightsModelo(modelo: string): Promise<ModeloInsights | null> {
  if (!process.env.DEEPSEEK_API_KEY) return null;
  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 2800,
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
