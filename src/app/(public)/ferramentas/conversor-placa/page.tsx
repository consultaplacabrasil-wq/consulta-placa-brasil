import { Metadata } from "next";
import Link from "next/link";
import ConversorPlaca from "@/components/ferramentas/conversor-placa";

export const metadata: Metadata = {
  title: "Conversor de Placa Antiga para Mercosul | Consulta Placa",
  description:
    "Converta placas veiculares do formato antigo (ABC-1234) para o padrão Mercosul (ABC1C34) e vice-versa. Ferramenta gratuita, rápida e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com.br/ferramentas/conversor-placa",
  },
  openGraph: {
    title: "Conversor de Placa Antiga para Mercosul | Consulta Placa",
    description:
      "Ferramenta gratuita para converter placas veiculares entre o formato antigo brasileiro e o padrão Mercosul. Resultado instantâneo com visualização das placas.",
    url: "https://consultaplacabrasil.com.br/ferramentas/conversor-placa",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Como funciona a conversão de placa antiga para Mercosul?",
    answer:
      "A conversão segue uma regra simples: o 2º dígito numérico (5ª posição) da placa antiga é substituído por uma letra correspondente. A tabela de conversão é: 0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J. Por exemplo, a placa ABC-1234 se torna ABC1C34, pois o dígito 2 é substituído pela letra C.",
  },
  {
    question: "Toda placa antiga pode ser convertida para o padrão Mercosul?",
    answer:
      "Sim. Toda placa no formato antigo (ABC-1234) possui um equivalente direto no padrão Mercosul. A conversão é determinística: cada combinação antiga gera uma única combinação Mercosul correspondente, e vice-versa. Isso ocorre porque a única diferença entre os dois formatos é a substituição do 2º dígito por uma letra segundo a tabela oficial.",
  },
  {
    question: "A placa Mercosul do meu veículo será igual à conversão mostrada aqui?",
    answer:
      "Sim, desde que seu veículo tenha recebido a placa Mercosul como conversão direta da placa antiga. Quando um veículo troca a placa antiga pela Mercosul por motivo de transferência ou perda, o Detran utiliza exatamente essa regra de conversão. Porém, veículos novos emplacados diretamente no padrão Mercosul podem receber qualquer combinação disponível.",
  },
  {
    question: "É obrigatório trocar a placa antiga pela Mercosul?",
    answer:
      "Não é obrigatório trocar espontaneamente. A troca para o padrão Mercosul é exigida apenas em situações específicas, como transferência de propriedade, mudança de município, mudança de categoria do veículo ou em caso de furto, roubo ou extravio da placa. Veículos que mantêm a placa antiga em boas condições podem continuar circulando normalmente.",
  },
  {
    question: "Qual a diferença visual entre a placa antiga e a Mercosul?",
    answer:
      "A placa antiga de veículos particulares possui fundo cinza escuro com caracteres brancos e faixa vermelha na parte superior. Já a placa Mercosul tem fundo branco, caracteres em azul escuro (#003580) e uma faixa azul na parte superior com a inscrição 'BRASIL' e as cores da bandeira nacional. O padrão Mercosul é igual para todas as categorias de veículos.",
  },
];

