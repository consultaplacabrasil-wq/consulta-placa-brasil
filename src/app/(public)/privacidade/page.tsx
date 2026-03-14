import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Política de Privacidade da Consulta Placa Brasil. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacidade");
  return {
    title: page?.seoTitle || "Política de Privacidade",
    description: page?.seoDescription || defaultDesc,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/privacidade" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      title: page?.ogTitle || "Política de Privacidade",
      description: page?.ogDescription || defaultDesc,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/privacidade",
    },
  };
}

const defaultContent = `
<h2>1. Coleta de Dados</h2>
<p>Coletamos dados pessoais necessários para a prestação dos serviços, incluindo nome, e-mail, CPF e dados de pagamento.</p>
<h2>2. Uso dos Dados</h2>
<p>Os dados são utilizados exclusivamente para: processamento de consultas, pagamentos, comunicação e melhoria dos serviços.</p>
<h2>3. Compartilhamento</h2>
<p>Não compartilhamos dados pessoais com terceiros, exceto quando necessário para processamento de pagamentos ou por determinação legal.</p>
<h2>4. Segurança</h2>
<p>Utilizamos criptografia e práticas de segurança avançadas para proteger seus dados contra acessos não autorizados.</p>
<h2>5. Direitos do Titular</h2>
<p>Conforme a LGPD, você tem direito a: acesso, correção, exclusão, portabilidade e revogação do consentimento de seus dados pessoais.</p>
<h2>6. Cookies</h2>
<p>Utilizamos cookies para melhorar a experiência. Consulte nossa <a href="/cookies">Política de Cookies</a> para mais detalhes.</p>
<h2>7. Contato</h2>
<p>Para exercer seus direitos ou tirar dúvidas: contato@consultaplacabrasil.com</p>
`;

export default async function PrivacidadePage() {
  const page = await getPageBySlug("privacidade");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Política de Privacidade"}</h1>
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
            name: page?.seoTitle || "Política de Privacidade",
            description: page?.seoDescription || defaultDesc,
            url: "https://consultaplacabrasil.com/privacidade",
          }),
        }}
      />
    </div>
  );
}
