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
<p>Este <strong>Aviso Legal</strong> aplica-se ao acesso, utilização, interpretação e compartilhamento dos relatórios, dados e informações disponibilizados pela plataforma <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, inscrita no CNPJ sob nº 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 1, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277, e-mail <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a>.</p>
<p>Este Aviso Legal integra o conjunto de documentos aplicáveis à utilização da plataforma, juntamente com os <a href="/termos">Termos de Uso e Serviço</a>, a <a href="/privacidade">Política de Privacidade</a>, a <a href="/cookies">Política de Cookies</a>, a <a href="/reembolso">Política de Reembolso</a> e demais avisos eventualmente disponibilizados pela Consulta Placa Brasil.</p>
<p>Ao acessar a plataforma, contratar consultas, gerar relatórios ou utilizar as informações disponibilizadas, o usuário declara estar ciente das condições, limitações e responsabilidades descritas neste Aviso Legal.</p>

<h2>1. Finalidade do Aviso Legal</h2>
<p>1.1 Este Aviso Legal tem por finalidade esclarecer a natureza, o alcance, as limitações e as condições de uso das informações e relatórios disponibilizados pela Consulta Placa Brasil.</p>
<p>1.2 O documento busca assegurar transparência ao usuário, prevenir interpretações equivocadas sobre o serviço, delimitar adequadamente a responsabilidade da plataforma, reforçar o uso lícito e responsável das informações e mitigar riscos decorrentes da utilização indevida dos relatórios.</p>

<h2>2. Definições</h2>
<p>2.1 Para fins deste Aviso Legal, considera-se:</p>
<ul>
  <li><strong>Plataforma:</strong> o site, sistema, ambiente eletrônico, ferramentas, interfaces e funcionalidades disponibilizados pela Consulta Placa Brasil.</li>
  <li><strong>Consulta:</strong> a unidade de serviço contratada pelo usuário para obtenção de informações veiculares a partir da placa informada.</li>
  <li><strong>Relatório:</strong> o documento digital informativo gerado pela plataforma como resultado da consulta realizada.</li>
  <li><strong>Fontes externas:</strong> bases lícitas, públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores utilizadas para obtenção de informações veiculares, conforme disponibilidade técnica, contratual e jurídica.</li>
  <li><strong>Usuário:</strong> toda pessoa física ou jurídica que acessa a plataforma, contrata consulta, gera relatório ou utiliza as informações disponibilizadas pela Consulta Placa Brasil.</li>
</ul>

<h2>3. Natureza informativa dos relatórios</h2>
<p>3.1 Os relatórios emitidos pela Consulta Placa Brasil possuem <strong>caráter exclusivamente informativo, auxiliar e preliminar</strong>.</p>
<p>3.2 As informações disponibilizadas têm por finalidade apoiar o usuário na conferência de dados veiculares e na análise preliminar de informações relacionadas a determinado veículo, sem constituir documento oficial, certidão, laudo cautelar, perícia, garantia de procedência, promessa de regularidade ou validação definitiva da situação jurídica, documental, fiscal, financeira, mecânica ou comercial do veículo.</p>
<p>3.3 O relatório deve ser utilizado como ferramenta complementar de consulta, não como única fonte de decisão em operações de compra, venda, financiamento, seguro, transferência, regularização ou qualquer outra negociação envolvendo veículos.</p>

<h2>4. Fontes externas de dados</h2>
<p>4.1 As informações constantes dos relatórios poderão ser obtidas a partir de fontes externas lícitas, públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores, conforme disponibilidade técnica, contratual e jurídica no momento da consulta.</p>
<p>4.2 A Consulta Placa Brasil atua como plataforma de organização, consolidação e disponibilização de informações veiculares obtidas de fontes externas, não sendo responsável pela geração primária, atualização originária, manutenção ou correção dos dados brutos constantes dessas bases.</p>
<p>4.3 A responsabilidade pela origem, atualização primária, manutenção e correção dos dados brutos cabe às respectivas fontes, órgãos, entidades, parceiros ou fornecedores externos, sem prejuízo da responsabilidade da Consulta Placa Brasil por falhas diretamente imputáveis à prestação do serviço que oferece.</p>

