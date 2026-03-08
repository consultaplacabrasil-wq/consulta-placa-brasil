"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Shield,
  Lock,
  QrCode,
  CreditCard,
  Tag,
  Car,
} from "lucide-react";
import { REPORT_FEATURES, formatCurrency } from "@/constants";

const reportOptions = [
  {
    type: "complete" as const,
    title: "Relatório Completo",
    price: 24.9,
    description: "Todos os dados disponíveis",
  },
  {
    type: "premium" as const,
    title: "Relatório Premium",
    price: 39.9,
    description: "Completo + análise de risco + comparativo",
  },
];

export default function ComprarPage() {
  const params = useParams();
  const placa = (params.placa as string) || "";
  const [selectedReport, setSelectedReport] = useState<"complete" | "premium">(
    "complete"
  );
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [coupon, setCoupon] = useState("");

  const selected = reportOptions.find((r) => r.type === selectedReport)!;

  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] md:text-3xl">
            Finalizar Compra
          </h1>
          <p className="mt-2 text-[#475569]">
            Relatório veicular para a placa{" "}
            <span className="font-semibold text-[#0066FF]">{placa}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Report Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipo de Relatório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedReport(option.type)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                      selectedReport === option.type
                        ? "border-[#0066FF] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0F172A]">
                          {option.title}
                        </p>
                        <p className="text-sm text-[#475569]">
                          {option.description}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-[#0066FF]">
                        {formatCurrency(option.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                    paymentMethod === "pix"
                      ? "border-[#0066FF] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <QrCode className="h-6 w-6 text-[#0066FF]" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Pix</p>
                    <p className="text-sm text-[#475569]">
                      Confirmação instantânea
                    </p>
                  </div>
                  <Badge className="ml-auto bg-[#00C853] text-white">
                    Recomendado
                  </Badge>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                    paymentMethod === "card"
                      ? "border-[#0066FF] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-[#475569]" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">
                      Cartão de Crédito
                    </p>
                    <p className="text-sm text-[#475569]">
                      Parcelamento em até 12x
                    </p>
                  </div>
                </button>

                {/* Coupon */}
                <div className="mt-4 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
                    <Input
                      placeholder="Cupom de desconto"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline">Aplicar</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <Car className="h-5 w-5 text-[#0066FF]" />
                  <div>
                    <p className="text-sm text-[#475569]">Veículo</p>
                    <p className="font-semibold text-[#0F172A]">{placa}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-[#475569]">
                    O que está incluso:
                  </p>
                  <ul className="space-y-1.5">
                    {REPORT_FEATURES[selectedReport].slice(0, 6).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00C853]" />
                        <span className="text-xs text-[#475569]">{f}</span>
                      </li>
                    ))}
                    {REPORT_FEATURES[selectedReport].length > 6 && (
                      <li className="text-xs text-[#0066FF]">
                        +{REPORT_FEATURES[selectedReport].length - 6} itens
                        inclusos
                      </li>
                    )}
                  </ul>
                </div>

                <div className="border-t border-[#E2E8F0] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#475569]">Subtotal</span>
                    <span className="font-semibold text-[#0F172A]">
                      {formatCurrency(selected.price)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-lg">
                    <span className="font-bold text-[#0F172A]">Total</span>
                    <span className="font-bold text-[#0066FF]">
                      {formatCurrency(selected.price)}
                    </span>
                  </div>
                </div>

                <Button className="w-full gap-2 bg-[#0066FF] py-6 text-lg hover:bg-[#0052CC]">
                  <Lock className="h-5 w-5" />
                  Pagar Agora
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-[#475569]">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>SSL</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
