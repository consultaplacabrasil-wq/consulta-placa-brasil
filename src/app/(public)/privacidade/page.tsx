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
<p>A presente Política de Privacidade descreve como a <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, pessoa jurídica de direito privado inscrita no CNPJ sob n. 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 1, n. 38, Asa Sul, Brasília/DF, CEP 70340-000, coleta, utiliza, armazena, compartilha, protege e elimina dados pessoais no contexto da utilização de sua plataforma de consulta de informações veiculares.</p>
<p>Esta Política foi elaborada em conformidade com a legislação aplicável, especialmente a <strong>Lei Geral de Proteção de Dados Pessoais - LGPD</strong>, o Marco Civil da Internet, o Código de Defesa do Consumidor e as normas aplicáveis ao comércio eletrônico.</p>
<p>Ao acessar, navegar, cadastrar-se, contratar consultas, efetuar pagamentos, gerar relatórios ou utilizar qualquer funcionalidade da plataforma, o usuário declara estar ciente das práticas de tratamento de dados descritas nesta Política. Caso não concorde, deverá se abster de utilizar a plataforma.</p>

<h2>1. Objetivo</h2>
<p>1.1 Esta Política tem por objetivo informar, de forma clara e transparente, quais dados pessoais são tratados pela Consulta Placa Brasil, para quais finalidades, com quais bases legais, com quem podem ser compartilhados, por quanto tempo podem ser armazenados e quais direitos podem ser exercidos pelos titulares.</p>
<p>1.2 Além disso, esta Política busca demonstrar o compromisso da Consulta Placa Brasil com a proteção de dados pessoais, a segurança da informação, a prevenção a fraudes, a utilização responsável da plataforma e a mitigação de riscos relacionados ao uso indevido de informações veiculares.</p>

<h2>2. Definições Importantes</h2>
<p>2.1 Para fins desta Política, considera-se:</p>
<ul>
  <li><strong>Dados pessoais:</strong> informações relacionadas à pessoa natural identificada ou identificável.</li>
  <li><strong>Dados pessoais sensíveis:</strong> dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou organização de caráter religioso, filosófico ou político, dados referentes à saúde ou vida sexual, dados genéticos ou biométricos, quando vinculados a pessoa natural.</li>
  <li><strong>Titular:</strong> pessoa natural a quem se referem os dados pessoais tratados.</li>
  <li><strong>Controlador:</strong> pessoa natural ou jurídica responsável pelas decisões referentes ao tratamento de dados pessoais.</li>
  <li><strong>Operador:</strong> pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do controlador.</li>
  <li><strong>Tratamento:</strong> toda operação realizada com dados pessoais, incluindo coleta, acesso, armazenamento, consulta, uso, compartilhamento, transmissão, eliminação, arquivamento ou qualquer outra forma de utilização.</li>
  <li><strong>Plataforma:</strong> site, sistema, ambiente eletrônico, ferramentas, interfaces e funcionalidades disponibilizados pela Consulta Placa Brasil.</li>
  <li><strong>Relatório:</strong> documento digital de caráter informativo gerado a partir da consulta de placa veicular realizada pelo usuário.</li>
  <li><strong>Fontes externas:</strong> bases públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores utilizadas para obtenção de informações veiculares, conforme disponibilidade técnica, contratual e jurídica.</li>
</ul>

<h2>3. Quem é o Controlador dos Dados</h2>
<p>3.1 A Consulta Placa Brasil Ltda. atua, em regra, como <strong>controladora</strong> dos dados pessoais tratados no ambiente da plataforma, pois define as finalidades e os meios essenciais do tratamento de dados relacionados ao cadastro, contratação, pagamento, geração de relatórios, atendimento, segurança, prevenção a fraudes e exercício regular de direitos.</p>
<p>3.2 Em determinadas situações, terceiros contratados pela Consulta Placa Brasil poderão atuar como <strong>operadores</strong>, tratando dados pessoais em nome da empresa, tais como provedores de hospedagem, infraestrutura tecnológica, gateways de pagamento, ferramentas de atendimento, fornecedores de e-mail, ferramentas antifraude e prestadores de suporte técnico.</p>
<p>3.3 Também poderão existir situações em que determinados terceiros atuem como <strong>controladores independentes</strong>, especialmente meios de pagamento, instituições financeiras, órgãos públicos, parceiros de dados ou fornecedores externos que possuam suas próprias bases, políticas, responsabilidades e finalidades de tratamento.</p>

