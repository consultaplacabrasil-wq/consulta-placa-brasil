"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
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
  Settings,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Link2,
} from "lucide-react";

interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
  status: "published" | "draft" | "inactive";
  publishedAt: string | null;
  viewCount: number;
  geradoPorIA: boolean;
  createdAt: string;
}

type StatusFilter = "all" | "published" | "draft" | "inactive";
type CategoriaFilter = "all" | "detran" | "recalls" | "mercado-usados" | "legislacao" | "multas";

const statusConfig: Record<
  string,
  { label: string; bgClass: string; textClass: string; icon: typeof CheckCircle }
> = {
  published: {
    label: "Publicada",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
    icon: CheckCircle,
  },
  draft: {
    label: "Aguardando",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
    icon: Clock,
  },
  inactive: {
    label: "Rejeitada",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    icon: XCircle,
  },
};

const categoriaConfig: Record<
  string,
  { label: string; bgClass: string; textClass: string }
> = {
  detran: {
    label: "Detran",
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
  },
  recalls: {
    label: "Recalls",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
  },
  "mercado-usados": {
    label: "Mercado Usados",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
  },
  legislacao: {
    label: "Legislação",
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
  },
  multas: {
    label: "Multas",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
  },
};

export default function AdminNoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoriaFilter, setCategoriaFilter] = useState<CategoriaFilter>("all");
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    titulo: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "titulo" | "categoria" | "views">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function toggleSort(field: "date" | "titulo" | "categoria" | "views") {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir(field === "titulo" || field === "categoria" ? "asc" : "desc");
    }
  }

  const fetchNoticias = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/noticias");
      if (res.ok) {
        const data = await res.json();
        setNoticias(data);
      }
    } catch {
      console.error("Erro ao buscar notícias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, [openMenuId]);

  const filteredNoticias = noticias.filter((noticia) => {
    const matchesStatus =
      statusFilter === "all" || noticia.status === statusFilter;
    const matchesCategoria =
      categoriaFilter === "all" || noticia.categoria === categoriaFilter;
    const matchesSearch =
      !search ||
      noticia.titulo.toLowerCase().includes(search.toLowerCase()) ||
      noticia.resumo.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesCategoria && matchesSearch;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    switch (sortBy) {
      case "titulo":
        return dir * a.titulo.localeCompare(b.titulo, "pt-BR");
      case "categoria":
        return dir * a.categoria.localeCompare(b.categoria, "pt-BR");
      case "views":
        return dir * ((a.viewCount || 0) - (b.viewCount || 0));
      case "date":
      default:
        return dir * (new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime());
    }
  });

  const stats = {
    total: noticias.length,
    drafts: noticias.filter((n) => n.status === "draft").length,
    published: noticias.filter((n) => n.status === "published").length,
    inactive: noticias.filter((n) => n.status === "inactive").length,
  };

  async function handleAprovarRejeitar(id: string, acao: "aprovar" | "rejeitar") {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/noticias/aprovar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, acao }),
      });
      if (res.ok) {
        await fetchNoticias();
      }
    } catch {
      console.error(`Erro ao ${acao} notícia`);
    } finally {
      setActionLoading(null);
    }
    setOpenMenuId(null);
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/noticias?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchNoticias();
      }
    } catch {
      console.error("Erro ao excluir notícia");
    }
    setDeleteConfirm(null);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch("/api/admin/noticias", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchNoticias();
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
          <h1 className="text-2xl font-bold text-[#0F172A]">Notícias</h1>
          <p className="text-sm text-[#64748B]">
            Gerencie as notícias geradas automaticamente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/noticias/links"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
          >
            <Link2 className="h-4 w-4" />
            Links SEO
          </Link>
          <Link
            href="/admin/noticias/configuracoes"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.total}
              </p>
              <p className="text-xs text-[#94A3B8]">Total</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.drafts}
              </p>
              <p className="text-xs text-[#94A3B8]">Aguardando Aprovação</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats.published}
              </p>
              <p className="text-xs text-[#94A3B8]">Publicadas</p>
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
              <p className="text-xs text-[#94A3B8]">Rejeitadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "all", label: "Todos" },
                { key: "published", label: "Publicadas" },
                { key: "draft", label: "Aguardando" },
                { key: "inactive", label: "Rejeitadas" },
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

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "all", label: "Todas categorias" },
                { key: "detran", label: "Detran" },
                { key: "recalls", label: "Recalls" },
                { key: "mercado-usados", label: "Mercado Usados" },
                { key: "legislacao", label: "Legislação" },
                { key: "multas", label: "Multas" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCategoriaFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  categoriaFilter === key
                    ? "bg-[#0F172A] text-white"
                    : "bg-gray-100 text-[#475569] hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative self-start">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      {/* Noticias List */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Notícias ({filteredNoticias.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#FF4D30]" />
          </div>
        ) : filteredNoticias.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-3 h-10 w-10 text-[#94A3B8]" />
            <p className="text-sm font-medium text-[#475569]">
              Nenhuma notícia encontrada
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              {search
                ? "Tente buscar com outros termos"
                : "As notícias são geradas automaticamente pelo sistema"}
            </p>
          </div>
        ) : (
          <>
          {/* Sort headers */}
          <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-2 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            <div className="flex-1 min-w-0">
              <button onClick={() => toggleSort("titulo")} className="flex items-center gap-1 hover:text-[#0F172A] transition-colors">
                Título {sortBy === "titulo" && (sortDir === "asc" ? "↑" : "↓")}
              </button>
            </div>
            <div className="hidden sm:block w-24">
              <button onClick={() => toggleSort("categoria")} className="flex items-center gap-1 hover:text-[#0F172A] transition-colors">
                Categoria {sortBy === "categoria" && (sortDir === "asc" ? "↑" : "↓")}
              </button>
            </div>
            <div className="hidden md:block w-24">
              <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-[#0F172A] transition-colors">
                Data {sortBy === "date" && (sortDir === "asc" ? "↑" : "↓")}
              </button>
            </div>
            <div className="hidden md:block w-16 text-right">
              <button onClick={() => toggleSort("views")} className="flex items-center gap-1 ml-auto hover:text-[#0F172A] transition-colors">
                Views {sortBy === "views" && (sortDir === "asc" ? "↑" : "↓")}
              </button>
            </div>
            <div className="w-36 shrink-0" />
          </div>
          <div className="divide-y divide-gray-50">
            {filteredNoticias.map((noticia) => {
              const st = statusConfig[noticia.status] || statusConfig.draft;
              const StatusIcon = st.icon;
              const cat = categoriaConfig[noticia.categoria];
              const isMenuOpen = openMenuId === noticia.id;
              const isActionLoading = actionLoading === noticia.id;

              return (
                <div
                  key={noticia.id}
                  className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F3]">
                      <FileText className="h-5 w-5 text-[#FF4D30]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#0F172A]">
                          {noticia.titulo}
                        </p>
                        {noticia.geradoPorIA && (
                          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-600">
                            <Sparkles className="h-2.5 w-2.5" />
                            IA
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${st.bgClass} ${st.textClass}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {st.label}
                        </span>
                        {/* Mobile: show category, date, views inline */}
                        <span className="sm:hidden text-xs text-[#94A3B8]">
                          {cat?.label} · {formatDate(noticia.publishedAt || noticia.createdAt)} · {noticia.viewCount || 0} views
                        </span>
                      </div>
                    </div>
                    {/* Desktop columns */}
                    {cat && (
                      <div className="hidden sm:block w-24 shrink-0">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.bgClass} ${cat.textClass}`}
                        >
                          {cat.label}
                        </span>
                      </div>
                    )}
                    <div className="hidden md:block w-24 shrink-0 text-xs text-[#475569]">
                      {formatDate(noticia.publishedAt || noticia.createdAt)}
                    </div>
                    <div className="hidden md:flex w-16 shrink-0 items-center justify-end gap-1 text-xs text-[#475569]">
                      <Eye className="h-3 w-3 text-[#94A3B8]" />
                      {(noticia.viewCount || 0).toLocaleString("pt-BR")}
                    </div>
                  </div>

                  <div className="ml-4 flex shrink-0 items-center gap-1">
                    {/* Quick approve/reject for drafts */}
                    {noticia.status === "draft" && (
                      <>
                        <button
                          onClick={() =>
                            handleAprovarRejeitar(noticia.id, "aprovar")
                          }
                          disabled={isActionLoading}
                          className="flex h-8 items-center gap-1 rounded-lg bg-green-50 px-2.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 disabled:opacity-50"
                          title="Aprovar"
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          Aprovar
                        </button>
                        <button
                          onClick={() =>
                            handleAprovarRejeitar(noticia.id, "rejeitar")
                          }
                          disabled={isActionLoading}
                          className="flex h-8 items-center gap-1 rounded-lg bg-red-50 px-2.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
                          title="Rejeitar"
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          Rejeitar
                        </button>
                      </>
                    )}

                    <Link
                      href={`/noticias/${noticia.slug}`}
                      target="_blank"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-gray-100"
                      title="Ver no site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/noticias/${noticia.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-colors hover:bg-gray-100"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() =>
                        setDeleteConfirm({
                          id: noticia.id,
                          titulo: noticia.titulo,
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
                          setOpenMenuId(isMenuOpen ? null : noticia.id);
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
                              if (s === noticia.status) return null;
                              const cfg = statusConfig[s];
                              return (
                                <button
                                  key={s}
                                  onClick={() =>
                                    handleStatusChange(noticia.id, s)
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
                                id: noticia.id,
                                titulo: noticia.titulo,
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
          </>
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
              Excluir notícia?
            </h3>
            <p className="mt-2 text-sm text-[#475569]">
              A notícia &quot;{deleteConfirm.titulo}&quot; será removida
              permanentemente. Esta ação não pode ser desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
