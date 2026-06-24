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
<p>Esta <strong>Política de Reembolso</strong> estabelece as regras aplicáveis aos pagamentos, cancelamentos, créditos, reexecuções de consulta, estornos e reembolsos relacionados aos serviços prestados pela <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, inscrita no CNPJ sob nº 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 1, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277, e-mail <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a>.</p>
<p>Esta Política integra o conjunto de documentos aplicáveis à utilização da plataforma e deve ser lida em conjunto com os <a href="/termos">Termos de Uso e Serviço</a>, a <a href="/privacidade">Política de Privacidade</a>, a <a href="/cookies">Política de Cookies</a> e demais avisos disponibilizados pela Consulta Placa Brasil.</p>
<p>Ao contratar os serviços da Consulta Placa Brasil, o usuário declara estar ciente das regras aqui previstas, especialmente quanto à <strong>natureza digital, personalizada, informativa e de execução imediata</strong> das consultas veiculares.</p>

<h2>1. Definições</h2>
<p>1.1 Para fins desta Política, considera-se:</p>
<ul>
  <li><strong>Consulta:</strong> a unidade de serviço contratada pelo usuário para obtenção de informações veiculares a partir da placa informada.</li>
  <li><strong>Relatório:</strong> o documento digital informativo gerado pela plataforma como resultado da consulta realizada.</li>
  <li><strong>Execução do serviço:</strong> a geração e disponibilização do relatório ao usuário.</li>
  <li><strong>Consumo da consulta:</strong> o momento em que o relatório é gerado e disponibilizado ao usuário por meio da plataforma, área logada, link, e-mail ou outro meio informado no momento da contratação.</li>
  <li><strong>Créditos:</strong> unidades de consulta adquiridas pelo usuário, individualmente ou em pacotes, para utilização na plataforma.</li>
  <li><strong>Reembolso:</strong> devolução total ou parcial de valor efetivamente pago pelo usuário, quando cabível.</li>
  <li><strong>Estorno:</strong> procedimento operacional de devolução do valor por meio do mesmo meio de pagamento utilizado ou por outro meio admitido pela plataforma.</li>
</ul>

<h2>2. Natureza do serviço</h2>
<p>2.1 A Consulta Placa Brasil presta serviço digital de consulta de informações veiculares a partir da placa informada pelo usuário, com geração de relatório digital informativo.</p>
<p>2.2 O serviço possui natureza:</p>
<ul>
  <li>digital;</li>
  <li>personalizada, pois depende da placa informada pelo usuário;</li>
  <li>informativa, pois consolida dados provenientes de fontes externas disponíveis no momento da consulta;</li>
  <li>de execução imediata, pois o relatório é processado e disponibilizado logo após a confirmação da contratação e do pagamento, conforme disponibilidade técnica.</li>
</ul>
<p>2.3 O relatório não constitui documento oficial, certidão, laudo cautelar, perícia, garantia de regularidade, aprovação de financiamento, garantia securitária ou validação definitiva da situação jurídica, documental, fiscal, financeira, mecânica ou comercial do veículo.</p>

<h2>3. Conferência prévia pelo usuário</h2>
<p>3.1 Antes de confirmar a contratação, o usuário deverá conferir cuidadosamente:</p>
<ul>
  <li>a placa informada;</li>
  <li>o tipo de consulta selecionado;</li>
  <li>o valor da contratação;</li>
  <li>a forma de pagamento;</li>
  <li>os dados cadastrais utilizados;</li>
  <li>as informações essenciais do serviço;</li>
  <li>os Termos de Uso, esta Política de Reembolso e demais documentos aplicáveis.</li>
</ul>
<p>3.2 O usuário é responsável pela exatidão da placa informada e pelas escolhas realizadas antes da confirmação da compra.</p>
<p>3.3 Quando a consulta for corretamente processada com base na placa informada pelo usuário, eventual erro de digitação, escolha equivocada do serviço, uso indevido da conta ou contratação feita com dados incorretos fornecidos pelo próprio usuário não gerará, por si só, direito automático a reembolso.</p>

<h2>4. Confirmação da contratação</h2>
<p>4.1 A contratação será considerada confirmada após:</p>
<ul>
  <li>seleção do serviço pelo usuário;</li>
  <li>confirmação da placa ou dos dados necessários à consulta;</li>
  <li>aceite dos Termos de Uso, da Política de Privacidade, desta Política de Reembolso e demais documentos aplicáveis;</li>
  <li>confirmação do pagamento;</li>
  <li>processamento da solicitação pela plataforma.</li>