<h2>5. Disponibilidade, atualização e consistência das informações</h2>
<p>5.1 As informações exibidas nos relatórios refletem os dados disponíveis nas fontes consultadas no momento da geração da consulta.</p>
<p>5.2 Podem ocorrer divergências, atrasos de atualização, omissões, inconsistências, indisponibilidades temporárias ou alterações posteriores nas bases de dados utilizadas.</p>
<p>5.3 A ausência de determinada informação no relatório não significa, necessariamente, inexistência de débito, restrição, sinistro, ocorrência, bloqueio, alienação, pendência administrativa, judicial, fiscal, financeira ou qualquer outro apontamento relacionado ao veículo.</p>
<p>5.4 O usuário está ciente de que as informações poderão ser alteradas, corrigidas, incluídas ou removidas posteriormente pelas fontes responsáveis, órgãos competentes, parceiros ou terceiros fornecedores, sem que isso implique, por si só, falha da Consulta Placa Brasil.</p>

<h2>6. Ausência de garantia absoluta</h2>
<p>6.1 A Consulta Placa Brasil não garante que o relatório contenha todas as informações existentes sobre determinado veículo, nem que as fontes consultadas estejam permanentemente atualizadas, completas, disponíveis ou livres de inconsistências.</p>
<p>6.2 A plataforma <strong>não garante</strong>:</p>
<ul>
  <li>inexistência de débitos;</li>
  <li>inexistência de restrições;</li>
  <li>inexistência de sinistros;</li>
  <li>inexistência de adulterações;</li>
  <li>inexistência de bloqueios;</li>
  <li>inexistência de pendências administrativas, judiciais, fiscais ou financeiras;</li>
  <li>aprovação de financiamento;</li>
  <li>contratação de seguro;</li>
  <li>transferência de propriedade;</li>
  <li>regularização documental;</li>
  <li>conclusão, viabilidade, segurança econômica ou êxito de negociações envolvendo veículos.</li>
</ul>
<p>6.3 Esta cláusula não afasta a responsabilidade da Consulta Placa Brasil por falha diretamente imputável à prestação do serviço, nem restringe direitos legalmente assegurados ao consumidor.</p>

<h2>7. Não substituição de documentos oficiais, vistorias ou perícias</h2>
<p>7.1 O relatório gerado pela Consulta Placa Brasil <strong>não substitui</strong>:</p>
<ul>
  <li>documentos oficiais emitidos por órgãos de trânsito;</li>
  <li>consultas diretas a Detrans, Senatran ou demais órgãos competentes;</li>
  <li>vistoria cautelar;</li>
  <li>laudo de vistoria;</li>
  <li>perícia técnica;</li>
  <li>inspeção física do veículo;</li>
  <li>análise mecânica;</li>
  <li>avaliação jurídica;</li>
  <li>avaliação financeira;</li>
  <li>análise securitária;</li>
  <li>consulta a cartórios, instituições financeiras, seguradoras, autoridades ou órgãos públicos competentes.</li>
</ul>
<p>7.2 O usuário deverá adotar cautelas adicionais antes de comprar, vender, financiar, segurar, transferir, regularizar ou negociar qualquer veículo, incluindo conferência documental, vistoria presencial, consulta aos órgãos oficiais e, quando necessário, orientação técnica ou jurídica especializada.</p>

<h2>8. Empresa privada e ausência de vínculo com órgãos públicos</h2>
<p>8.1 A Consulta Placa Brasil é uma <strong>empresa privada</strong>.</p>
<p>8.2 A plataforma não é órgão público, entidade de trânsito, Detran, Senatran, cartório, seguradora, instituição financeira, autoridade administrativa, órgão fiscalizador ou entidade governamental.</p>
<p>8.3 A Consulta Placa Brasil não possui vínculo institucional, representação oficial, delegação pública ou autorização para atuar em nome de Detrans, Senatran ou qualquer outro órgão público.</p>
<p>8.4 O uso de informações provenientes de bases públicas ou governamentais, quando aplicável, não transforma a Consulta Placa Brasil em órgão oficial nem confere aos relatórios emitidos natureza de documento público, certidão ou declaração oficial.</p>

<h2>9. Responsabilidade do usuário pelas decisões tomadas</h2>
<p>9.1 O usuário é responsável pelas decisões que tomar com base nas informações disponibilizadas pela plataforma.</p>
<p>9.2 A Consulta Placa Brasil não participa, intermedeia, valida, garante ou fiscaliza negociações de compra, venda, financiamento, seguro, transferência, regularização, avaliação ou qualquer outra operação envolvendo veículos.</p>
<p>9.3 A plataforma não se responsabiliza por prejuízos decorrentes de decisões comerciais, financeiras, jurídicas ou negociais tomadas exclusivamente com base no relatório, especialmente quando o usuário deixar de realizar verificações complementares junto aos órgãos oficiais, profissionais especializados, fontes competentes ou por meio de vistoria presencial.</p>
<p>9.4 Esta previsão não afasta a análise de eventual falha diretamente imputável à prestação do serviço pela Consulta Placa Brasil, quando comprovada nos termos da legislação aplicável.</p>

