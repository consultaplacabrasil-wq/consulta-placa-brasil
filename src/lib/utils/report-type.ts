// Mapeia o serviço da consulta (apiService) para o tipo do relatório (badge).
// Mantém compatibilidade com nomes novos e legados.
export function mapReportType(apiService: string): "basic" | "complete" | "premium" {
  if (["dados", "dados_cadastrais", "gravame", "agregados-basica", "gravame-v2"].includes(apiService)) {
    return "basic";
  }
  if (["debitos", "debitos_multas", "leilao", "debitos-v4"].includes(apiService)) {
    return "complete";
  }
  return "premium";
}
