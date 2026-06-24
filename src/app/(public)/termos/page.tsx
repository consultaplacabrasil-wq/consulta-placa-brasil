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
<p>Estes <strong>Termos de Uso e Serviços</strong> regulam o acesso, a navegação, o cadastro e a utilização da plataforma <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob nº 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 1, n. 38, Asa Sul, Brasília/DF, CEP 70340-000, telefone (61) 3246-9277, e-mail <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a>.</p>
<p>A utilização da plataforma pressupõe a leitura, compreensão e aceitação integral destes Termos de Uso e Serviços, da <a href="/privacidade">Política de Privacidade</a>, da <a href="/reembolso">Política de Reembolso e Cancelamento</a> e de outras políticas eventualmente disponibilizadas pela Consulta Placa Brasil.</p>
<p>Caso o usuário não concorde com qualquer disposição destes Termos, deverá se abster de acessar a plataforma, realizar cadastro, contratar consultas ou utilizar os serviços disponibilizados.</p>

<h2>1. Finalidade dos Termos</h2>
<p>1.1 Estes Termos têm por finalidade estabelecer as condições jurídicas, comerciais, operacionais e de segurança aplicáveis à utilização da plataforma Consulta Placa Brasil.</p>
<p>1.2 O documento busca assegurar transparência ao usuário, delimitar corretamente o serviço contratado, prevenir uso indevido da plataforma, proteger dados e informações, reduzir riscos de fraude, disciplinar pagamentos, cancelamentos e reembolsos, além de estabelecer responsabilidades compatíveis com a legislação aplicável.</p>

<h2>2. Definições</h2>
<p>2.1 Para fins destes Termos, considera-se:</p>
<ul>
  <li><strong>Plataforma:</strong> o site, sistema, ambiente eletrônico, aplicações, ferramentas, interfaces, funcionalidades e demais recursos digitais disponibilizados pela Consulta Placa Brasil.</li>
  <li><strong>Consulta Placa Brasil:</strong> a pessoa jurídica responsável pela operação da plataforma e pela prestação do serviço, nos limites destes Termos.</li>
  <li><strong>Usuário:</strong> toda pessoa física ou jurídica que acessa, navega, realiza cadastro, contrata, paga, solicita consulta, gera relatório ou utiliza qualquer funcionalidade da plataforma.</li>
  <li><strong>Serviços:</strong> consulta de informações veiculares a partir da placa do veículo informada pelo usuário, com geração de relatório digital, de caráter informativo.</li>
  <li><strong>Relatório:</strong> documento digital gerado pela plataforma a partir da consulta realizada, contendo informações veiculares disponíveis nas fontes acessadas no momento da geração.</li>
  <li><strong>Fontes de dados:</strong> bases públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores, acessadas de forma lícita e conforme disponibilidade técnica, contratual e jurídica.</li>
  <li><strong>Dados pessoais:</strong> informações relacionadas à pessoa natural identificada ou identificável, nos termos da legislação de proteção de dados.</li>
  <li><strong>Uso indevido:</strong> qualquer utilização da plataforma, dos relatórios ou das informações consultadas em desconformidade com estes Termos, com a legislação vigente, com direitos de terceiros ou com a finalidade legítima do serviço.</li>
</ul>

<h2>3. Aceitação dos Termos e contratação eletrônica</h2>
<p>3.1 Ao acessar a plataforma, realizar cadastro, contratar consulta, efetuar o pagamento, gerar relatório ou utilizar qualquer funcionalidade do serviço, o usuário declara que leu, compreendeu e aceitou integralmente estes Termos.</p>
<p>3.2 Sempre que tecnicamente possível, a plataforma poderá exigir aceite expresso mediante seleção de caixa de confirmação, botão eletrônico ou mecanismo equivalente, antes da contratação ou utilização do serviço.</p>
<p>3.3 Ao aceitar estes Termos, o usuário declara que:</p>
<ul>
  <li>possui capacidade jurídica para contratar;</li>
  <li>utilizará a plataforma exclusivamente para fins lícitos, legítimos e compatíveis com a natureza do serviço;</li>
  <li>fornecerá informações corretas, completas e atualizadas;</li>
  <li>está ciente de que o relatório possui <strong>finalidade exclusivamente informativa</strong>;</li>
  <li>compreende que o relatório <strong>não substitui</strong> documentos oficiais, vistoria cautelar, perícia, inspeção física, consulta direta aos órgãos ou autarquias competentes ou análise profissional especializada;</li>
  <li>concorda com a manutenção de registros eletrônicos necessários à comprovação da contratação, segurança, prevenção a fraudes, atendimento ao usuário, cumprimento legal e exercício regular de direitos.</li>
