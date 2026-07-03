import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Verifica se um e-mail tem 2FA ativo, para o formulário de login decidir
// se mostra o campo de código. Não revela senha nem se o usuário existe além
// do necessário (retorna false quando não há usuário/2FA).
export async function POST(req: NextRequest) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email) return NextResponse.json({ required: false });

  const [u] = await db
    .select({ enabled: users.twoFactorEnabled })
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);

  return NextResponse.json({ required: u?.enabled ?? false });
}
