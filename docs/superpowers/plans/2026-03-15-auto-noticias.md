# Auto Noticias Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an automated automotive news system that fetches from Google News RSS, rewrites with DeepSeek R1, and publishes to /noticias — completely separate from /blog.

**Architecture:** New `noticias` + `noticias_config` tables in existing Drizzle/Neon PostgreSQL. Cron via Vercel hits API route that processes one category per execution (round-robin). Admin panel for approval/config. SSR frontend pages.

**Tech Stack:** Next.js 16, Drizzle ORM, Neon PostgreSQL, DeepSeek R1 (via OpenAI SDK), rss-parser, Tailwind CSS 4, Tiptap editor.

**Spec:** `docs/superpowers/specs/2026-03-15-auto-noticias-design.md`

---

## File Structure

### New Files to Create

```
# Database
src/lib/db/schema.ts                                    # MODIFY: add noticias + noticias_config tables

# API - Admin
src/app/api/admin/noticias/route.ts                     # CRUD for noticias (admin)
src/app/api/admin/noticias/config/route.ts               # CRUD for noticias_config
src/app/api/admin/noticias/aprovar/route.ts              # Quick approve/reject endpoint

# API - Cron
src/app/api/cron/noticias/route.ts                       # Cron endpoint (entry point)

# Script
src/lib/noticias/auto-noticias.ts                        # Core automation logic
src/lib/noticias/deepseek.ts                             # DeepSeek R1 integration
src/lib/noticias/rss.ts                                  # RSS fetch + parse
src/lib/noticias/dedup.ts                                # Duplicate detection
src/lib/noticias/slugify.ts                              # Slug generation with collision handling (custom, no npm dep)

# Admin Pages
src/app/(admin)/admin/noticias/page.tsx                  # Noticias listing + approval
src/app/(admin)/admin/noticias/[id]/page.tsx             # Edit individual noticia
src/app/(admin)/admin/noticias/configuracoes/page.tsx    # Config panel

# Frontend Pages
src/app/(public)/noticias/page.tsx                       # Public listing (SSR)
src/app/(public)/noticias/[slug]/page.tsx                # Individual noticia (SSR)
src/app/(public)/noticias/categoria/[slug]/page.tsx      # Category filter (SSR)

# Components
src/components/noticias/NoticiaCard.tsx                   # Card for grids
src/components/noticias/NoticiaCTAConsulta.tsx            # CTA box
src/components/noticias/NoticiaRelacionadas.tsx           # Related news grid
src/components/noticias/NoticiaBadge.tsx                  # Category badge

# Home section
src/components/noticias/UltimasNoticias.tsx              # "Latest News" section for home

# Seed
src/scripts/seed-noticias-config.ts                      # Seed 4 initial categories

# Vercel
vercel.json                                              # CREATE: cron config
```

### Files to Modify

```
src/lib/db/schema.ts                                     # Add 2 new tables
src/components/layout/header.tsx                         # Add "Noticias" nav link
src/app/(public)/page.tsx                                # Add UltimasNoticias section
src/app/sitemap.ts                                       # Add noticias URLs
package.json                                             # Add dependencies (via npm install)
```

---

## Chunk 1: Database + Dependencies

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install rss-parser and openai**

```bash
cd d:/GitHub/consulta-placa-brasil
npm install rss-parser openai
```

- [ ] **Step 2: Verify installation**

```bash
cd d:/GitHub/consulta-placa-brasil
node -e "require('rss-parser'); require('openai'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add package.json package-lock.json
git commit -m "chore: add rss-parser and openai dependencies"
```

---

### Task 2: Add Database Tables

**Files:**
- Modify: `src/lib/db/schema.ts` (add after line 250, after blogRedirects table)

- [ ] **Step 1: Add noticias table to schema**

Add the following after the `blogRedirects` table definition in `src/lib/db/schema.ts`:

```typescript
// Noticias Automotivas
export const noticias = pgTable(
  "noticias",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    titulo: varchar("titulo", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    resumo: text("resumo").notNull(),
    conteudo: text("conteudo").notNull(),
    categoria: varchar("categoria", { length: 50 }).notNull(),
    tags: text("tags").array(),
    status: postStatusEnum("status").default("draft").notNull(),
    publishedAt: timestamp("published_at"),
    viewCount: integer("view_count").default(0),
    // Origem (uso interno — filtro de duplicatas)
    origemUrlOriginal: text("origem_url_original"),
    geradoPorIA: boolean("gerado_por_ia").default(true),
    // SEO
    seoTitle: varchar("seo_title", { length: 70 }),
    seoDescription: varchar("seo_description", { length: 160 }),
    seoCanonical: text("seo_canonical"),
    // CTA
    ctaExibir: boolean("cta_exibir").default(true),
    ctaTexto: text("cta_texto").default(
      "Vai comprar um veículo? Consulte a placa antes!"
    ),
    ctaLink: text("cta_link").default("https://consultaplacabrasil.com/"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("noticias_slug_idx").on(table.slug),
    index("noticias_categoria_idx").on(table.categoria),
    index("noticias_status_idx").on(table.status),
  ]
);

// Noticias Config
export const noticiasConfig = pgTable(
  "noticias_config",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    categoria: varchar("categoria", { length: 50 }).notNull(),
    categoriaLabel: varchar("categoria_label", { length: 100 }).notNull(),
    ativa: boolean("ativa").default(true),
    limiteDiario: integer("limite_diario").default(10),
    feedUrl: text("feed_url").notNull(),
    autoPublish: boolean("auto_publish").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("noticias_config_categoria_idx").on(table.categoria),
  ]
);
```

- [ ] **Step 2: Add boolean import if not present**

Check if `boolean` is already imported from `drizzle-orm/pg-core` at the top of `src/lib/db/schema.ts`. If not, add it to the import statement.

- [ ] **Step 3: Generate and push migration**

```bash
cd d:/GitHub/consulta-placa-brasil
npx drizzle-kit generate
npx drizzle-kit push
```

