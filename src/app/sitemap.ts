import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { blogPosts, blogCategories, pages } from "@/lib/db/schema";
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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
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
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/ferramentas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog posts
  let blogPostEntries: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await db
      .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));

    blogPostEntries = publishedPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB not available, skip dynamic entries
  }

  // Dynamic blog categories
  let categoryEntries: MetadataRoute.Sitemap = [];
  try {
    const categories = await db
      .select({ slug: blogCategories.slug })
      .from(blogCategories);

    categoryEntries = categories.map((cat) => ({
      url: `${baseUrl}/blog?category=${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch {
    // DB not available, skip
  }

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

  return [...staticPages, ...toolPages, ...blogPostEntries, ...categoryEntries, ...pageEntries];
}
