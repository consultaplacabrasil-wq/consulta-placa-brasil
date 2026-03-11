"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  CalendarDays,
  User,
  Clock,
  ArrowLeft,
  FileX,
  Loader2,
  Tag,
  Share2,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  tags: string[] | null;
  author: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface RelatedPost {
  title: string;
  slug: string;
  featuredImage: string | null;
  excerpt: string | null;
  categoryName: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(content: string) {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : "";

  const shareLinks = [
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20BD5A]",
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "X",
      color: "bg-[#0F1419] hover:bg-[#000]",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#095DAF]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Copiar link",
      color: "bg-[#475569] hover:bg-[#334155]",
      href: "#",
      icon: <Share2 className="w-4 h-4" />,
      onClick: () => {
        navigator.clipboard.writeText(url);
        alert("Link copiado!");
      },
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {shareLinks.map((link) =>
        link.onClick ? (
          <button
            key={link.name}
            onClick={link.onClick}
            className={`${link.color} text-white p-2.5 rounded-lg transition-colors`}
            title={link.name}
          >
            {link.icon}
          </button>
        ) : (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-2.5 rounded-lg transition-colors`}
            title={link.name}
          >
            {link.icon}
          </a>
        )
      )}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setPost(data.post);
        setRelated(data.related || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch("/api/blog/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch {
        setCategories([]);
      }
    }

    fetchPost();
    fetchCategories();
  }, [slug]);

  // Update document title
  useEffect(() => {
    if (post) {
      document.title = `${post.seoTitle || post.title} | Consulta Placa Brasil`;
    }
  }, [post]);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FF4D30]/10 mb-8">
                <FileX className="w-10 h-10 text-[#FF4D30]" />
              </div>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
                Post nao encontrado
              </h1>
              <p className="text-[#475569] mb-8 max-w-md mx-auto leading-relaxed">
                O artigo que voce esta procurando nao foi publicado ou nao
                existe.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#FF4D30] text-white font-medium hover:bg-[#E8432A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <nav className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
            <Link href="/" className="hover:text-[#FF4D30] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/blog"
              className="hover:text-[#FF4D30] transition-colors"
            >
              Blog
            </Link>
            {post.categoryName && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link
                  href={`/blog?category=${post.categorySlug}`}
                  className="hover:text-[#FF4D30] transition-colors"
                >
                  {post.categoryName}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F172A] font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full bg-[#0F172A]">
          <div className="container mx-auto max-w-6xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
              {/* Category badge */}
              {post.categoryName && (
                <Link
                  href={`/blog?category=${post.categorySlug}`}
                  className="inline-block bg-[#FF4D30]/10 text-[#FF4D30] text-xs font-semibold px-3 py-1 rounded-full mb-4 hover:bg-[#FF4D30]/20 transition-colors"
                >
                  {post.categoryName}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-5">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8] mb-8 pb-8 border-b border-gray-100">
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime} min de leitura
                </span>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-[#0F172A] prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-[#475569] prose-p:leading-relaxed
                  prose-a:text-[#FF4D30] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#0F172A]
                  prose-img:rounded-xl prose-img:shadow-sm
                  prose-blockquote:border-[#FF4D30] prose-blockquote:bg-[#FFF5F3] prose-blockquote:rounded-r-lg prose-blockquote:py-1
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-[#0F172A] prose-pre:rounded-xl
                  prose-li:text-[#475569]
                  prose-hr:border-gray-200"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-[#94A3B8]" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-[#475569] text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm font-semibold text-[#0F172A] mb-3">
                  Compartilhar este artigo
                </p>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>

            {/* Back link */}
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#FF4D30] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 space-y-6">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">
                  Categorias
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/blog?category=${cat.slug}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          post.categorySlug === cat.slug
                            ? "bg-[#FF4D30]/10 text-[#FF4D30] font-medium"
                            : "text-[#475569] hover:bg-gray-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs bg-gray-100 text-[#94A3B8] px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">
                  Outros artigos
                </h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#FF4D30]/10 to-[#FF4D30]/5">
                        {r.featuredImage ? (
                          <img
                            src={r.featuredImage}
                            alt={r.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Tag className="w-5 h-5 text-[#FF4D30]/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#0F172A] leading-tight line-clamp-2 group-hover:text-[#FF4D30] transition-colors">
                          {r.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] mt-1">
                          {formatDate(r.publishedAt || r.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share - Sidebar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">
                Compartilhar
              </h3>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
