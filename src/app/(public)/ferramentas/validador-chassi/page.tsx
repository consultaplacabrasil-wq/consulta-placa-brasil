import { Metadata } from "next";
import Link from "next/link";
import ValidadorChassi from "@/components/ferramentas/validador-chassi";
import { SugestaoCTA } from "@/components/ferramentas/sugestao-form";

export const metadata: Metadata = {
  title: "Validador de Chassi VIN Online",
  description:
    "Validar chassi VIN online e gratuito: verifique se o número do chassi é válido, confira o dígito verificador e detecte possíveis erros ou adulterações.",
  alternates: {
    canonical: "https://consultaplacabrasil.com/ferramentas/validador-chassi",
  },
  openGraph: {
    title: "Validador de Chassi VIN Online | Consulta Placa Brasil",
    description:
      "Valide o número do chassi (VIN) do veículo: verificação de comprimento, caracteres e dígito verificador conforme ISO 3779. Gratuito e sem cadastro.",
    url: "https://consultaplacabrasil.com/ferramentas/validador-chassi",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Qual a diferença entre validar e decodificar o chassi?",
    answer:
      "Validar o chassi significa verificar se o número é estruturalmente correto: se tem 17 caracteres, não contém letras proibidas (I, O, Q) e se o dígito verificador confere com o cálculo matemático. Já decodificar o chassi é extrair informações como fabricante, país de origem e ano do modelo a partir das posições do VIN.",
  },
  {
    question: "O que é o dígito verificador do chassi e como ele é calculado?",
    answer:
      "O dígito verificador é o 9º caractere do VIN. Ele é calculado usando a tabela de transliteração ISO 3779, que converte cada letra em um valor numérico, e os fatores de peso (8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2). A soma ponderada é dividida por 11, e o resto é o dígito verificador. Se o resto for 10, usa-se a letra X.",
  },
  {
    question: "Por que validar o chassi antes de comprar um veículo usado?",
    answer:
      "A validação do chassi ajuda a detectar possíveis adulterações no número de identificação do veículo. Veículos roubados ou clonados frequentemente apresentam chassi com dígito verificador incorreto, pois os fraudadores alteram caracteres sem recalcular corretamente o dígito de controle. Essa verificação simples pode evitar golpes na compra de usados.",
  },
  {
    question: "Um chassi inválido significa que o veículo é roubado?",
    answer:
      "Não necessariamente. Um chassi que não passa na validação pode indicar erro de digitação, cópia incorreta do documento ou, em casos mais graves, adulteração. Se o dígito verificador não confere, é recomendável verificar novamente os caracteres e, se persistir, consultar o Detran ou um despachante para confirmar a autenticidade.",
  },
  {
    question: "Quais caracteres não são permitidos no chassi VIN?",
    answer:
      "As letras I, O e Q não são permitidas no número de chassi (VIN) conforme a norma ISO 3779. Essa restrição existe porque a letra I pode ser confundida com o número 1, a letra O com o número 0, e a letra Q com o número 9. Os caracteres válidos são: letras A-H, J-N, P, R-Z e números 0-9.",
  },
];

