"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ArrowRight,
  ChevronRight,
  Search,
  Tag,
  CalendarDays,
  User,
  Loader2,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  author: string | null;
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

function estimateReadTime(excerpt: string | null) {
  const words = (excerpt || "").split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 40)) + " min de leitura";
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [activeCategory, page]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "9" });
      if (activeCategory) params.set("category", activeCategory);
      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setPosts([]);
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

  const filtered = search
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.excerpt || "").toLowerCase().includes(search.toLowerCase())
      )
    : posts;

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
            <span className="text-[#0F172A] font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Dicas, noticias e informacoes sobre o mercado automotivo brasileiro
            e consulta veicular.
          </p>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory
                    ? "bg-[#FF4D30] text-white"
                    : "bg-white text-[#475569] border border-gray-200 hover:border-[#FF4D30] hover:text-[#FF4D30]"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setActiveCategory(cat.slug);
                    setPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-[#FF4D30] text-white"
                      : "bg-white text-[#475569] border border-gray-200 hover:border-[#FF4D30] hover:text-[#FF4D30]"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF4D30]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#475569] text-lg">
                Nenhum artigo encontrado.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#FF4D30]/10 to-[#FF4D30]/5 overflow-hidden">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#FF4D30]/10 flex items-center justify-center">
                            <Tag className="w-7 h-7 text-[#FF4D30]/40" />
                          </div>
                        </div>
                      )}
                      {post.categoryName && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#FF4D30] text-xs font-semibold px-2.5 py-1 rounded-full">
                          {post.categoryName}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-3">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-[#0F172A] leading-tight mb-2 group-hover:text-[#FF4D30] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-[#475569] leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="text-sm text-[#FF4D30] font-medium flex items-center gap-1">
                        Ler artigo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-[#FF4D30] text-white"
                            : "bg-white text-[#475569] border border-gray-200 hover:border-[#FF4D30] hover:text-[#FF4D30]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
