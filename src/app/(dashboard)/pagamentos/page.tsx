import { redirect } from "next/navigation";
import { Receipt, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { payments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pagamentos - ConsultaPlaca" };

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  pending: { label: "Pendente", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmado", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: CheckCircle },
  received: { label: "Recebido", color: "text-green-700", bg: "bg-green-50 border-green-200", icon: CheckCircle },
  overdue: { label: "Atrasado", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: AlertCircle },
  refunded: { label: "Reembolsado", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", icon: AlertCircle },
  cancelled: { label: "Cancelado", color: "text-gray-700", bg: "bg-gray-50 border-gray-200", icon: AlertCircle },
  chargeback: { label: "Chargeback", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: AlertCircle },
};

export default async function PagamentosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userPayments = await db
    .select()
    .from(payments)
    .where(eq(payments.userId, session.user.id))
    .orderBy(desc(payments.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Pagamentos</h1>
        <p className="text-gray-500 text-sm">Histórico de pagamentos e transações</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Histórico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Receipt className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                Nenhum pagamento encontrado
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Seu histórico de pagamentos aparecerá aqui após a compra de créditos ou assinatura de planos.
              </p>
            </div>
          ) : (
            <>
              {/* Table headers */}
              <div className="hidden sm:grid sm:grid-cols-5 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Data</span>
                <span>Descrição</span>
                <span>Método</span>
                <span>Valor</span>
                <span className="text-right">Status</span>
              </div>

              <div className="divide-y divide-gray-100">
                {userPayments.map((p) => {
                  const status = statusConfig[p.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <div key={p.id} className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center">
                      <span className="text-sm text-[#475569]">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }).format(p.createdAt)}
                      </span>
                      <span className="text-sm font-medium text-[#0F172A]">
                        Pagamento #{p.id.slice(0, 8)}
                      </span>
                      <span className="text-sm text-[#475569]">
                        {p.method === "pix" ? "Pix" : p.method === "credit_card" ? "Cartão Crédito" : "Débito"}
                      </span>
                      <div>
                        <span className="text-sm font-semibold text-[#0F172A]">
                          {formatCurrency(Number(p.amount))}
                        </span>
                        {p.discountAmount && Number(p.discountAmount) > 0 && (
                          <p className="text-[10px] text-[#FF4D30]">
                            -{formatCurrency(Number(p.discountAmount))} desc.
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
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
