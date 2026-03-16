import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const contentType = "image/png";
export const size = { width: 32, height: 32 };

export default async function Icon() {
  // Try to get favicon URL from settings
  let faviconUrl: string | null = null;
  try {
    const [setting] = await db
      .select({ value: siteSettings.value })
      .from(siteSettings)
      .where(eq(siteSettings.key, "favicon_url"))
      .limit(1);
    faviconUrl = setting?.value || null;
  } catch {
    // DB not available
  }

  if (faviconUrl) {
    // Redirect to the uploaded favicon
    const res = await fetch(faviconUrl);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      return new Response(Buffer.from(buffer), {
        headers: {
          "Content-Type": res.headers.get("content-type") || "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  }

  // Default: generate a simple favicon with "CP" text
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FF4D30",
          borderRadius: "6px",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        CP
      </div>
    ),
    { ...size }
  );
}
