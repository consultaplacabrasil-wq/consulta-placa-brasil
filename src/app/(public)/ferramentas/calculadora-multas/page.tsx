import { Metadata } from "next";
import Link from "next/link";

import { CalculadoraMultas } from "@/components/ferramentas/calculadora-multas";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Calculadora de Multas de Trânsito",
  description:
    "Consulte o valor das multas de trânsito do CTB, pontos na CNH e gravidade das infrações. Tabela atualizada com todas as multas de trânsito do Brasil.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/calculadora-multas",
  },
  openGraph: {
    title: "Calculadora de Multas de Trânsito | Consulta Placa Brasil",
    description:
      "Consulte o valor das multas de trânsito, pontos na CNH e gravidade das infrações. Tabela atualizada do CTB.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-multas",
    type: "website",
  },
};

export default function CalculadoraMultasPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Calculadora de Multas</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora de Multas de Trânsito
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Consulte o valor atualizado de qualquer infração do CTB, os pontos na CNH e a gravidade. Pesquise por descrição ou código.
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

      {/* Calculadora */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <CalculadoraMultas />
        </div>
      </section>

      {/* CTA Sugerir Ferramenta */}
      <section className="px-4 pb-4">
        <div className="container mx-auto max-w-4xl">
          <SugestaoCTA />
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Tabela de Multas de Trânsito no Brasil
          </h2>
          <p className="text-[#475569] leading-relaxed">
            As multas de trânsito no Brasil são regulamentadas pelo Código de
            Trânsito Brasileiro (CTB), Lei nº 9.503/1997. Ao{" "}
            <Link href="/" className="text-[#C73A1E] hover:underline font-medium">consultar placa de carro</Link>,
            é possível verificar se há pendências associadas ao veículo. Cada infração possui
            um valor específico, uma quantidade de pontos que é registrada na
            Carteira Nacional de Habilitação (CNH) do condutor e uma
            classificação de gravidade que determina a severidade da penalidade.
          </p>
          <p className="text-[#475569] leading-relaxed">
            As infrações são classificadas em quatro categorias de gravidade:
            leve (3 pontos), média (4 pontos), grave (5 pontos) e gravíssima
            (7 pontos). O condutor que acumular 40 pontos em um período de
            12 meses terá a CNH suspensa, conforme a Lei nº 14.071/2020. Para
            acompanhar sua pontuação, utilize o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#C73A1E] hover:underline font-medium">simulador de pontos na CNH</Link>.
            Para motoristas profissionais, esse limite pode chegar a 40 pontos
            sem infração gravíssima.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como funciona o sistema de pontuação da CNH?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Cada vez que um motorista comete uma infração de trânsito, além do
            valor da multa em dinheiro, pontos são registrados em seu
            prontuário na CNH. A quantidade de pontos varia de acordo com a
            gravidade da infração: infrações leves somam 3 pontos, médias somam
            4 pontos, graves somam 5 pontos e gravíssimas somam 7 pontos.
            Esses pontos ficam registrados pelo período de 12 meses e, ao
            atingir o limite, o condutor tem o direito de dirigir suspenso.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Valores atualizados das multas de trânsito
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Os valores das multas de trânsito são atualizados periodicamente
            pelo Conselho Nacional de Trânsito (CONTRAN). As infrações
            gravíssimas, como dirigir sob influência de álcool, podem ter o
            valor multiplicado por fatores agravantes, chegando a valores
            significativamente mais altos. A infração por embriaguez ao
            volante (Art. 165 do CTB), por exemplo, possui uma multa base de
            R$ 2.934,70, sendo uma das mais severas do código.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além do valor da multa e dos pontos na CNH, algumas infrações
            gravíssimas preveem medidas administrativas adicionais, como a
            suspensão do direito de dirigir, a apreensão do veículo ou a
            cassação da CNH. Por isso, é fundamental que todo motorista
            conheça as principais infrações e seus valores para evitar
            surpresas desagradáveis e, acima de tudo, dirigir com segurança
            e responsabilidade nas vias brasileiras.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para evitar multas de trânsito
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para evitar multas e manter a CNH limpa, respeite os limites de
            velocidade, use sempre o cinto de segurança, não utilize o celular
            enquanto dirige, mantenha o licenciamento do veículo em dia e
            nunca dirija após consumir bebidas alcoólicas. Como o IPVA em
            atraso também gera multa, use a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#C73A1E] hover:underline font-medium">calculadora de IPVA</Link> para
            se planejar.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além disso, confira o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#C73A1E] hover:underline font-medium">verificador de documentos</Link> para
            garantir que toda a documentação do veículo está regularizada. Essas simples
            atitudes podem poupar você de multas que variam de R$ 130,16 a
            R$ 2.934,70, além de preservar vidas no trânsito.
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
              <p className="text-sm text-[#64748B]">Simule quantos pontos você tem na CNH e descubra se está próximo da suspensão.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o IPVA 2026 do seu veículo por estado com parcelamento e desconto à vista.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique se a documentação do seu veículo está em dia e regularizada.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Calculadora de Multas de Trânsito",
              description:
                "Consulte o valor das multas de trânsito do CTB, pontos na CNH e gravidade das infrações.",
              url: "https://consultaplacabrasil.com/ferramentas/calculadora-multas",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qual o valor da multa por dirigir sem CNH?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A multa por dirigir sem CNH (Art. 162-I do CTB) é de R$ 880,41, classificada como infração gravíssima com 7 pontos na CNH.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quantos pontos na CNH para suspensão?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Conforme a Lei nº 14.071/2020, o condutor que acumular 40 pontos em 12 meses terá a CNH suspensa. Se não houver infração gravíssima, o limite é de 40 pontos.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a multa por avançar o sinal vermelho?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Avançar o sinal vermelho (Art. 173 do CTB) é infração gravíssima com multa de R$ 293,47 e 7 pontos na CNH.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual o valor da multa por excesso de velocidade?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O valor varia conforme a faixa: até 20% acima do limite custa R$ 130,16 (média, 4 pontos), de 20% a 50% custa R$ 195,23 (grave, 5 pontos), e acima de 50% custa R$ 880,41 (gravíssima, 7 pontos).",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a multa por usar celular ao volante?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Usar o celular ao dirigir (Art. 252-I do CTB) é infração grave com multa de R$ 293,47 e 5 pontos na CNH.",
                  },
                },
              ],
            },
            {
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
                  name: "Calculadora de Multas",
                  item: "https://consultaplacabrasil.com/ferramentas/calculadora-multas",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
