import { Metadata } from "next";
import Link from "next/link";

import ChecklistManutencao from "@/components/ferramentas/checklist-manutencao";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Checklist de Manutenção Veicular",
  description:
    "Checklist completo de manutenção veicular por quilometragem. Saiba o que revisar a cada 5.000, 10.000, 20.000, 40.000 e 60.000 km no seu carro, moto ou caminhão.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/checklist-manutencao",
  },
  openGraph: {
    title: "Checklist de Manutenção Veicular | Consulta Placa Brasil",
    description:
      "Checklist completo de manutenção para carro, moto e caminhão. Descubra quais revisões fazer com base na quilometragem. Grátis e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/checklist-manutencao",
    type: "website",
  },
};

export default function ChecklistManutencaoPage() {
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
            <span className="text-gray-300">Checklist de Manutenção</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Checklist de Manutenção Veicular
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Checklist completo de manutenção preventiva por quilometragem para carro, moto e caminhão.
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
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <ChecklistManutencao />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Manutenção Veicular
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "De quantos em quantos quilômetros devo trocar o óleo do motor?",
                answer: "A troca de óleo do motor é recomendada a cada 5.000 km para óleos minerais ou a cada 10.000 km para óleos sintéticos. No entanto, o intervalo ideal varia conforme o fabricante, o tipo de óleo utilizado e as condições de uso do veículo. Consulte o manual do proprietário para a recomendação específica do seu modelo.",
              },
              {
                question: "Qual a diferença entre manutenção preventiva e corretiva?",
                answer: "A manutenção preventiva é realizada de forma programada, seguindo os intervalos recomendados pelo fabricante, com o objetivo de evitar falhas. Já a manutenção corretiva é feita quando um problema já ocorreu, como uma peça que quebrou ou um sistema que falhou. A manutenção preventiva é sempre mais econômica, pois evita danos maiores e mais caros.",
              },
              {
                question: "Quando devo trocar a correia dentada do meu veículo?",
                answer: "A correia dentada geralmente deve ser substituída entre 40.000 e 60.000 km, ou conforme a recomendação do fabricante. A troca preventiva é essencial, pois o rompimento da correia pode causar danos graves ao motor, como empenamento de válvulas, gerando um custo de reparo muito elevado.",
              },
              {
                question: "O que acontece se eu atrasar as revisões do meu carro?",
                answer: "Atrasar as revisões pode levar ao desgaste prematuro de componentes, aumento do consumo de combustível, perda de desempenho e até falhas mecânicas graves. Além disso, o não cumprimento das revisões programadas pode invalidar a garantia de fábrica do veículo.",
              },
              {
                question: "A manutenção de motos é diferente da manutenção de carros?",
                answer: "Sim, motos possuem componentes específicos como corrente de transmissão, kit de relação (coroa, pinhão e corrente), cabo de embreagem e regulagem de válvulas que exigem atenção diferenciada. Os intervalos de manutenção também costumam ser menores devido ao menor porte do motor e maior exposição a intempéries.",
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

      {/* Conteúdo SEO */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl prose prose-gray space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">
            Por que a manutenção preventiva do veículo é tão importante?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A manutenção preventiva é a melhor forma de garantir a longevidade, a segurança e o
            bom desempenho do seu veículo. Seguir o cronograma de revisões recomendado pelo
            fabricante evita falhas inesperadas, reduz o risco de acidentes causados por problemas
            mecânicos e ajuda a manter o valor de revenda do automóvel. Nosso checklist de
            manutenção veicular foi desenvolvido para facilitar o acompanhamento das revisões
            essenciais com base na quilometragem percorrida, abrangendo carros, motos e caminhões.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Intervalos de manutenção: o que revisar e quando
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Cada veículo possui um plano de manutenção específico definido pelo fabricante, mas
            existem intervalos padrão amplamente aceitos pela indústria automotiva. A troca de
            óleo e a verificação do filtro de ar são os itens mais frequentes, recomendados a cada
            5.000 km. A cada 10.000 km, é fundamental verificar as pastilhas de freio e realizar o
            balanceamento das rodas.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Componentes de maior durabilidade, como a correia dentada e as
            velas de ignição, exigem atenção em intervalos maiores, geralmente entre 40.000 e
            60.000 km. Ignorar esses prazos pode resultar em avarias graves e custos de reparo
            significativamente mais altos. Para estimar o impacto financeiro dessas manutenções, utilize
            nossa{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de custo total do veículo
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Manutenção específica para motos e caminhões
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Motos demandam cuidados com componentes exclusivos, como corrente de transmissão, kit
            de relação e cabos de embreagem. A lubrificação da corrente deve ser feita a cada
            500 km ou semanalmente para motociclistas que rodam diariamente. Já os caminhões
            possuem sistemas pneumáticos de frenagem, cruzetas, diferenciais e câmbios que exigem
            lubrificação e troca de fluidos em intervalos regulares. A manutenção adequada de
            veículos pesados é obrigatória para a segurança nas estradas e está sujeita a
            fiscalização nas rodovias federais e estaduais. Para calcular o custo por quilômetro
            do seu veículo, incluindo a depreciação ao longo dos anos, utilize a{" "}
            <Link href="/ferramentas/calculadora-depreciacao" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de depreciação veicular
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como usar o checklist de manutenção veicular
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Selecione o tipo de veículo (carro, moto ou caminhão) e informe a quilometragem atual
            do hodômetro. O sistema identificará automaticamente quais itens de manutenção estão
            em dia (verde), próximos do prazo (amarelo) ou atrasados (vermelho). Marque os itens
            já realizados para acompanhar visualmente o progresso das revisões. Este checklist é
            uma referência geral, portanto consulte sempre o manual do
            proprietário do seu veículo para informações precisas.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Manter as revisões em dia também é fundamental para
            preservar o valor do veículo ao longo dos anos e evitar custos inesperados com a
            manutenção corretiva, que pode ser até três vezes mais cara do que a preventiva. Antes
            de comprar um veículo usado, recomendamos{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa veicular
            </Link>{" "}
            para conhecer o histórico completo do automóvel. Para
            estimar o{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              valor do IPVA
            </Link>{" "}
            e demais custos anuais, explore nossas ferramentas gratuitas.
          </p>

          <p className="text-[#475569] leading-relaxed">
            Explore outras{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            do Consulta Placa Brasil, como a{" "}
            <Link href="/ferramentas/simulador-financiamento" className="text-[#FF4D30] hover:underline font-medium">
              simuladora de financiamento
            </Link>
            , a{" "}
            <Link href="/ferramentas/calculadora-multas" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de multas
            </Link>{" "}
            e o{" "}
            <Link href="/ferramentas/simulador-pontos-cnh" className="text-[#FF4D30] hover:underline font-medium">
              simulador de pontos na CNH
            </Link>
            .
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os intervalos de manutenção apresentados são estimativas
              baseadas em recomendações gerais da indústria automotiva. Os prazos reais podem variar
              conforme o fabricante, modelo, ano e condições de uso do veículo. Consulte sempre o
              manual do proprietário para obter os intervalos exatos.
            </p>
          </div>
        </div>
      </section>

      {/* Voltar para ferramentas */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link
            href="/ferramentas"
            className="inline-flex items-center text-[#FF4D30] font-semibold hover:underline transition-colors"
          >
            ← Ver todas as ferramentas
          </Link>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Calcule o custo total anual do seu veículo incluindo IPVA, combustível, manutenção, depreciação, seguro e financiamento.</p>
            </Link>
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Estime o valor do IPVA do seu veículo com base no estado, valor venal e alíquota vigente. Simule parcelamentos e descontos.</p>
            </Link>
            <Link href="/ferramentas/calculadora-depreciacao" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de Depreciação</h3>
              <p className="text-sm text-[#64748B]">Calcule a depreciação estimada do seu veículo ao longo dos anos e descubra quanto ele valerá no futuro.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Checklist de Manutenção Veicular",
            description:
              "Checklist completo de manutenção veicular por quilometragem para carro, moto e caminhão. Saiba o que revisar a cada intervalo de km.",
            url: "https://consultaplacabrasil.com/ferramentas/checklist-manutencao",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
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
          }),
        }}
      />

      {/* Schema: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "De quantos em quantos quilômetros devo trocar o óleo do motor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A troca de óleo do motor é recomendada a cada 5.000 km para óleos minerais ou a cada 10.000 km para óleos sintéticos. O intervalo ideal varia conforme o fabricante, o tipo de óleo utilizado e as condições de uso do veículo.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a diferença entre manutenção preventiva e corretiva?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A manutenção preventiva é realizada de forma programada, seguindo os intervalos recomendados pelo fabricante. A manutenção corretiva é feita quando um problema já ocorreu. A preventiva é sempre mais econômica, pois evita danos maiores.",
                },
              },
              {
                "@type": "Question",
                name: "Quando devo trocar a correia dentada do meu veículo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A correia dentada geralmente deve ser substituída entre 40.000 e 60.000 km. O rompimento da correia pode causar danos graves ao motor, como empenamento de válvulas, gerando um custo de reparo muito elevado.",
                },
              },
              {
                "@type": "Question",
                name: "O que acontece se eu atrasar as revisões do meu carro?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Atrasar as revisões pode levar ao desgaste prematuro de componentes, aumento do consumo de combustível, perda de desempenho e até falhas mecânicas graves. O não cumprimento das revisões pode invalidar a garantia de fábrica.",
                },
              },
              {
                "@type": "Question",
                name: "A manutenção de motos é diferente da manutenção de carros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, motos possuem componentes específicos como corrente de transmissão, kit de relação, cabo de embreagem e regulagem de válvulas que exigem atenção diferenciada. Os intervalos de manutenção costumam ser menores.",
                },
              },
            ],
          }),
        }}
      />

      {/* Schema: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Checklist de Manutenção",
                item: "https://consultaplacabrasil.com/ferramentas/checklist-manutencao",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
