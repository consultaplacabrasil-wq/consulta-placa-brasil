import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { lgpdRequests } from "@/lib/db/schema";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

const TIPOS_VALIDOS = [
  "acesso",
  "correcao",
  "eliminacao",
  "portabilidade",
  "revogacao",
  "informacao",
];

const TIPOS_LABEL: Record<string, string> = {
  acesso: "Acesso aos dados",
  correcao: "Correção de dados",
  eliminacao: "Eliminação de dados",
  portabilidade: "Portabilidade",
  revogacao: "Revogação de consentimento",
  informacao: "Informação sobre compartilhamento",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, cpf, requestType, details } = body;

    if (!name || !email || !cpf || !requestType) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    if (!TIPOS_VALIDOS.includes(requestType)) {
      return NextResponse.json(
        { error: "Tipo de solicitação inválido." },
        { status: 400 }
      );
    }

    await db.insert(lgpdRequests).values({
      name: String(name).trim().slice(0, 255),
      email: String(email).trim().slice(0, 255),
      cpf: String(cpf).trim().slice(0, 18),
      requestType: String(requestType),
      details: details ? String(details).trim().slice(0, 2000) : null,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const resend = getResend();
    if (adminEmail && resend) {
      await resend.emails.send({
        from: "Consulta Placa Brasil <onboarding@resend.dev>",
        to: adminEmail,
        subject: `Solicitação LGPD: ${TIPOS_LABEL[requestType] || requestType}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:white;margin:0;font-size:20px;">Solicitação LGPD</h1>
              <p style="color:#94A3B8;margin:8px 0 0;">Consulta Placa Brasil</p>
            </div>
            <div style="background:white;padding:24px;border:1px solid #E2E8F0;border-top:none;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#64748B;width:120px;">Nome:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">E-mail:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">CPF:</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">${cpf}</td></tr>
                <tr><td style="padding:8px 0;color:#64748B;">Tipo:</td><td style="padding:8px 0;color:#FF4D30;font-weight:600;">${TIPOS_LABEL[requestType] || requestType}</td></tr>
                ${details ? `<tr><td style="padding:8px 0;color:#64748B;vertical-align:top;">Detalhes:</td><td style="padding:8px 0;color:#0F172A;">${details}</td></tr>` : ""}
              </table>
            </div>
            <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;">
              <p style="color:#94A3B8;font-size:12px;margin:0;">Prazo legal de resposta: 15 dias úteis (LGPD Art. 18)</p>
            </div>
          </div>
        `,
      }).catch((err) => console.error("Erro ao enviar e-mail LGPD:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Solicitação LGPD enviada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao processar solicitação LGPD:", error);
    return NextResponse.json(
      { error: "Erro ao enviar solicitação. Tente novamente." },
      { status: 500 }
    );
  }
}
