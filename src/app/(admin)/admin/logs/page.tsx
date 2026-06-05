"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollText, Search, Loader2, ShieldAlert } from "lucide-react";

interface AdminLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
  adminName: string | null;
  adminEmail: string | null;
}

const actionLabels: Record<string, { label: string; color: string }> = {
  criar_usuario: { label: "Criou usuário", color: "bg-green-100 text-green-700" },
  desativar_usuario: { label: "Desativou usuário", color: "bg-red-100 text-red-700" },
  reativar_usuario: { label: "Reativou usuário", color: "bg-blue-100 text-blue-700" },
  alterar_senha_usuario: { label: "Alterou senha", color: "bg-amber-100 text-amber-700" },
  login_admin: { label: "Login admin", color: "bg-purple-100 text-purple-700" },
  criar_cupom: { label: "Criou cupom", color: "bg-green-100 text-green-700" },
  editar_cupom: { label: "Editou cupom", color: "bg-amber-100 text-amber-700" },
  alterar_config: { label: "Alterou configuração", color: "bg-amber-100 text-amber-700" },
};

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/logs", { cache: "no-store" });
      if (res.ok) setLogs(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const filtered = logs.filter((l) => {
    const t = search.toLowerCase();
    return (
      !t ||
      l.adminName?.toLowerCase().includes(t) ||
      l.adminEmail?.toLowerCase().includes(t) ||
      l.action.toLowerCase().includes(t) ||
      JSON.stringify(l.details || {}).toLowerCase().includes(t)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Logs Administrativos</h1>
        <p className="text-sm text-[#64748B]">Registro de ações críticas realizadas no painel</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-[#FF4D30]" />
              {filtered.length} registros
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input placeholder="Buscar por admin, ação..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <ShieldAlert className="h-12 w-12 text-[#94A3B8] mb-3" />
              <p className="text-[#475569] font-medium">Nenhum log registrado ainda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Ação</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Detalhes</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8] hidden md:table-cell">Admin</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8] hidden lg:table-cell">IP</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((log) => {
                    const a = actionLabels[log.action] || { label: log.action, color: "bg-gray-100 text-gray-700" };
                    const d = log.details as { name?: string; email?: string } | null;
                    return (
                      <tr key={log.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${a.color}`}>{a.label}</span>
                        </td>
                        <td className="py-3 text-[#475569]">{d?.name || d?.email || "—"}</td>
                        <td className="py-3 text-[#475569] hidden md:table-cell">{log.adminName || "—"}</td>
                        <td className="py-3 text-[#94A3B8] hidden lg:table-cell font-mono text-xs">{log.ipAddress || "—"}</td>
                        <td className="py-3 text-[#475569] whitespace-nowrap">{fmtDate(log.createdAt)}</td>
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
