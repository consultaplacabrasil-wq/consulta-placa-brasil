"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileSearch, Search, Loader2, Download, ShieldCheck } from "lucide-react";
import { CONSULTA_PURPOSE_LABELS, type ConsultaPurpose } from "@/lib/consulta-purpose";

/**
 * Trilha de auditoria individualizada — salvaguarda exigida pela Nota Técnica
 * SENATRAN nº 554/2026, item 3.2.2.5. A documentação deve permanecer à
 * disposição da SENATRAN e da ANPD (art. 10, § 3º, da LGPD), daí a exportação.
 */

interface AuditRow {
  id: string;
  createdAt: string;
  plate: string | null;
  purpose: ConsultaPurpose | null;
  outcome: string;
  detail: string | null;
  ipAddress: string | null;
  userId: string;
  userName: string | null;
  userEmail: string | null;
}

interface Stat {
  outcome: string;
  total: number;
}

const OUTCOMES: Record<string, { label: string; color: string }> = {
  executed: { label: "Executada", color: "bg-green-100 text-green-700" },
  blocked_rate_limit: { label: "Limite de volume", color: "bg-amber-100 text-amber-700" },
  rejected_purpose: { label: "Sem finalidade", color: "bg-red-100 text-red-700" },
  rejected_plate: { label: "Placa inválida", color: "bg-gray-100 text-gray-700" },
  rejected_request: { label: "Pedido inválido", color: "bg-gray-100 text-gray-700" },
  failed: { label: "Falha", color: "bg-red-100 text-red-700" },
};

const PURPOSE_CURTO: Record<ConsultaPurpose, string> = {
  compra: "Compra",
  venda: "Venda",
  negociacao: "Negociação",
};

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export default function AuditoriaConsultasPage() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [limite, setLimite] = useState(300);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [outcome, setOutcome] = useState("todos");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const buildQuery = useCallback(() => {
    const p = new URLSearchParams();
    if (search.trim()) p.set("q", search.trim());
    if (outcome !== "todos") p.set("outcome", outcome);
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    return p;
  }, [search, outcome, from, to]);

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/auditoria-consultas?${buildQuery()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setRows(data.rows ?? []);
        setStats(data.stats ?? []);
        setLimite(data.limite ?? 300);
      }
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  // Debounce: evita uma requisição por tecla digitada na busca.
  useEffect(() => {
    const t = setTimeout(fetchRows, 350);
    return () => clearTimeout(t);
  }, [fetchRows]);

  function exportarCsv() {
    const p = buildQuery();
    p.set("format", "csv");
    window.location.href = `/api/admin/auditoria-consultas?${p}`;
  }

  const total = stats.reduce((s, x) => s + x.total, 0);
  const executadas = stats.find((s) => s.outcome === "executed")?.total ?? 0;
  const bloqueadas = stats.find((s) => s.outcome === "blocked_rate_limit")?.total ?? 0;
  const semFinalidade = stats.find((s) => s.outcome === "rejected_purpose")?.total ?? 0;

  const cards = [
    { label: "Tentativas registradas", valor: total, cor: "text-[#0F172A]" },
    { label: "Consultas executadas", valor: executadas, cor: "text-green-600" },
    { label: "Barradas por volume", valor: bloqueadas, cor: "text-amber-600" },
    { label: "Sem finalidade declarada", valor: semFinalidade, cor: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Trilha de Auditoria das Consultas</h1>
        <p className="text-sm text-[#64748B]">
          Registro individualizado de toda tentativa de consulta veicular, com a finalidade
          declarada pelo solicitante. Salvaguarda exigida pela SENATRAN — mantida à disposição
          da SENATRAN e da ANPD.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-[#94A3B8]">{c.label}</p>
              <p className={`mt-1 text-2xl font-bold ${c.cor}`}>{c.valor}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-[#FF4D30]" />
                {rows.length} registros
                {rows.length >= limite && (
                  <span className="text-xs font-normal text-[#94A3B8]">
                    (exibindo os {limite} mais recentes — refine os filtros ou exporte)
                  </span>
                )}
              </CardTitle>
              <Button onClick={exportarCsv} variant="outline" className="gap-2 font-semibold">
                <Download className="h-4 w-4" />
                Exportar CSV
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <Input
                  placeholder="Placa, nome ou e-mail..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm text-[#0F172A]"
              >
                <option value="todos">Todos os desfechos</option>
                {Object.entries(OUTCOMES).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Data inicial" />
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Data final" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" /></div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <ShieldCheck className="h-12 w-12 text-[#94A3B8] mb-3" />
              <p className="text-[#475569] font-medium">Nenhuma consulta registrada neste recorte</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Finalidade</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Desfecho</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8] hidden lg:table-cell">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const o = OUTCOMES[r.outcome] || { label: r.outcome, color: "bg-gray-100 text-gray-700" };
                    return (
                      <tr key={r.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 text-[#475569] whitespace-nowrap">{fmtDate(r.createdAt)}</td>
                        <td className="py-3 text-[#475569]">
                          <span className="block">{r.userName || "—"}</span>
                          <span className="block text-xs text-[#94A3B8]">{r.userEmail || r.userId}</span>
                        </td>
                        <td className="py-3 font-mono text-xs text-[#0F172A]">{r.plate || "—"}</td>
                        <td
                          className="py-3 text-[#475569]"
                          title={r.purpose ? CONSULTA_PURPOSE_LABELS[r.purpose] : undefined}
                        >
                          {r.purpose ? PURPOSE_CURTO[r.purpose] : "—"}
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${o.color}`}>
                            {o.label}
                          </span>
                          {r.detail && (
                            <span className="block text-xs text-[#94A3B8] mt-0.5">{r.detail}</span>
                          )}
                        </td>
                        <td className="py-3 text-[#94A3B8] hidden lg:table-cell font-mono text-xs">{r.ipAddress || "—"}</td>
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
