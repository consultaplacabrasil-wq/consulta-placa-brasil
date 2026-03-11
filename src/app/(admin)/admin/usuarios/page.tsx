"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Shield,
  Info,
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

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
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

    if (!editingId) {
      if (!form.password) {
        showMsg("error", "A senha é obrigatória");
        return;
      }
      const passwordError = validatePasswordStrength(form.password);
      if (passwordError) {
        showMsg("error", passwordError);
        return;
      }
    }

    if (editingId && form.password) {
      const passwordError = validatePasswordStrength(form.password);
      if (passwordError) {
        showMsg("error", passwordError);
        return;
      }
    }

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (editingId) {
        payload.id = editingId;
        if (form.password) {
          payload.password = form.password;
        }
      } else {
        payload.password = form.password;
      }

      const res = await fetch("/api/admin/users", {
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
        editingId ? "Usuário atualizado com sucesso" : "Usuário criado com sucesso"
      );
      handleCancel();
      fetchUsers();
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar usuário");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      showMsg("success", "Usuário excluído com sucesso");
      fetchUsers();
    } catch {
      showMsg("error", "Erro ao excluir usuário");
    }
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminCount = users.filter((u) => u.role === "admin").length;
  const editorCount = users.filter((u) => u.role === "editor").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Usuários</h1>
          <p className="text-sm text-[#64748B]">{users.length} usuários cadastrados</p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Adicionar Usuário
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{users.length}</p>
              <p className="text-xs text-[#94A3B8]">Total de usuários</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{adminCount}</p>
              <p className="text-xs text-[#94A3B8]">Administradores</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{editorCount}</p>
              <p className="text-xs text-[#94A3B8]">Atendentes</p>
            </div>
          </CardContent>
        </Card>
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
              <button
                onClick={handleCancel}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nome</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nome completo"
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
                  placeholder={editingId ? "Nova senha (opcional)" : "Mínimo 8 caracteres"}
                />
                {form.password && form.password.length > 0 && (() => {
                  const err = validatePasswordStrength(form.password);
                  return err ? <p className="text-xs text-red-500 mt-1">{err}</p> : null;
                })()}
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Tipo</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value as "admin" | "editor" }))
                  }
                  className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]"
                >
                  <option value="admin">Administrador</option>
                  <option value="editor">Atendente</option>
                </select>
              </div>
            </div>

            {/* Atendente permissions note */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Permissões de Atendente</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Atendentes podem acessar: consultas de clientes e editar seu próprio perfil
                    (nome, e-mail e senha). Não têm acesso a outras áreas do painel.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {editingId ? "Atualizar" : "Criar Usuário"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Lista de Usuários</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
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
              <p className="text-[#475569] font-medium">
                {searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Cadastro</th>
                    <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => {
                    const badge = roleBadges[user.role] || roleBadges.user;
                    return (
                      <tr key={user.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-xs font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-[#0F172A]">{user.name}</p>
                              <p className="text-xs text-[#94A3B8]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-3 text-[#475569]">
                          {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleEdit(user)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id, user.name)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500"
                              title="Excluir"
                            >
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
