import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";

async function getSettings() {
  try {
    const settings = await db.select().from(siteSettings);
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      if (s.value) map[s.key] = s.value;
    });
    return map;
  } catch {
    return {};
  }
}

export async function AnalyticsScripts() {
  const settings = await getSettings();
  const gaId = settings["google_analytics_id"];
  const gscTag = settings["google_search_console"];

  return (
    <>
      {/* Google Search Console Verification */}
      {gscTag && (
        <meta name="google-site-verification" content={gscTag} />
      )}

      {/* Google Analytics — defer loading with async */}
      {gaId && (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <script
            async
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
