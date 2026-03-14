import { Metadata } from "next";
import Link from "next/link";
import GeradorRenavam from "@/components/ferramentas/gerador-renavam";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Gerador de RENAVAM Válido",
  description:
    "Gere números de RENAVAM válidos com 11 dígitos para testes e desenvolvimento. Algoritmo módulo 11 com dígito verificador. Gratuito e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/gerador-renavam",
  },
  openGraph: {
    title: "Gerador de RENAVAM Válido | Consulta Placa",
    description:
      "Ferramenta gratuita para gerar números de RENAVAM válidos com dígito verificador calculado pelo algoritmo módulo 11. Ideal para testes.",
    url: "https://consultaplacabrasil.com/ferramentas/gerador-renavam",
    type: "website",
  },
};

const faqItems = [
  {
    question: "O que é o RENAVAM?",
    answer:
      "O RENAVAM (Registro Nacional de Veículos Automotores) é um código numérico de 11 dígitos que identifica de forma única cada veículo registrado no Brasil. Ele é atribuído no momento do primeiro registro do veículo e permanece vinculado a ele durante toda a sua vida útil, independentemente de transferências de propriedade ou mudança de estado.",
  },
  {
    question: "Como é calculado o dígito verificador do RENAVAM?",
    answer:
      "O dígito verificador do RENAVAM é calculado pelo algoritmo de módulo 11. Os 10 primeiros dígitos são multiplicados pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, da esquerda para a direita. A soma dos produtos é multiplicada por 10 e o resultado é dividido por 11. O resto dessa divisão é o dígito verificador. Caso o resto seja 10 ou mais, o dígito verificador será 0.",
  },
  {
    question: "Os RENAVAMs gerados são reais?",
    answer:
      "Não. Os números gerados por esta ferramenta são fictícios, criados de forma aleatória respeitando as regras matemáticas de formação do RENAVAM. Eles não correspondem a veículos reais registrados no sistema do DENATRAN. A ferramenta é destinada exclusivamente para fins educacionais e de teste de software.",
  },
  {
    question: "Onde encontro o RENAVAM do meu veículo?",
    answer:
      "O número do RENAVAM pode ser encontrado no Certificado de Registro e Licenciamento de Veículo (CRLV), no Certificado de Registro de Veículo (CRV) e também nas notificações de multas e débitos enviadas pelo DETRAN. Ele aparece geralmente no canto superior do documento, com 11 dígitos numéricos.",
  },
  {
    question: "Para que serve gerar um RENAVAM válido?",
    answer:
      "A geração de RENAVAMs válidos é útil para programadores e testadores que precisam validar campos de formulários, testar sistemas de cadastro veicular, realizar testes automatizados e desenvolver aplicações que exigem a entrada de um RENAVAM com dígito verificador correto, sem utilizar dados reais de veículos.",
  },
];

export default function GeradorRenavamPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gerador de RENAVAM Válido",
    description:
      "Ferramenta gratuita para gerar números de RENAVAM válidos com 11 dígitos e dígito verificador calculado pelo algoritmo módulo 11.",
    url: "https://consultaplacabrasil.com/ferramentas/gerador-renavam",
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
        name: "Gerador de RENAVAM",
        item: "https://consultaplacabrasil.com/ferramentas/gerador-renavam",
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
            <span className="text-gray-300">Gerador de RENAVAM</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Gerador de RENAVAM Válido
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Gere números de RENAVAM válidos com 11 dígitos e dígito verificador calculado automaticamente pelo algoritmo módulo 11.
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
          <GeradorRenavam />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre o RENAVAM
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
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Tudo sobre o RENAVAM e como gerar números válidos para testes
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O RENAVAM, sigla para Registro Nacional de Veículos Automotores, é um
            código numérico de 11 dígitos que funciona como a identidade única de
            cada veículo registrado no Brasil. Criado pelo DENATRAN (Departamento
            Nacional de Trânsito), esse registro é atribuído no momento da primeira
            emissão do Certificado de Registro de Veículo (CRV) e acompanha o
            automóvel durante toda a sua existência, independentemente de quantas
            vezes ele seja vendido ou transferido para outro estado. Para realizar
            uma{" "}
            <Link
              href="/"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              consultar placa de veículo
            </Link>{" "}
            e obter informações detalhadas, acesse a página inicial do Consulta
            Placa Brasil.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O número do RENAVAM é composto por 10 dígitos base e 1 dígito
            verificador, totalizando 11 algarismos. O dígito verificador é
            calculado por meio do algoritmo de módulo 11, que utiliza uma sequência
            de pesos multiplicadores aplicados a cada posição do número. Essa
            validação matemática impede a entrada de números aleatórios em
            sistemas oficiais, garantindo a integridade dos dados cadastrais do
            veículo. A compreensão desse algoritmo é fundamental para
            desenvolvedores que criam sistemas de gestão veicular, seguradoras,
            despachantes e órgãos de trânsito.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nosso gerador de RENAVAM válido permite criar números que respeitam
            todas as regras matemáticas do documento, incluindo o cálculo correto
            do dígito verificador. A ferramenta é especialmente útil para
            profissionais de tecnologia que precisam popular bancos de dados de
            teste, validar campos de formulários ou executar testes automatizados
            em aplicações que exigem a entrada de um RENAVAM com formato correto.
            Vale destacar que os números gerados são completamente fictícios e não
            estão vinculados a nenhum veículo real registrado no sistema do
            DENATRAN.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O processo de geração segue rigorosamente o algoritmo oficial: são
            criados 10 dígitos aleatórios, cada um é multiplicado pelo peso
            correspondente da sequência 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, a soma dos
            produtos é multiplicada por 10 e o resto da divisão por 11 determina o
            dígito verificador. Caso o resto seja igual ou superior a 10, o dígito
            verificador assume o valor 0. Esse mecanismo é semelhante ao utilizado
            em outros documentos brasileiros, como o CPF e o CNPJ, e garante que
            erros de digitação sejam detectados automaticamente pelos sistemas.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Esta ferramenta tem como objetivo ajudar estudantes, programadores,
            analistas e testadores a gerar números de RENAVAM válidos para testar
            softwares em desenvolvimento. Os números são gerados de forma
            aleatória, respeitando as regras de criação do documento. A má
            utilização dos dados gerados é de total responsabilidade do usuário.
            Para complementar seus testes, utilize também o{" "}
            <Link
              href="/ferramentas/validador-renavam"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              validador de RENAVAM
            </Link>
            , que verifica se um número informado possui o dígito verificador
            correto. Explore ainda o{" "}
            <Link
              href="/ferramentas/decodificador-chassi"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              decodificador de chassi
            </Link>{" "}
            e o{" "}
            <Link
              href="/ferramentas/identificador-placa"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              identificador de placa veicular
            </Link>{" "}
            para obter ainda mais informações sobre veículos. Acesse todas as{" "}
            <Link
              href="/ferramentas"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              ferramentas veiculares gratuitas
            </Link>{" "}
            disponíveis no Consulta Placa Brasil.
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
            <Link href="/ferramentas/validador-renavam" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Validador de RENAVAM</h3>
              <p className="text-sm text-[#64748B]">Verifique se um número de RENAVAM possui o dígito verificador correto.</p>
            </Link>
            <Link href="/ferramentas/decodificador-chassi" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Decodificador de Chassi</h3>
              <p className="text-sm text-[#64748B]">Decodifique o número do chassi e descubra informações sobre o veículo.</p>
            </Link>
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Identifique o padrão, estado e categoria de qualquer placa veicular brasileira.</p>
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
