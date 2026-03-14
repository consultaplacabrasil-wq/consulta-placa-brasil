import { Metadata } from "next";
import Link from "next/link";

import GeradorRecibo from "@/components/ferramentas/gerador-recibo";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gerador de Recibo de Venda de Veículo | Consulta Placa",
  description:
    "Gere gratuitamente um recibo de compra e venda de veículo pronto para imprimir. Modelo completo com dados do vendedor, comprador e veículo.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/gerador-recibo",
  },
  openGraph: {
    title: "Gerador de Recibo de Venda de Veículo | Consulta Placa",
    description:
      "Crie seu recibo de compra e venda de veículo online, grátis e sem cadastro. Modelo completo e pronto para impressão.",
    url: "https://consultaplacabrasil.com/ferramentas/gerador-recibo",
    type: "website",
  },
};

export default function GeradorReciboPage() {
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
            <span className="text-gray-300">Gerador de Recibo</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de Recibo de Compra e Venda
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Gere um recibo de compra e venda de veículo completo, pronto para imprimir ou copiar.
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
          <GeradorRecibo />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Recibo de Compra e Venda de Veículo
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "O recibo de compra e venda de veículo tem validade jurídica?",
                answer: "Sim. O recibo de compra e venda serve como comprovante da transação financeira entre as partes. Ele atesta que o vendedor recebeu o valor acordado pela venda do veículo. Para maior segurança, recomenda-se também a elaboração de um contrato de compra e venda completo.",
              },
              {
                question: "Qual a diferença entre recibo e contrato de compra e venda?",
                answer: "O recibo comprova o pagamento e a transação financeira, enquanto o contrato de compra e venda detalha todas as condições da negociação, incluindo cláusulas sobre responsabilidades, débitos, prazos e condições do veículo. O ideal é ter ambos os documentos.",
              },
              {
                question: "Preciso reconhecer firma no recibo de venda de veículo?",
                answer: "O reconhecimento de firma no recibo não é obrigatório, mas é recomendado para conferir maior segurança jurídica ao documento. O reconhecimento de firma é obrigatório no CRV (Certificado de Registro do Veículo) para efetuar a transferência no DETRAN.",
              },
              {
                question: "O que deve constar em um recibo de venda de veículo?",
                answer: "Um recibo de venda de veículo deve conter: nome completo e CPF do vendedor e do comprador, dados do veículo (marca, modelo, ano, cor e placa), valor da venda, data da transação e assinaturas de ambas as partes.",
              },
              {
                question: "Posso usar o recibo para comunicar a venda ao DETRAN?",
                answer: "O recibo pode ser utilizado como documento complementar na comunicação de venda ao DETRAN, mas o documento principal para essa finalidade é o CRV preenchido e assinado. A comunicação de venda deve ser feita em até 30 dias após a transação.",
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

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            A importância do recibo na compra e venda de veículos
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O recibo de compra e venda de veículo é um documento fundamental para qualquer
            transação envolvendo automóveis entre particulares. Diferentemente do contrato, que
            estabelece cláusulas e condições detalhadas, o recibo tem a função primordial de
            comprovar que houve o pagamento do valor acordado entre as partes. A emissão do recibo
            protege tanto o comprador, que passa a ter um comprovante oficial do pagamento
            realizado, quanto o vendedor, que documenta o recebimento do valor. Antes de concluir
            qualquer negociação, é essencial{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              verificar a placa do veículo
            </Link>{" "}
            para garantir que não existam pendências ou restrições ocultas que possam comprometer
            a transação.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Quando utilizar um recibo de venda de veículo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O recibo deve ser emitido sempre que houver a transferência de valores na compra e
            venda de um veículo. Ele é especialmente importante em negociações à vista, onde o
            pagamento é realizado integralmente no ato da entrega do veículo. Em transações
            parceladas, recomenda-se emitir um recibo para cada parcela paga, especificando o
            valor e a data do pagamento. Além do recibo, é altamente recomendável elaborar um{" "}
            <Link href="/ferramentas/gerador-contrato" className="text-[#FF4D30] hover:underline font-medium">
              contrato de compra e venda
            </Link>{" "}
            completo, que detalha todas as condições da negociação, responsabilidades sobre
            débitos e prazos para transferência documental.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Elementos essenciais de um recibo de veículo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Um recibo de compra e venda de veículo bem elaborado deve conter a identificação
            completa das partes envolvidas (nome e CPF), a descrição do veículo negociado
            (marca, modelo, ano, cor e placa), o valor da transação em reais, a data em que o
            pagamento foi realizado e as assinaturas do vendedor e do comprador. A presença de
            todos esses elementos confere validade ao documento e facilita a comprovação da
            transação em caso de eventuais disputas. Para calcular os custos adicionais
            envolvidos na transferência do veículo, utilize a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>
            , que apresenta as taxas do DETRAN, vistoria e demais encargos por estado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Cuidados ao emitir o recibo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Ao emitir o recibo de compra e venda, certifique-se de que todos os dados estão
            corretos e correspondem aos documentos oficiais das partes e do veículo. Verifique
            se a placa, o modelo e o ano do veículo coincidem com as informações do CRV
            (Certificado de Registro do Veículo). Erros nos dados podem invalidar o documento
            ou gerar problemas na hora da transferência junto ao DETRAN. É recomendável emitir
            o recibo em duas vias, uma para o vendedor e outra para o comprador, e guardar o
            documento por pelo menos cinco anos. Explore também as demais{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil para auxiliar em todas as etapas da negociação.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> O modelo de recibo gerado por esta ferramenta é de caráter
              informativo e genérico. Para transações de alto valor ou situações que envolvam
              particularidades jurídicas, recomenda-se a consulta a um advogado especializado.
              O Consulta Placa Brasil não se responsabiliza pelo uso do documento gerado.
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
              <p className="text-sm text-[#64748B]">Gere um contrato particular de compra e venda de veículo completo, com cláusulas de proteção, assinaturas e testemunhas.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo para transferir um veículo entre estados, por doação ou herança. Taxas do DETRAN, vistoria e ITCMD.</p>
            </Link>
            <Link href="/ferramentas/consulta-cep" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Consulta CEP</h3>
              <p className="text-sm text-[#64748B]">Consulte endereços pelo CEP ou encontre o CEP de qualquer logradouro no Brasil de forma rápida e gratuita.</p>
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
            name: "Gerador de Recibo de Compra e Venda de Veículo",
            description:
              "Gere gratuitamente um recibo de compra e venda de veículo completo, com dados do vendedor, comprador e veículo. Pronto para imprimir ou copiar.",
            url: "https://consultaplacabrasil.com/ferramentas/gerador-recibo",
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
                name: "O recibo de compra e venda de veículo tem validade jurídica?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O recibo de compra e venda serve como comprovante da transação financeira entre as partes. Ele atesta que o vendedor recebeu o valor acordado pela venda do veículo. Para maior segurança, recomenda-se também a elaboração de um contrato de compra e venda completo.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a diferença entre recibo e contrato de compra e venda?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O recibo comprova o pagamento e a transação financeira, enquanto o contrato de compra e venda detalha todas as condições da negociação, incluindo cláusulas sobre responsabilidades, débitos, prazos e condições do veículo. O ideal é ter ambos os documentos.",
                },
              },
              {
                "@type": "Question",
                name: "Preciso reconhecer firma no recibo de venda de veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O reconhecimento de firma no recibo não é obrigatório, mas é recomendado para conferir maior segurança jurídica ao documento. O reconhecimento de firma é obrigatório no CRV para efetuar a transferência no DETRAN.",
                },
              },
              {
                "@type": "Question",
                name: "O que deve constar em um recibo de venda de veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Um recibo de venda de veículo deve conter: nome completo e CPF do vendedor e do comprador, dados do veículo (marca, modelo, ano, cor e placa), valor da venda, data da transação e assinaturas de ambas as partes.",
                },
              },
              {
                "@type": "Question",
                name: "Posso usar o recibo para comunicar a venda ao DETRAN?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O recibo pode ser utilizado como documento complementar na comunicação de venda ao DETRAN, mas o documento principal para essa finalidade é o CRV preenchido e assinado. A comunicação de venda deve ser feita em até 30 dias após a transação.",
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
                name: "Gerador de Recibo de Compra e Venda",
                item: "https://consultaplacabrasil.com/ferramentas/gerador-recibo",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