</ul>
<p>3.4 A Consulta Placa Brasil poderá manter registros eletrônicos de acesso, aceite dos Termos, versão aceita, data e horário, endereço IP, dispositivo utilizado, contratação, pagamento, geração de relatório e utilização da plataforma, observada a legislação aplicável e a <a href="/privacidade">Política de Privacidade</a>.</p>

<h2>4. Objeto do Serviço</h2>
<p>4.1 A plataforma tem por objeto a realização de consultas veiculares a partir da placa informada pelo usuário, com emissão de relatório digital informativo.</p>
<p>4.2 O relatório poderá conter, conforme disponibilidade das fontes consultadas, informações relacionadas a características do veículo, dados cadastrais veiculares, histórico, registros, apontamentos, restrições, débitos, ocorrências, indícios, alertas ou outras informações compatíveis com a natureza do serviço.</p>
<p>4.3 A existência, extensão, profundidade, atualização e disponibilidade das informações poderão variar conforme o veículo consultado, a placa informada, a origem dos dados, a localidade, a disponibilidade técnica, a atualização das fontes e as limitações legais ou contratuais aplicáveis.</p>
<p>4.4 A Consulta Placa Brasil não cria, altera, valida, certifica ou substitui informações originárias de órgãos públicos, autarquias, entidades privadas, parceiros comerciais, bases externas ou terceiros fornecedores, limitando-se a consolidar e apresentar as informações disponíveis das fontes acessadas no momento da consulta.</p>

<h2>5. Natureza informativa do relatório</h2>
<p>5.1 O relatório disponibilizado pela Consulta Placa Brasil possui <strong>natureza meramente informativa, auxiliar e preliminar</strong>.</p>
<p>5.2 O relatório não constitui documento oficial, certidão de regularidade, laudo cautelar, perícia, garantia de procedência, certificação de inexistência de restrições, promessa de aprovação de financiamento, garantia securitária ou validação definitiva da situação jurídica, documental, mecânica ou comercial do veículo.</p>
<p>5.3 O usuário reconhece que o relatório <strong>não substitui</strong>:</p>
<ul>
  <li>vistoria cautelar;</li>
  <li>perícia técnica;</li>
  <li>inspeção física do veículo;</li>
  <li>consulta direta ao DETRAN, SENATRAN, órgãos fazendários, órgãos judiciais, cartórios, seguradoras, instituições financeiras ou demais entidades competentes;</li>
  <li>emissão de documentos oficiais;</li>
  <li>análise jurídica, contábil, securitária, financeira ou técnica especializada;</li>
  <li>conferência presencial da procedência, estado de conservação, autenticidade documental e regularidade do veículo.</li>
</ul>
<p>5.4 A utilização do relatório como apoio à tomada de decisão não dispensa o usuário de adotar cautelas adicionais antes de comprar, vender, financiar, segurar, transferir, regularizar ou negociar qualquer veículo.</p>

