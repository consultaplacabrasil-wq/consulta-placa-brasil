import { Metadata } from "next";
import Link from "next/link";

import GeradorAtpv from "@/components/ferramentas/gerador-atpv";

export const metadata: Metadata = {
  title: "Gerador de ATPV-e para Transferência | Consulta Placa",
  description:
    "Gere gratuitamente a Autorização para Transferência de Propriedade de Veículo (ATPV-e). Modelo completo, pronto para copiar ou imprimir.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/gerador-atpv",
  },
  openGraph: {
    title: "Gerador de ATPV-e para Transferência | Consulta Placa",
    description:
      "Crie sua ATPV-e online, grátis e sem cadastro. Modelo auxiliar com dados do proprietário, comprador e veículo para transferência.",
    url: "https://consultaplacabrasil.com/ferramentas/gerador-atpv",
    type: "website",
  },
};

export default function GeradorAtpvPage() {
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
            <span className="text-gray-300">Gerador de ATPV-e</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de ATPV-e para Transferência
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Gere um modelo de Autorização para Transferência de Propriedade de Veículo (ATPV-e) completo, pronto para copiar ou imprimir.
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

      {/* Gerador */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <GeradorAtpv />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre a ATPV-e
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "O que é a ATPV-e?",
                answer: "A ATPV-e (Autorização para Transferência de Propriedade de Veículo Eletrônica) é o documento digital que substitui o antigo DUT (Documento Único de Transferência) e o CRV preenchido à mão. Ela é emitida pelo Detran de cada estado e autoriza formalmente a transferência de propriedade de um veículo automotor entre pessoas físicas ou jurídicas.",
              },
              {
                question: "Como emitir a ATPV-e oficial?",
                answer: "A ATPV-e oficial é emitida exclusivamente pelo Detran do estado onde o veículo está registrado. O proprietário deve acessar o portal digital do Detran do seu estado (ou o aplicativo oficial), informar os dados do comprador e gerar a autorização eletrônica. Em alguns estados, o procedimento também pode ser realizado presencialmente nas unidades do Detran.",
              },
              {
                question: "A ATPV-e é obrigatória para transferir um veículo?",
                answer: "Sim. Desde a implementação do sistema eletrônico pelo Detran, a ATPV-e é o documento exigido para formalizar a intenção de transferência de propriedade. Sem ela, o comprador não consegue realizar a transferência do veículo para o seu nome junto ao órgão de trânsito competente.",
              },
              {
                question: "Qual a diferença entre ATPV-e e CRV?",
                answer: "O CRV (Certificado de Registro de Veículo) é o documento físico de registro do veículo. Antigamente, o verso do CRV era preenchido à mão para autorizar a transferência. A ATPV-e substituiu esse procedimento manual por um processo digital, mais seguro e menos suscetível a fraudes, como clonagem de assinaturas ou adulteração de dados.",
              },
              {
                question: "O modelo gerado por esta ferramenta substitui a ATPV-e oficial?",
                answer: "Não. O modelo gerado por esta ferramenta é apenas um documento auxiliar para organizar as informações necessárias à transferência. A ATPV-e com validade legal é emitida exclusivamente pelo Detran do seu estado de forma digital. Recomendamos utilizar este modelo como apoio para reunir os dados antes de acessar o sistema oficial.",
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
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            O que é a ATPV-e e por que ela é importante?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A ATPV-e, sigla para Autorização para Transferência de Propriedade de Veículo Eletrônica,
            é o documento digital que oficializa a intenção do proprietário de transferir um veículo
            automotor para outra pessoa. Criada para modernizar e dar mais segurança ao processo de
            transferência veicular no Brasil, a ATPV-e substituiu o antigo procedimento de preenchimento
            manual no verso do CRV (Certificado de Registro de Veículo), que era vulnerável a fraudes
            como falsificação de assinaturas e adulteração de dados. Antes de iniciar qualquer
            negociação, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa do veículo
            </Link>{" "}
            para verificar a situação cadastral, restrições e débitos pendentes.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Quando a ATPV-e é necessária?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A ATPV-e é exigida em toda operação de transferência de propriedade de veículo automotor,
            seja por venda, doação, herança ou decisão judicial. O proprietário atual deve gerar a
            ATPV-e no sistema do Detran do seu estado antes que o comprador possa dar entrada na
            documentação de transferência. Sem esse documento eletrônico, o novo proprietário fica
            impossibilitado de registrar o veículo em seu nome. O prazo para o comprador providenciar
            a transferência é de 30 dias após a emissão da ATPV-e, conforme determina o Código de
            Trânsito Brasileiro. Após esse prazo, o vendedor pode comunicar a venda ao Detran para
            se resguardar de eventuais multas e infrações cometidas pelo novo possuidor.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona o processo digital da ATPV-e?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O processo de emissão da ATPV-e varia conforme o estado, mas segue uma lógica semelhante
            em todo o país. O proprietário acessa o portal ou aplicativo do Detran estadual, informa
            os dados do veículo e do comprador (CPF ou CNPJ, nome completo e endereço), define o valor
            da transação e confirma a autorização digitalmente. Em alguns estados, é necessário possuir
            certificado digital ou validação biométrica para concluir o procedimento. Após a emissão,
            o comprador recebe a notificação e pode dar entrada na transferência documental, que inclui
            o pagamento de taxas do Detran, vistoria veicular e emissão do novo CRLV (Certificado de
            Registro e Licenciamento de Veículo) em seu nome. É importante manter todos os débitos
            do veículo quitados, pois pendências de IPVA, multas ou licenciamento impedem a conclusão
            da transferência.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Documentos necessários para a transferência
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para realizar a transferência de propriedade de um veículo com a ATPV-e, são necessários
            os seguintes documentos: ATPV-e emitida pelo Detran, documento de identidade e CPF do
            comprador e do vendedor, comprovante de residência atualizado do comprador, comprovante
            de quitação de débitos do veículo (IPVA, multas, licenciamento), laudo de vistoria
            veicular e, em caso de financiamento, a autorização da instituição financeira. Recomendamos
            também a elaboração de um contrato particular de compra e venda como complemento para
            maior segurança jurídica de ambas as partes na transação.
          </p>

          <p className="text-[#475569] leading-relaxed">
            Explore também outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como o{" "}
            <Link href="/ferramentas/gerador-contrato" className="text-[#FF4D30] hover:underline font-medium">
              gerador de contrato de compra e venda
            </Link>
            , a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> O modelo de ATPV-e gerado por esta ferramenta é de caráter
              informativo e auxiliar. A ATPV-e com validade legal é emitida exclusivamente pelo
              Detran do seu estado de forma digital. O Consulta Placa Brasil não se responsabiliza
              pelo uso do documento gerado.
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
            <Link href="/ferramentas/gerador-contrato" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador de Contrato</h3>
              <p className="text-sm text-[#64748B]">Gere um contrato particular de compra e venda de veículo completo, com cláusulas de proteção e pronto para impressão.</p>
            </Link>
            <Link href="/ferramentas/gerador-recibo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador de Recibo</h3>
              <p className="text-sm text-[#64748B]">Crie um recibo de compra e venda de veículo para comprovar o pagamento e a transação entre as partes.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total para transferir um veículo, incluindo taxas do Detran, vistoria e demais encargos.</p>
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
            name: "Gerador de ATPV-e para Transferência de Veículo",
            description:
              "Gere gratuitamente um modelo de Autorização para Transferência de Propriedade de Veículo (ATPV-e) completo, com dados do proprietário, comprador e veículo. Pronto para copiar ou imprimir.",
            url: "https://consultaplacabrasil.com/ferramentas/gerador-atpv",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
            provider: {
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
                name: "O que é a ATPV-e?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A ATPV-e (Autorização para Transferência de Propriedade de Veículo Eletrônica) é o documento digital que substitui o antigo DUT e o CRV preenchido à mão. Ela é emitida pelo Detran de cada estado e autoriza formalmente a transferência de propriedade de um veículo automotor.",
                },
              },
              {
                "@type": "Question",
                name: "Como emitir a ATPV-e oficial?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A ATPV-e oficial é emitida exclusivamente pelo Detran do estado onde o veículo está registrado. O proprietário deve acessar o portal digital do Detran, informar os dados do comprador e gerar a autorização eletrônica.",
                },
              },
              {
                "@type": "Question",
                name: "A ATPV-e é obrigatória para transferir um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. A ATPV-e é o documento exigido para formalizar a intenção de transferência de propriedade. Sem ela, o comprador não consegue realizar a transferência do veículo para o seu nome junto ao Detran.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a diferença entre ATPV-e e CRV?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O CRV é o documento físico de registro do veículo. Antigamente, o verso do CRV era preenchido à mão para autorizar a transferência. A ATPV-e substituiu esse procedimento manual por um processo digital, mais seguro e menos suscetível a fraudes.",
                },
              },
              {
                "@type": "Question",
                name: "O modelo gerado por esta ferramenta substitui a ATPV-e oficial?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não. O modelo gerado é apenas um documento auxiliar para organizar as informações necessárias à transferência. A ATPV-e com validade legal é emitida exclusivamente pelo Detran do seu estado de forma digital.",
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
                name: "Gerador de ATPV-e",
                item: "https://consultaplacabrasil.com/ferramentas/gerador-atpv",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
