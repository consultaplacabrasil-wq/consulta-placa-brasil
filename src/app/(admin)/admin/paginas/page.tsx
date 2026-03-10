"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Globe,
  Search as SearchIcon,
  Code,
  Share2,
  Monitor,
  Loader2,
} from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoCanonical: string | null;
  seoRobots: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyPage: Omit<Page, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  content: "",
  seoTitle: "",
  seoDescription: "",
  seoCanonical: "",
  seoRobots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  published: true,
};

export default function AdminPaginasPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [activeTab, setActiveTab] = useState("conteudo");
  const [form, setForm] = useState(emptyPage);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/pages");
      if (!res.ok) throw new Error("Erro ao buscar páginas");
      const data = await res.json();
      setPages(data);
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar páginas" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  function handleEdit(page: Page) {
    setEditing(page);
    setIsNew(false);
    setActiveTab("conteudo");
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      seoTitle: page.seoTitle || "",
      seoDescription: page.seoDescription || "",
      seoCanonical: page.seoCanonical || "",
      seoRobots: page.seoRobots || "index, follow",
      ogTitle: page.ogTitle || "",
      ogDescription: page.ogDescription || "",
      ogImage: page.ogImage || "",
      ogUrl: page.ogUrl || "",
      published: page.published,
    });
  }

  function handleNew() {
    setEditing(null);
    setIsNew(true);
    setActiveTab("conteudo");
    setForm({ ...emptyPage });
  }

  function handleBack() {
    setEditing(null);
    setIsNew(false);
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSave() {
    if (!form.title || !form.slug || !form.content) {
      showMessage("error", "Título, slug e conteúdo são obrigatórios");
      return;
    }

    setSaving(true);
    try {
      const method = isNew ? "POST" : "PUT";
      const payload = isNew ? form : { id: editing!.id, ...form };

      const res = await fetch("/api/admin/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      showMessage("success", isNew ? "Página criada com sucesso" : "Página atualizada com sucesso");
      setEditing(null);
      setIsNew(false);
      fetchPages();
    } catch (err) {
      showMessage("error", err instanceof Error ? err.message : "Erro ao salvar página");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta página?")) return;

    try {
      const res = await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      showMessage("success", "Página excluída com sucesso");
      fetchPages();
    } catch {
      showMessage("error", "Erro ao excluir página");
    }
  }

  async function handleTogglePublish(page: Page) {
    try {
      const res = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: page.id, published: !page.published }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      fetchPages();
    } catch {
      showMessage("error", "Erro ao atualizar status");
    }
  }

  const siteUrl = "https://consultaplacabrasil.com.br";

  const tabs = [
    { id: "conteudo", label: "Conteúdo", icon: FileText },
    { id: "seo", label: "SEO", icon: SearchIcon },
    { id: "opengraph", label: "Open Graph", icon: Share2 },
    { id: "schema", label: "Schema", icon: Code },
    { id: "preview", label: "Preview", icon: Monitor },
  ];

  // Editor view
  if (editing || isNew) {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: form.seoTitle || form.title,
      description: form.seoDescription || "",
      url: form.seoCanonical || `${siteUrl}/${form.slug}`,
      publisher: {
        "@type": "Organization",
        name: "Consulta Placa Brasil",
        url: siteUrl,
      },
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0F172A]">
              {isNew ? "Nova Página" : `Editar: ${editing!.title}`}
            </h1>
            <p className="text-sm text-[#64748B]">
              {isNew ? "Crie uma nova página institucional" : `Slug: /${form.slug}`}
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar
          </Button>
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#FF4D30] text-white"
                    : "bg-white text-[#475569] border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab: Conteudo */}
        {activeTab === "conteudo" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#FF4D30]" />
                Conteúdo da Página
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Título</label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: isNew ? generateSlug(title) : f.slug,
                    }));
                  }}
                  placeholder="Ex: Política de Privacidade"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#94A3B8]">{siteUrl}/</span>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="politica-de-privacidade"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Conteúdo</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Escreva o conteúdo da página aqui..."
                  rows={16}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30] resize-y"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-[#0F172A]">Publicada</label>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    form.published ? "bg-[#FF4D30]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      form.published ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab: SEO */}
        {activeTab === "seo" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <SearchIcon className="h-5 w-5 text-[#FF4D30]" />
                SEO - Otimização para Mecanismos de Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Meta Title
                  <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                    {(form.seoTitle || "").length}/70
                  </span>
                </label>
                <Input
                  value={form.seoTitle || ""}
                  onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
                  placeholder="Título para SEO (máx. 70 caracteres)"
                  maxLength={70}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Meta Description
                  <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                    {(form.seoDescription || "").length}/160
                  </span>
                </label>
                <textarea
                  value={form.seoDescription || ""}
                  onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))}
                  placeholder="Descrição para SEO (máx. 160 caracteres)"
                  maxLength={160}
                  rows={3}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30] resize-y"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">URL Canônica</label>
                <Input
                  value={form.seoCanonical || ""}
                  onChange={(e) => setForm((f) => ({ ...f, seoCanonical: e.target.value }))}
                  placeholder={`${siteUrl}/${form.slug}`}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Robots</label>
                <select
                  value={form.seoRobots || "index, follow"}
                  onChange={(e) => setForm((f) => ({ ...f, seoRobots: e.target.value }))}
                  className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]"
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab: Open Graph */}
        {activeTab === "opengraph" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Share2 className="h-5 w-5 text-[#FF4D30]" />
                Open Graph - Compartilhamento Social
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  og:title
                  <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                    {(form.ogTitle || "").length}/100
                  </span>
                </label>
                <Input
                  value={form.ogTitle || ""}
                  onChange={(e) => setForm((f) => ({ ...f, ogTitle: e.target.value }))}
                  placeholder="Título para redes sociais"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  og:description
                  <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                    {(form.ogDescription || "").length}/200
                  </span>
                </label>
                <textarea
                  value={form.ogDescription || ""}
                  onChange={(e) => setForm((f) => ({ ...f, ogDescription: e.target.value }))}
                  placeholder="Descrição para redes sociais"
                  maxLength={200}
                  rows={3}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30] resize-y"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">og:image</label>
                <Input
                  value={form.ogImage || ""}
                  onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg (1200x630 recomendado)"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">og:url</label>
                <Input
                  value={form.ogUrl || ""}
                  onChange={(e) => setForm((f) => ({ ...f, ogUrl: e.target.value }))}
                  placeholder={`${siteUrl}/${form.slug}`}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab: Schema */}
        {activeTab === "schema" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Code className="h-5 w-5 text-[#FF4D30]" />
                Schema Markup - Dados Estruturados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-[#0F172A] p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {JSON.stringify(webPageSchema, null, 2)}
                </pre>
              </div>
              <p className="text-xs text-[#94A3B8] mt-3">
                Este schema WebPage será gerado automaticamente com base nos dados de SEO preenchidos.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tab: Preview */}
        {activeTab === "preview" && (
          <div className="space-y-6">
            {/* Google Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#FF4D30]" />
                  Preview no Google
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 p-4 bg-white max-w-xl">
                  <p className="text-xs text-[#475569] truncate">
                    {form.seoCanonical || `${siteUrl}/${form.slug}`}
                  </p>
                  <p className="text-lg text-blue-700 hover:underline cursor-pointer truncate mt-0.5">
                    {form.seoTitle || form.title || "Título da página"}
                  </p>
                  <p className="text-sm text-[#475569] line-clamp-2 mt-0.5">
                    {form.seoDescription || "Descrição da página aparecerá aqui..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Facebook Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-[#FF4D30]" />
                  Preview no Facebook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 overflow-hidden max-w-lg">
                  {form.ogImage ? (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                      <img
                        src={form.ogImage}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                      <span className="text-sm text-[#94A3B8]">Sem imagem definida</span>
                    </div>
                  )}
                  <div className="p-3 bg-gray-50">
                    <p className="text-xs text-[#94A3B8] uppercase">
                      {siteUrl.replace("https://", "")}
                    </p>
                    <p className="text-sm font-semibold text-[#0F172A] mt-0.5 truncate">
                      {form.ogTitle || form.title || "Título da página"}
                    </p>
                    <p className="text-xs text-[#475569] line-clamp-2 mt-0.5">
                      {form.ogDescription || form.seoDescription || "Descrição da página..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Twitter Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-[#FF4D30]" />
                  Preview no X (Twitter)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-gray-200 overflow-hidden max-w-lg">
                  {form.ogImage ? (
                    <div className="w-full h-48 bg-gray-100">
                      <img
                        src={form.ogImage}
                        alt="Twitter Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-sm text-[#94A3B8]">Sem imagem definida</span>
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {form.ogTitle || form.title || "Título da página"}
                    </p>
                    <p className="text-xs text-[#475569] line-clamp-2 mt-0.5">
                      {form.ogDescription || form.seoDescription || "Descrição da página..."}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {siteUrl.replace("https://", "")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Páginas Institucionais</h1>
          <p className="text-sm text-[#64748B]">
            Gerencie as páginas Sobre, Privacidade, Termos e Cookies
          </p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Página
        </Button>
      </div>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
        </div>
      ) : pages.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-[#94A3B8] mb-3" />
            <p className="text-[#475569] font-medium">Nenhuma página criada</p>
            <p className="text-sm text-[#94A3B8] mt-1">
              Crie páginas institucionais como Sobre, Privacidade e Termos
            </p>
            <Button
              onClick={handleNew}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2 mt-4"
            >
              <Plus className="h-4 w-4" />
              Criar Página
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Todas as Páginas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Título</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Slug</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Atualizado</th>
                    <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3">
                        <p className="font-medium text-[#0F172A]">{page.title}</p>
                      </td>
                      <td className="py-3">
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-[#475569]">
                          /{page.slug}
                        </code>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            page.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {page.published ? (
                            <>
                              <Eye className="h-3 w-3" /> Publicada
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" /> Rascunho
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 text-[#475569]">
                        {new Date(page.updatedAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(page)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTogglePublish(page)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                            title={page.published ? "Despublicar" : "Publicar"}
                          >
                            {page.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
