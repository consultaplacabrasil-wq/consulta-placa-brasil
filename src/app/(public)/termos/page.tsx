import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso da plataforma Consulta Placa Brasil. Leia atentamente antes de utilizar nossos serviços.",
};

export default function TermosPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-lg text-red-100">
            Última atualização: 07 de março de 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-slate max-w-none prose-headings:text-[#0F172A] prose-p:text-[#475569] prose-li:text-[#475569] prose-a:text-[#FF4D30]">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar a plataforma Consulta Placa Brasil
              (&ldquo;Plataforma&rdquo;), você concorda integralmente com estes Termos de
              Uso. Caso não concorde com qualquer disposição aqui apresentada,
              recomendamos que não utilize nossos serviços. O uso continuado da
              Plataforma constitui aceitação tácita destes termos e de quaisquer
              atualizações futuras.
            </p>

            <h2>2. Descrição dos Serviços</h2>
            <p>
              A Consulta Placa Brasil oferece serviços de consulta de informações
              veiculares a partir da placa do veículo, incluindo, mas não se limitando
              a:
            </p>
            <ul>
              <li>Dados cadastrais do veículo (marca, modelo, ano, cor, combustível);</li>
              <li>Situação cadastral e restrições;</li>
              <li>Histórico de sinistros e recalls;</li>
              <li>Débitos e pendências financeiras;</li>
              <li>Informações sobre leilões;</li>
              <li>Score de confiabilidade do veículo.</li>
            </ul>

            <h2>3. Cadastro e Conta do Usuário</h2>
            <p>
              Para utilizar determinados serviços, poderá ser necessário criar uma
              conta. Você é responsável por manter a confidencialidade de suas
              credenciais de acesso e por todas as atividades realizadas em sua conta.
              Compromete-se a fornecer informações verdadeiras, completas e
              atualizadas durante o cadastro.
            </p>

            <h2>4. Uso Adequado da Plataforma</h2>
            <p>O usuário compromete-se a:</p>
            <ul>
              <li>
                Utilizar a Plataforma exclusivamente para fins lícitos e em
                conformidade com a legislação brasileira vigente;
              </li>
              <li>
                Não reproduzir, duplicar, copiar, vender ou explorar comercialmente
                qualquer parte do serviço sem autorização expressa;
              </li>
              <li>
                Não utilizar mecanismos automatizados (bots, crawlers, scripts) para
                acessar a Plataforma;
              </li>
              <li>
                Não tentar acessar áreas restritas ou sistemas internos da Plataforma;
              </li>
              <li>
                Utilizar as informações obtidas de forma ética e em conformidade com a
                LGPD.
              </li>
            </ul>

            <h2>5. Pagamentos e Reembolsos</h2>
            <p>
              Os serviços de consulta são oferecidos mediante pagamento, conforme os
              valores vigentes na Plataforma no momento da contratação. Os pagamentos
              são processados por intermediadores de pagamento seguros e confiáveis.
            </p>
            <p>
              O usuário poderá solicitar reembolso em até 7 (sete) dias corridos após
              a compra, conforme o artigo 49 do Código de Defesa do Consumidor (Lei nº
              8.078/1990), desde que o relatório apresente erros comprovados ou não
              contenha as informações anunciadas.
            </p>

            <h2>6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponível na Plataforma, incluindo textos, gráficos,
              logotipos, ícones, imagens, clipes de áudio, downloads digitais e
              compilações de dados, é de propriedade exclusiva da Consulta Placa Brasil
              ou de seus licenciadores e está protegido pelas leis brasileiras de
              propriedade intelectual.
            </p>

            <h2>7. Limitação de Responsabilidade</h2>
            <p>
              A Consulta Placa Brasil envidará seus melhores esforços para garantir a
              precisão e atualidade das informações apresentadas. Contudo, não se
              responsabiliza por:
            </p>
            <ul>
              <li>
                Eventuais divergências entre as informações fornecidas e a realidade,
                decorrentes de atraso na atualização das bases de dados oficiais;
              </li>
              <li>
                Decisões tomadas pelo usuário com base exclusivamente nas informações
                dos relatórios;
              </li>
              <li>
                Indisponibilidade temporária da Plataforma por motivos de manutenção ou
                falhas técnicas;
              </li>
              <li>
                Danos indiretos, incidentais ou consequenciais decorrentes do uso da
                Plataforma.
              </li>
            </ul>

            <h2>8. Disponibilidade do Serviço</h2>
            <p>
              A Consulta Placa Brasil não garante que a Plataforma estará disponível
              de forma ininterrupta ou livre de erros. Reservamo-nos o direito de
              suspender, modificar ou descontinuar qualquer funcionalidade a qualquer
              momento, mediante aviso prévio quando possível.
            </p>

            <h2>9. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
              momento. As alterações entrarão em vigor imediatamente após a publicação
              na Plataforma. O uso continuado dos serviços após a publicação de
              alterações constituirá aceitação dos novos termos.
            </p>

            <h2>10. Legislação Aplicável e Foro</h2>
            <p>
              Estes Termos de Uso são regidos pela legislação da República Federativa
              do Brasil. Fica eleito o foro da Comarca de São Paulo, Estado de São
              Paulo, para dirimir quaisquer controvérsias decorrentes destes termos,
              com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>

            <h2>11. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco
              pelo e-mail{" "}
              <a href="mailto:contato@consultaplacabrasil.com.br">
                contato@consultaplacabrasil.com.br
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
