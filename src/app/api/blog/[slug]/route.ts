import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts, blogCategories } from "@/lib/db/schema";
import { eq, and, isNull, desc, ne, sql } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [post] = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        featuredImage: blogPosts.featuredImage,
        categoryId: blogPosts.categoryId,
        categoryName: blogCategories.name,
        categorySlug: blogCategories.slug,
        tags: blogPosts.tags,
        author: blogPosts.author,
        seoTitle: blogPosts.seoTitle,
        seoDescription: blogPosts.seoDescription,
        ogTitle: blogPosts.ogTitle,
        ogDescription: blogPosts.ogDescription,
        ogImage: blogPosts.ogImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(
        and(
          eq(blogPosts.slug, slug),
          eq(blogPosts.status, "published"),
          isNull(blogPosts.deletedAt)
        )
      );

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    // Increment view count
    await db
      .update(blogPosts)
      .set({ viewCount: sql`${blogPosts.viewCount} + 1` })
      .where(eq(blogPosts.id, post.id));

    // Fetch related posts (same category or recent)
    const relatedConditions = [
      eq(blogPosts.status, "published"),
      isNull(blogPosts.deletedAt),
      ne(blogPosts.id, post.id),
    ];

    const related = await db
      .select({
        title: blogPosts.title,
        slug: blogPosts.slug,
        featuredImage: blogPosts.featuredImage,
        excerpt: blogPosts.excerpt,
        categoryName: blogCategories.name,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(and(...relatedConditions))
      .orderBy(
        post.categoryId
          ? sql`CASE WHEN ${blogPosts.categoryId} = ${post.categoryId} THEN 0 ELSE 1 END`
          : desc(blogPosts.publishedAt),
        desc(blogPosts.publishedAt)
      )
      .limit(5);

    return NextResponse.json({ post, related });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar post" },
      { status: 500 }
    );
  }
}
