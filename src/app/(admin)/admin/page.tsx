"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  CreditCard,
  FileText,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Eye,
  Activity,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface DashboardData {
  stats: {
    revenue: number;
    consultasToday: number;
    activeUsers: number;
    pendingPayments: number;
    reportsMonth: number;
    ticketMedio: number;
    refunds: number;
    cancelled: number;
    conversionRate: string;
  };
  recentPayments: {
    id: string;
    user: string;
    amount: number;
    method: string;
    status: string;
    date: string;
  }[];
  recentConsultas: {
    id: string;
    plate: string;
    type: string;
    user: string;
    status: string;
    date: string;
  }[];
}

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
  received: { label: "Recebido", class: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
  refunded: { label: "Reembolsado", class: "bg-purple-100 text-purple-700" },
  overdue: { label: "Vencido", class: "bg-orange-100 text-orange-700" },
};

const typeMap: Record<string, string> = {
  basic: "Básico",
  complete: "Completo",
  premium: "Premium",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin} min atrás`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d atrás`;
}

function formatMethod(method: string) {
  const map: Record<string, string> = {
    pix: "Pix",
    credit_card: "Cartão",
    debit_card: "Débito",
  };
  return map[method] || method;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((d) => {
        if (d.stats) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  const stats = data?.stats;
  const recentPayments = data?.recentPayments || [];
  const recentConsultas = data?.recentConsultas || [];

  const statCards = [
    {
      title: "Receita do Mês",
      value: formatCurrency(stats?.revenue || 0),
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Consultas Hoje",
      value: formatNumber(stats?.consultasToday || 0),
      icon: Search,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Usuários Ativos",
      value: formatNumber(stats?.activeUsers || 0),
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pagamentos Pendentes",
      value: formatNumber(stats?.pendingPayments || 0),
      icon: CreditCard,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-sm text-[#64748B]">Visão geral do sistema</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-2">
          <Activity className="h-4 w-4 text-[#22C55E]" />
          <span className="text-sm text-[#475569]">Sistema online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Payments */}
        <Card className="border-0 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Últimos Pagamentos</CardTitle>
            <Link href="/admin/pagamentos" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhum pagamento registrado ainda</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">ID</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Método</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Valor</th>
                      <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((p) => {
                      const st = statusMap[p.status] || statusMap.pending;
                      return (
                        <tr key={p.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-mono text-xs text-[#475569]">{p.id}</td>
                          <td className="py-3 text-[#0F172A]">{p.user}</td>
                          <td className="py-3 text-[#475569]">{formatMethod(p.method)}</td>
                          <td className="py-3 font-semibold text-[#0F172A]">{formatCurrency(p.amount)}</td>
                          <td className="py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>{st.label}</span>
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

        {/* Recent Consultas */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Consultas Recentes</CardTitle>
            <Link href="/admin/consultas" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentConsultas.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhuma consulta registrada ainda</p>
            ) : (
              <div className="space-y-3">
                {recentConsultas.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF5F3]">
                        <Search className="h-4 w-4 text-[#FF4D30]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A] font-mono">{c.plate}</p>
                        <p className="text-xs text-[#94A3B8]">{c.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-[#475569]">{typeMap[c.type] || c.type}</span>
                      <p className="text-[10px] text-[#94A3B8]">{timeAgo(c.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F3]">
                <FileText className="h-5 w-5 text-[#FF4D30]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F172A]">{formatNumber(stats?.reportsMonth || 0)}</p>
                <p className="text-xs text-[#94A3B8]">Relatórios gerados este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F172A]">{stats?.conversionRate || "0.0"}%</p>
                <p className="text-xs text-[#94A3B8]">Taxa de conversão</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F172A]">{formatCurrency(stats?.ticketMedio || 0)}</p>
                <p className="text-xs text-[#94A3B8]">Ticket médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
