"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Activity,
  FileText,
  Clock,
} from "lucide-react";

const consultas = [
  { id: "CON-001", plate: "ABC1D23", type: "Premium", user: "Carlos Mendes", status: "completed", time: "08/03/2026 14:32", duration: "3.2s" },
  { id: "CON-002", plate: "XYZ9A87", type: "Completo", user: "Ana Paula Santos", status: "completed", time: "08/03/2026 13:15", duration: "2.8s" },
  { id: "CON-003", plate: "DEF4G56", type: "Básico", user: "Anônimo", status: "completed", time: "08/03/2026 12:48", duration: "1.5s" },
  { id: "CON-004", plate: "GHI7H89", type: "Completo", user: "Roberto Lima", status: "completed", time: "08/03/2026 11:22", duration: "2.9s" },
  { id: "CON-005", plate: "JKL2M34", type: "Básico", user: "Anônimo", status: "completed", time: "08/03/2026 10:05", duration: "1.2s" },
  { id: "CON-006", plate: "MNO5P67", type: "Premium", user: "João Pereira", status: "failed", time: "08/03/2026 09:45", duration: "15.0s" },
  { id: "CON-007", plate: "QRS8T90", type: "Básico", user: "Anônimo", status: "completed", time: "07/03/2026 22:18", duration: "1.4s" },
  { id: "CON-008", plate: "TUV1W23", type: "Completo", user: "Maria Ferreira", status: "completed", time: "07/03/2026 20:30", duration: "3.1s" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  completed: { label: "Concluída", class: "bg-green-100 text-green-700" },
  processing: { label: "Processando", class: "bg-blue-100 text-blue-700" },
  failed: { label: "Falhou", class: "bg-red-100 text-red-700" },
};

const typeMap: Record<string, string> = {
  "Básico": "bg-gray-100 text-gray-700",
  "Completo": "bg-[#FFF0ED] text-[#FF4D30]",
  "Premium": "bg-[#EEF2FF] text-[#1A1A2E]",
};

export default function AdminConsultasPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = consultas.filter(
    (c) => c.plate.toLowerCase().includes(searchTerm.toLowerCase()) || c.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Consultas</h1>
        <p className="text-sm text-[#64748B]">Monitore todas as consultas realizadas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">8.347</p>
              <p className="text-xs text-[#94A3B8]">Total este mês</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">99.2%</p>
              <p className="text-xs text-[#94A3B8]">Taxa de sucesso</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">2.4s</p>
              <p className="text-xs text-[#94A3B8]">Tempo médio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Histórico de Consultas</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input placeholder="Buscar por placa ou usuário..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">ID</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Placa</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Tipo</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Usuário</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Tempo</th>
                  <th className="pb-3 text-left font-medium text-[#94A3B8]">Data</th>
                  <th className="pb-3 text-right font-medium text-[#94A3B8]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const st = statusMap[c.status] || statusMap.completed;
                  const tc = typeMap[c.type] || typeMap["Básico"];
                  return (
                    <tr key={c.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 font-mono text-xs text-[#475569]">{c.id}</td>
                      <td className="py-3 font-mono font-semibold text-[#FF4D30]">{c.plate}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tc}`}>{c.type}</span>
                      </td>
                      <td className="py-3 text-[#475569]">{c.user}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.class}`}>{st.label}</span>
                      </td>
                      <td className="py-3 text-[#475569]">{c.duration}</td>
                      <td className="py-3 text-xs text-[#475569]">{c.time}</td>
                      <td className="py-3 text-right">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569] ml-auto">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-[#94A3B8]">Mostrando 1-8 de 8.347</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4D30] text-white text-sm font-medium">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50 text-sm">2</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#475569] hover:bg-gray-50"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
