"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BarChart3, PieChart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportsData {
  stats: { total: number; monthCount: number; avgPerDay: number; paidPercentage: number };
  distribution: { type: string; count: number; percentage: number }[];
  topPlates: { plate: string; count: number; lastQuery: string }[];
}

const typeLabels: Record<string, string> = {
  basic: "Básico",
  complete: "Completo",
  premium: "Premium",
};

const typeColors: Record<string, string> = {
  basic: "bg-gray-400",
  complete: "bg-[#FF4D30]",
  premium: "bg-[#0F172A]",
};

export default function AdminRelatoriosPage() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((d) => { if (d.stats) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  const stats = data?.stats;
  const distribution = data?.distribution || [];
  const topPlates = data?.topPlates || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Relatórios</h1>
          <p className="text-sm text-[#64748B]">Análise de relatórios gerados pela plataforma</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F3]">
              <FileText className="h-5 w-5 text-[#FF4D30]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{(stats?.total || 0).toLocaleString("pt-BR")}</p>
              <p className="text-xs text-[#94A3B8]">Total de relatórios</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{stats?.avgPerDay || 0}</p>
              <p className="text-xs text-[#94A3B8]">Média por dia</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <PieChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{stats?.paidPercentage || 0}%</p>
              <p className="text-xs text-[#94A3B8]">Pagos (Completo+Premium)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Distribution by type */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            {distribution.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhum relatório gerado ainda</p>
            ) : (
              <>
                <div className="space-y-4">
                  {distribution.map((r) => (
                    <div key={r.type}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-[#0F172A]">{typeLabels[r.type] || r.type}</span>
                        <span className="text-sm text-[#475569]">{r.count.toLocaleString("pt-BR")} ({r.percentage}%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-3 rounded-full ${typeColors[r.type] || "bg-gray-400"}`}
                          style={{ width: `${r.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {distribution.map((r) => (
                    <div key={r.type} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${typeColors[r.type] || "bg-gray-400"}`} />
                      <span className="text-xs text-[#475569]">{typeLabels[r.type] || r.type}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Top plates */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Placas Mais Consultadas</CardTitle>
          </CardHeader>
          <CardContent>
            {topPlates.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">Nenhuma placa consultada ainda</p>
            ) : (
              <div className="space-y-3">
                {topPlates.map((p, i) => (
                  <div key={p.plate} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF5F3] text-sm font-bold text-[#FF4D30]">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-mono font-semibold text-[#0F172A]">{p.plate}</p>
                        <p className="text-xs text-[#94A3B8]">
                          Última consulta: {new Date(p.lastQuery).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#FFF5F3] px-3 py-1 text-sm font-bold text-[#FF4D30]">
                      {p.count}x
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
