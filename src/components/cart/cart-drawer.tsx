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
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const [coupon, setCoupon] = useState("");

  const total = totalPrice();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

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
            <SheetTitle className="text-lg font-bold text-[#1A1A2E]">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F7F0] border-2 border-[#22C55E]">
              <ShoppingCart className="h-4 w-4 text-[#22C55E]" />
            </div>
            <span className="text-xs font-medium text-[#22C55E]">Carrinho</span>
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
                    <p className="text-sm font-medium text-[#1A1A2E] leading-tight">
                      {item.name}
                    </p>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <p className="text-xs text-gray-400 line-through">
                        de {formatCurrency(item.originalPrice)} por
                      </p>
                    )}
                    <p className="text-sm font-semibold text-[#22C55E]">
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
                    <span className="w-6 text-center text-sm font-medium text-[#1A1A2E]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-[#FF4D30] hover:bg-[#FFF0ED] transition-colors"
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
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Cupom de Desconto"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                />
                <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1A6CB5] text-[#1A6CB5] hover:bg-[#1A6CB5] hover:text-white transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#1A1A2E]">Resumo do Pedido:</p>
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
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-base font-bold text-[#1A1A2E]">Valor Total</span>
                <span className="text-base font-bold text-[#1A1A2E]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button className="w-full h-12 bg-[#1A6CB5] hover:bg-[#155A96] text-white font-bold rounded-full text-base">
              IR PARA O PAGAMENTO
            </Button>

            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[#1A6CB5] hover:underline"
            >
              Adicionar mais itens ao carrinho
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
