# SEO On-Page Homepage — Design Spec

## Objetivo

Otimizar a homepage do Consulta Placa Brasil para posicionamento na primeira pagina do Google, cobrindo keywords comerciais/transacionais de alto volume do principal concorrente (olhonocarro.com.br).

## Estrategia

- **Homepage = intencao comercial/transacional** (keywords de quem quer consultar agora)
- **Blog = intencao informacional** (tratado separadamente, fora deste escopo)
- Keywords inseridas naturalmente via depoimentos categorizados por perfil de usuario e FAQ categorizado por tema

---

## 1. Depoimentos com Tabs por Perfil

### Estrutura

- 3 tabs: **Compradores** | **Lojistas** | **Despachantes**
- Tab "Compradores" ativo por padrao
- Sem botao "Todos"
- 4 cards por tab
- Rating de 5 estrelas em cada card (mantido do design atual)

### Conteudo

#### Tab: Compradores

| Nome | Role | Texto | Keywords |
|---|---|---|---|
| Carlos M. | Comprador particular | "Antes de fechar negocio, fiz a consulta da placa do carro e descobri sinistro grave. Me salvou de um prejuizo enorme!" | consulta da placa do carro (5.4K) |
| Ana Beatriz R. | Compradora particular | "Usei para pesquisar a placa de um carro que vi no OLX. Em segundos ja tinha o relatorio completo com historico." | pesquisar placa de carro (14.8K) |
| Roberto L. | Comprador particular | "Consegui consultar o veiculo pela placa rapidamente. Paguei com Pix e em segundos ja tinha tudo." | consultar veiculo pela placa (6.6K) |
| Fernanda S. | Compradora particular | "Precisava verificar a placa do carro antes de comprar. O relatorio mostrou debitos que o vendedor nem mencionou." | verificar placa de carro (1.6K) |

#### Tab: Lojistas

| Nome | Role | Texto | Keywords |
|---|---|---|---|
| Marcos A. | Lojista de usados | "Na minha loja de usados, faco consulta de placa de veiculo de cada carro que entra no estoque. Indispensavel." | consulta de placa de veiculo (2.9K) |
| Patricia V. | Lojista de usados | "Uso diariamente para buscar placa de carro dos veiculos que recebo na troca. Rapido e confiavel." | buscar placa de carro (5.4K) |
| Diego F. | Lojista de seminovos | "Ja evitei comprar veiculo de leilao gracas a pesquisa de placa. O sistema mostra tudo de forma clara." | pesquisa de placa (5.4K) |
| Luciana M. | Lojista de usados | "Melhor plataforma para consultar placa que ja usei. Informacoes completas e atualizadas para minha revenda." | consultar placa (90.5K) |

#### Tab: Despachantes

| Nome | Role | Texto | Keywords |
|---|---|---|---|
| Jose Ricardo P. | Despachante | "Como despachante, preciso consultar placa de veiculo o dia todo. A rapidez do sistema faz diferenca no meu trabalho." | consultar placa de veiculo (18.1K) |
| Sandra B. | Despachante | "Uso para puxar placa de carro dos clientes antes de iniciar a transferencia. Nunca tive problema." | puxar placa de carro (22.2K) |
| Wellington C. | Despachante | "A consulta veicular pela placa e completa. Mostra gravame, sinistro, debitos — tudo que preciso para o cliente." | consulta veicular pela placa |
| Rita de Cassia O. | Despachante | "Faco pesquisa de veiculo por placa para mais de 50 clientes por mes. O sistema nunca me deixou na mao." | pesquisa de veiculo por placa |

---

## 2. FAQ com Tabs por Categoria

### Estrutura

- 3 tabs: **Consulta** | **Pagamento** | **Seguranca**
- Tab "Consulta" ativo por padrao
- Sem botao "Todos"
- Accordion (expand/collapse) dentro de cada tab
- FAQPage schema JSON-LD inclui TODAS as perguntas de TODAS as tabs

### Conteudo

#### Tab: Consulta (6 perguntas)

1. **Como consultar a placa de um veiculo?**
   Basta digitar a placa no campo de busca e clicar em consultar. Nosso sistema acessa bases oficiais dos Detrans e retorna um relatorio completo em poucos segundos. Funciona com placa antiga e placa Mercosul.
   *Keywords: consultar placa de veiculo (18.1K), consulta placa mercosul (2.4K)*

2. **E possivel pesquisar placa de carro gratuitamente?**
   Sim, a consulta basica e gratuita e mostra dados cadastrais do veiculo. Para relatorios completos com historico de sinistro, leilao, gravame e debitos, oferecemos diferentes opcoes de consulta.
   *Keywords: pesquisar placa de carro (14.8K), consultar veiculo pela placa gratis (27.1K)*

3. **Como puxar placa de carro pelo celular?**
   Acesse nosso site pelo navegador do celular, digite a placa e faca a consulta normalmente. O sistema e 100% responsivo e funciona em qualquer dispositivo.
   *Keywords: puxar placa de carro (22.2K)*

4. **Posso consultar placa de moto tambem?**
   Sim! A consulta funciona para carros, motos, caminhoes e qualquer veiculo emplacado no Brasil, em todos os 27 estados e Distrito Federal.
   *Keywords: consulta placa moto (1.6K), placa de moto (9.9K)*

