"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Save,
  FileText,
  Search,
  Eye,
  Globe,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RichEditor = dynamic(() => import("@/components/admin/rich-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg border border-gray-200 flex items-center justify-center text-sm text-[#94A3B8]">
      Carregando editor...
    </div>
  ),
});

interface NoticiaForm {
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  tags: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  ctaExibir: boolean;
  ctaTexto: string;
  ctaLink: string;
}

const emptyForm: NoticiaForm = {
  titulo: "",
  slug: "",
  resumo: "",
  conteudo: "",
  categoria: "",
  tags: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
  seoCanonical: "",
  ctaExibir: false,
  ctaTexto: "",
  ctaLink: "",
};

type Tab = "conteudo" | "seo" | "preview";

const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: "conteudo", label: "Conteudo", icon: FileText },
  { key: "seo", label: "SEO", icon: Search },
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
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function EditNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<NoticiaForm>(emptyForm);
  const [activeTab, setActiveTab] = useState<Tab>("conteudo");
  const [saving, setSaving] = useState(false);
  const [loadingNoticia, setLoadingNoticia] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/noticias")
      .then((res) => res.json())
      .then((noticias) => {
        if (!Array.isArray(noticias)) {
          setError("Erro ao carregar noticia");
          setLoadingNoticia(false);
          return;
        }

        const noticia = noticias.find(
          (n: { id: string }) => n.id === id
        );
        if (!noticia) {
          setError("Noticia nao encontrada");
          setLoadingNoticia(false);
          return;
        }

        setForm({
          titulo: noticia.titulo || "",
          slug: noticia.slug || "",
          resumo: noticia.resumo || "",
          conteudo: noticia.conteudo || "",
          categoria: noticia.categoria || "",
          tags: Array.isArray(noticia.tags)
            ? noticia.tags.join(", ")
            : noticia.tags || "",
          status: noticia.status || "draft",
          seoTitle: noticia.seoTitle || "",
          seoDescription: noticia.seoDescription || "",
          seoCanonical: noticia.seoCanonical || "",
          ctaExibir: noticia.ctaExibir ?? false,
          ctaTexto: noticia.ctaTexto || "",
          ctaLink: noticia.ctaLink || "",
        });
        setLoadingNoticia(false);
      })
      .catch(() => {
        setError("Erro ao carregar noticia");
        setLoadingNoticia(false);
      });
  }, [id]);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  function updateField(
    field: keyof NoticiaForm,
    value: string | boolean
  ) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (
        field === "titulo" &&
        typeof value === "string" &&
        !slugManuallyEdited
      ) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  }

  function updateSlug(value: string) {
    setSlugManuallyEdited(true);
    setForm((prev) => ({ ...prev, slug: value }));
  }

  async function handleSave() {
    if (!form.titulo.trim()) {
      setError("O titulo e obrigatorio");
      return;
    }
    if (!form.conteudo.trim()) {
      setError("O conteudo e obrigatorio");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/noticias", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/noticias"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao atualizar noticia");
      }
    } catch {
      setError("Erro ao atualizar noticia");
    } finally {
      setSaving(false);
    }
  }

  async function handleApprove() {
    setApproving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/noticias/aprovar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "approve" }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/noticias"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao aprovar noticia");
      }
    } catch {
      setError("Erro ao aprovar noticia");
    } finally {
      setApproving(false);
    }
  }

  async function handleReject() {
    setRejecting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/noticias/aprovar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "reject" }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/noticias"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao rejeitar noticia");
      }
    } catch {
      setError("Erro ao rejeitar noticia");
    } finally {
      setRejecting(false);
    }
  }

  const previewSlug = form.slug || slugify(form.titulo || "url-da-noticia");
  const previewUrl = `https://consultaplacabrasil.com/noticias/${previewSlug}`;

  if (loadingNoticia) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
          <p className="text-sm text-[#64748B]">Carregando noticia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/noticias"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#475569] transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">
              Editar Noticia
            </h1>
            <p className="text-sm text-[#64748B]">
              Atualize os dados da noticia
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReject}
            disabled={rejecting || approving || saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            <XCircle className="h-4 w-4" />
            {rejecting ? "Rejeitando..." : "Rejeitar"}
          </button>
          <button
            onClick={handleApprove}
            disabled={approving || rejecting || saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-2.5 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
          >
            <CheckCircle className="h-4 w-4" />
            {approving ? "Aprovando..." : "Aprovar"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving || approving || rejecting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar alteracoes"}
          </button>
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Noticia atualizada com sucesso! Redirecionando...
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
          <ConteudoTab
            form={form}
            updateField={updateField}
            updateSlug={updateSlug}
          />
        )}
        {activeTab === "seo" && (
          <SeoTab form={form} updateField={updateField} />
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

function ConteudoTab({
  form,
  updateField,
  updateSlug,
}: {
  form: NoticiaForm;
  updateField: (field: keyof NoticiaForm, value: string | boolean) => void;
  updateSlug: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Titulo *
        </label>
        <input
          type="text"
          value={form.titulo}
          onChange={(e) => updateField("titulo", e.target.value)}
          placeholder="Titulo da noticia"
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Slug
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => updateSlug(e.target.value)}
          placeholder="url-da-noticia"
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#475569] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
        <p className="mt-1 text-xs text-[#94A3B8]">
          Gerado automaticamente a partir do titulo. Pode ser editado manualmente.
        </p>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-[#0F172A]">
            Resumo
          </label>
          <span
            className={`text-xs ${
              form.resumo.length > 160 ? "text-red-500" : "text-[#94A3B8]"
            }`}
          >
            {form.resumo.length}/160
          </span>
        </div>
        <textarea
          value={form.resumo}
          onChange={(e) => updateField("resumo", e.target.value)}
          placeholder="Breve resumo da noticia"
          maxLength={160}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          Conteudo *
        </label>
        <RichEditor
          content={form.conteudo}
          onChange={(html: string) => updateField("conteudo", html)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Categoria
          </label>
          <select
            value={form.categoria}
            onChange={(e) => updateField("categoria", e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          >
            <option value="">Selecione</option>
            <option value="detran">Detran</option>
            <option value="recalls">Recalls</option>
            <option value="mercado-usados">Mercado de Usados</option>
            <option value="legislacao">Legislacao</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Tags
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => updateField("tags", e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
          <p className="mt-1 text-xs text-[#94A3B8]">
            Separadas por virgula
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg border border-gray-200 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="ctaExibir"
            checked={form.ctaExibir}
            onChange={(e) => updateField("ctaExibir", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#FF4D30] focus:ring-[#FF4D30]"
          />
          <label
            htmlFor="ctaExibir"
            className="text-sm font-medium text-[#0F172A]"
          >
            Exibir CTA na noticia
          </label>
        </div>

        {form.ctaExibir && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Texto do CTA
              </label>
              <input
                type="text"
                value={form.ctaTexto}
                onChange={(e) => updateField("ctaTexto", e.target.value)}
                placeholder="Consulte agora"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Link do CTA
              </label>
              <input
                type="text"
                value={form.ctaLink}
                onChange={(e) => updateField("ctaLink", e.target.value)}
                placeholder="https://consultaplacabrasil.com/consulta"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SeoTab({
  form,
  updateField,
}: {
  form: NoticiaForm;
  updateField: (field: keyof NoticiaForm, value: string | boolean) => void;
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
          placeholder="Titulo para mecanismos de busca"
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
          placeholder="Descricao para mecanismos de busca"
          maxLength={160}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
          URL Canonica
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="url"
            value={form.seoCanonical}
            onChange={(e) => updateField("seoCanonical", e.target.value)}
            placeholder="https://consultaplacabrasil.com/noticias/noticia"
            className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
          />
        </div>
      </div>
    </div>
  );
}

function PreviewTab({
  form,
  previewUrl,
}: {
  form: NoticiaForm;
  previewUrl: string;
}) {
  const googleTitle = form.seoTitle || form.titulo || "Titulo da noticia";
  const googleDesc =
    form.seoDescription ||
    form.resumo ||
    "Descricao da noticia aparecera aqui...";

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
    </div>
  );
}
