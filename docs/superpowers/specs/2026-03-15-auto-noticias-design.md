# Design: Sistema de Noticias Automotivas Automaticas

## Objetivo

Adicionar ao consultaplacabrasil.com um sistema automatizado de noticias automotivas. O sistema busca noticias do Google News via RSS, reescreve com IA (DeepSeek R1), e publica automaticamente no banco de dados. As noticias ficam na rota /noticias, completamente separadas do /blog.

Noticias sao fatos — tom jornalistico, lide no primeiro paragrafo, paragrafos curtos, sem opiniao. Diferente de artigos de blog.

## Stack

- Next.js 16 + Drizzle ORM + Neon PostgreSQL (stack existente)
- DeepSeek R1 via SDK OpenAI (compativel)
- rss-parser para feeds RSS
- Sem Payload CMS
- Sem imagens na fase inicial

## Abordagem Escolhida

Abordagem C: tabela `noticias` separada + tabela `noticias_config` para controle via admin.

---

## 1. Banco de Dados

### 1.1 Tabela `noticias`

```
noticias
├── id                  text PK UUID
├── titulo              varchar(255) NOT NULL
├── slug                varchar(300) NOT NULL UNIQUE
├── resumo              text NOT NULL (max 160 chars, validado na app)
├── conteudo            text NOT NULL (HTML simples: p, h2, strong, em, ul, li)
├── categoria           varchar(50) NOT NULL ("detran" | "recalls" | "mercado-usados" | "legislacao")
├── tags                text[] (array de strings)
├── status              post_status enum (draft | published | inactive) — reutiliza enum existente
├── publishedAt         timestamp
├── viewCount           integer DEFAULT 0
│
├── # Origem (uso interno, nunca exibido no frontend)
├── origemUrlOriginal   text (URL da noticia original — usado para filtro de duplicatas)
├── geradoPorIA         boolean DEFAULT true
│
├── # SEO
├── seoTitle            varchar(70)
├── seoDescription      varchar(160)
├── seoCanonical        text
│
├── # CTA
├── ctaExibir           boolean DEFAULT true
├── ctaTexto            text DEFAULT "Vai comprar um veiculo? Consulte a placa antes!"
├── ctaLink             text DEFAULT "https://consultaplacabrasil.com/"
│
├── # Timestamps
├── createdAt           timestamp DEFAULT now()
└── updatedAt           timestamp DEFAULT now()
```

Convencao: propriedades camelCase no Drizzle mapeando para snake_case no banco (ex: `origemUrlOriginal: text("origem_url_original")`), seguindo o padrao existente do projeto.

Indices: unique em slug, index em categoria, index em status.

### 1.2 Tabela `noticias_config`

```
noticias_config
├── id                  text PK UUID
├── categoria           varchar(50) UNIQUE NOT NULL
├── categoriaLabel      varchar(100) NOT NULL (nome exibido: "Detran e Documentacao")
├── ativa               boolean DEFAULT true
├── limiteDiario        integer DEFAULT 10
├── feedUrl             text NOT NULL (URL do feed RSS do Google News)
├── autoPublish         boolean DEFAULT false
├── createdAt           timestamp DEFAULT now()
└── updatedAt           timestamp DEFAULT now()
```

Pre-populada com 4 categorias:

| categoria | categoriaLabel | feedUrl |
|---|---|---|
| detran | Detran e Documentacao | https://news.google.com/rss/search?q=detran&hl=pt-BR&gl=BR&ceid=BR:pt-419 |
| recalls | Recalls e Seguranca | https://news.google.com/rss/search?q=recall+veiculos&hl=pt-BR&gl=BR&ceid=BR:pt-419 |
| mercado-usados | Mercado de Usados | https://news.google.com/rss/search?q=mercado+carros+usados+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419 |
| legislacao | Legislacao e Transito | https://news.google.com/rss/search?q=transito+legislacao+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419 |

---

## 2. Script de Automacao

### 2.1 Fluxo

