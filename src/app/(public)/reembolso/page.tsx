import { Metadata } from "next";
import { getPageBySlug } from "@/lib/get-page";

const defaultDesc = "Política de Reembolso da Consulta Placa Brasil. Saiba como funcionam estornos, falhas técnicas e o direito de arrependimento nas consultas veiculares.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("reembolso");
  return {
    title: page?.seoTitle || "Política de Reembolso - Consulta Placa Brasil",
    description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/reembolso" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Política de Reembolso",
      description: page?.ogDescription || defaultDesc,
      url: page?.ogUrl || "https://consultaplacabrasil.com/reembolso",
    },
  };
}

const defaultContent = `
<p>Esta Política de Reembolso esclarece as regras de pagamento, estorno e cancelamento da plataforma <strong>Consulta Placa Brasil</strong> (CONSULTA PLACA BRASIL LTDA, CNPJ 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277).</p>

<h2>1. Natureza do Serviço</h2>
<p>As consultas veiculares são serviços digitais de entrega imediata. O relatório é gerado e disponibilizado assim que a consulta é processada.</p>

<h2>2. Consulta Já Executada</h2>
<p>Por se tratar de produto digital consumido no ato, <strong>não há reembolso após a geração do relatório</strong>, ressalvadas as hipóteses previstas nesta política e na legislação aplicável.</p>

<h2>3. Falhas Técnicas</h2>
<p>Caso a consulta seja paga mas o relatório não seja gerado por falha técnica comprovada de nossa plataforma, o usuário terá direito, a nosso critério, a:</p>
<ul>
  <li>Nova execução da consulta sem custo adicional; ou</li>
  <li>Estorno integral do valor pago.</li>
</ul>

<h2>4. Direito de Arrependimento</h2>
<p>Nos termos do art. 49 do Código de Defesa do Consumidor, o direito de arrependimento em compras online não se aplica quando o serviço digital já foi integralmente prestado (relatório gerado) com a ciência prévia do consumidor. Pagamentos cujo relatório ainda não foi gerado poderão ser cancelados mediante solicitação.</p>

<h2>5. Pacotes de Créditos</h2>
<p>Em pacotes com múltiplas consultas, o reembolso, quando cabível, será proporcional aos créditos ainda não utilizados.</p>

<h2>6. Como Solicitar</h2>
<p>Solicitações devem ser enviadas para <strong>contato@consultaplacabrasil.com</strong>, informando o e-mail da conta, a data da compra e o motivo. O prazo de análise é de até 7 dias úteis.</p>

<h2>7. Prazo de Estorno</h2>
<p>Aprovado o estorno, o valor é devolvido pelo mesmo meio de pagamento. O prazo de crédito depende da operadora (Pix: até 1 dia útil; cartão: conforme a administradora, podendo levar até 2 faturas).</p>

<h2>8. Contato</h2>
<p>Dúvidas sobre reembolsos: contato@consultaplacabrasil.com</p>
`;

export default async function ReembolsoPage() {
  const page = await getPageBySlug("reembolso");
  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Política de Reembolso"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "6 de junho de 2026"}</p>
        </div>
      </section>
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="prose prose-gray mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }} />
      </section>
    </div>
  );
}
