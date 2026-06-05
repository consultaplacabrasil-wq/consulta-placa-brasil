import { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock, Car, Calendar, Palette, Fuel, MapPin,
  FileText, Shield, AlertTriangle, RotateCcw, WalletMinimal,
} from "lucide-react";
import { PlateSearch } from "@/components/consulta/plate-search";
import { getVehiclePreview } from "@/lib/consulta-preview";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{ placa: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { placa } = await params;
  return {
    title: `Consulta Veicular — Placa ${placa} | Consulta Placa Brasil`,
    description: `Dados básicos do veículo placa ${placa}. Veja marca, modelo, ano, cor e UF gratuitamente.`,
    robots: { index: false, follow: true },
  };
}

const lockedSections = [
  "Histórico de proprietários",
  "Sinistro detalhado",
  "Histórico de leilão",
  "Gravame / financiamento",
  "Débitos e multas",
  "Restrições e impedimentos",
  "Quilometragem registrada",
  "Valor na Tabela FIPE",
  "Score de risco",
  "Roubo e furto",
];

export default async function ConsultaPage({ params }: Props) {
  const { placa } = await params;
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  // Consulta grátis exige cadastro/login (captura lead e evita abuso de bots)
  const session = await auth();
  if (!session?.user) {
    redirect(`/cadastro?callbackUrl=/consulta/${placaNorm}`);
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "127.0.0.1";

  const result = await getVehiclePreview(placaNorm, ip);

  // ── Limite atingido ───────────────────────────────────────────────────
  if (!result.ok && result.limitReached) {
    return (
      <div className="bg-[#F8FAFC] px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="mb-2 text-xl font-bold text-[#0F172A]">Limite diário atingido</h1>
          <p className="mb-6 text-[#64748B]">{result.error}</p>
          <div className="flex flex-col gap-3">
            <Link href="/#consultas">
              <Button className="w-full bg-[#FF4D30] hover:bg-[#E8432A]">
                Ver relatório completo desta placa
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full gap-2">
                <RotateCcw className="h-4 w-4" /> Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Erro (saldo, placa inválida, etc.) ───────────────────────────────
  if (!result.ok) {
    const isSaldo = result.error.toLowerCase().includes("saldo");
    return (
      <div className="bg-[#F8FAFC] px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${isSaldo ? "bg-amber-100" : "bg-red-100"}`}>
            {isSaldo
              ? <WalletMinimal className="h-8 w-8 text-amber-500" />
              : <Car className="h-8 w-8 text-red-500" />}
          </div>
          <h1 className="mb-2 text-xl font-bold text-[#0F172A]">
            {isSaldo ? "Serviço temporariamente indisponível" : "Não encontrado"}
          </h1>
          <p className="mb-6 text-sm text-[#64748B]">
            {isSaldo
              ? "Estamos com uma instabilidade temporária. Tente novamente em instantes."
              : `Não conseguimos localizar dados para a placa ${placaNorm}. Verifique se a placa está correta.`}
          </p>
          <div className="mx-auto max-w-sm">
            <PlateSearch variant="card" />
          </div>
        </div>
      </div>
    );
  }

  // ── Sucesso ───────────────────────────────────────────────────────────
  const v = result.data;
  const nomeVeiculo = [v.marca, v.modelo].filter(Boolean).join(" ") || "Veículo";
  const ano = v.ano_fabricacao && v.ano_modelo
    ? `${v.ano_fabricacao}/${v.ano_modelo}`
    : v.ano_fabricacao || v.ano_modelo || "—";

  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-4xl">

        {/* Cabeçalho */}
        <Card className="mb-6 overflow-hidden border-0 shadow-md">
          <div className="bg-gradient-to-r from-[#FF4D30] to-[#E8432A] p-6 text-white">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Car className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-red-100">Placa consultada</p>
                <h1 className="text-2xl font-bold tracking-[0.2em]">{placaNorm}</h1>
              </div>
              <Badge className="ml-auto bg-white/20 text-white hover:bg-white/30 border-0">
                Preview Gratuito
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <h2 className="mb-5 text-xl font-bold text-[#0F172A]">{nomeVeiculo}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Calendar, label: "Ano", value: ano },
                { icon: Palette, label: "Cor", value: v.cor || "—" },
                { icon: Fuel, label: "Combustível", value: v.combustivel || "—" },
                { icon: MapPin, label: "Estado", value: v.municipio ? `${v.municipio} / ${v.uf}` : (v.uf || "—") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-[#FF4D30]" />
                  <div>
                    <p className="text-xs text-[#64748B]">{label}</p>
                    <p className="font-semibold text-[#0F172A]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {result.remaining <= 1 && (
              <p className="mt-4 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                ⚠️ Você tem {result.remaining} consulta{result.remaining !== 1 ? "s" : ""} gratuita{result.remaining !== 1 ? "s" : ""} restante{result.remaining !== 1 ? "s" : ""} hoje.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Dados bloqueados */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-[#0F172A]">
              <Shield className="h-5 w-5 text-[#FF4D30]" />
              Dados disponíveis no relatório completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {lockedSections.map((section) => (
                <div key={section} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                  <Lock className="h-4 w-4 shrink-0 text-[#94A3B8]" />
                  <span className="flex-1 text-sm text-[#64748B]">{section}</span>
                  <div className="h-3 w-16 rounded-full bg-gray-200 blur-[3px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-2 border-[#FF4D30]/30 bg-gradient-to-br from-red-50 to-orange-50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF4D30]">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">
              Desbloqueie o relatório completo de{" "}
              <span className="text-[#FF4D30]">{placaNorm}</span>
            </h3>
            <p className="max-w-md text-sm text-[#64748B]">
              Sinistro, leilão, gravame, débitos, quilometragem, tabela FIPE e muito mais.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#consultas">
                <Button size="lg" className="gap-2 bg-[#FF4D30] hover:bg-[#E8432A] font-semibold shadow-md shadow-[#FF4D30]/25">
                  Ver todos os relatórios
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Nova consulta
                </Button>
              </Link>
            </div>
            <p className="text-xs text-[#94A3B8]">Pagamento seguro via Pix ou cartão · Resultado em segundos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