<h2>6. Limites do relatório e ausência de garantia absoluta</h2>
<p>6.1 A Consulta Placa Brasil não garante que o relatório contenha todas as informações existentes sobre determinado veículo, nem que as fontes consultadas estejam permanentemente atualizadas, completas ou livres de inconsistências.</p>
<p>6.2 A ausência de determinada informação no relatório não significa, necessariamente, inexistência de débito, restrição, sinistro, bloqueio, furto, roubo, alienação, adulteração, pendência administrativa, judicial, fiscal, financeira ou qualquer outro apontamento.</p>
<p>6.3 As informações apresentadas refletem a situação disponível nas fontes consultadas no momento da geração do relatório, podendo ser alteradas, corrigidas, atualizadas, incluídas ou removidas posteriormente por terceiros ou órgãos ou autarquias competentes, sem responsabilidade automática da Consulta Placa Brasil por fatos supervenientes.</p>
<p>6.4 O usuário está ciente de que eventuais divergências entre o relatório e bases oficiais, documentos físicos, sistemas de terceiros ou informações atualizadas posteriormente deverão ser verificadas diretamente perante os órgãos, entidades ou fontes responsáveis.</p>

<h2>7. Fontes de dados</h2>
<p>7.1 As informações constantes dos relatórios poderão ser obtidas a partir de fontes lícitas, públicas, privadas, parceiras, comerciais, governamentais ou de terceiros fornecedores, sempre que houver permissão legal, contratual ou técnica para o acesso e tratamento.</p>
<p>7.2 A Consulta Placa Brasil <strong>não se apresenta como órgão público</strong>, autoridade de trânsito, DETRAN, SENATRAN, seguradora, instituição financeira ou entidade oficial, salvo quando expressamente indicado em relação a determinada fonte ou parceira formalmente existente.</p>
<p>7.3 Quando as informações forem provenientes de bases externas, públicas ou privadas, a responsabilidade pela origem, atualização primária, manutenção e correção dos dados caberá à respectiva fonte, sem prejuízo da responsabilidade da Consulta Placa Brasil por falhas diretamente imputáveis à prestação do serviço.</p>
<p>7.4 A plataforma poderá alterar, substituir, incluir ou descontinuar fontes de dados, fornecedores ou parceiros, sempre que necessário por razões legais, técnicas, comerciais, operacionais, de segurança ou de disponibilidade.</p>

<h2>8. Uso permitido</h2>
<p>8.1 O usuário poderá utilizar a plataforma e os relatórios <strong>exclusivamente para finalidades lícitas</strong>, legítimas, proporcionais e compatíveis com a natureza informativa do serviço, tais como:</p>
<ul>
  <li>apoio à compra e venda de veículos;</li>
  <li>verificação preliminar de histórico veicular;</li>
  <li>conferência de informações antes de negociações;</li>
  <li>análise de regularidade aparente do veículo;</li>
  <li>prevenção de fraudes em negociação lícita;</li>
  <li>organização de informações de interesse próprio, observada a legislação aplicável.</li>
</ul>
<p>8.2 O uso da plataforma deve observar a boa-fé, a finalidade legítima da consulta, a proteção de dados pessoais, os direitos de terceiros, a segurança da informação e a legislação vigente.</p>

<h2>9. Uso proibido</h2>
<p>9.1 É expressamente proibido utilizar a plataforma, os relatórios ou quaisquer informações obtidas por meio do serviço para:</p>
<ul>
  <li>perseguir, assediar, ameaçar, intimidar, constranger, discriminar ou localizar terceiros;</li>
  <li>tentar identificar proprietário, condutor, endereço, telefone, CPF, familiares, vínculos, rotina, deslocamento ou localização de pessoa natural, quando tais informações não forem legitimamente disponibilizadas e compatíveis com a finalidade do serviço;</li>
  <li>praticar fraude, estelionato, falsidade ideológica, clonagem, adulteração, receptação, lavagem de dinheiro, violação de sigilo ou qualquer outro ilícito civil, administrativo ou penal;</li>
  <li>realizar consultas em massa, automatizadas, robotizadas, por scraping, mineração, scripts, crawlers, APIs não autorizadas ou mecanismos semelhantes;</li>
  <li>revender, ceder, sublicenciar, compartilhar comercialmente, copiar, distribuir ou explorar economicamente os relatórios sem autorização prévia e expressa da Consulta Placa Brasil;</li>
  <li>formar banco de dados próprio, enriquecer cadastros, realizar prospecção comercial, cobrança, marketing, vigilância, monitoramento, perfilamento ou tratamento indevido de dados pessoais;</li>
  <li>violar normas de trânsito, proteção de dados, defesa do consumidor, propriedade intelectual, sigilo legal, segredo comercial ou direitos de terceiros;</li>
  <li>tentar obter acesso não autorizado à plataforma, sistemas, servidores, bases de dados, contas de usuários, mecanismos de segurança ou informações restritas;</li>
  <li>praticar engenharia reversa, cópia de funcionalidades, extração indevida de dados, teste abusivo de vulnerabilidades ou qualquer conduta que comprometa a segurança, estabilidade ou disponibilidade da plataforma;</li>
  <li>utilizar a plataforma de forma abusiva, excessiva, fraudulenta, incompatível com sua finalidade ou prejudicial à Consulta Placa Brasil, aos demais usuários, às fontes de dados ou a terceiros.</li>
