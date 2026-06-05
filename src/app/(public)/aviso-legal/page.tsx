import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Aviso Legal (Disclaimer) da Consulta Placa Brasil. Caráter informativo dos relatórios, limitação de responsabilidade e isenções sobre os dados veiculares.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("aviso-legal");
  return {
    title: page?.seoTitle || "Aviso Legal - Consulta Placa Brasil",
    description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/aviso-legal" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Aviso Legal",
      description: page?.ogDescription || defaultDesc,
      url: page?.ogUrl || "https://consultaplacabrasil.com/aviso-legal",
    },
  };
}

const defaultContent = `
<p>Este Aviso Legal aplica-se a todos os relatórios e informações fornecidos pela plataforma <strong>Consulta Placa Brasil</strong> (CONSULTA PLACA BRASIL LTDA, CNPJ 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277).</p>

<h2>1. Caráter Informativo</h2>
<p>Todas as informações e relatórios têm <strong>caráter exclusivamente informativo</strong>. São compilados a partir de fontes públicas, privadas e parceiras, e refletem os dados disponíveis no momento da consulta.</p>

<h2>2. Ausência de Garantia</h2>
<p>Não garantimos a exatidão, atualidade, completude ou disponibilidade ininterrupta das informações. Podem ocorrer divergências, atrasos ou inconsistências decorrentes das fontes de dados.</p>

<h2>3. Não Substituição de Documentos Oficiais</h2>
<p>O relatório <strong>não substitui</strong> a vistoria cautelar, o laudo de vistoria, documentos oficiais dos órgãos de trânsito (Detran/Senatran) ou qualquer perícia técnica.</p>

<h2>4. Decisões do Usuário</h2>
<p>Qualquer decisão tomada com base nas informações (compra, venda, financiamento, seguro, etc.) é de exclusiva responsabilidade do usuário. A plataforma não se responsabiliza por prejuízos decorrentes do uso das informações.</p>

<h2>5. Sem Vínculo com Órgãos Públicos</h2>
<p>A Consulta Placa Brasil é uma empresa privada e <strong>não possui vínculo</strong> com o Detran, Senatran, Denatran ou qualquer órgão governamental.</p>

<h2>6. Uso Responsável</h2>
<p>É vedado utilizar as informações para identificação, localização, perseguição, assédio ou qualquer ato ilícito contra terceiros, sob pena de bloqueio da conta e comunicação às autoridades.</p>

<h2>7. Limitação de Responsabilidade</h2>
<p>Na máxima extensão permitida pela lei, a plataforma não será responsável por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso dos relatórios.</p>

<h2>8. Contato</h2>
<p>Dúvidas: contato@consultaplacabrasil.com</p>
`;

export default async function AvisoLegalPage() {
  const page = await getPageBySlug("aviso-legal");
  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Aviso Legal"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "6 de junho de 2026"}</p>
        </div>
      </section>
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="prose prose-gray mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }} />
      </section>
    </div>
  );
}
