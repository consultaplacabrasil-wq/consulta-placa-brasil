import { Metadata } from "next";
import Link from "next/link";
import ValidadorRenavam from "@/components/ferramentas/validador-renavam";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Validador de RENAVAM Online | Consulta Placa",
  description:
    "Valide o número do RENAVAM gratuitamente com o algoritmo módulo 11. Verifique se o dígito verificador está correto e confira o detalhamento do cálculo.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/validador-renavam",
  },
  openGraph: {
    title: "Validador de RENAVAM Online | Consulta Placa",
    description:
      "Verifique a validade do RENAVAM do seu veículo com cálculo automático do dígito verificador pelo módulo 11. Ferramenta gratuita e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/validador-renavam",
    type: "website",
  },
};

const faqItems = [
  {
    question: "O que é o RENAVAM e para que serve?",
    answer:
      "O RENAVAM (Registro Nacional de Veículos Automotores) é um código numérico de 11 dígitos atribuído a cada veículo registrado no Brasil. Ele funciona como uma identidade única do veículo, permitindo rastrear todo o histórico de propriedade, multas, impostos e sinistros junto aos órgãos de trânsito.",
  },
  {
    question: "Como funciona a validação do RENAVAM pelo módulo 11?",
    answer:
      "O algoritmo de validação utiliza os 10 primeiros dígitos do RENAVAM, multiplicando-os pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 da direita para a esquerda. Os produtos são somados e o resultado é dividido por 11. O resto dessa divisão é o dígito verificador esperado. Se o resto for 10 ou mais, o dígito verificador é 0. O 11.º dígito do RENAVAM deve coincidir com esse valor calculado.",
  },
  {
    question: "Um RENAVAM válido garante que o veículo está regularizado?",
    answer:
      "Não. A validação do RENAVAM verifica apenas se a estrutura numérica do código está correta segundo o algoritmo módulo 11. Isso não garante que o veículo esteja com documentação em dia, sem multas ou sem restrições. Para verificar a situação completa, é necessário consultar os sistemas do Detran ou utilizar ferramentas de consulta veicular.",
  },
  {
    question: "Onde encontro o número do RENAVAM do meu veículo?",
    answer:
      "O RENAVAM está impresso no Certificado de Registro e Licenciamento de Veículo (CRLV), geralmente no campo superior do documento. Também pode ser encontrado no Certificado de Registro de Veículo (CRV), em boletos de IPVA, em notificações de multas e no aplicativo Carteira Digital de Trânsito (CDT).",
  },
  {
    question: "O RENAVAM muda quando o veículo é transferido de proprietário?",
    answer:
      "Não. O RENAVAM é vinculado ao veículo e não ao proprietário. Ele permanece o mesmo durante toda a vida útil do veículo, independentemente de quantas vezes seja vendido ou transferido entre estados. É um identificador permanente do automóvel no sistema nacional de trânsito.",
  },
];