</ul>
<p>9.2 O descumprimento desta cláusula poderá acarretar bloqueio imediato, suspensão ou cancelamento de conta, cancelamento de consultas, negativa de novas contratações, preservação de registros, comunicação às autoridades competentes e adoção de medidas administrativas e judiciais cabíveis.</p>

<h2>10. Responsabilidade do usuário</h2>
<p>10.1 O usuário é integralmente responsável:</p>
<ul>
  <li>pela veracidade, exatidão e licitude dos dados fornecidos;</li>
  <li>pela placa informada para consulta;</li>
  <li>pela finalidade da consulta realizada;</li>
  <li>pelo uso adequado, lícito e responsável do relatório;</li>
  <li>pela guarda e confidencialidade de suas credenciais de acesso;</li>
  <li>por impedir o uso indevido de sua conta por terceiros;</li>
  <li>pela conferência das informações junto aos órgãos oficiais e demais fontes competentes antes de tomar decisões comerciais, jurídicas ou financeiras;</li>
  <li>por danos causados à Consulta Placa Brasil, a terceiros, a titulares de dados ou a autoridades em razão de uso ilícito, abusivo ou contrário a estes Termos.</li>
</ul>
<p>10.2 O usuário declara estar ciente de que o uso indevido das informações poderá gerar responsabilidade civil, administrativa e criminal.</p>

<h2>11. Cadastro, conta e segurança</h2>
<p>11.1 Para utilização de determinadas funcionalidades, a plataforma poderá exigir cadastro prévio, identificação do usuário, criação de conta, autenticação ou validação de dados.</p>
<p>11.2 O usuário compromete-se a fornecer informações verdadeiras, completas, atualizadas e compatíveis com a finalidade da contratação.</p>
<p>11.3 A Consulta Placa Brasil poderá recusar, suspender, bloquear ou cancelar cadastros quando identificar ou suspeitar de:</p>
<ul>
  <li>fraude;</li>
  <li>inconsistência cadastral;</li>
  <li>uso de dados falsos ou de terceiros;</li>
  <li>violação destes Termos;</li>
  <li>tentativa de burlar mecanismos de segurança;</li>
  <li>consulta automatizada, excessiva ou incompatível com o padrão regular de uso;</li>
  <li>risco à plataforma, a terceiros ou à proteção de dados pessoais.</li>
</ul>
<p>11.4 O usuário deverá comunicar imediatamente à Consulta Placa Brasil qualquer acesso indevido, uso não autorizado, suspeita de fraude, perda de credenciais ou comprometimento de sua conta.</p>

<h2>12. Preços, pagamentos e confirmação da contratação</h2>
<p>12.1 Os preços, formas de pagamento, condições comerciais, pacotes, créditos, promoções e funcionalidades contratadas serão informados na plataforma antes da conclusão da compra.</p>
<p>12.2 Antes da finalização da contratação, o usuário deverá conferir cuidadosamente a placa informada, o serviço escolhido, o valor, a forma de pagamento e demais dados da compra.</p>
<p>12.3 A consulta somente será processada após confirmação do pagamento, salvo disposição expressa em sentido diverso.</p>
<p>12.4 A Consulta Placa Brasil não se responsabiliza por erro de digitação da placa, escolha equivocada do serviço, utilização indevida da conta, pagamento realizado por terceiro não autorizado ou contratação efetuada com base em informações incorretas fornecidas pelo usuário.</p>
<p>12.5 Após a confirmação da contratação, a plataforma poderá enviar comprovante, recibo, confirmação eletrônica, link de acesso, relatório ou outra comunicação relacionada ao serviço contratado.</p>

