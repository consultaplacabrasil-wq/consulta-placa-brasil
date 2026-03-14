import { Metadata } from "next";
import Link from "next/link";
import GeradorPlaca from "@/components/ferramentas/gerador-placa";

export const metadata: Metadata = {
  title: "Gerador Visual de Placa Mercosul e Antiga | Consulta Placa Brasil",
  description:
    "Gere a representação visual de placas veiculares nos padrões Mercosul e antigo. Escolha tipo, categoria e veja o resultado em tempo real. Grátis e sem cadastro.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com.br/ferramentas/gerador-placa",
  },
  openGraph: {
    title: "Gerador Visual de Placa Mercosul e Antiga | Consulta Placa Brasil",
    description:
      "Ferramenta gratuita para gerar a visualização de placas veiculares brasileiras nos padrões Mercosul e antigo com validação automática.",
    url: "https://consultaplacabrasil.com.br/ferramentas/gerador-placa",
  },
};

const faqItems = [
  {
    question: "Qual é o formato da placa Mercosul no Brasil?",
    answer:
      "A placa Mercosul brasileira segue o formato ABC1D23, composto por três letras, um número, uma letra e dois números. Ela possui fundo branco, faixa azul na parte superior com a inscrição 'BRASIL' e as cores da bandeira nacional, e os caracteres são impressos em azul escuro (#003580). O padrão foi adotado no Brasil a partir de setembro de 2018.",
  },
  {
    question: "Como era o formato da placa antiga brasileira?",
    answer:
      "A placa no padrão antigo segue o formato ABC-1234, com três letras, um hífen e quatro números. Para veículos particulares, o fundo é cinza escuro com caracteres brancos e faixa vermelha na parte superior. Veículos comerciais possuem placa vermelha, e veículos oficiais utilizam placa azul. Esse formato foi utilizado de 1990 até 2018.",
  },
  {
    question: "Quais são as dimensões oficiais de uma placa veicular?",
    answer:
      "A placa padrão para automóveis possui dimensões de 400 mm de largura por 130 mm de altura, tanto no formato antigo quanto no Mercosul. Para motocicletas, as dimensões são reduzidas: 200 mm de largura por 170 mm de altura, com o layout dos caracteres distribuído em duas linhas.",
  },
  {
    question: "A cor da placa muda no padrão Mercosul?",
    answer:
      "No padrão Mercosul, todas as categorias de veículos utilizam a mesma placa branca com caracteres azul escuro e faixa azul superior. Diferente do padrão antigo, onde a cor de fundo variava conforme a categoria (cinza para particular, vermelha para comercial, azul para oficial), o Mercosul unificou o visual para facilitar a identificação entre os países do bloco.",
  },
  {
    question: "Posso usar o gerador de placa para fins oficiais?",
    answer:
      "Não. Esta ferramenta é exclusivamente educativa e ilustrativa. Ela permite visualizar como ficaria uma placa em cada padrão e categoria, mas não substitui documentos oficiais, não gera placas reais e não deve ser utilizada para qualquer finalidade que envolva falsificação ou adulteração de placas veiculares, o que constitui crime previsto no Código Penal Brasileiro.",
  },
];

export default function GeradorPlacaPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Gerador Visual de Placa Veicular",
    description:
      "Ferramenta gratuita para gerar a representação visual de placas veiculares brasileiras nos padrões Mercosul e antigo, com validação automática de formato.",
    url: "https://consultaplacabrasil.com.br/ferramentas/gerador-placa",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
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
        name: "Gerador Visual de Placa",
        item: "https://consultaplacabrasil.com.br/ferramentas/gerador-placa",
      },
    ],
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#64748B]">
            <Link href="/" className="hover:text-[#FF4D30] transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link
              href="/ferramentas"
              className="hover:text-[#FF4D30] transition-colors"
            >
              Ferramentas
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-medium">
              Gerador Visual de Placa
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gerador Visual de Placa
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Crie a representação visual de placas veiculares nos padrões Mercosul
            e antigo. Escolha o tipo, a categoria e digite os caracteres para ver
            o resultado em tempo real.
          </p>
        </div>
      </section>

      {/* Ferramenta */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <GeradorPlaca />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Placas Veiculares
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
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Entenda os padrões de placas veiculares no Brasil
          </h2>
          <p className="text-[#475569]">
            As placas de identificação veicular são o principal instrumento de
            reconhecimento e fiscalização de veículos automotores no Brasil. Cada
            veículo registrado no país recebe uma combinação única de letras e
            números, que permite sua identificação pelo Detran, pela Polícia
            Rodoviária Federal e por demais órgãos de trânsito. Atualmente,
            existem dois padrões de placas em circulação no território nacional:
            o padrão antigo brasileiro e o padrão Mercosul, implementado a partir
            de setembro de 2018.
          </p>
          <p className="text-[#475569]">
            O padrão antigo de placas, vigente de 1990 a 2018, segue o formato
            ABC-1234, formado por três letras e quatro números separados por
            hífen. A cor de fundo da placa varia conforme a categoria do veículo:
            cinza escuro com caracteres brancos para veículos particulares,
            vermelho com letras brancas para veículos comerciais (como táxis e
            veículos de aluguel), e azul com caracteres brancos para veículos
            pertencentes a órgãos públicos. As placas de motocicleta seguem a
            mesma codificação, porém com dimensões menores — 200 por 170
            milímetros — e os caracteres distribuídos em duas linhas.
          </p>
          <p className="text-[#475569]">
            Já o padrão Mercosul, adotado em cumprimento a uma resolução do bloco
            econômico formado por Brasil, Argentina, Uruguai e Paraguai, utiliza o
            formato ABC1D23, no qual a quinta posição é ocupada por uma letra em
            vez de um número. Visualmente, a placa Mercosul possui fundo branco,
            faixa azul escuro na parte superior com a inscrição
            &quot;BRASIL&quot; e as cores da bandeira nacional, e os caracteres
            são impressos em azul escuro. Esse padrão unificado é utilizado para
            todas as categorias de veículos, sem diferenciação de cores.
          </p>
          <p className="text-[#475569]">
            As dimensões oficiais da placa para automóveis são 400 milímetros de
            largura por 130 milímetros de altura, tanto no padrão antigo quanto
            no Mercosul. A placa Mercosul incorpora recursos avançados de
            segurança, como QR Code, código de barras bidimensional (Datamatrix)
            e película refletiva com marca d&apos;água, tornando a clonagem e a
            falsificação significativamente mais difíceis. Além disso, o novo
            formato amplia o número de combinações possíveis para mais de 450
            milhões, garantindo disponibilidade por décadas.
          </p>
          <p className="text-[#475569]">
            Nosso gerador visual de placas permite que você visualize como ficaria
            uma placa nos dois padrões e em diferentes categorias. A ferramenta
            valida automaticamente o formato conforme o tipo selecionado e exibe a
            representação gráfica em tempo real, com as cores e proporções
            corretas. Tudo é feito diretamente no navegador, sem necessidade de
            cadastro. Se você deseja identificar o padrão de uma placa já
            existente, utilize nosso{" "}
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
            disponíveis no Consulta Placa Brasil, como a calculadora de IPVA, o
            simulador de financiamento e o decodificador de chassi.
          </p>
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