export default function ValidadorRenavamPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Validador de RENAVAM Online",
    description:
      "Ferramenta gratuita para validar o número do RENAVAM utilizando o algoritmo módulo 11. Verifique o dígito verificador e confira o detalhamento completo do cálculo.",
    url: "https://consultaplacabrasil.com/ferramentas/validador-renavam",
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
        name: "Validador de RENAVAM",
        item: "https://consultaplacabrasil.com/ferramentas/validador-renavam",
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
            <span className="text-gray-300">Validador de RENAVAM</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Validador de RENAVAM
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Verifique se o número do RENAVAM é válido com cálculo automático do dígito verificador pelo algoritmo módulo 11.
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
          <ValidadorRenavam />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre o RENAVAM
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
            O que é o RENAVAM e como validar o número do veículo
          </h2>
          <p className="text-[#475569] leading-relaxed">
            O RENAVAM (Registro Nacional de Veículos Automotores) é um código
            numérico de 11 dígitos criado pelo Denatran (atual Senatran) para
            identificar de forma única cada veículo registrado no território
            brasileiro. Diferente da placa, que pode ser alterada em casos de
            transferência entre estados, o RENAVAM acompanha o veículo durante
            toda a sua vida útil. Se você precisa{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa
            </Link>
            , utilize nossa ferramenta principal para obter informações
            completas sobre o veículo.
          </p>
          <p className="text-[#475569] leading-relaxed">
            A validação do RENAVAM é feita por meio de um algoritmo matemático
            conhecido como módulo 11. Esse método utiliza os 10 primeiros
            dígitos do código para calcular o dígito verificador, que corresponde
            ao 11.º dígito. O processo consiste em multiplicar cada dígito por um
            peso específico (3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, aplicados da
            direita para a esquerda), somar todos os produtos obtidos e dividir
            o resultado por 11. O resto dessa divisão é comparado com o último
            dígito do RENAVAM. Se o resto for igual ou superior a 10, o dígito
            verificador é considerado 0.
          </p>
          <p className="text-[#475569] leading-relaxed">
            É importante destacar que a validação numérica do RENAVAM confirma
            apenas que a estrutura do código está matematicamente correta. Ela
            não garante que o veículo esteja regularizado, livre de multas ou sem
            restrições judiciais. Para uma verificação completa da situação do
            veículo, recomenda-se{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              pesquisar a placa
            </Link>{" "}
            e consultar diretamente o Detran do respectivo estado.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O número do RENAVAM é utilizado em diversas situações do dia a dia
            do proprietário de veículo: pagamento do IPVA, emissão do CRLV,
            transferência de propriedade, consulta de multas e agendamento de
            vistorias. Ele pode ser encontrado no CRLV (Certificado de Registro
            e Licenciamento de Veículo), no CRV (Certificado de Registro de
            Veículo), em boletos de impostos e no aplicativo Carteira Digital
            de Trânsito (CDT).
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nosso validador de RENAVAM online realiza o cálculo de forma
            instantânea e exibe todo o detalhamento: os dígitos, os pesos
            aplicados, os produtos resultantes, a soma total, o resto da
            divisão e a comparação entre o dígito esperado e o informado. Essa
            transparência permite que o usuário compreenda exatamente como o
            algoritmo funciona e por que determinado RENAVAM é considerado
            válido ou inválido.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Se você precisa verificar outros dados do veículo, o Consulta Placa
            Brasil oferece diversas{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>
            . Utilize o{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>{" "}
            para interpretar o número VIN do veículo, o{" "}
            <Link href="/ferramentas/verificador-documentos" className="text-[#FF4D30] hover:underline font-medium">
              verificador de documentos
            </Link>{" "}
            para conferir a validade da CNH e o calendário de licenciamento,
            ou a{" "}
            <Link href="/ferramentas/calculadora-ipva" className="text-[#FF4D30] hover:underline font-medium">
              calculadora de IPVA
            </Link>{" "}
            para estimar o valor do imposto do seu veículo. Todas as ferramentas
            funcionam diretamente no navegador, sem necessidade de cadastro ou
            instalação de aplicativos.
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
            <Link href="/ferramentas/gerador-renavam" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador de RENAVAM</h3>
              <p className="text-sm text-[#64748B]">Gere números de RENAVAM válidos para testes e desenvolvimento de sistemas veiculares com dígito verificador correto.</p>
            </Link>
            <Link href="/ferramentas/decodificador-chassi" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Decodificador de Chassi</h3>
              <p className="text-sm text-[#64748B]">Decodifique o número do chassi (VIN) e descubra fabricante, país de origem, ano de fabricação e outras informações do veículo.</p>
            </Link>
            <Link href="/ferramentas/verificador-documentos" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Verificador de Documentos</h3>
              <p className="text-sm text-[#64748B]">Verifique a validade da CNH, calendário de licenciamento e situação dos documentos do veículo com alertas automáticos.</p>
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
