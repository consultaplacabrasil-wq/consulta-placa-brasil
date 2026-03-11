import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Role = "admin" | "editor" | "user";

/**
 * Check if the current session user has one of the allowed roles.
 * Returns the session if authorized, or a NextResponse error if not.
 */
export async function requireRole(...allowedRoles: Role[]) {
  const session = await auth();

  if (!session?.user) {
    return { error: NextResponse.json({ error: "Não autenticado" }, { status: 401 }), session: null };
  }

  const role = (session.user as { role?: string }).role as Role | undefined;

  if (!role || !allowedRoles.includes(role)) {
    return { error: NextResponse.json({ error: "Acesso negado" }, { status: 403 }), session: null };
  }

  return { error: null, session };
}
