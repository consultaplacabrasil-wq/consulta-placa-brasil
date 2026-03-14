import { Metadata } from "next";
import Link from "next/link";

import { SimuladorPontosCNH } from "@/components/ferramentas/simulador-pontos-cnh";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Simulador de Pontos na CNH | Consulta Placa Brasil",
  description:
    "Simule a pontuação da sua CNH, veja os pontos ativos, data de vencimento e risco de suspensão. Ferramenta gratuita baseada no CTB atualizado.",
  alternates: {
    canonical:
      "https://consultaplacabrasil.com/ferramentas/simulador-pontos-cnh",
  },
  openGraph: {
    title: "Simulador de Pontos na CNH | Consulta Placa Brasil",
    description:
      "Simule a pontuação da sua CNH, veja pontos ativos e risco de suspensão. Ferramenta gratuita baseada no CTB.",
    url: "https://consultaplacabrasil.com/ferramentas/simulador-pontos-cnh",
  },
};

export default function SimuladorPontosCNHPage() {
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
            <span className="text-gray-300">Simulador de Pontos</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Simulador de Pontos na CNH
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Simule o acúmulo de pontos na CNH, calcule o risco de suspensão e veja quando cada infração expira.
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

      {/* Simulador */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <SimuladorPontosCNH />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Pontos na CNH
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "Quantos pontos na CNH causam suspensão?",
                answer: "Para motoristas sem suspensão anterior, o limite é de 20 pontos em 12 meses. Para reincidentes, o limite é de 30 pontos. Infrações gravíssimas podem causar suspensão imediata.",
              },
              {
                question: "Quando os pontos da CNH vencem?",
                answer: "Os pontos da CNH vencem 12 meses após a data da infração. Após esse período, os pontos são automaticamente removidos do prontuário do condutor.",
              },
              {
                question: "Quais infrações causam suspensão imediata da CNH?",
                answer: "Infrações gravíssimas como avançar semáforo vermelho, excesso de velocidade acima de 50%, dirigir sem CNH e conduzir moto sem capacete podem resultar em suspensão imediata da CNH.",
              },
              {
                question: "Como consultar os pontos da minha CNH?",
                answer: "Você pode consultar os pontos da sua CNH no site ou aplicativo do DETRAN do seu estado, ou pelo Portal de Serviços do DENATRAN. Use nosso simulador para estimar sua pontuação atual.",
              },
              {
                question: "O que acontece se eu dirigir com a CNH suspensa?",
                answer: "Dirigir com a CNH suspensa é infração gravíssima (Art. 162-II do CTB), com multa de R$ 880,41, 7 pontos na CNH e apreensão do veículo. O prazo de suspensão também é reiniciado.",
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

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Como funciona o sistema de pontos na CNH no Brasil?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O sistema de pontuação da Carteira Nacional de Habilitação (CNH) é
            regulamentado pelo Código de Trânsito Brasileiro (CTB), Lei nº
            9.503/1997, com alterações importantes trazidas pela Lei nº
            14.071/2020. Aproveite também para realizar uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">consulta placa de veículo</Link> e
            verificar a situação completa do automóvel.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Cada infração de trânsito cometida pelo condutor gera
            uma quantidade específica de pontos, que ficam registrados no
            prontuário do motorista por um período de 12 meses a partir da data
            da infração. Quando os pontos atingem o limite estabelecido, o
            condutor pode ter o direito de dirigir suspenso.
          </p>
          <p className="text-[#475569] leading-relaxed">
            As infrações são classificadas em quatro categorias de gravidade:
            leve (3 pontos), média (4 pontos), grave (5 pontos) e gravíssima
            (7 pontos). Cada categoria reflete o nível de risco que a conduta
            do motorista representa para a segurança no trânsito. Para conhecer
            os valores das penalidades associadas, utilize nossa{" "}
            <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de multas de trânsito
            </Link>
            .
          </p>
          <p className="text-[#475569] leading-relaxed">
            Infrações gravíssimas, como avançar o sinal vermelho, exceder a velocidade em
            mais de 50% do limite permitido ou conduzir motocicleta sem capacete,
            podem resultar em suspensão imediata da CNH, independentemente do
            total de pontos acumulados.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Limites para suspensão da CNH
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Com as mudanças introduzidas pela Lei nº 14.071/2020, os limites de
            pontos para suspensão da CNH foram atualizados. Para motoristas que
            nunca tiveram a CNH suspensa anteriormente, o limite é de 20 pontos
            acumulados em um período de 12 meses.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Já para motoristas reincidentes, ou seja, que já passaram por suspensão
            anterior, o limite sobe para 30 pontos. É importante ressaltar que esses
            limites se aplicam apenas quando não há infração gravíssima no período,
            pois determinadas infrações gravíssimas podem levar à suspensão imediata.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Quando os pontos da CNH vencem?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Os pontos registrados na CNH têm validade de 12 meses, contados a
            partir da data em que a infração foi cometida. Após esse período,
            os pontos são automaticamente removidos do prontuário do condutor
            e deixam de contar para o limite de suspensão.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Por isso, é fundamental acompanhar as datas de vencimento de cada infração
            para saber exatamente quantos pontos estão ativos em seu
            prontuário. Nosso simulador calcula automaticamente o vencimento
            de cada lote de pontos com base na data informada.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como evitar a suspensão da CNH?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            A melhor forma de evitar a suspensão da CNH é respeitar as leis de
            trânsito. Utilize sempre o cinto de segurança, respeite os limites
            de velocidade, não use o celular enquanto dirige e jamais dirija
            após consumir bebidas alcoólicas.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além disso, mantenha a CNH e o licenciamento do veículo sempre em dia.
            Use o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>{" "}
            para conferir a validade dos seus documentos. Caso receba uma notificação
            de infração, verifique se os dados estão corretos e, se necessário,
            apresente recurso dentro do prazo legal. Utilize nosso simulador
            para acompanhar sua pontuação e tomar medidas preventivas antes
            de atingir o limite de suspensão.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            O que fazer se a CNH for suspensa?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Caso a CNH seja suspensa, o condutor deve entregar o documento ao
            órgão de trânsito e cumprir o período de suspensão determinado, que
            varia de 2 a 12 meses. Você também pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">pesquisar placa de carro</Link> para
            saber se o veículo possui alguma restrição ativa. Durante esse período, é proibido conduzir
            qualquer veículo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Após o cumprimento da penalidade, o motorista precisará realizar um
            curso de reciclagem obrigatório e ser aprovado em prova teórica para
            reaver o direito de dirigir. Dirigir com a CNH suspensa é infração
            gravíssima prevista no Art. 162-II do CTB, com multa de R$ 880,41 e
            7 pontos na CNH. Lembre-se também de manter o IPVA do seu veículo em
            dia, e consulte a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>{" "}
            para estimar o valor do imposto no seu estado.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além do simulador de pontos, o Consulta Placa Brasil oferece diversas{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>
            . Confira também o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>{" "}
            para checar a validade da sua CNH, a{" "}
            <Link href="/ferramentas/calculadora-transferencia" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de transferência de veículo
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">
              identificador de placa veicular
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
            <Link href="/ferramentas/calculadora-multas" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Multas</h3>
              <p className="text-sm text-[#64748B]">Calcule o valor das multas de trânsito com base na gravidade da infração e verifique descontos para pagamento antecipado.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a validade da CNH, consulte o calendário de licenciamento e receba alertas sobre a documentação do veículo.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Simulador de Pontos na CNH",
              description:
                "Simule a pontuação da sua CNH, veja pontos ativos, data de vencimento e risco de suspensão. Ferramenta gratuita baseada no CTB.",
              url: "https://consultaplacabrasil.com/ferramentas/simulador-pontos-cnh",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Quantos pontos na CNH causam suspensão?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Para motoristas sem suspensão anterior, o limite é de 20 pontos em 12 meses. Para reincidentes, o limite é de 30 pontos. Infrações gravíssimas podem causar suspensão imediata.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quando os pontos da CNH vencem?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Os pontos da CNH vencem 12 meses após a data da infração. Após esse período, os pontos são automaticamente removidos do prontuário do condutor.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quais infrações causam suspensão imediata da CNH?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Infrações gravíssimas como avançar semáforo vermelho, excesso de velocidade acima de 50%, dirigir sem CNH e conduzir moto sem capacete podem resultar em suspensão imediata da CNH.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como consultar os pontos da minha CNH?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Você pode consultar os pontos da sua CNH no site ou aplicativo do DETRAN do seu estado, ou pelo Portal de Serviços do DENATRAN. Use nosso simulador para estimar sua pontuação atual.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que acontece se eu dirigir com a CNH suspensa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Dirigir com a CNH suspensa é infração gravíssima (Art. 162-II do CTB), com multa de R$ 880,41, 7 pontos na CNH e apreensão do veículo. O prazo de suspensão também é reiniciado.",
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
                  name: "Simulador de Pontos na CNH",
                  item: "https://consultaplacabrasil.com/ferramentas/simulador-pontos-cnh",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
