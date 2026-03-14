import { Metadata } from "next";
import Link from "next/link";
import IdentificadorPlaca from "@/components/ferramentas/identificador-placa";

export const metadata: Metadata = {
  title: "Identificador de Placa Veicular | Consulta Placa Brasil",
  description:
    "Identifique o padrão da placa do veículo (Mercosul ou antigo), valide o formato, descubra a cor e o significado. Ferramenta gratuita e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/identificador-placa",
  },
  openGraph: {
    title: "Identificador de Placa Veicular | Consulta Placa Brasil",
    description:
      "Descubra se a placa do veículo segue o padrão Mercosul ou antigo, valide o formato e veja a representação visual. Grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com.br/ferramentas/identificador-placa",
  },
};

const faqItems = [
  {
    question: "Qual a diferença entre placa Mercosul e placa antiga?",
    answer:
      "A placa antiga segue o formato ABC-1234 (três letras e quatro números), com fundo cinza e letras brancas para veículos particulares. Já a placa Mercosul segue o formato ABC1D23 (três letras, um número, uma letra e dois números), com fundo branco, faixa azul superior e letras azul escuro. O padrão Mercosul foi adotado no Brasil a partir de 2018.",
  },
  {
    question: "A placa Mercosul é obrigatória no Brasil?",
    answer:
      "Desde 2018, todos os veículos novos emplacados no Brasil recebem a placa no padrão Mercosul. Veículos que já possuíam a placa antiga não são obrigados a trocar, exceto em situações como transferência de município, mudança de categoria ou furto/extravio da placa.",
  },
  {
    question: "O que significam as cores das placas de veículos?",
    answer:
      "No padrão antigo, a cor da placa indica a categoria do veículo: cinza com letras brancas para particulares, vermelha com letras brancas para comerciais (táxi, aluguel), branca com letras vermelhas para veículos de experiência e aprendizagem, e azul com letras brancas para veículos oficiais. No padrão Mercosul, a placa é branca com letras azul escuro para todas as categorias.",
  },
  {
    question: "Como identificar se uma placa é válida?",
    answer:
      "Uma placa brasileira válida segue um dos dois formatos: o antigo (ABC-1234) com três letras seguidas de quatro números, ou o Mercosul (ABC1D23) com três letras, um número, uma letra e dois números. Qualquer combinação fora desses padrões indica uma placa com formato inválido.",
  },
  {
    question: "Por que o Brasil adotou a placa Mercosul?",
    answer:
      "A placa Mercosul foi adotada para padronizar a identificação veicular nos países do bloco (Brasil, Argentina, Uruguai e Paraguai), facilitando a circulação de veículos entre fronteiras. Além disso, o novo padrão possui itens de segurança mais avançados, como QR Code e código de barras bidimensional, que dificultam a clonagem.",
  },
];

