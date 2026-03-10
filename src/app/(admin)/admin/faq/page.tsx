"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  HelpCircle,
  Search,
  Globe,
  Share2,
  Code2,
  Eye,
  GripVertical,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Faq {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SeoData {
  id?: string;
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  seoRobots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
}

type TabId = "perguntas" | "seo" | "opengraph" | "schema" | "preview";

const emptyFaq: Omit<Faq, "id" | "createdAt" | "updatedAt"> = {
  question: "",
  answer: "",
  sortOrder: 0,
  active: true,
};

const emptySeo: SeoData = {
  seoTitle: "",
  seoDescription: "",
  seoCanonical: "",
  seoRobots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminFaqPage() {
  /* State ---------------------------------------------------------- */
  const [activeTab, setActiveTab] = useState<TabId>("perguntas");
  const [faqList, setFaqList] = useState<Faq[]>([]);
  const [seo, setSeo] = useState<SeoData>(emptySeo);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // FAQ form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyFaq);

  // Expanded answers
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* Helpers -------------------------------------------------------- */
  const flash = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }, []);

  /* Data fetching -------------------------------------------------- */
  const fetchFaqs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faq");
      if (res.ok) setFaqList(await res.json());
    } catch {
      flash("error", "Erro ao carregar FAQs");
    }
  }, [flash]);

  const fetchSeo = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faq/seo");
      if (res.ok) {
        const data = await res.json();
        if (data) setSeo({ ...emptySeo, ...data });
      }
    } catch {
      flash("error", "Erro ao carregar SEO");
    }
  }, [flash]);

  useEffect(() => {
    Promise.all([fetchFaqs(), fetchSeo()]).finally(() => setLoading(false));
  }, [fetchFaqs, fetchSeo]);

  /* FAQ CRUD ------------------------------------------------------- */
  const saveFaq = async () => {
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...form } : form;
      const res = await fetch("/api/admin/faq", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        flash("success", editingId ? "FAQ atualizada!" : "FAQ criada!");
        resetForm();
        fetchFaqs();
      } else {
        flash("error", "Erro ao salvar FAQ");
      }
    } catch {
      flash("error", "Erro ao salvar FAQ");
    } finally {
      setSaving(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta FAQ?")) return;
    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        flash("success", "FAQ excluída!");
        fetchFaqs();
      } else {
        flash("error", "Erro ao excluir FAQ");
      }
    } catch {
      flash("error", "Erro ao excluir FAQ");
    }
  };

  const toggleActive = async (faq: Faq) => {
    try {
      await fetch("/api/admin/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: faq.id, active: !faq.active }),
      });
      fetchFaqs();
    } catch {
      flash("error", "Erro ao atualizar status");
    }
  };

  const updateSortOrder = async (faq: Faq, newOrder: number) => {
    try {
      await fetch("/api/admin/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: faq.id, sortOrder: newOrder }),
      });
      fetchFaqs();
    } catch {
      flash("error", "Erro ao atualizar ordem");
    }
  };

  const startEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, sortOrder: faq.sortOrder, active: faq.active });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyFaq);
    setShowForm(false);
  };

  /* SEO save ------------------------------------------------------- */
  const saveSeo = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/faq/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seo),
      });
      if (res.ok) {
        flash("success", "SEO salvo com sucesso!");
        fetchSeo();
      } else {
        flash("error", "Erro ao salvar SEO");
      }
    } catch {
      flash("error", "Erro ao salvar SEO");
    } finally {
      setSaving(false);
    }
  };

  /* Schema generation ---------------------------------------------- */
  const activeFaqs = faqList.filter((f) => f.active);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  /* Tabs config ---------------------------------------------------- */
  const tabs: { id: TabId; label: string; icon: typeof HelpCircle }[] = [
    { id: "perguntas", label: "Perguntas", icon: HelpCircle },
    { id: "seo", label: "SEO", icon: Search },
    { id: "opengraph", label: "Open Graph", icon: Share2 },
    { id: "schema", label: "Schema", icon: Code2 },
    { id: "preview", label: "Preview", icon: Eye },
  ];

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">FAQ</h1>
          <p className="text-sm text-[#64748B]">
            Gerencie as perguntas frequentes e configurações de SEO
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-[#FFF5F3] px-3 py-1.5">
            <HelpCircle className="h-4 w-4 text-[#FF4D30]" />
            <span className="text-sm font-semibold text-[#FF4D30]">{faqList.length}</span>
            <span className="text-xs text-[#94A3B8]">total</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-1.5">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">{activeFaqs.length}</span>
            <span className="text-xs text-[#94A3B8]">ativas</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* TAB: Perguntas                                                */}
      {/* ============================================================ */}
      {activeTab === "perguntas" && (
        <div className="space-y-4">
          {/* Add button */}
          {!showForm && (
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Pergunta
            </Button>
          )}

          {/* Inline form */}
          {showForm && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-[#0F172A]">
                  {editingId ? "Editar Pergunta" : "Nova Pergunta"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                    Pergunta
                  </label>
                  <input
                    type="text"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder="Ex: Como funciona a consulta de placas?"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                    Resposta
                  </label>
                  <textarea
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    placeholder="Escreva a resposta detalhada..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                      Ordem de exibição
                    </label>
                    <input
                      type="number"
                      value={form.sortOrder}
                      onChange={(e) =>
                        setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
                      }
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-[#FF4D30] focus:ring-[#FF4D30]"
                      />
                      <span className="text-sm font-medium text-[#475569]">Ativa</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={saveFaq}
                    disabled={saving || !form.question.trim() || !form.answer.trim()}
                    className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {editingId ? "Atualizar" : "Salvar"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="gap-2 border-gray-200 text-[#475569]"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQ list */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#0F172A]">
                Todas as Perguntas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {faqList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 mb-4">
                    <HelpCircle className="h-7 w-7 text-[#94A3B8]" />
                  </div>
                  <p className="text-sm font-medium text-[#475569]">Nenhuma FAQ cadastrada</p>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Clique em &quot;Nova Pergunta&quot; para começar
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {faqList.map((faq) => (
                    <div
                      key={faq.id}
                      className={`rounded-xl border p-4 transition-all ${
                        faq.active
                          ? "border-gray-100 hover:bg-gray-50"
                          : "border-gray-100 bg-gray-50/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="flex flex-col items-center gap-1 pt-0.5">
                            <GripVertical className="h-4 w-4 text-[#94A3B8]" />
                            <input
                              type="number"
                              value={faq.sortOrder}
                              onChange={(e) =>
                                updateSortOrder(faq, parseInt(e.target.value) || 0)
                              }
                              className="w-12 rounded-lg border border-gray-200 px-2 py-1 text-center text-xs text-[#475569] outline-none focus:border-[#FF4D30]"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() =>
                                setExpandedId(expandedId === faq.id ? null : faq.id)
                              }
                            >
                              <p className="font-medium text-[#0F172A] text-sm">
                                {faq.question}
                              </p>
                              {expandedId === faq.id ? (
                                <ChevronUp className="h-4 w-4 text-[#94A3B8] shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-[#94A3B8] shrink-0" />
                              )}
                            </div>
                            {expandedId === faq.id ? (
                              <p className="mt-2 text-sm text-[#64748B] whitespace-pre-wrap">
                                {faq.answer}
                              </p>
                            ) : (
                              <p className="mt-1 text-xs text-[#94A3B8] truncate">
                                {faq.answer.length > 120
                                  ? faq.answer.slice(0, 120) + "..."
                                  : faq.answer}
                              </p>
                            )}
                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                                  faq.active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {faq.active ? "Ativa" : "Inativa"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleActive(faq)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                            title={faq.active ? "Desativar" : "Ativar"}
                          >
                            {faq.active ? (
                              <ToggleRight className="h-5 w-5 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-5 w-5 text-[#94A3B8]" />
                            )}
                          </button>
                          <button
                            onClick={() => startEdit(faq)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569] transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteFaq(faq.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB: SEO                                                      */}
      {/* ============================================================ */}
      {activeTab === "seo" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F3]">
                <Search className="h-5 w-5 text-[#FF4D30]" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-[#0F172A]">
                  SEO da Página FAQ
                </CardTitle>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Configurações de otimização para mecanismos de busca
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                Meta Title
              </label>
              <input
                type="text"
                value={seo.seoTitle}
                onChange={(e) => setSeo({ ...seo, seoTitle: e.target.value })}
                placeholder="Perguntas Frequentes | Consulta Placa Brasil"
                maxLength={70}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              />
              <p className="mt-1 text-xs text-[#94A3B8]">
                {seo.seoTitle.length}/70 caracteres
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                Meta Description
              </label>
              <textarea
                value={seo.seoDescription}
                onChange={(e) => setSeo({ ...seo, seoDescription: e.target.value })}
                placeholder="Encontre respostas para as perguntas mais frequentes sobre consulta de placas..."
                maxLength={160}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all resize-none"
              />
              <p className="mt-1 text-xs text-[#94A3B8]">
                {seo.seoDescription.length}/160 caracteres
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                URL Canônica
              </label>
              <input
                type="url"
                value={seo.seoCanonical}
                onChange={(e) => setSeo({ ...seo, seoCanonical: e.target.value })}
                placeholder="https://consultaplacabrasil.com.br/faq"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                Diretivas para robôs
              </label>
              <select
                value={seo.seoRobots}
                onChange={(e) => setSeo({ ...seo, seoRobots: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              >
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
            <div className="pt-2">
              <Button
                onClick={saveSeo}
                disabled={saving}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Salvar SEO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ============================================================ */}
      {/* TAB: Open Graph                                               */}
      {/* ============================================================ */}
      {activeTab === "opengraph" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Share2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-[#0F172A]">
                  Open Graph
                </CardTitle>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Configurações para compartilhamento em redes sociais
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                og:title
              </label>
              <input
                type="text"
                value={seo.ogTitle}
                onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                placeholder="Perguntas Frequentes"
                maxLength={100}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              />
              <p className="mt-1 text-xs text-[#94A3B8]">{seo.ogTitle.length}/100 caracteres</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                og:description
              </label>
              <textarea
                value={seo.ogDescription}
                onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                placeholder="Tire suas dúvidas sobre consulta veicular..."
                maxLength={200}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all resize-none"
              />
              <p className="mt-1 text-xs text-[#94A3B8]">
                {seo.ogDescription.length}/200 caracteres
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                og:image
              </label>
              <input
                type="url"
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                placeholder="https://consultaplacabrasil.com.br/og-faq.png"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              />
              {seo.ogImage && (
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={seo.ogImage}
                    alt="OG Preview"
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                og:url
              </label>
              <input
                type="url"
                value={seo.ogUrl}
                onChange={(e) => setSeo({ ...seo, ogUrl: e.target.value })}
                placeholder="https://consultaplacabrasil.com.br/faq"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 transition-all"
              />
            </div>
            <div className="pt-2">
              <Button
                onClick={saveSeo}
                disabled={saving}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Salvar Open Graph
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ============================================================ */}
      {/* TAB: Schema                                                   */}
      {/* ============================================================ */}
      {activeTab === "schema" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <Code2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-[#0F172A]">
                  Schema FAQPage
                </CardTitle>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  JSON-LD gerado automaticamente a partir das FAQs ativas ({activeFaqs.length}{" "}
                  perguntas)
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeFaqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-8 w-8 text-[#94A3B8] mb-3" />
                <p className="text-sm font-medium text-[#475569]">
                  Nenhuma FAQ ativa encontrada
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Ative pelo menos uma pergunta para gerar o schema
                </p>
              </div>
            ) : (
              <div className="relative">
                <pre className="overflow-x-auto rounded-xl bg-[#0F172A] p-5 text-sm text-green-400 leading-relaxed">
                  <code>{JSON.stringify(faqSchema, null, 2)}</code>
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(faqSchema, null, 2));
                    flash("success", "Schema copiado!");
                  }}
                  className="absolute right-3 top-3 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition-colors"
                >
                  Copiar
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ============================================================ */}
      {/* TAB: Preview                                                  */}
      {/* ============================================================ */}
      {activeTab === "preview" && (
        <div className="space-y-6">
          {/* Google Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F3]">
                  <Globe className="h-5 w-5 text-[#FF4D30]" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-[#0F172A]">
                    Preview do Google
                  </CardTitle>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Como a página aparecerá nos resultados de busca
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="max-w-xl">
                  <p className="text-xs text-[#475569] mb-1">
                    {seo.seoCanonical || "https://consultaplacabrasil.com.br/faq"}
                  </p>
                  <h3 className="text-lg font-medium text-blue-700 hover:underline cursor-pointer leading-snug">
                    {seo.seoTitle || "Perguntas Frequentes | Consulta Placa Brasil"}
                  </h3>
                  <p className="mt-1 text-sm text-[#475569] leading-relaxed">
                    {seo.seoDescription ||
                      "Encontre respostas para as perguntas mais frequentes sobre consulta de placas veiculares no Brasil."}
                  </p>
                  {activeFaqs.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {activeFaqs.slice(0, 3).map((faq) => (
                        <div key={faq.id} className="flex items-center gap-2">
                          <ChevronDown className="h-3 w-3 text-[#94A3B8]" />
                          <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                            {faq.question}
                          </span>
                        </div>
                      ))}
                      {activeFaqs.length > 3 && (
                        <p className="text-xs text-[#94A3B8] pl-5">
                          +{activeFaqs.length - 3} perguntas
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Share2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-[#0F172A]">
                    Preview de Redes Sociais
                  </CardTitle>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Como a página aparecerá ao ser compartilhada
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {seo.ogImage ? (
                  <div className="h-52 bg-gray-100">
                    <img
                      src={seo.ogImage}
                      alt="OG Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#FF4D30]/10 to-[#FF4D30]/5">
                    <div className="text-center">
                      <HelpCircle className="mx-auto h-12 w-12 text-[#FF4D30]/30" />
                      <p className="mt-2 text-xs text-[#94A3B8]">Sem imagem configurada</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs uppercase text-[#94A3B8] tracking-wide">
                    {(() => {
                      try {
                        return new URL(seo.ogUrl || seo.seoCanonical || "https://consultaplacabrasil.com.br").hostname;
                      } catch {
                        return "consultaplacabrasil.com.br";
                      }
                    })()}
                  </p>
                  <h4 className="mt-1 font-semibold text-[#0F172A] leading-snug">
                    {seo.ogTitle || seo.seoTitle || "Perguntas Frequentes"}
                  </h4>
                  <p className="mt-1 text-sm text-[#64748B] line-clamp-2">
                    {seo.ogDescription ||
                      seo.seoDescription ||
                      "Tire suas dúvidas sobre consulta de placas veiculares no Brasil."}
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
