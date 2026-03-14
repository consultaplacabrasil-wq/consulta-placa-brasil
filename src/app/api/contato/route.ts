import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    await db.insert(contactMessages).values({
      name: String(name).trim().slice(0, 255),
      email: String(email).trim().slice(0, 255),
      subject: String(subject).trim().slice(0, 255),
      message: String(message).trim().slice(0, 5000),
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const resend = getResend();
    if (adminEmail && resend) {
      await resend.emails.send({
        from: "Consulta Placa Brasil <onboarding@resend.dev>",
        to: adminEmail,
        subject: `Novo contato: ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:white;margin:0;font-size:20px;">Nova mensagem de contato</h1>
              <p style="color:#94A3B8;margin:8px 0 0;">Consulta Placa Brasil</p>
            </div>
            <div style="background:white;padding:24px;border:1px solid #E2E8F0;border-top:none;">
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                <tr><td style="padding:8px 0;color:#64748B;width:80px;">Nome:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">E-mail:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Assunto:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${subject}</td></tr>
              </table>
              <div style="background:#F8FAFC;padding:16px;border-radius:8px;border:1px solid #E2E8F0;">
                <p style="color:#64748B;font-size:12px;margin:0 0 8px;text-transform:uppercase;">Mensagem</p>
                <p style="color:#0F172A;margin:0;white-space:pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;">
              <p style="color:#94A3B8;font-size:12px;margin:0;">Responder diretamente para: ${email}</p>
            </div>
          </div>
        `,
      }).catch((err) => console.error("Erro ao enviar e-mail contato:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
