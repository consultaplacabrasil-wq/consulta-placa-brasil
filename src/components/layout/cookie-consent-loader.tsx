import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { CookieConsent } from "./cookie-consent";

// Server component: lê o ID do Google Analytics no banco e passa ao banner
// (client), que só carrega o GA após o consentimento de cookies de análise.
async function getGaId(): Promise<string | undefined> {
  try {
    const settings = await db.select().from(siteSettings);
    const row = settings.find((s) => s.key === "google_analytics_id");
    return row?.value || undefined;
  } catch {
    return undefined;
  }
}

export async function CookieConsentLoader() {
  const gaId = await getGaId();
  return <CookieConsent gaId={gaId} />;
}