</ul>
<p>4.2 A Consulta Placa Brasil poderá manter registros eletrônicos da contratação, incluindo aceite, versão dos documentos aceitos, data, horário, endereço IP, e-mail da conta, placa informada, serviço contratado, status do pagamento, geração do relatório e disponibilização da consulta, para fins de segurança, atendimento ao usuário, prevenção a fraudes, comprovação da prestação do serviço e exercício regular de direitos.</p>

<h2>5. Execução imediata do serviço</h2>
<p>5.1 O usuário declara estar ciente de que os serviços da Consulta Placa Brasil possuem natureza digital, personalizada e de execução imediata, uma vez que a consulta é processada com base na placa informada pelo próprio usuário e o relatório é gerado e disponibilizado logo após a confirmação da contratação e do pagamento.</p>
<p>5.2 A consulta será considerada executada e consumida quando o relatório for gerado e disponibilizado ao usuário por meio da plataforma, área logada, link, e-mail ou outro meio informado no momento da contratação.</p>
<p>5.3 A geração e disponibilização do relatório caracterizam a efetiva prestação do serviço contratado, sem prejuízo dos direitos legalmente assegurados ao consumidor em caso de falha, vício, cobrança indevida, indisponibilidade do serviço ou descumprimento da oferta.</p>

<h2>6. Aceite destacado para início imediato da execução</h2>
<p>6.1 Antes da confirmação da contratação ou da geração do relatório, a plataforma poderá solicitar confirmação expressa do usuário quanto ao início imediato da execução do serviço digital.</p>
<p>6.2 Para tanto, poderá ser utilizado checkbox, botão eletrônico ou mecanismo equivalente, com redação clara e destacada, por exemplo: <em>“Declaro que revisei a placa informada, li e aceito os Termos de Uso, a Política de Privacidade e a Política de Reembolso, e autorizo o início imediato da execução do serviço digital, ciente de que, após a geração e disponibilização do relatório, a consulta será considerada executada e consumida, ressalvadas as hipóteses legais de falha, vício, cobrança indevida ou descumprimento da oferta.”</em></p>
<p>6.3 Esse aceite poderá ser registrado eletronicamente com data, horário, IP, e-mail da conta, versão dos documentos aceitos, placa consultada, status do pagamento e momento de geração do relatório.</p>

<h2>7. Direito de arrependimento</h2>
<p>7.1 O usuário poderá solicitar cancelamento da contratação nos termos da legislação aplicável, especialmente quando o pedido for apresentado antes da geração e disponibilização do relatório.</p>
<p>7.2 Enquanto o relatório ainda não tiver sido gerado e disponibilizado, o pedido de cancelamento poderá ser aceito com estorno do valor pago, observados os registros da contratação, o status de processamento da consulta, o meio de pagamento utilizado, os prazos operacionais e eventuais verificações de segurança.</p>
<p>7.3 Após a geração e disponibilização do relatório, a consulta será considerada integralmente executada e consumida. Nessa hipótese, não haverá reembolso por mero arrependimento, desistência imotivada, mudança de decisão, erro de digitação da placa pelo usuário ou ausência de interesse posterior no relatório.</p>
<p>7.4 O disposto nesta cláusula não impede a análise de eventual falha, vício, cobrança indevida, indisponibilidade do serviço, descumprimento da oferta ou outra hipótese legalmente assegurada ao consumidor.</p>
<p>7.5 Nenhuma disposição desta Política deverá ser interpretada como exclusão ou limitação indevida de direitos do consumidor.</p>

<h2>8. Hipóteses de reembolso integral</h2>
<p>8.1 O usuário poderá ter direito ao reembolso integral do valor efetivamente pago, após análise da Consulta Placa Brasil, especialmente nas seguintes hipóteses:</p>
<ul>
  <li>cobrança em duplicidade;</li>
  <li>pagamento confirmado sem geração ou disponibilização do relatório;</li>
  <li>indisponibilidade definitiva do serviço contratado sem entrega da consulta;</li>
  <li>falha técnica comprovada da plataforma que impeça a geração do relatório;</li>
  <li>falha técnica comprovada da plataforma que impeça o acesso ao relatório gerado;</li>
  <li>geração de relatório diverso daquele contratado por falha imputável à plataforma;</li>
  <li>cancelamento solicitado antes da geração do relatório, quando aplicável;</li>
  <li>descumprimento comprovado da oferta;</li>
  <li>vício ou defeito comprovado na prestação do serviço, nos termos da legislação aplicável.</li>