<h2>4. Encarregado e canal de privacidade</h2>
<p>4.1 Para tratar de assuntos relacionados à proteção de dados pessoais, exercício de direitos dos titulares, esclarecimentos sobre esta Política ou solicitações relacionadas à LGPD, o usuário poderá entrar em contato pelo seguinte canal: e-mail <a href="mailto:privacidade@consultaplacabrasil.com">privacidade@consultaplacabrasil.com</a> / telefone (61) 3246-9277.</p>
<p>4.2 Recomenda-se que as solicitações relacionadas à privacidade contenham, sempre que possível, nome completo, e-mail cadastrado, CPF/CNPJ, descrição objetiva da solicitação e informações suficientes para identificação segura do titular e da contratação relacionada.</p>
<p>4.3 A Consulta Placa Brasil poderá solicitar informações complementares para confirmar a identidade do solicitante, prevenir fraudes, evitar acesso indevido a dados de terceiros e assegurar que a solicitação seja atendida de forma segura.</p>

<h2>5. Quais dados podemos coletar</h2>
<p>5.1 A Consulta Placa Brasil poderá coletar e tratar diferentes categorias de dados pessoais, conforme a forma de utilização da plataforma pelo usuário.</p>
<p>5.2 Poderão ser coletados os <strong>dados fornecidos diretamente pelo usuário</strong> (dados cadastrais), tais como:</p>
<ul>
  <li>nome completo ou razão social;</li>
  <li>CPF ou CNPJ;</li>
  <li>e-mail;</li>
  <li>telefone;</li>
  <li>endereço, quando necessário;</li>
  <li>dados de login, senha e autenticação;</li>
  <li>informações fornecidas em formulários, cadastros, solicitações ou comunicações com a plataforma.</li>
</ul>
<p>5.3 Para viabilizar a contratação dos serviços, poderão ser tratados <strong>dados relacionados ao pagamento</strong>, tais como:</p>
<ul>
  <li>forma de pagamento utilizada;</li>
  <li>status da transação;</li>
  <li>identificador da compra;</li>
  <li>data e horário do pagamento;</li>
  <li>valor pago;</li>
  <li>comprovantes, recibos ou informações fiscais;</li>
  <li>dados necessários à prevenção de fraude, contestação, estorno ou chargeback.</li>
</ul>
<p>5.4 A Consulta Placa Brasil não armazena dados completos de cartão de crédito, salvo se houver tecnologia própria ou fornecedor contratado que permita armazenamento seguro e em conformidade com os padrões aplicáveis. Em regra, os dados completos de cartão são processados diretamente por gateway, instituição de pagamento ou parceiro financeiro contratado.</p>
<p>5.5 Em razão da natureza do serviço, poderão ser tratados <strong>dados relacionados às consultas realizadas</strong>, tais como:</p>
<ul>
  <li>placa informada pelo usuário;</li>
  <li>tipo de consulta contratada;</li>
  <li>data e horário da consulta;</li>
  <li>relatório gerado;</li>
  <li>histórico de consultas;</li>
  <li>créditos, pacotes ou serviços utilizados;</li>
  <li>status da geração do relatório;</li>
  <li>registros de acesso ao relatório;</li>
  <li>informações necessárias para comprovar a entrega do serviço contratado.</li>
</ul>
<p>5.6 A Consulta Placa Brasil reconhece que placas consultadas, histórico de consultas e relatórios gerados podem, em determinados contextos, estar associados ou ser associáveis a pessoa natural identificada ou identificável. Por essa razão, tais informações serão tratadas com cautela, finalidade legítima, controles de acesso e medidas de segurança compatíveis com os riscos envolvidos.</p>
<p>5.7 Durante o acesso e utilização da plataforma, poderão ser coletados <strong>dados técnicos e registros eletrônicos</strong>, tais como:</p>
<ul>
  <li>endereço IP;</li>
  <li>data e horário de acesso;</li>
  <li>navegador utilizado;</li>
  <li>sistema operacional;</li>
  <li>tipo de dispositivo;</li>
  <li>identificadores técnicos;</li>
  <li>localização aproximada derivada do IP, quando aplicável;</li>
  <li>eventos de navegação;</li>
  <li>páginas acessadas;</li>
  <li>logs de sistema;</li>
  <li>registros de aceite dos Termos de Uso, desta Política e demais documentos aplicáveis;</li>
  <li>versão dos documentos aceita pelo usuário;</li>
  <li>registros de contratação, pagamento, geração de relatório e atendimento.</li>
