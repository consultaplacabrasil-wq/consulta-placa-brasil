import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_DASHBOARD = /^\/(painel|perfil|consultas|relatorios|pagamentos|relatorio)(\/|$)/;
const PROTECTED_ADMIN = /^\/admin(\/|$)/;
const AUTH_ROUTES = ["/login", "/cadastro", "/recuperar-senha", "/redefinir-senha"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // getToken lê do cookie JWT — sem banco de dados (compatível com Edge Runtime)
  // Em produção (HTTPS) o cookie tem prefixo __Secure-, então secureCookie deve ser true
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as string | undefined;

  // Usuários autenticados saem das páginas de auth
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
    "/(painel|perfil|consultas|relatorios|pagamentos|relatorio)(.*)",
    "/admin(.*)",
    "/login",
    "/cadastro",
    "/recuperar-senha",
    "/redefinir-senha",
  ],
};
