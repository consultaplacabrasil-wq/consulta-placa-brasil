import { Metadata } from "next";
import Link from "next/link";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Direitos do Comprador de Veículos | Consulta Placa",
  description:
    "Conheça seus direitos na compra de veículos novos e usados, financiamento e transferência. Guia completo com base no Código de Defesa do Consumidor.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/direitos-comprador",
  },
  openGraph: {
    title: "Direitos do Comprador de Veículos | Consulta Placa",
    description:
      "Conheça seus direitos na compra, financiamento e transferência de veículos. Guia completo com base no Código de Defesa do Consumidor.",
    url: "https://consultaplacabrasil.com/ferramentas/direitos-comprador",
    type: "website",
  },
};

export default function DireitosCompradorPage() {
  const faqItems = [
    {
      question: "Qual é o prazo de garantia legal na compra de um veículo?",
      answer:
        "O Código de Defesa do Consumidor (Art. 26) estabelece garantia legal de 90 dias para produtos duráveis, incluindo veículos novos e usados. Esse prazo começa a contar a partir da entrega do bem e não pode ser suprimido por contrato.",
    },
    {
      question: "Posso desistir da compra de um veículo adquirido pela internet?",
      answer:
        "Sim. O Art. 49 do CDC garante o direito de arrependimento em compras realizadas fora do estabelecimento comercial, como pela internet ou telefone. O prazo é de 7 dias corridos a partir da assinatura do contrato ou do recebimento do veículo, com direito à devolução integral dos valores pagos.",
    },
    {
      question: "O que fazer se descobrir um vício oculto no veículo comprado?",
      answer:
        "Vícios ocultos são defeitos que não eram aparentes no momento da compra. O prazo de 90 dias para reclamação começa a contar a partir da descoberta do vício, e não da data da compra. Você pode exigir o conserto, a troca do veículo, o abatimento proporcional do preço ou a devolução do valor pago.",
    },
    {
      question: "Posso fazer a portabilidade do financiamento do meu veículo?",
      answer:
        "Sim. A Resolução 4.292 do Banco Central garante o direito à portabilidade de crédito. Isso significa que você pode transferir seu financiamento para outra instituição financeira que ofereça condições melhores, como juros mais baixos, sem custos adicionais.",
    },
    {
      question: "É obrigatório contratar seguro junto com o financiamento?",
      answer:
        "Não. A venda casada, prática de condicionar a aprovação do financiamento à contratação de seguro ou outros produtos, é proibida pelo Art. 39, inciso I, do CDC. A instituição financeira não pode exigir a compra de seguro, título de capitalização ou qualquer outro produto como condição para conceder o crédito.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Direitos do Comprador</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Guia de Direitos do Comprador de Veículos
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Conheça todos os seus direitos na compra, financiamento e transferência de veículos novos e usados no Brasil, com base no Código de Defesa do Consumidor.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Guia Completo
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Base Legal (CDC)
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Atualizado 2026
            </span>
          </div>
        </div>
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">

          {/* Seção 1 */}
          <h2 className="text-2xl font-bold text-[#0F172A]">
            1. Direitos na compra de veículo novo
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A compra de um veículo novo é uma das maiores aquisições que o consumidor brasileiro
            realiza ao longo da vida. Por isso, o Código de Defesa do Consumidor (CDC) oferece
            um conjunto robusto de proteções para garantir que essa transação ocorra de forma
            justa e transparente. Conhecer esses direitos é o primeiro passo para evitar
            prejuízos e fazer valer seus interesses diante de concessionárias e fabricantes.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Garantia legal de 90 dias (CDC Art. 26)
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Todo veículo novo vendido no Brasil possui uma garantia legal mínima de 90 dias,
            conforme estabelecido pelo Art. 26 do CDC para produtos duráveis. Essa garantia
            é independente da garantia contratual oferecida pela montadora (que geralmente
            é de 3 a 5 anos). A garantia legal não pode ser reduzida ou suprimida por
            contrato. Caso o veículo apresente defeito dentro desse prazo, o consumidor
            tem direito à reparação no prazo de 30 dias. Se o reparo não for efetuado, o
            comprador pode exigir a substituição do produto, a restituição do valor pago
            ou o abatimento proporcional do preço.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito à informação clara sobre preço, taxas e condições
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Art. 6º, inciso III, do CDC garante ao consumidor o direito à informação
            adequada e clara sobre os produtos e serviços, incluindo preço, características,
            qualidade, composição, tributos e riscos. Na compra de um veículo, isso significa
            que a concessionária é obrigada a informar, de forma transparente, o preço total
            do veículo, eventuais taxas de acessórios, custos de documentação e todas as
            condições da oferta. Antes de fechar negócio, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa de veículo
            </Link>{" "}
            para verificar se não existem restrições ou pendências associadas ao bem.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito de arrependimento em compras online (7 dias)
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Com o crescimento das vendas digitais de veículos, o Art. 49 do CDC ganhou
            ainda mais relevância. Quando a compra é realizada fora do estabelecimento
            comercial (pela internet, telefone ou domicílio), o consumidor tem o direito
            de desistir do negócio no prazo de 7 dias corridos a partir da assinatura do
            contrato ou do recebimento do produto, com direito à devolução integral de
            todos os valores pagos, incluindo frete e taxas.
          </p>

          {/* Seção 2 */}
          <h2 className="text-2xl font-bold text-[#0F172A]">
            2. Direitos na compra de veículo usado
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O mercado de veículos usados movimenta milhões de transações por ano no Brasil.
            Apesar de envolver bens com desgaste natural, o comprador de veículo usado
            também está protegido pelo Código de Defesa do Consumidor quando a compra é
            feita de revendedoras ou lojas especializadas. Nas transações entre
            particulares, aplica-se o Código Civil.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Garantia legal de 90 dias para vícios ocultos
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Mesmo na compra de veículos usados, a garantia legal de 90 dias se aplica
            a vícios ocultos, ou seja, defeitos que não eram perceptíveis no momento da
            compra (Art. 26, §3º, do CDC). O prazo começa a contar a partir do momento
            em que o vício é descoberto, e não da data da compra. Isso inclui problemas
            mecânicos graves, falhas estruturais e defeitos no motor que não eram aparentes
            durante a inspeção inicial. Para se proteger, utilize sempre o{" "}
            <Link href="/ferramentas/contrato-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              gerador de contrato
            </Link>{" "}
            para formalizar a compra com cláusulas de proteção.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito à informação sobre histórico do veículo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O vendedor, seja loja ou particular, tem a obrigação de informar ao comprador
            sobre qualquer fato relevante do histórico do veículo: envolvimento em sinistros,
            passagem por leilão, existência de gravame financeiro, adulterações no chassi,
            quilometragem adulterada, entre outros. A omissão dessas informações configura
            prática abusiva (Art. 39 do CDC) e pode gerar o direito à rescisão do contrato
            com devolução integral do valor pago. Por isso, sempre procure{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa de veículo
            </Link>{" "}
            antes de fechar qualquer negociação.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Obrigação do vendedor de informar defeitos conhecidos
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O vendedor é obrigado a declarar todos os defeitos conhecidos do veículo antes
            da venda. Se o comprador descobrir que um defeito era de conhecimento do vendedor
            e foi omitido, pode exigir o conserto, abatimento do preço ou a devolução do
            valor pago. Recomenda-se sempre gerar um{" "}
            <Link href="/ferramentas/gerador-recibo" className="text-[#FF4D30] hover:underline font-medium">
              gerador de recibo
            </Link>{" "}
            detalhado que descreva as condições do veículo no ato da compra.
          </p>

          {/* Seção 3 */}
          <h2 className="text-2xl font-bold text-[#0F172A]">
            3. Direitos no financiamento de veículos
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O financiamento é a modalidade de compra mais comum para veículos no Brasil.
            Estima-se que mais da metade dos veículos vendidos no país sejam adquiridos
            por meio de crédito. O Código de Defesa do Consumidor e as normas do Banco
            Central oferecem diversas proteções ao consumidor nessa modalidade. Conhecer
            esses direitos pode representar uma economia de milhares de reais ao longo
            do contrato.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito à portabilidade de financiamento
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A Resolução 4.292 do Banco Central garante ao consumidor o direito de
            transferir seu financiamento para outra instituição financeira que ofereça
            condições mais vantajosas. A instituição credora original não pode cobrar
            nenhuma taxa pela portabilidade nem criar obstáculos para a transferência.
            Utilize o{" "}
            <Link href="/ferramentas/portabilidade-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simulador de portabilidade
            </Link>{" "}
            para comparar as condições e verificar se vale a pena migrar o seu financiamento.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito à quitação antecipada com desconto
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Art. 52, §2º, do CDC assegura ao consumidor o direito de liquidar
            antecipadamente o débito, total ou parcialmente, com redução proporcional dos
            juros e demais acréscimos. Isso significa que, ao quitar parcelas futuras antes
            do vencimento, o banco é obrigado a conceder desconto proporcional. Calcule
            exatamente quanto você pode economizar com a{" "}
            <Link href="/ferramentas/quitacao-antecipada" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de quitação antecipada
            </Link>
            .
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Proteção contra juros abusivos
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Os tribunais brasileiros consideram abusivas as taxas de juros que excedem
            significativamente a média praticada pelo mercado, divulgada periodicamente
            pelo Banco Central. Se o seu financiamento cobra uma taxa muito acima da média
            do BC para a mesma modalidade, é possível pleitear judicialmente a revisão do
            contrato. Verifique se os juros do seu financiamento são abusivos com a{" "}
            <Link href="/ferramentas/juros-abusivos" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de juros abusivos
            </Link>
            .
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Direito ao CET (Custo Efetivo Total)
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A Resolução 3.517 do Banco Central obriga as instituições financeiras a
            informar o CET (Custo Efetivo Total) de qualquer operação de crédito antes
            da assinatura do contrato. O CET inclui não apenas os juros, mas também
            tarifas, seguros, tributos e outras despesas cobradas do consumidor. Essa
            informação é essencial para comparar propostas de diferentes bancos e
            financeiras. Calcule o CET real do seu financiamento com a{" "}
            <Link href="/ferramentas/calculadora-cet" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de CET
            </Link>
            .
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Proibição de venda casada
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Art. 39, inciso I, do CDC proíbe expressamente a venda casada, que é a
            prática de condicionar a aprovação ou melhores condições de financiamento à
            contratação de seguro, título de capitalização, consórcio ou qualquer outro
            produto ou serviço. Se a instituição financeira exigir a compra de um seguro
            como condição para aprovar o financiamento, o consumidor pode denunciar a
            prática ao Procon e ao Banco Central.
          </p>

          {/* Seção 4 */}
          <h2 className="text-2xl font-bold text-[#0F172A]">
            4. Direitos na transferência de veículos
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A transferência de propriedade é uma etapa fundamental na compra e venda de
            veículos. Tanto o comprador quanto o vendedor têm direitos e obrigações
            específicos nesse processo, previstos no Código de Trânsito Brasileiro (CTB).
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Prazo de 30 dias para comunicação de venda
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Art. 134 do CTB determina que o vendedor deve comunicar a venda do veículo
            ao Detran no prazo de 30 dias. Essa comunicação é fundamental para resguardar
            o vendedor de responsabilidades sobre multas, acidentes e infrações cometidas
            pelo novo proprietário após a venda. O comprador, por sua vez, tem o mesmo
            prazo de 30 dias para providenciar a transferência do veículo para seu nome
            junto ao Detran. Para formalizar a transação de forma segura, utilize o{" "}
            <Link href="/ferramentas/contrato-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              gerador de contrato
            </Link>{" "}
            com todas as cláusulas de proteção necessárias.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Responsabilidade do vendedor por débitos anteriores
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O vendedor é responsável por todos os débitos do veículo anteriores à data da
            venda, incluindo IPVA proporcional, multas de trânsito, licenciamento e
            pedágios. É essencial que o contrato de compra e venda especifique claramente
            a data da transação e a responsabilidade de cada parte sobre débitos existentes.
            Antes da compra, consulte a situação completa do veículo para evitar surpresas
            com débitos pendentes.
          </p>

          {/* Seção 5 */}
          <h2 className="text-2xl font-bold text-[#0F172A]">
            5. Como exercer seus direitos
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Conhecer seus direitos é importante, mas saber como exercê-los é fundamental.
            O sistema brasileiro oferece diversos canais para o consumidor buscar a
            reparação de danos e o cumprimento de seus direitos na compra de veículos.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Procon (Programa de Proteção e Defesa do Consumidor)
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O Procon é o primeiro canal recomendado para resolver conflitos de consumo. O
            atendimento é gratuito e o órgão tem poder para intermediar negociações entre
            consumidor e fornecedor, aplicar multas e encaminhar casos ao Ministério Público.
            Cada estado possui seu Procon, e muitas cidades contam com unidades municipais.
            A reclamação pode ser feita presencialmente, por telefone ou pela plataforma
            consumidor.gov.br.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Banco Central do Brasil
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para questões relacionadas a financiamento, juros abusivos, portabilidade de
            crédito e venda casada de produtos financeiros, o consumidor pode registrar
            reclamação diretamente no Banco Central pelo site bcb.gov.br. O BC monitora as
            reclamações e pode aplicar sanções às instituições financeiras que desrespeitam
            os direitos dos consumidores.
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">
            Juizado Especial Cível (Pequenas Causas)
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para causas de até 20 salários mínimos, o consumidor pode ingressar diretamente
            no Juizado Especial Cível sem a necessidade de advogado. Para causas entre 20 e
            40 salários mínimos, a assistência de um advogado é obrigatória. O Juizado
            Especial é gratuito em primeira instância e costuma ser mais rápido que a
            Justiça comum, com audiências de conciliação agendadas em poucas semanas.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Este conteúdo é de caráter informativo e educacional,
              elaborado com base na legislação vigente. Não substitui a orientação de um
              advogado especializado para casos específicos. Para situações que envolvam
              valores altos ou complexidade jurídica, procure assistência profissional.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Direitos do Comprador
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-[#0F172A] font-semibold hover:text-[#FF4D30] transition-colors">
                  {item.question}
                  <span className="ml-4 text-[#FF4D30] group-open:rotate-45 transition-transform text-xl font-bold">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[#475569] leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Voltar para ferramentas */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link
            href="/ferramentas"
            className="inline-flex items-center text-[#FF4D30] font-semibold hover:underline transition-colors"
          >
            ← Ver todas as ferramentas
          </Link>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-[#F8FAFC] px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/juros-abusivos" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Juros Abusivos</h3>
              <p className="text-sm text-[#64748B]">Verifique se os juros do seu financiamento estão acima da média do Banco Central e calcule o valor a ser restituído.</p>
            </Link>
            <Link href="/ferramentas/quitacao-antecipada" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Quitação Antecipada</h3>
              <p className="text-sm text-[#64748B]">Calcule o desconto proporcional dos juros ao quitar seu financiamento antes do prazo. Simule diferentes cenários.</p>
            </Link>
            <Link href="/ferramentas/contrato-veiculo" className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Contrato de Veículo</h3>
              <p className="text-sm text-[#64748B]">Gere contratos de compra e venda profissionais para qualquer tipo de veículo, com download em PDF grátis.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Guia de Direitos do Comprador de Veículos",
            description:
              "Conheça seus direitos na compra de veículos novos e usados, financiamento e transferência. Guia completo com base no Código de Defesa do Consumidor.",
            url: "https://consultaplacabrasil.com/ferramentas/direitos-comprador",
            publisher: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              url: "https://consultaplacabrasil.com",
            },
          }),
        }}
      />

      {/* Schema: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Qual é o prazo de garantia legal na compra de um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Código de Defesa do Consumidor (Art. 26) estabelece garantia legal de 90 dias para produtos duráveis, incluindo veículos novos e usados. Esse prazo começa a contar a partir da entrega do bem e não pode ser suprimido por contrato.",
                },
              },
              {
                "@type": "Question",
                name: "Posso desistir da compra de um veículo adquirido pela internet?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O Art. 49 do CDC garante o direito de arrependimento em compras realizadas fora do estabelecimento comercial, como pela internet ou telefone. O prazo é de 7 dias corridos a partir da assinatura do contrato ou do recebimento do veículo.",
                },
              },
              {
                "@type": "Question",
                name: "O que fazer se descobrir um vício oculto no veículo comprado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Vícios ocultos são defeitos que não eram aparentes no momento da compra. O prazo de 90 dias para reclamação começa a contar a partir da descoberta do vício. Você pode exigir o conserto, a troca, o abatimento proporcional do preço ou a devolução do valor pago.",
                },
              },
              {
                "@type": "Question",
                name: "Posso fazer a portabilidade do financiamento do meu veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. A Resolução 4.292 do Banco Central garante o direito à portabilidade de crédito. Você pode transferir seu financiamento para outra instituição financeira que ofereça condições melhores, sem custos adicionais.",
                },
              },
              {
                "@type": "Question",
                name: "É obrigatório contratar seguro junto com o financiamento?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. A venda casada é proibida pelo Art. 39, inciso I, do CDC. A instituição financeira não pode exigir a compra de seguro, título de capitalização ou qualquer outro produto como condição para conceder o crédito.",
                },
              },
            ],
          }),
        }}
      />

      {/* Schema: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://consultaplacabrasil.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ferramentas",
                item: "https://consultaplacabrasil.com/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Direitos do Comprador de Veículos",
                item: "https://consultaplacabrasil.com/ferramentas/direitos-comprador",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
