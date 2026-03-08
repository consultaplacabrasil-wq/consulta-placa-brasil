import { Metadata } from "next";
import Link from "next/link";
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
  Lock,
  Car,
  Calendar,
  Palette,
  Fuel,
  MapPin,
  FileText,
  Shield,
} from "lucide-react";

interface Props {
  params: Promise<{ placa: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { placa } = await params;
  return {
    title: `Consulta Veicular Placa ${placa}`,
    description: `Consulte o histórico completo do veículo placa ${placa}. Verifique sinistro, leilão, roubo, débitos e mais.`,
    robots: { index: false, follow: true },
  };
}

// Mock data for preview
const mockVehicle = {
  brand: "JEEP",
  model: "RENEGADE LONGITUDE",
  yearFab: 2021,
  yearModel: 2022,
  color: "Prata",
  fuel: "Flex",
  type: "Automóvel",
  uf: "SP",
};

const statusItems = [
  { label: "Sinistro", status: "warning", icon: AlertTriangle },
  { label: "Leilão", status: "ok", icon: CheckCircle },
  { label: "Roubo/Furto", status: "ok", icon: CheckCircle },
  { label: "Restrições", status: "warning", icon: AlertTriangle },
  { label: "Gravame", status: "ok", icon: CheckCircle },
  { label: "Recall", status: "danger", icon: XCircle },
];

const lockedSections = [
  "Histórico de proprietários",
  "Detalhes de sinistro",
  "Débitos e multas detalhados",
  "Quilometragem registrada",
  "Valor na Tabela FIPE",
  "Score de risco",
];

export default async function ConsultaPage({ params }: Props) {
  const { placa } = await params;

  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-4xl">
        {/* Vehicle Info Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Car className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Placa</p>
                <h1 className="text-2xl font-bold tracking-wider">{placa}</h1>
              </div>
              <Badge className="ml-auto bg-white/20 text-white hover:bg-white/30">
                Preview Gratuito
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {mockVehicle.brand} {mockVehicle.model}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#475569]" />
                <div>
                  <p className="text-xs text-[#475569]">Ano</p>
                  <p className="font-semibold text-[#0F172A]">
                    {mockVehicle.yearFab}/{mockVehicle.yearModel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-[#475569]" />
                <div>
                  <p className="text-xs text-[#475569]">Cor</p>
                  <p className="font-semibold text-[#0F172A]">
                    {mockVehicle.color}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-[#475569]" />
                <div>
                  <p className="text-xs text-[#475569]">Combustível</p>
                  <p className="font-semibold text-[#0F172A]">
                    {mockVehicle.fuel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#475569]" />
                <div>
                  <p className="text-xs text-[#475569]">UF</p>
                  <p className="font-semibold text-[#0F172A]">
                    {mockVehicle.uf}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-[#0066FF]" />
              Indicadores de Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg border p-3 ${
                    item.status === "ok"
                      ? "border-green-200 bg-green-50"
                      : item.status === "warning"
                        ? "border-orange-200 bg-orange-50"
                        : "border-red-200 bg-red-50"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      item.status === "ok"
                        ? "text-[#00C853]"
                        : item.status === "warning"
                          ? "text-[#FF6D00]"
                          : "text-[#FF1744]"
                    }`}
                  />
                  <span className="text-sm font-medium text-[#0F172A]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locked Sections */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-[#475569]" />
              Dados Disponíveis no Relatório Completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lockedSections.map((section) => (
                <div
                  key={section}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <Lock className="h-4 w-4 text-[#475569]" />
                  <span className="flex-1 text-sm text-[#475569]">
                    {section}
                  </span>
                  <div className="h-4 w-24 rounded bg-gray-200/80 blur-[2px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-2 border-[#0066FF] bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <FileText className="h-10 w-10 text-[#0066FF]" />
            <h3 className="text-xl font-bold text-[#0F172A]">
              Desbloqueie o Relatório Completo
            </h3>
            <p className="max-w-md text-[#475569]">
              Tenha acesso a todos os dados do veículo, incluindo histórico de
              sinistro, débitos, quilometragem, tabela FIPE e muito mais.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/comprar/${placa}`}>
                <Button
                  size="lg"
                  className="gap-2 bg-[#0066FF] hover:bg-[#0052CC]"
                >
                  Relatório Completo — R$ 24,90
                </Button>
              </Link>
              <Link href={`/comprar/${placa}?tipo=premium`}>
                <Button size="lg" variant="outline" className="gap-2">
                  Relatório Premium — R$ 39,90
                </Button>
              </Link>
            </div>
            <p className="text-xs text-[#475569]">
              Pagamento seguro via Pix ou cartão. Relatório instantâneo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