```
Cron (Vercel) → GET /api/cron/noticias (Bearer CRON_SECRET)
    │
    ▼
Le noticias_config (categorias ativas + limites)
    │
    ▼
Para cada categoria ativa:
    ├─ Fetch RSS do Google News (feedUrl da config)
    ├─ Parse com rss-parser
    ├─ Filtra duplicatas:
    │   ├─ Camada 1: URL exata (busca origemUrlOriginal no banco)
    │   └─ Camada 2: Similaridade de titulo (ultimos 7 dias, >80% palavras em comum)
    ├─ Conta quantas noticias dessa categoria ja foram publicadas hoje
    ├─ Seleciona ate (limiteDiario - publicadasHoje) noticias
    │
    └─ Para cada noticia selecionada:
         1. Envia titulo + descricao do RSS para DeepSeek R1
         2. Recebe JSON: titulo, resumo, conteudo (HTML), tags, seoTitle, seoDescription
         3. Gera slug a partir do titulo
         4. Salva no banco via Drizzle
         5. Status: draft (autoPublish=false) ou published (autoPublish=true)
         6. Delay de 2s entre chamadas (rate limit)
    │
    ▼
Retorna JSON: { processados, duplicatas, publicados, erros }
```

### 2.2 Integracao DeepSeek R1

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
})

const response = await client.chat.completions.create({
  model: 'deepseek-reasoner',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userPrompt }
  ],
})
```

### 2.3 Prompt do Sistema

Tom jornalistico conforme briefing:
- Tecnica do lide no primeiro paragrafo (quem, o que, quando, onde, por que)
- 300-600 palavras
- Paragrafos curtos de 2-3 linhas
- 1-2 intertitulos (H2)
- Factual, objetivo, direto. Sem opiniao, sem linguagem de blog
- Sem em dash (--), sem caracteres especiais
- Sem expressoes como "neste artigo", "confira", "voce sabia"
- Quando envolver compra/venda, mencionar importancia de verificar procedencia
- Resposta em JSON: titulo, resumo, conteudo (HTML), tags, seoTitle, seoDescription
- Nota: categoria NAO e pedida na resposta da IA — ja e conhecida pelo script (processa por categoria)

### 2.4 Filtro de Duplicatas

Camada 1 — URL exata:
```sql
SELECT id FROM noticias WHERE origem_url_original = $url
```

Camada 2 — Similaridade de titulo:
- Normaliza: lowercase, remove acentos e pontuacao
- Extrai palavras
- Compara com titulos dos ultimos 7 dias
- Se >80% das palavras em comum → duplicata
- Implementacao pura TypeScript, sem dependencia externa

### 2.5 Variaveis de Ambiente Novas

```
DEEPSEEK_API_KEY=sk-...
CRON_SECRET=chave-secreta-longa
```

### 2.6 Vercel Cron

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/noticias",
      "schedule": "0 */4 * * *"
    }
  ]
}
```

Executa a cada 4 horas. Volume controlado pelo limiteDiario na noticias_config.

Nota: arquivo `vercel.json` sera criado (nao existe no projeto atualmente).

### 2.7 Timeout e Processamento

Vercel serverless tem limite de timeout (10s hobby, 60s pro). Para evitar estourar:
- Processar UMA categoria por execucao do cron
- Alternar categorias a cada execucao (round-robin ou por parametro)
- Com 4 categorias e cron a cada 4h, cada categoria e processada 1-2x por dia
- Alternativa: cron a cada 1h, processando 1 categoria por vez = cada categoria 6x/dia

Configurar `maxDuration` na route:
```typescript
export const maxDuration = 60 // segundos (requer Vercel Pro)
```

### 2.8 Tratamento de Erros

- Se DeepSeek retornar JSON invalido: pula a noticia, loga o erro
- Se API estiver fora: aborta a execucao, retorna erro no response
- Se slug ja existir (colisao): adiciona sufixo numerico (ex: "titulo-2")
- Erros nao interrompem o processamento das demais noticias da mesma execucao

### 2.9 Timezone

"Hoje" para contagem do limite diario usa timezone America/Sao_Paulo.

### 2.10 Migracao

- Gerar migration via `drizzle-kit generate`
- Executar via `drizzle-kit push` ou `drizzle-kit migrate`
- Seed da noticias_config (4 categorias iniciais) como script separado

---

## 3. Admin

### 3.1 Listagem de Noticias (`/admin/noticias`)

- Tabela: Titulo, Categoria (badge), Status (badge), Data, Acoes
- Filtro por categoria e status
- Botao "Aprovar" rapido (draft → published)
- Botao "Rejeitar" (draft → inactive)
- Indicador de noticias aguardando aprovacao
- Segue padrao visual do /admin/blog existente

### 3.2 Edicao Individual (`/admin/noticias/[id]`)

- Edicao de titulo, resumo, conteudo (Tiptap), categoria, tags, SEO, CTA
- Sem tela de "criar noticia" (sao automaticas)
- Botao aprovar/rejeitar na propria edicao

### 3.3 Configuracoes (`/admin/noticias/configuracoes`)

