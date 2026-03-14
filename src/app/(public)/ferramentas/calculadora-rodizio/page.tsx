import { Metadata } from "next";
import Link from "next/link";

import { CalculadoraRodizio } from "@/components/ferramentas/calculadora-rodizio";

export const metadata: Metadata = {
  title: "Rodízio de Veículos SP e RJ | Consulta Placa Brasil",
  description:
    "Descubra o dia de rodízio do seu veículo em São Paulo e Rio de Janeiro. Consulte horários, restrições e multas por descumprimento do rodízio municipal.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/ferramentas/calculadora-rodizio",
  },
  openGraph: {
    title: "Rodízio de Veículos SP e RJ | Consulta Placa Brasil",
    description:
      "Consulte o dia de rodízio do seu veículo em São Paulo e Rio de Janeiro. Horários, restrições e valor da multa.",
    url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-rodizio",
    type: "website",
  },
};

export default function CalculadoraRodizioPage() {
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
            <span className="text-gray-300">Rodízio de Veículos</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Rodízio de Veículos SP e RJ
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Descubra o dia e horário de restrição do seu veículo em São Paulo pelo final da placa.
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
          <CalculadoraRodizio />
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Rodízio de Veículos em São Paulo e Rio de Janeiro
          </h2>
          <p className="text-[#475569]">
            O rodízio municipal de veículos é uma política de restrição de
            circulação adotada pela cidade de São Paulo desde 1997, com o
            objetivo de reduzir o congestionamento e a poluição atmosférica na
            região central da capital paulista. A medida funciona de segunda a
            sexta-feira, nos horários de pico — das 7h às 10h pela manhã e das
            17h às 20h à tarde —, dentro do chamado centro expandido, uma área
            delimitada por grandes vias como a Marginal Tietê, Marginal
            Pinheiros, Avenida dos Bandeirantes e Avenida Salim Farah Maluf.
          </p>
          <p className="text-[#475569]">
            A restrição é determinada pelo último algarismo da placa do veículo.
            Veículos com finais 1 e 2 não podem circular na zona restrita às
            segundas-feiras; finais 3 e 4, às terças-feiras; finais 5 e 6, às
            quartas-feiras; finais 7 e 8, às quintas-feiras; e finais 9 e 0,
            às sextas-feiras. Essa regra vale para todos os veículos automotores,
            independentemente do estado de emplacamento, o que significa que
            veículos com placas de outras unidades da federação também estão
            sujeitos à restrição ao trafegar pelo centro expandido de São Paulo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Multa por descumprimento do rodízio em SP
          </h3>
          <p className="text-[#475569]">
            O motorista que desrespeitar o rodízio municipal de São Paulo está
            sujeito a uma multa de R$ 130,16, com acréscimo de 4 pontos na
            Carteira Nacional de Habilitação (CNH), sendo classificada como
            infração de natureza média conforme o Código de Trânsito Brasileiro.
            É importante observar que o condutor pode ser autuado uma vez em cada
            período de restrição (manhã e tarde), totalizando até duas multas por
            dia. Para consultar outras infrações e seus valores, utilize a{" "}
            <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de multas de trânsito
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Exceções ao rodízio de São Paulo
          </h3>
          <p className="text-[#475569]">
            Alguns veículos são isentos do rodízio municipal, como ambulâncias,
            viaturas policiais, veículos de transporte escolar, táxis, veículos
            de pessoas com deficiência (PCD), motocicletas, caminhões (que
            possuem restrição própria chamada ZMRC) e veículos oficiais. Além
            disso, em feriados municipais, estaduais e nacionais o rodízio é
            suspenso, e os veículos podem circular livremente pela zona restrita.
            Para identificar a origem de uma placa e verificar se ela está sujeita
            ao rodízio, experimente o{" "}
            <Link href="/ferramentas/identificador-placa" className="text-[#FF4D30] hover:underline font-medium">
              identificador de placas
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Rodízio no Rio de Janeiro
          </h3>
          <p className="text-[#475569]">
            Diferente de São Paulo, a cidade do Rio de Janeiro não possui
            atualmente um sistema de rodízio permanente de veículos. Embora a
            capital fluminense já tenha discutido a implementação de medidas
            semelhantes em diversas ocasiões, nenhuma restrição permanente
            baseada no final da placa foi estabelecida até o momento. No entanto,
            restrições temporárias podem ocorrer em períodos de grandes eventos,
            obras viárias ou situações emergenciais. É fundamental manter a
            documentação do veículo sempre em dia — utilize o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>{" "}
            para garantir que seu veículo está regularizado.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Dicas para lidar com o rodízio em São Paulo
          </h3>
          <p className="text-[#475569]">
            Para evitar multas e transtornos, planeje seus deslocamentos com
            antecedência. Nos dias de restrição do seu veículo, considere
            utilizar transporte público, aplicativos de carona ou rotas
            alternativas fora do centro expandido. Lembre-se de que a restrição
            vale apenas nos horários de pico e dentro da área delimitada — fora
            desses horários e dessa região, a circulação é livre. Motoristas
            que possuem dois veículos com finais de placa em dias diferentes de
            rodízio podem alternar o uso para manter a mobilidade durante toda
            a semana sem infringir as regras. Se você tem dúvidas sobre a situação
            do seu veículo, pode{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              checar placa
            </Link>{" "}
            rapidamente e obter dados atualizados sobre o automóvel.
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
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placas</h3>
              <p className="text-sm text-[#64748B]">Descubra a origem, estado e cidade de emplacamento de qualquer placa brasileira.</p>
            </Link>
            <Link href="/ferramentas/calculadora-multas" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Multas</h3>
              <p className="text-sm text-[#64748B]">Consulte o valor das multas de trânsito, pontos na CNH e gravidade das infrações.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique se a documentação do seu veículo está em dia e regularizada.</p>
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
              name: "Calculadora de Rodízio de Veículos SP e RJ",
              description:
                "Descubra o dia de rodízio do seu veículo em São Paulo e Rio de Janeiro pelo final da placa.",
              url: "https://consultaplacabrasil.com.br/ferramentas/calculadora-rodizio",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qual o dia de rodízio pela placa do meu veículo em São Paulo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O rodízio em São Paulo funciona pelo final da placa: finais 1 e 2 na segunda-feira, 3 e 4 na terça-feira, 5 e 6 na quarta-feira, 7 e 8 na quinta-feira, e 9 e 0 na sexta-feira, das 7h às 10h e das 17h às 20h no centro expandido.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual o valor da multa por descumprir o rodízio em São Paulo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A multa por descumprimento do rodízio municipal de São Paulo é de R$ 130,16, com 4 pontos na CNH, sendo classificada como infração de natureza média.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O rodízio de São Paulo funciona em feriados?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Não. Em feriados municipais, estaduais e nacionais, o rodízio é suspenso e os veículos podem circular livremente pelo centro expandido de São Paulo.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Existe rodízio de veículos no Rio de Janeiro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Atualmente, o Rio de Janeiro não possui um sistema de rodízio permanente de veículos. Podem ocorrer restrições temporárias em situações especiais como grandes eventos ou obras viárias.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quais veículos são isentos do rodízio em São Paulo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "São isentos do rodízio em São Paulo: ambulâncias, viaturas policiais, veículos de transporte escolar, táxis, veículos de PCD, motocicletas, caminhões (possuem restrição própria - ZMRC) e veículos oficiais.",
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
                  name: "Rodízio de Veículos",
                  item: "https://consultaplacabrasil.com.br/ferramentas/calculadora-rodizio",
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
