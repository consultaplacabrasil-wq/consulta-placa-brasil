import { Metadata } from "next";
import Link from "next/link";
import VerificadorDocumentos from "@/components/ferramentas/verificador-documentos";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Verificador de Documentos Veiculares",
  description:
    "Verifique a validade da CNH, calendário de licenciamento e situação dos documentos do veículo. Ferramenta gratuita com alertas automáticos.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/verificador-documentos",
  },
  openGraph: {
    title: "Verificador de Documentos Veiculares | Consulta Placa",
    description:
      "Consulte a validade da CNH e o calendário de licenciamento do seu veículo. Alertas visuais de vencimento e regras por faixa etária.",
    url: "https://consultaplacabrasil.com/ferramentas/verificador-documentos",
  },
};

const faqItems = [
  {
    question: "Qual é a validade da CNH de acordo com a idade do motorista?",
    answer:
      "De acordo com o Código de Trânsito Brasileiro (CTB), a CNH tem validade de 10 anos para condutores com até 49 anos, 5 anos para condutores de 50 a 69 anos, e 3 anos para condutores com 70 anos ou mais. A idade considerada é aquela na data de emissão ou renovação do documento.",
  },
  {
    question: "O que acontece se eu dirigir com a CNH vencida?",
    answer:
      "Dirigir com a CNH vencida há mais de 30 dias é infração gravíssima, com multa de R$ 293,47 e 7 pontos na carteira. O veículo pode ser retido até a apresentação de um condutor habilitado. A CNH vencida há menos de 30 dias ainda é tolerada, mas recomenda-se a renovação o quanto antes.",
  },
  {
    question: "Como funciona o calendário de licenciamento por final de placa?",
    answer:
      "O licenciamento anual obrigatório segue um calendário baseado no último dígito da placa: final 1 em janeiro, 2 em fevereiro, 3 em março, 4 em abril, 5 em maio, 6 em junho, 7 em julho, 8 em agosto, 9 em setembro e 0 em outubro. O prazo pode variar conforme o estado, mas essa é a referência nacional.",
  },
  {
    question: "Posso renovar a CNH antes do vencimento?",
    answer:
      "Sim, é possível renovar a CNH antes da data de vencimento. Muitos Detrans permitem a renovação com até 6 meses de antecedência. É necessário realizar exame médico (e psicológico, se aplicável) e pagar as taxas correspondentes. A nova validade será contada a partir da data da renovação.",
  },
  {
    question: "Quais documentos são obrigatórios para circular com o veículo?",
    answer:
      "Para circular legalmente no Brasil, o condutor deve portar a CNH válida (ou documento digital via app Carteira Digital de Trânsito) e o CRLV (Certificado de Registro e Licenciamento de Veículo) do ano vigente. O CRLV digital também é aceito e pode ser acessado pelo aplicativo oficial.",
  },
];

export default function VerificadorDocumentosPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Verificador de Documentos Veiculares",
    description:
      "Ferramenta gratuita para verificar a validade da CNH, consultar o calendário de licenciamento e receber alertas sobre a documentação do veículo.",
    url: "https://consultaplacabrasil.com/ferramentas/verificador-documentos",
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
        name: "Verificador de Documentos",
        item: "https://consultaplacabrasil.com/ferramentas/verificador-documentos",
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
            <span className="text-gray-300">Verificador de Documentos</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Verificador de Documentos Veiculares
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Verifique vencimentos da CNH, calendário de licenciamento e outros prazos importantes do seu veículo.
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
          <VerificadorDocumentos />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Documentos Veiculares
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
            Documentação veicular no Brasil: tudo o que você precisa saber
          </h2>
          <p className="text-[#475569] leading-relaxed">
            Manter a documentação do veículo e a habilitação em dia é uma obrigação de todo
            condutor brasileiro. Se precisar{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consultar placa</Link>,
            utilize nossa ferramenta principal para obter os dados atualizados do veículo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            A Carteira Nacional de Habilitação (CNH) é o principal documento
            que comprova a aptidão do motorista para conduzir veículos, enquanto o Certificado de
            Registro e Licenciamento de Veículo (CRLV) atesta que o automóvel está regularizado
            perante os órgãos de trânsito. Circular com qualquer um desses documentos vencidos
            pode resultar em multas, apreensão do veículo e pontos na carteira. Acompanhe sua
            pontuação com o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>
            .
          </p>
          <p className="text-[#475569] leading-relaxed">
            A validade da CNH no Brasil é determinada pela faixa etária do condutor no momento da
            emissão ou renovação. Condutores com até 49 anos têm CNH válida por 10 anos. Entre 50
            e 69 anos, a validade é reduzida para 5 anos, e motoristas com 70 anos ou mais precisam
            renovar a cada 3 anos.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Essas regras foram estabelecidas pela Lei nº 14.071/2020, que
            alterou o Código de Trânsito Brasileiro (CTB), visando garantir que motoristas em faixas
            etárias mais avançadas passem por avaliações médicas com maior frequência.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O licenciamento anual do veículo é outro ponto que exige atenção. Antes de verificar
            o calendário, vale{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">pesquisar placa</Link> para
            confirmar os dados cadastrais do automóvel. O calendário de
            licenciamento é definido pelo último dígito da placa do veículo: placas com final 1
            vencem em janeiro, final 2 em fevereiro, e assim por diante, até final 0 em outubro.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O não pagamento do licenciamento impede a emissão do CRLV e configura infração
            gravíssima, com multa e remoção do veículo ao pátio do Detran. Além do licenciamento,
            é necessário quitar o IPVA. Utilize a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>{" "}
            para estimar o valor do imposto, e regularize eventuais multas de trânsito pendentes para
            deixar o veículo completamente em dia.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nosso verificador de documentos veiculares foi desenvolvido para facilitar o controle
            dessas obrigações. Se você planeja comprar ou vender um veículo, confira
            a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência veicular
            </Link>{" "}
            para conhecer os custos envolvidos na documentação.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Com o verificador, você pode calcular automaticamente a data de vencimento da sua CNH
            com base na idade e na data de emissão, consultar em qual mês deve realizar o
            licenciamento do veículo e receber alertas visuais sobre a proximidade do vencimento.
            O sistema utiliza cores intuitivas: verde indica que a documentação está em dia, amarelo
            alerta que o vencimento ocorrerá nos próximos 60 dias, e vermelho indica que o documento
            já está vencido.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além do verificador de documentos, o Consulta Placa Brasil disponibiliza diversas
            outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>
            . Confira o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>{" "}
            para acompanhar sua pontuação, a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência de veículo
            </Link>{" "}
            e a{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de custo total do veículo
            </Link>
            . Todas são de uso gratuito, funcionam diretamente no navegador
            e não exigem cadastro. Mantenha seus documentos sempre atualizados e evite transtornos
            nas fiscalizações de trânsito.
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
            <Link href="/ferramentas/simulador-pontos-cnh" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Simulador de Pontos na CNH</h3>
              <p className="text-sm text-[#64748B]">Simule a pontuação da sua CNH, veja os pontos ativos, data de vencimento e risco de suspensão do direito de dirigir.</p>
            </Link>
            <Link href="/ferramentas/calculadora-transferencia" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Transferência</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total para transferir um veículo, incluindo taxas do Detran, vistoria, emplacamento e ITCMD.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
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
