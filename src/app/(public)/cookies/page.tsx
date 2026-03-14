import { Metadata } from "next";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getPage() {
  try {
    const [page] = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, "cookies"))
      .limit(1);
    return page;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  return {
    title: page?.seoTitle || "Política de Cookies - Consulta Placa Brasil",
    description: page?.seoDescription || "Saiba como o Consulta Placa Brasil utiliza cookies essenciais, de análise e de preferências para melhorar sua experiência de navegação.",
    alternates: { canonical: page?.seoCanonical || "https://consultaplacabrasil.com/cookies" },
    robots: page?.seoRobots || "index, follow",
    openGraph: {
      type: "website",
      title: page?.ogTitle || "Política de Cookies",
      description: page?.ogDescription || undefined,
      images: page?.ogImage ? [page.ogImage] : undefined,
      url: page?.ogUrl || "https://consultaplacabrasil.com/cookies",
    },
  };
}

export default async function CookiesPage() {
  const page = await getPage();

  const defaultContent = `
    <h2>Política de Cookies</h2>
    <p>O site Consulta Placa Brasil utiliza cookies para melhorar a experiência do usuário e fornecer funcionalidades essenciais.</p>
    <h3>O que são cookies?</h3>
    <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências e melhorar sua experiência de navegação.</p>
    <h3>Tipos de cookies que utilizamos</h3>
    <ul>
      <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento do site, como autenticação e sessão.</li>
      <li><strong>Cookies de análise:</strong> Utilizados para entender como os visitantes utilizam o site (Google Analytics).</li>
      <li><strong>Cookies de preferências:</strong> Permitem lembrar suas preferências e configurações.</li>
    </ul>
    <h3>Como gerenciar cookies</h3>
    <p>Você pode configurar seu navegador para bloquear ou alertar sobre cookies. No entanto, algumas funcionalidades do site podem não funcionar corretamente sem cookies.</p>
    <h3>Contato</h3>
    <p>Para dúvidas sobre nossa política de cookies, entre em contato pelo e-mail contato@consultaplacabrasil.com.</p>
  `;

  return (
    <div className="flex flex-col">
      <section className="bg-[#0F172A] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">Política de Cookies</h1>
          <p className="mt-3 text-gray-400">Saiba como utilizamos cookies</p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div
          className="prose prose-gray mx-auto max-w-4xl"
          dangerouslySetInnerHTML={{
            __html: page?.content || defaultContent,
          }}
        />
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page?.seoTitle || "Política de Cookies",
            description: page?.seoDescription || "Política de cookies do Consulta Placa Brasil.",
            url: "https://consultaplacabrasil.com/cookies",
          }),
        }}
      />
    </div>
  );
}