- [ ] **Step 4: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/db/schema.ts drizzle/
git commit -m "feat: add noticias and noticias_config tables"
```

---

### Task 3: Seed noticias_config

**Files:**
- Create: `src/scripts/seed-noticias-config.ts`

- [ ] **Step 1: Create seed script**

```typescript
// src/scripts/seed-noticias-config.ts
import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";

const categorias = [
  {
    categoria: "detran",
    categoriaLabel: "Detran e Documentação",
    feedUrl:
      "https://news.google.com/rss/search?q=detran&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "recalls",
    categoriaLabel: "Recalls e Segurança",
    feedUrl:
      "https://news.google.com/rss/search?q=recall+veiculos&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "mercado-usados",
    categoriaLabel: "Mercado de Usados",
    feedUrl:
      "https://news.google.com/rss/search?q=mercado+carros+usados+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "legislacao",
    categoriaLabel: "Legislação e Trânsito",
    feedUrl:
      "https://news.google.com/rss/search?q=transito+legislacao+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
];

async function seed() {
  for (const cat of categorias) {
    await db
      .insert(noticiasConfig)
      .values(cat)
      .onConflictDoNothing({ target: noticiasConfig.categoria });
  }
  console.log("Seed concluido: 4 categorias inseridas");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Run the seed**

```bash
cd d:/GitHub/consulta-placa-brasil
npx tsx src/scripts/seed-noticias-config.ts
```

Expected: `Seed concluido: 4 categorias inseridas`

- [ ] **Step 3: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/scripts/seed-noticias-config.ts
git commit -m "feat: add seed script for noticias_config categories"
```

---

## Chunk 2: Core Automation Library

### Task 4: Slug Generation Utility

**Files:**
- Create: `src/lib/noticias/slugify.ts`

- [ ] **Step 1: Create slugify module with collision handling**

```typescript
// src/lib/noticias/slugify.ts
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export function gerarSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function gerarSlugUnico(titulo: string): Promise<string> {
  const base = gerarSlug(titulo);
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await db
      .select({ id: noticias.id })
      .from(noticias)
      .where(eq(noticias.slug, slug))
      .limit(1);

    if (existing.length === 0) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/noticias/slugify.ts
git commit -m "feat: add slug generation with collision handling"
```

---

### Task 5: RSS Fetching

**Files:**
- Create: `src/lib/noticias/rss.ts`

- [ ] **Step 1: Create RSS module**

```typescript
// src/lib/noticias/rss.ts
import Parser from "rss-parser";

const parser = new Parser();

export interface NoticiaRSS {
  titulo: string;
  link: string;
  descricao: string;
  data: string;
}

export async function buscarNoticiasRSS(
  feedUrl: string
): Promise<NoticiaRSS[]> {
  try {
    const feed = await parser.parseURL(feedUrl);

    return (feed.items || []).map((item) => ({
      titulo: item.title || "",
      link: item.link || "",
      descricao: item.contentSnippet || item.content || "",
      data: item.pubDate || new Date().toISOString(),
    }));
  } catch (error) {
    console.error(`Erro ao buscar feed RSS: ${feedUrl}`, error);
    return [];
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/noticias/rss.ts
git commit -m "feat: add RSS feed fetching module"
```

---

### Task 6: Duplicate Detection

**Files:**
- Create: `src/lib/noticias/dedup.ts`

- [ ] **Step 1: Create dedup module**

```typescript
// src/lib/noticias/dedup.ts
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, gte, and } from "drizzle-orm";

function normalizar(texto: string): string[] {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((p) => p.length > 2);
}

function similaridade(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  const comuns = a.filter((p) => setB.has(p)).length;
  return comuns / Math.max(a.length, b.length);
}

export async function isDuplicata(
  url: string,
  titulo: string
): Promise<boolean> {
  // Camada 1: URL exata
  const porUrl = await db
    .select({ id: noticias.id })
    .from(noticias)
    .where(eq(noticias.origemUrlOriginal, url))
    .limit(1);

  if (porUrl.length > 0) return true;

  // Camada 2: Similaridade de titulo (ultimos 7 dias)
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

  const recentes = await db
    .select({ titulo: noticias.titulo })
    .from(noticias)
    .where(gte(noticias.createdAt, seteDiasAtras));

  const palavrasNovo = normalizar(titulo);

  for (const existente of recentes) {
    const palavrasExistente = normalizar(existente.titulo);
    if (similaridade(palavrasNovo, palavrasExistente) > 0.8) {
      return true;
    }
  }

  return false;
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/noticias/dedup.ts
git commit -m "feat: add duplicate detection for noticias"
```

---

### Task 7: DeepSeek R1 Integration

**Files:**
- Create: `src/lib/noticias/deepseek.ts`

- [ ] **Step 1: Create DeepSeek module**

```typescript
// src/lib/noticias/deepseek.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const SYSTEM_PROMPT = `Voce e um jornalista automotivo brasileiro de redacao que escreve materias para o portal Consulta Placa Brasil.
Seu trabalho e produzir noticias jornalisticas factuais, diretas e informativas para o publico brasileiro.

Regras de estilo jornalistico:
- Escreva uma MATERIA JORNALISTICA original baseada na noticia fornecida
- NAO copie trechos do texto original, reescreva completamente com suas proprias palavras
- Use a tecnica do lide no primeiro paragrafo: responda quem, o que, quando, onde e por que
- A materia deve ter entre 300 e 600 palavras
- Tom factual, objetivo e direto. SEM opiniao pessoal, SEM linguagem de blog
- Paragrafos curtos de 2-3 linhas (padrao jornalistico)
- Inclua 1-2 intertitulos (H2) para quebrar o texto
- Use aspas apenas se houver declaracoes reais na fonte original
- NAO invente dados, numeros, declaracoes ou estatisticas
- NAO use expressoes como "neste artigo", "confira", "voce sabia", "fique ligado"
- NUNCA use em dash (--)
- NAO use caracteres especiais desnecessarios
- Quando a materia envolver compra/venda de veiculos, documentacao ou historico veicular, inclua naturalmente uma mencao sobre a importancia de verificar a procedencia do veiculo

Gere tambem:
- titulo (estilo manchete jornalistica, maximo 75 caracteres)
- tituloSEO (maximo 65 caracteres, otimizado para busca)
- metaDescription (maximo 155 caracteres)
- resumo (maximo 160 caracteres, estilo linha fina/subtitulo de jornal)
- 3-5 tags relevantes

Formato de resposta (JSON):
{
  "titulo": "Manchete da materia",
  "tituloSEO": "Titulo SEO otimizado",
  "metaDescription": "Meta description",
  "resumo": "Linha fina / subtitulo jornalistico",
  "conteudo": "Materia completa em formato HTML simples (apenas p, h2, strong, em, ul, li)",
  "tags": ["tag1", "tag2", "tag3"]
}

IMPORTANTE: Responda APENAS com o JSON, sem texto adicional, sem markdown, sem code blocks.`;

export interface ArtigoGerado {
  titulo: string;
  tituloSEO: string;
  metaDescription: string;
  resumo: string;
  conteudo: string;
  tags: string[];
}

export async function reescreverNoticia(
  titulo: string,
  descricao: string
): Promise<ArtigoGerado | null> {
  try {
    const userPrompt = `Reescreva esta noticia automotiva:

Titulo: ${titulo}
Resumo: ${descricao}`;

    const response = await client.chat.completions.create({
      model: "deepseek-reasoner",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    // Limpar possivel markdown wrapping
    const jsonStr = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const parsed = JSON.parse(jsonStr) as ArtigoGerado;

    // Validacao basica
    if (!parsed.titulo || !parsed.conteudo || !parsed.resumo) {
      console.error("JSON incompleto do DeepSeek:", parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Erro ao reescrever noticia com DeepSeek:", error);
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/noticias/deepseek.ts
git commit -m "feat: add DeepSeek R1 integration for news rewriting"
```

---

### Task 8: Core Automation Script

**Files:**
- Create: `src/lib/noticias/auto-noticias.ts`

- [ ] **Step 1: Create main automation module**

```typescript
// src/lib/noticias/auto-noticias.ts
import { db } from "@/lib/db";
import { noticias, noticiasConfig } from "@/lib/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { buscarNoticiasRSS } from "./rss";
import { isDuplicata } from "./dedup";
import { reescreverNoticia } from "./deepseek";
import { gerarSlugUnico } from "./slugify";

interface ResultadoExecucao {
  categoria: string;
  encontradas: number;
  duplicatas: number;
  publicadas: number;
  erros: number;
  detalhes: string[];
}

function hojeEmSaoPaulo(): Date {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dateStr = formatter.format(new Date());
  return new Date(dateStr + "T00:00:00-03:00");
}

async function contarPublicadasHoje(categoria: string): Promise<number> {
  const inicioDia = hojeEmSaoPaulo();
  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(noticias)
    .where(
      and(
        eq(noticias.categoria, categoria),
        gte(noticias.createdAt, inicioDia)
      )
    );
  return result[0]?.count || 0;
}

export async function executarAutoNoticias(
  categoriaAlvo?: string
): Promise<ResultadoExecucao[]> {
  const resultados: ResultadoExecucao[] = [];

  // Buscar configuracoes ativas
  let configs = await db
    .select()
    .from(noticiasConfig)
    .where(eq(noticiasConfig.ativa, true));

  // Se categoria especifica, filtrar
  if (categoriaAlvo) {
    configs = configs.filter((c) => c.categoria === categoriaAlvo);
  }

  for (const config of configs) {
    const resultado: ResultadoExecucao = {
      categoria: config.categoria,
      encontradas: 0,
      duplicatas: 0,
      publicadas: 0,
      erros: 0,
      detalhes: [],
    };

    try {
      // Verificar limite diario
      const jaPublicadas = await contarPublicadasHoje(config.categoria);
      const restante = (config.limiteDiario || 10) - jaPublicadas;

      if (restante <= 0) {
        resultado.detalhes.push(
          `Limite diario atingido (${config.limiteDiario})`
        );
        resultados.push(resultado);
        continue;
      }

      // Buscar RSS
      const noticiasRSS = await buscarNoticiasRSS(config.feedUrl);
      resultado.encontradas = noticiasRSS.length;

      let publicadas = 0;

      for (const noticiaRSS of noticiasRSS) {
        if (publicadas >= restante) break;

        // Verificar duplicata
        const duplicata = await isDuplicata(
          noticiaRSS.link,
          noticiaRSS.titulo
        );
        if (duplicata) {
          resultado.duplicatas++;
          continue;
        }

        // Reescrever com DeepSeek
        const artigo = await reescreverNoticia(
          noticiaRSS.titulo,
          noticiaRSS.descricao
        );

        if (!artigo) {
          resultado.erros++;
          resultado.detalhes.push(`Erro ao reescrever: ${noticiaRSS.titulo}`);
          continue;
        }

        // Gerar slug unico
        const slug = await gerarSlugUnico(artigo.titulo);

        // Determinar status
        const status = config.autoPublish ? "published" : "draft";

        // Salvar no banco
        await db.insert(noticias).values({
          titulo: artigo.titulo,
          slug,
          resumo: artigo.resumo.substring(0, 160),
          conteudo: artigo.conteudo,
          categoria: config.categoria,
          tags: artigo.tags,
          status,
          publishedAt: status === "published" ? new Date() : null,
          origemUrlOriginal: noticiaRSS.link,
          geradoPorIA: true,
          seoTitle: artigo.tituloSEO?.substring(0, 70),
          seoDescription: artigo.metaDescription?.substring(0, 160),
          ctaExibir: true,
          ctaTexto: "Vai comprar um veículo? Consulte a placa antes!",
          ctaLink: "https://consultaplacabrasil.com/",
        });

        publicadas++;
        resultado.publicadas++;
        resultado.detalhes.push(`Publicada: ${artigo.titulo}`);

        // Delay entre chamadas (2s)
        if (publicadas < restante) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      resultado.erros++;
      resultado.detalhes.push(
        `Erro geral: ${error instanceof Error ? error.message : "desconhecido"}`
      );
    }

    resultados.push(resultado);
  }

  return resultados;
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/lib/noticias/auto-noticias.ts
git commit -m "feat: add core automation script for auto-noticias"
```

---

### Task 9: Cron API Route

**Files:**
- Create: `src/app/api/cron/noticias/route.ts`
- Create: `vercel.json`

- [ ] **Step 1: Create cron endpoint with round-robin**

```typescript
// src/app/api/cron/noticias/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { executarAutoNoticias } from "@/lib/noticias/auto-noticias";

export const maxDuration = 60;

async function getProximaCategoria(): Promise<string | null> {
  // Round-robin: pega a categoria ativa com updatedAt mais antigo
  const configs = await db
    .select({ categoria: noticiasConfig.categoria })
    .from(noticiasConfig)
    .where(eq(noticiasConfig.ativa, true))
    .orderBy(asc(noticiasConfig.updatedAt))
    .limit(1);

  if (configs.length === 0) return null;

  // Atualiza updatedAt para enviar pro final da fila
  await db
    .update(noticiasConfig)
    .set({ updatedAt: new Date() })
    .where(eq(noticiasConfig.categoria, configs[0].categoria));

  return configs[0].categoria;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    // Permite forcar categoria via param, senao usa round-robin
    const categoria =
      searchParams.get("categoria") || (await getProximaCategoria());

    if (!categoria) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma categoria ativa",
      });
    }

    const resultados = await executarAutoNoticias(categoria);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      categoriaProcessada: categoria,
      resultados,
    });
  } catch (error) {
    console.error("Erro no cron de noticias:", error);
    return NextResponse.json(
      {
        error: "Falha na execucao",
        message: error instanceof Error ? error.message : "desconhecido",
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create vercel.json**

```json
{
  "crons": [
    {
      "path": "/api/cron/noticias",
      "schedule": "0 */1 * * *"
    }
  ]
}
```

Note: Runs every hour. With round-robin, each of the 4 categories is processed ~6x/day.

- [ ] **Step 3: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/api/cron/noticias/route.ts vercel.json
git commit -m "feat: add cron endpoint and Vercel cron config"
```

---

## Chunk 3: Admin API Routes

### Task 10: Admin Noticias CRUD API

**Files:**
- Create: `src/app/api/admin/noticias/route.ts`

Reference: `src/app/api/admin/blog/route.ts` for patterns (requireRole, response format).

- [ ] **Step 1: Create admin noticias API**

```typescript
// src/app/api/admin/noticias/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function GET(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");
    const status = searchParams.get("status");

    const conditions = [];
    if (categoria) conditions.push(eq(noticias.categoria, categoria));
    if (status)
      conditions.push(
        eq(noticias.status, status as "draft" | "published" | "inactive")
      );

    const result = await db
      .select()
      .from(noticias)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(noticias.createdAt));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar noticias" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatorio" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(noticias)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(noticias.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar noticia" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatorio" },
        { status: 400 }
      );
    }

    await db.delete(noticias).where(eq(noticias.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao deletar noticia" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/api/admin/noticias/route.ts
git commit -m "feat: add admin CRUD API for noticias"
```

---

### Task 11: Quick Approve/Reject API

**Files:**
- Create: `src/app/api/admin/noticias/aprovar/route.ts`

- [ ] **Step 1: Create approve endpoint**

```typescript
// src/app/api/admin/noticias/aprovar/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export async function POST(req: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id, acao } = await req.json();
    if (!id || !["aprovar", "rejeitar"].includes(acao)) {
      return NextResponse.json(
        { error: "ID e acao (aprovar/rejeitar) obrigatorios" },
        { status: 400 }
      );
    }

    const newStatus = acao === "aprovar" ? "published" : "inactive";
    const updateData: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date(),
    };

    // Preencher publishedAt ao aprovar
    if (acao === "aprovar") {
      updateData.publishedAt = new Date();
    }

    const updated = await db
      .update(noticias)
      .set(updateData)
      .where(eq(noticias.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/api/admin/noticias/aprovar/route.ts
git commit -m "feat: add quick approve/reject API for noticias"
```

---

### Task 12: Noticias Config API

**Files:**
- Create: `src/app/api/admin/noticias/config/route.ts`

- [ ] **Step 1: Create config API**

```typescript
// src/app/api/admin/noticias/config/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";
import { executarAutoNoticias } from "@/lib/noticias/auto-noticias";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const configs = await db.select().from(noticiasConfig);
    return NextResponse.json(configs);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar configuracoes" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatorio" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(noticiasConfig)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(noticiasConfig.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar configuracao" },
      { status: 500 }
    );
  }
}

// Executar cron manualmente
export async function POST(req: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    const { categoria } = await req.json();
    const resultados = await executarAutoNoticias(categoria || undefined);
    return NextResponse.json({ success: true, resultados });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Erro ao executar",
        message: err instanceof Error ? err.message : "desconhecido",
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/api/admin/noticias/config/route.ts
git commit -m "feat: add noticias config API with manual execution"
```

---

## Chunk 4: Admin Pages

### Task 15: Admin Noticias Listing Page

**Files:**
- Create: `src/app/(admin)/admin/noticias/page.tsx`

Reference: `src/app/(admin)/admin/blog/page.tsx` for visual patterns (status badges, filters, table layout).

- [ ] **Step 1: Create admin listing page**

Create the file `src/app/(admin)/admin/noticias/page.tsx` following the exact patterns from the blog admin page:

- `"use client"` directive
- State: noticias array, loading, statusFilter, categoriaFilter, search
- Fetch from `/api/admin/noticias` with category and status params
- Stats cards: total, drafts (aguardando aprovacao), published, inactive
- Filter tabs: Todos, Rascunho, Publicado, Inativo + dropdown for categoria
- Table rows: titulo, categoria badge (color-coded), status badge, date, action buttons
- Action buttons: "Aprovar" (green, calls `/api/admin/noticias/aprovar` with acao="aprovar"), "Rejeitar" (red, acao="rejeitar"), "Editar" (link to `/admin/noticias/[id]`), "Excluir"
- Delete confirmation modal
- Link to `/admin/noticias/configuracoes` in header

Category badge colors:
```typescript
const categoriaCores: Record<string, { bg: string; text: string }> = {
  detran: { bg: "bg-blue-100", text: "text-blue-700" },
  recalls: { bg: "bg-red-100", text: "text-red-700" },
  "mercado-usados": { bg: "bg-green-100", text: "text-green-700" },
  legislacao: { bg: "bg-purple-100", text: "text-purple-700" },
};
```

This is a large component (~400-500 lines). Follow the blog page structure exactly, replacing blog-specific logic with noticias equivalents.

- [ ] **Step 2: Verify page loads**

```bash
cd d:/GitHub/consulta-placa-brasil
npm run dev
```

Navigate to `http://localhost:3000/admin/noticias` (while logged in as admin).
Expected: Empty table with filter tabs and stats showing zeros.

- [ ] **Step 3: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(admin)/admin/noticias/page.tsx
git commit -m "feat: add admin noticias listing page"
```

---

### Task 16: Admin Noticias Edit Page

**Files:**
- Create: `src/app/(admin)/admin/noticias/[id]/page.tsx`

Reference: `src/app/(admin)/admin/blog/[id]/page.tsx` for editor patterns (Tiptap, tabs, form).

- [ ] **Step 1: Create edit page**

Create `src/app/(admin)/admin/noticias/[id]/page.tsx` following blog edit patterns:

- Dynamic import of RichEditor with `ssr: false`
- Tabs: ["conteudo", "seo", "preview"]
- Form fields: titulo, slug (auto-generated), resumo (textarea, maxLength 160), conteudo (Tiptap), categoria (select), tags (input), status (select)
- SEO tab: seoTitle (maxLength 70 with counter), seoDescription (maxLength 160 with counter), seoCanonical
- Preview tab: Google search result preview
- Load noticia from `/api/admin/noticias` by ID on mount
- Save via PUT to `/api/admin/noticias`
- Approve/Reject buttons in header (calls `/api/admin/noticias/aprovar`)
- Back arrow to `/admin/noticias`

Simpler than blog edit — no OpenGraph tab, no Schema tab, no image upload.

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(admin)/admin/noticias/[id]/page.tsx
git commit -m "feat: add admin noticias edit page"
```

---

### Task 17: Admin Config Page

**Files:**
- Create: `src/app/(admin)/admin/noticias/configuracoes/page.tsx`

- [ ] **Step 1: Create config page**

Create `src/app/(admin)/admin/noticias/configuracoes/page.tsx`:

- `"use client"` directive
- Fetch configs from `/api/admin/noticias/config` on mount
- Table with editable rows:
  - categoriaLabel (display only)
  - Toggle for `ativa`
  - Number input for `limiteDiario` (min 1, max 50)
  - Toggle for `autoPublish`
  - Text input for `feedUrl`
- Save individual row changes via PUT to `/api/admin/noticias/config`
- "Executar Agora" button per category (POST to `/api/admin/noticias/config` with categoria)
- "Executar Todas" button (POST without categoria)
- Loading/success/error states on buttons
- Back arrow to `/admin/noticias`

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(admin)/admin/noticias/configuracoes/page.tsx
git commit -m "feat: add admin noticias config page"
```

---

## Chunk 5: Frontend Components

### Task 18: Shared Components

**Files:**
- Create: `src/components/noticias/NoticiaBadge.tsx`
- Create: `src/components/noticias/NoticiaCard.tsx`
- Create: `src/components/noticias/NoticiaCTAConsulta.tsx`
- Create: `src/components/noticias/NoticiaRelacionadas.tsx`

- [ ] **Step 1: Create NoticiaBadge component**

```tsx
// src/components/noticias/NoticiaBadge.tsx
import Link from "next/link";

const CATEGORIAS: Record<string, { label: string; bg: string; text: string }> =
  {
    detran: {
      label: "Detran e Documentação",
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    recalls: {
      label: "Recalls e Segurança",
      bg: "bg-red-100",
      text: "text-red-700",
    },
    "mercado-usados": {
      label: "Mercado de Usados",
      bg: "bg-green-100",
      text: "text-green-700",
    },
    legislacao: {
      label: "Legislação e Trânsito",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
  };

export function getCategoriaLabel(slug: string): string {
  return CATEGORIAS[slug]?.label || slug;
}

export default function NoticiaBadge({
  categoria,
  linkable = true,
}: {
  categoria: string;
  linkable?: boolean;
}) {
  const config = CATEGORIAS[categoria] || {
    label: categoria,
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  const badge = (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );

  if (linkable) {
    return (
      <Link href={`/noticias/categoria/${categoria}`}>{badge}</Link>
    );
  }

  return badge;
}
```

- [ ] **Step 2: Create NoticiaCard component**

```tsx
// src/components/noticias/NoticiaCard.tsx
import Link from "next/link";
import NoticiaBadge from "./NoticiaBadge";

interface NoticiaCardProps {
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publishedAt: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NoticiaCard({
  titulo,
  slug,
  resumo,
  categoria,
  publishedAt,
}: NoticiaCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <NoticiaBadge categoria={categoria} />
      <h2 className="mt-3 text-lg font-bold text-[#0F172A] line-clamp-2">
        <Link href={`/noticias/${slug}`} className="hover:text-[#FF4D30]">
          {titulo}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-[#475569] line-clamp-3">{resumo}</p>
      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-[#94A3B8]">{formatDate(publishedAt)}</time>
        <Link
          href={`/noticias/${slug}`}
          className="text-sm font-semibold text-[#FF4D30] hover:underline"
        >
          Ler mais
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Create NoticiaCTAConsulta component**

```tsx
// src/components/noticias/NoticiaCTAConsulta.tsx
import Link from "next/link";
import { Search } from "lucide-react";

export default function NoticiaCTAConsulta({
  texto,
  link,
}: {
  texto?: string;
  link?: string;
}) {
  return (
    <div className="my-8 rounded-xl bg-gradient-to-r from-[#FF4D30] to-[#E8432A] p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <Search className="h-6 w-6" />
        <h3 className="text-lg font-bold">
          {texto || "Vai comprar um veículo? Consulte a placa antes!"}
        </h3>
      </div>
      <p className="text-sm text-white/90 mb-4">
        Verifique histórico, sinistro, leilão e débitos
      </p>
      <Link
        href={link || "https://consultaplacabrasil.com/"}
        className="inline-block bg-white text-[#FF4D30] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Consultar Agora
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Create NoticiaRelacionadas component**

```tsx
// src/components/noticias/NoticiaRelacionadas.tsx
import NoticiaCard from "./NoticiaCard";

interface NoticiaRelacionada {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  publishedAt: string | null;
}

export default function NoticiaRelacionadas({
  noticias,
}: {
  noticias: NoticiaRelacionada[];
}) {
  if (noticias.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
        Notícias Relacionadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {noticias.map((n) => (
          <NoticiaCard key={n.id} {...n} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/components/noticias/
git commit -m "feat: add noticias shared components"
```

---

## Chunk 6: Public Frontend Pages

### Task 19: Noticias Listing Page (SSR)

**Files:**
- Create: `src/app/(public)/noticias/page.tsx`

- [ ] **Step 1: Create listing page**

Create `src/app/(public)/noticias/page.tsx` as a **Server Component** (no "use client"):

```tsx
// src/app/(public)/noticias/page.tsx
import { Metadata } from "next";
import { db } from "@/lib/db";
import { noticias, noticiasConfig } from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import Link from "next/link";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import { getCategoriaLabel } from "@/components/noticias/NoticiaBadge";

export const metadata: Metadata = {
  title: "Notícias Automotivas",
  description:
    "Informações sobre o mercado automotivo brasileiro. Notícias sobre Detran, recalls, mercado de usados e legislação de trânsito.",
  alternates: { canonical: "https://consultaplacabrasil.com/noticias" },
  openGraph: { type: "website" },
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1"));
  const limit = 12;
  const offset = (page - 1) * limit;

  const whereClause = eq(noticias.status, "published");

  const [result, [{ count }], categorias] = await Promise.all([
    db
      .select({
        id: noticias.id,
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
        publishedAt: noticias.publishedAt,
      })
      .from(noticias)
      .where(whereClause)
      .orderBy(desc(noticias.publishedAt), desc(noticias.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(noticias)
      .where(whereClause),
    db.select().from(noticiasConfig).where(eq(noticiasConfig.ativa, true)),
  ]);

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-[#94A3B8]">
            <Link href="/" className="hover:text-[#FF4D30]">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A] font-medium">Notícias</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Notícias Automotivas
        </h1>
        <p className="mt-2 text-[#475569]">
          Informações sobre o mercado automotivo brasileiro
        </p>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/noticias"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-[#FF4D30] text-white"
          >
            Todas
          </Link>
          {categorias.map((cat) => (
            <Link
              key={cat.categoria}
              href={`/noticias/categoria/${cat.categoria}`}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
            >
              {cat.categoriaLabel}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((n) => (
            <NoticiaCard
              key={n.id}
              titulo={n.titulo}
              slug={n.slug}
              resumo={n.resumo}
              categoria={n.categoria}
              publishedAt={n.publishedAt?.toISOString() || null}
            />
          ))}
        </div>

        {result.length === 0 && (
          <p className="text-center text-[#94A3B8] mt-12">
            Nenhuma notícia publicada ainda.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/noticias?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Anterior
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-[#475569]">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/noticias?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Próxima
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(public)/noticias/page.tsx
git commit -m "feat: add public noticias listing page (SSR)"
```

---

### Task 20: Individual Noticia Page (SSR)

**Files:**
- Create: `src/app/(public)/noticias/[slug]/page.tsx`

- [ ] **Step 1: Create individual page**

Create `src/app/(public)/noticias/[slug]/page.tsx` as Server Component:

```tsx
// src/app/(public)/noticias/[slug]/page.tsx
import { Metadata } from "next";
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, and, ne, desc, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import NoticiaBadge, {
  getCategoriaLabel,
} from "@/components/noticias/NoticiaBadge";
import NoticiaCTAConsulta from "@/components/noticias/NoticiaCTAConsulta";
import NoticiaRelacionadas from "@/components/noticias/NoticiaRelacionadas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { cache } from "react";

const getNoticia = cache(async (slug: string) => {
  const result = await db
    .select()
    .from(noticias)
    .where(and(eq(noticias.slug, slug), eq(noticias.status, "published")))
    .limit(1);

  if (result.length === 0) return null;

  // Increment view count (cache ensures this runs only once per request)
  await db
    .update(noticias)
    .set({ viewCount: sql`${noticias.viewCount} + 1` })
    .where(eq(noticias.id, result[0].id));

  return result[0];
});

async function getRelacionadas(categoria: string, excludeId: string) {
  return db
    .select({
      id: noticias.id,
      titulo: noticias.titulo,
      slug: noticias.slug,
      resumo: noticias.resumo,
      categoria: noticias.categoria,
      publishedAt: noticias.publishedAt,
    })
    .from(noticias)
    .where(
      and(
        eq(noticias.status, "published"),
        eq(noticias.categoria, categoria),
        ne(noticias.id, excludeId)
      )
    )
    .orderBy(desc(noticias.publishedAt))
    .limit(3);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) return { title: "Notícia não encontrada" };

  const title = noticia.seoTitle || `${noticia.titulo} | Consulta Placa Brasil`;
  const description = noticia.seoDescription || noticia.resumo;

  return {
    title,
    description,
    alternates: {
      canonical:
        noticia.seoCanonical ||
        `https://consultaplacabrasil.com/noticias/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://consultaplacabrasil.com/noticias/${slug}`,
      publishedTime: noticia.publishedAt?.toISOString(),
    },
  };
}

function estimateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  const relacionadas = await getRelacionadas(noticia.categoria, noticia.id);
  const readTime = estimateReadTime(noticia.conteudo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumo,
    datePublished: noticia.publishedAt?.toISOString(),
    dateModified: noticia.updatedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: "Consulta Placa Brasil",
    },
    publisher: {
      "@type": "Organization",
      name: "Consulta Placa Brasil",
      logo: {
        "@type": "ImageObject",
        url: "https://consultaplacabrasil.com/logo.webp",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex flex-wrap text-sm text-[#94A3B8]">
              <Link href="/" className="hover:text-[#FF4D30]">
                Início
              </Link>
              <span className="mx-2">/</span>
              <Link href="/noticias" className="hover:text-[#FF4D30]">
                Notícias
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/noticias/categoria/${noticia.categoria}`}
                className="hover:text-[#FF4D30]"
              >
                {getCategoriaLabel(noticia.categoria)}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#0F172A] font-medium line-clamp-1">
                {noticia.titulo}
              </span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <NoticiaBadge categoria={noticia.categoria} />

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            {noticia.titulo}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-[#94A3B8]">
            <time>{formatDate(noticia.publishedAt)}</time>
            <span>{readTime} min de leitura</span>
          </div>

          {/* Content */}
          <div
            className="mt-8 prose prose-lg max-w-none
              prose-headings:text-[#0F172A] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-[#475569] prose-p:leading-relaxed
              prose-a:text-[#FF4D30] hover:prose-a:underline
              prose-strong:text-[#0F172A]
              prose-ul:text-[#475569] prose-li:text-[#475569]"
            dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
          />

          {/* CTA */}
          {noticia.ctaExibir && (
            <NoticiaCTAConsulta
              texto={noticia.ctaTexto || undefined}
              link={noticia.ctaLink || undefined}
            />
          )}

          {/* Tags */}
          {noticia.tags && noticia.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {noticia.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-[#475569] text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related */}
          <NoticiaRelacionadas
            noticias={relacionadas.map((r) => ({
              ...r,
              publishedAt: r.publishedAt?.toISOString() || null,
            }))}
          />

          {/* Final CTA */}
          <NoticiaCTAConsulta />
        </article>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(public)/noticias/[slug]/page.tsx
git commit -m "feat: add individual noticia page with SEO and schema markup"
```

---

### Task 21: Category Page (SSR)

**Files:**
- Create: `src/app/(public)/noticias/categoria/[slug]/page.tsx`

- [ ] **Step 1: Create category page**

Create `src/app/(public)/noticias/categoria/[slug]/page.tsx` as Server Component:

```tsx
// src/app/(public)/noticias/categoria/[slug]/page.tsx
import { Metadata } from "next";
import { db } from "@/lib/db";
import { noticias, noticiasConfig } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import NoticiaCard from "@/components/noticias/NoticiaCard";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getConfig(slug: string) {
  const result = await db
    .select()
    .from(noticiasConfig)
    .where(eq(noticiasConfig.categoria, slug))
    .limit(1);
  return result[0] || null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig(slug);
  if (!config) return { title: "Categoria não encontrada" };

  return {
    title: `Notícias sobre ${config.categoriaLabel}`,
    description: `Últimas notícias sobre ${config.categoriaLabel} no mercado automotivo brasileiro.`,
    alternates: {
      canonical: `https://consultaplacabrasil.com/noticias/categoria/${slug}`,
    },
    openGraph: { type: "website" },
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const config = await getConfig(slug);
  if (!config) notFound();

  const page = Math.max(1, parseInt(pageParam || "1"));
  const limit = 12;
  const offset = (page - 1) * limit;

  const whereClause = and(
    eq(noticias.status, "published"),
    eq(noticias.categoria, slug)
  );

  const [result, [{ count }], todasCategorias] = await Promise.all([
    db
      .select({
        id: noticias.id,
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
        publishedAt: noticias.publishedAt,
      })
      .from(noticias)
      .where(whereClause)
      .orderBy(desc(noticias.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(noticias)
      .where(whereClause),
    db.select().from(noticiasConfig).where(eq(noticiasConfig.ativa, true)),
  ]);

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-[#94A3B8]">
            <Link href="/" className="hover:text-[#FF4D30]">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/noticias" className="hover:text-[#FF4D30]">
              Notícias
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A] font-medium">
              {config.categoriaLabel}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Notícias sobre {config.categoriaLabel}
        </h1>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/noticias"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
          >
            Todas
          </Link>
          {todasCategorias.map((cat) => (
            <Link
              key={cat.categoria}
              href={`/noticias/categoria/${cat.categoria}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                cat.categoria === slug
                  ? "bg-[#FF4D30] text-white"
                  : "bg-white border border-gray-200 text-[#475569] hover:bg-gray-50"
              }`}
            >
              {cat.categoriaLabel}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.map((n) => (
            <NoticiaCard
              key={n.id}
              titulo={n.titulo}
              slug={n.slug}
              resumo={n.resumo}
              categoria={n.categoria}
              publishedAt={n.publishedAt?.toISOString() || null}
            />
          ))}
        </div>

        {result.length === 0 && (
          <p className="text-center text-[#94A3B8] mt-12">
            Nenhuma notícia nesta categoria ainda.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/noticias/categoria/${slug}?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Anterior
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-[#475569]">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/noticias/categoria/${slug}?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
              >
                Próxima
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/(public)/noticias/categoria/[slug]/page.tsx
git commit -m "feat: add category page for noticias"
```

---

## Chunk 7: Integration

### Task 22: Add Noticias to Navigation

**Files:**
- Modify: `src/components/layout/header.tsx` (line ~17, navLinks array)

- [ ] **Step 1: Add "Noticias" link to navLinks array**

In `src/components/layout/header.tsx`, find the `navLinks` array and add the Noticias entry between Blog and FAQ:

```typescript
// Before:
{ href: "/blog", label: "Blog" },
{ href: "/faq", label: "FAQ" },

// After:
{ href: "/blog", label: "Blog" },
{ href: "/noticias", label: "Notícias" },
{ href: "/faq", label: "FAQ" },
```

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/components/layout/header.tsx
git commit -m "feat: add Noticias to navigation menu"
```

---

### Task 23: Add Latest News to Home Page

**Files:**
- Create: `src/components/noticias/UltimasNoticias.tsx`
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Create UltimasNoticias component**

```tsx
// src/components/noticias/UltimasNoticias.tsx
import { db } from "@/lib/db";
import { noticias } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import NoticiaCard from "./NoticiaCard";

export default async function UltimasNoticias() {
  const ultimas = await db
    .select({
      id: noticias.id,
      titulo: noticias.titulo,
      slug: noticias.slug,
      resumo: noticias.resumo,
      categoria: noticias.categoria,
      publishedAt: noticias.publishedAt,
    })
    .from(noticias)
    .where(eq(noticias.status, "published"))
    .orderBy(desc(noticias.publishedAt))
    .limit(3);

  if (ultimas.length === 0) return null;

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0F172A] text-center">
          Últimas Notícias Automotivas
        </h2>
        <p className="mt-2 text-center text-[#475569]">
          Fique por dentro do mercado automotivo brasileiro
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ultimas.map((n) => (
            <NoticiaCard
              key={n.id}
              titulo={n.titulo}
              slug={n.slug}
              resumo={n.resumo}
              categoria={n.categoria}
              publishedAt={n.publishedAt?.toISOString() || null}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/noticias"
            className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg text-[#0F172A] font-semibold hover:bg-gray-50 transition-colors"
          >
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add UltimasNoticias to home page**

In `src/app/(public)/page.tsx`, import and add the component. Place it before the FAQ section (before `<FaqSection />`):

```tsx
import UltimasNoticias from "@/components/noticias/UltimasNoticias";

// In the JSX, before FaqSection:
<UltimasNoticias />
```

- [ ] **Step 3: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/components/noticias/UltimasNoticias.tsx src/app/(public)/page.tsx
git commit -m "feat: add latest news section to home page"
```

---

### Task 24: Add Noticias to Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add noticias URLs to sitemap**

In `src/app/sitemap.ts`, add imports and fetch noticias from DB. Add three groups:

1. Static `/noticias` URL:
```typescript
{
  url: "https://consultaplacabrasil.com/noticias",
  lastModified: new Date(),
  changeFrequency: "daily" as const,
  priority: 0.8,
},
```

2. Category URLs (from noticiasConfig where ativa=true):
```typescript
const categoriasAtivas = await db
  .select({ categoria: noticiasConfig.categoria })
  .from(noticiasConfig)
  .where(eq(noticiasConfig.ativa, true));

const categoriaUrls = categoriasAtivas.map((c) => ({
  url: `https://consultaplacabrasil.com/noticias/categoria/${c.categoria}`,
  lastModified: new Date(),
  changeFrequency: "daily" as const,
  priority: 0.7,
}));
```

3. Individual noticia URLs (published only):
```typescript
const noticiasPublicadas = await db
  .select({ slug: noticias.slug, updatedAt: noticias.updatedAt })
  .from(noticias)
  .where(eq(noticias.status, "published"));

const noticiaUrls = noticiasPublicadas.map((n) => ({
  url: `https://consultaplacabrasil.com/noticias/${n.slug}`,
  lastModified: n.updatedAt,
  changeFrequency: "weekly" as const,
  priority: 0.6,
}));
```

Spread all into the return array alongside existing URLs.

- [ ] **Step 2: Commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add src/app/sitemap.ts
git commit -m "feat: add noticias to sitemap"
```

---

### Task 25: Environment Variables

- [ ] **Step 1: Add env vars to .env**

Add to the `.env` file (do NOT commit this file):
```
DEEPSEEK_API_KEY=sk-your-deepseek-key
CRON_SECRET=generate-a-long-secret-key
```

- [ ] **Step 2: Add same vars to Vercel dashboard**

Go to Vercel project settings → Environment Variables and add:
- `DEEPSEEK_API_KEY`
- `CRON_SECRET`

---

### Task 26: Build and Verify

- [ ] **Step 1: Run build**

```bash
cd d:/GitHub/consulta-placa-brasil
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Fix any build errors**

Address any TypeScript or import errors that appear.

- [ ] **Step 3: Run dev and manually test**

```bash
cd d:/GitHub/consulta-placa-brasil
npm run dev
```

Test:
- `/noticias` — shows empty listing with category tabs
- `/noticias/categoria/detran` — shows empty filtered listing
- `/admin/noticias` — shows empty admin table (requires admin login)
- `/admin/noticias/configuracoes` — shows 4 categories with toggles
- Home page — UltimasNoticias section hidden (no published noticias)
- Header — "Notícias" link visible in nav

- [ ] **Step 4: Test cron manually**

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/cron/noticias
```

Expected: JSON response with resultados array (may have errors if DEEPSEEK_API_KEY not set).

- [ ] **Step 5: Final commit**

```bash
cd d:/GitHub/consulta-placa-brasil
git add -A
git commit -m "feat: complete auto-noticias system - ready for testing"
```
