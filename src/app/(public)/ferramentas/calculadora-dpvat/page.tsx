import { Metadata } from "next";
import Link from "next/link";

import CalculadoraDPVAT from "@/components/ferramentas/calculadora-dpvat";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Calculadora DPVAT / SPVAT 2026 | Consulta Placa Brasil",
  description:
    "Calcule o valor do seguro DPVAT / SPVAT 2026 por tipo de veículo. Veja coberturas, como pagar e a diferença entre DPVAT e SPVAT. Grátis e sem cadastro.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/calculadora-dpvat",
  },
  openGraph: {
    title: "Calculadora DPVAT / SPVAT 2026 | Consulta Placa Brasil",
    description:
      "Descubra o valor do seguro obrigatório SPVAT 2026 para carro, moto, caminhão e ônibus. Confira coberturas e formas de pagamento.",
    url: "https://consultaplacabrasil.com/ferramentas/calculadora-dpvat",
    type: "website",
  },
};

export default function CalculadoraDPVATPage() {
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
            <span className="text-gray-300">Calculadora DPVAT</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calculadora DPVAT / SPVAT 2026
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Calcule o valor do seguro obrigatório SPVAT do seu veículo e conheça as coberturas incluídas.
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
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <CalculadoraDPVAT />
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
            O que é o SPVAT (antigo DPVAT)?
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O SPVAT (Seguro Obrigatório para Proteção de Vítimas de Acidentes de Trânsito) é o
            seguro obrigatório que substituiu o DPVAT a partir de 2024. Ele cobre todas as vítimas
            de acidentes de trânsito em território nacional, independentemente de quem causou o
            acidente. O seguro é válido para motoristas, passageiros e pedestres, garantindo
            indenização em casos de morte, invalidez permanente e despesas médicas. O valor do SPVAT
            varia conforme o tipo de veículo e é cobrado anualmente junto com o licenciamento. Para
            calcular todos os custos anuais do seu veículo, incluindo o SPVAT, utilize nossa{" "}
            <Link href="/ferramentas/custo-total-veiculo" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de custo total do veículo
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Coberturas do SPVAT / DPVAT
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O seguro obrigatório oferece três tipos de cobertura para vítimas de acidentes de
            trânsito: indenização por morte no valor de R$ 13.500,00, indenização por invalidez
            permanente total ou parcial de até R$ 13.500,00 (proporcional ao grau de invalidez
            atestado por perícia médica) e reembolso de despesas médicas e hospitalares de até
            R$ 2.700,00 (DAMS). Essas coberturas são garantidas independentemente de culpa e
            abrangem qualquer pessoa envolvida no acidente, inclusive pedestres. Para manter a
            documentação do seu veículo em dia, confira nosso{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos veiculares
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            História: do DPVAT ao SPVAT
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O DPVAT (Seguro de Danos Pessoais causados por Veículos Automotores de Via Terrestre)
            foi criado em 1974 e durante décadas foi administrado por um consórcio de seguradoras
            privadas liderado pela Seguradora Líder. Em 2020, o governo federal tentou extinguir o
            seguro obrigatório, mas a medida foi revertida pelo Congresso Nacional. Em 2024, a
            Lei nº 14.867/2024 substituiu oficialmente o DPVAT pelo SPVAT, transferindo a gestão
            para a Caixa Econômica Federal e modernizando o sistema de indenizações. A mudança
            visou reduzir custos administrativos, aumentar a transparência e garantir que os
            recursos cheguem efetivamente às vítimas de acidentes de trânsito. Para manter
            seu veículo totalmente regularizado, é importante realizar uma{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consulta de placa de veículo
            </Link>{" "}
            e verificar se não há débitos ou restrições pendentes.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Valores do SPVAT por tipo de veículo
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Os valores anuais do SPVAT variam de acordo com a categoria do veículo. Automóveis e
            caminhões pagam aproximadamente R$ 52,62 por ano, enquanto motocicletas possuem o valor
            mais alto, de R$ 293,48, devido à maior incidência de sinistros envolvendo esse tipo
            de veículo. Ônibus e micro-ônibus pagam cerca de R$ 196,99 por ano. Esses valores são
            definidos anualmente pelo Conselho Nacional de Seguros Privados (CNSP) e podem ser
            atualizados conforme a sinistralidade de cada categoria. Para saber quanto você pagará
            de imposto estadual, use a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA 2026
            </Link>.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como pagar o SPVAT?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            O pagamento do SPVAT é feito automaticamente junto com o licenciamento anual do veículo.
            Ao quitar o IPVA e as taxas de licenciamento no Detran do seu estado, o valor do seguro
            obrigatório já está incluído no boleto. Não é necessário procurar uma seguradora ou
            fazer um pagamento separado. O comprovante de pagamento fica vinculado ao CRLV
            (Certificado de Registro e Licenciamento de Veículo). Veículos com licenciamento em
            atraso não possuem cobertura ativa do SPVAT, e circular sem licenciamento é infração
            gravíssima prevista no Código de Trânsito Brasileiro, sujeita a multa e apreensão do
            veículo.
          </p>

          <h3 className="text-xl font-bold text-[#0F172A]">
            Como solicitar indenização do SPVAT?
          </h3>
          <p className="text-[#475569] leading-relaxed">
            Para solicitar a indenização do SPVAT, a vítima ou seus dependentes devem reunir a
            documentação necessária (boletim de ocorrência, laudos médicos, documentos pessoais)
            e dar entrada no pedido por meio dos canais da Caixa Econômica Federal, que é a
            administradora do seguro. O prazo para solicitar a indenização é de até 3 anos a partir
            da data do acidente. A análise é feita de forma administrativa e, caso o pedido seja
            aprovado, o pagamento é realizado diretamente na conta bancária do beneficiário.
          </p>

          <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
            <p className="text-sm text-[#64748B]">
              <strong>Aviso:</strong> Os valores apresentados são estimativas baseadas nos valores
              de referência do SPVAT. Os valores exatos podem sofrer reajustes anuais definidos
              pelo CNSP. Para informações oficiais, consulte o site da Caixa Econômica Federal
              ou do Detran do seu estado.
            </p>
          </div>
        </div>
      </section>

      {/* Ferramentas relacionadas */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Ferramentas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/ferramentas/calculadora-ipva" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Calculadora de IPVA</h3>
              <p className="text-sm text-[#64748B]">Calcule o IPVA 2026 do seu veículo por estado com simulação de parcelamento e desconto à vista.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a situação dos documentos do seu veículo e mantenha tudo regularizado.</p>
            </Link>
            <Link href="/ferramentas/custo-total-veiculo" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Custo Total do Veículo</h3>
              <p className="text-sm text-[#64748B]">Descubra quanto custa manter seu veículo por mês incluindo IPVA, seguro e combustível.</p>
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
            name: "Calculadora DPVAT / SPVAT 2026",
            description:
              "Calcule o valor do seguro obrigatório SPVAT (antigo DPVAT) 2026 por tipo de veículo. Confira coberturas e formas de pagamento.",
            url: "https://consultaplacabrasil.com/ferramentas/calculadora-dpvat",
            applicationCategory: "FinanceApplication",
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
                name: "O que é o SPVAT e qual a diferença para o DPVAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O SPVAT (Seguro Obrigatório para Proteção de Vítimas de Acidentes de Trânsito) substituiu o DPVAT em 2024. A principal diferença é que o SPVAT é administrado pela Caixa Econômica Federal, enquanto o DPVAT era gerido por um consórcio de seguradoras privadas. As coberturas permanecem as mesmas.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto custa o SPVAT em 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O valor do SPVAT varia por tipo de veículo: automóveis e caminhões pagam aproximadamente R$ 52,62, motocicletas pagam R$ 293,48 e ônibus/micro-ônibus pagam R$ 196,99 por ano.",
                },
              },
              {
                "@type": "Question",
                name: "Como pagar o SPVAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O SPVAT é pago automaticamente junto com o licenciamento anual do veículo. Ao quitar o IPVA e as taxas de licenciamento, o valor do seguro obrigatório já está incluído no boleto.",
                },
              },
              {
                "@type": "Question",
                name: "Quais são as coberturas do SPVAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O SPVAT cobre: morte (R$ 13.500), invalidez permanente (até R$ 13.500) e despesas médicas e hospitalares (até R$ 2.700). A cobertura vale para motoristas, passageiros e pedestres vítimas de acidentes de trânsito.",
                },
              },
              {
                "@type": "Question",
                name: "Qual o prazo para solicitar indenização do SPVAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O prazo para solicitar a indenização do SPVAT é de até 3 anos a partir da data do acidente. O pedido deve ser feito pelos canais da Caixa Econômica Federal com a documentação necessária.",
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
                name: "Calculadora DPVAT / SPVAT",
                item: "https://consultaplacabrasil.com/ferramentas/calculadora-dpvat",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
