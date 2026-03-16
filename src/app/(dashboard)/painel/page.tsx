import { redirect } from "next/navigation";
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
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { payments, reportRequests } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Painel - ConsultaPlaca" };

const statusLabels: Record<string, { label: string; color: string }> = {
  pending_payment: { label: "Pendente", color: "text-yellow-600" },
  processing: { label: "Processando", color: "text-blue-600" },
  completed: { label: "Concluída", color: "text-green-600" },
  failed: { label: "Falhou", color: "text-red-600" },
  cancelled: { label: "Cancelada", color: "text-gray-500" },
};

const paymentStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "text-yellow-600" },
  confirmed: { label: "Confirmado", color: "text-green-600" },
  received: { label: "Recebido", color: "text-green-600" },
  overdue: { label: "Atrasado", color: "text-red-600" },
  refunded: { label: "Reembolsado", color: "text-purple-600" },
  cancelled: { label: "Cancelado", color: "text-gray-500" },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function PainelPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  // Fetch stats
  const [paymentStats] = await db
    .select({
      totalPayments: sql<number>`count(*)`,
      totalSpent: sql<number>`coalesce(sum(cast(${payments.amount} as numeric)), 0)`,
    })
    .from(payments)
    .where(eq(payments.userId, userId));

  const [reportStats] = await db
    .select({
      totalReports: sql<number>`count(*)`,
    })
    .from(reportRequests)
    .where(eq(reportRequests.userId, userId));

  // Recent requests
  const recentRequests = await db
    .select()
    .from(reportRequests)
    .where(eq(reportRequests.userId, userId))
    .orderBy(desc(reportRequests.createdAt))
    .limit(5);

  // Recent payments
  const recentPayments = await db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt))
    .limit(3);

  const stats = [
    {
      title: "Total de Consultas",
      value: String(reportStats?.totalReports || 0),
      description: "consultas realizadas",
      icon: Search,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Relatórios Gerados",
      value: String(paymentStats?.totalPayments || 0),
      description: "pagamentos",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Gasto Total",
      value: formatCurrency(Number(paymentStats?.totalSpent || 0)),
      description: "em consultas e pacotes",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Olá, {session.user.name || "Usuário"}!</h1>
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
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
            <Link href="/relatorios" className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentRequests.length === 0 ? (
              <div className="text-center py-8">
                <Search className="mx-auto h-10 w-10 text-gray-200 mb-3" />
                <p className="text-sm text-gray-500">Nenhuma consulta realizada ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRequests.map((r) => {
                  const status = statusLabels[r.status] || { label: r.status, color: "text-gray-500" };
                  return (
                    <div key={r.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF5F3]">
                          <Car className="h-5 w-5 text-[#FF4D30]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-mono font-semibold text-[#0F172A]">{r.plate}</p>
                            <span className="inline-flex rounded-full bg-[#FFF5F3] px-2 py-0.5 text-[10px] font-medium text-[#FF4D30] capitalize">
                              {r.reportType}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8]">{formatDate(r.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs flex items-center gap-1 justify-end ${status.color}`}>
                          {r.status === "completed" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {status.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
              {recentPayments.length === 0 ? (
                <div className="text-center py-6">
                  <CreditCard className="mx-auto h-8 w-8 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-500">Nenhum pagamento</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPayments.map((p) => {
                    const status = paymentStatusLabels[p.status] || { label: p.status, color: "text-gray-500" };
                    return (
                      <div key={p.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#0F172A]">
                            {p.method === "pix" ? "Pix" : "Cartão"}
                          </p>
                          <p className="text-xs text-[#94A3B8]">
                            {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(p.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#0F172A]">{formatCurrency(Number(p.amount))}</p>
                          <p className={`text-[10px] flex items-center gap-1 justify-end ${status.color}`}>
                            <CheckCircle className="h-2.5 w-2.5" />{status.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