</ul>
<p>5.8 Os registros indicados no item 5.7 são utilizados para segurança, prevenção a fraudes, comprovação da contratação eletrônica, cumprimento legal, atendimento ao usuário, melhoria da plataforma e exercício regular de direitos.</p>
<p>5.9 Quando o usuário entra em contato com a Consulta Placa Brasil, poderão ser tratados <strong>dados de atendimento e suporte</strong> como: nome; e-mail; telefone; conteúdo da solicitação; documentos eventualmente encaminhados; registros de reclamações; pedidos de cancelamento, reembolso ou suporte; comunicações por e-mail, telefone, WhatsApp, chat, formulário ou outros canais; e histórico de atendimento.</p>
<p>5.10 A plataforma poderá utilizar cookies, pixels, identificadores, ferramentas analíticas, recursos antifraude, tecnologias de monitoramento de segurança e mecanismos semelhantes para viabilizar o funcionamento do site, autenticar usuários, melhorar a experiência, prevenir fraudes, medir desempenho, manter preferências e, quando aplicável, realizar comunicações ou campanhas. Veja a <a href="/cookies">Política de Cookies</a>.</p>

<h2>6. Dados obtidos de fontes externas</h2>
<p>6.1 A Consulta Placa Brasil presta serviço de organização, consolidação e disponibilização de informações veiculares obtidas a partir de fontes externas lícitas, públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores, conforme disponibilidade técnica, contratual e jurídica.</p>
<p>6.2 Os relatórios podem conter informações provenientes dessas fontes externas, de acordo com a disponibilidade no momento da consulta.</p>
<p>6.3 A Consulta Placa Brasil não é responsável pela geração primária, atualização originária, manutenção ou correção dos dados brutos constantes das bases externas consultadas, cabendo tal responsabilidade às respectivas fontes, órgãos, entidades, parceiros ou fornecedores.</p>
<p>6.4 As informações provenientes de fontes externas são disponibilizadas conforme se encontram disponíveis no momento da geração do relatório, podendo conter divergências, omissões, atrasos de atualização, inconsistências ou alterações posteriores decorrentes das respectivas bases de dados.</p>

<h2>7. Como coletamos os dados</h2>
<p>7.1 Os dados pessoais poderão ser coletados das seguintes formas:</p>
<ul>
  <li>diretamente do usuário, no cadastro, contratação, pagamento, atendimento ou uso da plataforma;</li>
  <li>automaticamente, durante a navegação e utilização da plataforma, por meio de logs, cookies, identificadores técnicos e registros eletrônicos;</li>
  <li>por meio de parceiros, fornecedores de tecnologia, meios de pagamento, ferramentas antifraude e prestadores de serviços contratados;</li>
  <li>por meio de fontes externas lícitas utilizadas para geração dos relatórios veiculares;</li>
  <li>por meio de comunicações enviadas pelo usuário aos canais de atendimento;</li>
  <li>por meio de autoridades, órgãos públicos, reclamações administrativas, demandas judiciais ou procedimentos necessários ao exercício regular de direitos.</li>
</ul>

<h2>8. Para quais finalidades tratamos dados pessoais</h2>
<p>8.1 A Consulta Placa Brasil poderá tratar dados pessoais para as seguintes finalidades:</p>
<ul>
  <li>criar, autenticar e gerenciar conta de usuário;</li>
  <li>identificar o usuário e prevenir contratações fraudulentas;</li>
  <li>viabilizar a contratação de consultas veiculares;</li>
  <li>processar pagamentos, estornos, créditos, reembolsos e contestação de transações;</li>
  <li>gerar, disponibilizar e armazenar relatórios contratados;</li>
  <li>manter histórico de consultas para fins de atendimento, segurança, comprovação da prestação do serviço e exercício regular de direitos;</li>
  <li>prestar suporte técnico e atendimento ao usuário;</li>
  <li>responder dúvidas, reclamações, solicitações de cancelamento, reembolso ou acesso a relatórios;</li>
  <li>enviar comunicações operacionais relacionadas ao serviço, como confirmação de contratação, pagamento, geração de relatório, alterações relevantes, segurança e atendimento;</li>
  <li>prevenir fraudes, abusos, chargebacks indevidos, uso automatizado, scraping, revenda irregular, acesso não autorizado e utilização ilícita da plataforma;</li>
  <li>monitorar a segurança, estabilidade, integridade e disponibilidade da plataforma;</li>
  <li>cumprir obrigações legais, regulatórias, fiscais, contábeis, judiciais ou administrativas;</li>
  <li>resguardar direitos da Consulta Placa Brasil, dos usuários ou de terceiros em processos administrativos, judiciais, arbitrais, reclamações consumeristas, procedimentos de chargeback ou apurações de fraude;</li>
  <li>colaborar com autoridades competentes, quando houver base legal para tanto;</li>
  <li>melhorar funcionalidades, desempenho, usabilidade, segurança e experiência do usuário;</li>
  <li>realizar análises estatísticas, preferencialmente de forma anonimizada ou agregada;</li>
  <li>enviar comunicações comerciais, promocionais ou informativas, quando houver base legal adequada e possibilidade de oposição pelo usuário, quando aplicável.</li>
</ul>

