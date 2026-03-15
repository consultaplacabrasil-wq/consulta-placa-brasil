"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Link2,
  Plus,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";

interface LinkInterno {
  id: string;
  url: string;
  anchors: string[];
  ativo: boolean;
  peso: number;
}

interface FormData {
  url: string;
  anchorsText: string;
  peso: number;
}

const emptyForm: FormData = { url: "", anchorsText: "", peso: 1 };

export default function AdminLinksInternosPage() {
  const [links, setLinks] = useState<LinkInterno[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormData>(emptyForm);
  const [editSaving, setEditSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/noticias/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch {
      console.error("Erro ao buscar links");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  function parseAnchors(text: string): string[] {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  async function handleCreate() {
    const anchors = parseAnchors(form.anchorsText);
    if (!form.url.trim() || anchors.length === 0) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/noticias/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: form.url.trim(),
          anchors,
          peso: form.peso,
        }),
      });
      if (res.ok) {
        setForm(emptyForm);
        setShowForm(false);
        await fetchLinks();
      }
    } catch {
      console.error("Erro ao criar link");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(link: LinkInterno) {
    setEditingId(link.id);
    setEditForm({
      url: link.url,
      anchorsText: link.anchors.join("\n"),
      peso: link.peso,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyForm);
  }

  async function handleUpdate(id: string) {
    const anchors = parseAnchors(editForm.anchorsText);
    if (!editForm.url.trim() || anchors.length === 0) return;

    setEditSaving(true);
    try {
      const res = await fetch("/api/admin/noticias/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          url: editForm.url.trim(),
          anchors,
          peso: editForm.peso,
        }),
      });
      if (res.ok) {
        setEditingId(null);
        setEditForm(emptyForm);
        await fetchLinks();
      }
    } catch {
      console.error("Erro ao atualizar link");
    } finally {
      setEditSaving(false);
    }
  }

  async function handleToggleAtivo(link: LinkInterno) {
    setTogglingId(link.id);
    try {
      const res = await fetch("/api/admin/noticias/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: link.id, ativo: !link.ativo }),
      });
      if (res.ok) {
        setLinks((prev) =>
          prev.map((l) =>
            l.id === link.id ? { ...l, ativo: !l.ativo } : l
          )
        );
      }
    } catch {
      console.error("Erro ao alterar status");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/noticias/links?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLinks((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      console.error("Erro ao deletar link");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/noticias"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#475569] transition-colors hover:bg-gray-50"
            title="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-[#FF4D30]" />
              <h1 className="text-2xl font-bold text-[#0F172A]">
                Links Internos SEO
              </h1>
            </div>
            <p className="mt-0.5 text-sm text-[#64748B]">
              Gerencie os links e textos âncora usados nas notícias automáticas
            </p>
          </div>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setForm(emptyForm);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A]"
          >
            <Plus className="h-4 w-4" />
            Adicionar Link
          </button>
        )}
      </div>

      {/* Inline Create Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-bold text-[#0F172A]">
            Novo Link Interno
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                URL de destino
              </label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://consultaplacabrasil.com/ferramentas/..."
                className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                Textos âncora (um por linha)
              </label>
              <textarea
                value={form.anchorsText}
                onChange={(e) =>
                  setForm({ ...form, anchorsText: e.target.value })
                }
                placeholder={"consulta fipe\ntabela fipe por placa\nvalor do veículo"}
                rows={4}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                Peso (1-5)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={form.peso}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) {
                    setForm({ ...form, peso: Math.min(5, Math.max(1, val)) });
                  }
                }}
                className="h-9 w-20 rounded-lg border border-gray-200 bg-white px-3 text-center text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCreate}
                disabled={saving || !form.url.trim() || !form.anchorsText.trim()}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  saving || !form.url.trim() || !form.anchorsText.trim()
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-[#FF4D30] text-white hover:bg-[#E8432A]"
                }`}
              >
                <Save className="h-4 w-4" />
                {saving ? "Salvando..." : "Salvar"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#FF4D30]" />
        </div>
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <Link2 className="mb-3 h-10 w-10 text-[#94A3B8]" />
          <p className="text-sm font-medium text-[#475569]">
            Nenhum link interno cadastrado
          </p>
          <p className="mt-1 text-xs text-[#94A3B8]">
            Adicione links para serem inseridos automaticamente nas notícias
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => {
            const isEditing = editingId === link.id;
            const isDeleting = deletingId === link.id;
            const isConfirmingDelete = confirmDeleteId === link.id;
            const isToggling = togglingId === link.id;

            if (isEditing) {
              return (
                <div
                  key={link.id}
                  className="rounded-xl border border-[#FF4D30]/30 bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-4 text-sm font-bold text-[#0F172A]">
                    Editando Link
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                        URL de destino
                      </label>
                      <input
                        type="text"
                        value={editForm.url}
                        onChange={(e) =>
                          setEditForm({ ...editForm, url: e.target.value })
                        }
                        className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                        Textos âncora (um por linha)
                      </label>
                      <textarea
                        value={editForm.anchorsText}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            anchorsText: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                        Peso (1-5)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editForm.peso}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setEditForm({
                              ...editForm,
                              peso: Math.min(5, Math.max(1, val)),
                            });
                          }
                        }}
                        className="h-9 w-20 rounded-lg border border-gray-200 bg-white px-3 text-center text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleUpdate(link.id)}
                        disabled={
                          editSaving ||
                          !editForm.url.trim() ||
                          !editForm.anchorsText.trim()
                        }
                        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          editSaving ||
                          !editForm.url.trim() ||
                          !editForm.anchorsText.trim()
                            ? "cursor-not-allowed bg-gray-200 text-gray-400"
                            : "bg-[#FF4D30] text-white hover:bg-[#E8432A]"
                        }`}
                      >
                        <Save className="h-4 w-4" />
                        {editSaving ? "Salvando..." : "Salvar"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
                      >
                        <X className="h-4 w-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={link.id}
                className={`rounded-xl border bg-white shadow-sm ${
                  link.ativo ? "border-gray-100" : "border-gray-100 opacity-60"
                }`}
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: URL + anchors + peso */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                          link.ativo ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <span
                        className="truncate text-sm font-medium text-[#0F172A]"
                        title={link.url}
                      >
                        {link.url}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {link.anchors.map((anchor, i) => (
                        <span
                          key={i}
                          className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                        >
                          {anchor}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <span>Peso:</span>
                      <span className="font-medium text-[#475569]">
                        {link.peso}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    {/* Ativo toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={link.ativo}
                      disabled={isToggling}
                      onClick={() => handleToggleAtivo(link)}
                      title={link.ativo ? "Desativar" : "Ativar"}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF4D30] focus:ring-offset-2 ${
                        link.ativo ? "bg-[#FF4D30]" : "bg-gray-200"
                      } ${isToggling ? "opacity-50" : ""}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          link.ativo ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => startEdit(link)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#475569] transition-colors hover:bg-gray-50"
                      title="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete button */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(link.id)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                        >
                          {isDeleting ? "Excluindo..." : "Confirmar"}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#475569] transition-colors hover:bg-gray-50"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(link.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-500 transition-colors hover:bg-red-50"
                        title="Excluir"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
