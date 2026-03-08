export const APP_NAME = "Consulta Placa Brasil";
export const APP_DESCRIPTION =
  "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais.";
export const APP_URL = "https://consultaplacabrasil.com.br";

export const REPORT_PRICES = {
  basic: 0,
  complete: 24.9,
  premium: 39.9,
} as const;

export const CREDIT_PACKAGES = [
  { credits: 5, price: 99.9, unitPrice: 19.98 },
  { credits: 10, price: 179.9, unitPrice: 17.99 },
  { credits: 25, price: 399.9, unitPrice: 15.99 },
  { credits: 50, price: 699.9, unitPrice: 13.99 },
  { credits: 100, price: 1199.9, unitPrice: 11.99 },
] as const;

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
  primaryLight: "#FFF0ED",
  secondary: "#1A1A2E",
  accent: "#FF8C00",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#1A1A2E",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#E5E7EB",
  background: "#FFFFFF",
  backgroundAlt: "#F9FAFB",
  surface: "#FFFFFF",
} as const;

export const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export function formatPlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function validatePlate(plate: string): boolean {
  return PLATE_REGEX.test(formatPlate(plate));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
