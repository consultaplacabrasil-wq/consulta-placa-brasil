import Link from "next/link";
import {
  Search,
  FileText,
  ArrowRight,
  CreditCard,
  TrendingUp,
  Car,
  Eye,
  Download,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Painel - ConsultaPlaca" };

const stats = [
  {
    title: "Total de Consultas",
    value: "12",
    description: "consultas realizadas",
    icon: Search,
    color: "bg-blue-100 text-blue-600",
    trend: "+3 esta semana",
  },
  {
    title: "Relatórios Gerados",
    value: "7",
    description: "relatórios pagos",
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
    trend: "+2 esta semana",
  },
  {
    title: "Gasto Total",
    value: "R$ 174,30",
    description: "em consultas e pacotes",
    icon: CreditCard,
    color: "bg-purple-100 text-purple-600",
    trend: null,
  },
];

const recentConsultas = [
  { plate: "ABC1D23", type: "Premium", vehicle: "Honda Civic 2021", date: "08/03/2026 14:32", status: "completed" },
  { plate: "XYZ9A87", type: "Completo", vehicle: "Toyota Corolla 2020", date: "07/03/2026 10:15", status: "completed" },
  { plate: "DEF4G56", type: "Básico", vehicle: "VW Gol 2018", date: "05/03/2026 16:48", status: "completed" },
  { plate: "GHI7H89", type: "Completo", vehicle: "Fiat Argo 2022", date: "03/03/2026 09:22", status: "completed" },
  { plate: "JKL2M34", type: "Básico", vehicle: "Chevrolet Onix 2019", date: "01/03/2026 11:05", status: "completed" },
];

const recentPayments = [
  { id: "PAY-007", desc: "Relatório Premium - ABC1D23", amount: "R$ 39,90", date: "08/03", status: "confirmed" },
  { id: "PAY-006", desc: "Relatório Completo - XYZ9A87", amount: "R$ 24,90", date: "07/03", status: "confirmed" },
  { id: "PAY-005", desc: "Consulta Completa - DEF4G56", amount: "R$ 64,90", date: "01/03", status: "confirmed" },
];

const typeColors: Record<string, string> = {
  "Premium": "bg-[#EEF2FF] text-[#0F172A]",
  "Completo": "bg-[#FFF5F3] text-[#FF4D30]",
  "Básico": "bg-gray-100 text-gray-700",
};

export default function PainelPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Olá, Usuário!</h1>
          <p className="text-sm text-[#64748B]">Bem-vindo ao seu painel de controle</p>
        </div>
        <Link href="/consultas">
          <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
            <Search className="h-4 w-4" />
            Nova Consulta
          </Button>
        </Link>
      </div>

      {/* Stats */}
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
                  {stat.trend && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Consultas */}
        <Card className="border-0 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Últimas Consultas</CardTitle>
            <Link href="/consultas" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConsultas.map((c) => (
                <div key={c.plate} className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF5F3]">
                      <Car className="h-5 w-5 text-[#FF4D30]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-semibold text-[#0F172A]">{c.plate}</p>
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[c.type]}`}>
                          {c.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#94A3B8]">{c.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-[#475569]">{c.date}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 justify-end">
                        <CheckCircle className="h-3 w-3" />Concluída
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white text-[#475569]">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white text-[#475569]">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Payments */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">Últimos Pagamentos</CardTitle>
              <Link href="/pagamentos" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{p.desc}</p>
                      <p className="text-xs text-[#94A3B8]">{p.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#0F172A]">{p.amount}</p>
                      <p className="text-[10px] text-green-600 flex items-center gap-1 justify-end">
                        <CheckCircle className="h-2.5 w-2.5" />Confirmado
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Link href="/consultas" className="group">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-[#FF4D30] hover:bg-[#FFF5F3]">
                    <div className="flex items-center gap-3">
                      <Search className="h-5 w-5 text-[#FF4D30]" />
                      <span className="text-sm font-medium text-[#0F172A]">Nova Consulta</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
                  </div>
                </Link>
                <Link href="/pagamentos" className="group">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-[#FF4D30] hover:bg-[#FFF5F3]">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-[#0F172A]">Pagamentos</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
                  </div>
                </Link>
                <Link href="/relatorios" className="group">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-[#FF4D30] hover:bg-[#FFF5F3]">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-[#0F172A]">Meus Relatórios</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
