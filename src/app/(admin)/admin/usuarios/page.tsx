"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  Shield,
  Ban,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mockUsers = [
  { id: "1", name: "Carlos Mendes", email: "carlos@email.com", role: "user", credits: 5, consultas: 12, status: "active", createdAt: "05/03/2026" },
  { id: "2", name: "Ana Paula Santos", email: "ana@loja.com", role: "partner", credits: 48, consultas: 234, status: "active", createdAt: "20/02/2026" },
  { id: "3", name: "Roberto Lima", email: "roberto@email.com", role: "user", credits: 0, consultas: 3, status: "active", createdAt: "01/03/2026" },
  { id: "4", name: "Maria Ferreira", email: "maria@email.com", role: "user", credits: 2, consultas: 7, status: "active", createdAt: "15/02/2026" },
  { id: "5", name: "João Pereira", email: "joao@revenda.com", role: "partner", credits: 120, consultas: 567, status: "active", createdAt: "10/01/2026" },
  { id: "6", name: "Lucia Oliveira", email: "lucia@email.com", role: "user", credits: 0, consultas: 1, status: "blocked", createdAt: "28/02/2026" },
  { id: "7", name: "Pedro Costa", email: "pedro@email.com", role: "user", credits: 10, consultas: 25, status: "active", createdAt: "22/02/2026" },
  { id: "8", name: "Fernanda Souza", email: "fernanda@email.com", role: "user", credits: 0, consultas: 0, status: "active", createdAt: "07/03/2026" },
];

const roleMap = {
  user: { label: "Usuário", class: "bg-gray-100 text-gray-700" },
  partner: { label: "Parceiro", class: "bg-blue-100 text-blue-700" },
  admin: { label: "Admin", class: "bg-purple-100 text-purple-700" },
};

const statusMap = {
  active: { label: "Ativo", class: "bg-green-100 text-green-700" },
  blocked: { label: "Bloqueado", class: "bg-red-100 text-red-700" },
};

export default function AdminUsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Usuários</h1>
          <p className="text-sm text-[#64748B]">{mockUsers.length} usuários cadastrados</p>
        </div>
        <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
          <UserPlus className="h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">1.234</p>
              <p className="text-xs text-[#94A3B8]">Total de usuários</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">47</p>
              <p className="text-xs text-[#94A3B8]">Parceiros ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <UserPlus className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">89</p>
              <p className="text-xs text-[#94A3B8]">Novos esta semana</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Créditos</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Consultas</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Cadastro</th>
                  <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const role = roleMap[user.role as keyof typeof roleMap];
                  const status = statusMap[user.status as keyof typeof statusMap];
                  return (
                    <tr key={user.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-xs font-semibold">
                            {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-[#0F172A]">{user.name}</p>
                            <p className="text-xs text-[#94A3B8]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${role.class}`}>
                          {role.label}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-[#0F172A]">{user.credits}</td>
                      <td className="py-3 text-[#475569]">{user.consultas}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 text-[#475569]">{user.createdAt}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500">
                            <Ban className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-[#94A3B8]">Mostrando 1-8 de 1.234</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4D30] text-white text-sm font-medium">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 text-sm">2</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 text-sm">3</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
