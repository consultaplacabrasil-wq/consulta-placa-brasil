import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getPageBySlug(slug: string) {
  try {
    const [page] = await db
      .select()
      .from(pages)
      .where(eq(pages.slug, slug))
      .limit(1);
    return page || null;
  } catch {
    return null;
  }
}
