"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  CheckCircle,
  Shield,
  Lock,
  QrCode,
  CreditCard,
  Tag,
  Car,
  ChevronLeft,
  Clock,
  Copy,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { REPORT_FEATURES, formatCurrency, REPORT_PRICES } from "@/constants";

const reportOptions = [
  {
    type: "complete" as const,
    title: "Relatório Completo",
    price: REPORT_PRICES.complete,
    description: "Todos os dados disponíveis sobre o veículo",
    badge: "Mais Popular",
  },
  {
    type: "premium" as const,
    title: "Relatório Premium",
    price: REPORT_PRICES.premium,
    description: "Completo + análise de risco + comparativo de mercado",
    badge: null,
  },
];

type PaymentStep = "select" | "processing" | "pix" | "success";

export default function ComprarPage() {
  const params = useParams();
  const router = useRouter();
  const placa = (params.placa as string) || "";
  const [selectedReport, setSelectedReport] = useState<"complete" | "premium">("complete");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [step, setStep] = useState<PaymentStep>("select");
  const [copied, setCopied] = useState(false);

  // Card form
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");

  const selected = reportOptions.find((r) => r.type === selectedReport)!;
  const discount = couponApplied ? selected.price * 0.1 : 0;
  const total = selected.price - discount;

  const pixCode = "00020126580014br.gov.bcb.pix0136consulta-placa-brasil-pix-" + Date.now();

  function handlePay() {
    setStep("processing");
    setTimeout(() => {
      if (paymentMethod === "pix") {
        setStep("pix");
      } else {
        setStep("success");
      }
    }, 2000);
  }

  function handleCopyPix() {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleConfirmPix() {
    setStep("processing");
    setTimeout(() => setStep("success"), 2500);
  }

  function formatCardNumber(v: string) {
    return v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  }

  function formatExpiry(v: string) {
    const clean = v.replace(/\D/g, "");
    if (clean.length >= 2) return clean.slice(0, 2) + "/" + clean.slice(2, 4);
    return clean;
  }

  // Success screen
  if (step === "success") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]">
            <CheckCircle className="h-10 w-10 text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-[#475569] mb-2">
            Seu relatório está sendo gerado e ficará pronto em instantes.
          </p>
          <p className="text-sm text-[#94A3B8] mb-8">
            Placa: <span className="font-semibold text-[#FF4D30]">{placa}</span> &bull;{" "}
            {selected.title} &bull; {formatCurrency(total)}
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push(`/relatorio/demo-${placa}`)}
              className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold h-12"
            >
              Ver Relatório
            </Button>
            <Link href="/painel">
              <Button variant="outline" className="w-full h-12">
                Ir para o Painel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Processing screen
  if (step === "processing") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <Loader2 className="mx-auto mb-6 h-16 w-16 text-[#FF4D30] animate-spin" />
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
            Processando pagamento...
          </h1>
          <p className="text-[#475569]">Aguarde enquanto processamos seu pagamento.</p>
        </div>
      </div>
    );
  }

  // PIX screen
  if (step === "pix") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
        <div className="mx-auto max-w-lg">
          <button
            onClick={() => setStep("select")}
            className="mb-6 flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>

          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F3]">
                  <QrCode className="h-8 w-8 text-[#FF4D30]" />
                </div>
                <h2 className="text-xl font-bold text-[#0F172A]">Pagamento via Pix</h2>
                <p className="text-sm text-[#475569] mt-1">
                  Escaneie o QR Code ou copie o código Pix
                </p>
              </div>

              {/* QR Code placeholder */}
              <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="mx-auto h-16 w-16 text-gray-400" />
                  <p className="text-xs text-gray-400 mt-2">QR Code Pix</p>
                </div>
              </div>

              {/* Pix Copy */}
              <div className="mb-6">
                <p className="text-xs text-[#475569] mb-2 font-medium">Código Pix Copia e Cola:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs text-[#475569] truncate font-mono">
                    {pixCode}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPix}
                    className="shrink-0 gap-1.5"
                  >
                    {copied ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
              </div>

              {/* Timer and value */}
              <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#F59E0B]" />
                    <span className="text-sm text-[#92400E]">Expira em 30 minutos</span>
                  </div>
                  <span className="text-lg font-bold text-[#0F172A]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleConfirmPix}
                className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold h-12"
              >
                Já realizei o pagamento
              </Button>

              <p className="text-xs text-center text-[#94A3B8] mt-4">
                O relatório será liberado automaticamente após a confirmação do Pix.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main select screen
  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/consulta/${placa}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar para consulta
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] md:text-3xl">
            Finalizar Compra
          </h1>
          <p className="mt-2 text-[#475569]">
            Relatório veicular para a placa{" "}
            <span className="font-semibold text-[#FF4D30]">{placa}</span>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4D30] text-white text-sm font-bold">1</div>
            <span className="text-sm font-medium text-[#0F172A]">Escolha o plano</span>
          </div>
          <div className="w-12 border-t-2 border-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-bold">2</div>
            <span className="text-sm text-[#94A3B8]">Pagamento</span>
          </div>
          <div className="w-12 border-t-2 border-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-bold">3</div>
            <span className="text-sm text-[#94A3B8]">Relatório</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Report Selection */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tipo de Relatório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedReport(option.type)}
                    className={`w-full rounded-xl border-2 p-5 text-left transition-all ${
                      selectedReport === option.type
                        ? "border-[#FF4D30] bg-[#FFF5F3] shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-[#0F172A]">{option.title}</p>
                          {option.badge && (
                            <Badge className="bg-[#FF4D30] text-white text-[10px]">{option.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#475569]">{option.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {REPORT_FEATURES[option.type].slice(0, 4).map((f) => (
                            <span key={f} className="inline-flex items-center gap-1 text-xs text-[#475569] bg-white rounded-full px-2 py-1 border border-gray-100">
                              <CheckCircle className="h-3 w-3 text-[#FF4D30]" />
                              {f}
                            </span>
                          ))}
                          {REPORT_FEATURES[option.type].length > 4 && (
                            <span className="text-xs text-[#FF4D30] font-medium px-2 py-1">
                              +{REPORT_FEATURES[option.type].length - 4} itens
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-[#FF4D30]">{formatCurrency(option.price)}</p>
                        <p className="text-xs text-[#94A3B8]">pagamento único</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "pix"
                        ? "border-[#FF4D30] bg-[#FFF5F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <QrCode className="h-6 w-6 text-[#FF4D30]" />
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">Pix</p>
                      <p className="text-xs text-[#475569]">Instantâneo</p>
                    </div>
                    {paymentMethod === "pix" && (
                      <Badge className="ml-auto bg-[#FF4D30] text-white text-[10px]">-5%</Badge>
                    )}
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "card"
                        ? "border-[#FF4D30] bg-[#FFF5F3]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-[#475569]" />
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">Cartão</p>
                      <p className="text-xs text-[#475569]">Até 12x</p>
                    </div>
                  </button>
                </div>

                {/* Card form */}
                {paymentMethod === "card" && (
                  <div className="space-y-3 rounded-xl bg-gray-50 p-4 mt-2">
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">Número do cartão</label>
                      <Input
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">Nome no cartão</label>
                      <Input
                        placeholder="NOME COMO NO CARTÃO"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#475569] mb-1 block">Validade</label>
                        <Input
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#475569] mb-1 block">CVV</label>
                        <Input
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          maxLength={4}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#475569] mb-1 block">Parcelas</label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(e.target.value)}
                          className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm"
                        >
                          <option value="1">1x {formatCurrency(total)}</option>
                          <option value="2">2x {formatCurrency(total / 2)}</option>
                          <option value="3">3x {formatCurrency(total / 3)}</option>
                          <option value="6">6x {formatCurrency(total / 6)}</option>
                          <option value="12">12x {formatCurrency(total / 12)}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Coupon */}
                <div className="flex gap-2 pt-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
                    <Input
                      placeholder="Cupom de desconto"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      className="pl-9"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (coupon.length > 0) setCouponApplied(true);
                    }}
                  >
                    Aplicar
                  </Button>
                </div>
                {couponApplied && (
                  <div className="flex items-center gap-2 text-sm text-[#FF4D30]">
                    <CheckCircle className="h-4 w-4" />
                    Cupom aplicado! 10% de desconto.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div>
            <Card className="sticky top-24 border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-[#FFF5F3] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF4D30]">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#475569]">Veículo consultado</p>
                    <p className="font-bold text-[#0F172A]">{placa}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-[#0F172A]">
                    {selected.title}
                  </p>
                  <ul className="space-y-1.5">
                    {REPORT_FEATURES[selectedReport].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF4D30]" />
                        <span className="text-xs text-[#475569]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#E2E8F0] pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#475569]">Subtotal</span>
                    <span className="text-[#0F172A]">{formatCurrency(selected.price)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#FF4D30]">Desconto (10%)</span>
                      <span className="text-[#FF4D30]">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  {paymentMethod === "pix" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#FF4D30]">Desconto Pix (5%)</span>
                      <span className="text-[#FF4D30]">-{formatCurrency(total * 0.05)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                    <span className="text-lg font-bold text-[#0F172A]">Total</span>
                    <span className="text-lg font-bold text-[#FF4D30]">
                      {formatCurrency(paymentMethod === "pix" ? total * 0.95 : total)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePay}
                  className="w-full gap-2 bg-[#FF4D30] py-6 text-base font-semibold hover:bg-[#E8432A] rounded-xl"
                >
                  <Lock className="h-5 w-5" />
                  {paymentMethod === "pix" ? "Gerar Pix" : "Pagar com Cartão"}
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-[#94A3B8]">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Criptografia SSL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Garantia de satisfação</span>
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