export default function ValidadorChassiPage() {
  const schemaWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Validador de Chassi VIN",
    description:
      "Ferramenta gratuita para validar o número de chassi (VIN) de veículos, verificando comprimento, caracteres e dígito verificador conforme ISO 3779.",
    url: "https://consultaplacabrasil.com/ferramentas/validador-chassi",
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
        name: "Validador de Chassi",
        item: "https://consultaplacabrasil.com/ferramentas/validador-chassi",
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
            <span className="text-gray-300">Validador de Chassi</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Validador de Chassi (VIN)
          </h1>
          <p className="text-gray-400 max-w-2xl mb-4">
            Verifique se o número de chassi do veículo é válido: comprimento, caracteres permitidos e dígito verificador conforme a norma ISO 3779.
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
          <ValidadorChassi />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center">
            Perguntas Frequentes sobre Validação de Chassi
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
            Por que validar o chassi VIN antes de comprar um veículo
          </h2>
          <p className="text-[#475569] leading-relaxed">
            A validação do número de chassi é uma das verificações mais importantes que um comprador
            de veículo usado pode realizar antes de fechar negócio. O chassi, também chamado de VIN
            (Vehicle Identification Number), é composto por 17 caracteres alfanuméricos que seguem
            o padrão internacional ISO 3779. Cada caractere ocupa uma posição específica e carrega
            informações sobre o veículo, e o conjunto precisa ser
            matematicamente consistente.
          </p>
          <p className="text-[#475569] leading-relaxed">
            O elemento central dessa consistência é o dígito verificador, localizado na 9ª posição
            do VIN. Esse dígito é calculado a partir dos demais caracteres usando uma tabela de
            transliteração (que converte letras em números) e fatores de peso atribuídos a cada
            posição. A soma ponderada resultante é dividida por 11, e o resto dessa divisão é o
            dígito verificador esperado. Se o caractere na posição 9 do chassi informado não
            corresponder ao valor calculado, o chassi é considerado inválido.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Essa verificação é especialmente relevante para prevenir fraudes. Veículos roubados
            ou clonados frequentemente passam por processos de remarcação de chassi, nos quais
            criminosos alteram caracteres para dificultar a identificação. Porém, como o dígito
            verificador depende de todos os demais caracteres, qualquer alteração isolada torna
            o chassi matematicamente inválido, a menos que o fraudador recalcule corretamente
            o dígito, o que nem sempre acontece.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Se você deseja decodificar o chassi e ver fabricante, país e ano, utilize nosso{" "}
            <Link href="/ferramentas/decodificador-chassi" className="text-[#FF4D30] hover:underline font-medium">
              decodificador de chassi
            </Link>. O decodificador extrai informações detalhadas das seções WMI, VDS e VIS,
            enquanto o validador foca exclusivamente em confirmar se o número é estruturalmente
            correto e se o dígito de controle confere.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Além do dígito verificador, a validação também confere se o chassi possui exatamente
            17 caracteres, se utiliza apenas os caracteres permitidos (A-H, J-N, P, R-Z e 0-9)
            e se não contém as letras I, O ou Q, que são proibidas por serem facilmente confundidas
            com os números 1, 0 e 9. Essas regras simples eliminam uma grande quantidade de
            chassis falsos ou mal digitados.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Ao adquirir um veículo usado, a validação do chassi deve ser combinada com outras
            verificações essenciais. Recomendamos{" "}
            <Link href="/" className="text-[#FF4D30] hover:underline font-medium">
              consultar placa de veículo
            </Link>{" "}
            para obter dados cadastrais, histórico de multas e possíveis restrições. Juntas,
            essas consultas oferecem uma camada robusta de proteção contra golpes na compra de
            veículos usados.
          </p>
          <p className="text-[#475569] leading-relaxed">
            É importante lembrar que a validação do chassi por meio do dígito verificador é
            obrigatória para veículos produzidos para o mercado norte-americano e brasileiro,
            mas nem todos os fabricantes europeus seguem essa regra. Portanto, um chassi que
            falha na verificação do dígito não necessariamente indica fraude. Pode se tratar
            de um veículo importado cujo fabricante não utiliza o padrão ISO para o cálculo
            do dígito verificador. Nesses casos, é recomendável confirmar diretamente com o
            fabricante ou o Detran.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Nosso validador de chassi é gratuito, funciona inteiramente no navegador e não
            requer nenhum tipo de cadastro. Nenhum dado é enviado a servidores externos e
            todo o processamento é feito localmente no seu dispositivo. Explore também as
            demais{" "}
            <Link href="/ferramentas" className="text-[#FF4D30] hover:underline font-medium">
              ferramentas veiculares gratuitas
            </Link>{" "}
            disponíveis no Consulta Placa Brasil.
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
              <p className="text-sm text-[#64748B]">Decodifique o VIN e descubra fabricante, país de origem, ano do modelo e seções do chassi.</p>
            </Link>
            <Link href="/ferramentas/identificador-placa" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Identificador de Placa</h3>
              <p className="text-sm text-[#64748B]">Identifique o padrão da placa (Mercosul ou antigo), valide o formato e veja a representação visual.</p>
            </Link>
            <Link href="/ferramentas/gerador-contrato" className="group bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 hover:border-[#FF4D30]/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF4D30] transition-colors mb-2">Gerador de Contrato</h3>
              <p className="text-sm text-[#64748B]">Gere contratos de compra e venda de veículos com todos os dados necessários para a transferência.</p>
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