<h2>9. Bases legais utilizadas</h2>
<p>9.1 O tratamento de dados pessoais pela Consulta Placa Brasil será realizado com fundamento nas bases legais previstas na legislação aplicável, conforme a finalidade específica.</p>
<p>9.2 De forma geral, poderão ser utilizadas as seguintes bases legais:</p>
<ul>
  <li><strong>Execução de contrato</strong> ou procedimentos preliminares, para cadastro, contratação, pagamento, geração de relatório, entrega do serviço e atendimento relacionado à consulta contratada;</li>
  <li><strong>Cumprimento de obrigação legal ou regulatória</strong>, para guarda de registros obrigatórios, atendimento de determinações legais, cumprimento de obrigações fiscais, contábeis, consumeristas, administrativas ou judiciais;</li>
  <li><strong>Exercício regular de direitos</strong>, para defesa da Consulta Placa Brasil, dos usuários ou de terceiros em processos administrativos, judiciais, arbitrais, reclamações, chargebacks, apuração de fraudes ou incidentes;</li>
  <li><strong>Legítimo interesse</strong>, para prevenção a fraudes, segurança da plataforma, melhoria dos serviços, registros operacionais, proteção contra uso indevido, comunicações operacionais e preservação da integridade da plataforma, sempre observados os direitos e liberdades fundamentais dos titulares;</li>
  <li><strong>Consentimento</strong>, quando necessário para finalidades específicas, como determinados cookies não essenciais, comunicações comerciais ou outras operações que dependam de manifestação livre, informada e inequívoca do titular;</li>
  <li><strong>Proteção do crédito</strong>, quando aplicável a mecanismos de prevenção de inadimplência, fraude, chargeback ou análise de risco vinculada à contratação.</li>
</ul>
<p>9.3 A Consulta Placa Brasil buscará utilizar a base legal mais adequada para cada operação de tratamento, observados os princípios da finalidade, adequação, necessidade, transparência e prevenção.</p>

<h2>10. Dados pessoais sensíveis</h2>
<p>10.1 A plataforma da Consulta Placa Brasil não tem por finalidade coletar ou tratar dados pessoais sensíveis, assim entendidos aqueles definidos pela Lei Geral de Proteção de Dados Pessoais.</p>
<p>10.2 O usuário deverá evitar o envio de dados pessoais sensíveis pelos canais de atendimento, formulários, e-mails, mensagens ou quaisquer outros meios de comunicação com a Consulta Placa Brasil, salvo quando tais informações forem estritamente necessárias para análise de solicitação específica.</p>
<p>10.3 Caso o usuário encaminhe espontaneamente dados pessoais sensíveis, a Consulta Placa Brasil poderá tratá-los apenas de forma excepcional, limitada e proporcional, na medida necessária para analisar a solicitação apresentada, cumprir obrigação legal ou regulatória, exercer regularmente direitos em processo judicial, administrativo ou arbitral, prevenir fraude ou garantir a segurança do titular, sempre observadas as hipóteses legais aplicáveis ao tratamento de dados sensíveis previstas na LGPD.</p>
<p>10.4 Quando os dados sensíveis enviados espontaneamente forem desnecessários para a finalidade da solicitação, a Consulta Placa Brasil poderá descartá-los, eliminá-los, anonimizá-los ou solicitar ao usuário o reenvio da demanda sem tais informações, conforme o caso e observados os deveres legais de conservação.</p>
<p>10.5 O tratamento de dados pessoais sensíveis não será realizado para finalidades comerciais, promocionais, perfilamento, enriquecimento cadastral ou qualquer finalidade incompatível com a solicitação apresentada pelo usuário e com a legislação aplicável.</p>

<h2>11. Crianças e adolescentes</h2>
<p>11.1 A plataforma e os serviços da Consulta Placa Brasil são destinados a pessoas juridicamente capazes de contratar.</p>
<p>11.2 Menores de idade não deverão utilizar a plataforma, realizar cadastro, efetuar pagamentos ou contratar consultas sem a representação ou assistência de seus responsáveis legais, conforme aplicável.</p>
<p>11.3 Caso a Consulta Placa Brasil identifique tratamento indevido de dados de criança ou adolescente, poderá adotar medidas para bloqueio, exclusão, anonimização ou regularização dos dados, conforme o caso.</p>

