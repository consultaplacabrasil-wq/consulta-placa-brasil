import { Metadata } from "next";
import Link from "next/link";

import ContratoVeiculo from "@/components/ferramentas/contrato-veiculo";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gerador de Contrato de Compra e Venda de Veículo",
  description:
    "Gere contratos de compra e venda para carro, moto, caminhão, embarcação e ônibus com download em PDF grátis. Modelo completo com 10 cláusulas.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/contrato-veiculo",
  },
  openGraph: {
    title: "Gerador de Contrato de Compra e Venda de Veículo | Consulta Placa",
    description:
      "Crie contratos personalizados para qualquer tipo de veículo: carro, moto, caminhão, embarcação. Download em PDF grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/contrato-veiculo",
    type: "website",
  },
};

export default function ContratoVeiculoPage() {
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
            <span className="text-gray-300">Contrato de Veículo</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de Contrato de Compra e Venda
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Gere contratos profissionais para carro, moto, caminhão, embarcação e outros veículos. Download em PDF grátis.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PDF Grátis
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Sem cadastro
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              6 categorias
            </span>
          </div>
        </div>
      </section>

      {/* Gerador */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <ContratoVeiculo />
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
                question: "O contrato de compra e venda de veículo gerado online tem validade jurídica?",
                answer: "Sim. O contrato particular de compra e venda tem validade jurídica conforme o Código Civil Brasileiro (artigos 481 a 532). Para reforçar a segurança, recomenda-se reconhecer firma das assinaturas em cartório e contar com duas testemunhas, o que confere ao contrato a condição de título executivo extrajudicial.",
              },
              {
                question: "Preciso de um contrato diferente para cada tipo de veículo?",
                answer: "Sim. Cada categoria de veículo possui particularidades documentais. Automóveis e motocicletas utilizam placa, chassi e RENAVAM. Embarcações possuem registro na Capitania dos Portos e TIEM. Caminhões precisam informar PBT e número de eixos. Nosso gerador adapta automaticamente as cláusulas e os campos para cada tipo.",
              },
              {
                question: "Qual o prazo para transferir a documentação do veículo após a compra?",
                answer: "O Código de Trânsito Brasileiro estabelece o prazo de 30 dias para que o comprador providencie a transferência junto ao DETRAN. Para embarcações, a transferência é feita na Capitania dos Portos. O descumprimento pode gerar multas e complicações para o antigo proprietário.",
              },
              {
                question: "O que é necessário para vender uma embarcação no Brasil?",
                answer: "Para vender uma embarcação é necessário: o Título de Inscrição de Embarcação Miúda (TIEM), o registro na Capitania dos Portos, documento de identidade e CPF das partes, comprovante de quitação de taxas portuárias e o contrato de compra e venda assinado. A transferência é realizada junto à Capitania dos Portos de jurisdição.",
              },
              {
                question: "Posso gerar o contrato em PDF e imprimir?",
                answer: "Sim. Nosso gerador permite baixar o contrato completo em PDF, pronto para impressão. O PDF é formatado profissionalmente com todas as cláusulas, dados das partes, descrição do veículo, espaço para assinaturas e testemunhas. Você também pode copiar o texto ou imprimir diretamente pelo navegador.",
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
            Contrato de compra e venda de veículos: guia completo
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O contrato de compra e venda é o documento mais importante em qualquer transação
            envolvendo veículos entre particulares no Brasil. Diferentemente de um simples recibo,
            o contrato formaliza todas as condições da negociação, protegendo tanto o vendedor
            quanto o comprador contra eventuais problemas futuros. A legislação brasileira,
            por meio do Código Civil e do Código de Trânsito Brasileiro, reconhece a validade
            dos contratos particulares de compra e venda, desde que contenham os elementos
            essenciais: qualificação das partes, descrição do bem, preço, forma de pagamento
            e assinaturas. Antes de finalizar qualquer negociação de veículo, é fundamental{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa de veículo
            </Link>{" "}
            para verificar a existência de restrições, débitos ou pendências que possam
            comprometer a transação.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Contrato para automóveis e motocicletas
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A compra e venda de carros e motos entre particulares é a transação veicular
            mais comum no Brasil. O contrato para esses veículos deve conter obrigatoriamente
            os dados de placa, chassi e RENAVAM, que são os identificadores únicos do veículo
            no sistema do DETRAN. No caso de motocicletas, é importante também registrar a
            cilindrada do motor, pois essa informação é essencial para a classificação do
            veículo. Além do contrato, o vendedor deve preencher e assinar o CRV (Certificado
            de Registro do Veículo) com firma reconhecida em cartório, permitindo que o comprador
            realize a transferência junto ao DETRAN dentro do prazo legal de 30 dias. Para
            calcular os custos envolvidos nesse processo, utilize a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>
            , que apresenta as taxas do DETRAN, vistoria e demais encargos por estado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Contrato para caminhões e veículos de carga
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A venda de caminhões, carretas e reboques exige atenção especial na documentação.
            Além dos dados padrão (placa, chassi, RENAVAM), o contrato deve registrar o número
            de eixos, o Peso Bruto Total (PBT) e, quando aplicável, o número do RNTRC (Registro
            Nacional de Transportadores Rodoviários de Carga). Essas informações são fundamentais
            para a regularização do veículo junto à ANTT e para a emissão de autorizações de
            transporte. O contrato protege ambas as partes contra responsabilidades sobre multas
            de trânsito, infrações de peso nos postos de fiscalização e débitos de pedágio
            anteriores à data da venda.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Contrato para embarcações
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A venda de lanchas, barcos e jet skis segue uma regulamentação diferente dos
            veículos terrestres. Em vez de placa e chassi, as embarcações são identificadas
            pelo número de registro na Capitania dos Portos e pelo TIEM (Título de Inscrição
            de Embarcação Miúda). O contrato deve incluir ainda o número do motor, a potência
            em HP, o comprimento em pés, o material do casco e o porto de registro. A
            transferência de propriedade é realizada junto à Capitania dos Portos de jurisdição,
            e não no DETRAN. Nosso gerador adapta automaticamente todas as cláusulas para
            refletir a legislação marítima aplicável, substituindo referências a placas e
            DETRAN por registros náuticos e Capitania dos Portos.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Cláusulas essenciais de proteção
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Um contrato de compra e venda bem elaborado deve conter cláusulas que protejam
            ambas as partes. A cláusula sobre condições do veículo garante que o vendedor
            declare o estado real do bem, sem vícios ocultos. A cláusula de débitos define
            claramente a responsabilidade sobre IPVA, multas e licenciamento antes e depois
            da venda. A cláusula de transferência estabelece o prazo para a documentação ser
            passada para o nome do comprador. E a cláusula de foro determina a comarca competente
            para resolver eventuais litígios. A presença de duas testemunhas confere ao contrato
            força de título executivo extrajudicial, facilitando eventual cobrança judicial.
            Para uma proteção ainda mais completa, recomenda-se gerar também um{" "}
            <Link href="/ferramentas/gerador-recibo" className="text-[#FF4D30] hover:underline font-medium">
              recibo de compra e venda
            </Link>{" "}
            como comprovante do pagamento realizado. Explore todas as{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil para auxiliar em cada etapa da negociação do seu veículo.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os modelos de contrato gerados por esta ferramenta são de
              caráter informativo e genérico. Para transações de alto valor ou situações que
              envolvam particularidades jurídicas, recomenda-se a consulta a um advogado
              especializado. O Consulta Placa Brasil não se responsabiliza pelo uso dos
              documentos gerados.
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
            <Link href="/ferramentas/gerador-recibo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador de Recibo</h3>
              <p className="text-sm text-[#64748B]">Gere um recibo de compra e venda de veículo completo, pronto para imprimir ou copiar. Modelo gratuito e sem cadastro.</p>
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
            name: "Gerador de Contrato de Compra e Venda de Veículo",
            description:
              "Gere contratos profissionais de compra e venda para automóveis, motocicletas, caminhões, embarcações e ônibus. Download em PDF grátis com 10 cláusulas de proteção.",
            url: "https://consultaplacabrasil.com/ferramentas/contrato-veiculo",
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
                name: "O contrato de compra e venda de veículo gerado online tem validade jurídica?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O contrato particular de compra e venda tem validade jurídica conforme o Código Civil Brasileiro (artigos 481 a 532). Para reforçar a segurança, recomenda-se reconhecer firma das assinaturas em cartório e contar com duas testemunhas.",
                },
              },
              {
                "@type": "Question",
                name: "Preciso de um contrato diferente para cada tipo de veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. Cada categoria de veículo possui particularidades documentais. Automóveis e motocicletas utilizam placa, chassi e RENAVAM. Embarcações possuem registro na Capitania dos Portos e TIEM. Caminhões precisam informar PBT e número de eixos.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o prazo para transferir a documentação do veículo após a compra?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Código de Trânsito Brasileiro estabelece o prazo de 30 dias para que o comprador providencie a transferência junto ao DETRAN. Para embarcações, a transferência é feita na Capitania dos Portos.",
                },
              },
              {
                "@type": "Question",
                name: "O que é necessário para vender uma embarcação no Brasil?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para vender uma embarcação é necessário: o Título de Inscrição de Embarcação Miúda (TIEM), o registro na Capitania dos Portos, documento de identidade e CPF das partes, comprovante de quitação de taxas portuárias e o contrato de compra e venda assinado.",
                },
              },
              {
                "@type": "Question",
                name: "Posso gerar o contrato em PDF e imprimir?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O gerador permite baixar o contrato completo em PDF, pronto para impressão. O PDF é formatado profissionalmente com todas as cláusulas, dados das partes, descrição do veículo, espaço para assinaturas e testemunhas.",
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
                name: "Contrato de Compra e Venda de Veículo",
                item: "https://consultaplacabrasil.com/ferramentas/contrato-veiculo",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
