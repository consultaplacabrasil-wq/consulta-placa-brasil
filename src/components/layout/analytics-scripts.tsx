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

// Vai no <head>. Apenas a verificação do Search Console (NÃO usa cookie).
// O Google Analytics foi movido para o <CookieConsent>, que só o carrega
// APÓS o usuário aceitar os cookies de análise (LGPD — consentimento prévio).
export async function AnalyticsScripts() {
  const settings = await getSettings();
  const gscTag = settings["google_search_console"];

  if (!gscTag) return null;

  return <meta name="google-site-verification" content={gscTag} />;
}
