import { Metadata } from "next";
import TermosPage from "../termos/page";
import PrivacidadePage from "../privacidade/page";

// Página que reúne, num único endereço, a Política de Privacidade e os Termos
// de Uso (exigência de credenciamento — "informar um único endereço que contenha
// ambos"). Reaproveita as páginas existentes como fonte única de verdade, então
// qualquer atualização em /termos ou /privacidade reflete aqui automaticamente.
// robots: noindex para não gerar conteúdo duplicado com /termos e /privacidade.
export const metadata: Metadata = {
  title: "Política de Privacidade e Termos de Uso - Consulta Placa Brasil",
  description:
    "Política de Privacidade e Termos de Uso da Consulta Placa Brasil reunidos em um único endereço.",
  alternates: { canonical: "https://consultaplacabrasil.com/politica-e-termos" },
  robots: "noindex, follow",
};

export default async function PoliticaETermosPage() {
  return (
    <div className="flex flex-col">
      {/* Termos de Uso */}
      {await TermosPage()}
      {/* Política de Privacidade */}
      {await PrivacidadePage()}
    </div>
  );
}
