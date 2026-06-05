"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft, User, Mail, FileText, Calendar, CreditCard,
  ShoppingBag, Search, Loader2, CheckCircle2, Ban, Receipt,
} from "lucide-react";

interface ClienteData {
  user: {
    id: string; name: string; email: string; cpfCnpj: string | null;
    role: string; active: boolean; createdAt: string;
  };
  compras: Array<{
    id: string; amount: string; method: string; status: string;
    installments: number | null; discountAmount: string | null;
    paidAt: string | null; createdAt: string; couponCode: string | null;
  }>;
  consultas: Array<{
    id: string; plate: string; reportType: string;
    consultaName: string | null; status: string; createdAt: string;
  }>;
  resumo: { totalCompras: number; comprasPagas: number; totalGasto: number; totalConsultas: number };
}

const payStatus: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pendente", cls: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmado", cls: "bg-green-100 text-green-700" },
  received: { label: "Recebido", cls: "bg-green-100 text-green-700" },
  overdue: { label: "Vencido", cls: "bg-orange-100 text-orange-700" },
  refunded: { label: "Reembolsado", cls: "bg-gray-100 text-gray-600" },
  chargeback: { label: "Chargeback", cls: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelado", cls: "bg-gray-100 text-gray-600" },
};

const consultaStatus: Record<string, { label: string; cls: string }> = {
  pending_payment: { label: "Aguardando", cls: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Processando", cls: "bg-blue-100 text-blue-700" },
  completed: { label: "Concluída", cls: "bg-green-100 text-green-700" },
  failed: { label: "Falhou", cls: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelada", cls: "bg-gray-100 text-gray-600" },
};

const methodLabel: Record<string, string> = { pix: "Pix", credit_card: "Cartão", debit_card: "Débito" };

function fmtMoney(v: number | string) {
  return `R$ ${Number(v).toFixed(2).replace(".", ",")}`;
}
function fmtDateTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
function fmtCpf(cpf: string | null) {
  if (!cpf) return "—";
  const c = cpf.replace(/\D/g, "");
  if (c.length === 11) return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (c.length === 14) return c.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

export default function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<ClienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/clientes/${id}`, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => setError("Erro ao carregar cliente"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" /></div>;
  if (error || !data) return <div className="py-20 text-center text-[#475569]">{error || "Cliente não encontrado"}</div>;

  const { user, compras, consultas, resumo } = data;

  return (
    <div className="space-y-6">
      <Link href="/admin/usuarios" className="inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#FF4D30]">
        <ArrowLeft className="h-4 w-4" /> Voltar para usuários
      </Link>

      {/* Cabeçalho do cliente */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F172A] text-white text-lg font-bold">
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0F172A]">{user.name}</h1>
                <p className="text-sm text-[#64748B]">{user.email}</p>
              </div>
            </div>
            {user.active
              ? <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"><CheckCircle2 className="h-3 w-3" /> Ativo</span>
              : <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"><Ban className="h-3 w-3" /> Inativo</span>}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#FF4D30]" /><div><p className="text-xs text-[#94A3B8]">E-mail</p><p className="text-sm font-medium text-[#0F172A]">{user.email}</p></div></div>
            <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#FF4D30]" /><div><p className="text-xs text-[#94A3B8]">CPF/CNPJ</p><p className="text-sm font-medium text-[#0F172A]">{fmtCpf(user.cpfCnpj)}</p></div></div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#FF4D30]" /><div><p className="text-xs text-[#94A3B8]">Cadastro</p><p className="text-sm font-medium text-[#0F172A]">{fmtDateTime(user.createdAt)}</p></div></div>
            <div className="flex items-center gap-2"><User className="h-4 w-4 text-[#FF4D30]" /><div><p className="text-xs text-[#94A3B8]">ID</p><p className="text-xs font-mono text-[#475569]">{user.id.slice(0, 8)}…</p></div></div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Compras", value: resumo.totalCompras, Icon: ShoppingBag, color: "bg-blue-100", ic: "text-blue-600" },
          { label: "Compras pagas", value: resumo.comprasPagas, Icon: CheckCircle2, color: "bg-green-100", ic: "text-green-600" },
          { label: "Total gasto", value: fmtMoney(resumo.totalGasto), Icon: Receipt, color: "bg-orange-100", ic: "text-orange-600" },
          { label: "Consultas", value: resumo.totalConsultas, Icon: Search, color: "bg-purple-100", ic: "text-purple-600" },
        ].map(({ label, value, Icon, color, ic }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon className={`h-5 w-5 ${ic}`} /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{value}</p><p className="text-xs text-[#94A3B8]">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Histórico de compras */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base font-semibold flex items-center gap-2"><CreditCard className="h-5 w-5 text-[#FF4D30]" /> Histórico de Compras</CardTitle></CardHeader>
        <CardContent>
          {compras.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#94A3B8]">Nenhuma compra realizada</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Valor</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Pagamento</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Cupom</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((c) => {
                    const st = payStatus[c.status] || { label: c.status, cls: "bg-gray-100 text-gray-600" };
                    return (
                      <tr key={c.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 text-[#475569] whitespace-nowrap">{fmtDateTime(c.createdAt)}</td>
                        <td className="py-3 font-semibold text-[#0F172A]">
                          {fmtMoney(c.amount)}
                          {c.discountAmount && <span className="ml-1 text-xs text-green-600">(-{fmtMoney(c.discountAmount)})</span>}
                        </td>
                        <td className="py-3 text-[#475569]">{methodLabel[c.method] || c.method}{c.installments && c.installments > 1 ? ` ${c.installments}x` : ""}</td>
                        <td className="py-3">{c.couponCode ? <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{c.couponCode}</code> : "—"}</td>
                        <td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>{st.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consultas */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base font-semibold flex items-center gap-2"><Search className="h-5 w-5 text-[#FF4D30]" /> Consultas Realizadas</CardTitle></CardHeader>
        <CardContent>
          {consultas.length === 0 ? (
            <p className="py-6 text-center text-sm text-[#94A3B8]">Nenhuma consulta</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((c) => {
                    const st = consultaStatus[c.status] || { label: c.status, cls: "bg-gray-100 text-gray-600" };
                    return (
                      <tr key={c.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 font-mono font-semibold text-[#0F172A]">{c.plate && c.plate !== "PENDENTE" ? c.plate : "—"}</td>
                        <td className="py-3 text-[#475569]">{c.consultaName || c.reportType}</td>
                        <td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>{st.label}</span></td>
                        <td className="py-3 text-[#475569] whitespace-nowrap">{fmtDateTime(c.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
