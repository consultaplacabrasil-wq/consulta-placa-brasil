"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  QrCode,
  CreditCard,
  Tag,
  Lock,
  Shield,
  CheckCircle,
  ChevronLeft,
  Trash2,
  Copy,
  Check,
  Clock,
  Loader2,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CheckoutStep = "review" | "payment" | "processing" | "pix" | "success";

function validatePassword(pw: string): string[] {
  const errors: string[] = [];
  if (pw.length < 8) errors.push("Mínimo 8 caracteres");
  if (!/[A-Z]/.test(pw)) errors.push("1 letra maiúscula");
  if (!/[0-9]/.test(pw)) errors.push("1 número");
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)) errors.push("1 caractere especial");
  // Sequential numbers (123, 234, etc.)
  for (let i = 0; i < pw.length - 2; i++) {
    const a = pw.charCodeAt(i), b = pw.charCodeAt(i + 1), c = pw.charCodeAt(i + 2);
    if (b === a + 1 && c === b + 1) { errors.push("Sem sequências (ex: 123, abc)"); break; }
  }
  // Repeated characters (111, aaa)
  for (let i = 0; i < pw.length - 2; i++) {
    if (pw[i] === pw[i + 1] && pw[i + 1] === pw[i + 2]) { errors.push("Sem caracteres repetidos (ex: 111, aaa)"); break; }
  }
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const { items, removeItem, updateQuantity, clearCart, totalPrice, coupon: storeCoupon, setCoupon: setStoreCoupon } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>("review");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [copied, setCopied] = useState(false);

  // Customer info
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Field errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [checkoutError, setCheckoutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card form
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");

  // Coupon (local for input)
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = totalPrice();
  const discountPercent = storeCoupon?.discountPercent || 0;
  const discount = subtotal * (discountPercent / 100);
  const pixDiscount = paymentMethod === "pix" ? (subtotal - discount) * 0.05 : 0;
  const total = subtotal - discount - pixDiscount;

  const pixCode = "00020126580014br.gov.bcb.pix0136consulta-placa-brasil-checkout-" + Date.now();

  function formatCardNumber(v: string) {
    return v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  }

  function formatExpiry(v: string) {
    const clean = v.replace(/\D/g, "");
    if (clean.length >= 2) return clean.slice(0, 2) + "/" + clean.slice(2, 4);
    return clean;
  }

  function formatCpf(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 11);
    if (clean.length > 9) return clean.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    if (clean.length > 6) return clean.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    if (clean.length > 3) return clean.replace(/(\d{3})(\d+)/, "$1.$2");
    return clean;
  }

  function formatPhone(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 11);
    if (clean.length > 6) return clean.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
    if (clean.length > 2) return clean.replace(/(\d{2})(\d+)/, "($1) $2");
    return clean;
  }

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || "Cupom inválido");
        return;
      }
      setStoreCoupon(data);
      setCouponCode("");
    } catch {
      setCouponError("Erro ao validar cupom");
    } finally {
      setCouponLoading(false);
    }
  }

  async function handlePay() {
    setCheckoutError("");
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = "Nome obrigatório";
    if (!email.trim()) errors.email = "E-mail obrigatório";
    if (!cpf.trim() || cpf.replace(/\D/g, "").length < 11) errors.cpf = "CPF obrigatório";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone obrigatório";

    if (!isLoggedIn) {
      if (!password) {
        errors.password = "Senha obrigatória";
      } else {
        const pwErrors = validatePassword(password);
        if (pwErrors.length > 0) errors.password = pwErrors.join(", ");
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          cpfCnpj: cpf,
          phone: phone,
          password: !isLoggedIn ? password : undefined,
          paymentMethod: paymentMethod === "pix" ? "pix" : "credit_card",
          couponId: storeCoupon?.id,
          couponDiscountPercent: storeCoupon?.discountPercent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "EMAIL_EXISTS" || data.code === "CPF_EXISTS") {
          setCheckoutError(data.error + ' <a href="/login" class="underline font-semibold">Ir para o login</a>');
        } else {
          setCheckoutError(data.error || "Erro ao processar pagamento");
        }
        setIsSubmitting(false);
        return;
      }

      // Auto-login if new user
      if (data.isNewUser) {
        await signIn("credentials", {
          email: email.toLowerCase().trim(),
          password,
          redirect: false,
        });
      }

      setStep("processing");
      setTimeout(() => {
        if (paymentMethod === "pix") {
          setStep("pix");
        } else {
          setStep("success");
        }
      }, 2000);
    } catch {
      setCheckoutError("Erro de conexão. Tente novamente.");
      setIsSubmitting(false);
    }
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

  // Empty cart
  if (items.length === 0 && step !== "success") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <ShoppingCart className="mx-auto mb-6 h-16 w-16 text-gray-200" />
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Carrinho vazio</h1>
          <p className="text-[#475569] mb-8">Adicione consultas ou pacotes ao carrinho para continuar.</p>
          <Link href="/">
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold px-8">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success
  if (step === "success") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]">
            <CheckCircle className="h-10 w-10 text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Pagamento Confirmado!</h1>
          <p className="text-[#475569] mb-2">Sua compra foi processada com sucesso.</p>
          <p className="text-sm text-[#94A3B8] mb-4">
            Valor pago: <span className="font-semibold text-[#0F172A]">{formatCurrency(total)}</span>
          </p>
          <div className="rounded-xl bg-gray-50 p-4 mb-8 text-left">
            <p className="text-sm font-semibold text-[#0F172A] mb-2">Itens comprados:</p>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm py-1">
                <span className="text-[#475569]">{item.name} {item.quantity > 1 && `x${item.quantity}`}</span>
                <span className="font-medium text-[#0F172A]">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => { clearCart(); router.push("/painel"); }}
              className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold h-12"
            >
              Ir para o Painel
            </Button>
            <Button
              variant="outline"
              onClick={() => { clearCart(); router.push("/"); }}
              className="w-full h-12"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Processing
  if (step === "processing") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <Loader2 className="mx-auto mb-6 h-16 w-16 text-[#FF4D30] animate-spin" />
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Processando pagamento...</h1>
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
          <button onClick={() => setStep("payment")} className="mb-6 flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F3]">
                  <QrCode className="h-8 w-8 text-[#FF4D30]" />
                </div>
                <h2 className="text-xl font-bold text-[#0F172A]">Pagamento via Pix</h2>
                <p className="text-sm text-[#475569] mt-1">Escaneie o QR Code ou copie o código Pix</p>
              </div>

              <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="mx-auto h-16 w-16 text-gray-400" />
                  <p className="text-xs text-gray-400 mt-2">QR Code Pix</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-[#475569] mb-2 font-medium">Código Pix Copia e Cola:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5 text-xs text-[#475569] truncate font-mono">
                    {pixCode}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopyPix} className="shrink-0 gap-1.5">
                    {copied ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
              </div>

              <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#F59E0B]" />
                    <span className="text-sm text-[#92400E]">Expira em 30 minutos</span>
                  </div>
                  <span className="text-lg font-bold text-[#0F172A]">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button onClick={handleConfirmPix} className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold h-12">
                Já realizei o pagamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Payment step
  if (step === "payment") {
    return (
      <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <button onClick={() => setStep("review")} className="mb-6 flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]">
            <ChevronLeft className="h-4 w-4" /> Voltar ao carrinho
          </button>

          {/* Progress */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-white text-sm font-bold">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-[#22C55E]">Carrinho</span>
            </div>
            <div className="w-12 border-t-2 border-[#FF4D30]" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4D30] text-white text-sm font-bold">2</div>
              <span className="text-sm font-medium text-[#0F172A]">Pagamento</span>
            </div>
            <div className="w-12 border-t-2 border-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-bold">3</div>
              <span className="text-sm text-[#94A3B8]">Confirmação</span>
            </div>
          </div>

          {/* Logged in banner */}
          {isLoggedIn && (
            <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Logado como <strong>{session.user?.email}</strong></span>
            </div>
          )}

          {/* Checkout error */}
          {checkoutError && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span className="text-sm text-red-700" dangerouslySetInnerHTML={{ __html: checkoutError }} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Customer Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Seus Dados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">Nome completo *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <Input placeholder="Seu nome" value={name} onChange={(e) => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: "" })); }} className={`pl-9 ${fieldErrors.name ? "border-red-400" : ""}`} />
                      </div>
                      {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">CPF *</label>
                      <Input placeholder="000.000.000-00" value={cpf} onChange={(e) => { setCpf(formatCpf(e.target.value)); setFieldErrors(p => ({ ...p, cpf: "" })); }} maxLength={14} className={fieldErrors.cpf ? "border-red-400" : ""} />
                      {fieldErrors.cpf && <p className="text-xs text-red-500 mt-1">{fieldErrors.cpf}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">E-mail *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <Input placeholder="seu@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: "" })); }} className={`pl-9 ${fieldErrors.email ? "border-red-400" : ""}`} />
                      </div>
                      {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">Telefone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <Input placeholder="(11) 99999-9999" value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); setFieldErrors(p => ({ ...p, phone: "" })); }} className={`pl-9 ${fieldErrors.phone ? "border-red-400" : ""}`} maxLength={15} />
                      </div>
                      {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Password (only for non-logged-in users) */}
                  {!isLoggedIn && (
                    <div>
                      <label className="text-xs font-medium text-[#475569] mb-1 block">Senha * <span className="text-gray-400 font-normal">(criar conta para acompanhar pedidos)</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Mín. 8 chars, 1 maiúscula, 1 número, 1 especial"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: "" })); }}
                          className={`pl-9 pr-10 ${fieldErrors.password ? "border-red-400" : ""}`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
                    </div>
                  )}
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
                        paymentMethod === "pix" ? "border-[#FF4D30] bg-[#FFF5F3]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <QrCode className="h-6 w-6 text-[#FF4D30]" />
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">Pix</p>
                        <p className="text-xs text-[#475569]">Instantâneo</p>
                      </div>
                      {paymentMethod === "pix" && <Badge className="ml-auto bg-[#FF4D30] text-white text-[10px]">-5%</Badge>}
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        paymentMethod === "card" ? "border-[#FF4D30] bg-[#FFF5F3]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard className="h-6 w-6 text-[#475569]" />
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">Cartão</p>
                        <p className="text-xs text-[#475569]">Até 12x</p>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                      <div>
                        <label className="text-xs font-medium text-[#475569] mb-1 block">Número do cartão</label>
                        <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className="bg-white" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#475569] mb-1 block">Nome no cartão</label>
                        <Input placeholder="NOME COMO NO CARTÃO" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} className="bg-white" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#475569] mb-1 block">Validade</label>
                          <Input placeholder="MM/AA" value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} maxLength={5} className="bg-white" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#475569] mb-1 block">CVV</label>
                          <Input placeholder="123" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} className="bg-white" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#475569] mb-1 block">Parcelas</label>
                          <select value={installments} onChange={(e) => setInstallments(e.target.value)} className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm">
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
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="sticky top-24 border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium text-[#0F172A]">{item.name}</p>
                          {item.quantity > 1 && <p className="text-xs text-[#94A3B8]">x{item.quantity}</p>}
                        </div>
                        <span className="font-semibold text-[#0F172A]">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#475569]">Subtotal</span>
                      <span className="text-[#0F172A]">{formatCurrency(subtotal)}</span>
                    </div>
                    {storeCoupon && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#FF4D30]">Cupom ({storeCoupon.discountPercent}%)</span>
                        <span className="text-[#FF4D30]">-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    {paymentMethod === "pix" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#FF4D30]">Desconto Pix (5%)</span>
                        <span className="text-[#FF4D30]">-{formatCurrency(pixDiscount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                      <span className="text-lg font-bold text-[#0F172A]">Total</span>
                      <span className="text-lg font-bold text-[#FF4D30]">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePay}
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-[#FF4D30] py-6 text-base font-semibold hover:bg-[#E8432A] rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                    {isSubmitting ? "Processando..." : paymentMethod === "pix" ? "Gerar Pix" : "Pagar com Cartão"}
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-[#94A3B8]">
                    <div className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /><span>Pagamento seguro</span></div>
                    <div className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /><span>SSL</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review step (default)
  return (
    <div className="bg-[#F8FAFC] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#0F172A]">
          <ChevronLeft className="h-4 w-4" /> Continuar comprando
        </Link>

        <h1 className="text-2xl font-bold text-[#0F172A] mb-2 md:text-3xl">Meu Carrinho</h1>
        <p className="text-[#475569] mb-8">{items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? "item" : "itens"} no carrinho</p>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4D30] text-white text-sm font-bold">1</div>
            <span className="text-sm font-medium text-[#0F172A]">Carrinho</span>
          </div>
          <div className="w-12 border-t-2 border-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-bold">2</div>
            <span className="text-sm text-[#94A3B8]">Pagamento</span>
          </div>
          <div className="w-12 border-t-2 border-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm font-bold">3</div>
            <span className="text-sm text-[#94A3B8]">Confirmação</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-[#FF4D30]" />
                  Itens do Carrinho
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-[#0F172A]">{item.name}</p>
                          <span className="inline-flex rounded-full bg-[#FFF5F3] px-2 py-0.5 text-[10px] font-medium text-[#FF4D30] capitalize">
                            {item.type}
                          </span>
                        </div>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-xs text-gray-400 line-through">de {formatCurrency(item.originalPrice)}</p>
                        )}
                        <p className="text-lg font-bold text-[#0F172A]">
                          {formatCurrency(item.price)}
                          <span className="text-xs font-normal text-[#64748B] ml-1">/{item.type === "consulta" ? "consulta" : "pacote"}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-1 py-0.5">
                          <button
                            onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            {item.quantity === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-[#0F172A]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-[#FF4D30] hover:bg-[#FFF5F3]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-base font-bold text-[#0F172A] w-24 text-right">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-24 border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                {storeCoupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {storeCoupon.code} (-{storeCoupon.discountPercent}%)
                      </span>
                    </div>
                    <button onClick={() => setStoreCoupon(null)} className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
                        <Input
                          placeholder="Cupom de desconto"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                          className="pl-9"
                          onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                        />
                      </div>
                      <Button variant="outline" onClick={handleApplyCoupon} disabled={couponLoading}>
                        {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aplicar"}
                      </Button>
                    </div>
                    {couponError && <p className="mt-1 text-xs text-red-500">{couponError}</p>}
                  </div>
                )}

                <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#475569]">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                    <span className="text-[#0F172A]">{formatCurrency(subtotal)}</span>
                  </div>
                  {storeCoupon && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#FF4D30]">Desconto ({storeCoupon.discountPercent}%)</span>
                      <span className="text-[#FF4D30]">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                    <span className="text-lg font-bold text-[#0F172A]">Total</span>
                    <span className="text-lg font-bold text-[#FF4D30]">{formatCurrency(subtotal - discount)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setStep("payment")}
                  className="w-full gap-2 bg-[#FF4D30] py-6 text-base font-semibold hover:bg-[#E8432A] rounded-xl"
                >
                  <Lock className="h-5 w-5" />
                  Continuar para Pagamento
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-[#94A3B8]">
                  <div className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /><span>Pagamento seguro</span></div>
                  <div className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /><span>Criptografia SSL</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
