import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { validatePasswordStrength } from "@/lib/utils/password-validator";
import { sendPasswordChangedEmail } from "@/lib/email";

// GET — buscar dados do perfil
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        cpfCnpj: users.cpfCnpj,
        phone: users.phone,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar perfil" }, { status: 500 });
  }
}

// PATCH — atualizar nome ou trocar senha
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // ── Trocar senha ────────────────────────────────────────────────
    if (action === "change-password") {
      const { currentPassword, newPassword } = body;

      if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: "Preencha todos os campos" }, { status: 400 });
      }

      const passwordError = validatePasswordStrength(newPassword);
      if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });

      const [user] = await db
        .select({ password: users.password, name: users.name, email: users.email })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

      if (!user?.password) {
        return NextResponse.json({ error: "Conta sem senha (login social)" }, { status: 400 });
      }

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) {
        return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });
      }

      const hashed = await bcrypt.hash(newPassword, 12);
      await db.update(users).set({ password: hashed, updatedAt: new Date() }).where(eq(users.id, session.user.id));

      // E-mail de alerta de alteração de senha
      sendPasswordChangedEmail(user.email, user.name || "Usuário").catch(() => {});

      return NextResponse.json({ success: true, message: "Senha alterada com sucesso" });
    }

    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}
