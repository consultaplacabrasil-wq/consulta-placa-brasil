const INFOSIMPLES_BASE_URL = "https://api.infosimples.com/api/v2/consultas";

function getToken(): string {
  const token = process.env.INFOSIMPLES_TOKEN;
  if (!token) throw new Error("INFOSIMPLES_TOKEN não configurado");
  return token;
}

interface InfoSimplesResponse {
  code: number;
  code_message: string;
  data: Record<string, unknown>[];
  data_count: number;
  errors: string[];
  site_receipts: string[];
  header: Record<string, unknown>;
}

/**
 * Faz uma consulta à API da InfoSimples
 */
async function infosimplesFetch(
  service: string,
  params: Record<string, string>
): Promise<InfoSimplesResponse> {
  const body = new URLSearchParams({
    token: getToken(),
    timeout: "300",
    ...params,
  });

  const res = await fetch(`${INFOSIMPLES_BASE_URL}/${service}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data: InfoSimplesResponse = await res.json();

  if (data.code !== 200) {
    console.error(`InfoSimples error [${data.code}]:`, data.code_message, data.errors);
    throw new Error(
      data.errors?.[0] || data.code_message || "Erro na consulta InfoSimples"
    );
  }

  return data;
}

// ============================================================
// Consulta DETRAN/DF Veículo Mobile (placa + renavam)
// Retorna: dados do veículo, débitos, gravame, infrações, restrições, roubo/furto
// ============================================================
export async function consultaVeiculoCompleta(placa: string, renavam: string) {
  const data = await infosimplesFetch("detran/df/veiculo/mobile", { placa, renavam });
  return data;
}

// ============================================================
// Consulta DETRAN/RJ Veículo (só precisa da placa)
// Retorna: dados cadastrais básicos
// ============================================================
export async function consultaVeiculoBasica(placa: string) {
  const data = await infosimplesFetch("detran/rj/veiculo", { placa });
  return data;
}

// ============================================================
// Tipos de consulta que oferecemos
// ============================================================
export type TipoConsulta = "dados_cadastrais" | "debitos_multas" | "completa";

/**
 * Retorna se o tipo de consulta precisa de RENAVAM
 */
export function consultaPrecisaRenavam(tipo: TipoConsulta): boolean {
  return tipo !== "dados_cadastrais";
}

/**
 * Mapeia o tipo de consulta para o serviço da InfoSimples e filtra os dados
 */
export async function executarConsulta(
  placa: string,
  tipo: TipoConsulta,
  renavam?: string
): Promise<{
  veiculo: Record<string, unknown>;
  debitos?: Record<string, unknown>;
  gravame?: Record<string, unknown>;
  infracoes?: Record<string, unknown>[];
  restricoes?: Record<string, unknown>;
  roubo_furto?: unknown;
  site_receipts: string[];
}> {
  const placaNormalizada = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (tipo === "dados_cadastrais") {
    // Consulta básica - DETRAN/RJ (só placa)
    const res = await consultaVeiculoBasica(placaNormalizada);
    const d = res.data[0] || {};
    return {
      veiculo: {
        placa: d.placa || placaNormalizada,
        marca: d.marca,
        modelo: d.marca, // RJ retorna marca/modelo junto
        ano_fabricacao: d.ano_fabricacao,
        ano_modelo: d.ano_modelo,
        cor: d.cor,
        combustivel: d.combustivel,
        categoria: d.categoria,
        especie: d.especie,
        chassi: d.chassi,
        potencia: d.potencia,
        cilindrada: d.cilindrada,
        capacidade: d.capacidade,
        placa_anterior: d.placa_anterior,
      },
      site_receipts: res.site_receipts,
    };
  }

  // Para débitos_multas e completa, usamos DETRAN/DF Mobile (placa + renavam)
  if (!renavam) {
    throw new Error("RENAVAM é obrigatório para esta consulta");
  }

  const renavamLimpo = renavam.replace(/\D/g, "");
  const res = await consultaVeiculoCompleta(placaNormalizada, renavamLimpo);
  const d = res.data[0] || {};

  const veiculo: Record<string, unknown> = {
    placa: d.placa || placaNormalizada,
    renavam: d.renavam || renavamLimpo,
    marca: d.marca,
    modelo: d.modelo,
    ano_fabricacao: d.ano_fabricacao,
    ano_modelo: d.ano_modelo,
    cor: d.cor,
    combustivel: d.combustivel,
    categoria: d.categoria,
    especie: d.especie,
    chassi: d.chassi,
    tipo: d.tipo,
    potencia_cilindradas: d.potencia_cilindradas,
    capacidade_passageiros: d.capacidade_passageiros,
    municipio: d.municipio,
    nacionalidade: d.nacionalidade,
    situacao_veiculo: d.situacao_veiculo,
    ultimo_licenciamento: d.ultimo_licenciamento,
  };

  const result: {
    veiculo: Record<string, unknown>;
    debitos?: Record<string, unknown>;
    gravame?: Record<string, unknown>;
    infracoes?: Record<string, unknown>[];
    restricoes?: Record<string, unknown>;
    roubo_furto?: unknown;
    site_receipts: string[];
  } = {
    veiculo,
    debitos: d.debitos as Record<string, unknown> | undefined,
    site_receipts: res.site_receipts,
  };

  if (tipo === "debitos_multas") {
    result.infracoes = d.infracoes as Record<string, unknown>[] | undefined;
  }

  if (tipo === "completa") {
    result.infracoes = d.infracoes as Record<string, unknown>[] | undefined;
    result.gravame = d.gravame as Record<string, unknown> | undefined;
    result.restricoes = d.restricoes as Record<string, unknown> | undefined;
    result.roubo_furto = d.roubo_furto;
  }

  return result;
}
