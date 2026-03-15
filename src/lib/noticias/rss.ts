export interface NoticiaRSS {
  titulo: string;
  link: string;
  descricao: string;
  data: string;
}

function extractTag(xml: string, tag: string): string {
  // Match <tag>content</tag> or <tag><![CDATA[content]]></tag>
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`,
    "i"
  );
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function parseItems(xml: string): NoticiaRSS[] {
  const items: NoticiaRSS[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const titulo = extractTag(itemXml, "title")
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    const link = extractTag(itemXml, "link");
    const descricao = extractTag(itemXml, "description")
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    const data = extractTag(itemXml, "pubDate");

    if (titulo && link) {
      items.push({
        titulo,
        link,
        descricao,
        data: data || new Date().toISOString(),
      });
    }
  }

  return items;
}

export async function buscarNoticiasRSS(
  feedUrl: string
): Promise<NoticiaRSS[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`RSS feed retornou status ${response.status}: ${feedUrl}`);
      return [];
    }

    const xml = await response.text();
    const items = parseItems(xml);
    console.log(`RSS feed ${feedUrl.substring(0, 60)}... status=${response.status} items=${items.length} xmlLength=${xml.length}`);
    return items;
  } catch (error) {
    console.error(`Erro ao buscar feed RSS: ${feedUrl}`, error);
    return [];
  }
}
