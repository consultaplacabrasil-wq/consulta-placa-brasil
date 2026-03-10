"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  FileText,
  Search,
  Share2,
  Code,
  Eye,
  Globe,
  Image as ImageIcon,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  featuredImage: string;
  status: "published" | "draft" | "inactive";
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  seoRobots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
}

const initialForm: PostForm = {
  title: "",
  excerpt: "",
  content: "",
  categoryId: "",
  featuredImage: "",
  status: "draft",
  publishedAt: new Date().toISOString().split("T")[0],
  seoTitle: "",
  seoDescription: "",
  seoCanonical: "",
  seoRobots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
};

type Tab = "conteudo" | "seo" | "opengraph" | "schema" | "preview";

const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: "conteudo", label: "Conteúdo", icon: FileText },
  { key: "seo", label: "SEO", icon: Search },
  { key: "opengraph", label: "Open Graph", icon: Share2 },
  { key: "schema", label: "Schema", icon: Code },
  { key: "preview", label: "Preview", icon: Eye },
];

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export default function NovoBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<PostForm>(initialForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("conteudo");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blog/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  function updateField(field: keyof PostForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.title.trim()) {
      setError("O título é obrigatório");
      return;
    }
    if (!form.content.trim()) {
      setError("O conteúdo é obrigatório");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId || null,
          publishedAt: form.publishedAt || null,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/blog"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao salvar post");
      }
    } catch {
      setError("Erro ao salvar post");
    } finally {
      setSaving(false);
    }
  }

  function generateSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: form.seoTitle || form.title || "Título do artigo",
      description:
        form.seoDescription || form.excerpt || "Descrição do artigo",
      image: form.ogImage || form.featuredImage || "",
      datePublished: form.publishedAt || new Date().toISOString().split("T")[0],
      dateModified: new Date().toISOString().split("T")[0],
      author: {
        "@type": "Organization",
        name: "Consulta Placa Brasil",
      },
      publisher: {
        "@type": "Organization",
        name: "Consulta Placa Brasil",
        logo: {
          "@type": "ImageObject",
          url: "https://consultaplacabrasil.com.br/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id":
          form.seoCanonical ||
          `https://consultaplacabrasil.com.br/blog/${slugify(form.title || "artigo")}`,
      },
    };
    return JSON.stringify(schema, null, 2);
  }

  const previewSlug = slugify(form.title || "url-do-artigo");
  const previewUrl = `https://consultaplacabrasil.com.br/blog/${previewSlug}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#475569] transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Novo Artigo</h1>
            <p className="text-sm text-[#64748B]">
              Crie um novo artigo para o blog
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A] disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Artigo salvo com sucesso! Redirecionando...
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "border-[#FF4D30] text-[#FF4D30]"
                  : "border-transparent text-[#475569] hover:border-gray-300 hover:text-[#0F172A]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {activeTab === "conteudo" && (
          <ContentTab
            form={form}
            categories={categories}
            updateField={updateField}
          />
        )}
        {activeTab === "seo" && (
          <SeoTab form={form} updateField={updateField} />
        )}
        {activeTab === "opengraph" && (
          <OpenGraphTab form={form} updateField={updateField} />
        )}
        {activeTab === "schema" && (
          <SchemaTab schema={generateSchema()} />
        )}
        {activeTab === "preview" && (
          <PreviewTab form={form} previewUrl={previewUrl} />
        )}
      </div>
    </div>
  );
}

/* ================================================================
   TAB COMPONENTS
   ================================================================ */

function ContentTab({
  form,
  categories,
  updateField,
}: {
  form: PostForm;
  categories: Category[];
  updateField: (field: keyof PostForm, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Título *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Título do artigo"
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Resumo
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          placeholder="Breve resumo do artigo"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      {/* Content */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Conteúdo *
        </label>
        <textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          placeholder="Escreva o conteúdo do artigo aqui..."
          rows={16}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      {/* Row: Category + Status */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Categoria
          </label>
          <select
            value={form.categoryId}
            onChange={(e) => updateField("categoryId", e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          >
            <option value="">Sem categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as "published" | "draft" | "inactive"
              )
            }
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      {/* Row: Featured Image + Publish Date */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Imagem destaque (URL)
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="url"
              value={form.featuredImage}
              onChange={(e) => updateField("featuredImage", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Data de publicação
          </label>
          <input
            type="date"
            value={form.publishedAt}
            onChange={(e) => updateField("publishedAt", e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      {/* Featured Image Preview */}
      {form.featuredImage && (
        <div>
          <p className="mb-1.5 text-sm font-medium text-[#0F172A]">
            Preview da imagem
          </p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <img
              src={form.featuredImage}
              alt="Preview"
              className="h-48 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SeoTab({
  form,
  updateField,
}: {
  form: PostForm;
  updateField: (field: keyof PostForm, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-[#0F172A]">
            Meta Title
          </label>
          <span
            className={`text-xs ${
              form.seoTitle.length > 70 ? "text-red-500" : "text-[#94A3B8]"
            }`}
          >
            {form.seoTitle.length}/70
          </span>
        </div>
        <input
          type="text"
          value={form.seoTitle}
          onChange={(e) => updateField("seoTitle", e.target.value)}
          placeholder="Título para mecanismos de busca"
          maxLength={70}
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-[#0F172A]">
            Meta Description
          </label>
          <span
            className={`text-xs ${
              form.seoDescription.length > 160
                ? "text-red-500"
                : "text-[#94A3B8]"
            }`}
          >
            {form.seoDescription.length}/160
          </span>
        </div>
        <textarea
          value={form.seoDescription}
          onChange={(e) => updateField("seoDescription", e.target.value)}
          placeholder="Descrição para mecanismos de busca"
          maxLength={160}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          URL Canônica
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="url"
            value={form.seoCanonical}
            onChange={(e) => updateField("seoCanonical", e.target.value)}
            placeholder="https://consultaplacabrasil.com.br/blog/artigo"
            className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Diretivas para robôs
        </label>
        <input
          type="text"
          value={form.seoRobots}
          onChange={(e) => updateField("seoRobots", e.target.value)}
          placeholder="index, follow"
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
        <p className="mt-1 text-xs text-[#94A3B8]">
          Ex: index, follow | noindex, nofollow | index, nofollow
        </p>
      </div>
    </div>
  );
}

function OpenGraphTab({
  form,
  updateField,
}: {
  form: PostForm;
  updateField: (field: keyof PostForm, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          og:title
        </label>
        <input
          type="text"
          value={form.ogTitle}
          onChange={(e) => updateField("ogTitle", e.target.value)}
          placeholder="Título para redes sociais"
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          og:description
        </label>
        <textarea
          value={form.ogDescription}
          onChange={(e) => updateField("ogDescription", e.target.value)}
          placeholder="Descrição para redes sociais"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          og:image
        </label>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="url"
            value={form.ogImage}
            onChange={(e) => updateField("ogImage", e.target.value)}
            placeholder="https://exemplo.com/og-imagem.jpg"
            className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          og:url
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="url"
            value={form.ogUrl}
            onChange={(e) => updateField("ogUrl", e.target.value)}
            placeholder="https://consultaplacabrasil.com.br/blog/artigo"
            className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>

      {/* OG Image Preview */}
      {form.ogImage && (
        <div>
          <p className="mb-1.5 text-sm font-medium text-[#0F172A]">
            Preview da imagem OG
          </p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <img
              src={form.ogImage}
              alt="OG Preview"
              className="h-48 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SchemaTab({ schema }: { schema: string }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[#0F172A]">
          Schema Article (JSON-LD)
        </h3>
        <p className="mt-1 text-xs text-[#94A3B8]">
          Schema gerado automaticamente com base nos dados do artigo. Este
          JSON será inserido na página do artigo para SEO estruturado.
        </p>
      </div>
      <textarea
        readOnly
        value={schema}
        rows={24}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-xs text-[#475569]"
      />
    </div>
  );
}

function PreviewTab({
  form,
  previewUrl,
}: {
  form: PostForm;
  previewUrl: string;
}) {
  const googleTitle = form.seoTitle || form.title || "Título do artigo";
  const googleDesc =
    form.seoDescription || form.excerpt || "Descrição do artigo aparecera aqui...";
  const ogTitle = form.ogTitle || form.title || "Título do artigo";
  const ogDesc =
    form.ogDescription || form.excerpt || "Descrição do artigo para redes sociais";
  const ogImg = form.ogImage || form.featuredImage || "";

  return (
    <div className="space-y-8">
      {/* Google Preview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">
          Google Preview
        </h3>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-[#475569]">{previewUrl}</p>
          <p className="mt-1 text-lg text-[#1a0dab] hover:underline">
            {googleTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#475569]">
            {googleDesc}
          </p>
        </div>
      </div>

      {/* Facebook Preview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">
          Facebook Preview
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {ogImg ? (
            <img
              src={ogImg}
              alt="OG Preview"
              className="h-52 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-52 w-full items-center justify-center bg-gray-100">
              <ImageIcon className="h-12 w-12 text-[#94A3B8]" />
            </div>
          )}
          <div className="border-t border-gray-100 bg-[#f2f3f5] p-3">
            <p className="text-xs uppercase text-[#64748B]">
              consultaplacabrasil.com.br
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0F172A]">
              {ogTitle}
            </p>
            <p className="mt-0.5 text-xs text-[#64748B] line-clamp-2">
              {ogDesc}
            </p>
          </div>
        </div>
      </div>

      {/* X/Twitter Preview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">
          X / Twitter Preview
        </h3>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {ogImg ? (
            <img
              src={ogImg}
              alt="Twitter Preview"
              className="h-52 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-52 w-full items-center justify-center bg-gray-100">
              <ImageIcon className="h-12 w-12 text-[#94A3B8]" />
            </div>
          )}
          <div className="border-t border-gray-100 p-3">
            <p className="text-sm font-semibold text-[#0F172A]">
              {ogTitle}
            </p>
            <p className="mt-0.5 text-xs text-[#64748B] line-clamp-2">
              {ogDesc}
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              consultaplacabrasil.com.br
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