<h2>12. Compartilhamento de dados</h2>
<p>12.1 A Consulta Placa Brasil <strong>não vende dados pessoais</strong> dos usuários.</p>
<p>12.2 Os dados pessoais poderão ser compartilhados apenas quando necessário, adequado e compatível com as finalidades informadas nesta Política, especialmente com:</p>
<ul>
  <li>gateways, intermediadores, instituições de pagamento, adquirentes, bancos e prestadores de serviços financeiros;</li>
  <li>provedores de hospedagem, infraestrutura em nuvem, armazenamento, segurança, backup e suporte técnico;</li>
  <li>fornecedores de e-mail, mensageria, atendimento, CRM, chat, WhatsApp corporativo ou ferramentas equivalentes;</li>
  <li>ferramentas antifraude, autenticação, prevenção a chargeback, monitoramento de segurança e análise de risco;</li>
  <li>fornecedores, parceiros ou fontes externas responsáveis pela disponibilização de dados veiculares;</li>
  <li>prestadores de serviços de tecnologia, manutenção, desenvolvimento, análise de desempenho e melhoria da plataforma;</li>
  <li>assessores jurídicos, contadores, auditores, consultores e prestadores necessários ao cumprimento de obrigações legais ou defesa de direitos;</li>
  <li>órgãos públicos, autoridades administrativas, policiais, judiciais, regulatórias ou de proteção ao consumidor, quando houver obrigação legal, ordem válida, solicitação legítima ou necessidade de exercício regular de direitos;</li>
  <li>terceiros envolvidos em operações societárias, reorganizações, fusões, aquisições ou transferência de ativos, desde que observada a legislação aplicável e a proteção adequada dos dados.</li>
</ul>
<p>12.3 O compartilhamento será limitado ao necessário para cumprimento da finalidade correspondente, observadas medidas de segurança e, quando aplicável, instrumentos contratuais adequados com operadores e parceiros.</p>

<h2>13. Transferência internacional de dados</h2>
<p>13.1 A Consulta Placa Brasil poderá utilizar fornecedores de tecnologia, hospedagem, e-mail, atendimento, analytics, segurança, antifraude, meios de pagamento ou infraestrutura que armazenem ou tratem dados pessoais fora do Brasil.</p>
<p>13.2 Nessas hipóteses, a transferência internacional de dados será realizada em conformidade com a legislação aplicável e mediante adoção de mecanismos adequados de proteção, tais como cláusulas contratuais, padrões de segurança, salvaguardas técnicas, avaliações de conformidade ou outros instrumentos juridicamente admitidos.</p>
<p>13.3 A Consulta Placa Brasil buscará contratar fornecedores que adotem padrões compatíveis de segurança, confidencialidade e proteção de dados pessoais.</p>

<h2>14. Cookies e tecnologias semelhantes</h2>
<p>14.1 A plataforma poderá utilizar cookies e tecnologias semelhantes para diferentes finalidades.</p>
<p>14.2 Os <strong>cookies necessários</strong> são essenciais para o funcionamento da plataforma, autenticação, segurança, processamento de consultas, manutenção de sessão, prevenção a fraudes e viabilização da contratação. Sem esses cookies, determinadas funcionalidades podem não funcionar corretamente.</p>
<p>14.3 Os <strong>cookies de desempenho e análise</strong> podem ser utilizados para compreender como os usuários interagem com a plataforma, medir acessos, identificar erros, avaliar desempenho, melhorar funcionalidades e aperfeiçoar a experiência de navegação.</p>
<p>14.4 Os <strong>cookies de funcionalidade</strong> podem ser utilizados para lembrar preferências do usuário, configurações, dados de sessão e escolhas realizadas na plataforma.</p>
<p>14.5 Os <strong>cookies de marketing</strong>, quando utilizados, podem permitir a exibição de comunicações, campanhas ou conteúdos personalizados, observada a base legal aplicável e a possibilidade de gerenciamento de preferências pelo usuário.</p>
<p>14.6 A plataforma poderá utilizar cookies, identificadores técnicos, logs e mecanismos semelhantes para detectar comportamento suspeito, impedir consultas automatizadas, prevenir scraping, bloquear acessos indevidos, evitar fraudes de pagamento e proteger a integridade do serviço.</p>
<p>14.7 O usuário poderá gerenciar cookies nas configurações de seu navegador ou por ferramenta específica eventualmente disponibilizada pela plataforma. Consulte a <a href="/cookies">Política de Cookies</a>. A desativação de cookies necessários poderá comprometer o funcionamento do site.</p>

<h2>15. Registros eletrônicos, logs e prova da contratação</h2>
<p>15.1 A Consulta Placa Brasil poderá manter registros eletrônicos relacionados ao acesso e uso da plataforma, incluindo IP, data, horário, dispositivo, navegador, eventos de navegação, aceite dos Termos de Uso, aceite desta Política, versão aceita, contratação, pagamento, geração de relatório, histórico de consulta, atendimento e demais registros operacionais.</p>
<p>15.2 Esses registros poderão ser utilizados para: comprovar a contratação eletrônica; demonstrar o aceite dos documentos aplicáveis; comprovar a geração e disponibilização do relatório; prevenir fraudes e chargebacks indevidos; apurar uso ilícito, automatizado ou abusivo da plataforma; atender solicitações de usuários; cumprir obrigações legais ou regulatórias; resguardar direitos em processos administrativos, judiciais ou arbitrais; e colaborar com autoridades competentes, quando cabível.</p>
<p>15.3 A guarda desses registros observará a legislação aplicável, critérios de necessidade, segurança, proporcionalidade e finalidade legítima.</p>