</ul>

<h2>9. Hipóteses de nova consulta, crédito ou correção</h2>
<p>9.1 Quando houver falha técnica sanável, instabilidade temporária ou problema de acesso que não comprometa definitivamente a prestação do serviço, a Consulta Placa Brasil poderá, conforme o caso:</p>
<ul>
  <li>liberar nova execução da mesma consulta, sem custo adicional;</li>
  <li>disponibilizar novamente o relatório;</li>
  <li>corrigir o acesso ao relatório;</li>
  <li>conceder crédito equivalente para nova consulta;</li>
  <li>realizar estorno total ou parcial;</li>
  <li>adotar outra solução adequada à natureza da falha.</li>
</ul>
<p>9.2 A solução aplicável será definida com base na natureza do problema, nos registros técnicos, na legislação aplicável, na boa-fé, na proporcionalidade e na efetiva possibilidade de correção do serviço.</p>

<h2>10. Hipóteses em que não haverá reembolso automático</h2>
<p>10.1 Não haverá reembolso automático, especialmente, nas seguintes hipóteses:</p>
<ul>
  <li>relatório regularmente gerado e disponibilizado ao usuário;</li>
  <li>erro de digitação da placa pelo usuário;</li>
  <li>escolha equivocada do tipo de consulta pelo usuário;</li>
  <li>desistência após a geração do relatório;</li>
  <li>ausência de uso do relatório após sua disponibilização;</li>
  <li>insatisfação com a quantidade de informações disponíveis nas fontes consultadas, quando o relatório tiver sido gerado conforme a disponibilidade das bases;</li>
  <li>ausência de determinada informação no relatório quando tal informação não estiver disponível nas fontes consultadas no momento da consulta;</li>
  <li>divergência, desatualização, omissão ou inconsistência originária de base externa, órgão público, parceiro ou fornecedor de dados, sem falha diretamente imputável à Consulta Placa Brasil;</li>
  <li>alterações nas bases de dados após a geração do relatório;</li>
  <li>utilização do relatório para finalidade diversa daquela prevista nos Termos de Uso;</li>
  <li>tentativa de revenda, compartilhamento irregular, uso automatizado, scraping ou uso abusivo da plataforma;</li>
  <li>contestação de pagamento incompatível com os registros de contratação, pagamento e geração do relatório.</li>
</ul>
<p>10.2 As hipóteses acima não afastam o direito do usuário de solicitar análise do caso concreto, nem limitam direitos previstos em lei quando houver falha comprovada na prestação do serviço.</p>

<h2>11. Fontes externas e limitações do relatório</h2>
<p>11.1 Os relatórios são gerados a partir de informações obtidas em fontes externas lícitas, públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores, conforme disponibilidade técnica, contratual e jurídica no momento da consulta.</p>
<p>11.2 A Consulta Placa Brasil não é responsável pela geração primária, atualização originária, manutenção ou correção dos dados brutos constantes dessas fontes externas.</p>
<p>11.3 A ausência de determinada informação no relatório não significa, necessariamente, inexistência de débito, restrição, sinistro, ocorrência, bloqueio, apontamento, pendência ou irregularidade.</p>
<p>11.4 Por essa razão, não haverá reembolso automático quando o relatório for regularmente gerado com base nas fontes disponíveis, ainda que o usuário entenda que as informações apresentadas são insuficientes para determinada finalidade negocial, comercial, financeira, securitária ou jurídica.</p>

<h2>12. Pacotes de créditos</h2>
<p>12.1 Quando o usuário adquirir pacote de créditos ou múltiplas consultas, cada consulta será considerada consumida no momento da geração e disponibilização do respectivo relatório.</p>
<p>12.2 Quando cabível, eventual reembolso será calculado proporcionalmente aos créditos pagos e ainda não utilizados.</p>
<p>12.3 Créditos já consumidos mediante geração de relatório não serão reembolsados, salvo nas hipóteses de falha, vício, cobrança indevida, indisponibilidade do serviço ou descumprimento da oferta reconhecidas pela Consulta Placa Brasil ou previstas na legislação aplicável.</p>
<p>12.4 Créditos concedidos gratuitamente, promocionais, bonificados, decorrentes de cortesia, campanha, cupom ou liberalidade comercial poderão não ser convertidos em dinheiro, salvo disposição expressa em sentido diverso.</p>

