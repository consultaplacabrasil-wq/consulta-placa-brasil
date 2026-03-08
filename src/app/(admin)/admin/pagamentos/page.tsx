"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Search,
  TrendingUp,
  Clock,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const payments = [
  { id: "PAY-2026-001", user: "Carlos Mendes", email: "carlos@email.com", plate: "ABC1D23", type: "Premium", method: "Pix", amount: "R$ 39,90", status: "confirmed", date: "08/03/2026 14:32" },
  { id: "PAY-2026-002", user: "Ana Paula Santos", email: "ana@loja.com", plate: "XYZ9A87", type: "Completo", method: "Cartão", amount: "R$ 24,90", status: "confirmed", date: "08/03/2026 13:15" },
  { id: "PAY-2026-003", user: "Roberto Lima", email: "roberto@email.com", plate: "DEF4G56", type: "Completo", method: "Pix", amount: "R$ 24,90", status: "pending", date: "08/03/2026 12:48" },
  { id: "PAY-2026-004", user: "Maria Ferreira", email: "maria@email.com", plate: "GHI7H89", type: "Premium", method: "Cartão", amount: "R$ 39,90", status: "confirmed", date: "07/03/2026 18:22" },
  { id: "PAY-2026-005", user: "João Pereira", email: "joao@revenda.com", plate: "JKL2M34", type: "Pacote 500", method: "Pix", amount: "R$ 425,00", status: "confirmed", date: "07/03/2026 16:05" },
  { id: "PAY-2026-006", user: "Lucia Oliveira", email: "lucia@email.com", plate: "MNO5P67", type: "Completo", method: "Pix", amount: "R$ 24,90", status: "cancelled", date: "07/03/2026 11:30" },
  { id: "PAY-2026-007", user: "Pedro Costa", email: "pedro@email.com", plate: "QRS8T90", type: "Premium", method: "Cartão", amount: "R$ 39,90", status: "refunded", date: "06/03/2026 09:45" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
  refunded: { label: "Reembolsado", class: "bg-purple-100 text-purple-700" },
};

export default function AdminPagamentosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = payments.filter(
    (p) =>
      p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Pagamentos</h1>
          <p className="text-sm text-[#64748B]">Gerencie todos os pagamentos da plataforma</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">R$ 12.450</p>
              <p className="text-xs text-[#94A3B8]">Receita do mês</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">R$ 32,40</p>
              <p className="text-xs text-[#94A3B8]">Ticket médio</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">23</p>
              <p className="text-xs text-[#94A3B8]">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <RefreshCw className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">4</p>
              <p className="text-xs text-[#94A3B8]">Reembolsos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Histórico de Pagamentos</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input placeholder="Buscar por ID, nome ou placa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">ID</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Produto</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Método</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Valor</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                  <th className="pb-3 text-right font-medium text-[#94A3B8]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const st = statusMap[p.status] || statusMap.pending;
                  return (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 font-mono text-xs text-[#475569]">{p.id}</td>
                      <td className="py-3">
                        <p className="text-[#0F172A]">{p.user}</p>
                        <p className="text-xs text-[#94A3B8]">{p.email}</p>
                      </td>
                      <td className="py-3 font-mono font-semibold text-[#FF4D30]">{p.plate}</td>
                      <td className="py-3 text-[#475569]">{p.type}</td>
                      <td className="py-3 text-[#475569]">{p.method}</td>
                      <td className="py-3 font-semibold text-[#0F172A]">{p.amount}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>{st.label}</span>
                      </td>
                      <td className="py-3 text-xs text-[#475569]">{p.date}</td>
                      <td className="py-3 text-right">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569] ml-auto">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-[#94A3B8]">Mostrando 1-7 de 384</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4D30] text-white text-sm font-medium">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 text-sm">2</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 text-sm">3</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
