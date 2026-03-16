import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, FileSearch, Clock, CheckCircle, Loader2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reportRequests } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Consultas - ConsultaPlaca" };

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  pending_payment: { label: "Aguardando pagamento", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: Clock },
  processing: { label: "Processando", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Loader2 },
  completed: { label: "Concluída", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: CheckCircle },
  failed: { label: "Falhou", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: XCircle },
  cancelled: { label: "Cancelada", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", icon: XCircle },
};

const typeLabels: Record<string, string> = {
  basic: "Básico",
  complete: "Completo",
  premium: "Premium",
};

export default async function ConsultasPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const requests = await db
    .select()
    .from(reportRequests)
    .where(eq(reportRequests.userId, session.user.id))
    .orderBy(desc(reportRequests.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Consultas</h1>
          <p className="text-gray-500 text-sm">Histórico de consultas realizadas</p>
        </div>
        <Link href="/">
          <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
            <Search className="h-4 w-4" />
            Nova Consulta
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
                Você ainda não realizou nenhuma consulta. Comece pesquisando uma placa para obter informações detalhadas do veículo.
              </p>
              <Link href="/">
                <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
                  <Search className="h-4 w-4" />
                  Realizar primeira consulta
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Table headers */}
              <div className="hidden sm:grid sm:grid-cols-5 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Placa</span>
                <span>Tipo</span>
                <span>Data</span>
                <span>Status</span>
                <span className="text-right">Ações</span>
              </div>

              <div className="divide-y divide-gray-100">
                {requests.map((r) => {
                  const status = statusConfig[r.status] || statusConfig.pending_payment;
                  const StatusIcon = status.icon;
                  return (
                    <div key={r.id} className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center">
                      <span className="font-mono font-semibold text-[#0F172A] text-sm">
                        {r.plate}
                      </span>
                      <span className="text-sm text-[#475569]">
                        {typeLabels[r.reportType] || r.reportType}
                      </span>
                      <span className="text-sm text-[#475569]">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(r.createdAt)}
                      </span>
                      <div>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="text-right">
                        {r.status === "completed" ? (
                          <Link
                            href={`/relatorio/${r.id}`}
                            className="text-sm text-[#FF4D30] hover:underline font-medium"
                          >
                            Ver relatório
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
