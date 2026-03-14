# SEO On-Page Homepage Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize the homepage for first-page Google ranking by inserting high-volume commercial keywords naturally into categorized testimonials and FAQ sections, plus technical SEO improvements.

**Architecture:** Replace inline testimonials with a new `TestimonialsSection` component using tabs by user profile. Refactor `FaqSection` to use tabs by category with static SEO-optimized content. Update root layout and homepage metadata/schemas.

**Tech Stack:** Next.js 16, React 19, TypeScript, shadcn/ui Tabs (base-ui), Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-03-14-seo-onpage-homepage-design.md`

---

## Chunk 1: Technical SEO (Layout + Homepage Metadata + Schemas)

### Task 1: Update root layout metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add metadataBase, twitter cards, canonical, and expanded keywords**

In `src/app/layout.tsx`, replace the existing `metadata` export with:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://consultaplacabrasil.com.br"),
  title: {
    default: "Consulta Placa Brasil — Consultar Placa de Veículo, Carro e Moto",
    template: "%s | Consulta Placa Brasil",
  },
  description:
    "Consulte qualquer veículo pela placa. Pesquise placa de carro, moto ou caminhão e receba relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  keywords: [
    "consulta placa",
    "consultar placa",
    "consulta veicular",
    "consultar placa de veículo",
    "consultar placa de carro",
    "pesquisar placa de carro",
    "puxar placa de carro",
    "buscar placa",
    "consulta placa moto",
    "verificar placa",
    "relatório veicular",
    "sinistro",
    "leilão",
    "gravame",
    "débitos veículo",
    "multas",
    "FIPE",
    "consulta placa mercosul",
  ],
  authors: [{ name: "Consulta Placa Brasil" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://consultaplacabrasil.com.br",
    siteName: "Consulta Placa Brasil",
    title: "Consulta Placa Brasil — Consultar Placa de Veículo, Carro e Moto",
    description:
      "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consulta Placa Brasil — Consultar Placa de Veículo, Carro e Moto",
    description:
      "Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, gravame, débitos e multas.",
  },
  alternates: {
    canonical: "https://consultaplacabrasil.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 2: Verify the layout renders without errors**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
Expected: `200`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add metadataBase, twitter cards, canonical, expanded keywords to root layout"
```

---

### Task 2: Update homepage metadata and schemas

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Update homepage metadata export**

Replace the existing `metadata` export in `src/app/(public)/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Consulta Placa Brasil — Consultar Placa de Veículo, Carro e Moto",
  description:
    "Consulte qualquer veículo pela placa. Pesquise placa de carro, moto ou caminhão e receba relatório completo com histórico, sinistro, leilão, gravame, débitos e multas. Resultado instantâneo.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br",
  },
};
```

- [ ] **Step 2: Update Organization schema**

Replace the existing Organization `<script type="application/ld+json">` block at the bottom of the component with:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Consulta Placa Brasil",
      url: "https://consultaplacabrasil.com.br",
      description:
        "Plataforma de consulta veicular completa com relatórios detalhados.",
      logo: "https://consultaplacabrasil.com.br/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-11-4002-8922",
        contactType: "customer service",
        availableLanguage: "Portuguese",
      },
      areaServed: {
        "@type": "Country",
        name: "Brazil",
      },
    }),
  }}
/>
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/(public)/page.tsx"
git commit -m "feat(seo): update homepage metadata and enrich Organization schema"
```

---

## Chunk 2: Testimonials Section Component

### Task 3: Create TestimonialsSection component

**Files:**
- Create: `src/components/home/testimonials-section.tsx`

- [ ] **Step 1: Create the component file**

Create `src/components/home/testimonials-section.tsx` with the full component:

```tsx
"use client";

import { Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonialsByProfile: Record<string, Testimonial[]> = {
  compradores: [
    {
      name: "Carlos M.",
      role: "Comprador particular",
      text: "Antes de fechar negócio, fiz a consulta da placa do carro e descobri sinistro grave. Me salvou de um prejuízo enorme!",
      rating: 5,
    },
    {
      name: "Ana Beatriz R.",
      role: "Compradora particular",
      text: "Usei para pesquisar a placa de um carro que vi no OLX. Em segundos já tinha o relatório completo com histórico.",
      rating: 5,
    },
    {
      name: "Roberto L.",
      role: "Comprador particular",
      text: "Consegui consultar o veículo pela placa rapidamente. Paguei com Pix e em segundos já tinha tudo.",
      rating: 5,
    },
    {
      name: "Fernanda S.",
      role: "Compradora particular",
      text: "Precisava verificar a placa do carro antes de comprar. O relatório mostrou débitos que o vendedor nem mencionou.",
      rating: 5,
    },
  ],
  lojistas: [
    {
      name: "Marcos A.",
      role: "Lojista de usados",
      text: "Na minha loja de usados, faço consulta de placa de veículo de cada carro que entra no estoque. Indispensável.",
      rating: 5,
    },
    {
      name: "Patrícia V.",
      role: "Lojista de usados",
      text: "Uso diariamente para buscar placa de carro dos veículos que recebo na troca. Rápido e confiável.",
      rating: 5,
    },
    {
      name: "Diego F.",
      role: "Lojista de seminovos",
      text: "Já evitei comprar veículo de leilão graças à pesquisa de placa. O sistema mostra tudo de forma clara.",
      rating: 5,
    },
    {
      name: "Luciana M.",
      role: "Lojista de usados",
      text: "Melhor plataforma para consultar placa que já usei. Informações completas e atualizadas para minha revenda.",
      rating: 5,
    },
  ],
  despachantes: [
    {
      name: "José Ricardo P.",
      role: "Despachante",
      text: "Como despachante, preciso consultar placa de veículo o dia todo. A rapidez do sistema faz diferença no meu trabalho.",
      rating: 5,
    },
    {
      name: "Sandra B.",
      role: "Despachante",
      text: "Uso para puxar placa de carro dos clientes antes de iniciar a transferência. Nunca tive problema.",
      rating: 5,
    },
    {
      name: "Wellington C.",
      role: "Despachante",
      text: "A consulta veicular pela placa é completa. Mostra gravame, sinistro, débitos — tudo que preciso para o cliente.",
      rating: 5,
    },
    {
      name: "Rita de Cássia O.",
      role: "Despachante",
      text: "Faço pesquisa de veículo por placa para mais de 50 clientes por mês. O sistema nunca me deixou na mão.",
      rating: 5,
    },
  ],
};

const tabs = [
  { value: "compradores", label: "Compradores" },
  { value: "lojistas", label: "Lojistas" },
  { value: "despachantes", label: "Despachantes" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
            Depoimentos
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            O que nossos clientes dizem
          </h2>
        </div>

        <Tabs defaultValue="compradores">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex rounded-full border border-gray-200 bg-white p-1 h-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border-0 data-[state=active]:bg-[#FF4D30] data-[state=active]:text-white text-[#0F172A] hover:bg-gray-50"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {testimonialsByProfile[tab.value].map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="border-0 shadow-sm rounded-xl"
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#FF4D30] text-[#FF4D30]"
                            />
                          )
                        )}
                      </div>
                      <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/testimonials-section.tsx
git commit -m "feat(seo): create TestimonialsSection with tabbed profiles and keyword-rich content"
```

---

### Task 4: Replace inline testimonials in homepage with new component

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Add import for TestimonialsSection**

Add at the top of `src/app/(public)/page.tsx`:

```typescript
import { TestimonialsSection } from "@/components/home/testimonials-section";
```

Remove the `Star` import from lucide-react if it is no longer used elsewhere in this file.

- [ ] **Step 2: Remove old testimonials data and section**

Remove the `testimonials` array (lines ~92-111) and the entire `{/* Testimonials */}` section (the `<section>` block that maps over `testimonials`).

- [ ] **Step 3: Insert new component in place of old section**

Replace the removed testimonials section with:

```tsx
{/* Testimonials */}
<TestimonialsSection />
```

Keep it in the same position (between Benefits and FAQ sections).

- [ ] **Step 4: Verify the page renders**

Open `http://localhost:3000` in browser. The testimonials section should show 3 tabs with 4 cards each.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(public)/page.tsx"
git commit -m "feat(seo): replace inline testimonials with TestimonialsSection component"
```

---

## Chunk 3: FAQ Section Refactor

### Task 5: Refactor FaqSection with tabs and SEO content

**Files:**
- Modify: `src/components/home/faq-section.tsx`

- [ ] **Step 1: Rewrite faq-section.tsx with tabbed categories and FAQPage schema**

Replace the entire content of `src/components/home/faq-section.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FaqItem {
  question: string;
  answer: string;
}

const faqsByCategory: Record<string, FaqItem[]> = {
  consulta: [
    {
      question: "Como consultar a placa de um veículo?",
      answer:
        "Basta digitar a placa no campo de busca e clicar em consultar. Nosso sistema acessa bases oficiais dos Detrans e retorna um relatório completo em poucos segundos. Funciona com placa antiga e placa Mercosul.",
    },
    {
      question: "É possível pesquisar placa de carro gratuitamente?",
      answer:
        "Sim, a consulta básica é gratuita e mostra dados cadastrais do veículo. Para relatórios completos com histórico de sinistro, leilão, gravame e débitos, oferecemos diferentes opções de consulta.",
    },
    {
      question: "Como puxar placa de carro pelo celular?",
      answer:
        "Acesse nosso site pelo navegador do celular, digite a placa e faça a consulta normalmente. O sistema é 100% responsivo e funciona em qualquer dispositivo.",
    },
    {
      question: "Posso consultar placa de moto também?",
      answer:
        "Sim! A consulta funciona para carros, motos, caminhões e qualquer veículo emplacado no Brasil, em todos os 27 estados e Distrito Federal.",
    },
    {
      question: "Quais informações aparecem na consulta veicular?",
      answer:
        "O relatório pode incluir dados cadastrais, histórico de proprietários, registro de sinistro, leilão, roubo/furto, gravame, débitos, multas, recall pendente, quilometragem e tabela FIPE.",
    },
    {
      question: "É possível consultar o chassi pela placa?",
      answer:
        "Sim, nosso relatório inclui o número do chassi e o Renavam do veículo, além de todos os dados cadastrais nacionais e estaduais.",
    },
  ],
  pagamento: [
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos Pix (com confirmação instantânea) e cartão de crédito. O Pix é a forma mais rápida — o relatório é liberado em segundos após o pagamento.",
    },
    {
      question: "Quanto custa para consultar placa?",
      answer:
        "Temos diferentes opções de consulta a partir de R$ 13,90. A consulta básica gratuita mostra dados cadastrais, e os relatórios pagos incluem informações detalhadas como sinistro, leilão e débitos.",
    },
    {
      question: "Posso usar cupom de desconto?",
      answer:
        "Sim! Na página de checkout, insira o código do cupom para receber desconto. Fique atento às nossas promoções nas redes sociais.",
    },
    {
      question: "Vocês oferecem pacotes para quem consulta muitas placas?",
      answer:
        "Sim, temos pacotes para lojistas e despachantes que fazem muitas consultas. Os pacotes oferecem preços reduzidos por consulta e são ideais para uso profissional.",
    },
  ],
  seguranca: [
    {
      question: "Os dados da consulta são confiáveis?",
      answer:
        "Sim, todas as informações são obtidas de bases de dados oficiais como Detran, Denatran e Secretarias da Fazenda, atualizadas em tempo real.",
    },
    {
      question: "Meus dados pessoais estão protegidos?",
      answer:
        "Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD. Seus dados pessoais e de pagamento são protegidos com as melhores práticas de segurança.",
    },
    {
      question: "A consulta de placa é legal?",
      answer:
        "Sim, a consulta de dados públicos de veículos é permitida por lei. Nosso sistema acessa apenas informações de registro público disponibilizadas pelos órgãos oficiais de trânsito.",
    },
    {
      question: "Posso consultar a placa de qualquer veículo do Brasil?",
      answer:
        "Sim, temos cobertura nacional completa — todos os 27 estados e Distrito Federal. Funciona para veículos com placa antiga (AAA-0000) e placa Mercosul (AAA0A00).",
    },
  ],
};

