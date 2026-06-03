import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas que exigem autenticação
const PROTECTED_DASHBOARD = /^\/(dashboard|painel|perfil|consultas|relatorios|pagamentos)(\/|$)/;
const PROTECTED_ADMIN = /^\/admin(\/|$)/;

// Rotas públicas que usuários logados não devem acessar
const AUTH_ROUTES = ["/login", "/cadastro", "/recuperar-senha", "/redefinir-senha"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth();
  const isAuthenticated = !!session?.user;
  const userRole = (session?.user as { role?: string } | undefined)?.role;

  // Redirecionar usuários autenticados para fora das rotas de auth
  if (isAuthenticated && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    const redirectTo = userRole === "admin" || userRole === "editor" ? "/admin" : "/painel";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // Proteger dashboard do usuário
  if (PROTECTED_DASHBOARD.test(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Proteger painel admin
  if (PROTECTED_ADMIN.test(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== "admin" && userRole !== "editor") {
      return NextResponse.redirect(new URL("/painel", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(dashboard|painel|perfil|consultas|relatorios|pagamentos)(.*)",
    "/admin(.*)",
    "/login",
    "/cadastro",
    "/recuperar-senha",
    "/redefinir-senha",
  ],
};
