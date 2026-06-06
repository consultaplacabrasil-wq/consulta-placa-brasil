const APIBRASIL_BASE_URL = "https://gateway.apibrasil.io/api/v2";
const CONSULTA_ENDPOINT = "/consulta/veiculos/credits";

function getToken(): string {
  const token = process.env.APIBRASIL_BEARER_TOKEN;
  if (!token) throw new Error("APIBRASIL_BEARER_TOKEN não configurado");
  return token;
}

// ============================================================
// Tipos de consulta (mapeamento serviço → APIs do APIBrasil)
// ============================================================
// Cada "serviço" (apiService da consulta_types) dispara um conjunto
// de chamadas ao APIBrasil. Os valores são os parâmetros "tipo".

export const CONSULTA_APIS: Record<string, string[]> = {
  // 5 consultas novas
  dados: ["agregados-v2"],
  gravame: ["gravame"],
  debitos: ["agregados-v2", "debitos-v4", "renainf"],
  leilao: ["agregados-v2", "leilao-score", "recall"],
  premium: [
    "base-nacional-v2",
    "debitos-v4",
    "renainf",
    "gravame",
    "leilao-score",
    "roubo-furto-v2",
    "recall",
  ],

  // Compatibilidade com dados antigos (consulta_types legadas)
  dados_cadastrais: ["agregados-v2"],
  debitos_multas: ["agregados-v2", "debitos-v4", "renainf"],
  completa: [
    "base-nacional-v2",
    "debitos-v4",
    "renainf",
    "gravame",
    "leilao-score",
    "roubo-furto-v2",
    "recall",
  ],
  "agregados-basica": ["agregados-v2"],
  "debitos-v4": ["agregados-v2", "debitos-v4"],
  "gravame-v2": ["gravame"],
};

// Mapeia cada "tipo" do APIBrasil para a chave usada no relatório
const TIPO_TO_KEY: Record<string, string> = {
  "agregados-v2": "veiculo",
  "agregados-basica": "veiculo",
  "base-nacional-v2": "veiculo",
  "debitos-v4": "debitos",
  renainf: "multas",
  gravame: "gravame",
  "gravame-v2": "gravame",
  "leilao-score": "leilao",
  "roubo-furto-v2": "roubo_furto",
  recall: "recall",
  "proprietario-atual-v2": "proprietario",
  renajud: "renajud",
};

// ============================================================
// Tipo legado (mantido para não quebrar imports existentes)
// ============================================================
export type TipoConsulta = "dados_cadastrais" | "debitos_multas" | "completa";

interface ApiBrasilResponse {
  error: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ============================================================
// Fetch genérico de um tipo
// ============================================================
async function apiBrasilFetch(tipo: string, placa: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${APIBRASIL_BASE_URL}${CONSULTA_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ tipo, placa }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as ApiBrasilResponse;
    if (res.status === 402) {
      throw new Error("Saldo insuficiente na APIBrasil. Recarregue sua conta.");
    }
    throw new Error(body.message || `APIBrasil HTTP ${res.status} (${tipo})`);
  }

  const data = (await res.json()) as ApiBrasilResponse;
  if (data.error) {
    throw new Error(data.message || `Erro na consulta ${tipo}`);
  }
  return (data.data as Record<string, unknown>) || {};
}

// ============================================================
// Executar consulta — chama todas as APIs do serviço em paralelo
// ============================================================
export interface ConsultaResultado {
  veiculo: Record<string, unknown>;
  debitos?: Record<string, unknown>;
  multas?: Record<string, unknown>;
  gravame?: Record<string, unknown>;
  leilao?: Record<string, unknown>;
  roubo_furto?: Record<string, unknown>;
  recall?: Record<string, unknown>;
  proprietario?: Record<string, unknown>;
  renajud?: Record<string, unknown>;
  _erros?: string[];
}

export async function executarConsulta(
  placa: string,
  apiService: string
): Promise<ConsultaResultado> {
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  const tipos = CONSULTA_APIS[apiService] || CONSULTA_APIS["dados"];

  const settled = await Promise.allSettled(
    tipos.map((tipo) => apiBrasilFetch(tipo, placaNorm))
  );

  const result: ConsultaResultado = { veiculo: {}, _erros: [] };

  settled.forEach((res, i) => {
    const tipo = tipos[i];
    const key = TIPO_TO_KEY[tipo] || tipo;
    if (res.status === "fulfilled") {
      if (key === "veiculo") {
        result.veiculo = { ...result.veiculo, ...res.value };
      } else {
        (result as unknown as Record<string, unknown>)[key] = res.value;
      }
    } else {
      result._erros?.push(`${tipo}: ${res.reason?.message || "falhou"}`);
    }
  });

  // Garante ao menos a placa nos dados do veículo
  if (!result.veiculo.placa) result.veiculo.placa = placaNorm;

  return result;
}

// ============================================================
// Consulta GRÁTIS (preview na primeira dobra) — "Agregados Simples"
// ============================================================
// Usa o tipo mais barato (R$0,02). Configurável por env para trocar
// facilmente o produto sem mexer no código.
const TIPO_GRATIS = process.env.APIBRASIL_TIPO_GRATIS || "agregados-simples";

export interface PreviewVeiculo {
  placa: string;
  marcaModelo: string | null;
  anoFabricacao: string | null;
  anoModelo: string | null;
  cor: string | null;
  chassi: string | null; // mascarado
  combustivel: string | null;
}

// Converte para string só valores primitivos (objetos viram null, evita "[object Object]")
function str(v: unknown): string | null {
  if (v === null || v === undefined || typeof v === "object") return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

// Primeiro valor não-vazio
function pick(...vals: unknown[]): string | null {
  for (const v of vals) {
    const s = str(v);
    if (s) return s;
  }
  return null;
}

// Trata um campo que pode ser objeto aninhado (Agregados Simples) ou plano (v2)
function asObj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
}

// Mostra só os últimos 7 caracteres do chassi (ex.: **********0000302)
function maskChassi(chassi: unknown): string | null {
  const c = str(chassi);
  if (!c) return null;
  if (c.length <= 7) return c;
  const visivel = c.slice(-7);
  return "*".repeat(Math.max(3, c.length - 7)) + visivel;
}

export async function consultaGratis(placa: string): Promise<PreviewVeiculo> {
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  const d = await apiBrasilFetch(TIPO_GRATIS, placaNorm);

  // Agregados Simples: marca é objeto { fabricante, modelo }, ano é { fabricacao, modelo }
  // Agregados Própria (v2): marca/modelo/anoFabricacao/anoModelo são campos planos
  const marcaObj = asObj(d.marca);
  const anoObj = asObj(d.ano);

  const marcaModelo =
    pick(d.marcaModelo, marcaObj.modelo, marcaObj.fabricante) ||
    [str(d.marca), str(d.modelo)].filter(Boolean).join("/") ||
    null;

  return {
    placa: placaNorm,
    marcaModelo,
    anoFabricacao: pick(anoObj.fabricacao, d.anoFabricacao),
    anoModelo: pick(anoObj.modelo, d.anoModelo),
    cor: pick(d.cor, d.corVeiculo),
    chassi: maskChassi(d.chassi),
    combustivel: pick(d.combustivel, d.codigoCombustivel),
  };
}

// ============================================================
// Helper legado
// ============================================================
export function consultaPrecisaRenavam(): boolean {
  return false;
}