<h2>13. Geração do relatório, consumo da consulta e execução do serviço</h2>
<p>13.1 A consulta será considerada executada quando o relatório for gerado e disponibilizado ao usuário no ambiente da plataforma, por e-mail, link, área logada ou outro meio informado no momento da contratação.</p>
<p>13.2 Em razão da natureza digital, personalizada e de execução imediata do serviço, a geração do relatório caracteriza o consumo da consulta contratada, sem prejuízo dos direitos legalmente assegurados ao consumidor.</p>
<p>13.3 O usuário está ciente de que a consulta é realizada a partir da placa por ele informada, razão pela qual deverá revisar cuidadosamente os dados antes de confirmar a contratação.</p>

<h2>14. Cancelamento e reembolso</h2>
<p>14.1 O usuário poderá solicitar cancelamento, reembolso, estorno, crédito ou nova consulta por meio dos canais de atendimento disponibilizados pela Consulta Placa Brasil.</p>
<p>14.2 Pedidos de cancelamento ou reembolso poderão ser avaliados, especialmente, nas seguintes hipóteses:</p>
<ul>
  <li>cobrança em duplicidade;</li>
  <li>pagamento confirmado sem geração ou disponibilização do relatório;</li>
  <li>falha técnica comprovada que impeça o acesso ao relatório;</li>
  <li>indisponibilidade do serviço sem entrega da consulta contratada;</li>
  <li>geração de relatório diverso daquele contratado por falha atribuível à plataforma;</li>
  <li>vício ou defeito comprovado na prestação do serviço.</li>
</ul>
<p>14.3 Quando constatada falha técnica imputável à Consulta Placa Brasil, a empresa poderá, conforme o caso, disponibilizar nova consulta equivalente, corrigir o acesso ao relatório, conceder crédito, realizar estorno ou adotar outra solução adequada.</p>
<p>14.4 Nenhuma disposição desta cláusula afasta direitos legais do consumidor, especialmente em caso de falha na prestação do serviço, cobrança indevida, vício, defeito ou descumprimento da oferta. Veja também a <a href="/reembolso">Política de Reembolso</a>.</p>

<h2>15. Disponibilidade da plataforma</h2>
<p>15.1 A Consulta Placa Brasil empregará esforços razoáveis para manter a plataforma disponível, segura e funcional.</p>
<p>15.2 O serviço poderá sofrer interrupções, limitações ou indisponibilidades, temporárias ou permanentes, em razão de:</p>
<ul>
  <li>manutenções programadas ou emergenciais;</li>
  <li>falhas técnicas;</li>
  <li>instabilidade de internet;</li>
  <li>indisponibilidade de provedores, meios de pagamento, servidores, sistemas de terceiros ou fontes de dados;</li>
  <li>alterações legais, contratuais ou operacionais em bases consultadas;</li>
  <li>eventos de força maior ou caso fortuito;</li>
  <li>exigências judiciais, administrativas, regulatórias ou de segurança;</li>
  <li>medidas necessárias à prevenção de fraudes, incidentes de segurança ou uso abusivo.</li>
</ul>
<p>15.3 Sempre que possível, a Consulta Placa Brasil poderá comunicar manutenções programadas ou interrupções relevantes.</p>

