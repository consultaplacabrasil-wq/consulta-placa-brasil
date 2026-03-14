import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ConsultaCep from "@/components/ferramentas/consulta-cep";

export const metadata: Metadata = {
  title: "Consulta CEP para Transferência Veicular | Consulta Placa",
  description:
    "Consulte CEPs de origem e destino para transferência de veículo. Descubra se a mudança exige novo emplacamento entre estados. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/consulta-cep",
  },
  openGraph: {
    title: "Consulta CEP para Transferência Veicular | Consulta Placa",
    description:
      "Verifique CEPs de origem e destino para transferência veicular. Saiba se será necessário novo emplacamento ao mudar de estado.",
    url: "https://consultaplacabrasil.com.br/ferramentas/consulta-cep",
    type: "website",
  },
};

export default function ConsultaCepPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-[#64748B]">
            <Link href="/" className="hover:text-[#FF4D30] transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href="/ferramentas" className="hover:text-[#FF4D30] transition-colors">
              Ferramentas
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-[#0F172A] font-medium">Consulta CEP</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Consulta CEP para Transferência Veicular
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Informe os CEPs de origem e destino para verificar se a transferência do veículo
            envolve mudança de estado. Descubra se será necessário novo emplacamento e
            planeje os custos da documentação.
          </p>
        </div>
      </section>

      {/* Ferramenta */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ConsultaCep />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre CEP e Transferência Veicular
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "Por que o CEP é importante na transferência de veículo?",
                answer: "O CEP determina o município e o estado onde o veículo será registrado. Se os CEPs de origem e destino pertencem a estados diferentes, será necessário realizar novo emplacamento no estado de destino, o que implica custos adicionais com placas, vistoria e taxas do Detran.",
              },
              {
                question: "O que acontece quando transfiro um veículo para outro estado?",
                answer: "Quando a transferência envolve mudança de estado, é obrigatório realizar o emplacamento no novo estado com placas no padrão Mercosul, além de vistoria veicular. Isso gera custos extras de aproximadamente R$ 180 (emplacamento) e R$ 150 (vistoria), além da taxa de transferência do Detran.",
              },
              {
                question: "Preciso trocar a placa se a transferência for no mesmo estado?",
                answer: "Não. Se a transferência ocorre dentro do mesmo estado, basta atualizar o CRV (Certificado de Registro do Veículo) no Detran, sem necessidade de trocar as placas. Isso torna o processo mais rápido e econômico.",
              },
              {
                question: "Como funciona a consulta de CEP pela API ViaCEP?",
                answer: "A consulta utiliza a API gratuita ViaCEP, que retorna informações completas do endereço: logradouro, bairro, cidade e estado (UF). Com base na UF de cada CEP, a ferramenta compara automaticamente se origem e destino estão no mesmo estado ou em estados diferentes.",
              },
              {
                question: "Qual o prazo para transferir um veículo após a compra?",
                answer: "O prazo legal para realizar a transferência de propriedade é de 30 dias após a data da compra, conforme o Código de Trânsito Brasileiro. O descumprimento pode gerar multas e penalidades para o antigo proprietário, que permanece como responsável legal pelo veículo.",
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
            A importância do CEP na transferência de veículos
          </h2>
          <p className="text-[#475569]">
            O Código de Endereçamento Postal (CEP) desempenha um papel fundamental no processo de
            transferência veicular no Brasil. Ao comprar, vender ou receber um veículo por doação
            ou herança, o CEP do novo proprietário determina em qual município e estado o veículo
            será registrado. Essa informação é crucial porque o Detran de cada unidade federativa
            possui taxas, procedimentos e prazos específicos para a transferência de propriedade.
            Quando o comprador reside em um estado diferente de onde o veículo está atualmente
            registrado, a mudança de domicílio veicular exige procedimentos adicionais que impactam
            diretamente no custo e no tempo necessário para regularizar a documentação.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Transferência no mesmo estado vs. entre estados
          </h3>
          <p className="text-[#475569]">
            A diferença entre uma transferência dentro do mesmo estado e entre estados distintos é
            significativa. No primeiro caso, o processo é mais simples e barato: basta atualizar o
            CRV no Detran local, sem necessidade de trocar as placas do veículo. Já quando há
            mudança de estado, o novo proprietário precisa realizar o emplacamento no Detran do
            estado de destino, com confecção de novas placas no padrão Mercosul e vistoria veicular
            obrigatória. Antes de iniciar a transferência, é essencial verificar se o{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              IPVA está em dia
            </Link>{" "}
            e se não há multas pendentes no veículo, pois débitos impedem a conclusão do processo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como usar o CEP para planejar a transferência
          </h3>
          <p className="text-[#475569]">
            Nossa ferramenta de consulta de CEP permite que você identifique rapidamente se a
            transferência envolverá mudança de estado. Basta informar o CEP de onde o veículo está
            atualmente registrado (origem) e o CEP do endereço do novo proprietário (destino). A
            ferramenta consulta automaticamente a API ViaCEP e exibe a cidade e o estado de cada
            endereço. Com essa informação, você pode antecipar se haverá custos adicionais de
            emplacamento e vistoria. Para uma estimativa completa dos custos envolvidos, utilize a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>{" "}
            e informe os estados de origem e destino, o valor do veículo e o tipo de transação.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Documentação necessária para a transferência
          </h3>
          <p className="text-[#475569]">
            Independentemente de a transferência ser no mesmo estado ou entre estados diferentes,
            alguns documentos são obrigatórios: CRV preenchido e assinado com firma reconhecida,
            CPF e RG de comprador e vendedor, comprovante de residência atualizado (que comprova o
            CEP do novo endereço) e laudo de vistoria veicular. Utilize o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>{" "}
            para conferir a validade da CNH e do licenciamento antes de dar início ao processo.
            O comprovante de residência é especialmente importante porque vincula o veículo ao
            endereço (e portanto ao CEP) do novo proprietário, definindo a jurisdição do Detran
            responsável pelo registro.
          </p>

          <p className="text-[#475569]">
            Explore também outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>
            , a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Esta ferramenta utiliza a API pública e gratuita ViaCEP para
              consulta de endereços. As informações retornadas são de caráter informativo. Para
              questões oficiais sobre transferência veicular, consulte o Detran do seu estado.
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
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total para transferir um veículo entre estados, por compra e venda, doação ou herança. Taxas do Detran e ITCMD.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a validade da CNH, consulte o calendário de licenciamento e receba alertas sobre a documentação do veículo.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
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
            name: "Consulta CEP para Transferência Veicular",
            description:
              "Consulte CEPs de origem e destino para transferência de veículo. Verifique se a mudança exige novo emplacamento entre estados.",
            url: "https://consultaplacabrasil.com.br/ferramentas/consulta-cep",
            applicationCategory: "UtilityApplication",
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
                name: "Por que o CEP é importante na transferência de veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O CEP determina o município e o estado onde o veículo será registrado. Se os CEPs de origem e destino pertencem a estados diferentes, será necessário realizar novo emplacamento no estado de destino, o que implica custos adicionais com placas, vistoria e taxas do Detran.",
                },
              },
              {
                "@type": "Question",
                name: "O que acontece quando transfiro um veículo para outro estado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Quando a transferência envolve mudança de estado, é obrigatório realizar o emplacamento no novo estado com placas no padrão Mercosul, além de vistoria veicular. Isso gera custos extras de aproximadamente R$ 180 (emplacamento) e R$ 150 (vistoria), além da taxa de transferência do Detran.",
                },
              },
              {
                "@type": "Question",
                name: "Preciso trocar a placa se a transferência for no mesmo estado?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. Se a transferência ocorre dentro do mesmo estado, basta atualizar o CRV (Certificado de Registro do Veículo) no Detran, sem necessidade de trocar as placas. Isso torna o processo mais rápido e econômico.",
                },
              },
              {
                "@type": "Question",
                name: "Como funciona a consulta de CEP pela API ViaCEP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A consulta utiliza a API gratuita ViaCEP, que retorna informações completas do endereço: logradouro, bairro, cidade e estado (UF). Com base na UF de cada CEP, a ferramenta compara automaticamente se origem e destino estão no mesmo estado ou em estados diferentes.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o prazo para transferir um veículo após a compra?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O prazo legal para realizar a transferência de propriedade é de 30 dias após a data da compra, conforme o Código de Trânsito Brasileiro. O descumprimento pode gerar multas e penalidades para o antigo proprietário, que permanece como responsável legal pelo veículo.",
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
                name: "Consulta CEP para Transferência Veicular",
                item: "https://consultaplacabrasil.com.br/ferramentas/consulta-cep",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
