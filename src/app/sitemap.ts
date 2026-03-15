import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { pages, noticias, noticiasConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://consultaplacabrasil.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // Blog removido do sitemap até conversão para SSR (páginas CSR não têm canonical próprio)
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/lgpd`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ferramentas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Tool pages
  const toolSlugs = [
    "calculadora-ipva", "calculadora-multas", "simulador-financiamento",
    "calculadora-flex", "decodificador-chassi", "identificador-placa",
    "simulador-pontos-cnh", "verificador-documentos", "calculadora-transferencia",
    "custo-total-veiculo", "calculadora-depreciacao", "eletrico-vs-combustao",
    "calculadora-frete-antt", "custo-km-caminhao", "gerador-placa",
    "conversor-placa", "checklist-manutencao", "calculadora-combustivel",
    "calculadora-rodizio", "gerador-contrato", "consulta-fipe",
    "consulta-recall", "consulta-cep", "calculadora-dpvat",
    "gerador-renavam", "validador-renavam", "gerador-recibo",
    "gerador-atpv", "validador-chassi", "contrato-veiculo",
    "quitacao-antecipada", "juros-abusivos", "atraso-parcelas",
    "proposta-quitacao", "calculadora-cet", "antecipacao-parcelas",
    "portabilidade-financiamento", "refinanciamento", "calculadora-iof",
    "direitos-comprador",
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/ferramentas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts e categorias removidos do sitemap até conversão para SSR
  // Páginas CSR não têm generateMetadata, retornando canonical da homepage
  // Isso causa erro "non-canonical page in sitemap" no Ahrefs/Google

  // Dynamic institutional pages
  let pageEntries: MetadataRoute.Sitemap = [];
  try {
    const publishedPages = await db
      .select({ slug: pages.slug, updatedAt: pages.updatedAt })
      .from(pages)
      .where(eq(pages.published, true));

    pageEntries = publishedPages
      .filter((p) => !["sobre", "termos", "privacidade", "cookies", "lgpd"].includes(p.slug))
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      }));
  } catch {
    // DB not available, skip
  }

  // Noticias
  let noticiaEntries: MetadataRoute.Sitemap = [];
  let categoriaNoticias: MetadataRoute.Sitemap = [];
  try {
    // Pagina principal de noticias
    const noticiasIndex: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/noticias`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];

    // Categorias ativas
    const categoriasAtivas = await db
      .select({ categoria: noticiasConfig.categoria })
      .from(noticiasConfig)
      .where(eq(noticiasConfig.ativa, true));

    categoriaNoticias = categoriasAtivas.map((c) => ({
      url: `${baseUrl}/noticias/categoria/${c.categoria}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    // Noticias publicadas
    const noticiasPublicadas = await db
      .select({ slug: noticias.slug, updatedAt: noticias.updatedAt })
      .from(noticias)
      .where(eq(noticias.status, "published"));

    noticiaEntries = [
      ...noticiasIndex,
      ...categoriaNoticias,
      ...noticiasPublicadas.map((n) => ({
        url: `${baseUrl}/noticias/${n.slug}`,
        lastModified: n.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // DB not available, skip
  }

  return [...staticPages, ...toolPages, ...pageEntries, ...noticiaEntries];
}