<h2>16. Limitação de responsabilidade</h2>
<p>16.1 A Consulta Placa Brasil responde pela adequada prestação dos serviços que oferece, nos limites da legislação aplicável.</p>
<p>16.2 Sem prejuízo dos direitos legalmente assegurados ao consumidor, a Consulta Placa Brasil não se responsabiliza por:</p>
<ul>
  <li>decisões comerciais, financeiras, jurídicas ou negociais tomadas exclusivamente com base no relatório;</li>
  <li>compras, vendas, financiamentos, seguros, transferências, avaliações ou negociações realizadas entre o usuário e terceiros;</li>
  <li>erro de digitação da placa ou fornecimento de informação incorreta pelo usuário;</li>
  <li>alterações posteriores nas bases de dados após a geração do relatório;</li>
  <li>informações incorretas, incompletas, desatualizadas ou omissas constantes de bases externas mantidas por terceiros, órgãos públicos, parceiros ou fornecedores;</li>
  <li>indisponibilidade temporária de fontes externas, sistemas governamentais, provedores, meios de pagamento ou serviços de terceiros;</li>
  <li>uso indevido, ilícito, abusivo ou desautorizado dos relatórios pelo usuário ou por terceiros;</li>
  <li>fato exclusivo do usuário, fato exclusivo de terceiro, caso fortuito ou força maior;</li>
  <li>ausência de determinada informação no relatório quando a informação não estiver disponível, atualizada ou acessível nas fontes consultadas no momento da consulta.</li>
</ul>

<h2>17. Proteção de dados pessoais e privacidade</h2>
<p>17.1 A Consulta Placa Brasil realizará o tratamento de dados pessoais em conformidade com a legislação aplicável, especialmente a Lei Geral de Proteção de Dados Pessoais.</p>
<p>17.2 Os dados pessoais eventualmente coletados ou tratados poderão ser utilizados para:</p>
<ul>
  <li>viabilizar cadastro e identificação do usuário;</li>
  <li>processar pagamento;</li>
  <li>gerar e disponibilizar relatórios;</li>
  <li>prestar atendimento e suporte;</li>
  <li>prevenir fraudes, abusos e usos indevidos;</li>
  <li>proteger a segurança da plataforma;</li>
  <li>cumprir obrigações legais, regulatórias, administrativas ou judiciais;</li>
  <li>exercer direitos em processos administrativos, judiciais ou arbitrais;</li>
  <li>melhorar funcionalidades, segurança e experiência de uso da plataforma.</li>
</ul>
<p>17.3 Os detalhes sobre dados coletados, finalidades, bases legais, compartilhamentos, prazos de retenção, direitos dos titulares, medidas de segurança, cookies e canais de privacidade constam da <a href="/privacidade">Política de Privacidade</a> e da <a href="/cookies">Política de Cookies</a>, que integram estes Termos.</p>
<p>17.4 O usuário declara estar ciente de que não poderá utilizar a plataforma, os relatórios ou quaisquer informações obtidas por meio do serviço para tratamento indevido de dados pessoais, identificação ilegítima de terceiros, perseguição, vigilância, monitoramento, discriminação, exposição, assédio, fraude ou qualquer finalidade incompatível com a legislação aplicável.</p>

<h2>18. Cookies e tecnologias de rastreamento</h2>
<p>18.1 A plataforma poderá utilizar cookies, pixels, identificadores, ferramentas analíticas, mecanismos antifraude, recursos de segurança, meios de pagamento, ferramentas de atendimento e tecnologias semelhantes.</p>
<p>18.2 Essas tecnologias poderão ser utilizadas para funcionamento da plataforma, autenticação, segurança, prevenção a fraudes, medição de desempenho, melhoria da experiência do usuário, cumprimento legal e, quando aplicável, finalidades estatísticas ou comerciais.</p>
<p>18.3 As informações detalhadas sobre o uso de cookies e tecnologias semelhantes constam da <a href="/privacidade">Política de Privacidade</a> e da <a href="/cookies">Política de Cookies</a> específica.</p>

