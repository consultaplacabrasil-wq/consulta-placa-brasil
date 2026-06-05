import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Leia os termos e condições de uso da plataforma Consulta Placa Brasil. Regras de utilização, pagamentos, responsabilidades e propriedade intelectual.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("termos");
  return {
    title: page?.seoTitle || "Termos de Uso - Consulta Placa Brasil",
    description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/termos" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Termos de Uso",
      description: page?.ogDescription || defaultDesc,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/termos",
    },
  };
}

const defaultContent = `
<p>Estes Termos de Uso regulam o acesso e a utilização da plataforma <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, inscrita no CNPJ sob nº 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277. Leia atentamente antes de utilizar nossos serviços.</p>

<h2>1. Aceitação dos Termos</h2>
<p>Ao acessar ou utilizar o site Consulta Placa Brasil, o usuário declara que leu, compreendeu e concorda integralmente com estes Termos de Uso e com a nossa Política de Privacidade. Caso não concorde, o usuário não deve utilizar a plataforma.</p>

<h2>2. Objeto do Serviço</h2>
<p>A plataforma tem por objeto:</p>
<ul>
  <li>Consulta de informações veiculares a partir da placa;</li>
  <li>Emissão de relatórios informativos sobre veículos;</li>
  <li>Fornecimento de dados provenientes de fontes públicas, privadas e parceiras, quando permitido por lei.</li>
</ul>

<h2>3. Uso Permitido</h2>
<p>O usuário poderá utilizar as informações obtidas <strong>exclusivamente para fins lícitos</strong>, tais como:</p>
<ul>
  <li>Compra e venda de veículos;</li>
  <li>Verificação de histórico veicular;</li>
  <li>Conferência de informações antes de negociações.</li>
</ul>

<h2>4. Uso Proibido</h2>
<p>É expressamente proibido utilizar a plataforma para:</p>
<ul>
  <li>Perseguição, assédio ou localização de terceiros;</li>
  <li>Obtenção de dados para fins ilícitos ou fraudulentos;</li>
  <li>Clonagem de veículos;</li>
  <li>Uso comercial não autorizado ou revenda dos relatórios;</li>
  <li>Automatização de consultas (robôs/scripts) sem autorização expressa.</li>
</ul>

<h2>5. Responsabilidade do Usuário</h2>
<p>O usuário é responsável por: informar dados corretos; utilizar as consultas dentro da legislação vigente; e manter a segurança e a confidencialidade dos dados de acesso de sua conta.</p>

<h2>6. Limitação de Responsabilidade</h2>
<p>As informações disponibilizadas possuem <strong>caráter exclusivamente informativo</strong> e são fornecidas conforme recebidas das fontes de dados. Não garantimos a inexistência de divergências, atrasos ou inconsistências nas informações consultadas.</p>
<p>Adicionalmente, o usuário reconhece que:</p>
<ul>
  <li>O relatório <strong>não substitui vistoria cautelar</strong>;</li>
  <li>O relatório <strong>não substitui documentos oficiais</strong> dos órgãos de trânsito;</li>
  <li>A plataforma <strong>não garante</strong> aprovação de financiamentos, seguros ou transferências.</li>
</ul>

<h2>7. Fontes de Dados</h2>
<p>Os dados podem ser obtidos de bases públicas, bases privadas, parceiros comerciais e órgãos governamentais, quando permitido por lei.</p>

<h2>8. Pagamentos e Reembolsos</h2>
<ul>
  <li>A consulta é considerada consumida imediatamente após a geração do relatório;</li>
  <li>Não há reembolso após a geração do relatório;</li>
  <li>Falhas técnicas comprovadas poderão gerar nova consulta ou estorno, conforme nossa Política de Reembolso.</li>
</ul>

<h2>9. Propriedade Intelectual</h2>
<p>O sistema, layout, marca, relatórios e demais conteúdos são protegidos por direitos autorais e de propriedade intelectual, sendo vedada a cópia, reprodução ou distribuição sem autorização prévia e expressa.</p>

<h2>10. Suspensão ou Cancelamento de Contas</h2>
<p>A plataforma poderá suspender ou cancelar contas de usuários que pratiquem fraudes, tentem automatizar consultas sem autorização ou utilizem o sistema de forma abusiva ou ilegal.</p>

<h2>11. LGPD e Privacidade</h2>
<p>O tratamento de dados pessoais observa a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD). Os detalhes sobre coleta, uso e direitos do titular constam em nossa Política de Privacidade.</p>

<h2>12. Disponibilidade do Serviço</h2>
<p>O serviço pode sofrer manutenções programadas ou eventuais. Algumas consultas podem ficar temporariamente indisponíveis em razão das fontes de dados. Não há garantia de funcionamento ininterrupto.</p>

<h2>13. Alterações dos Termos</h2>
<p>Reservamo-nos o direito de atualizar estes Termos a qualquer momento. As alterações entram em vigor a partir de sua publicação nesta página.</p>

<h2>14. Foro</h2>
<p>Fica eleito o foro da comarca de Brasília/DF para dirimir quaisquer controvérsias decorrentes destes Termos de Uso, com renúncia a qualquer outro, por mais privilegiado que seja.</p>

<h2>15. Cláusula Específica de Uso Responsável</h2>
<p>O usuário declara estar ciente de que os relatórios disponibilizados não contêm informações protegidas por sigilo legal e que qualquer tentativa de utilização das informações para identificação, localização, perseguição ou prática de atos ilícitos contra terceiros é estritamente proibida, podendo resultar em bloqueio da conta e comunicação às autoridades competentes.</p>

<h2>16. Contato</h2>
<p>Dúvidas sobre estes Termos: contato@consultaplacabrasil.com</p>
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
          dangerouslySetInnerHTML={{ __html: (page?.content && page.content.replace(/<[^>]*>/g, "").trim().length > 20) ? page.content : defaultContent }}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page?.seoTitle || "Termos de Uso",
            description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
            url: "https://consultaplacabrasil.com/termos",
          }),
        }}
      />
    </div>
  );
}
