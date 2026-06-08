import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, FileSearch, Clock, CheckCircle, Loader2, XCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reportRequests, reports } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ConsultaPlateForm } from "./consulta-plate-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Consultas - ConsultaPlaca" };

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  pending_payment: { label: "Aguardando pagamento", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: Clock },
  processing: { label: "Aguardando placa", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Search },
  completed: { label: "Concluída", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: CheckCircle },
  failed: { label: "Falhou", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: XCircle },
  cancelled: { label: "Cancelada", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", icon: XCircle },
};

export default async function ConsultasPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const requests = await db
    .select()
    .from(reportRequests)
    .where(eq(reportRequests.userId, session.user.id))
    .orderBy(desc(reportRequests.createdAt));

  // Get report IDs for completed requests
  const completedIds = requests.filter((r) => r.status === "completed").map((r) => r.id);
  const reportMap: Record<string, string> = {};

  if (completedIds.length > 0) {
    for (const reqId of completedIds) {
      const [report] = await db
        .select({ id: reports.id })
        .from(reports)
        .where(eq(reports.requestId, reqId))
        .limit(1);
      if (report) reportMap[reqId] = report.id;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Consultas</h1>
          <p className="text-gray-500 text-sm">Histórico de consultas realizadas</p>
        </div>
        <Link href="/consultas/nova">
          <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
            <CreditCard className="h-4 w-4" />
            Comprar Consulta
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Histórico de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <FileSearch className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                Nenhuma consulta realizada
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Você ainda não realizou nenhuma consulta. Compre uma consulta para começar.
              </p>
              <Link href="/consultas/nova">
                <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
                  <Search className="h-4 w-4" />
                  Comprar consulta
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => {
                const status = statusConfig[r.status] || statusConfig.pending_payment;
                const StatusIcon = status.icon;
                const reportId = reportMap[r.id];
                const isProcessing = r.status === "processing";

                return (
                  <div
                    key={r.id}
                    className="rounded-xl border border-gray-200 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${status.bg} ${status.color}`}>
                          <StatusIcon className={`h-3.5 w-3.5 ${r.status === "processing" ? "" : ""}`} />
                          {status.label}
                        </span>
                        {r.consultaName && (
                          <span className="text-sm text-gray-500">{r.consultaName}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(r.createdAt)}
                      </span>
                    </div>

                    {/* Se já tem placa e está concluída */}
                    {r.status === "completed" && r.plate !== "PENDENTE" && (
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-lg text-[#0F172A]">
                          {r.plate}
                        </span>
                        {reportId && (
                          <Link
                            href={`/relatorio/${reportId}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF4D30] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E8432A] transition-colors"
                          >
                            <FileSearch className="h-4 w-4" />
                            Ver Relatório
                          </Link>
                        )}
                      </div>
                    )}

                    {/* Se está processando (pagamento confirmado), mostrar campo de placa */}
                    {isProcessing && (
                      <ConsultaPlateForm requestId={r.id} apiService={r.apiService || "completa"} />
                    )}

                    {/* Se pagamento pendente */}
                    {r.status === "pending_payment" && (
                      <p className="text-sm text-gray-500">
                        Aguardando confirmação do pagamento para liberar a consulta.
                      </p>
                    )}

                    {/* Se falhou */}
                    {r.status === "failed" && (
                      <p className="text-sm text-red-500">
                        Ocorreu um erro ao processar esta consulta. Entre em contato com o suporte.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
