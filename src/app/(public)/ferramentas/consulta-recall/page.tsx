import { Metadata } from "next";
import Link from "next/link";
import ConsultaRecall from "@/components/ferramentas/consulta-recall";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Consulta de Recall Veicular",
  description:
    "Consulte recalls veiculares por marca no Brasil. Veja modelos afetados, riscos e orientações. Acesse também o portal oficial do SENATRAN para consulta por placa.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/consulta-recall",
  },
  openGraph: {
    title: "Consulta de Recall Veicular | Consulta Placa",
    description:
      "Verifique os recalls mais recentes por marca, modelos afetados, riscos identificados e como proceder. Ferramenta informativa gratuita.",
    url: "https://consultaplacabrasil.com/ferramentas/consulta-recall",
  },
};

const faqItems = [
  {
    question: "O que é um recall veicular e por que ele é importante?",
    answer:
      "O recall é um chamamento feito pelo fabricante do veículo para corrigir defeitos de fabricação que possam comprometer a segurança dos ocupantes ou de terceiros. Ele é regulamentado pelo Código de Defesa do Consumidor e pela Portaria nº 618/2017 do Denatran. Atender ao recall é fundamental para evitar riscos como incêndios, falhas nos freios ou problemas nos airbags.",
  },
  {
    question: "O recall é gratuito para o proprietário do veículo?",
    answer:
      "Sim, por lei o recall é totalmente gratuito. O fabricante é responsável por arcar com todos os custos de reparo, substituição de peças e mão de obra. Não é necessário que o veículo esteja dentro do período de garantia, pois o recall se aplica a todos os veículos afetados, independentemente da quilometragem ou do tempo de uso.",
  },
  {
    question: "Como saber se meu veículo tem recall pendente?",
    answer:
      "Você pode verificar se o seu veículo possui recall pendente acessando o portal do SENATRAN (Secretaria Nacional de Trânsito) com o número da placa ou do chassi (RENAVAM). As montadoras também enviam notificações por carta ou e-mail para os proprietários registrados. Outra opção é entrar em contato diretamente com a concessionária da marca.",
  },
  {
    question: "O que acontece se eu não atender ao recall?",
    answer:
      "Não existe multa ou penalidade legal por não atender ao recall, mas o proprietário assume os riscos decorrentes do defeito não corrigido. Em caso de acidente causado pelo problema objeto do recall, a responsabilidade pode recair sobre o proprietário que foi notificado e não compareceu. Além disso, o não atendimento pode afetar o valor de revenda e a cobertura do seguro.",
  },
  {
    question: "Qual é o prazo para atender a um recall veicular?",
    answer:
      "Não há prazo limite para o proprietário comparecer ao recall, que permanece disponível enquanto houver peças e infraestrutura para a correção. No entanto, recomenda-se atender o mais rápido possível, especialmente em recalls que envolvem riscos graves como airbags, freios ou sistemas de combustível. O fabricante é obrigado a disponibilizar o reparo por pelo menos 12 meses após o início da campanha.",
  },
];

export default function ConsultaRecallPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Consulta de Recall Veicular",
    description:
      "Ferramenta informativa gratuita para consultar recalls veiculares por marca no Brasil. Veja modelos afetados, riscos e orientações de reparo.",
    url: "https://consultaplacabrasil.com/ferramentas/consulta-recall",
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
        name: "Consulta de Recall",
        item: "https://consultaplacabrasil.com/ferramentas/consulta-recall",
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
            <span className="text-gray-300">Consulta de Recall</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Consulta de Recall Veicular
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Verifique recalls recentes por marca e saiba como proceder para garantir a segurança do seu veículo.
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
          <ConsultaRecall />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Recall Veicular
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
            Recall veicular no Brasil: segurança, direitos e como consultar
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O recall veicular é um dos mecanismos mais importantes de proteção ao
            consumidor no setor automotivo brasileiro. Quando um fabricante identifica
            um defeito de projeto ou de fabricação que possa comprometer a segurança
            dos ocupantes, de pedestres ou de outros veículos, ele é obrigado por lei
            a convocar todos os proprietários dos veículos afetados para realizar o
            reparo gratuitamente. Esse procedimento é regulamentado pelo Código de
            Defesa do Consumidor (Lei nº 8.078/1990) e fiscalizado pela Secretaria
            Nacional do Consumidor (SENACON) e pelo SENATRAN. Se você deseja verificar
            a situação completa do seu veículo, utilize também o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>
            .
          </p>
          <p className="text-[#475569] leading-relaxed">
            Os recalls mais frequentes no Brasil envolvem problemas em airbags,
            sistemas de freio, componentes do motor e sistemas elétricos. A campanha
            mais conhecida mundialmente foi a do fabricante de airbags Takata, que
            afetou milhões de veículos de diversas marcas e resultou em substituições
            de infladores em todo o país. Outros recalls comuns incluem falhas em
            bombas de combustível, vazamentos em linhas de combustível e problemas em
            software de módulos eletrônicos. Conhecer o histórico do seu veículo é
            essencial, e para isso você pode utilizar o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>{" "}
            para identificar as características de fábrica a partir do número VIN.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Para consultar se o seu veículo possui recall pendente, o caminho oficial
            é acessar o portal do SENATRAN (Secretaria Nacional de Trânsito) ou o site
            do Procon do seu estado. Nessas plataformas, é possível realizar a busca
            pela placa do veículo ou pelo número do chassi (RENAVAM). As montadoras
            também são obrigadas a notificar os proprietários por carta registrada,
            e-mail ou outros meios de comunicação direta.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Caso tenha adquirido o veículo de segunda mão, é ainda mais importante
            verificar a existência de recalls pendentes. Faça uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta do veículo pela placa
            </Link>{" "}
            para obter um panorama completo e confira a{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">
              ferramenta de identificação de placa
            </Link>{" "}
            para obter informações sobre a origem do veículo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O proprietário que não atende ao recall assume os riscos do defeito não
            corrigido. Embora não haja multa de trânsito pelo não comparecimento, a
            responsabilidade civil em caso de acidente pode recair sobre o dono do
            veículo que foi devidamente notificado. Além disso, seguradoras podem
            negar a cobertura de sinistros relacionados a defeitos cobertos por recall
            não atendido. O reparo é sempre gratuito, sem limite de quilometragem ou
            prazo de garantia, e o fabricante arca com todas as peças e mão de obra
            necessárias.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nossa ferramenta de consulta de recall apresenta os chamamentos mais
            recentes organizados por marca, com informações sobre os modelos e anos
            afetados, a descrição do defeito, os riscos envolvidos e as orientações
            para o proprietário. Embora esses dados sejam informativos, recomendamos
            sempre a consulta oficial no portal do SENATRAN para confirmar a situação
            específica do seu veículo. Explore também outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            disponíveis no Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>
            , a{" "}
            <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de multas
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>
            . Todas funcionam diretamente no navegador, sem necessidade de cadastro.
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
              <p className="text-sm text-[#64748B]">Decodifique o número VIN do seu veículo e descubra país de origem, fabricante, modelo, ano e características de fábrica.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a validade da CNH, o calendário de licenciamento e a situação dos documentos do seu veículo.</p>
            </Link>
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Identifique a origem do veículo pela placa, descubra o estado, a cidade de registro e o formato Mercosul.</p>
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
