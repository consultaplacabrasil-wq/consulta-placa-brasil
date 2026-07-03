import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";
import {
  generateSecret,
  buildOtpAuthUrl,
  buildQrDataUrl,
  verifyToken,
} from "@/lib/2fa";

export const dynamic = "force-dynamic";

// Status do 2FA do usuário logado
export async function GET() {
  const { error, session } = await requireRole("admin", "editor");
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const [u] = await db
    .select({ enabled: users.twoFactorEnabled })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return NextResponse.json({ enabled: u?.enabled ?? false });
}

// Iniciar configuração: gera segredo (ainda desativado) e retorna QR
export async function POST() {
  const { error, session } = await requireRole("admin", "editor");
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const email = session!.user?.email ?? "usuario";

  const secret = generateSecret();
  await db
    .update(users)
    .set({ twoFactorSecret: secret, twoFactorEnabled: false })
    .where(eq(users.id, userId));

  const otpauth = buildOtpAuthUrl(email, secret);
  const qr = await buildQrDataUrl(otpauth);
  return NextResponse.json({ qr, secret });
}

// Confirmar código e ATIVAR o 2FA
export async function PUT(req: NextRequest) {
  const { error, session } = await requireRole("admin", "editor");
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };

  const [u] = await db
    .select({ secret: users.twoFactorSecret })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!u?.secret || !verifyToken(code ?? "", u.secret)) {
    return NextResponse.json({ error: "Código inválido. Tente novamente." }, { status: 400 });
  }

  await db.update(users).set({ twoFactorEnabled: true }).where(eq(users.id, userId));
  return NextResponse.json({ ok: true });
}

// Desativar o 2FA (exige código atual por segurança)
export async function DELETE(req: NextRequest) {
  const { error, session } = await requireRole("admin", "editor");
  if (error) return error;
  const userId = (session!.user as { id: string }).id;
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };

  const [u] = await db
    .select({ secret: users.twoFactorSecret, enabled: users.twoFactorEnabled })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (u?.enabled && (!u.secret || !verifyToken(code ?? "", u.secret))) {
    return NextResponse.json({ error: "Código inválido. Informe o código atual para desativar." }, { status: 400 });
  }

  await db
    .update(users)
    .set({ twoFactorEnabled: false, twoFactorSecret: null })
    .where(eq(users.id, userId));
  return NextResponse.json({ ok: true });
}
