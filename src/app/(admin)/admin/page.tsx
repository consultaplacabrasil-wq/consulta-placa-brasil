import {
  Users,
  Search,
  CreditCard,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  Eye,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = { title: "Admin Dashboard - ConsultaPlaca" };

const stats = [
  {
    title: "Receita do Mês",
    value: "R$ 12.450,00",
    change: "+18.2%",
    trend: "up" as const,
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Consultas Hoje",
    value: "347",
    change: "+12.5%",
    trend: "up" as const,
    icon: Search,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Usuários Ativos",
    value: "1.234",
    change: "+5.3%",
    trend: "up" as const,
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Pagamentos Pendentes",
    value: "23",
    change: "-8.1%",
    trend: "down" as const,
    icon: CreditCard,
    color: "bg-orange-100 text-orange-600",
  },
];

const recentPayments = [
  { id: "PAY-001", user: "Carlos M.", plate: "ABC1D23", type: "Completo", amount: "R$ 24,90", status: "confirmed", date: "08/03/2026" },
  { id: "PAY-002", user: "Ana Paula S.", plate: "XYZ9A87", type: "Premium", amount: "R$ 39,90", status: "confirmed", date: "08/03/2026" },
  { id: "PAY-003", user: "Roberto L.", plate: "DEF4G56", type: "Completo", amount: "R$ 24,90", status: "pending", date: "08/03/2026" },
  { id: "PAY-004", user: "Maria F.", plate: "GHI7H89", type: "Premium", amount: "R$ 39,90", status: "confirmed", date: "07/03/2026" },
  { id: "PAY-005", user: "João P.", plate: "JKL2M34", type: "Completo", amount: "R$ 24,90", status: "cancelled", date: "07/03/2026" },
];

const recentConsultas = [
  { plate: "ABC1D23", type: "Premium", user: "Carlos M.", time: "2 min atrás" },
  { plate: "XYZ9A87", type: "Completo", user: "Ana Paula S.", time: "5 min atrás" },
  { plate: "DEF4G56", type: "Básico", user: "Anônimo", time: "8 min atrás" },
  { plate: "GHI7H89", type: "Completo", user: "Roberto L.", time: "12 min atrás" },
  { plate: "JKL2M34", type: "Básico", user: "Anônimo", time: "15 min atrás" },
];

const statusMap = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
};

export default function AdminDashboardPage() {
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
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                    {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.change}
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">ID</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Valor</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((p) => {
                    const st = statusMap[p.status as keyof typeof statusMap];
                    return (
                      <tr key={p.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 font-mono text-xs text-[#475569]">{p.id}</td>
                        <td className="py-3 text-[#0F172A]">{p.user}</td>
                        <td className="py-3 font-mono font-semibold text-[#FF4D30]">{p.plate}</td>
                        <td className="py-3 text-[#475569]">{p.type}</td>
                        <td className="py-3 font-semibold text-[#0F172A]">{p.amount}</td>
                        <td className="py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
            <div className="space-y-3">
              {recentConsultas.map((c, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0ED]">
                      <Search className="h-4 w-4 text-[#FF4D30]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A] font-mono">{c.plate}</p>
                      <p className="text-xs text-[#94A3B8]">{c.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-[#475569]">{c.type}</span>
                    <p className="text-[10px] text-[#94A3B8]">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0ED]">
                <FileText className="h-5 w-5 text-[#FF4D30]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#0F172A]">2.847</p>
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
                <p className="text-xl font-bold text-[#0F172A]">89.3%</p>
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
                <p className="text-xl font-bold text-[#0F172A]">15.432</p>
                <p className="text-xs text-[#94A3B8]">Visitantes este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
