/**
 * Finalidade declarada pelo solicitante no momento da consulta.
 *
 * Salvaguarda exigida pela Nota Técnica SENATRAN nº 554/2026 (item 3.2.2.5),
 * no processo SEI 50000.029673/2026-67. Vive em módulo próprio, sem qualquer
 * dependência de servidor, para poder ser importada também pelo formulário
 * (client component) sem arrastar o banco para o bundle do cliente.
 */

export const CONSULTA_PURPOSES = ["compra", "venda", "negociacao"] as const;

export type ConsultaPurpose = (typeof CONSULTA_PURPOSES)[number];

/**
 * As três opções cobrem a finalidade aprovada pela SENATRAN — "apoio à compra
 * e venda de veículo". Não existe opção genérica de propósito: a Nota Técnica
 * (item 3.2.1.3) condiciona a legitimidade do tratamento à existência de
 * interesse real e atual na aquisição ou alienação do veículo consultado.
 */
export const CONSULTA_PURPOSE_LABELS: Record<ConsultaPurpose, string> = {
  compra: "Tenho interesse em comprar este veículo",
  venda: "Sou proprietário e pretendo vender este veículo",
  negociacao: "Estou em negociação envolvendo este veículo (troca ou avaliação)",
};

export function isConsultaPurpose(value: unknown): value is ConsultaPurpose {
  return (
    typeof value === "string" &&
    (CONSULTA_PURPOSES as readonly string[]).includes(value)
  );
}
