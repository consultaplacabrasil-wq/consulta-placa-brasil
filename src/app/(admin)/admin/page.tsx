"use client";

import { useEffect, useState } from "react";
import {
  Users, Search, CreditCard, FileText, TrendingUp, DollarSign,
  ArrowUpRight, Eye, Activity, Loader2, UserCheck, UserX, Ticket, CalendarDays,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface SeriePonto { dia: string; label: string; qtd: number; receita: number }
interface DashboardData {
  stats: {
    revenue: number; revenueToday: number; consultasToday: number;
    totalUsers: number; activeUsers: number; inactiveUsers: number;
    pendingPayments: number; reportsMonth: number; couponsUsed: number;
    ticketMedio: number; conversionRate: string;
  };
  charts: {
    salesSeries: SeriePonto[];
    regsSeries: SeriePonto[];
    topConsultas: { nome: string; qtd: number }[];
  };
  recentPayments: { id: string; user: string; amount: number; method: string; status: string; date: string }[];
  recentConsultas: { id: string; plate: string; type: string; user: string; status: string; date: string }[];
}

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
  received: { label: "Recebido", class: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
  refunded: { label: "Reembolsado", class: "bg-purple-100 text-purple-700" },
  overdue: { label: "Vencido", class: "bg-orange-100 text-orange-700" },
};
const typeMap: Record<string, string> = { basic: "Básico", complete: "Completo", premium: "Premium" };

const fmtCurrency = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
const fmtNumber = (v: number) => new Intl.NumberFormat("pt-BR").format(v);
const fmtMethod = (m: string) => ({ pix: "Pix", credit_card: "Cartão", debit_card: "Débito" }[m] || m);
function timeAgo(s: string) {
  const min = Math.floor((Date.now() - new Date(s).getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min} min atrás`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h atrás`;
  return `${Math.floor(h / 24)}d atrás`;
}

// Gráfico de barras vertical simples (sem biblioteca)
function BarChart({ data, valueKey, color, money }: {
  data: SeriePonto[]; valueKey: "qtd" | "receita"; color: string; money?: boolean;
}) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="flex items-end justify-between gap-2 h-40 pt-4">
      {data.map((d) => {
        const h = (d[valueKey] / max) * 100;
        return (
          <div key={d.dia} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#475569]">
              {d[valueKey] > 0 ? (money ? fmtCurrency(d.receita).replace("R$", "").trim() : d.qtd) : ""}
            </span>
            <div className="w-full rounded-t-md transition-all" style={{ height: `${Math.max(h, 2)}%`, background: color, minHeight: 4 }} />
            <span className="text-[10px] text-[#94A3B8]">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => { if (d.stats) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex min-h-[400px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" /></div>;

  const stats = data?.stats;
  const charts = data?.charts;
  const recentPayments = data?.recentPayments || [];
  const recentConsultas = data?.recentConsultas || [];

  const statCards = [
    { title: "Receita do Mês", value: fmtCurrency(stats?.revenue || 0), Icon: DollarSign, color: "bg-green-100 text-green-600" },
    { title: "Faturamento Hoje", value: fmtCurrency(stats?.revenueToday || 0), Icon: CalendarDays, color: "bg-emerald-100 text-emerald-600" },
    { title: "Consultas Hoje", value: fmtNumber(stats?.consultasToday || 0), Icon: Search, color: "bg-blue-100 text-blue-600" },
    { title: "Pagamentos Pendentes", value: fmtNumber(stats?.pendingPayments || 0), Icon: CreditCard, color: "bg-orange-100 text-orange-600" },
    { title: "Total de Usuários", value: fmtNumber(stats?.totalUsers || 0), Icon: Users, color: "bg-purple-100 text-purple-600" },
    { title: "Usuários Ativos", value: fmtNumber(stats?.activeUsers || 0), Icon: UserCheck, color: "bg-green-100 text-green-600" },
    { title: "Usuários Inativos", value: fmtNumber(stats?.inactiveUsers || 0), Icon: UserX, color: "bg-red-100 text-red-600" },
    { title: "Cupons Usados (mês)", value: fmtNumber(stats?.couponsUsed || 0), Icon: Ticket, color: "bg-amber-100 text-amber-600" },
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
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
              <p className="text-xs text-[#94A3B8] mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Faturamento (últimos 7 dias)</CardTitle></CardHeader>
          <CardContent>
            {charts && <BarChart data={charts.salesSeries} valueKey="receita" color="#22c55e" money />}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Novos cadastros (últimos 7 dias)</CardTitle></CardHeader>
          <CardContent>
            {charts && <BarChart data={charts.regsSeries} valueKey="qtd" color="#FF4D30" />}
          </CardContent>
        </Card>
      </div>

      {/* Top consultas + métricas */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Consultas mais vendidas</CardTitle></CardHeader>
          <CardContent>
            {!charts || charts.topConsultas.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-6">Sem dados ainda</p>
            ) : (
              <div className="space-y-3">
                {charts.topConsultas.map((t, i) => {
                  const max = Math.max(...charts.topConsultas.map((x) => x.qtd), 1);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#0F172A] font-medium">{t.nome}</span>
                        <span className="text-[#94A3B8]">{t.qtd}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-[#FF4D30]" style={{ width: `${(t.qtd / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100"><TrendingUp className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{stats?.conversionRate || "0.0"}%</p><p className="text-xs text-[#94A3B8]">Taxa de conversão</p></div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100"><Eye className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{fmtCurrency(stats?.ticketMedio || 0)}</p><p className="text-xs text-[#94A3B8]">Ticket médio</p></div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F3]"><FileText className="h-5 w-5 text-[#FF4D30]" /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{fmtNumber(stats?.reportsMonth || 0)}</p><p className="text-xs text-[#94A3B8]">Relatórios no mês</p></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-0 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Últimos Pagamentos</CardTitle>
            <Link href="/admin/pagamentos" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">Ver todos <ArrowUpRight className="h-3 w-3" /></Link>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhum pagamento registrado ainda</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
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
                          <td className="py-3 text-[#0F172A]">{p.user}</td>
                          <td className="py-3 text-[#475569]">{fmtMethod(p.method)}</td>
                          <td className="py-3 font-semibold text-[#0F172A]">{fmtCurrency(p.amount)}</td>
                          <td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>{st.label}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Consultas Recentes</CardTitle>
            <Link href="/admin/consultas" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">Ver todas <ArrowUpRight className="h-3 w-3" /></Link>
          </CardHeader>
          <CardContent>
            {recentConsultas.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhuma consulta registrada ainda</p>
            ) : (
              <div className="space-y-3">
                {recentConsultas.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF5F3]"><Search className="h-4 w-4 text-[#FF4D30]" /></div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A] font-mono">{c.plate && c.plate !== "PENDENTE" ? c.plate : "—"}</p>
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
    </div>
  );
}
