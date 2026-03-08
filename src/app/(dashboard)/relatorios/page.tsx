import { FileText, FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Relatorios - ConsultaPlaca",
};

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Relatorios</h1>
        <p className="text-gray-500 text-sm">Relatorios gerados a partir das suas consultas</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Meus Relatorios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table headers */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Placa</span>
            <span>Data de Geracao</span>
            <span>Tipo</span>
            <span className="text-right">Acoes</span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <FolderOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
              Nenhum relatorio encontrado
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Os relatorios serao gerados automaticamente apos cada consulta realizada. Faca sua primeira consulta para gerar um relatorio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
