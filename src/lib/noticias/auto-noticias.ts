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
