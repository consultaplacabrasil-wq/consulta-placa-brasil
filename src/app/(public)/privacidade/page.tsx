import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Política de Privacidade da Consulta Placa Brasil. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacidade");
  return {
    title: page?.seoTitle || "Política de Privacidade",
    description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/privacidade" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Política de Privacidade",
      description: page?.ogDescription || defaultDesc,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/privacidade",
    },
  };
}

const defaultContent = `
<p>Esta Política de Privacidade descreve como a <strong>Consulta Placa Brasil</strong> (CONSULTA PLACA BRASIL LTDA, CNPJ 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000) coleta, utiliza, armazena e protege os dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>

<h2>1. Dados que Coletamos</h2>
<ul>
  <li><strong>Dados cadastrais:</strong> nome, e-mail, CPF/CNPJ e telefone;</li>
  <li><strong>Dados de pagamento:</strong> processados por gateway parceiro (não armazenamos dados completos de cartão);</li>
  <li><strong>Dados de uso:</strong> placas consultadas, histórico de consultas e relatórios gerados;</li>
  <li><strong>Dados técnicos:</strong> endereço IP, navegador e cookies.</li>
</ul>

<h2>2. Finalidades do Tratamento</h2>
<p>Utilizamos os dados para: criar e gerenciar sua conta; processar consultas e pagamentos; gerar relatórios; enviar comunicações e notificações; prevenir fraudes; e cumprir obrigações legais.</p>

<h2>3. Base Legal</h2>
<p>O tratamento se fundamenta na execução de contrato, no cumprimento de obrigação legal, no legítimo interesse e, quando aplicável, no consentimento do titular.</p>

<h2>4. Compartilhamento de Dados</h2>
<p>Não vendemos seus dados. Compartilhamos apenas o necessário com: processadores de pagamento, provedores de infraestrutura/e-mail e fontes/parceiros de dados veiculares, além de autoridades quando exigido por lei.</p>

<h2>5. Armazenamento e Segurança</h2>
<p>Adotamos medidas técnicas e organizacionais (criptografia, controle de acesso, senhas com hash) para proteger seus dados. Os dados são mantidos pelo tempo necessário às finalidades e às obrigações legais.</p>

<h2>6. Direitos do Titular (LGPD)</h2>
<p>Você pode, a qualquer momento, solicitar: confirmação e acesso aos dados; correção; anonimização ou exclusão; portabilidade; informação sobre compartilhamento; e revogação do consentimento. As solicitações podem ser feitas pelo e-mail abaixo ou pela página <a href="/lgpd">LGPD</a>.</p>

<h2>7. Cookies</h2>
<p>Utilizamos cookies para melhorar a experiência. Consulte nossa <a href="/cookies">Política de Cookies</a>.</p>

<h2>8. Alterações</h2>
<p>Esta Política pode ser atualizada periodicamente. A versão vigente estará sempre disponível nesta página.</p>

<h2>9. Encarregado / Contato</h2>
<p>Para exercer seus direitos ou esclarecer dúvidas sobre privacidade: contato@consultaplacabrasil.com</p>
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
            description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
            url: "https://consultaplacabrasil.com/privacidade",
          }),
        }}
      />
    </div>
  );
}
