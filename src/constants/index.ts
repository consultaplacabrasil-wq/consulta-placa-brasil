export const APP_NAME = "Consulta Placa Brasil";
export const APP_DESCRIPTION =
  "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais.";
export const APP_URL = "https://consultaplacabrasil.com.br";

export const REPORT_PRICES = {
  basic: 0,
  complete: 24.9,
  premium: 39.9,
} as const;


export const REPORT_FEATURES = {
  basic: [
    "Dados cadastrais",
    "Situação do veículo",
    "Tipo de veículo",
    "UF de registro",
    "Indicador de sinistro",
    "Indicador de leilão",
  ],
  complete: [
    "Tudo do Básico",
    "Histórico de proprietários",
    "Detalhes de sinistro",
    "Histórico de leilão",
    "Registro de roubo/furto",
    "Restrições administrativas",
    "Gravames/financiamento",
    "Débitos e multas",
    "Recall pendente",
    "Quilometragem",
    "Tabela FIPE",
  ],
  premium: [
    "Tudo do Completo",
    "Score de risco (0-100)",
    "Análise de desvalorização",
    "Custo estimado de manutenção",
    "Comparativo de mercado",
    "Selo de verificação QR",
  ],
} as const;

export const COLORS = {
  primary: "#FF4D30",
  primaryDark: "#E8432A",
  primaryLight: "#FFF5F3",
  secondary: "#0F172A",
  accent: "#FF4D30",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#E5E7EB",
  background: "#FFFFFF",
  backgroundAlt: "#F8FAFC",
  surface: "#FFFFFF",
} as const;

// Placa antiga: AAA0000 ou AAA-0000 → normalizada para AAA0000
export const PLATE_REGEX_OLD = /^[A-Z]{3}[0-9]{4}$/;
// Placa Mercosul: AAA0A00
export const PLATE_REGEX_MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

export function formatPlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function validatePlate(plate: string): boolean {
  const formatted = formatPlate(plate);
  return PLATE_REGEX_OLD.test(formatted) || PLATE_REGEX_MERCOSUL.test(formatted);
}

export const PLATE_ERROR_MESSAGE = "Placa inválida. Verifique o formato informado.";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
