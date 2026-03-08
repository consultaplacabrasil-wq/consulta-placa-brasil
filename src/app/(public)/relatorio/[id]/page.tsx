import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Share2,
  Car,
  Shield,
  QrCode,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Relatório Veicular ${id}`,
    robots: { index: false, follow: false },
  };
}

const reportSections = [
  { label: "Dados Cadastrais", status: "ok", detail: "OK" },
  { label: "Situação do Veículo", status: "ok", detail: "Regular" },
  { label: "Proprietários", status: "info", detail: "2 donos" },
  { label: "Sinistro", status: "danger", detail: "CONSTA" },
  { label: "Leilão", status: "ok", detail: "Nada consta" },
  { label: "Roubo/Furto", status: "ok", detail: "Nada consta" },
  { label: "Restrições", status: "warning", detail: "1 item" },
  { label: "Gravame", status: "ok", detail: "Quitado" },
  { label: "Débitos", status: "warning", detail: "R$ 450,00" },
  { label: "Recall", status: "danger", detail: "1 pendente" },
  { label: "Quilometragem", status: "info", detail: "45.230 km" },
  { label: "Tabela FIPE", status: "info", detail: "R$ 98.500" },
];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "ok":
      return <CheckCircle className="h-5 w-5 text-[#00C853]" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-[#FF6D00]" />;
    case "danger":
      return <XCircle className="h-5 w-5 text-[#FF1744]" />;
    default:
      return <CheckCircle className="h-5 w-5 text-[#FF4D30]" />;
  }
}

export default async function RelatorioPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF4D30] to-[#E8432A] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Car className="h-8 w-8" />
                <div>
                  <p className="text-sm text-red-100">Relatório Veicular</p>
                  <h1 className="text-2xl font-bold tracking-wider">
                    ABC1D23
                  </h1>
                </div>
              </div>
              <Badge className="bg-white/20 text-white">Premium</Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-red-100">
              <span>Gerado em: {new Date().toLocaleDateString("pt-BR")}</span>
              <span>ID: {id}</span>
            </div>
          </div>

          {/* Vehicle Info */}
          <CardContent className="p-6">
            <h2 className="mb-1 text-xl font-bold text-[#0F172A]">
              JEEP RENEGADE LONGITUDE
            </h2>
            <p className="text-[#475569]">
              Ano: 2021/2022 | Cor: Prata | Flex
            </p>
          </CardContent>
        </Card>

        {/* Score */}
        <Card className="mb-6">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#00C853] bg-green-50">
              <span className="text-2xl font-bold text-[#00C853]">78</span>
              <span className="text-xs text-[#475569]">/100</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Score de Risco
              </h3>
              <p className="text-[#00C853] font-semibold">RISCO BAIXO</p>
              <p className="text-sm text-[#475569]">
                Este veículo apresenta baixo risco para compra
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#FF4D30]" />
              Resultado da Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportSections.map((section) => (
                <div
                  key={section.label}
                  className="flex items-center justify-between rounded-lg border border-[#E2E8F0] p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon status={section.status} />
                    <span className="font-medium text-[#0F172A]">
                      {section.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      section.status === "ok"
                        ? "text-[#00C853]"
                        : section.status === "warning"
                          ? "text-[#FF6D00]"
                          : section.status === "danger"
                            ? "text-[#FF1744]"
                            : "text-[#0F172A]"
                    }`}
                  >
                    {section.detail}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1 gap-2 bg-[#FF4D30] hover:bg-[#E8432A]">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>

        {/* Verification Seal */}
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center gap-4 p-4">
            <QrCode className="h-10 w-10 text-[#475569]" />
            <div className="text-center">
              <p className="text-xs text-[#475569]">
                Selo de Autenticidade
              </p>
              <p className="text-sm font-semibold text-[#0F172A]">
                Verificação #{id}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