<h2>16. Prevenção a fraudes, segurança e uso indevido</h2>
<p>16.1 A Consulta Placa Brasil poderá tratar dados pessoais e registros eletrônicos para prevenir, detectar e apurar:</p>
<ul>
  <li>fraudes de pagamento;</li>
  <li>uso de dados falsos ou de terceiros;</li>
  <li>chargeback abusivo ou fraudulento;</li>
  <li>consultas automatizadas, scraping, mineração ou extração indevida de dados;</li>
  <li>revenda não autorizada de relatórios;</li>
  <li>formação indevida de banco de dados;</li>
  <li>acesso não autorizado;</li>
  <li>utilização da plataforma para localização, perseguição, assédio, vigilância, discriminação, ameaça, fraude, clonagem, adulteração ou qualquer finalidade ilícita;</li>
  <li>violações aos Termos de Uso, a esta Política ou à legislação aplicável.</li>
</ul>
<p>16.2 Para as finalidades apontadas no item 16.1, a plataforma poderá utilizar mecanismos técnicos, regras de segurança, ferramentas antifraude, análise de padrões de uso, limitação de consultas, bloqueios preventivos, validações cadastrais e medidas de autenticação.</p>
<p>16.3 A Consulta Placa Brasil não divulgará detalhes técnicos de seus mecanismos de segurança quando isso puder comprometer a efetividade das medidas antifraude e de proteção da plataforma.</p>

<h2>17. Responsabilidade do usuário pelo uso dos dados e relatórios</h2>
<p>17.1 O usuário é responsável pela licitude, legitimidade e finalidade das consultas realizadas na plataforma.</p>
<p>17.2 O usuário compromete-se a não utilizar a plataforma, os relatórios ou quaisquer informações obtidas por meio do serviço para:</p>
<ul>
  <li>identificar indevidamente proprietário, condutor, endereço, telefone, CPF, familiares, rotina ou localização de pessoa natural;</li>
  <li>perseguir, assediar, ameaçar, constranger, discriminar, vigiar ou monitorar terceiros;</li>
  <li>praticar fraude, estelionato, clonagem, adulteração, receptação ou qualquer ilícito civil, administrativo ou penal;</li>
  <li>formar banco de dados próprio, enriquecer cadastros, realizar marketing, cobrança, perfilamento ou prospecção comercial sem base legal;</li>
  <li>revender, compartilhar comercialmente ou explorar relatórios sem autorização;</li>
  <li>violar a privacidade, a proteção de dados pessoais ou direitos de terceiros.</li>
</ul>
<p>17.3 O uso indevido dos dados e relatórios poderá gerar responsabilização civil, administrativa e criminal do usuário, além de bloqueio de acesso, suspensão de conta, preservação de registros e comunicação às autoridades competentes, quando cabível.</p>

<h2>18. Armazenamento e prazo de retenção</h2>
<p>18.1 Os dados pessoais serão armazenados pelo tempo necessário ao cumprimento das finalidades informadas nesta Política, observadas as exigências legais, regulatórias, contratuais e o exercício regular de direitos.</p>
<p>18.2 De forma geral:</p>
<ul>
  <li>dados cadastrais poderão ser mantidos enquanto a conta estiver ativa e pelo período necessário ao cumprimento de obrigações legais, atendimento, prevenção a fraudes e defesa de direitos;</li>
  <li>dados de pagamento poderão ser mantidos pelo prazo necessário à comprovação da contratação, cumprimento de obrigações fiscais, contábeis, financeiras, prevenção a fraudes, estornos, chargebacks e exercício regular de direitos;</li>
  <li>placas consultadas, histórico de consultas e relatórios gerados poderão ser mantidos pelo prazo necessário para comprovar a prestação do serviço, permitir atendimento ao usuário, prevenir fraudes, apurar uso indevido, cumprir obrigações legais e resguardar direitos;</li>
  <li>registros eletrônicos e logs poderão ser mantidos pelo prazo necessário ao cumprimento legal, segurança da plataforma, prevenção a fraudes, investigação de uso indevido e exercício regular de direitos;</li>
  <li>dados de atendimento poderão ser mantidos pelo prazo necessário à resposta da solicitação, histórico de relacionamento, cumprimento legal e defesa de direitos;</li>
  <li>dados tratados com base no consentimento poderão ser eliminados após a revogação, salvo quando houver outra base legal que autorize a conservação.</li>
