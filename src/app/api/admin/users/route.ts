import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth/admin-guard";
import { validatePasswordStrength } from "@/lib/utils/password-validator";
import { formatarNome } from "@/lib/utils/name-formatter";
import { logAdminAction } from "@/lib/admin-log";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const items = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        cpfCnpj: users.cpfCnpj,
        role: users.role,
        active: users.active,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(users.createdAt);

    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Nome, e-mail e senha são obrigatórios" }, { status: 400 });
    }

    const passwordError = validatePasswordStrength(body.password);
    if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, body.email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Este e-mail já está cadastrado" }, { status: 409 });
    }

    const allowedRoles = ["user", "editor", "admin"];
    const role = allowedRoles.includes(body.role) ? body.role : "user";
    const hashedPassword = await bcrypt.hash(body.password, 12);

    const [created] = await db.insert(users).values({
      name: formatarNome(body.name),
      email: body.email,
      password: hashedPassword,
      role,
    }).returning({
      id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt,
    });

    await logAdminAction({
      adminId: session!.user!.id!,
      action: "criar_usuario",
      entity: "user",
      entityId: created.id,
      details: { name: created.name, email: created.email, role: created.role },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { error, session } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    const logActions: string[] = [];

    if (body.name !== undefined) updateData.name = formatarNome(body.name);
    if (body.email !== undefined) updateData.email = body.email;
    if (body.role !== undefined) {
      const allowedRoles = ["user", "editor", "admin"];
      if (allowedRoles.includes(body.role)) updateData.role = body.role;
    }
    if (body.active !== undefined) {
      updateData.active = !!body.active;
      logActions.push(body.active ? "reativar_usuario" : "desativar_usuario");
    }
    if (password) {
      const passwordError = validatePasswordStrength(password);
      if (passwordError) return NextResponse.json({ error: passwordError }, { status: 400 });
      updateData.password = await bcrypt.hash(password, 12);
      logActions.push("alterar_senha_usuario");
    }

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning({
        id: users.id, name: users.name, email: users.email,
        role: users.role, active: users.active, createdAt: users.createdAt, updatedAt: users.updatedAt,
      });

    if (!updated) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    // Registra logs das ações críticas
    for (const action of logActions) {
      await logAdminAction({
        adminId: session!.user!.id!,
        action,
        entity: "user",
        entityId: updated.id,
        details: { name: updated.name, email: updated.email },
      });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}
