import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const testUrl =
    "https://news.google.com/rss/search?q=detran&hl=pt-BR&gl=BR&ceid=BR:pt-419";

  try {
    const response = await fetch(testUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(10000),
    });

    const text = await response.text();
    const itemCount = (text.match(/<item>/g) || []).length;
    const firstTitle = text.match(/<item>[\s\S]*?<title>([\s\S]*?)<\/title>/);

    return NextResponse.json({
      status: response.status,
      contentType: response.headers.get("content-type"),
      xmlLength: text.length,
      itemCount,
      firstTitle: firstTitle?.[1]?.substring(0, 100) || "none",
      xmlPreview: text.substring(0, 500),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}