<h2>13. Promoções, cupons e descontos</h2>
<p>13.1 Valores promocionais, cupons, descontos ou condições comerciais especiais serão considerados no cálculo de eventual reembolso.</p>
<p>13.2 Quando a compra tiver sido realizada com desconto, cupom ou promoção, eventual estorno observará o valor efetivamente pago pelo usuário, e não o valor cheio do serviço.</p>
<p>13.3 Cupons, créditos promocionais ou benefícios concedidos por liberalidade poderão ser cancelados em caso de reembolso, fraude, uso indevido, violação dos Termos de Uso ou descumprimento das condições da promoção.</p>

<h2>14. Chargeback e contestação de pagamento</h2>
<p>14.1 Caso o usuário conteste o pagamento diretamente perante operadora de cartão, banco, instituição financeira, gateway ou meio de pagamento, a Consulta Placa Brasil poderá utilizar os registros eletrônicos da contratação, pagamento, aceite, IP, data, horário, placa informada, geração e disponibilização do relatório para demonstrar a regularidade da transação e da prestação do serviço.</p>
<p>14.2 A abertura de chargeback não impede a análise interna da solicitação, mas poderá suspender temporariamente novos reembolsos, créditos ou consultas relacionadas à mesma contratação até a conclusão da apuração.</p>
<p>14.3 A Consulta Placa Brasil poderá bloquear ou limitar o acesso do usuário quando houver indícios de contestação fraudulenta, uso abusivo, tentativa de obtenção indevida de vantagem, duplicidade de reembolso ou violação dos Termos de Uso.</p>

<h2>15. Como solicitar cancelamento, reembolso ou estorno</h2>
<p>15.1 O usuário poderá solicitar cancelamento, reembolso ou estorno pelos canais de atendimento da Consulta Placa Brasil: E-mail <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a> / Telefone (61) 3246-9277.</p>
<p>15.2 A solicitação deverá conter, sempre que possível:</p>
<ul>
  <li>nome completo ou razão social;</li>
  <li>e-mail cadastrado;</li>
  <li>CPF ou CNPJ, quando necessário à identificação segura;</li>
  <li>data da compra;</li>
  <li>forma de pagamento;</li>
  <li>identificação da consulta ou do pedido;</li>
  <li>placa consultada, quando necessária à análise;</li>
  <li>motivo da solicitação;</li>
  <li>documentos ou evidências do problema, se houver.</li>
</ul>
<p>15.3 A Consulta Placa Brasil poderá solicitar informações adicionais para confirmar a identidade do solicitante, prevenir fraudes, localizar a contratação e analisar adequadamente o pedido.</p>

<h2>16. Prazo de análise</h2>
<p>16.1 As solicitações de cancelamento, reembolso ou estorno serão analisadas em <strong>até 7 dias úteis</strong>, contados do recebimento das informações mínimas necessárias à análise.</p>
<p>16.2 O prazo poderá ser prorrogado quando a solicitação exigir verificação técnica, análise junto ao meio de pagamento, apuração de fraude, validação de registros, consulta a fornecedor externo ou complementação de informações pelo usuário.</p>
<p>16.3 A Consulta Placa Brasil buscará informar o usuário sobre o resultado da análise por e-mail ou outro canal de atendimento disponível.</p>

<h2>17. Forma e prazo de estorno</h2>
<p>17.1 Quando aprovado, o estorno será realizado, preferencialmente, pelo mesmo meio de pagamento utilizado na contratação.</p>
<p>17.2 Os prazos estimados são:</p>
<ul>
  <li><strong>Pix:</strong> até 1 dia útil após aprovação interna do estorno, salvo indisponibilidade operacional ou inconsistência de dados;</li>
  <li><strong>Cartão de crédito:</strong> conforme prazos da operadora, instituição financeira, bandeira ou administradora do cartão, podendo o crédito aparecer em até duas faturas subsequentes;</li>
  <li><strong>Boleto ou outros meios:</strong> conforme disponibilidade do meio de pagamento e informações bancárias fornecidas pelo usuário.</li>
</ul>
<p>17.3 A Consulta Placa Brasil não se responsabiliza por atrasos decorrentes exclusivamente de instituições financeiras, operadoras de cartão, gateways, bancos, bandeiras ou inconsistências nos dados fornecidos pelo usuário.</p>

