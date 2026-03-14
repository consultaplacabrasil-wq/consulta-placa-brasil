"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Menu, Search, User, Car, Phone, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { openCart, totalItems } = useCartStore();
  const cartCount = totalItems();

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-[#0F172A] text-white text-sm border-b border-white/10">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="text-gray-300">contato@consultaplacabrasil.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/cadastro" className="text-gray-300 hover:text-white transition-colors">
              Criar conta
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4D30]">
              <Car className="h-5 w-5 text-white" />
            </div>
            <Image
              src="/logo-header.webp"
              alt="Consulta Placa Brasil"
              width={160}
              height={40}
              priority
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#FFF5F3] hover:text-[#FF4D30]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={openCart}
              aria-label="Carrinho de compras"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#475569] hover:bg-[#FFF5F3] hover:text-[#FF4D30] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D30] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="/">
              <Button
                size="sm"
                className="gap-2 bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold rounded-lg px-5 h-10 shadow-sm shadow-[#FF4D30]/20"
              >
                <Search className="h-4 w-4" />
                Consultar Placa
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={openCart}
              aria-label="Carrinho de compras"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#475569]"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4D30] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col gap-1 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-[#0F172A] transition-colors hover:bg-[#FFF5F3] hover:text-[#FF4D30]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 border-gray-200">
                      <User className="h-4 w-4" />
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-2 bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold">
                      <Search className="h-4 w-4" />
                      Consultar Placa
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
