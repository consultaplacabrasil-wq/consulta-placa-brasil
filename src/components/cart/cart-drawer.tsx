"use client";

import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/constants";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Tag,
  ChevronLeft,
  Search,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice, coupon, setCoupon } =
    useCartStore();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = totalPrice();
  const discountAmount = coupon ? subtotal * (coupon.discountPercent / 100) : 0;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

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
      setCoupon(data);
      setCouponCode("");
    } catch {
      setCouponError("Erro ao validar cupom");
    } finally {
      setCouponLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-[380px] sm:max-w-[380px] p-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={closeCart}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <SheetTitle className="text-lg font-bold text-[#0F172A]">
              Meu carrinho
            </SheetTitle>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF5F3] border-2 border-[#FF4D30]">
              <ShoppingCart className="h-4 w-4 text-[#FF4D30]" />
            </div>
            <span className="text-xs font-medium text-[#FF4D30]">Carrinho</span>
          </div>
          <div className="w-8 border-t border-gray-300" />
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Pagar</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-200 mb-4" />
              <p className="text-gray-400 text-sm">Seu carrinho está vazio</p>
              <p className="text-gray-300 text-xs mt-1">
                Adicione consultas ou pacotes
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0F172A] leading-tight">
                      {item.name}
                    </p>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <p className="text-xs text-gray-400 line-through">
                        de {formatCurrency(item.originalPrice)} por
                      </p>
                    )}
                    <p className="text-sm font-semibold text-[#FF4D30]">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-1 py-0.5">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="h-3.5 w-3.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-[#0F172A]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-[#FF4D30] hover:bg-[#FFF5F3] transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 space-y-4">
            {/* Coupon */}
            {coupon ? (
              <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {coupon.code} (-{coupon.discountPercent}%)
                  </span>
                </div>
                <button onClick={() => setCoupon(null)} className="text-gray-400 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                      placeholder="Cupom de Desconto"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    />
                    <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF4D30] text-[#FF4D30] hover:bg-[#FF4D30] hover:text-white transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {couponError && (
                  <p className="mt-1 text-xs text-red-500">{couponError}</p>
                )}
              </div>
            )}

            {/* Order Summary */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#0F172A]">Resumo do Pedido:</p>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name}{" "}
                    {item.quantity > 1 && (
                      <span className="text-gray-400">x{item.quantity}</span>
                    )}
                  </span>
                  <span className="text-gray-700">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              {coupon && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#FF4D30]">Desconto ({coupon.discountPercent}%)</span>
                  <span className="text-[#FF4D30]">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-base font-bold text-[#0F172A]">Valor Total</span>
                <span className="text-base font-bold text-[#0F172A]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={() => { closeCart(); router.push("/checkout"); }}
              className="w-full h-12 bg-[#FF4D30] hover:bg-[#E8432A] text-white font-bold rounded-full text-base"
            >
              IR PARA O PAGAMENTO
            </Button>

            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[#FF4D30] hover:underline"
            >
              Adicionar mais itens ao carrinho
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
