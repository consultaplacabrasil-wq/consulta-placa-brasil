import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { toolSuggestions } from "@/lib/db/schema";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, ferramentas } = body;

    if (
      !ferramentas ||
      !Array.isArray(ferramentas) ||
      ferramentas.length === 0
    ) {
      return NextResponse.json(
        { error: "Informe pelo menos uma ferramenta." },
        { status: 400 }
      );
    }

    for (const f of ferramentas) {
      if (!f.nome || typeof f.nome !== "string" || f.nome.trim().length < 3) {
        return NextResponse.json(
          { error: "Cada ferramenta precisa ter um nome com pelo menos 3 caracteres." },
          { status: 400 }
        );
      }
    }

    const sanitized = ferramentas.map((f: { nome: string; descricao?: string }) => ({
      nome: f.nome.trim().slice(0, 200),
      descricao: (f.descricao || "").trim().slice(0, 500),
    }));

    // Salvar no banco
    await db.insert(toolSuggestions).values({
      nome: nome ? String(nome).trim().slice(0, 100) : null,
      email: email ? String(email).trim().slice(0, 255) : null,
      ferramentas: sanitized,
    });

    // Enviar e-mail para o administrador
    const adminEmail = process.env.ADMIN_EMAIL;
    const resend = getResend();
    if (adminEmail && resend) {
      const listaFerramentas = sanitized
        .map(
          (f: { nome: string; descricao: string }, i: number) =>
            `<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#64748B;">${i + 1}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#0F172A;">${f.nome}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#475569;">${f.descricao || "Sem descrição"}</td>
            </tr>`
        )
        .join("");

      await resend.emails.send({
        from: "Consulta Placa Brasil <onboarding@resend.dev>",
        to: adminEmail,
        subject: `Nova sugestão de ferramenta${sanitized.length > 1 ? ` (${sanitized.length} ferramentas)` : ""} - ${sanitized[0].nome}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:white;margin:0;font-size:20px;">Nova sugestão de ferramenta</h1>
              <p style="color:#94A3B8;margin:8px 0 0;">Consulta Placa Brasil</p>
            </div>

            <div style="background:white;padding:24px;border:1px solid #E2E8F0;border-top:none;">
              <h2 style="color:#0F172A;font-size:16px;margin:0 0 16px;">Dados do usuário</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;color:#64748B;width:80px;">Nome:</td>
                  <td style="padding:6px 0;color:#0F172A;font-weight:600;">${nome || "Não informado"}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748B;">E-mail:</td>
                  <td style="padding:6px 0;color:#0F172A;font-weight:600;">${email || "Não informado"}</td>
                </tr>
              </table>

              <h2 style="color:#0F172A;font-size:16px;margin:0 0 12px;">
                Ferramentas sugeridas (${sanitized.length})
              </h2>
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#F8FAFC;">
                    <th style="padding:8px 12px;text-align:left;color:#64748B;font-size:12px;text-transform:uppercase;">#</th>
                    <th style="padding:8px 12px;text-align:left;color:#64748B;font-size:12px;text-transform:uppercase;">Nome</th>
                    <th style="padding:8px 12px;text-align:left;color:#64748B;font-size:12px;text-transform:uppercase;">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  ${listaFerramentas}
                </tbody>
              </table>
            </div>

            <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;">
              <p style="color:#94A3B8;font-size:12px;margin:0;">
                Enviado automaticamente pelo sistema de sugestões do Consulta Placa Brasil.
              </p>
            </div>
          </div>
        `,
      }).catch((err) => {
        console.error("Erro ao enviar e-mail:", err);
      });
    }

    return NextResponse.json({
      success: true,
      message: "Sugestão enviada com sucesso!",
      count: sanitized.length,
    });
  } catch (error) {
    console.error("Erro ao salvar sugestão:", error);
    return NextResponse.json(
      { error: "Erro ao enviar sugestão. Tente novamente." },
      { status: 500 }
    );
  }
}
