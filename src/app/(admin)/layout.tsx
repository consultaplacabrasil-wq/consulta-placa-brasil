"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Car,
  LayoutDashboard,
  Users,
  Search,
  CreditCard,
  PenSquare,
  Settings,
  LogOut,
  Menu,
  Shield,
  Bell,
  ChevronDown,
  HelpCircle,
  Globe,
  Tag,
  ShoppingBag,
  Layers,
  ShieldAlert,
  Loader2,
  UserCog,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, adminOnly: true },
  { href: "/admin/consultas-pacotes", label: "Consultas/Pacotes", icon: ShoppingBag, adminOnly: true },
  { href: "/admin/usuarios", label: "Usuários", icon: Users, adminOnly: true },
  { href: "/admin/consultas", label: "Consultas Clientes", icon: Search },
  { href: "/admin/pagamentos", label: "Pagamentos", icon: CreditCard, adminOnly: true },
  { href: "/admin/blog", label: "Blog", icon: PenSquare, adminOnly: true },
  { href: "/admin/noticias", label: "Notícias", icon: Newspaper, adminOnly: true },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, adminOnly: true },
  { href: "/admin/paginas", label: "Páginas", icon: Layers, adminOnly: true },
  { href: "/admin/cupons", label: "Cupons", icon: Tag, adminOnly: true },
  { href: "/admin/seo", label: "SEO", icon: Globe, adminOnly: true },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings, adminOnly: true },
  { href: "/admin/meu-perfil", label: "Meu Perfil", icon: UserCog },
];

function SidebarContent({
  pathname,
  onNavigate,
  links,
  userRole,
}: {
  pathname: string;
  onNavigate?: () => void;
  links: SidebarLink[];
  userRole: string;
}) {
  return (
    <div className="flex h-full flex-col bg-[#0F172A]">
      <Link
        href={userRole === "admin" ? "/admin" : "/admin/consultas"}
        className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10"
        onClick={onNavigate}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF4D30]">
          <Car className="h-5 w-5 text-white" />
        </div>
        <div>
          <Image
            src="/logo-footer.webp"
            alt="Consulta Placa Brasil"
            width={120}
            height={30}
          />
        </div>
      </Link>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#FF4D30] text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Car className="h-5 w-5" />
          Ver Site
        </Link>
        <button
          onClick={() => { onNavigate?.(); window.location.href = "/login"; }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
}

// Routes the atendente (editor) is allowed to access
const atendenteAllowedPrefixes = ["/admin/consultas", "/admin/meu-perfil"];

function isAtendenteAllowed(pathname: string): boolean {
  if (pathname.startsWith("/admin/consultas-pacotes")) return false;
  return atendenteAllowedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        if (!session?.user) {
          router.replace("/login");
          return;
        }
        const role = session.user.role || "user";
        if (role !== "admin" && role !== "editor") {
          router.replace("/painel");
          return;
        }
        setUserRole(role);
        setUserName(session.user.name || "Usuário");
        setUserEmail(session.user.email || "");
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  // Filter sidebar links based on role
  const filteredLinks = userRole === "admin"
    ? sidebarLinks
    : sidebarLinks.filter((link) => !link.adminOnly);

  // Check if atendente is trying to access a restricted page
  const isRestricted = userRole === "editor" && !isAtendenteAllowed(pathname);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col">
        <SidebarContent
          pathname={pathname}
          links={filteredLinks}

          userRole={userRole || "editor"}
        />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          <div className="flex items-center gap-3">
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
                <SidebarContent
                  pathname={pathname}
                  onNavigate={() => setSheetOpen(false)}
                  links={filteredLinks}
        
                  userRole={userRole || "editor"}
                />
              </SheetContent>
            </Sheet>
            <h2 className="text-sm font-medium text-[#475569] hidden lg:block">
              Painel Administrativo
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#475569] hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4D30] text-[9px] font-bold text-white">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#0F172A]">{userName}</p>
                <p className="text-[10px] text-[#94A3B8]">{userEmail}</p>
              </div>
              {userRole === "editor" && (
                <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                  Atendente
                </span>
              )}
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {isRestricted ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ShieldAlert className="h-16 w-16 text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Acesso Restrito</h2>
              <p className="text-[#64748B] mb-6 text-center max-w-md">
                Você não tem permissão para acessar esta página.
                Como atendente, você pode acessar Consultas Clientes e Meu Perfil.
              </p>
              <Link
                href="/admin/consultas"
                className="rounded-lg bg-[#FF4D30] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#E8432A] transition-colors"
              >
                Ir para Consultas
              </Link>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
