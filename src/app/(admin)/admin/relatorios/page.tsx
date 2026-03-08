import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Relatórios - Admin ConsultaPlaca" };

const reportStats = [
  { type: "Básico", count: 4521, percentage: 54, color: "bg-gray-400" },
  { type: "Completo", count: 2847, percentage: 34, color: "bg-[#FF4D30]" },
  { type: "Premium", count: 979, percentage: 12, color: "bg-[#1A1A2E]" },
];

const topPlates = [
  { plate: "ABC1D23", count: 8, lastQuery: "08/03/2026" },
  { plate: "XYZ9A87", count: 6, lastQuery: "08/03/2026" },
  { plate: "DEF4G56", count: 5, lastQuery: "07/03/2026" },
  { plate: "GHI7H89", count: 4, lastQuery: "07/03/2026" },
  { plate: "JKL2M34", count: 3, lastQuery: "06/03/2026" },
];

export default function AdminRelatoriosPage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0ED]">
              <FileText className="h-5 w-5 text-[#FF4D30]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">8.347</p>
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
              <p className="text-xl font-bold text-[#0F172A]">278</p>
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
              <p className="text-xl font-bold text-[#0F172A]">46%</p>
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
            <div className="space-y-4">
              {reportStats.map((r) => (
                <div key={r.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#0F172A]">{r.type}</span>
                    <span className="text-sm text-[#475569]">{r.count.toLocaleString()} ({r.percentage}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100">
                    <div className={`h-3 rounded-full ${r.color}`} style={{ width: `${r.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              {reportStats.map((r) => (
                <div key={r.type} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${r.color}`} />
                  <span className="text-xs text-[#475569]">{r.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top plates */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Placas Mais Consultadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPlates.map((p, i) => (
                <div key={p.plate} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0ED] text-sm font-bold text-[#FF4D30]">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-mono font-semibold text-[#0F172A]">{p.plate}</p>
                      <p className="text-xs text-[#94A3B8]">Última consulta: {p.lastQuery}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#FFF0ED] px-3 py-1 text-sm font-bold text-[#FF4D30]">
                    {p.count}x
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
