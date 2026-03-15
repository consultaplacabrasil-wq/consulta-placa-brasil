import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
  timeout: 10000,
});

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