<h2>19. Registros eletrônicos, segurança e prova da contratação</h2>
<p>19.1 A Consulta Placa Brasil poderá registrar e armazenar informações técnicas e operacionais relacionadas ao uso da plataforma, incluindo data e horário de acesso, endereço IP, dispositivo utilizado, navegador, identificadores técnicos, eventos de navegação, aceite dos Termos, versão aceita, histórico de contratação, confirmação de pagamento, geração de relatórios, histórico de consultas e interações com atendimento.</p>
<p>19.2 Esses registros poderão ser utilizados para:</p>
<ul>
  <li>comprovar a contratação eletrônica;</li>
  <li>demonstrar o aceite dos Termos;</li>
  <li>prevenir fraudes;</li>
  <li>apurar uso indevido da plataforma;</li>
  <li>proteger a segurança dos usuários e da plataforma;</li>
  <li>atender solicitações do usuário;</li>
  <li>cumprir obrigações legais ou regulatórias;</li>
  <li>exercer direitos em processos administrativos, judiciais ou arbitrais;</li>
  <li>colaborar com autoridades competentes, quando cabível.</li>
</ul>
<p>19.3 A guarda e o tratamento desses registros observarão a legislação aplicável, a Política de Privacidade e critérios de necessidade, segurança e proporcionalidade.</p>

<h2>20. Propriedade intelectual</h2>
<p>20.1 A plataforma, marca, nome empresarial, logotipo, layout, design, textos, relatórios, banco de dados organizado, funcionalidades, códigos, interfaces, sistemas, documentos, conteúdos e demais elementos disponibilizados pela Consulta Placa Brasil são protegidos por direitos de propriedade intelectual.</p>
<p>20.2 É vedado ao usuário, sem autorização prévia e expressa da Consulta Placa Brasil:</p>
<ul>
  <li>copiar, reproduzir, distribuir, vender, ceder, sublicenciar, modificar ou explorar comercialmente qualquer conteúdo da plataforma;</li>
  <li>remover avisos de direitos autorais, marcas ou identificações de titularidade;</li>
  <li>praticar engenharia reversa, raspagem, mineração, extração automatizada ou técnica semelhante;</li>
  <li>utilizar marca, nome, domínio, identidade visual, conteúdo ou sinais distintivos da Consulta Placa Brasil de forma não autorizada;</li>
  <li>utilizar relatórios para revenda, formação de base própria ou exploração comercial não autorizada.</li>
</ul>
<p>20.3 A contratação do serviço não transfere ao usuário qualquer direito de propriedade intelectual sobre a plataforma, sistema, marca, layout, estrutura, relatórios ou conteúdos disponibilizados.</p>

<h2>21. Suspensão, bloqueio ou cancelamento de acesso</h2>
<p>21.1 A Consulta Placa Brasil poderá suspender, bloquear, limitar ou cancelar o acesso do usuário, temporária ou definitivamente, quando houver indícios de:</p>
<ul>
  <li>fraude;</li>
  <li>uso indevido ou abusivo da plataforma;</li>
  <li>violação destes Termos;</li>
  <li>violação da legislação aplicável;</li>
  <li>tratamento indevido de dados pessoais;</li>
  <li>tentativa de acesso não autorizado;</li>
  <li>uso automatizado, excessivo ou incompatível com o padrão regular;</li>
  <li>revenda não autorizada dos relatórios;</li>
  <li>compartilhamento indevido de credenciais;</li>
  <li>chargeback abusivo ou contestação fraudulenta de pagamento;</li>
  <li>risco à segurança da plataforma, de outros usuários, das fontes de dados ou de terceiros.</li>
</ul>
<p>21.2 A suspensão, bloqueio ou cancelamento poderá ocorrer sem prejuízo da cobrança de valores devidos, preservação de registros, comunicação às autoridades competentes e adoção de medidas legais cabíveis.</p>

<h2>22. Atendimento ao usuário</h2>
<p>22.1 A Consulta Placa Brasil disponibiliza os seguintes canais de atendimento: E-mail: <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a> / Telefone: (61) 3246-9277.</p>
<p>22.2 Por esses canais, o usuário poderá solicitar informações, suporte técnico, cancelamento, reembolso, correção de dados cadastrais, esclarecimentos sobre relatórios, exercício de direitos relacionados a dados pessoais ou registro de reclamações.</p>
<p>22.3 A Consulta Placa Brasil buscará responder às solicitações em prazo razoável, conforme a natureza da demanda, a complexidade do caso e a legislação aplicável.</p>
<p>22.4 O usuário é responsável por fornecer informações suficientes para identificação da contratação, análise da solicitação e resposta adequada.</p>

