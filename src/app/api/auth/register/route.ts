import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, cpfCnpj, password } = body;

    if (!name || !email || !cpfCnpj || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Check existing email
    const [existingEmail] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existingEmail) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado", code: "EMAIL_EXISTS" },
        { status: 409 }
      );
    }

    // Check existing CPF
    const cleanCpf = cpfCnpj.replace(/\D/g, "");
    const [existingCpf] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.cpfCnpj, cpfCnpj))
      .limit(1);

    if (existingCpf) {
      return NextResponse.json(
        { error: "Este CPF/CNPJ já está cadastrado", code: "CPF_EXISTS" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        cpfCnpj,
        password: hashedPassword,
        role: "user",
      })
      .returning({ id: users.id });

    return NextResponse.json({ id: newUser.id, success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar conta" },
      { status: 500 }
    );
  }
}
