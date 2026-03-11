import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth/admin-guard";
import { validatePasswordStrength } from "@/lib/utils/password-validator";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const items = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(users.createdAt);

    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Nome, e-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const passwordError = validatePasswordStrength(body.password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    // Check if email already exists
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, body.email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const [created] = await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || "user",
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const { id, password, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: new Date(),
    };

    if (password) {
      const passwordError = validatePasswordStrength(password);
      if (passwordError) {
        return NextResponse.json({ error: passwordError }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!updated) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}