<h2>23. Comunicações com o usuário</h2>
<p>23.1 As comunicações entre a Consulta Placa Brasil e o usuário poderão ocorrer por e-mail, telefone, WhatsApp, SMS, área logada, avisos na plataforma ou outros canais informados no momento da contratação.</p>
<p>23.2 O usuário é responsável por manter seus dados de contato atualizados e por verificar regularmente os canais informados.</p>
<p>23.3 Comunicações enviadas aos dados cadastrados pelo usuário serão consideradas válidas para fins de informação, suporte, segurança, atualização de Termos, confirmação de contratação e demais comunicações relacionadas ao serviço.</p>

<h2>24. Alteração dos Termos</h2>
<p>24.1 A Consulta Placa Brasil poderá atualizar estes Termos a qualquer tempo, especialmente para refletir alterações legais, regulatórias, operacionais, comerciais, tecnológicas, de segurança ou de funcionamento da plataforma.</p>
<p>24.2 A versão atualizada será disponibilizada na plataforma, com indicação da data de última atualização, e produzirá efeitos a partir de sua publicação, salvo quando houver previsão expressa em sentido diverso ou quando a legislação aplicável exigir comunicação específica.</p>
<p>24.3 As alterações terão efeito prospectivo, não prejudicando direitos já adquiridos pelo usuário nem modificando, de forma retroativa, condições essenciais de serviços já contratados e executados.</p>
<p>24.4 A continuidade do uso da plataforma após a publicação da nova versão poderá caracterizar ciência e concordância com as alterações aplicáveis ao uso futuro dos serviços.</p>
<p>24.5 Quando as alterações forem substanciais, implicarem mudança relevante nas condições do serviço, restringirem direitos do usuário ou exigirem novo consentimento, a Consulta Placa Brasil poderá comunicá-las de forma destacada e/ou solicitar novo aceite antes da continuidade da utilização da plataforma.</p>

<h2>25. Uso responsável e cooperação com autoridades</h2>
<p>25.1 Havendo indícios de uso ilícito, fraudulento, abusivo ou contrário a estes Termos, a Consulta Placa Brasil poderá preservar registros técnicos, bloquear acessos, suspender contas, cancelar consultas, negar novas contratações e comunicar os fatos às autoridades competentes, quando cabível.</p>

<h2>26. Legislação aplicável e foro</h2>
<p>26.1 Estes Termos serão regidos pelas leis da República Federativa do Brasil.</p>
<p>26.2 Nas relações caracterizadas como relação de consumo, serão observadas as regras de competência previstas na legislação aplicável, inclusive o direito do consumidor de ajuizar demanda no foro de seu domicílio, quando cabível.</p>
<p>26.3 Nas relações que não se caracterizem como relação de consumo, fica eleito o foro de Brasília/DF para dirimir controvérsias decorrentes destes Termos, salvo disposição legal diversa.</p>

<h2>27. Disposições Gerais</h2>
<p>27.1 A eventual tolerância da Consulta Placa Brasil quanto ao descumprimento de qualquer disposição destes Termos não constituirá renúncia, novação ou alteração contratual.</p>
<p>27.2 Caso qualquer cláusula destes Termos seja considerada inválida, nula ou inexequível, as demais disposições permanecerão válidas e eficazes.</p>
<p>27.3 Estes Termos, juntamente com a <a href="/privacidade">Política de Privacidade</a>, <a href="/reembolso">Política de Reembolso e Cancelamento</a>, <a href="/cookies">Política de Cookies</a> e demais documentos eventualmente disponibilizados na plataforma, constituem o conjunto de regras aplicáveis à utilização dos serviços da Consulta Placa Brasil.</p>
`;

export default async function TermosPage() {
  const page = await getPageBySlug("termos");

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.title || "Termos de Uso"}</h1>
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
            name: page?.seoTitle || "Termos de Uso",
            description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : defaultDesc,
            url: "https://consultaplacabrasil.com/termos",
          }),
        }}
      />
    </div>
  );
}
