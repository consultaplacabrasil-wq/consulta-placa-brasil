import { Metadata } from "next";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getPage() {
  try {
    const [page] = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, "cookies"))
      .limit(1);
    return page;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  return {
    title: page?.seoTitle || "Política de Cookies - Consulta Placa Brasil",
    description: (page?.seoDescription && page.seoDescription.length > 100) ? page.seoDescription : "Saiba como o Consulta Placa Brasil utiliza cookies essenciais, de análise e de preferências para melhorar sua experiência de navegação.",
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/cookies" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Política de Cookies",
      description: page?.ogDescription || undefined,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/cookies",
    },
  };
}

export default async function CookiesPage() {
  const page = await getPage();

  const defaultContent = `
    <p><em>Última atualização: 22 de junho de 2026</em></p>
    <p>Esta <strong>Política de Cookies</strong> explica como a <strong>Consulta Placa Brasil</strong>, operada por CONSULTA PLACA BRASIL LTDA, inscrita no CNPJ sob nº 66.962.276/0001-69, com sede no Setor SRTVS Quadra 701, Conj. L, Bloco 1, nº 38, Asa Sul, Brasília/DF, CEP 70340-000, utiliza cookies, armazenamento local, identificadores digitais e tecnologias semelhantes em sua plataforma.</p>
    <p>Esta Política deve ser lida em conjunto com os <a href="/termos">Termos de Uso e Serviço</a> e com a <a href="/privacidade">Política de Privacidade</a> da Consulta Placa Brasil, que contêm informações complementares sobre tratamento de dados pessoais, bases legais, compartilhamentos, direitos dos titulares, prazos de retenção, segurança da informação e canais de atendimento.</p>
    <p>Ao acessar a plataforma, o usuário será informado sobre o uso de cookies e poderá gerenciar suas preferências, conforme descrito nesta Política.</p>

    <h2>1. Finalidade desta Política</h2>
    <p>1.1 Esta Política tem por finalidade informar, de forma clara e transparente:</p>
    <ul>
      <li>o que são cookies e tecnologias semelhantes;</li>
      <li>quais categorias de cookies são utilizadas pela plataforma;</li>
      <li>quais cookies são essenciais ao funcionamento do serviço;</li>
      <li>quais cookies dependem de consentimento;</li>
      <li>como o usuário pode aceitar, recusar, revogar ou alterar suas preferências;</li>
      <li>quais terceiros podem estar relacionados ao uso de cookies ou tecnologias semelhantes;</li>
      <li>como o uso dessas tecnologias se relaciona com a segurança da plataforma, a prevenção a fraudes, o funcionamento do serviço e a proteção de dados pessoais.</li>
    </ul>

    <h2>2. O que são cookies e tecnologias semelhantes</h2>
    <p>2.1 Cookies são pequenos arquivos ou identificadores armazenados no navegador ou dispositivo do usuário quando ele acessa determinado site.</p>
    <p>2.2 Além dos cookies tradicionais, a plataforma poderá utilizar tecnologias semelhantes, como:</p>
    <ul>
      <li>armazenamento local do navegador, incluindo local storage;</li>
      <li>armazenamento de sessão;</li>
      <li>identificadores técnicos;</li>
      <li>registros de navegação;</li>
      <li>ferramentas analíticas;</li>
      <li>mecanismos de autenticação;</li>
      <li>recursos de segurança;</li>
      <li>registros de preferência de cookies.</li>
    </ul>
    <p>2.3 Essas tecnologias podem ser utilizadas para permitir o funcionamento do site, autenticar usuários, preservar sessões, manter preferências, viabilizar checkout, registrar consentimentos, melhorar a experiência de navegação, analisar desempenho e proteger a plataforma contra usos indevidos.</p>

    <h2>3. Premissa de proteção adotada pela plataforma</h2>
    <p>3.1 A Consulta Placa Brasil adota como premissa a utilização restrita de cookies e tecnologias semelhantes, limitando o uso dessas ferramentas ao necessário para funcionamento, segurança, autenticação, contratação, análise de desempenho e melhoria da experiência do usuário.</p>
    <p>3.2 A plataforma não utiliza cookies para identificar proprietário, condutor, endereço, localização real, rotina ou dados pessoais de terceiros relacionados a veículos consultados.</p>
    <p>3.3 A plataforma também não utiliza cookies para perseguir, vigiar, monitorar indevidamente ou rastrear usuários para finalidades incompatíveis com a legislação aplicável.</p>

    <h2>4. Cookies instalados no primeiro acesso</h2>
    <p>4.1 Em uma simples visita a páginas públicas da plataforma, os cookies próprios de autenticação e sessão não são criados automaticamente.</p>
    <p>4.2 Os cookies próprios relacionados à autenticação, sessão, login e checkout são criados apenas quando o usuário interage com funcionalidades que exigem autenticação, acesso à conta, contratação, pagamento ou continuidade de sessão.</p>
    <p>4.3 Cookies não essenciais, como os cookies analíticos do Google Analytics, somente serão instalados <strong>após o consentimento prévio e explícito</strong> do usuário.</p>
    <p>4.4 Antes do consentimento, a plataforma não instala cookies não essenciais no navegador do usuário.</p>
    <p>4.5 Poderão ser utilizadas tecnologias estritamente necessárias para exibição do banner, funcionamento técnico da página, registro da preferência de cookies e preservação da segurança da navegação.</p>

    <h2>5. Categorias de cookies utilizadas</h2>
    <p>5.1 A plataforma poderá utilizar as seguintes categorias de cookies e tecnologias semelhantes:</p>
    <ul>
      <li>cookies essenciais;</li>
      <li>cookies de autenticação e sessão;</li>
      <li>tecnologias de armazenamento local;</li>
      <li>cookies analíticos, mediante consentimento;</li>
      <li>cookies ou mecanismos de registro de preferência;</li>
      <li>tecnologias necessárias à segurança e funcionamento da plataforma.</li>
    </ul>
    <p>5.2 A Consulta Placa Brasil não utiliza, conforme configuração técnica atual, cookies de marketing, pixels publicitários, ferramentas de mapa de calor, gravação de sessão ou rastreamento comportamental de terceiros.</p>

    <h2>6. Cookies essenciais</h2>
    <p>6.1 Cookies essenciais são aqueles necessários para que a plataforma funcione corretamente e para que o serviço solicitado pelo usuário possa ser prestado.</p>
    <p>6.2 Esses cookies podem ser utilizados para:</p>
    <ul>
      <li>viabilizar navegação básica;</li>
      <li>permitir login e autenticação;</li>
      <li>preservar sessão do usuário;</li>
      <li>possibilitar checkout;</li>
      <li>garantir segurança da conta;</li>
      <li>registrar preferências indispensáveis;</li>
      <li>manter a integridade da contratação;</li>
      <li>proteger a plataforma contra acessos indevidos;</li>
      <li>permitir o funcionamento mínimo de páginas e funcionalidades.</li>
    </ul>
    <p>6.3 Por serem necessários ao funcionamento da plataforma, os cookies essenciais não dependem de consentimento prévio do usuário.</p>
    <p>6.4 A desativação de cookies essenciais diretamente no navegador poderá comprometer ou impedir o funcionamento de funcionalidades como login, checkout, pagamento, acesso à conta, geração de relatório e segurança da sessão.</p>

    <h2>7. Cookies próprios de autenticação, sessão e checkout</h2>
    <p>7.1 A Consulta Placa Brasil utiliza cookies próprios relacionados à autenticação e sessão, inclusive por meio de tecnologia como NextAuth ou solução equivalente.</p>
    <p>7.2 Esses cookies são utilizados para:</p>
    <ul>
      <li>autenticar o usuário;</li>
      <li>manter a sessão ativa;</li>
      <li>proteger o acesso à conta;</li>
      <li>viabilizar fluxo de login;</li>
      <li>permitir continuidade no checkout;</li>
      <li>preservar segurança da navegação em áreas restritas;</li>
      <li>evitar acessos não autorizados.</li>
    </ul>
    <p>7.3 Conforme configuração técnica informada, esses cookies: são próprios da plataforma; são essenciais; são criados apenas quando o usuário interage com login, autenticação, conta, checkout ou funcionalidade equivalente; não têm finalidade publicitária; não são utilizados para rastreamento comportamental; e são configurados, em ambiente de produção, com atributos de segurança como <strong>httpOnly, Secure e SameSite=Lax</strong>, quando tecnicamente aplicável.</p>

    <h2>8. Cookies analíticos — Google Analytics</h2>
    <p>8.1 A Consulta Placa Brasil poderá utilizar Google Analytics 4 — GA4 para análise estatística de acesso, desempenho e utilização da plataforma.</p>
    <p>8.2 O Google Analytics poderá utilizar cookies como <strong>_ga, _ga*, _gid</strong> ou outros identificadores equivalentes definidos pela ferramenta.</p>
    <p>8.3 Esses cookies são classificados como não essenciais e somente serão carregados após o consentimento prévio e explícito do usuário.</p>
    <p>8.4 O Google Analytics poderá ser utilizado para: medir volume de acessos; compreender páginas mais visitadas; identificar problemas técnicos; avaliar desempenho da plataforma; analisar eventos de navegação; melhorar usabilidade; aperfeiçoar funcionalidades; e compreender a efetividade de conteúdos e fluxos do site.</p>
    <p>8.5 Caso o usuário recuse cookies não essenciais, o Google Analytics não será carregado.</p>
    <p>8.6 Caso o usuário revogue consentimento anteriormente concedido, a plataforma adotará medidas para interromper o carregamento do Google Analytics e remover cookies analíticos, quando tecnicamente possível.</p>
    <p>8.7 A duração dos cookies analíticos poderá variar conforme a configuração da ferramenta, atualizações do fornecedor, navegador utilizado e preferências do usuário.</p>

    <h2>9. Consentimento para cookies não essenciais</h2>
    <p>9.1 No primeiro acesso à plataforma, será exibido banner de cookies com opções claras para o usuário.</p>
    <p>9.2 O usuário poderá:</p>
    <ul>
      <li>aceitar todos os cookies;</li>
      <li>recusar cookies não essenciais;</li>
      <li>alterar ou revogar sua escolha posteriormente por meio de botão flutuante permanente ou mecanismo equivalente disponibilizado na plataforma.</li>
    </ul>
    <p>9.3 Os cookies analíticos somente serão ativados após manifestação positiva do usuário.</p>
    <p>9.4 A recusa de cookies não essenciais não impedirá o uso regular da plataforma, ressalvadas funcionalidades que dependam de cookies essenciais, autenticação, sessão, checkout ou tecnologias indispensáveis ao funcionamento do serviço.</p>
    <p>9.5 A revogação do consentimento impedirá novos tratamentos baseados nessa autorização, sem afetar a validade dos tratamentos realizados anteriormente enquanto havia consentimento válido.</p>

    <h2>10. Registro da preferência de cookies</h2>
    <p>10.1 Para respeitar a escolha do usuário, a plataforma poderá armazenar a preferência de cookies em cookie próprio, armazenamento local ou tecnologia equivalente.</p>
    <p>10.2 Esse registro tem finalidade estritamente necessária de lembrar se o usuário aceitou ou recusou cookies não essenciais.</p>
    <p>10.3 O registro da preferência não tem finalidade publicitária e não é utilizado para rastreamento comportamental.</p>
    <p>10.4 Caso o usuário limpe os cookies ou dados do navegador, o banner poderá ser exibido novamente para coleta de nova preferência.</p>

    <h2>11. Armazenamento local do navegador</h2>
    <p>11.1 A plataforma poderá utilizar armazenamento local do navegador, incluindo local storage, para manter informações técnicas relacionadas ao carrinho, estado de interface, preferências de navegação ou funcionamento de determinadas funcionalidades.</p>
    <p>11.2 O armazenamento local não é cookie, mas pode cumprir função semelhante de guardar informações no dispositivo ou navegador do usuário.</p>
    <p>11.3 Conforme configuração técnica informada, carrinho e estado de interface utilizam armazenamento local do navegador.</p>
    <p>11.4 Essas informações são utilizadas para melhorar a experiência de uso, preservar continuidade de navegação e permitir funcionamento adequado da plataforma.</p>
    <p>11.5 Quando o armazenamento local envolver dado pessoal ou identificador associado ao usuário, o tratamento observará a <a href="/privacidade">Política de Privacidade</a> e a legislação aplicável.</p>

    <h2>12. Ferramentas não utilizadas</h2>
    <p>12.1 Conforme configuração técnica atual, a Consulta Placa Brasil não utiliza:</p>
    <ul>
      <li>Meta/Facebook Pixel;</li>
      <li>TikTok Pixel;</li>
      <li>Hotjar;</li>
      <li>Microsoft Clarity;</li>
      <li>Mixpanel;</li>
      <li>ferramentas de gravação de sessão;</li>
      <li>ferramentas de mapa de calor;</li>
      <li>scripts de chat embarcado de terceiros;</li>
      <li>cookies de ferramenta antifraude instalados no navegador do usuário.</li>
    </ul>
    <p>12.2 Caso qualquer dessas ferramentas venha a ser adotada futuramente, esta Política será atualizada e, quando necessário, será solicitado consentimento específico do usuário antes da ativação de cookies ou tecnologias não essenciais.</p>

    <h2>13. Google Search Console</h2>
    <p>13.1 A plataforma poderá utilizar meta tag de verificação do Google Search Console.</p>
    <p>13.2 A meta tag de verificação não utiliza cookies e tem por finalidade apenas comprovar a propriedade ou administração do site perante o Google.</p>
    <p>13.3 Essa funcionalidade não possui finalidade de rastreamento comportamental do usuário.</p>

    <h2>14. Login com Google</h2>
    <p>14.1 A plataforma poderá disponibilizar login por meio de conta Google, caso essa funcionalidade esteja ativa.</p>
    <p>14.2 Quando o usuário optar por utilizar login com Google, poderá haver tratamento de dados pelo Google, conforme suas próprias políticas, termos e configurações de conta.</p>
    <p>14.3 O login com Google não se confunde com cookies analíticos do Google Analytics.</p>
    <p>14.4 O usuário não é obrigado a utilizar login com Google, salvo se essa for a única forma de autenticação disponibilizada em determinada funcionalidade.</p>

    <h2>15. Gateway de pagamento</h2>
    <p>15.1 A Consulta Placa Brasil utiliza o Asaas como gateway ou prestador de serviço de pagamento.</p>
    <p>15.2 Conforme configuração técnica informada, a integração com o Asaas ocorre de forma servidor-a-servidor, por meio de API, sem injeção de scripts ou cookies do Asaas no navegador do usuário no domínio da Consulta Placa Brasil.</p>
    <p>15.3 O cartão, Pix e demais dados necessários ao pagamento são processados no backend, conforme fluxos técnicos e de segurança aplicáveis.</p>
    <p>15.4 Embora o Asaas não instale cookies no navegador do usuário por meio da plataforma, determinados dados pessoais necessários ao pagamento poderão ser compartilhados com esse prestador, conforme descrito na <a href="/privacidade">Política de Privacidade</a>.</p>

    <h2>16. Ferramentas antifraude</h2>
    <p>16.1 Conforme configuração técnica atual, a Consulta Placa Brasil não utiliza scripts ou cookies antifraude instalados diretamente no navegador do usuário.</p>
    <p>16.2 Eventual análise de risco relacionada ao pagamento poderá ocorrer internamente pelo prestador de pagamento, em ambiente servidor, sem instalação de cookies antifraude no domínio da Consulta Placa Brasil.</p>
    <p>16.3 A ausência de cookies antifraude no navegador não impede que a Consulta Placa Brasil adote medidas técnicas, contratuais e operacionais para prevenir fraude, chargeback abusivo, uso indevido da plataforma, consultas automatizadas, scraping, revenda irregular de relatórios ou violação dos Termos de Uso.</p>

    <h2>17. Atendimento e WhatsApp</h2>
    <p>17.1 A plataforma não utiliza widget de chat embarcado de terceiros.</p>
    <p>17.2 O atendimento poderá ocorrer por formulário de contato, e-mail, telefone e WhatsApp, por meio de link ou número disponibilizado na plataforma.</p>
    <p>17.3 Caso o usuário opte por entrar em contato via WhatsApp ou outro serviço externo, o tratamento de dados realizado por esse terceiro poderá estar sujeito às respectivas políticas e termos próprios.</p>

    <h2>18. Terceiros relacionados à operação da plataforma</h2>
    <p>18.1 Além dos cookies propriamente ditos, a operação da plataforma pode envolver terceiros que tratam dados pessoais ou informações técnicas para finalidades específicas.</p>
    <p>18.2 Atualmente, conforme informações técnicas fornecidas, os principais terceiros relacionados à operação são:</p>
    <ul>
      <li><strong>Google</strong>, para Google Analytics, quando consentido, e login com Google, quando utilizado pelo usuário;</li>
      <li><strong>Google Search Console</strong>, por meio de meta tag de verificação, sem uso de cookies;</li>
      <li><strong>Asaas</strong>, para processamento de pagamentos, sem instalação de cookies no navegador da plataforma;</li>
      <li><strong>APIBrasil e API Placas</strong>, para realização de consultas veiculares, recebendo a placa consultada quando necessário à execução do serviço;</li>
      <li><strong>DeepSeek</strong>, para geração de avaliações relacionadas ao modelo do veículo, recebendo, conforme informado, apenas marca e modelo do veículo, sem envio de dados pessoais do usuário;</li>
      <li><strong>Resend</strong>, para envio de e-mails transacionais e newsletters, recebendo o e-mail do destinatário quando necessário à comunicação.</li>
    </ul>
    <p>18.3 Alguns terceiros podem atuar como operadores da Consulta Placa Brasil, enquanto outros podem atuar como controladores independentes, de acordo com a natureza da operação, seus próprios meios de tratamento e suas respectivas políticas.</p>
    <p>18.4 Informações mais detalhadas sobre compartilhamento de dados constam da <a href="/privacidade">Política de Privacidade</a>.</p>

    <h2>19. Transferência internacional de dados</h2>
    <p>19.1 O uso de determinadas ferramentas poderá envolver transferência internacional de dados.</p>
    <p>19.2 Conforme configuração técnica informada, poderá haver transferência internacional relacionada a:</p>
    <ul>
      <li><strong>Google</strong>, com infraestrutura ou tratamento de dados nos Estados Unidos, para Google Analytics e login com Google, quando aplicável;</li>
      <li><strong>Resend</strong>, com infraestrutura ou tratamento de dados nos Estados Unidos, para envio de e-mails;</li>
      <li><strong>DeepSeek</strong>, com infraestrutura ou tratamento na China, para processamento limitado de informações relacionadas à marca e ao modelo do veículo, conforme informado, sem envio de dados pessoais do usuário.</li>
    </ul>
    <p>19.3 A Consulta Placa Brasil buscará adotar medidas adequadas para que transferências internacionais envolvendo dados pessoais observem a legislação aplicável, a Política de Privacidade, contratos com fornecedores e mecanismos de proteção compatíveis.</p>
    <p>19.4 Conforme informado, Asaas, APIBrasil e API Placas são empresas brasileiras e os respectivos tratamentos ocorrem no Brasil, ressalvadas eventuais alterações técnicas, contratuais ou operacionais futuras.</p>

    <h2>20. Bases legais aplicáveis</h2>
    <p>20.1 Quando o uso de cookies ou tecnologias semelhantes envolver tratamento de dados pessoais, a Consulta Placa Brasil adotará a base legal adequada à finalidade correspondente.</p>
    <p>20.2 De forma geral:</p>
    <ul>
      <li>cookies essenciais poderão ser utilizados para execução do contrato, procedimentos preliminares relacionados à contratação, funcionamento da plataforma, segurança, prevenção a fraudes e legítimo interesse;</li>
      <li>cookies de autenticação e sessão poderão ser utilizados para viabilizar acesso à conta, checkout, segurança e prestação do serviço solicitado pelo usuário;</li>
      <li>registros de preferência de cookies poderão ser utilizados para cumprimento de obrigação legal, transparência, prestação de contas e respeito às escolhas do usuário;</li>
      <li>cookies analíticos não essenciais, como os relacionados ao Google Analytics, serão utilizados com fundamento no consentimento do usuário;</li>
      <li>tecnologias voltadas à segurança poderão ser utilizadas para proteger a plataforma, os usuários, os dados tratados e a regularidade da contratação.</li>
    </ul>

    <h2>21. Como o usuário pode gerenciar cookies</h2>
    <p>21.1 O usuário poderá gerenciar suas preferências por meio:</p>
    <ul>
      <li>do banner exibido no primeiro acesso;</li>
      <li>do botão flutuante permanente disponibilizado na plataforma;</li>
      <li>das configurações do navegador;</li>
      <li>da exclusão manual de cookies e dados locais armazenados no dispositivo.</li>
    </ul>
    <p>21.2 O usuário poderá aceitar todos os cookies, recusar cookies não essenciais ou alterar sua escolha posteriormente.</p>
    <p>21.3 A exclusão ou bloqueio de cookies essenciais pelo navegador poderá comprometer o funcionamento da plataforma, especialmente login, checkout, autenticação, segurança da sessão e acesso a funcionalidades restritas.</p>

    <h2>22. Revogação do consentimento</h2>
    <p>22.1 O usuário poderá revogar, a qualquer momento, o consentimento concedido para cookies não essenciais.</p>
    <p>22.2 Após a revogação, a plataforma deixará de carregar cookies analíticos não essenciais e adotará medidas para remover cookies como _ga, _ga* e _gid, quando tecnicamente possível.</p>
    <p>22.3 A revogação do consentimento não afeta a validade dos tratamentos realizados anteriormente enquanto havia autorização válida do usuário.</p>

    <h2>23. Duração dos cookies</h2>
    <p>23.1 A duração dos cookies poderá variar conforme sua finalidade, configuração técnica, navegador utilizado, ferramenta de terceiros e escolha do usuário.</p>
    <p>23.2 De forma geral:</p>
    <ul>
      <li>cookies de sessão podem expirar ao final da navegação ou após período técnico necessário;</li>
      <li>cookies de autenticação podem permanecer pelo prazo necessário à manutenção segura da sessão;</li>
      <li>cookies de preferência podem permanecer pelo período necessário para lembrar a escolha do usuário;</li>
      <li>cookies analíticos do Google Analytics terão duração conforme configuração da ferramenta e poderão ser excluídos pelo usuário ou removidos após revogação do consentimento, quando tecnicamente possível.</li>
    </ul>
    <p>23.3 A Consulta Placa Brasil poderá atualizar informações sobre duração de cookies sempre que houver alteração técnica relevante.</p>

    <h2>24. Segurança, prevenção de abuso e proteção da plataforma</h2>
    <p>24.1 Cookies essenciais, registros técnicos e armazenamento local poderão ser utilizados para preservar a segurança, estabilidade e integridade da plataforma.</p>
    <p>24.2 Essas tecnologias poderão auxiliar na prevenção de: acessos indevidos; falhas de autenticação; uso abusivo da plataforma; consultas automatizadas; scraping; tentativa de revenda irregular de relatórios; fraude de pagamento; chargeback abusivo; violação dos Termos de Uso; e instabilidades técnicas ou acessos incompatíveis com o funcionamento regular do serviço.</p>
    <p>24.3 A Consulta Placa Brasil não divulgará detalhes técnicos que possam comprometer a segurança da plataforma, dos usuários ou dos dados tratados.</p>

    <h2>25. Alterações desta Política</h2>
    <p>25.1 Esta Política poderá ser atualizada a qualquer tempo para refletir alterações legais, regulatórias, técnicas, operacionais, comerciais, de segurança ou de funcionamento da plataforma.</p>
    <p>25.2 A versão vigente estará sempre disponível na plataforma, com indicação da data de última atualização.</p>
    <p>25.3 Alterações relevantes, especialmente quanto à inclusão de novos cookies não essenciais, ferramentas de terceiros, pixels de marketing, tecnologias de rastreamento ou novas finalidades de tratamento, poderão ser comunicadas de forma destacada e, quando necessário, submetidas a novo consentimento do usuário.</p>

    <h2>26. Relação com a Política de Privacidade</h2>
    <p>26.1 Esta Política de Cookies complementa a <a href="/privacidade">Política de Privacidade</a> da Consulta Placa Brasil.</p>
    <p>26.2 A Política de Privacidade contém informações mais amplas sobre: dados pessoais coletados; finalidades de tratamento; bases legais; compartilhamento de dados; transferência internacional; direitos dos titulares; prazos de retenção; segurança da informação; canal de privacidade; e exercício de direitos previstos na legislação aplicável.</p>
    <p>26.3 Em caso de dúvida sobre tratamento de dados pessoais, o usuário deverá consultar também a Política de Privacidade.</p>

    <h2>27. Contato</h2>
    <p>27.1 Para dúvidas sobre esta Política de Cookies, sobre a Política de Privacidade ou sobre o tratamento de dados pessoais, o usuário poderá entrar em contato pelos seguintes canais:</p>
    <ul>
      <li><strong>E-mail geral:</strong> <a href="mailto:contato@consultaplacabrasil.com">contato@consultaplacabrasil.com</a></li>
      <li><strong>Telefone:</strong> (61) 3246-9277</li>
      <li><strong>Endereço:</strong> Setor SRTVS Quadra 701, Conj. L, Bloco 1, nº 38, Asa Sul, Brasília/DF, CEP 70340-000.</li>
    </ul>
  `;

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">Política de Cookies</h1>
          <p className="mt-3 text-gray-400">Saiba como utilizamos cookies</p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div
          className="legal-content mx-auto max-w-4xl"
          dangerouslySetInnerHTML={{
            __html: (page?.content && page.content.replace(/<[^>]*>/g, "").trim().length > 20) ? page.content : defaultContent,
          }}
        />
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page?.seoTitle || "Política de Cookies",
            description: page?.seoDescription || "Política de cookies do Consulta Placa Brasil.",
            url: "https://consultaplacabrasil.com/cookies",
          }),
        }}
      />
    </div>
  );
}