</ul>
<p>18.3 Encerrado o prazo de retenção ou cessada a finalidade de tratamento, os dados pessoais poderão ser eliminados, anonimizados ou mantidos quando houver fundamento legal para conservação.</p>

<h2>19. Segurança da informação</h2>
<p>19.1 A Consulta Placa Brasil adota medidas técnicas e administrativas razoáveis e proporcionais para proteger os dados pessoais contra acessos não autorizados, perda, destruição, alteração, divulgação indevida, tratamento inadequado ou ilícito.</p>
<p>19.2 Essas medidas poderão incluir, conforme aplicável: controle de acesso; gestão de credenciais; criptografia ou mecanismos equivalentes; armazenamento seguro de senhas; monitoramento de logs; mecanismos antifraude; limitação de acesso por necessidade; backups; segregação de permissões; atualização de sistemas; medidas de segurança em fornecedores; e procedimentos internos de privacidade e proteção de dados.</p>
<p>19.3 Apesar das medidas adotadas, nenhum ambiente digital é absolutamente imune a riscos. O usuário também deve adotar boas práticas de segurança, como proteger suas credenciais, utilizar senhas fortes, não compartilhar sua conta e comunicar imediatamente qualquer suspeita de acesso indevido.</p>

<h2>20. Incidentes de segurança</h2>
<p>20.1 Caso ocorra incidente de segurança envolvendo dados pessoais que possa acarretar risco ou dano relevante aos titulares, a Consulta Placa Brasil adotará as medidas técnicas, administrativas e jurídicas cabíveis para avaliar, conter, mitigar e remediar os impactos.</p>
<p>20.2 Quando aplicável, a Consulta Placa Brasil realizará as comunicações necessárias à Autoridade Nacional de Proteção de Dados, aos titulares afetados ou a outras autoridades competentes, nos termos da legislação vigente.</p>
<p>20.3 A Consulta Placa Brasil poderá manter registros internos de incidentes de segurança, medidas adotadas, avaliações realizadas e providências implementadas para fins de responsabilização, prestação de contas, prevenção e melhoria contínua.</p>

<h2>21. Direitos dos titulares</h2>
<p>21.1 Nos termos da legislação aplicável, o titular dos dados pessoais poderá solicitar:</p>
<ul>
  <li>confirmação da existência de tratamento;</li>
  <li>acesso aos dados pessoais;</li>
  <li>correção de dados incompletos, inexatos ou desatualizados;</li>
  <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a legislação;</li>
  <li>portabilidade dos dados, quando regulamentada e aplicável;</li>
  <li>informação sobre compartilhamento de dados;</li>
  <li>informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;</li>
  <li>revogação do consentimento, quando o tratamento estiver baseado nessa hipótese legal;</li>
  <li>eliminação dos dados tratados com fundamento no consentimento, ressalvadas as hipóteses legais de conservação;</li>
  <li>oposição a tratamento realizado em desconformidade com a legislação;</li>
  <li>revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais, quando aplicável;</li>
  <li>peticionamento perante a Autoridade Nacional de Proteção de Dados.</li>
</ul>
<p>21.2 O exercício desses direitos poderá ser solicitado pelo canal de privacidade indicado nesta Política ou pela página <a href="/lgpd">LGPD</a>.</p>

<h2>22. Como atenderemos solicitações dos titulares</h2>
<p>22.1 A Consulta Placa Brasil analisará as solicitações recebidas e responderá em prazo compatível com a legislação aplicável e com a complexidade da demanda.</p>
<p>22.2 Para proteger a privacidade e a segurança dos titulares, a empresa poderá solicitar informações adicionais para confirmar a identidade do solicitante e evitar que dados pessoais sejam fornecidos a terceiros não autorizados.</p>
<p>22.3 Determinadas solicitações poderão não ser atendidas integralmente quando houver fundamento legal para conservação dos dados, como cumprimento de obrigação legal, prevenção a fraudes, exercício regular de direitos, proteção da plataforma, preservação de provas ou atendimento de ordem judicial, administrativa ou regulatória.</p>
<p>22.4 Quando não for possível atender determinada solicitação, a Consulta Placa Brasil informará, sempre que cabível, as razões aplicáveis.</p>

<h2>23. Decisões automatizadas e mecanismos antifraude</h2>
<p>23.1 A Consulta Placa Brasil poderá utilizar mecanismos automatizados ou semi-automatizados para segurança, prevenção a fraudes, validação de transações, identificação de uso abusivo, bloqueio de consultas automatizadas, limitação de acesso, detecção de chargeback indevido e proteção da plataforma.</p>
<p>23.2 Esses mecanismos não têm por finalidade produzir discriminação, violar direitos ou impedir indevidamente o acesso do usuário ao serviço, mas proteger a plataforma, os usuários, os dados tratados e a regularidade da contratação.</p>
<p>23.3 Quando houver decisão tomada unicamente com base em tratamento automatizado de dados pessoais que afete interesses do titular, este poderá solicitar informações e revisão, nos termos da legislação aplicável.</p>

