"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  BarChart3,
  Search,
  MoreVertical,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  categoryId: string | null;
  categoryName: string | null;
  status: "published" | "draft" | "inactive";
  viewCount: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

type StatusFilter = "all" | "published" | "draft" | "inactive";

const statusConfig: Record<
  string,
  { label: string; bgClass: string; textClass: string; icon: typeof CheckCircle }
> = {
  published: {
    label: "Publicado",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
    icon: CheckCircle,
  },
  draft: {
    label: "Rascunho",
    bgClass: "bg-gray-100",
    textClass: "text-gray-600",
    icon: FileText,
  },
  inactive: {
    label: "Inativo",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    icon: XCircle,
  },
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    permanent: boolean;
    title: string;
  } | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      console.error("Erro ao buscar posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, [openMenuId]);

  const activePosts = posts.filter((p) => !p.deletedAt);

  const filteredPosts = activePosts.filter((post) => {
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.categoryName || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    published: activePosts.filter((p) => p.status === "published").length,
    drafts: activePosts.filter((p) => p.status === "draft").length,
    inactive: activePosts.filter((p) => p.status === "inactive").length,
    totalViews: activePosts.reduce((sum, p) => sum + (p.viewCount || 0), 0),
  };

  async function handleDelete(id: string, permanent: boolean) {
    try {
      const url = permanent
        ? `/api/admin/blog?id=${id}&permanent=true`
        : `/api/admin/blog?id=${id}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        await fetchPosts();
      }
    } catch {
      console.error("Erro ao excluir post");
    }
    setDeleteConfirm(null);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchPosts();
      }
    } catch {
      console.error("Erro ao alterar status");
    }
    setOpenMenuId(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Blog</h1>
          <p className="text-sm text-[#64748B]">
            Gerencie os artigos do blog
          </p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A]"
        >
          <Plus className="h-4 w-4" />
          Novo Artigo
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.published}
              </p>
              <p className="text-xs text-[#94A3B8]">Publicados</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.drafts}
              </p>
              <p className="text-xs text-[#94A3B8]">Rascunhos</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.inactive}
              </p>
              <p className="text-xs text-[#94A3B8]">Inativos</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.totalViews.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs text-[#94A3B8]">Visualizacoes totais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "published", label: "Publicados" },
              { key: "draft", label: "Rascunhos" },
              { key: "inactive", label: "Inativos" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === key
                  ? "bg-[#FF4D30] text-white"
                  : "bg-gray-100 text-[#475569] hover:bg-gray-200"
              }`}
            >
              {label}
              {key !== "all" && (
                <span className="ml-1.5 text-xs opacity-75">
                  {key === "published"
                    ? stats.published
                    : key === "draft"
                      ? stats.drafts
                      : stats.inactive}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar artigos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Artigos ({filteredPosts.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#FF4D30]" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-3 h-10 w-10 text-[#94A3B8]" />
            <p className="text-sm font-medium text-[#475569]">
              Nenhum artigo encontrado
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              {search
                ? "Tente buscar com outros termos"
                : "Crie seu primeiro artigo clicando em 'Novo Artigo'"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredPosts.map((post) => {
              const st = statusConfig[post.status] || statusConfig.draft;
              const StatusIcon = st.icon;
              const isMenuOpen = openMenuId === post.id;

              return (
                <div
                  key={post.id}
                  className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F3]">
                      <FileText className="h-5 w-5 text-[#FF4D30]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#0F172A]">
                        {post.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${st.bgClass} ${st.textClass}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {st.label}
                        </span>
                        {post.categoryName && (
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            {post.categoryName}
                          </span>
                        )}
                        <span className="text-xs text-[#94A3B8]">
                          {formatDate(post.createdAt)}
                        </span>
                        {(post.viewCount || 0) > 0 && (
                          <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                            <Eye className="h-3 w-3" />
                            {post.viewCount.toLocaleString("pt-BR")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-gray-100"
                      title="Ver no site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-gray-100"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() =>
                        setDeleteConfirm({
                          id: post.id,
                          permanent: false,
                          title: post.title,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* More actions menu */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(isMenuOpen ? null : post.id);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-gray-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                          <p className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] uppercase">
                            Alterar status
                          </p>
                          {(["published", "draft", "inactive"] as const).map(
                            (s) => {
                              if (s === post.status) return null;
                              const cfg = statusConfig[s];
                              return (
                                <button
                                  key={s}
                                  onClick={() =>
                                    handleStatusChange(post.id, s)
                                  }
                                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#475569] transition-colors hover:bg-gray-50"
                                >
                                  <cfg.icon className="h-3.5 w-3.5" />
                                  {cfg.label}
                                </button>
                              );
                            }
                          )}
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => {
                              setDeleteConfirm({
                                id: post.id,
                                permanent: true,
                                title: post.title,
                              });
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Excluir permanentemente
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A]">
              {deleteConfirm.permanent
                ? "Excluir permanentemente?"
                : "Mover para lixeira?"}
            </h3>
            <p className="mt-2 text-sm text-[#475569]">
              {deleteConfirm.permanent
                ? `O artigo "${deleteConfirm.title}" sera removido permanentemente. Esta acao nao pode ser desfeita.`
                : `O artigo "${deleteConfirm.title}" sera movido para a lixeira.`}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  handleDelete(deleteConfirm.id, deleteConfirm.permanent)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                {deleteConfirm.permanent ? "Excluir" : "Mover para lixeira"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
