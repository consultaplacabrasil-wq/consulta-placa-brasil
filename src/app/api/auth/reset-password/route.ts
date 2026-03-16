import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 8 caracteres" },
        { status: 400 }
      );
    }

    // Find user with valid token
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.resetToken, token),
          gt(users.resetTokenExpiresAt, new Date())
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Link inválido ou expirado. Solicite um novo link de recuperação." },
        { status: 400 }
      );
    }

    // Hash new password and clear token
    const hashedPassword = await hash(password, 12);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Erro ao redefinir senha" },
      { status: 500 }
    );
  }
}
