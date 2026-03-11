"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Tag,
  FolderOpen,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
}

export default function BlogCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      }
    } catch {
      showMsg("error", "Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  function handleNew() {
    setEditingId(null);
    setFormName("");
    setFormDescription("");
    setShowForm(true);
  }

  function handleEdit(cat: Category) {
    setEditingId(cat.id);
    setFormName(cat.name);
    setFormDescription(cat.description || "");
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFormName("");
    setFormDescription("");
  }

  async function handleSave() {
    if (!formName.trim()) {
      showMsg("error", "O nome da categoria é obrigatório");
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, string> = {
        name: formName.trim(),
        description: formDescription.trim(),
      };
      if (editingId) payload.id = editingId;

      const res = await fetch("/api/admin/blog/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      showMsg(
        "success",
        editingId
          ? "Categoria atualizada com sucesso"
          : "Categoria criada com sucesso"
      );
      handleCancel();
      fetchCategories();
    } catch (err) {
      showMsg(
        "error",
        err instanceof Error ? err.message : "Erro ao salvar categoria"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${name}"?`))
      return;

    try {
      const res = await fetch(`/api/admin/blog/categories?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir");
      showMsg("success", "Categoria excluída com sucesso");
      fetchCategories();
    } catch {
      showMsg("error", "Erro ao excluir categoria");
    }
  }

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
            <h1 className="text-2xl font-bold text-[#0F172A]">Categorias</h1>
            <p className="text-sm text-[#64748B]">
              Gerencie as categorias do blog
            </p>
          </div>
        </div>
        <button
          onClick={handleNew}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A]"
        >
          <Plus className="h-4 w-4" />
          Nova Categoria
        </button>
      </div>

      {/* Feedback */}
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {categories.length}
              </p>
              <p className="text-xs text-[#94A3B8]">Total de categorias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm border-l-4 border-l-[#FF4D30]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#0F172A] flex items-center gap-2">
              <Tag className="h-5 w-5 text-[#FF4D30]" />
              {editingId ? "Editar Categoria" : "Nova Categoria"}
            </h3>
            <button
              onClick={handleCancel}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Nome *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nome da categoria"
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Descrição
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Descrição da categoria (opcional)"
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D30] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E8432A] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {editingId ? "Atualizar" : "Criar Categoria"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Lista de Categorias
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="mb-3 h-10 w-10 text-[#94A3B8]" />
            <p className="text-sm font-medium text-[#475569]">
              Nenhuma categoria cadastrada
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Crie sua primeira categoria clicando em &quot;Nova Categoria&quot;
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 pb-3 pt-4 text-left font-medium text-[#94A3B8]">
                    Nome
                  </th>
                  <th className="px-4 pb-3 pt-4 text-left font-medium text-[#94A3B8]">
                    Slug
                  </th>
                  <th className="px-4 pb-3 pt-4 text-left font-medium text-[#94A3B8] hidden sm:table-cell">
                    Descrição
                  </th>
                  <th className="px-4 pb-3 pt-4 text-left font-medium text-[#94A3B8] hidden sm:table-cell">
                    Criação
                  </th>
                  <th className="px-4 pb-3 pt-4 text-right font-medium text-[#94A3B8]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                          <Tag className="h-3.5 w-3.5 text-blue-600" />
                        </span>
                        <span className="font-medium text-[#0F172A]">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#94A3B8]">
                      {cat.slug}
                    </td>
                    <td className="px-4 py-3 text-[#475569] hidden sm:table-cell">
                      <span className="line-clamp-1">
                        {cat.description || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#475569] hidden sm:table-cell">
                      {new Date(cat.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
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
        )}
      </div>
    </div>
  );
}
