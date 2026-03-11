"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Activity,
  Clock,
  Loader2,
} from "lucide-react";

interface Consulta {
  id: string;
  plate: string;
  reportType: string;
  status: string;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
}

interface ConsultasData {
  stats: { totalMonth: number; successRate: string; total: number };
  consultas: Consulta[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const statusMap: Record<string, { label: string; class: string }> = {
  pending_payment: { label: "Aguardando", class: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Processando", class: "bg-blue-100 text-blue-700" },
  completed: { label: "Concluída", class: "bg-green-100 text-green-700" },
  failed: { label: "Falhou", class: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelada", class: "bg-gray-100 text-gray-700" },
};

const typeMap: Record<string, { label: string; class: string }> = {
  basic: { label: "Básico", class: "bg-gray-100 text-gray-700" },
  complete: { label: "Completo", class: "bg-[#FFF5F3] text-[#FF4D30]" },
  premium: { label: "Premium", class: "bg-[#EEF2FF] text-[#0F172A]" },
};

export default function AdminConsultasPage() {
  const [data, setData] = useState<ConsultasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (searchTerm) params.set("search", searchTerm);
      const res = await fetch(`/api/admin/consultas?${params}`);
      if (res.ok) {
        const d = await res.json();
        setData(d);
      }
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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const stats = data?.stats;
  const consultas = data?.consultas || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Consultas</h1>
        <p className="text-sm text-[#64748B]">Monitore todas as consultas realizadas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {stats?.totalMonth?.toLocaleString("pt-BR") || "0"}
              </p>
              <p className="text-xs text-[#94A3B8]">Total este mês</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{stats?.successRate || "0.0"}%</p>
              <p className="text-xs text-[#94A3B8]">Taxa de sucesso</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">
                {(stats?.total || 0).toLocaleString("pt-BR")}
              </p>
              <p className="text-xs text-[#94A3B8]">Total geral</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Histórico de Consultas</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                placeholder="Buscar por placa, nome, e-mail, CPF..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
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
          ) : consultas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-10 w-10 text-[#94A3B8] mb-3" />
              <p className="text-sm font-medium text-[#475569]">Nenhuma consulta encontrada</p>
              <p className="text-xs text-[#94A3B8] mt-1">As consultas realizadas aparecerão aqui</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                      <th className="pb-3 text-right font-medium text-[#94A3B8]">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultas.map((c) => {
                      const st = statusMap[c.status] || statusMap.completed;
                      const tp = typeMap[c.reportType] || typeMap.basic;
                      return (
                        <tr key={c.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-mono font-semibold text-[#FF4D30]">{c.plate}</td>
                          <td className="py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tp.class}`}>
                              {tp.label}
                            </span>
                          </td>
                          <td className="py-3">
                            <p className="text-[#0F172A]">{c.userName || "Anônimo"}</p>
                            {c.userEmail && <p className="text-xs text-[#94A3B8]">{c.userEmail}</p>}
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>
                              {st.label}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-[#475569]">{formatDate(c.createdAt)}</td>
                          <td className="py-3 text-right">
                            <Link
                              href={`/admin/consultas/${c.id}`}
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