<h2>10. Uso responsável das informações</h2>
<p>10.1 O usuário deverá utilizar a plataforma, os relatórios e as informações obtidas exclusivamente para finalidades lícitas, legítimas e compatíveis com a natureza informativa do serviço.</p>
<p>10.2 É expressamente proibido utilizar a plataforma, relatórios ou informações disponibilizadas para:</p>
<ul>
  <li>identificar indevidamente proprietário, condutor, endereço, telefone, CPF, familiares, rotina ou localização de pessoa natural;</li>
  <li>perseguir, assediar, ameaçar, constranger, intimidar, discriminar, vigiar ou monitorar terceiros;</li>
  <li>praticar fraude, estelionato, clonagem, adulteração, receptação, falsidade, lavagem de dinheiro ou qualquer ilícito civil, administrativo ou penal;</li>
  <li>formar banco de dados próprio;</li>
  <li>enriquecer cadastros;</li>
  <li>realizar marketing, cobrança, perfilamento ou prospecção comercial sem base legal;</li>
  <li>revender, compartilhar comercialmente, reproduzir ou explorar relatórios sem autorização;</li>
  <li>realizar consultas em massa, scraping, automação, mineração de dados ou uso abusivo da plataforma;</li>
  <li>violar privacidade, proteção de dados pessoais, direitos de terceiros ou legislação aplicável.</li>
</ul>
<p>10.3 O uso indevido poderá acarretar bloqueio de acesso, suspensão ou cancelamento de conta, preservação de registros, comunicação às autoridades competentes e adoção das medidas administrativas, cíveis ou criminais cabíveis.</p>

<h2>11. Proteção de dados pessoais</h2>
<p>11.1 O uso da plataforma e dos relatórios deverá observar a legislação aplicável à proteção de dados pessoais.</p>
<p>11.2 O usuário declara estar ciente de que não poderá utilizar as informações disponibilizadas pela Consulta Placa Brasil para tratamento indevido de dados pessoais, identificação ilegítima de terceiros, perseguição, vigilância, monitoramento, discriminação, exposição, fraude ou qualquer finalidade incompatível com a legislação aplicável.</p>
<p>11.3 As regras sobre coleta, uso, armazenamento, compartilhamento, retenção, segurança, direitos dos titulares e canais de atendimento constam da <a href="/privacidade">Política de Privacidade</a> da Consulta Placa Brasil.</p>

<h2>12. Registros eletrônicos e prevenção a fraudes</h2>
<p>12.1 A Consulta Placa Brasil poderá manter registros eletrônicos relacionados ao acesso, contratação, aceite dos documentos aplicáveis, pagamento, placa consultada, geração do relatório, disponibilização da consulta, endereço IP, data, horário, dispositivo e demais informações necessárias à segurança da plataforma.</p>
<p>12.2 Esses registros poderão ser utilizados para:</p>
<ul>
  <li>comprovar a contratação eletrônica;</li>
  <li>demonstrar a geração e disponibilização do relatório;</li>
  <li>prevenir fraudes;</li>
  <li>apurar uso indevido;</li>
  <li>atender solicitações do usuário;</li>
  <li>exercer direitos em processos administrativos, judiciais ou arbitrais;</li>
  <li>colaborar com autoridades competentes, quando cabível;</li>
  <li>proteger a segurança da plataforma, dos usuários e de terceiros.</li>
</ul>
<p>A guarda e o tratamento desses registros observarão a legislação aplicável e a <a href="/privacidade">Política de Privacidade</a>.</p>

<h2>13. Limitação de responsabilidade</h2>
<p>13.1 Sem prejuízo dos direitos legalmente assegurados ao consumidor, a Consulta Placa Brasil não se responsabiliza por:</p>
<ul>
  <li>decisões comerciais, financeiras, jurídicas ou negociais tomadas exclusivamente com base no relatório;</li>
  <li>negociações realizadas entre o usuário e terceiros;</li>
  <li>erro de digitação da placa pelo usuário;</li>
  <li>escolha equivocada do tipo de consulta pelo usuário;</li>
  <li>uso indevido, ilícito, abusivo ou desautorizado do relatório;</li>
  <li>compartilhamento indevido do relatório pelo usuário;</li>
  <li>informações incorretas, incompletas, desatualizadas ou omissas constantes de bases externas mantidas por terceiros, órgãos públicos, parceiros ou fornecedores;</li>
  <li>alterações posteriores nas bases consultadas após a geração do relatório;</li>
  <li>indisponibilidade temporária de fontes externas, sistemas governamentais, provedores, meios de pagamento ou serviços de terceiros;</li>
  <li>fato exclusivo do usuário;</li>
  <li>fato exclusivo de terceiro;</li>
  <li>caso fortuito ou força maior.</li>
