import { Search, FileSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Consultas - ConsultaPlaca",
};

export default function ConsultasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Consultas</h1>
          <p className="text-gray-500 text-sm">Historico de consultas realizadas</p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold gap-2">
          <Search className="h-4 w-4" />
          Nova Consulta
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Historico de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table headers */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Placa</span>
            <span>Tipo</span>
            <span>Data</span>
            <span>Status</span>
            <span className="text-right">Acoes</span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <FileSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
              Nenhuma consulta realizada
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              Voce ainda nao realizou nenhuma consulta. Comece pesquisando uma placa para obter informacoes detalhadas do veiculo.
            </p>
            <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold gap-2">
              <Search className="h-4 w-4" />
              Realizar primeira consulta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
