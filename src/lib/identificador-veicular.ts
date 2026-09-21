/**
 * Mitigação dos identificadores unívocos do veículo — chassi e número do motor.
 *
 * Exigida pela Nota Técnica SENATRAN nº 554/2026, item 4.1.4.3, no processo SEI
 * 50000.029673/2026-67: a devolução integral desses atributos a partir da simples
 * digitação de uma placa, em plataforma aberta ao público, "cria risco de
 * adulteração e de clonagem de identidade veicular não exigido pela finalidade".
 *
 * A Nota Técnica admite duas medidas, e aqui adotamos as duas:
 *
 *  a) mascaramento parcial na exibição ao usuário final (este módulo);
 *  b) mecanismo de conferência de correspondência — o usuário informa o número
 *     gravado no veículo e recebe apenas "confere" ou "diverge", sem que o
 *     número oficial trafegue até o navegador.
 *
 * O item 4.1.4.3 ressalva expressamente que os atributos permanecem no grupo de
 * informação "para fins de conferência interna": o dado continua sendo recebido
 * e armazenado, o que muda é a exibição.
 *
 * O RENAVAM não entra aqui: o item 4.1.3.1 o classifica entre os atributos
 * indispensáveis à finalidade declarada, sem recomendação de ajuste.
 */

const MASK_CHAR = "*";

/** Remove separadores e normaliza para comparação e mascaramento. */
export function normalizarIdentificador(valor: string): string {
  return (valor || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

/**
 * Mantém o WMI (3 primeiros dígitos, que identificam a montadora) e os 4
 * últimos, que são os gravados nos vidros e permitem a conferência física.
 * O miolo — a parte que individualiza o veículo — é ocultado.
 */
export function mascararChassi(chassi: string): string {
  const c = normalizarIdentificador(chassi);
  if (!c) return "";
  if (c.length <= 6) return MASK_CHAR.repeat(c.length);
  return c.slice(0, 3) + MASK_CHAR.repeat(c.length - 7) + c.slice(-4);
}

/**
 * O número de motor não tem estrutura fixa, então preserva-se apenas o final,
 * suficiente para confronto com a gravação no bloco.
 */
export function mascararMotor(numero: string): string {
  const m = normalizarIdentificador(numero);
  if (!m) return "";
  if (m.length <= 4) return MASK_CHAR.repeat(m.length);
  return MASK_CHAR.repeat(m.length - 4) + m.slice(-4);
}

export type ResultadoConferencia = "confere" | "diverge";

/**
 * Compara o número informado pelo usuário com o oficial. Roda exclusivamente no
 * servidor: o valor oficial nunca é enviado ao cliente para comparação local.
 */
export function conferirIdentificador(
  informado: string,
  oficial: string
): ResultadoConferencia | null {
  const a = normalizarIdentificador(informado);
  const b = normalizarIdentificador(oficial);
  if (!a || !b) return null;
  return a === b ? "confere" : "diverge";
}
