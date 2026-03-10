"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Car,
  LayoutDashboard,
  Search,
  FileText,
  CreditCard,
  UserCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const sidebarLinks = [
  { href: "/painel", label: "Painel", icon: LayoutDashboard },
  { href: "/consultas", label: "Consultas", icon: Search },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
  { href: "/pagamentos", label: "Pagamentos", icon: CreditCard },
  { href: "/perfil", label: "Perfil", icon: UserCircle },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-5 border-b border-gray-100"
        onClick={onNavigate}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF4D30]">
          <Car className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-[#0F172A]">
          Consulta<span className="text-[#FF4D30]">Placa</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FF4D30] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0F172A]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-3 py-4">
        <button
          onClick={() => {
            // TODO: integrate with auth logout
            onNavigate?.();
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSheetOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent pathname={pathname} onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="lg:hidden" />

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4D30] text-white text-sm font-semibold">
              U
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
