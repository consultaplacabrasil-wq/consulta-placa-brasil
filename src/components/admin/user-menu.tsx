"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown, UserCog, Car, LogOut, Loader2 } from "lucide-react";

interface UserMenuProps {
  userName: string;
  userEmail: string;
  userRole: string | null;
}

export function UserMenu({ userName, userEmail, userRole }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleLogout() {
    setLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  }

  const perfilHref = userRole === "admin" ? "/admin/meu-perfil" : "/admin/meu-perfil";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-sm font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-[#0F172A]">{userName}</p>
          <p className="text-[10px] text-[#94A3B8]">{userEmail}</p>
        </div>
        {userRole === "editor" && (
          <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
            Atendente
          </span>
        )}
        <ChevronDown className={`h-4 w-4 text-[#94A3B8] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F172A] text-white text-base font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#0F172A] truncate">{userName}</p>
              <p className="text-xs text-[#94A3B8] truncate">{userEmail}</p>
              <span className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                userRole === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
              }`}>
                {userRole === "admin" ? "Administrador" : "Atendente"}
              </span>
            </div>
          </div>

          {/* Itens */}
          <div className="py-1">
            <Link
              href={perfilHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#475569] hover:bg-gray-50 transition-colors"
            >
              <UserCog className="h-4 w-4 text-[#94A3B8]" />
              Meu Perfil
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#475569] hover:bg-gray-50 transition-colors"
            >
              <Car className="h-4 w-4 text-[#94A3B8]" />
              Ver Site
            </Link>
          </div>

          {/* Sair */}
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              {loggingOut ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
