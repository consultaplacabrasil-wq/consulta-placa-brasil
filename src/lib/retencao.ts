/**
 * Política de retenção de dados.
 *
 * Fonte única dos prazos de guarda, para que a avaliação de legítimo interesse
 * e o relatório de impacto possam citar um só lugar — e para que alterá-los não
 * exija caçar constantes espalhadas pelo código.
 *
 * Contexto regulatório: arts. 15 e 16 da Lei nº 13.709/2018 (término do
 * tratamento e eliminação dos dados) e art. 10, § 3º, da mesma Lei, que impõe
 * manter a documentação das salvaguardas à disposição da SENATRAN e da ANPD —
 * razão pela qual a trilha de auditoria tem prazo deliberadamente mais longo
 * que o dos relatórios.
 *
 * Os valores abaixo são PADRÕES TÉCNICOS, ainda não validados juridicamente.
 * Devem ser confirmados antes do reenvio do Requerimento nº 5025/2026.
 */

const DIA_MS = 24 * 60 * 60 * 1000;

function diasFromEnv(nome: string, padrao: number): number {
  const raw = process.env[nome];
  if (!raw) return padrao;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : padrao;
}

export const RETENCAO = {
  /**
   * Por quanto tempo o relatório fica acessível ao cliente que o adquiriu.
   * 30 dias mantém o prazo que já constava do registro de cada relatório.
   */
  relatorioDias: diasFromEnv("RETENCAO_RELATORIO_DIAS", 30),

  /**
   * Validade do link público de compartilhamento. Prazo menor que o do
   * relatório: a exposição é maior, porque alcança quem não se autenticou.
   */
  linkCompartilhamentoDias: diasFromEnv("RETENCAO_LINK_DIAS", 7),

  /**
   * Guarda da trilha de auditoria. Precisa sobreviver ao processo
   * administrativo e a eventual fiscalização posterior. O padrão de 5 anos
   * acompanha o prazo geral de prescrição da ação punitiva da Administração
   * (Lei nº 9.873/1999, art. 1º) — a confirmar juridicamente.
   */
  trilhaAuditoriaDias: diasFromEnv("RETENCAO_TRILHA_DIAS", 5 * 365),
} as const;

/** Momento em que um relatório criado agora deixa de ficar acessível. */
export function calcularExpiracaoRelatorio(desde: Date = new Date()): Date {
  return new Date(desde.getTime() + RETENCAO.relatorioDias * DIA_MS);
}

/**
 * Um relatório está expirado quando passou de `expiresAt`. Registros antigos,
 * gravados sem o campo, são tratados pelo prazo corrente a partir da criação.
 */
export function relatorioExpirado(report: {
  expiresAt: Date | null;
  createdAt: Date;
}): boolean {
  const limite =
    report.expiresAt ??
    new Date(report.createdAt.getTime() + RETENCAO.relatorioDias * DIA_MS);
  return Date.now() > limite.getTime();
}

/** Corte de guarda da trilha: registros anteriores a esta data podem ser expurgados. */
export function corteTrilhaAuditoria(agora: Date = new Date()): Date {
  return new Date(agora.getTime() - RETENCAO.trilhaAuditoriaDias * DIA_MS);
}

/** Texto curto exibido ao usuário quando o prazo de acesso se esgota. */
export const MENSAGEM_RELATORIO_EXPIRADO =
  `Este relatório não está mais disponível. O prazo de acesso é de ` +
  `${RETENCAO.relatorioDias} dias a partir da consulta, por política de ` +
  `retenção de dados. Faça uma nova consulta para obter a situação atual do veículo.`;