5. **Quais informacoes aparecem na consulta veicular?**
   O relatorio pode incluir dados cadastrais, historico de proprietarios, registro de sinistro, leilao, roubo/furto, gravame, debitos, multas, recall pendente, quilometragem e tabela FIPE.
   *Keywords: consulta veicular, consulta situacao placa veiculo (8.1K), placa fipe (135K)*

6. **E possivel consultar o chassi pela placa?**
   Sim, nosso relatorio inclui o numero do chassi e o Renavam do veiculo, alem de todos os dados cadastrais nacionais e estaduais.
   *Keywords: consulta chassi por placa (720), renavam placa consulta (8.1K)*

#### Tab: Pagamento (4 perguntas)

1. **Quais formas de pagamento sao aceitas?**
   Aceitamos Pix (com confirmacao instantanea) e cartao de credito. O Pix e a forma mais rapida — o relatorio e liberado em segundos apos o pagamento.

2. **Quanto custa para consultar placa?**
   Temos diferentes opcoes de consulta a partir de R$ 13,90. A consulta basica gratuita mostra dados cadastrais, e os relatorios pagos incluem informacoes detalhadas como sinistro, leilao e debitos.
   *Keywords: consulta placa (135K — intencao transacional)*

3. **Posso usar cupom de desconto?**
   Sim! Na pagina de checkout, insira o codigo do cupom para receber desconto. Fique atento as nossas promocoes nas redes sociais.

4. **Voces oferecem pacotes para quem consulta muitas placas?**
   Sim, temos pacotes para lojistas e despachantes que fazem muitas consultas. Os pacotes oferecem precos reduzidos por consulta e sao ideais para uso profissional.

#### Tab: Seguranca (4 perguntas)

1. **Os dados da consulta sao confiaveis?**
   Sim, todas as informacoes sao obtidas de bases de dados oficiais como Detran, Denatran e Secretarias da Fazenda, atualizadas em tempo real.

2. **Meus dados pessoais estao protegidos?**
   Utilizamos criptografia de ponta a ponta e estamos em total conformidade com a LGPD. Seus dados pessoais e de pagamento sao protegidos com as melhores praticas de seguranca.

3. **A consulta de placa e legal?**
   Sim, a consulta de dados publicos de veiculos e permitida por lei. Nosso sistema acessa apenas informacoes de registro publico disponibilizadas pelos orgaos oficiais de transito.
   *Keywords: consulta de placa (14.8K)*

4. **Posso consultar a placa de qualquer veiculo do Brasil?**
   Sim, temos cobertura nacional completa — todos os 27 estados e Distrito Federal. Funciona para veiculos com placa antiga (AAA-0000) e placa Mercosul (AAA0A00).
   *Keywords: buscar placa (18.1K), busca placa (49.5K)*

---

## 3. Otimizacoes Tecnicas SEO

### 3.1 Root Layout — metadataBase + Twitter Cards

Adicionar ao `src/app/layout.tsx`:

```typescript
metadataBase: new URL("https://consultaplacabrasil.com.br"),
twitter: {
  card: "summary_large_image",
  title: "Consulta Placa Brasil — Consultar Placa de Veiculo, Carro e Moto",
  description: "Consulte qualquer veiculo pela placa. Relatorio completo com historico, sinistro, leilao, gravame, debitos e multas.",
},
alternates: {
  canonical: "https://consultaplacabrasil.com.br",
},
```

### 3.2 Home Metadata — Keywords expandidas

```typescript
title: "Consulta Placa Brasil — Consultar Placa de Veiculo, Carro e Moto",
description: "Consulte qualquer veiculo pela placa. Pesquise placa de carro, moto ou caminhao e receba relatorio completo com historico, sinistro, leilao, gravame, debitos e multas. Resultado instantaneo.",
```

Keywords cobertas no title+description: consulta placa (135K), consultar placa de veiculo (18.1K), consultar placa de carro (18.1K), consulta placa moto (1.6K), pesquisar placa de carro (14.8K)

### 3.3 Schema Organization — Enriquecido

Adicionar ao schema Organization na home:

```json
{
  "@type": "Organization",
  "name": "Consulta Placa Brasil",
  "url": "https://consultaplacabrasil.com.br",
  "description": "Plataforma de consulta veicular completa com relatorios detalhados.",
  "logo": "https://consultaplacabrasil.com.br/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-4002-8922",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  }
}
```

### 3.4 FAQPage Schema — Todas as tabs

JSON-LD com todas as 14 perguntas, renderizado independente da tab ativa. O Google indexa o schema completo.

### 3.5 Canonical URL na Home

Adicionar `alternates.canonical` no metadata da homepage.

---

## Arquivos Afetados

1. `src/app/layout.tsx` — metadataBase, twitter cards, canonical
2. `src/app/(public)/page.tsx` — metadata, testimonials, schemas
3. `src/components/home/faq-section.tsx` — tabs + novo conteudo + FAQPage schema
4. Nenhum arquivo novo necessario

## Fora de Escopo

- Blog e conteudo informacional
- Paginas internas (sobre, contato, etc.)
- Backlinks e SEO off-page
- Conversao da pagina blog/[slug] para Server Component
