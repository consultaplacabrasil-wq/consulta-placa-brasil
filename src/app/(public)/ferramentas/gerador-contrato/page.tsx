import { Metadata } from "next";
import Link from "next/link";

import GeradorContrato from "@/components/ferramentas/gerador-contrato";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gerador de Contrato de Compra e Venda de Veículo | Consulta Placa",
  description:
    "Gere gratuitamente um contrato de compra e venda de veículo completo e pronto para imprimir. Modelo com cláusulas, assinaturas e testemunhas.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/gerador-contrato",
  },
  openGraph: {
    title: "Gerador de Contrato de Compra e Venda de Veículo | Consulta Placa",
    description:
      "Crie seu contrato de compra e venda de veículo online, grátis e sem cadastro. Modelo completo com 10 cláusulas e pronto para impressão.",
    url: "https://consultaplacabrasil.com/ferramentas/gerador-contrato",
    type: "website",
  },
};

export default function GeradorContratoPage() {
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
            <span className="text-gray-300">Gerador de Contrato</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de Contrato de Compra e Venda
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Gere um contrato particular de compra e venda de veículo completo, pronto para imprimir ou copiar.
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
          <GeradorContrato />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Contrato de Compra e Venda de Veículo
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "O contrato de compra e venda de veículo tem validade jurídica?",
                answer: "Sim. O contrato particular de compra e venda de veículo tem validade jurídica conforme o Código Civil Brasileiro (artigos 481 a 532). Para maior segurança, recomenda-se o reconhecimento de firma das assinaturas em cartório e a presença de duas testemunhas.",
              },
              {
                question: "Quais documentos são necessários para formalizar a venda de um veículo?",
                answer: "São necessários: contrato de compra e venda assinado por ambas as partes, CRV (Certificado de Registro do Veículo) preenchido e assinado pelo vendedor com firma reconhecida, cópias do CPF e RG de comprador e vendedor, comprovante de residência atualizado e comprovante de quitação de débitos do veículo.",
              },
              {
                question: "É obrigatório reconhecer firma no contrato de compra e venda?",
                answer: "O reconhecimento de firma não é obrigatório no contrato em si, mas é obrigatório no CRV para efetuar a transferência no DETRAN. No entanto, reconhecer firma no contrato aumenta a segurança jurídica da transação para ambas as partes.",
              },
              {
                question: "Qual o prazo para transferir o veículo após a compra?",
                answer: "O Código de Trânsito Brasileiro estabelece o prazo de 30 dias para que o comprador providencie a transferência da documentação do veículo para o seu nome junto ao DETRAN. O descumprimento pode gerar multas e penalidades para o antigo proprietário.",
              },
              {
                question: "O que acontece se o comprador não transferir o veículo no prazo?",
                answer: "Se o comprador não transferir o veículo em 30 dias, o vendedor poderá comunicar a venda ao DETRAN para se resguardar de responsabilidades sobre multas e infrações futuras. O contrato de compra e venda serve como prova da transação para essa comunicação.",
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
            Por que fazer um contrato de compra e venda de veículo?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O contrato particular de compra e venda de veículo automotor é um documento essencial
            para formalizar a transferência de propriedade entre particulares. Embora muitas pessoas
            realizem a negociação apenas com o preenchimento do CRV (Certificado de Registro do
            Veículo), ter um contrato escrito garante proteção jurídica tanto para o vendedor quanto
            para o comprador. Antes de finalizar a venda, é importante calcular os custos envolvidos
            na{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              transferência veicular
            </Link>{" "}
            para evitar surpresas financeiras durante o processo de documentação.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Segurança jurídica para ambas as partes
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O contrato de compra e venda estabelece de forma clara as obrigações do vendedor e do
            comprador, incluindo a descrição detalhada do veículo, o valor da transação, a forma
            de pagamento e as responsabilidades sobre débitos anteriores e posteriores à venda. Com
            um contrato bem redigido, o vendedor se protege contra possíveis cobranças de multas e
            infrações cometidas após a venda, enquanto o comprador tem garantia sobre as condições
            do veículo declaradas no documento. Para verificar informações sobre o veículo antes da
            compra, utilize o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>{" "}
            e confirme os dados de fábrica do automóvel.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Cláusulas essenciais do contrato de veículo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Um contrato de compra e venda de veículo completo deve conter a qualificação das partes
            (nome, CPF, endereço), a descrição do veículo (marca, modelo, ano, cor, placa, chassi e
            RENAVAM), o preço e condições de pagamento, cláusulas sobre o estado de conservação do
            veículo, responsabilidade sobre débitos, prazo para transferência documental, eleição de
            foro e assinaturas das partes com testemunhas. A presença de duas testemunhas confere ao
            contrato a condição de título executivo extrajudicial, conforme o artigo 784 do Código
            de Processo Civil, o que facilita eventual cobrança judicial em caso de inadimplência.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Comunicação de venda ao DETRAN
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Após assinar o contrato e entregar o veículo, é fundamental que o vendedor comunique a
            venda ao DETRAN do seu estado. Essa comunicação protege o antigo proprietário contra
            multas, infrações e até responsabilidade criminal por atos praticados com o veículo após
            a venda. O contrato de compra e venda é o documento que comprova a data da transação e
            serve como base para a comunicação de venda. Para identificar a origem do veículo pela
            placa, utilize o{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">
              identificador de placa veicular
            </Link>
            . O prazo para o comprador realizar a transferência é de 30 dias, conforme o Código de
            Trânsito Brasileiro. Caso o comprador não efetue a transferência nesse período, o
            vendedor pode registrar a comunicação de venda e solicitar o bloqueio do veículo. Antes
            de fechar qualquer negociação, recomendamos{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              verificar placa de veículo
            </Link>{" "}
            para garantir que não existam restrições ou pendências ocultas.
          </p>

          <p className="text-[#475569] leading-relaxed">
            Explore também outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>
            , o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simulador de financiamento
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> O modelo de contrato gerado por esta ferramenta é de caráter
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
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo para transferir um veículo entre estados, por doação ou herança. Taxas do Detran, vistoria e ITCMD.</p>
            </Link>
            <Link href="/ferramentas/decodificador-chassi" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Decodificador de Chassi</h3>
              <p className="text-sm text-[#64748B]">Decodifique o número do chassi (VIN) e descubra marca, modelo, ano, país de origem e demais dados do veículo.</p>
            </Link>
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Identifique o estado e a cidade de registro de um veículo a partir do número da placa no padrão Mercosul ou antigo.</p>
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
            name: "Gerador de Contrato de Compra e Venda de Veículo",
            description:
              "Gere gratuitamente um contrato particular de compra e venda de veículo automotor completo, com cláusulas de proteção, assinaturas e testemunhas. Pronto para imprimir.",
            url: "https://consultaplacabrasil.com/ferramentas/gerador-contrato",
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
                name: "O contrato de compra e venda de veículo tem validade jurídica?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O contrato particular de compra e venda de veículo tem validade jurídica conforme o Código Civil Brasileiro (artigos 481 a 532). Para maior segurança, recomenda-se o reconhecimento de firma das assinaturas em cartório e a presença de duas testemunhas.",
                },
              },
              {
                "@type": "Question",
                name: "Quais documentos são necessários para formalizar a venda de um veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "São necessários: contrato de compra e venda assinado por ambas as partes, CRV preenchido e assinado pelo vendedor com firma reconhecida, cópias do CPF e RG, comprovante de residência atualizado e comprovante de quitação de débitos do veículo.",
                },
              },
              {
                "@type": "Question",
                name: "É obrigatório reconhecer firma no contrato de compra e venda?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O reconhecimento de firma não é obrigatório no contrato em si, mas é obrigatório no CRV para efetuar a transferência no DETRAN. No entanto, reconhecer firma no contrato aumenta a segurança jurídica da transação.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o prazo para transferir o veículo após a compra?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Código de Trânsito Brasileiro estabelece o prazo de 30 dias para que o comprador providencie a transferência da documentação do veículo para o seu nome junto ao DETRAN.",
                },
              },
              {
                "@type": "Question",
                name: "O que acontece se o comprador não transferir o veículo no prazo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Se o comprador não transferir o veículo em 30 dias, o vendedor poderá comunicar a venda ao DETRAN para se resguardar de responsabilidades sobre multas e infrações futuras. O contrato serve como prova da transação.",
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
                name: "Gerador de Contrato de Compra e Venda",
                item: "https://consultaplacabrasil.com/ferramentas/gerador-contrato",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
