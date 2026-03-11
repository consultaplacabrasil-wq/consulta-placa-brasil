"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  Loader2,
  XCircle,
} from "lucide-react";

interface Payment {
  id: string;
  amount: string;
  method: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
  userName: string | null;
  userEmail: string | null;
}

interface PaymentsData {
  stats: {
    revenue: number;
    ticketMedio: number;
    pending: number;
    refunds: number;
    cancelled: number;
  };
  payments: Payment[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
  received: { label: "Recebido", class: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
  refunded: { label: "Reembolsado", class: "bg-purple-100 text-purple-700" },
  overdue: { label: "Vencido", class: "bg-orange-100 text-orange-700" },
  chargeback: { label: "Chargeback", class: "bg-red-100 text-red-700" },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatMethod(method: string) {
  const map: Record<string, string> = { pix: "Pix", credit_card: "Cartão de Crédito", debit_card: "Cartão de Débito" };
  return map[method] || method;
}

export default function AdminPagamentosPage() {
  const [data, setData] = useState<PaymentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (searchTerm) params.set("search", searchTerm);
      const res = await fetch(`/api/admin/payments?${params}`);
      if (res.ok) setData(await res.json());
    } catch {
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  }

  const stats = data?.stats;
  const payments = data?.payments || [];
  const pagination = data?.pagination;

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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{formatCurrency(stats?.revenue || 0)}</p>
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
              <p className="text-xl font-bold text-[#0F172A]">{formatCurrency(stats?.ticketMedio || 0)}</p>
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
              <p className="text-xl font-bold text-[#0F172A]">{stats?.pending || 0}</p>
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
              <p className="text-xl font-bold text-[#0F172A]">{stats?.refunds || 0}</p>
              <p className="text-xs text-[#94A3B8]">Reembolsos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{stats?.cancelled || 0}</p>
              <p className="text-xs text-[#94A3B8]">Cancelados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Histórico de Pagamentos</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                placeholder="Buscar por nome, e-mail ou ID..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#FF4D30]" />
            </div>
          ) : payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <DollarSign className="h-10 w-10 text-[#94A3B8] mb-3" />
              <p className="text-sm font-medium text-[#475569]">Nenhum pagamento encontrado</p>
              <p className="text-xs text-[#94A3B8] mt-1">Os pagamentos realizados aparecerão aqui</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">ID</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Método</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Valor</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                      <th className="pb-3 text-right font-medium text-[#94A3B8]">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => {
                      const st = statusMap[p.status] || statusMap.pending;
                      return (
                        <tr key={p.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-mono text-xs text-[#475569]">{p.id.slice(0, 8)}</td>
                          <td className="py-3">
                            <p className="text-[#0F172A]">{p.userName || "Anônimo"}</p>
                            {p.userEmail && <p className="text-xs text-[#94A3B8]">{p.userEmail}</p>}
                          </td>
                          <td className="py-3 text-[#475569]">{formatMethod(p.method)}</td>
                          <td className="py-3 font-semibold text-[#0F172A]">{formatCurrency(parseFloat(p.amount))}</td>
                          <td className="py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>{st.label}</span>
                          </td>
                          <td className="py-3 text-xs text-[#475569]">{formatDate(p.createdAt)}</td>
                          <td className="py-3 text-right">
                            <Link
                              href={`/admin/pagamentos/${p.id}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569] ml-auto"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                  <p className="text-sm text-[#94A3B8]">
                    Página {pagination.page} de {pagination.totalPages} ({pagination.total} registros)
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4D30] text-white text-sm font-medium">
                      {page}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 disabled:opacity-50"
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
