import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Consulta Placa Brasil. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-red-100">
            Última atualização: 07 de março de 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-slate max-w-none prose-headings:text-[#0F172A] prose-p:text-[#475569] prose-li:text-[#475569] prose-a:text-[#FF4D30]">
            <p>
              A Consulta Placa Brasil (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou
              &ldquo;Plataforma&rdquo;) está comprometida com a proteção da sua
              privacidade. Esta Política de Privacidade descreve como coletamos,
              usamos, armazenamos e protegemos suas informações pessoais, em
              conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº
              13.709/2018).
            </p>

            <h2>1. Dados que Coletamos</h2>
            <p>Podemos coletar os seguintes tipos de dados pessoais:</p>
            <h3>1.1 Dados fornecidos por você</h3>
            <ul>
              <li>Nome completo;</li>
              <li>Endereço de e-mail;</li>
              <li>CPF (quando necessário para emissão de nota fiscal);</li>
              <li>Telefone de contato;</li>
              <li>Dados de pagamento (processados por intermediadores seguros);</li>
              <li>Placas de veículos consultados.</li>
            </ul>
            <h3>1.2 Dados coletados automaticamente</h3>
            <ul>
              <li>Endereço IP;</li>
              <li>Tipo de navegador e sistema operacional;</li>
              <li>Páginas visitadas e tempo de permanência;</li>
              <li>Dados de geolocalização aproximada;</li>
              <li>Cookies e tecnologias semelhantes.</li>
            </ul>

            <h2>2. Como Utilizamos seus Dados</h2>
            <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
            <ul>
              <li>Processar e entregar as consultas veiculares solicitadas;</li>
              <li>Processar pagamentos e emitir notas fiscais;</li>
              <li>Enviar confirmações de pedidos e relatórios por e-mail;</li>
              <li>Fornecer suporte ao cliente;</li>
              <li>
                Melhorar nossos serviços e a experiência do usuário na Plataforma;
              </li>
              <li>
                Enviar comunicações de marketing (apenas com seu consentimento
                expresso);
              </li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Prevenir fraudes e garantir a segurança da Plataforma.</li>
            </ul>

            <h2>3. Base Legal para o Tratamento</h2>
            <p>
              O tratamento dos seus dados pessoais é realizado com base nas seguintes
              hipóteses legais previstas na LGPD:
            </p>
            <ul>
              <li>
                <strong>Execução de contrato:</strong> para a prestação dos serviços
                contratados;
              </li>
              <li>
                <strong>Consentimento:</strong> para o envio de comunicações de
                marketing;
              </li>
              <li>
                <strong>Interesse legítimo:</strong> para melhoria dos serviços e
                prevenção de fraudes;
              </li>
              <li>
                <strong>Obrigação legal:</strong> para cumprimento de obrigações
                fiscais e regulatórias.
              </li>
            </ul>

            <h2>4. Armazenamento e Segurança dos Dados</h2>
            <p>
              Seus dados são armazenados em servidores seguros localizados no Brasil,
              protegidos por:
            </p>
            <ul>
              <li>Criptografia SSL/TLS de 256 bits;</li>
              <li>Firewalls e sistemas de detecção de intrusão;</li>
              <li>Controle de acesso restrito a colaboradores autorizados;</li>
              <li>Backups regulares e plano de recuperação de desastres;</li>
              <li>Monitoramento contínuo de segurança.</li>
            </ul>
            <p>
              Os dados pessoais são armazenados pelo período estritamente necessário
              para cumprir as finalidades para as quais foram coletados, respeitando
              os prazos legais de retenção obrigatória.
            </p>

            <h2>5. Compartilhamento com Terceiros</h2>
            <p>
              Podemos compartilhar seus dados pessoais com terceiros apenas nas
              seguintes situações:
            </p>
            <ul>
              <li>
                <strong>Processadores de pagamento:</strong> para viabilizar
                transações financeiras de forma segura;
              </li>
              <li>
                <strong>Prestadores de serviço:</strong> empresas que auxiliam na
                operação da Plataforma (hospedagem, e-mail, analytics), sempre sob
                contratos de confidencialidade;
              </li>
              <li>
                <strong>Autoridades competentes:</strong> quando exigido por lei,
                regulamentação ou ordem judicial;
              </li>
              <li>
                <strong>Com seu consentimento:</strong> em qualquer outra situação,
                mediante sua autorização prévia e expressa.
              </li>
            </ul>
            <p>
              Nunca vendemos, alugamos ou comercializamos seus dados pessoais a
              terceiros para fins de marketing.
            </p>

            <h2>6. Seus Direitos como Titular dos Dados</h2>
            <p>
              Conforme a LGPD, você possui os seguintes direitos em relação aos seus
              dados pessoais:
            </p>
            <ul>
              <li>
                <strong>Confirmação e acesso:</strong> confirmar a existência de
                tratamento e acessar seus dados;
              </li>
              <li>
                <strong>Correção:</strong> solicitar a correção de dados incompletos,
                inexatos ou desatualizados;
              </li>
              <li>
                <strong>Anonimização, bloqueio ou eliminação:</strong> solicitar o
                tratamento adequado de dados desnecessários ou excessivos;
              </li>
              <li>
                <strong>Portabilidade:</strong> solicitar a transferência dos seus
                dados a outro fornecedor;
              </li>
              <li>
                <strong>Eliminação:</strong> solicitar a exclusão dos dados tratados
                com base no consentimento;
              </li>
              <li>
                <strong>Revogação do consentimento:</strong> revogar o consentimento
                previamente concedido a qualquer momento;
              </li>
              <li>
                <strong>Informação:</strong> ser informado sobre as entidades com as
                quais seus dados foram compartilhados.
              </li>
            </ul>
            <p>
              Para exercer seus direitos, acesse nossa{" "}
              <a href="/lgpd">página de LGPD</a> ou entre em contato pelo e-mail{" "}
              <a href="mailto:privacidade@consultaplacabrasil.com.br">
                privacidade@consultaplacabrasil.com.br
              </a>
              .
            </p>

            <h2>7. Cookies e Tecnologias de Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias semelhantes para:</p>
            <ul>
              <li>
                <strong>Cookies essenciais:</strong> necessários para o funcionamento
                básico da Plataforma (autenticação, segurança);
              </li>
              <li>
                <strong>Cookies de desempenho:</strong> para analisar como os usuários
                interagem com a Plataforma e melhorar sua performance;
              </li>
              <li>
                <strong>Cookies de funcionalidade:</strong> para lembrar suas
                preferências e personalizar sua experiência;
              </li>
              <li>
                <strong>Cookies de marketing:</strong> para exibir anúncios relevantes
                (apenas com seu consentimento).
              </li>
            </ul>
            <p>
              Você pode gerenciar suas preferências de cookies nas configurações do
              seu navegador. A desativação de cookies essenciais pode afetar o
              funcionamento da Plataforma.
            </p>

            <h2>8. Alterações nesta Política</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente para
              refletir mudanças em nossas práticas ou na legislação aplicável. A
              versão mais recente estará sempre disponível nesta página, com a data da
              última atualização. Recomendamos a revisão periódica desta política.
            </p>

            <h2>9. Contato</h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
              tratamento dos seus dados pessoais, entre em contato:
            </p>
            <ul>
              <li>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:privacidade@consultaplacabrasil.com.br">
                  privacidade@consultaplacabrasil.com.br
                </a>
              </li>
              <li>
                <strong>Encarregado de Proteção de Dados (DPO):</strong>{" "}
                <a href="mailto:dpo@consultaplacabrasil.com.br">
                  dpo@consultaplacabrasil.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