<h2>24. Comunicações com o usuário</h2>
<p>24.1 A Consulta Placa Brasil poderá utilizar os dados de contato fornecidos pelo usuário para enviar comunicações relacionadas a: cadastro; autenticação; confirmação de contratação; pagamento; geração e disponibilização de relatório; atendimento e suporte; segurança da conta; alterações relevantes nos Termos de Uso ou nesta Política; prevenção a fraudes; solicitações de privacidade; e comunicações comerciais, quando houver base legal adequada.</p>
<p>24.2 O usuário poderá solicitar o cancelamento do recebimento de comunicações comerciais, quando aplicável, sem prejuízo do envio de comunicações operacionais, transacionais, legais ou de segurança.</p>

<h2>25. Links, sites e serviços de terceiros</h2>
<p>25.1 A plataforma poderá conter links, integrações, ferramentas ou funcionalidades de terceiros, incluindo meios de pagamento, ferramentas de atendimento, analytics, provedores de tecnologia ou fontes externas.</p>
<p>25.2 A Consulta Placa Brasil não controla integralmente as práticas de privacidade de terceiros independentes. Por isso, recomenda-se que o usuário consulte as políticas de privacidade e termos aplicáveis aos serviços de terceiros eventualmente utilizados.</p>
<p>25.3 Esta Política aplica-se ao tratamento de dados realizado pela Consulta Placa Brasil no contexto da plataforma.</p>

<h2>26. Alterações desta política</h2>
<p>26.1 Esta Política poderá ser atualizada a qualquer tempo para refletir alterações legais, regulatórias, tecnológicas, operacionais, comerciais, de segurança ou de funcionamento da plataforma.</p>
<p>26.2 A versão vigente estará sempre disponível na plataforma, com indicação da data de última atualização.</p>
<p>26.3 Alterações relevantes poderão ser comunicadas de forma destacada, por meio do site, e-mail, aviso na área logada ou outro canal adequado.</p>
<p>26.4 Quando a alteração envolver nova finalidade de tratamento, nova base legal, compartilhamento relevante ou hipótese que exija consentimento específico, a Consulta Placa Brasil poderá solicitar nova manifestação do titular, quando necessário.</p>
<p>26.5 A continuidade do uso da plataforma após a publicação da nova versão poderá caracterizar ciência das alterações aplicáveis, sem prejuízo dos direitos legalmente assegurados ao titular.</p>

<h2>27. Relação com os termos de uso e serviços e demais políticas</h2>
<p>27.1 Esta Política de Privacidade integra o conjunto de documentos aplicáveis à utilização da plataforma, juntamente com os <a href="/termos">Termos de Uso e Serviço</a>, <a href="/reembolso">Política de Reembolso e Cancelamento</a>, <a href="/cookies">Política de Cookies</a> e demais avisos eventualmente disponibilizados.</p>
<p>27.2 Em caso de conflito entre esta Política e outros documentos da plataforma, deverá prevalecer a interpretação que melhor assegure a proteção de dados pessoais, a transparência ao titular, a segurança da informação e a conformidade com a legislação aplicável.</p>

<h2>28. Contato</h2>
<p>28.1 Para dúvidas, solicitações, reclamações ou exercício de direitos relacionados à proteção de dados pessoais, o usuário poderá entrar em contato por meio dos seguintes canais:</p>
<ul>
  <li><strong>Canal de privacidade:</strong> <a href="mailto:privacidade@consultaplacabrasil.com">privacidade@consultaplacabrasil.com</a></li>
  <li><strong>E-mail geral:</strong> <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a></li>
  <li><strong>Telefone:</strong> (61) 3246-9277</li>
  <li><strong>Endereço:</strong> Setor SRTVS Quadra 701, Conj. L, Bloco 01, n. 38, Asa Sul, Brasília/DF, CEP 70340-000.</li>
</ul>
`;

export default async function PrivacidadePage() {
  const page = await getPageBySlug("privacidade");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Política de Privacidade"}</h1>
          <p className="mt-3 text-gray-400">Última atualização: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString("pt-BR") : "22 de junho de 2026"}</p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div
          className="legal-content mx-auto max-w-4xl"
          dangerouslySetInnerHTML={{ __html: (page?.content && page.content.replace(/<[^>]*>/g, "").trim().length > 20) ? page.content : defaultContent }}
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
