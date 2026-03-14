import { Metadata } from "next";
import Link from "next/link";

import CalculadoraTransferencia from "@/components/ferramentas/calculadora-transferencia";

export const metadata: Metadata = {
  title: "Calculadora de Transferência Veicular | Consulta Placa",
  description:
    "Calcule o custo para transferir um veículo entre estados, por doação ou herança. Taxas do Detran, vistoria e ITCMD.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/calculadora-transferencia",
  },
  openGraph: {
    title: "Calculadora de Transferência Veicular | Consulta Placa",
    description:
      "Simule os custos de transferência veicular: taxas do Detran, vistoria, emplacamento e ITCMD. Grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-transferencia",
    type: "website",
  },
};

export default function CalculadoraTransferenciaPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Calculadora de Transferência</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Transferência de Veículo
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Estime o custo total para transferir um veículo entre proprietários ou estados, incluindo taxas do Detran e ITCMD.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Gratuita
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Sem cadastro
            </span>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <CalculadoraTransferencia />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Transferência de Veículo
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "Quanto custa transferir um veículo de estado?",
                answer: "O custo para transferir um veículo entre estados inclui a taxa de transferência do Detran (R$ 200 a R$ 350), taxa de vistoria (~R$ 150) e emplacamento (~R$ 180). O total varia conforme o estado de destino.",
              },
              {
                question: "Preciso pagar ITCMD na transferência de veículo?",
                answer: "O ITCMD é cobrado apenas em transferências por doação ou herança, não em compra e venda. A alíquota varia de 2% a 8% sobre o valor do veículo, conforme o estado.",
              },
              {
                question: "Qual o prazo para transferir um veículo após a compra?",
                answer: "O prazo legal para realizar a transferência de propriedade é de 30 dias após a data da compra. O descumprimento pode gerar multas e penalidades para o antigo proprietário.",
              },
              {
                question: "É necessário trocar a placa ao transferir veículo para outro estado?",
                answer: "Sim. Quando há mudança de estado, é obrigatório realizar o emplacamento no novo estado, com confecção de novas placas no padrão Mercosul. O custo é de aproximadamente R$ 180.",
              },
              {
                question: "Quais documentos são necessários para transferir um veículo?",
                answer: "São necessários o CRV preenchido e assinado com firma reconhecida, CPF e RG do comprador e vendedor, comprovante de residência atualizado, laudo de vistoria e comprovante de quitação de débitos do veículo (IPVA, licenciamento e multas).",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden"
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

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Quanto custa transferir um veículo no Brasil?
          </h2>
          <p className="text-[#475569]">
            A transferência de veículo é um procedimento obrigatório sempre que ocorre mudança de
            propriedade — seja por compra e venda, doação ou herança. O processo envolve diversas
            taxas e encargos que variam conforme o estado de registro do veículo, o tipo de
            transação e se há mudança de unidade federativa. Antes de iniciar a transferência,
            é fundamental verificar se o IPVA está em dia — use a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>{" "}
            para estimar o valor do imposto. Conhecer antecipadamente esses custos
            é essencial para planejar a aquisição de um veículo usado e evitar surpresas financeiras
            no momento da documentação. Antes de fechar negócio, você também pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa do carro
            </Link>{" "}
            para verificar a procedência do veículo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Taxas do Detran para transferência veicular
          </h3>
          <p className="text-[#475569]">
            Cada Detran estadual cobra uma taxa administrativa para processar a transferência de
            propriedade do veículo. Esse valor varia de aproximadamente R$ 200 a R$ 350, dependendo
            do estado. Estados como São Paulo e Rio de Janeiro costumam praticar as taxas mais
            elevadas, enquanto estados da região Norte geralmente possuem valores mais acessíveis.
            Além da taxa de transferência, é necessário pagar a taxa de vistoria veicular, que
            gira em torno de R$ 150 na maioria dos estados. A vistoria é obrigatória para verificar
            a integridade do chassi, motor e demais componentes do veículo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Emplacamento na mudança de estado
          </h3>
          <p className="text-[#475569]">
            Quando a transferência envolve mudança de estado — por exemplo, comprar um carro em
            Minas Gerais e registrá-lo em São Paulo — é necessário realizar o emplacamento no
            novo estado. Essa taxa adicional custa aproximadamente R$ 180 e cobre a confecção
            das novas placas no padrão Mercosul. Vale lembrar que, desde 2018, todos os novos
            emplacamentos no Brasil seguem o padrão Mercosul, com a combinação de quatro letras
            e três números. Veículos que permanecem no mesmo estado precisam apenas atualizar o
            Certificado de Registro do Veículo (CRV) sem necessidade de trocar as placas.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            ITCMD em transferências por doação ou herança
          </h3>
          <p className="text-[#475569]">
            Diferentemente da compra e venda convencional, as transferências por doação ou herança
            estão sujeitas ao ITCMD (Imposto sobre Transmissão Causa Mortis e Doação). Para ter
            uma visão completa de todos os gastos envolvidos na posse do veículo, confira a
            calculadora de{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              custo total do veículo
            </Link>
            . Esse imposto estadual incide sobre o valor do bem transferido e possui alíquotas
            que variam de 2% a 8%, conforme a legislação de cada estado. Em São Paulo, a alíquota é de 4%, enquanto em
            Minas Gerais chega a 5%. O Rio de Janeiro pratica alíquotas progressivas que podem
            atingir até 5% em determinadas faixas de valor. O ITCMD representa o maior custo na
            transferência por doação ou herança, especialmente para veículos de alto valor.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Documentos necessários para transferir um veículo
          </h3>
          <p className="text-[#475569]">
            Para efetuar a transferência de um veículo, o comprador precisa apresentar o CRV
            (Certificado de Registro do Veículo) preenchido e assinado pelo vendedor com firma
            reconhecida em cartório, cópia do CPF e RG de ambas as partes, comprovante de
            residência atualizado e o laudo de vistoria veicular. Utilize o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>{" "}
            para conferir a validade da CNH e do licenciamento. É imprescindível que todos os
            débitos do veículo — como IPVA, licenciamento e multas — estejam quitados antes de
            iniciar o processo. Para confirmar a situação cadastral do automóvel, faça uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta veiculo pela placa
            </Link>{" "}
            antes de dar entrada na transferência. O prazo legal para realizar a transferência é de 30 dias após
            a compra, e o descumprimento pode gerar multa de trânsito ao antigo proprietário.
          </p>

          <p className="text-[#475569]">
            Explore também outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de custo total do veículo
            </Link>
            , o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">
              identificador de placa veicular
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados pela calculadora são estimativas
              baseadas em taxas médias praticadas pelos Detrans estaduais e alíquotas de ITCMD
              vigentes. Para obter os valores exatos, consulte o Detran do estado de destino e a
              Secretaria da Fazenda correspondente.
            </p>
          </div>
        </div>
      </section>

      {/* Voltar para ferramentas */}
      <section className="pb-12">
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
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total anual do seu veículo incluindo IPVA, combustível, manutenção, depreciação, seguro e financiamento.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a validade da CNH, consulte o calendário de licenciamento e receba alertas sobre a documentação do veículo.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de Transferência de Veículo",
            description:
              "Calcule o custo estimado para transferir um veículo entre estados, por doação ou herança. Taxas do Detran, vistoria, emplacamento e ITCMD.",
            url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-transferencia",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            provider: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              url: "https://consultaplacabrasil.com.br",
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
                name: "Quanto custa transferir um veículo de estado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O custo para transferir um veículo entre estados inclui a taxa de transferência do Detran (R$ 200 a R$ 350), taxa de vistoria (~R$ 150) e emplacamento (~R$ 180). O total varia conforme o estado de destino.",
                },
              },
              {
                "@type": "Question",
                name: "Preciso pagar ITCMD na transferência de veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O ITCMD é cobrado apenas em transferências por doação ou herança, não em compra e venda. A alíquota varia de 2% a 8% sobre o valor do veículo, conforme o estado.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o prazo para transferir um veículo após a compra?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O prazo legal para realizar a transferência de propriedade é de 30 dias após a data da compra. O descumprimento pode gerar multas e penalidades para o antigo proprietário.",
                },
              },
              {
                "@type": "Question",
                name: "É necessário trocar a placa ao transferir veículo para outro estado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Quando há mudança de estado, é obrigatório realizar o emplacamento no novo estado, com confecção de novas placas no padrão Mercosul. O custo é de aproximadamente R$ 180.",
                },
              },
              {
                "@type": "Question",
                name: "Quais documentos são necessários para transferir um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "São necessários o CRV preenchido e assinado com firma reconhecida, CPF e RG do comprador e vendedor, comprovante de residência atualizado, laudo de vistoria e comprovante de quitação de débitos do veículo (IPVA, licenciamento e multas).",
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
                item: "https://consultaplacabrasil.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ferramentas",
                item: "https://consultaplacabrasil.com.br/ferramentas",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Calculadora de Transferência de Veículo",
                item: "https://consultaplacabrasil.com.br/ferramentas/calculadora-transferencia",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
