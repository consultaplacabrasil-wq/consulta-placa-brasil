"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, UserPlus, Search, Pencil, Trash2, X, Save,
  Loader2, Shield, Info, ChevronLeft, ChevronRight,
} from "lucide-react";
import { validatePasswordStrength } from "@/lib/utils/password-validator";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  createdAt: string;
  updatedAt: string;
}

const roleBadges: Record<string, { label: string; className: string }> = {
  admin: { label: "Admin", className: "bg-purple-100 text-purple-700" },
  editor: { label: "Atendente", className: "bg-blue-100 text-blue-700" },
  user: { label: "Usuário", className: "bg-gray-100 text-gray-700" },
};

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "editor" as "admin" | "editor" | "user",
};

const PAGE_SIZE = 15;

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | "admin" | "editor" | "user">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsers(data);
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar usuários" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, roleFilter]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  function handleNew() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  async function handleSave() {
    if (!form.name || !form.email) {
      showMsg("error", "Nome e e-mail são obrigatórios");
      return;
    }
    if (!editingId && !form.password) {
      showMsg("error", "A senha é obrigatória");
      return;
    }
    if (form.password) {
      const passwordError = validatePasswordStrength(form.password);
      if (passwordError) { showMsg("error", passwordError); return; }
    }

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, unknown> = { name: form.name, email: form.email, role: form.role };
      if (editingId) { payload.id = editingId; if (form.password) payload.password = form.password; }
      else payload.password = form.password;

      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      showMsg("success", editingId ? "Usuário atualizado" : "Usuário criado com sucesso");
      handleCancel();
      fetchUsers();
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar usuário");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      showMsg("success", "Usuário excluído");
      fetchUsers();
    } catch {
      showMsg("error", "Erro ao excluir usuário");
    }
  }

  // Filtros
  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const editorCount = users.filter((u) => u.role === "editor").length;
  const userCount = users.filter((u) => u.role === "user").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Usuários</h1>
          <p className="text-sm text-[#64748B]">{users.length} usuários cadastrados</p>
        </div>
        <Button onClick={handleNew} className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
          <UserPlus className="h-4 w-4" /> Adicionar Usuário
        </Button>
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm font-medium ${
          message.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: users.length, color: "bg-blue-100", iconColor: "text-blue-600", icon: Users },
          { label: "Administradores", value: adminCount, color: "bg-purple-100", iconColor: "text-purple-600", icon: Shield },
          { label: "Atendentes", value: editorCount, color: "bg-green-100", iconColor: "text-green-600", icon: UserPlus },
          { label: "Clientes", value: userCount, color: "bg-orange-100", iconColor: "text-orange-600", icon: Users },
        ].map(({ label, value, color, iconColor, icon: Icon }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F172A]">{value}</p>
                <p className="text-xs text-[#94A3B8]">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-0 shadow-sm border-l-4 border-l-[#FF4D30]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[#FF4D30]" />
                {editingId ? "Editar Usuário" : "Novo Usuário"}
              </CardTitle>
              <button onClick={handleCancel} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]">
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nome completo</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nome e Sobrenome"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">E-mail</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Senha {editingId && <span className="text-xs font-normal text-[#94A3B8]">(deixe vazio para manter)</span>}
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder={editingId ? "Nova senha (opcional)" : "Maiúscula, número e especial"}
                />
                {form.password && (() => {
                  const err = validatePasswordStrength(form.password);
                  return err ? <p className="text-xs text-red-500 mt-1">{err}</p> : <p className="text-xs text-green-600 mt-1">Senha forte ✓</p>;
                })()}
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Tipo</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "admin" | "editor" }))}
                  className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]"
                >
                  <option value="admin">Administrador</option>
                  <option value="editor">Atendente</option>
                </select>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">Atendentes acessam apenas consultas de clientes. Administradores têm acesso completo ao painel.</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {editingId ? "Atualizar" : "Criar Usuário"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">
              Lista de Usuários
              {filtered.length !== users.length && (
                <span className="ml-2 text-xs font-normal text-[#94A3B8]">
                  ({filtered.length} de {users.length})
                </span>
              )}
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              {/* Filtro por role */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
                className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]"
              >
                <option value="">Todos os tipos</option>
                <option value="admin">Administradores</option>
                <option value="editor">Atendentes</option>
                <option value="user">Clientes</option>
              </select>
              {/* Busca */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-[#94A3B8] mb-3" />
              <p className="text-[#475569] font-medium">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8] hidden sm:table-cell">Cadastro</th>
                      <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((user) => {
                      const badge = roleBadges[user.role] || roleBadges.user;
                      return (
                        <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-xs font-semibold shrink-0">
                                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-[#0F172A]">{user.name}</p>
                                <p className="text-xs text-[#94A3B8]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="py-3 text-[#475569] hidden sm:table-cell">
                            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleEdit(user)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]" title="Editar">
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleDelete(user.id, user.name)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500" title="Excluir">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                  <p className="text-xs text-[#94A3B8]">
                    Página {currentPage} de {totalPages} · {filtered.length} registros
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page = i + 1;
                      if (totalPages > 5) {
                        if (currentPage > 3) page = currentPage - 2 + i;
                        if (page > totalPages) page = totalPages - 4 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                            currentPage === page
                              ? "bg-[#FF4D30] text-white"
                              : "border border-gray-200 hover:bg-gray-50 text-[#475569]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
