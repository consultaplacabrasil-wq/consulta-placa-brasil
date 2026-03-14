import { Metadata } from "next";
import Link from "next/link";
import DecodificadorChassi from "@/components/ferramentas/decodificador-chassi";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Decodificador de Chassi VIN | Consulta Placa Brasil",
  description:
    "Consulta chassi VIN gratuita: decodifique o número do chassi e descubra país de fabricação, fabricante, ano do modelo e valide o dígito verificador.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi",
  },
  openGraph: {
    title: "Decodificador de Chassi VIN | Consulta Placa Brasil",
    description:
      "Decodifique o número do chassi (VIN) e descubra fabricante, país de origem e ano do modelo. Ferramenta gratuita e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi",
    type: "website",
  },
};

const faqItems = [
  {
    question: "O que é o número de chassi (VIN)?",
    answer:
      "O VIN (Vehicle Identification Number) é um código alfanumérico de 17 caracteres que identifica de forma única cada veículo fabricado no mundo. Ele contém informações sobre o fabricante, país de origem, características do veículo e ano do modelo.",
  },
  {
    question: "Onde encontro o número do chassi do meu veículo?",
    answer:
      "O número do chassi pode ser encontrado no documento do veículo (CRV/CRLV), na plaqueta de identificação fixada no painel (visível pelo para-brisa), na coluna da porta do motorista, no cofre do motor ou gravado no assoalho do veículo.",
  },
  {
    question: "Por que as letras I, O e Q não são usadas no chassi?",
    answer:
      "As letras I, O e Q foram excluídas do padrão VIN porque podem ser confundidas com os números 1, 0 e 9, respectivamente. Essa regra evita erros de leitura e fraudes na identificação do veículo.",
  },
  {
    question: "O que é o dígito verificador do chassi?",
    answer:
      "O dígito verificador é o 9º caractere do VIN. Ele é calculado a partir dos demais caracteres usando uma fórmula matemática padronizada. Serve para detectar erros de digitação e possíveis adulterações no número do chassi.",
  },
  {
    question: "Como saber o ano do veículo pelo chassi?",
    answer:
      "O 10º caractere do VIN indica o ano do modelo do veículo. Cada letra ou número corresponde a um ano específico. Por exemplo, 'R' corresponde a 2024, 'S' a 2025 e 'T' a 2026. Esse código segue um padrão cíclico definido pela norma ISO 3779.",
  },
];

export default function DecodificadorChassiPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Decodificador de Chassi VIN",
    description:
      "Ferramenta gratuita para decodificar o número de chassi (VIN) de veículos e descobrir fabricante, país de origem e ano do modelo.",
    url: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
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
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const schemaBreadcrumb = {
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
        name: "Decodificador de Chassi",
        item: "https://consultaplacabrasil.com/ferramentas/decodificador-chassi",
      },
    ],
  };

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
            <span className="text-gray-300">Decodificador de Chassi</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Decodificador de Chassi (VIN)
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Extraia informações do número de chassi: país de fabricação, fabricante, ano do modelo e validação do dígito verificador.
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

      {/* Ferramenta */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <DecodificadorChassi />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Chassi e VIN
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
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

      {/* SEO Content */}
      <section className="px-4 py-16 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona o decodificador de chassi VIN
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O número de chassi, também conhecido como VIN (Vehicle Identification Number),
            é um código padronizado internacionalmente pela norma ISO 3779. Composto por 17
            caracteres alfanuméricos, ele funciona como uma espécie de &quot;RG&quot; do veículo,
            sendo único para cada unidade fabricada no mundo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Assim como a placa identifica o veículo nas vias, o chassi é o código definitivo
            de identificação. Use nosso{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">identificador de placa</Link> para
            descobrir informações a partir do emplacamento. No Brasil, o chassi é utilizado
            pelo Detran, seguradoras e órgãos de fiscalização para identificar e rastrear
            veículos de forma inequívoca.
          </p>
          <p className="text-[#475569] leading-relaxed">
            A estrutura do VIN é dividida em três partes principais. As três primeiras posições
            formam o WMI (World Manufacturer Identifier), que identifica o país de fabricação
            e o fabricante do veículo. Por exemplo, chassi que começam com &quot;9B&quot; indicam
            veículos fabricados no Brasil.
          </p>
          <p className="text-[#475569] leading-relaxed">
            As posições 4 a 9 compõem o VDS (Vehicle Descriptor Section), que descreve as
            características técnicas do veículo, como modelo, tipo de carroceria e motor. Já as
            posições 10 a 17 formam o VIS (Vehicle Identifier Section), que contém o ano do
            modelo, a planta de montagem e o número sequencial de produção.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Um elemento importante do chassi é o dígito verificador, localizado na posição 9.
            Esse dígito é calculado matematicamente a partir dos demais caracteres do VIN,
            utilizando uma tabela de transliteração e pesos específicos. Quando o dígito
            informado no chassi não corresponde ao valor calculado, pode indicar erro de
            digitação ou, em casos mais graves, adulteração do número de chassi, que é uma
            prática comum em veículos roubados ou clonados.
          </p>
          <p className="text-[#475569] leading-relaxed">
            A consulta chassi é uma etapa fundamental na compra de veículos usados. Outra
            verificação indispensável é{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar veículo pela placa</Link>,
            que revela dados cadastrais e possíveis restrições.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Ao decodificar o VIN, o comprador pode verificar se as informações do chassi conferem
            com os dados do documento (CRV/CRLV), como ano do modelo e fabricante. Se você está
            adquirindo um veículo usado, confira também a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">calculadora de transferência</Link> para
            estimar os custos de transferência de propriedade. Essa
            verificação simples pode evitar golpes e ajudar a identificar veículos com
            histórico de roubo, furto ou sinistro. Nosso decodificador de chassi é totalmente
            gratuito, funciona diretamente no navegador e não requer nenhum tipo de cadastro.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além da consulta pelo chassi, o Consulta Placa Brasil oferece diversas outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>
            , como calculadora de IPVA, simulador de financiamento, calculadora de multas e
            o{" "}
            <Link href="/ferramentas/gerador-placa" className="text-[#FF4D30] hover:underline font-medium">gerador visual de placa</Link>.
            Todas as ferramentas foram desenvolvidas para ajudar
            motoristas, compradores e profissionais do setor automotivo no dia a dia.
          </p>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Descubra informações do veículo a partir do número da placa.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Estime os custos de transferência de propriedade do veículo.</p>
            </Link>
            <Link href="/ferramentas/gerador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador Visual de Placa</h3>
              <p className="text-sm text-[#64748B]">Gere uma imagem visual da placa do veículo no padrão Mercosul ou antigo.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
    </div>
  );
}