<h2>18. Reembolso parcial</h2>
<p>18.1 Quando apenas parte do serviço tiver sido afetada por falha, vício ou indisponibilidade, o reembolso poderá ser proporcional ao valor correspondente à parcela não executada ou aos créditos não utilizados.</p>
<p>18.2 Em pacotes de consultas, o valor proporcional poderá considerar o preço efetivamente pago pelo pacote, descontos aplicados, créditos já utilizados e benefícios promocionais concedidos.</p>

<h2>19. Uso indevido e perda do direito a reembolso administrativo</h2>
<p>19.1 A Consulta Placa Brasil poderá negar reembolso administrativo, suspender análise, bloquear conta ou adotar medidas legais quando houver indícios de:</p>
<ul>
  <li>fraude;</li>
  <li>má-fé;</li>
  <li>uso de dados falsos ou de terceiros;</li>
  <li>contestação indevida de pagamento;</li>
  <li>duplicidade de pedido de reembolso;</li>
  <li>tentativa de obter reembolso após uso regular do serviço;</li>
  <li>scraping, automação ou consulta em massa não autorizada;</li>
  <li>revenda ou compartilhamento irregular de relatórios;</li>
  <li>uso da plataforma para finalidade ilícita, abusiva ou contrária aos Termos de Uso;</li>
  <li>violação à legislação aplicável.</li>
</ul>
<p>19.2 Essa previsão não impede a análise de eventual direito legal do consumidor quando houver falha comprovada da prestação do serviço.</p>

<h2>20. Preservação dos direitos do consumidor</h2>
<p>20.1 Nenhuma disposição desta Política deve ser interpretada como exclusão, renúncia ou limitação indevida de direitos assegurados ao consumidor pela legislação aplicável.</p>
<p>20.2 Em caso de falha, vício, defeito na prestação do serviço, cobrança indevida, descumprimento da oferta ou outra hipótese legalmente reconhecida, o usuário poderá solicitar a solução adequada pelos canais de atendimento da Consulta Placa Brasil.</p>
<p>20.3 A Consulta Placa Brasil analisará as solicitações de boa-fé, com base nos registros da contratação, nas informações técnicas disponíveis, na legislação aplicável e nas circunstâncias do caso concreto.</p>

<h2>21. Relação com os Termos de Uso e demais políticas</h2>
<p>21.1 Esta Política integra o conjunto de documentos aplicáveis à utilização da plataforma Consulta Placa Brasil, juntamente com os <a href="/termos">Termos de Uso e Serviço</a>, <a href="/privacidade">Política de Privacidade</a>, <a href="/cookies">Política de Cookies</a> e demais avisos disponibilizados na plataforma.</p>
<p>21.2 As regras previstas nesta Política complementam as disposições dos Termos de Uso relativas à contratação, execução imediata do serviço, geração de relatórios, responsabilidade do usuário, limitação de responsabilidade, registros eletrônicos e uso adequado da plataforma.</p>
<p>21.3 Em caso de conflito entre esta Política e os Termos de Uso, deverá prevalecer a interpretação que melhor compatibilize a natureza do serviço, os direitos do consumidor, a boa-fé, a segurança da plataforma e a legislação aplicável.</p>

<h2>22. Alterações desta Política</h2>
<p>22.1 A Consulta Placa Brasil poderá atualizar esta Política a qualquer tempo para refletir alterações legais, regulatórias, operacionais, comerciais, tecnológicas ou de funcionamento da plataforma.</p>
<p>22.2 A versão vigente estará sempre disponível na plataforma, com indicação da data de última atualização.</p>
<p>22.3 Alterações relevantes poderão ser comunicadas por meio do site, e-mail, área logada ou outro canal adequado.</p>

<h2>23. Contato</h2>
<p>23.1 Dúvidas, solicitações, reclamações, pedidos de cancelamento, reembolso ou estorno poderão ser encaminhados pelos seguintes canais:</p>
<ul>
  <li><strong>E-mail:</strong> <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a></li>
  <li><strong>Telefone:</strong> (61) 3246-9277</li>
  <li><strong>Endereço:</strong> Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000.</li>
</ul>
`;

export default async function ReembolsoPage() {
  const page = await getPageBySlug("reembolso");
  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Política de Reembolso"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "22 de junho de 2026"}</p>
        </div>
      </section>
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="legal-content mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }} />
      </section>
    </div>
  );
}
