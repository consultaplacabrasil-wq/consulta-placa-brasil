import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

// Remetente com domínio verificado no Resend. O onboarding@resend.dev só entrega
// ao dono da conta Resend, então não serve para avisar a equipe em produção.
const FROM = process.env.EMAIL_FROM_VERIFIED
  ? `Consulta Placa Brasil <${process.env.EMAIL_FROM_VERIFIED}>`
  : "Consulta Placa Brasil <onboarding@resend.dev>";

// Os campos vêm do visitante e entram em HTML: escapar evita injeção de marcação no e-mail.
function esc(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

    const cleanName = String(name).trim().slice(0, 255);
    const cleanEmail = String(email).trim().slice(0, 255);
    const cleanSubject = String(subject).trim().slice(0, 255);
    const cleanMessage = String(message).trim().slice(0, 5000);

    await db.insert(contactMessages).values({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const resend = getResend();

    if (!adminEmail) {
      console.error("[contato] ADMIN_EMAIL não configurada — mensagem gravada no banco, mas nenhum e-mail foi enviado");
    } else if (!resend) {
      console.error("[contato] RESEND_API_KEY não configurada — mensagem gravada no banco, mas nenhum e-mail foi enviado");
    } else {
      // O Resend não lança erro quando recusa o envio: devolve { error }. Por isso
      // o resultado é conferido, senão uma recusa passaria em silêncio.
      const { error } = await resend.emails.send({
        from: FROM,
        to: adminEmail,
        replyTo: cleanEmail,
        subject: `Novo contato: ${cleanSubject}`.slice(0, 200),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:white;margin:0;font-size:20px;">Nova mensagem de contato</h1>
              <p style="color:#94A3B8;margin:8px 0 0;">Consulta Placa Brasil</p>
            </div>
            <div style="background:white;padding:24px;border:1px solid #E2E8F0;border-top:none;">
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                <tr><td style="padding:8px 0;color:#64748B;width:80px;">Nome:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${esc(cleanName)}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">E-mail:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${esc(cleanEmail)}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Assunto:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${esc(cleanSubject)}</td></tr>
              </table>
              <div style="background:#F8FAFC;padding:16px;border-radius:8px;border:1px solid #E2E8F0;">
                <p style="color:#64748B;font-size:12px;margin:0 0 8px;text-transform:uppercase;">Mensagem</p>
                <p style="color:#0F172A;margin:0;white-space:pre-wrap;">${esc(cleanMessage)}</p>
              </div>
            </div>
            <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;">
              <p style="color:#94A3B8;font-size:12px;margin:0;">Responder diretamente para: ${esc(cleanEmail)}</p>
            </div>
          </div>
        `,
      });
      if (error) {
        console.error("[contato] Resend recusou o envio:", error);
      }
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