export default function IdentificadorPlacaPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Identificador de Placa Veicular",
    description:
      "Ferramenta gratuita para identificar o padrão da placa veicular brasileira (Mercosul ou antigo), validar o formato e visualizar a representação da placa.",
    url: "https://consultaplacabrasil.com.br/ferramentas/identificador-placa",
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
        name: "Identificador de Placa",
        item: "https://consultaplacabrasil.com.br/ferramentas/identificador-placa",
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
            <Link href="/ferramentas" className="hover:text-[#FF4D30] transition-colors">
              Ferramentas
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-medium">Identificador de Placa</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Identificador de Placa Veicular
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Digite a placa do veículo e descubra se ela segue o padrão Mercosul ou o
            formato antigo, valide o formato e veja a representação visual da placa.
          </p>
        </div>
      </section>

      {/* Ferramenta */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <IdentificadorPlaca />
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
            Tudo sobre placas de veículos no Brasil: Mercosul e padrão antigo
          </h2>
          <p className="text-[#475569]">
            As placas de identificação veicular são elementos obrigatórios em todos os
            veículos automotores que circulam no território brasileiro. Elas funcionam
            como o principal meio de identificação visual de um veículo, permitindo o
            rastreamento, a fiscalização e o controle por parte dos órgãos de trânsito
            como o Detran e a Polícia Rodoviária Federal. Além da placa, outro código importante
            para a identificação é o chassi — utilize nosso{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>{" "}
            para extrair informações detalhadas a partir do número VIN. No Brasil, existem atualmente
            dois padrões de placas em circulação: o antigo padrão brasileiro e o novo
            padrão Mercosul, cada um com características visuais e estruturais distintas.
          </p>
          <p className="text-[#475569]">
            O padrão antigo de placas, utilizado no Brasil desde 1990 até 2018, segue
            o formato ABC-1234, composto por três letras seguidas de um hífen e quatro
            números. Visualmente, as placas de veículos particulares possuem fundo cinza
            escuro com caracteres brancos, enquanto veículos comerciais (táxis e
            transportes de aluguel) recebem placas vermelhas com letras brancas. Veículos
            oficiais utilizam placas azuis, e veículos de representação diplomática possuem
            placas douradas. Embora esse sistema ainda seja válido para veículos emplacados
            antes de 2018, ele não é mais utilizado para novos emplacamentos.
          </p>
          <p className="text-[#475569]">
            A placa Mercosul, implementada no Brasil a partir de setembro de 2018, segue
            o formato ABC1D23, onde a quinta posição é uma letra em vez de um número. Se
            deseja visualizar como ficaria uma placa nesse formato, experimente o{" "}
            <Link href="/ferramentas/gerador-placa" className="text-[#FF4D30] hover:underline font-medium">
              gerador visual de placa
            </Link>
            . O novo padrão traz visual unificado para todas as categorias: fundo branco, faixa
            azul na parte superior com o nome &quot;MERCOSUL&quot; e a bandeira do país, e
            caracteres em azul escuro. A mudança foi motivada pela necessidade de padronizar
            a identificação veicular entre os países membros do bloco — Brasil, Argentina,
            Uruguai e Paraguai — facilitando o trânsito de veículos nas fronteiras e
            melhorando a segurança contra fraudes e clonagem de placas.
          </p>
          <p className="text-[#475569]">
            Do ponto de vista da segurança, a placa Mercosul trouxe avanços significativos
            em relação ao padrão antigo. Ela incorpora elementos como QR Code, código de
            barras bidimensional (Datamatrix), película refletiva com marca d&apos;água e
            impressão por estampagem a quente. Essas características tornam a falsificação
            e a clonagem muito mais difíceis, contribuindo para a redução de crimes
            envolvendo veículos com placas adulteradas. O maior número de combinações
            possíveis (mais de 450 milhões, contra 175 milhões do padrão antigo) também
            garante a disponibilidade de placas por muitas décadas.
          </p>
          <p className="text-[#475569]">
            Nosso identificador de placas permite que você verifique rapidamente se uma
            placa segue o padrão Mercosul ou o formato antigo, valide a estrutura
            alfanumérica e visualize a representação gráfica da placa com as cores e
            elementos corretos. Se está planejando comprar ou vender um veículo, confira
            também a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>{" "}
            para estimar os custos envolvidos. A ferramenta é totalmente gratuita e não requer cadastro.
            Para obter informações mais detalhadas sobre um veículo específico, utilize
            nossa{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta de placa
            </Link>{" "}
            principal. Você também pode explorar outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            disponíveis no Consulta Placa Brasil, como o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>
            , a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência de veículo
            </Link>{" "}
            e a{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de custo total do veículo
            </Link>
            .
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
            <Link href="/ferramentas/decodificador-chassi" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Decodificador de Chassi</h3>
              <p className="text-sm text-[#64748B]">Decodifique o número do chassi (VIN) e descubra fabricante, país de origem, ano e especificações do veículo.</p>
            </Link>
            <Link href="/ferramentas/gerador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador Visual de Placa</h3>
              <p className="text-sm text-[#64748B]">Gere uma representação visual da placa veicular nos padrões Mercosul e antigo com cores e formatação realistas.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total para transferir um veículo, incluindo taxas do Detran, vistoria, emplacamento e ITCMD.</p>
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
