"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, UserPlus, Search, Pencil, X, Save, Loader2, Shield, Info,
  ChevronLeft, ChevronRight, Ban, CheckCircle2, Eye,
} from "lucide-react";
import Link from "next/link";
import { validatePasswordStrength } from "@/lib/utils/password-validator";

interface User {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string | null;
  role: "admin" | "editor" | "user";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const roleBadges: Record<string, { label: string; className: string }> = {
  admin: { label: "Admin", className: "bg-purple-100 text-purple-700" },
  editor: { label: "Atendente", className: "bg-blue-100 text-blue-700" },
  user: { label: "Cliente", className: "bg-gray-100 text-gray-700" },
};

const emptyForm = { name: "", email: "", password: "", role: "editor" as "admin" | "editor" | "user" };
const PAGE_SIZE = 15;

function fmtCpf(cpf: string | null) {
  if (!cpf) return "—";
  const c = cpf.replace(/\D/g, "");
  if (c.length === 11) return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (c.length === 14) return c.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | "admin" | "editor" | "user">("");
  const [statusFilter, setStatusFilter] = useState<"" | "ativo" | "inativo">("");
  const [periodFilter, setPeriodFilter] = useState<"" | "hoje" | "7" | "30">("");
  const [sortBy, setSortBy] = useState<"recentes" | "antigos" | "az" | "za">("recentes");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar usuários" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, roleFilter, statusFilter, periodFilter, sortBy]);

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
    if (!form.name || !form.email) { showMsg("error", "Nome e e-mail são obrigatórios"); return; }
    if (!editingId && !form.password) { showMsg("error", "A senha é obrigatória"); return; }
    if (form.password) {
      const err = validatePasswordStrength(form.password);
      if (err) { showMsg("error", err); return; }
    }

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, unknown> = { name: form.name, email: form.email, role: form.role };
      if (editingId) { payload.id = editingId; if (form.password) payload.password = form.password; }
      else payload.password = form.password;

      const res = await fetch("/api/admin/users", {
        method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Erro ao salvar"); }

      showMsg("success", editingId ? "Usuário atualizado" : "Usuário criado com sucesso");
      handleCancel();
      fetchUsers();
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(user: User) {
    const acao = user.active ? "desativar" : "reativar";
    if (!confirm(`Tem certeza que deseja ${acao} "${user.name}"?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, active: !user.active }),
      });
      if (!res.ok) throw new Error();
      showMsg("success", `Usuário ${user.active ? "desativado" : "reativado"} com sucesso`);
      fetchUsers();
    } catch {
      showMsg("error", `Erro ao ${acao} usuário`);
    }
  }

  // Filtros + ordenação
  const filtered = useMemo(() => {
    const t = searchTerm.toLowerCase().trim();
    let list = users.filter((u) => {
      const matchSearch = !t ||
        u.name.toLowerCase().includes(t) ||
        u.email.toLowerCase().includes(t) ||
        (u.cpfCnpj || "").toLowerCase().includes(t) ||
        u.id.toLowerCase().includes(t);
      const matchRole = roleFilter ? u.role === roleFilter : true;
      const matchStatus = statusFilter ? (statusFilter === "ativo" ? u.active : !u.active) : true;
      let matchPeriod = true;
      if (periodFilter) {
        const days = periodFilter === "hoje" ? 1 : Number(periodFilter);
        const since = Date.now() - days * 24 * 60 * 60 * 1000;
        matchPeriod = new Date(u.createdAt).getTime() >= since;
      }
      return matchSearch && matchRole && matchStatus && matchPeriod;
    });
    list = [...list].sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "za") return b.name.localeCompare(a.name);
      const da = new Date(a.createdAt).getTime(), dbt = new Date(b.createdAt).getTime();
      return sortBy === "antigos" ? da - dbt : dbt - da;
    });
    return list;
  }, [users, searchTerm, roleFilter, statusFilter, periodFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const editorCount = users.filter((u) => u.role === "editor").length;
  const inactiveCount = users.filter((u) => !u.active).length;

  function exportCsv() {
    const header = ["ID", "Nome", "Email", "CPF/CNPJ", "Tipo", "Status", "Cadastro"];
    const rows = filtered.map((u) => [
      u.id, u.name, u.email, u.cpfCnpj || "", u.role,
      u.active ? "Ativo" : "Inativo", new Date(u.createdAt).toLocaleDateString("pt-BR"),
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `usuarios-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Usuários</h1>
          <p className="text-sm text-[#64748B]">{users.length} usuários cadastrados</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={exportCsv} className="w-full sm:w-auto gap-2">
            Exportar CSV
          </Button>
          <Button onClick={handleNew} className="w-full sm:w-auto bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
            <UserPlus className="h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>{message.text}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total", value: users.length, color: "bg-blue-100", ic: "text-blue-600", Icon: Users },
          { label: "Administradores", value: adminCount, color: "bg-purple-100", ic: "text-purple-600", Icon: Shield },
          { label: "Atendentes", value: editorCount, color: "bg-green-100", ic: "text-green-600", Icon: UserPlus },
          { label: "Inativos", value: inactiveCount, color: "bg-red-100", ic: "text-red-600", Icon: Ban },
        ].map(({ label, value, color, ic, Icon }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon className={`h-5 w-5 ${ic}`} /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{value}</p><p className="text-xs text-[#94A3B8]">{label}</p></div>
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
              <button onClick={handleCancel} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"><X className="h-4 w-4" /></button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nome completo</label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nome e Sobrenome" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">E-mail</label>
                <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@exemplo.com" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  {editingId ? "Alterar senha" : "Senha"} {editingId && <span className="text-xs font-normal text-[#94A3B8]">(deixe vazio para manter)</span>}
                </label>
                <Input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder={editingId ? "Nova senha (opcional)" : "Maiúscula, número e especial"} />
                {form.password && (() => {
                  const err = validatePasswordStrength(form.password);
                  return err ? <p className="text-xs text-red-500 mt-1">{err}</p> : <p className="text-xs text-green-600 mt-1">Senha forte ✓</p>;
                })()}
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Tipo</label>
                <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "admin" | "editor" }))} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30]">
                  <option value="admin">Administrador</option>
                  <option value="editor">Atendente</option>
                </select>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">Atendentes acessam apenas consultas de clientes. Administradores têm acesso completo.</p>
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

      {/* Lista + filtros */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input placeholder="Buscar por nome, e-mail, CPF ou ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#475569]">
                <option value="">Todos os tipos</option>
                <option value="admin">Administradores</option>
                <option value="editor">Atendentes</option>
                <option value="user">Clientes</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#475569]">
                <option value="">Todos os status</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
              <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value as typeof periodFilter)} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#475569]">
                <option value="">Qualquer data</option>
                <option value="hoje">Hoje</option>
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-[#475569]">
                <option value="recentes">Mais recentes</option>
                <option value="antigos">Mais antigos</option>
                <option value="az">Nome (A-Z)</option>
                <option value="za">Nome (Z-A)</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12"><Users className="h-12 w-12 text-[#94A3B8] mb-3" /><p className="text-[#475569] font-medium">Nenhum usuário encontrado</p></div>
          ) : (
            <>
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8] hidden md:table-cell">CPF/CNPJ</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8] hidden lg:table-cell whitespace-nowrap">Cadastro</th>
                      <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((user) => {
                      const badge = roleBadges[user.role] || roleBadges.user;
                      return (
                        <tr key={user.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${!user.active ? "opacity-60" : ""}`}>
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-xs font-semibold shrink-0">
                                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                              </div>
                              <div><p className="font-medium text-[#0F172A]">{user.name}</p><p className="text-xs text-[#94A3B8]">{user.email}</p></div>
                            </div>
                          </td>
                          <td className="py-3 text-[#475569] hidden md:table-cell font-mono text-xs">{fmtCpf(user.cpfCnpj)}</td>
                          <td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>{badge.label}</span></td>
                          <td className="py-3">
                            {user.active
                              ? <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700"><CheckCircle2 className="h-3 w-3" /> Ativo</span>
                              : <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700"><Ban className="h-3 w-3" /> Inativo</span>}
                          </td>
                          <td className="py-3 text-[#475569] hidden lg:table-cell whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString("pt-BR")}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/admin/clientes/${user.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]" title="Ver detalhes e histórico"><Eye className="h-4 w-4" /></Link>
                              <button onClick={() => handleEdit(user)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]" title="Editar / Alterar senha"><Pencil className="h-4 w-4" /></button>
                              <button
                                onClick={() => toggleActive(user)}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${user.active ? "hover:bg-red-50 text-red-500" : "hover:bg-green-50 text-green-600"}`}
                                title={user.active ? "Desativar" : "Reativar"}
                              >
                                {user.active ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 mt-4">
                  <p className="text-xs text-[#94A3B8]">Página {currentPage} de {totalPages} · {filtered.length} registros</p>
                  <div className="flex flex-wrap items-center gap-1">
                    <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page = i + 1;
                      if (totalPages > 5) { if (currentPage > 3) page = currentPage - 2 + i; if (page > totalPages) page = totalPages - 4 + i; }
                      return (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${currentPage === page ? "bg-[#FF4D30] text-white" : "border border-gray-200 hover:bg-gray-50 text-[#475569]"}`}>{page}</button>
                      );
                    })}
                    <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
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
