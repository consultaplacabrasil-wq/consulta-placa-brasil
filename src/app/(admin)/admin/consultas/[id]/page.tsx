"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Search,
  User,
  CreditCard,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsultaDetail {
  id: string;
  plate: string;
  reportType: string;
  status: string;
  createdAt: string;
  paymentId: string | null;
  userId: string;
  userName: string | null;
  userEmail: string | null;
}

const statusMap: Record<string, { label: string; class: string; icon: typeof CheckCircle }> = {
  pending_payment: { label: "Aguardando Pagamento", class: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "Processando", class: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "Concluída", class: "bg-green-100 text-green-700", icon: CheckCircle },
  failed: { label: "Falhou", class: "bg-red-100 text-red-700", icon: XCircle },
  cancelled: { label: "Cancelada", class: "bg-gray-100 text-gray-700", icon: XCircle },
};

const typeLabels: Record<string, string> = {
  basic: "Básico",
  complete: "Completo",
  premium: "Premium",
};

export default function ConsultaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [consulta, setConsulta] = useState<ConsultaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/consultas?search=${id}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.consultas?.find((c: ConsultaDetail) => c.id === id);
        if (found) {
          setConsulta(found);
        } else {
          setError("Consulta não encontrada");
        }
      })
      .catch(() => setError("Erro ao carregar consulta"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  if (error || !consulta) {
    return (
      <div className="space-y-6">
        <Link href="/admin/consultas" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error || "Consulta não encontrada"}
        </div>
      </div>
    );
  }

  const st = statusMap[consulta.status] || statusMap.completed;
  const StatusIcon = st.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/consultas"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Detalhes da Consulta</h1>
          <p className="text-sm text-[#64748B]">ID: {consulta.id.slice(0, 8)}...</p>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`flex items-center gap-3 rounded-xl px-5 py-4 ${st.class}`}>
        <StatusIcon className="h-6 w-6" />
        <div>
          <p className="font-semibold text-lg">{st.label}</p>
          <p className="text-sm opacity-80">
            {new Date(consulta.createdAt).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dados da Consulta */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Search className="h-5 w-5 text-[#FF4D30]" />
              Dados da Consulta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Placa</span>
              <span className="font-mono font-bold text-[#FF4D30] text-lg">{consulta.plate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Tipo de Consulta</span>
              <span className="font-medium text-[#0F172A]">{typeLabels[consulta.reportType] || consulta.reportType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Status</span>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${st.class}`}>{st.label}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[#64748B]">Data da Consulta</span>
              <span className="text-sm text-[#0F172A]">{new Date(consulta.createdAt).toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Usuário */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-[#FF4D30]" />
              Dados do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">Nome</span>
              <span className="font-medium text-[#0F172A]">{consulta.userName || "Anônimo"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">E-mail</span>
              <span className="text-sm text-[#0F172A]">{consulta.userEmail || "—"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-[#64748B]">ID do Usuário</span>
              <span className="font-mono text-xs text-[#475569]">{consulta.userId.slice(0, 8)}...</span>
            </div>
            {consulta.paymentId && (
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-[#64748B]">Pagamento</span>
                <Link
                  href={`/admin/pagamentos/${consulta.paymentId}`}
                  className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Ver pagamento
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