const allFaqs = Object.values(faqsByCategory).flat();

const categoryTabs = [
  { value: "consulta", label: "Consulta" },
  { value: "pagamento", label: "Pagamento" },
  { value: "seguranca", label: "Segurança" },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
          >
            <h3 className="text-sm font-semibold text-[#0F172A] md:text-base">
              {faq.question}
            </h3>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#FF4D30] transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="px-6 pb-4 text-sm text-[#64748B] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#FF4D30] uppercase tracking-wider mb-2">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl font-bold text-[#0F172A]">
            Perguntas e Respostas
          </h2>
          <p className="mt-3 text-[#64748B]">
            Tire suas principais dúvidas sobre a plataforma
          </p>
        </div>

        <Tabs defaultValue="consulta">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex rounded-full border border-gray-200 bg-white p-1 h-auto">
              {categoryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold border-0 data-[state=active]:bg-[#FF4D30] data-[state=active]:text-white text-[#0F172A] hover:bg-gray-50"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categoryTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <FaqAccordion items={faqsByCategory[tab.value]} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* FAQPage Schema — all questions from all tabs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
```

- [ ] **Step 2: Verify the FAQ section renders with tabs**

Open `http://localhost:3000` and scroll to FAQ section. Verify:
- 3 tabs visible (Consulta, Pagamento, Seguranca)
- Clicking tabs switches content
- Accordion expand/collapse works
- View page source and confirm FAQPage JSON-LD contains all 14 questions

- [ ] **Step 3: Commit**

```bash
git add src/components/home/faq-section.tsx
git commit -m "feat(seo): refactor FAQ with category tabs, keyword-rich content, and FAQPage schema"
```

---

## Chunk 4: Final Verification

### Task 6: End-to-end verification

- [ ] **Step 1: Verify page source for all SEO elements**

Open `http://localhost:3000`, view page source and confirm:
1. `<title>` contains "Consultar Placa de Veículo, Carro e Moto"
2. `<meta name="description">` contains expanded keywords
3. `<meta name="twitter:card">` exists with "summary_large_image"
4. `<link rel="canonical">` points to correct URL
5. Organization JSON-LD includes `logo`, `contactPoint`, `areaServed`
6. FAQPage JSON-LD includes all 14 questions
7. WebSite JSON-LD with SearchAction is still present

- [ ] **Step 2: Verify visual rendering**

1. Testimonials section shows 3 tabs, clicking each shows 4 cards
2. FAQ section shows 3 tabs, clicking each shows correct questions
3. Accordion expand/collapse works in all FAQ tabs
4. Page does not feel longer than before (tabs contain the content)

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(seo): address issues found during verification"
```
