import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Termos e condições de uso da plataforma Consulta Placa Brasil.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("termos");
  return {
    title: page?.seoTitle || "Termos de Uso - Consulta Placa Brasil",
    description: page?.seoDescription || defaultDesc,
    alternates: { canonical: page?.seoCanonical || undefined },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      title: page?.ogTitle || "Termos de Uso",
      description: page?.ogDescription || defaultDesc,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com.br/termos",
    },
  };
}

const defaultContent = `
<h2>1. Aceitação dos Termos</h2>
<p>Ao acessar e utilizar o site Consulta Placa Brasil, você concorda com estes termos de uso. Se não concordar, não utilize a plataforma.</p>
<h2>2. Descrição do Serviço</h2>
<p>A Consulta Placa Brasil oferece serviços de consulta veicular por meio de dados públicos e bases oficiais, incluindo informações cadastrais, histórico e situação do veículo.</p>
<h2>3. Uso Adequado</h2>
<p>Você se compromete a utilizar o serviço apenas para fins legais e legítimos, não realizando consultas em massa ou para fins ilícitos.</p>
<h2>4. Pagamentos</h2>
<p>Os pagamentos são processados de forma segura. Consultas pagas serão liberadas após confirmação do pagamento.</p>
<h2>5. Limitação de Responsabilidade</h2>
<p>As informações são obtidas de bases oficiais, mas não garantimos a completude ou atualização em tempo real de todos os dados.</p>
<h2>6. Propriedade Intelectual</h2>
<p>Todo o conteúdo do site é propriedade da Consulta Placa Brasil e protegido por leis de propriedade intelectual.</p>
<h2>7. Alterações nos Termos</h2>
<p>Reservamos o direito de alterar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação.</p>
<h2>8. Contato</h2>
<p>Para dúvidas: contato@consultaplacabrasil.com.br</p>
`;

export default async function TermosPage() {
  const page = await getPageBySlug("termos");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Termos de Uso"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "10 de março de 2026"}</p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div
          className="prose prose-gray mx-auto max-w-4xl"
          dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page?.seoTitle || "Termos de Uso",
            description: page?.seoDescription || defaultDesc,
            url: "https://consultaplacabrasil.com.br/termos",
          }),
        }}
      />
    </div>
  );
}
