import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts, blogCategories } from "@/lib/db/schema";
import { eq, desc, isNull, sql } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET() {
  try {
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        featuredImage: blogPosts.featuredImage,
        categoryId: blogPosts.categoryId,
        categoryName: blogCategories.name,
        tags: blogPosts.tags,
        author: blogPosts.author,
        status: blogPosts.status,
        seoTitle: blogPosts.seoTitle,
        seoDescription: blogPosts.seoDescription,
        seoCanonical: blogPosts.seoCanonical,
        seoRobots: blogPosts.seoRobots,
        ogTitle: blogPosts.ogTitle,
        ogDescription: blogPosts.ogDescription,
        ogImage: blogPosts.ogImage,
        ogUrl: blogPosts.ogUrl,
        publishedAt: blogPosts.publishedAt,
        viewCount: blogPosts.viewCount,
        deletedAt: blogPosts.deletedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .orderBy(desc(blogPosts.createdAt));

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar posts do blog" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, ...rest } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Titulo e obrigatorio" },
        { status: 400 }
      );
    }

    let slug = slugify(title);

    // Ensure slug uniqueness
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));

    if (existing.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const [created] = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        content: rest.content || "",
        excerpt: rest.excerpt || null,
        featuredImage: rest.featuredImage || null,
        categoryId: rest.categoryId || null,
        tags: rest.tags || null,
        author: rest.author || null,
        status: rest.status || "draft",
        seoTitle: rest.seoTitle || null,
        seoDescription: rest.seoDescription || null,
        seoCanonical: rest.seoCanonical || null,
        seoRobots: rest.seoRobots || "index, follow",
        ogTitle: rest.ogTitle || null,
        ogDescription: rest.ogDescription || null,
        ogImage: rest.ogImage || null,
        ogUrl: rest.ogUrl || null,
        publishedAt: rest.publishedAt ? new Date(rest.publishedAt) : null,
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar post" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID e obrigatorio" },
        { status: 400 }
      );
    }

    // If title changed, regenerate slug
    if (data.title) {
      let slug = slugify(data.title);
      const existing = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug));

      if (existing.length > 0 && existing[0].id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      data.slug = slug;
    }

    // Convert publishedAt string to Date if present
    if (data.publishedAt) {
      data.publishedAt = new Date(data.publishedAt);
    }

    const [updated] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Post nao encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const permanent = searchParams.get("permanent");

    if (!id) {
      return NextResponse.json(
        { error: "ID e obrigatorio" },
        { status: 400 }
      );
    }

    if (permanent === "true") {
      await db.delete(blogPosts).where(eq(blogPosts.id, id));
    } else {
      await db
        .update(blogPosts)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(eq(blogPosts.id, id));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir post" },
      { status: 500 }
    );
  }
}