</ul>
<p>13.2 Esta cláusula não afasta a responsabilidade da Consulta Placa Brasil por defeito na prestação do serviço que lhe seja diretamente imputável, nem restringe direitos previstos na legislação de defesa do consumidor.</p>

<h2>14. Relatórios gerados conforme disponibilidade das fontes</h2>
<p>14.1 O usuário reconhece que o relatório será gerado conforme as informações disponíveis nas fontes consultadas no momento da consulta.</p>
<p>14.2 A eventual ausência de dados, redução de conteúdo, indisponibilidade de determinada base ou limitação de informações disponíveis não caracteriza, por si só, falha da Consulta Placa Brasil, desde que o relatório tenha sido gerado conforme as fontes efetivamente acessíveis no momento da contratação.</p>
<p>14.3 Caso haja falha técnica comprovada, indisponibilidade do serviço sem entrega do relatório, cobrança indevida, vício ou descumprimento da oferta, o usuário poderá solicitar análise nos termos da <a href="/reembolso">Política de Reembolso</a>.</p>

<h2>15. Propriedade intelectual</h2>
<p>15.1 Os relatórios, textos, organização das informações, layout, marca, identidade visual, sistema, funcionalidades, bases estruturadas, documentos e demais conteúdos disponibilizados pela Consulta Placa Brasil são protegidos por direitos de propriedade intelectual.</p>
<p>15.2 É vedada a cópia, reprodução, distribuição, revenda, cessão, sublicenciamento, raspagem, extração automatizada, exploração comercial ou utilização não autorizada dos relatórios e conteúdos da plataforma.</p>
<p>15.3 A contratação de uma consulta não transfere ao usuário qualquer direito de propriedade intelectual sobre a plataforma, relatórios, sistema, marca, layout ou estrutura de informações da Consulta Placa Brasil.</p>

<h2>16. Relação com os demais documentos da plataforma</h2>
<p>16.1 Este Aviso Legal complementa os <a href="/termos">Termos de Uso e Serviço</a>, a <a href="/privacidade">Política de Privacidade</a>, a <a href="/cookies">Política de Cookies</a> e a <a href="/reembolso">Política de Reembolso</a>.</p>
<p>16.2 Em caso de dúvida sobre contratação, execução imediata da consulta, reembolso, tratamento de dados pessoais, uso de cookies, responsabilidade do usuário, limitação de responsabilidade ou uso adequado da plataforma, deverão ser consultados os documentos específicos da Consulta Placa Brasil.</p>
<p>16.3 Em caso de conflito entre este Aviso Legal e os demais documentos, deverá prevalecer a interpretação que melhor compatibilize a natureza informativa do serviço, os direitos do consumidor, a proteção de dados pessoais, a boa-fé, a segurança da plataforma e a legislação aplicável.</p>

<h2>17. Alterações deste Aviso Legal</h2>
<p>17.1 A Consulta Placa Brasil poderá atualizar este Aviso Legal a qualquer tempo para refletir alterações legais, regulatórias, técnicas, operacionais, comerciais ou de funcionamento da plataforma.</p>
<p>17.2 A versão vigente estará sempre disponível na plataforma, com indicação da data de última atualização.</p>
<p>17.3 Alterações relevantes poderão ser comunicadas por meio do site, e-mail, área logada ou outro canal adequado.</p>

<h2>18. Contato</h2>
<p>18.1 Dúvidas sobre este Aviso Legal ou sobre a utilização da plataforma poderão ser encaminhadas pelos seguintes canais:</p>
<ul>
  <li><strong>E-mail:</strong> <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a></li>
  <li><strong>Telefone:</strong> (61) 3246-9277</li>
  <li><strong>Endereço:</strong> Setor SRTVS Quadra 701, Conj. L, Bloco 01, nº 38, Asa Sul, Brasília/DF, CEP 70340-000.</li>
</ul>
`;

export default async function AvisoLegalPage() {
  const page = await getPageBySlug("aviso-legal");
  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Aviso Legal"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "22 de junho de 2026"}</p>
        </div>
      </section>
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="legal-content mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }} />
      </section>
    </div>
  );
}
