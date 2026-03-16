import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail obrigatório" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const [user] = await db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    // Always return success (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token
    await db
      .update(users)
      .set({
        resetToken: token,
        resetTokenExpiresAt: expiresAt,
      })
      .where(eq(users.id, user.id));

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(resendKey);
    const resetUrl = `https://consultaplacabrasil.com/redefinir-senha?token=${token}`;

    await resend.emails.send({
      from: "Consulta Placa Brasil <onboarding@resend.dev>",
      to: user.email,
      subject: "Redefinir sua senha - Consulta Placa Brasil",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0F172A; font-size: 24px; margin: 0;">Consulta Placa Brasil</h1>
          </div>

          <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #0F172A; font-size: 20px; margin: 0 0 15px;">
              Olá, ${user.name || "Usuário"}!
            </h2>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:
            </p>

            <div style="text-align: center; margin: 25px 0;">
              <a href="${resetUrl}"
                 style="background: #FF4D30; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
                Redefinir Senha
              </a>
            </div>

            <p style="color: #94A3B8; font-size: 13px; line-height: 1.5; margin: 20px 0 0;">
              Este link expira em <strong>1 hora</strong>. Se você não solicitou a redefinição de senha, ignore este e-mail.
            </p>
          </div>

          <p style="color: #94A3B8; font-size: 12px; text-align: center; margin: 0;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br/>
            <a href="${resetUrl}" style="color: #FF4D30; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
