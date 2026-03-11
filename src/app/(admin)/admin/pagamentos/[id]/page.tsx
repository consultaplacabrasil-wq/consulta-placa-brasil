"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  DollarSign,
  User,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Tag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentDetail {
  id: string;
  amount: string;
  method: string;
  status: string;
  installments: number | null;
  asaasId: string | null;
  couponId: string | null;
  discountAmount: string | null;
  paidAt: string | null;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
  userId: string;
}

const statusMap: Record<string, { label: string; class: string; icon: typeof CheckCircle }> = {
  confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700", icon: CheckCircle },
  received: { label: "Recebido", class: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700", icon: Clock },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700", icon: XCircle },
  refunded: { label: "Reembolsado", class: "bg-purple-100 text-purple-700", icon: XCircle },
  overdue: { label: "Vencido", class: "bg-orange-100 text-orange-700", icon: Clock },
  chargeback: { label: "Chargeback", class: "bg-red-100 text-red-700", icon: XCircle },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatMethod(method: string) {
  const map: Record<string, string> = { pix: "Pix", credit_card: "Cartão de Crédito", debit_card: "Cartão de Débito" };
  return map[method] || method;
}

export default function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [payment, setPayment] = useState<PaymentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/payments?search=${id}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.payments?.find((p: PaymentDetail) => p.id === id);
        if (found) setPayment(found);
        else setError("Pagamento não encontrado");
      })
      .catch(() => setError("Erro ao carregar pagamento"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="space-y-6">
        <Link href="/admin/pagamentos" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error || "Pagamento não encontrado"}
        </div>
      </div>
    );
  }

  const st = statusMap[payment.status] || statusMap.pending;
  const StatusIcon = st.icon;
  const amount = parseFloat(payment.amount);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/pagamentos"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Detalhes do Pagamento</h1>
          <p className="text-sm text-[#64748B]">ID: {payment.id.slice(0, 8)}...</p>
        </div>
      </div>

      {/* Status + Amount Banner */}
      <div className={`flex items-center justify-between rounded-xl px-5 py-4 ${st.class}`}>
        <div className="flex items-center gap-3">
          <StatusIcon className="h-6 w-6" />
          <div>
            <p className="font-semibold text-lg">{st.label}</p>
            <p className="text-sm opacity-80">
              {new Date(payment.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dados do Pagamento */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#FF4D30]" />
              Dados do Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Valor</span>
              <span className="font-bold text-[#0F172A] text-lg">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Método</span>
              <span className="font-medium text-[#0F172A]">{formatMethod(payment.method)}</span>
            </div>
            {payment.installments && payment.installments > 1 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-[#64748B]">Parcelas</span>
                <span className="text-sm text-[#0F172A]">{payment.installments}x</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Status</span>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${st.class}`}>{st.label}</span>
            </div>
            {payment.discountAmount && parseFloat(payment.discountAmount) > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-[#64748B] flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> Desconto</span>
                <span className="text-sm text-green-600 font-medium">-{formatCurrency(parseFloat(payment.discountAmount))}</span>
              </div>
            )}
            {payment.paidAt && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-[#64748B]">Data do Pagamento</span>
                <span className="text-sm text-[#0F172A]">{new Date(payment.paidAt).toLocaleString("pt-BR")}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[#64748B]">Data de Criação</span>
              <span className="text-sm text-[#0F172A]">{new Date(payment.createdAt).toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Usuário */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-[#FF4D30]" />
              Dados do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Nome</span>
              <span className="font-medium text-[#0F172A]">{payment.userName || "Anônimo"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">E-mail</span>
              <span className="text-sm text-[#0F172A]">{payment.userEmail || "—"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">ID do Usuário</span>
              <span className="font-mono text-xs text-[#475569]">{payment.userId.slice(0, 8)}...</span>
            </div>
            {payment.asaasId && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-[#64748B]">ID Asaas</span>
                <span className="font-mono text-xs text-[#475569]">{payment.asaasId}</span>
              </div>
            )}
            {payment.couponId && (
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-[#64748B]">Cupom Utilizado</span>
                <span className="font-mono text-xs text-[#475569]">{payment.couponId.slice(0, 8)}...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