- Tabela editavel com as categorias da noticias_config
- Toggle ativar/desativar categoria
- Seletor numerico para limite diario
- Toggle auto-publish
- Campo de feed URL editavel
- Botao "Executar agora" (dispara cron manualmente)

---

## 4. Frontend Publico

### 4.1 Listagem `/noticias` (SSR)

- Breadcrumb: Inicio > Noticias
- H1: "Noticias Automotivas"
- Subtitulo: "Informacoes sobre o mercado automotivo brasileiro"
- Tabs de categoria: Todas | Detran | Recalls | Mercado de Usados | Legislacao
- Grid 3 colunas desktop / 1 coluna mobile
- Card: badge categoria, titulo, resumo (2-3 linhas), data, link "Ler mais"
- Paginacao: 12 por pagina
- Sem imagens nesta fase

### 4.2 Noticia Individual `/noticias/[slug]` (SSR)

- Breadcrumb: Inicio > Noticias > [Categoria] > [Titulo]
- Badge de categoria
- H1: Titulo
- Data + tempo estimado de leitura
- Conteudo HTML renderizado
- CTA box: "Vai comprar um veiculo? Consulte a placa antes!" + botao
- Tags
- Noticias relacionadas (mesma categoria, 3 cards)
- CTA final

SEO:
- Meta title: seoTitle ou "[Titulo] | Consulta Placa Brasil"
- Meta description: seoDescription ou campo resumo
- Schema markup: NewsArticle (JSON-LD)
- Open Graph: og:title derivado de seoTitle, og:description de seoDescription, og:type "article"
- Sem campos OG dedicados na tabela — derivados dos campos SEO existentes

### 4.2.1 Slug de categorias nos tabs

Os tabs de categoria na listagem sao links para `/noticias/categoria/[slug]` (nao filtros client-side), garantindo URLs indexaveis pelo Google.

### 4.2.2 publishedAt

- Quando autoPublish=true: `publishedAt` e preenchido na criacao
- Quando autoPublish=false: `publishedAt` e preenchido quando o admin aprova (draft → published)

### 4.3 Categoria `/noticias/categoria/[slug]` (SSR)

- H1: "Noticias sobre [Nome da Categoria]"
- Mesmo grid da listagem, filtrado por categoria
- Paginacao

### 4.4 Diferenca do Blog

- Blog (/blog): CSR, artigos opinativos, guias (futuro)
- Noticias (/noticias): SSR, factuais, automaticas, tom jornalistico

---

## 5. Integracao

### 5.1 Menu

Adicionar "Noticias" no header de navegacao.

### 5.2 Home

Secao "Ultimas Noticias Automotivas":
- 3-4 cards das noticias mais recentes
- Botao "Ver todas as noticias" → /noticias

### 5.3 Sitemap

Adicionar ao sitemap.ts existente:
- /noticias (changeFrequency: daily, priority: 0.8)
- /noticias/[slug] (changeFrequency: weekly, priority: 0.6)
- /noticias/categoria/[slug] (changeFrequency: daily, priority: 0.7)

---

## 6. Dependencias Novas

```
rss-parser        — parse de feeds RSS
openai            — SDK compativel com DeepSeek
slugify           — geracao de slugs
```

---

## 7. Decisoes de Design

| Decisao | Motivo |
|---|---|
| Tabela separada de blog_posts | Blog e noticias sao conceitos diferentes, campos diferentes |
| Categoria como varchar, nao enum | Facilita adicionar categorias sem migration |
| Sem scraping do conteudo original | RSS traz contexto suficiente, evita complexidade com paywalls |
| Sem imagens na fase 1 | Simplifica MVP, adicionar depois |
| Origem apenas URL + flag IA | Minimo necessario para duplicatas, noticias nao citam fonte |
| DeepSeek R1 via SDK OpenAI | Barato (~$0.10-0.20/dia), API compativel, facil trocar modelo |
| Status draft inicial | Aprovacao manual ate confiar no sistema |
| SSR nas paginas de noticias | SEO melhor que CSR, diferente do blog atual |
| noticias_config no banco | Controle total pelo admin sem mexer em codigo |
| OG derivado de campos SEO | Sem colunas extras, og:title = seoTitle, og:description = seoDescription |
| Processar 1 categoria por cron | Evita timeout do serverless, round-robin entre categorias |
| Tabs como links, nao filtros | URLs indexaveis /noticias/categoria/[slug] para SEO |
| Sem soft-delete (deletedAt) | Usa status inactive em vez de deletedAt, diferente do blog — intencional |
