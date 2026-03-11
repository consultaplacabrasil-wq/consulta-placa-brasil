import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogCategories, blogPosts } from "@/lib/db/schema";
import { eq, and, isNull, sql } from "drizzle-orm";

export async function GET() {
  try {
    const categories = await db
      .select({
        name: blogCategories.name,
        slug: blogCategories.slug,
        count: sql<number>`count(${blogPosts.id})`,
      })
      .from(blogCategories)
      .leftJoin(
        blogPosts,
        and(
          eq(blogPosts.categoryId, blogCategories.id),
          eq(blogPosts.status, "published"),
          isNull(blogPosts.deletedAt)
        )
      )
      .groupBy(blogCategories.id, blogCategories.name, blogCategories.slug)
      .having(sql`count(${blogPosts.id}) > 0`);

    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}
