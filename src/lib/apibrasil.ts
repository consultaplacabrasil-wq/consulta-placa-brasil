const APIBRASIL_BASE_URL = "https://gateway.apibrasil.io/api/v2";
const CONSULTA_ENDPOINT = "/consulta/veiculos/credits";

function getToken(): string {
  const token = process.env.APIBRASIL_BEARER_TOKEN;
  if (!token) throw new Error("APIBRASIL_BEARER_TOKEN não configurado");
  return token;
}

// ============================================================
// Tipos
// ============================================================

export type TipoConsulta = "dados_cadastrais" | "debitos_multas" | "completa";

interface ApiBrasilResponse {
  error: boolean;
  message: string;
  balance?: string;
  tax?: string;
  valor_consulta?: number;
  data?: Record<string, unknown>;
}

// Map our consultation types to APIBrasil "tipo" parameter
const TIPO_MAP: Record<string, string> = {
  "agregados-basica": "agregados-basica",
  "debitos-v4": "debitos-v4",
  "gravame-v2": "gravame-v2",
};

// ============================================================
// Fetch genérico
// ============================================================

async function apiBrasilFetch(
  tipo: string,
  placa: string
): Promise<ApiBrasilResponse> {
  const res = await fetch(`${APIBRASIL_BASE_URL}${CONSULTA_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ tipo, placa }),
  });

  const data: ApiBrasilResponse = await res.json();

  if (data.error) {
    console.error(`APIBrasil error [${tipo}]:`, data.message);
    throw new Error(data.message || "Erro na consulta");
  }

  return data;
}

// ============================================================
// Consultas individuais
// ============================================================

export async function consultaDadosCadastrais(placa: string) {
  return apiBrasilFetch("agregados-basica", placa);
}

export async function consultaDebitos(placa: string) {
  return apiBrasilFetch("debitos-v4", placa);
}

export async function consultaGravame(placa: string) {
  return apiBrasilFetch("gravame-v2", placa);
}

// ============================================================
// Helpers
// ============================================================

export function consultaPrecisaRenavam(): boolean {
  return false; // APIBrasil só precisa da placa
}

// ============================================================
// Executar consulta principal
// ============================================================

export async function executarConsulta(
  placa: string,
  tipo: TipoConsulta
): Promise<{
  veiculo: Record<string, unknown>;
  debitos?: Record<string, unknown>;
  gravame?: Record<string, unknown>;
}> {
  const placaNormalizada = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (tipo === "dados_cadastrais") {
    const res = await consultaDadosCadastrais(placaNormalizada);
    return {
      veiculo: (res.data as Record<string, unknown>) || {},
    };
  }

  if (tipo === "debitos_multas") {
    // Busca dados + débitos em paralelo
    const [dadosRes, debitosRes] = await Promise.allSettled([
      consultaDadosCadastrais(placaNormalizada),
      consultaDebitos(placaNormalizada),
    ]);

    const veiculo =
      dadosRes.status === "fulfilled"
        ? ((dadosRes.value.data as Record<string, unknown>) || {})
        : { placa: placaNormalizada };

    const debitos =
      debitosRes.status === "fulfilled"
        ? ((debitosRes.value.data as Record<string, unknown>) || {})
        : undefined;

    return { veiculo, debitos };
  }

  // tipo === "completa" → dados + débitos + gravame
  const [dadosRes, debitosRes, gravameRes] = await Promise.allSettled([
    consultaDadosCadastrais(placaNormalizada),
    consultaDebitos(placaNormalizada),
    consultaGravame(placaNormalizada),
  ]);

  const veiculo =
    dadosRes.status === "fulfilled"
      ? ((dadosRes.value.data as Record<string, unknown>) || {})
      : { placa: placaNormalizada };

  const debitos =
    debitosRes.status === "fulfilled"
      ? ((debitosRes.value.data as Record<string, unknown>) || {})
      : undefined;

  const gravame =
    gravameRes.status === "fulfilled"
      ? ((gravameRes.value.data as Record<string, unknown>) || {})
      : undefined;

  return { veiculo, debitos, gravame };
}