export default function ConversorPlacaPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Conversor de Placa Antiga para Mercosul",
    description:
      "Ferramenta gratuita para converter placas veiculares brasileiras entre o formato antigo (ABC-1234) e o padrão Mercosul (ABC1D23), com visualização lado a lado.",
    url: "https://consultaplacabrasil.com.br/ferramentas/conversor-placa",
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
      url: "https://consultaplacabrasil.com.br",
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
        name: "Conversor de Placa",
        item: "https://consultaplacabrasil.com.br/ferramentas/conversor-placa",
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
            <span className="text-gray-300">Conversor de Placa</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Conversor de Placa Antiga para Mercosul
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Converta placas entre o formato antigo e Mercosul de forma automática e veja a representação visual.
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
          <ConversorPlaca />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre a Conversão de Placas
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

      {/* SEO Content */}
      <section className="px-4 py-16 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como converter placas do formato antigo para o padrão Mercosul
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A conversão entre os formatos de placas veiculares brasileiras, do padrão
            antigo (ABC-1234) para o padrão Mercosul (ABC1D23), segue uma regra
            oficial estabelecida pelo Conselho Nacional de Trânsito (CONTRAN). Essa
            regra é simples e determinística: o segundo dígito numérico da placa
            antiga, que corresponde à quinta posição da sequência alfanumérica, é
            substituído por uma letra de acordo com uma tabela fixa de correspondência.
            Os dígitos de 0 a 9 são convertidos, respectivamente, nas letras A, B, C,
            D, E, F, G, H, I e J. Assim, uma placa como ABC-1234 se torna ABC1C34 no
            padrão Mercosul, pois o dígito 2 é mapeado para a letra C. Se você deseja obter
            informações detalhadas sobre um veículo, faça uma{" "}
            <Link
              href="/"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              consulta placa de carro
            </Link>{" "}
            em nosso site.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Essa conversão é utilizada pelo Detran em todo o território nacional quando
            um veículo precisa trocar a placa antiga pela nova placa no padrão Mercosul.
            As situações que exigem a troca incluem transferência de propriedade do
            veículo, mudança de município de registro, alteração de categoria (por
            exemplo, de particular para comercial) e perda, furto ou deterioração da
            placa original. É importante destacar que a troca voluntária também é
            permitida, e o proprietário pode solicitar a nova placa Mercosul a qualquer
            momento, bastando procurar uma empresa credenciada pelo Detran de seu estado.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O padrão Mercosul foi implementado no Brasil a partir de setembro de 2018,
            em cumprimento à Resolução nº 729/2018 do CONTRAN, que regulamentou a
            adoção do Sistema de Placas de Identificação Veicular do Mercosul. A
            principal motivação foi a padronização entre os países do bloco econômico
            (Brasil, Argentina, Uruguai e Paraguai), facilitando a identificação e a
            fiscalização de veículos que transitam entre as fronteiras. Além da mudança
            no formato alfanumérico, a placa Mercosul trouxe avanços significativos em
            segurança, como QR Code, código de barras bidimensional e película refletiva
            com marca d&apos;água, dificultando consideravelmente a clonagem e a
            falsificação de placas. Para{" "}
            <Link
              href="/"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              consultar placa carro
            </Link>{" "}
            e obter dados cadastrais, acesse a página inicial da plataforma.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Do ponto de vista visual, a diferença entre os dois padrões é marcante. A
            placa antiga de veículos particulares possui fundo cinza escuro com
            caracteres brancos e uma faixa vermelha na parte superior. Já a placa
            Mercosul apresenta fundo branco, caracteres em azul escuro e uma faixa azul
            na parte superior com a inscrição &quot;BRASIL&quot; acompanhada das cores
            da bandeira nacional. No padrão Mercosul, todas as categorias de veículos
            utilizam o mesmo visual, ao contrário do sistema antigo, que diferenciava
            as categorias por cores distintas de fundo. Para visualizar como ficaria uma
            placa completa em cada formato, utilize nosso{" "}
            <Link
              href="/ferramentas/gerador-placa"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              gerador visual de placa
            </Link>
            .
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nosso conversor de placas permite realizar a conversão instantânea nos dois
            sentidos: do formato antigo para o Mercosul e do Mercosul para o antigo. A
            ferramenta valida automaticamente o formato digitado, exibe a tabela de
            correspondência entre dígitos e letras, e apresenta as duas placas lado a
            lado com a renderização visual fiel aos padrões oficiais. É totalmente
            gratuita, funciona diretamente no navegador e não requer cadastro. Se
            deseja identificar o padrão de uma placa existente, experimente o{" "}
            <Link
              href="/ferramentas/identificador-placa"
              className="text-[#FF4D30] hover:underline font-medium"
            >
              identificador de placa veicular
            </Link>
            . Explore também as demais{" "}
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
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Identifique o padrão, estado e categoria de qualquer placa veicular brasileira.</p>
            </Link>
            <Link href="/ferramentas/gerador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador Visual de Placa</h3>
              <p className="text-sm text-[#64748B]">Gere a representação visual de placas nos padrões Mercosul e antigo com cores e proporções realistas.</p>
            </Link>
            <Link href="/ferramentas/decodificador-chassi" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Decodificador de Chassi</h3>
              <p className="text-sm text-[#64748B]">Decodifique o número do chassi (VIN) e descubra fabricante, país de origem e especificações do veículo.</p>
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
