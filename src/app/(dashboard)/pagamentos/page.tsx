import { CreditCard, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Pagamentos - ConsultaPlaca",
};

export default function PagamentosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Pagamentos</h1>
        <p className="text-gray-500 text-sm">Historico de pagamentos e transacoes</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Historico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table headers */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Data</span>
            <span>Descricao</span>
            <span>Metodo</span>
            <span>Valor</span>
            <span className="text-right">Status</span>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Receipt className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
              Nenhum pagamento encontrado
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Seu historico de pagamentos aparecera aqui apos a compra de creditos ou assinatura de planos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
