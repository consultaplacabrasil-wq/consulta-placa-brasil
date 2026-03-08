import Link from "next/link";
import { Search, Coins, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Painel - ConsultaPlaca",
};

export default function PainelPage() {
  const stats = [
    {
      title: "Total de Consultas",
      value: "0",
      description: "consultas realizadas",
      icon: Search,
      color: "bg-blue-100 text-[#FF4D30]",
    },
    {
      title: "Creditos Disponiveis",
      value: "0",
      description: "creditos restantes",
      icon: Coins,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Ultimo Relatorio",
      value: "Nenhum",
      description: "nenhum relatorio gerado",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Painel</h1>
          <p className="text-gray-500 text-sm">Bem-vindo ao seu painel de controle</p>
        </div>
        <Link href="/consultas">
          <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
            <Search className="h-4 w-4" />
            Nova Consulta
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0F172A]">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">Acoes Rapidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/consultas" className="group">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#FF4D30] hover:bg-red-50">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-[#FF4D30]" />
                  <span className="text-sm font-medium text-[#0F172A]">Nova Consulta</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
              </div>
            </Link>
            <Link href="/creditos" className="group">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#FF4D30] hover:bg-red-50">
                <div className="flex items-center gap-3">
                  <Coins className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-[#0F172A]">Comprar Creditos</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
              </div>
            </Link>
            <Link href="/relatorios" className="group">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#FF4D30] hover:bg-red-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-[#0F172A]">Ver Relatorios</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FF4D30]" />
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
