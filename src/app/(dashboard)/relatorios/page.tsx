import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, FolderOpen, Eye, Download, Search, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Relatórios - ConsultaPlaca",
};

const typeLabels: Record<string, { label: string; color: string }> = {
  basic: { label: "Dados Cadastrais", color: "bg-blue-100 text-blue-700" },
  complete: { label: "Débitos e Multas", color: "bg-amber-100 text-amber-700" },
  premium: { label: "Completa", color: "bg-green-100 text-green-700" },
};

export default async function RelatoriosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userReports = await db
    .select({
      id: reports.id,
      plate: reports.plate,
      type: reports.type,
      createdAt: reports.createdAt,
      requestId: reports.requestId,
    })
    .from(reports)
    .innerJoin(reportRequests, eq(reports.requestId, reportRequests.id))
    .where(eq(reportRequests.userId, session.user.id))
    .orderBy(desc(reports.createdAt))
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Relatórios</h1>
          <p className="text-gray-500 text-sm">Relatórios gerados a partir das suas consultas</p>
        </div>
        <Link href="/consultas/nova">
          <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
            <CreditCard className="h-4 w-4" />
            Comprar Consulta
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Meus Relatórios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <FolderOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                Nenhum relatório encontrado
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Os relatórios serão gerados automaticamente após cada consulta realizada.
              </p>
              <Link href="/consultas/nova">
                <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2">
                  <Search className="h-4 w-4" />
                  Fazer primeira consulta
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div className="hidden sm:grid sm:grid-cols-4 gap-4 pb-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Placa</span>
                <span>Data de Geração</span>
                <span>Tipo</span>
                <span className="text-right">Ações</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100">
                {userReports.map((report) => {
                  const typeInfo = typeLabels[report.type] || typeLabels.basic;
                  return (
                    <div
                      key={report.id}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 py-4 items-center"
                    >
                      {/* Placa */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF4D30]/10">
                          <FileText className="h-5 w-5 text-[#FF4D30]" />
                        </div>
                        <span className="font-bold text-[#0F172A] tracking-wider font-mono">
                          {report.plate}
                        </span>
                      </div>

                      {/* Data */}
                      <span className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "America/Sao_Paulo",
                        }).format(report.createdAt)}
                      </span>

                      {/* Tipo */}
                      <Badge className={`${typeInfo.color} border-0 w-fit`}>
                        {typeInfo.label}
                      </Badge>

                      {/* Ações */}
                      <div className="flex justify-end gap-2">
                        <Link href={`/relatorio/${report.id}`}>
                          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                            <Eye className="h-3.5 w-3.5" />
                            Ver
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
