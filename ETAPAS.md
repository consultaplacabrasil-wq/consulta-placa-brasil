# ETAPAS DO PROJETO — Consulta Placa Brasil

## ETAPA 1 — VALIDAÇÃO DE PLACAS ✅
- [x] Criar utilitário de validação (antiga AAA0000/AAA-0000 + Mercosul AAA0A00)
- [x] Validação em tempo real em todos os campos de consulta
- [x] Mensagem: "Placa inválida. Verifique o formato informado."
- [x] Bloquear envio se inválida

## ETAPA 2 — MODIFICAÇÕES NA PÁGINA INICIAL ✅
- [x] Hero: manter campo de consulta com validação
- [x] Consultas: seção dinâmica via painel admin (nome, preço, descrição, benefícios)
- [x] Pacotes: gerenciamento dinâmico (nome, valor, descrição)
- [x] Dados vindos do PostgreSQL (Neon) via API

## ETAPA 3 — REMOVER PLANOS E PREÇOS ✅
- [x] Remover seção de Planos e Preços / Tipos de Relatório da home
- [x] Remover links de relatórios do footer
- [x] Manter REPORT_PRICES apenas para comprar/[placa]

## ETAPA 4 — SISTEMA DE BLOG ✅
- [x] Artigos: título, resumo, conteúdo, status, data, categoria, imagem destaque
- [x] Status: publicado, rascunho, inativo
- [x] Categorias: nome, slug, descrição
- [x] Admin: listagem com ações (visualizar, editar, lixeira, excluir, alterar status)
- [x] API: /api/admin/blog (CRUD) + /api/admin/blog/categories (CRUD)

## ETAPA 5 — SEO AVANÇADO PARA ARTIGOS ✅
- [x] Aba SEO: meta title, meta description, URL canônica, diretivas robôs
- [x] Aba Open Graph: og:title, og:description, og:image, og:url
- [x] Aba Schema: gerar Article schema automaticamente
- [x] Aba Preview: Google, Facebook, X (Twitter)

## ETAPA 6 — SISTEMA FAQ ✅
- [x] FAQ gerenciado pelo admin (pergunta, resposta, ordem)
- [x] SEO: meta title, meta description, canonical, diretivas (tabela faq_page_seo)
- [x] FAQPage Schema automático na página pública
- [x] Admin: CRUD + SEO + OG + Schema + Preview

## ETAPA 7 — REMOVER PÁGINAS ANTIGAS ✅
- [x] Remover: relatório básico, relatório completo, relatório premium (/relatorios/[tipo])

## ETAPA 8 — CRIAR PÁGINAS INSTITUCIONAIS ✅
- [x] Política de Privacidade (editável via admin, tabela pages)
- [x] Termos de Uso (editável via admin)
- [x] Política de Cookies (nova página criada)

## ETAPA 9 — PÁGINA SOBRE ✅
- [x] Página Sobre gerenciável pelo admin
- [x] Conteúdo dinâmico com fallback para conteúdo estático
- [x] SEO + Open Graph + Schema

## ETAPA 10 — SEO PARA PÁGINAS INSTITUCIONAIS ✅
- [x] SEO completo: Sobre, Privacidade, Termos, Cookies
- [x] generateMetadata com dados do banco
- [x] Schema WebPage/AboutPage automático
- [x] Open Graph dinâmico

## ETAPA 11 — CONFIGURAÇÕES DO SITE ✅
- [x] Info: nome, descrição, sobre
- [x] Identidade visual: logo, favicon (jpg/png/webp, max 5MB)
- [x] Redes sociais: Instagram, Facebook, X
- [x] Integrações: Google Search Console, Google Analytics (auto-injetados)
- [x] Componente AnalyticsScripts no root layout

## ETAPA 12 — SISTEMA DE USUÁRIOS ✅
- [x] Gerenciamento: nome, email, senha (min 8 chars)
- [x] Tipos: Administrador (acesso total), Editor (acesso limitado)
- [x] API: /api/admin/users (CRUD com bcrypt)

## ETAPA 13 — CUPONS DE DESCONTO ✅
- [x] Criar sistema de cupons (nome, código, porcentagem)
- [x] API validação: /api/coupon/validate
- [x] Admin: CRUD de cupons com stats
- [x] Tabela coupons no banco

## ETAPA 14 — SITEMAP AUTOMÁTICO ✅
- [x] /sitemap.xml com páginas estáticas + artigos do blog + categorias + páginas dinâmicas
- [x] Admin: SEO → Sitemap (visualizar URLs, regenerar)

## ETAPA 15 — ROBOTS.TXT ✅
- [x] /robots.txt automático via Next.js MetadataRoute
- [x] Allow: / + Disallow para áreas privadas
- [x] Sitemap referenciado

## ETAPA 16 — ARQUIVO .HTACCESS ✅
- [x] URL amigável (rewrite)
- [x] Redirecionamento HTTPS
- [x] Compressão GZIP
- [x] Cache de arquivos estáticos
- [x] Proteções de segurança (X-Frame, XSS, MIME)
- [x] Bloqueio de arquivos sensíveis

## ETAPA 17 — REMOÇÃO DO SISTEMA DE CRÉDITOS ✅
- [x] Remover tabelas credits e transactions do schema
- [x] Remover página /creditos do dashboard
- [x] Remover link de créditos do sidebar
- [x] Remover referências no painel do usuário
- [x] Remover CREDIT_PACKAGES dos constants
- [x] Remover "credits" do paymentMethodEnum

---

## REQUISITOS FINAIS
- [x] Arquitetura escalável (Next.js 16 + Drizzle ORM + Neon)
- [x] SEO técnico completo (metadata, schema, OG por página)
- [x] Sitemap automático (dinâmico, inclui blog + categorias + páginas)
- [x] Robots.txt automático
- [x] Performance otimizada (.htaccess com GZIP, cache)
- [x] Código limpo (TypeScript, componentizado)
- [x] Painel administrativo seguro
- [x] Banco de dados estruturado (Drizzle ORM + PostgreSQL/Neon)
- [x] URLs amigáveis
