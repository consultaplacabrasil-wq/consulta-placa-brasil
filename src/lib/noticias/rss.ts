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
