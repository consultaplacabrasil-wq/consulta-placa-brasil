import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

const BASE_URL = "https://consultaplacabrasil.com";
const FROM = "Consulta Placa Brasil <onboarding@resend.dev>";

export async function enviarEmailConfirmacao(
  email: string,
  token: string
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const confirmUrl = `${BASE_URL}/api/newsletter/confirm?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Confirme sua inscrição - Consulta Placa Brasil",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">Consulta Placa Brasil</h1>
            <p style="color:#94A3B8;margin:8px 0 0;font-size:14px;">Notícias Automotivas</p>
          </div>
          <div style="background:white;padding:32px 24px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
            <h2 style="color:#0F172A;margin:0 0 16px;font-size:20px;">Confirme sua inscrição</h2>
            <p style="color:#475569;margin:0 0 24px;line-height:1.6;">
              Você solicitou receber nossa compilação semanal de notícias automotivas.
              Clique no botão abaixo para confirmar:
            </p>
            <a href="${confirmUrl}" style="display:inline-block;background:#FF4D30;color:white;font-weight:bold;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;">
              Confirmar Inscrição
            </a>
            <p style="color:#94A3B8;margin:24px 0 0;font-size:12px;">
              Se você não solicitou esta inscrição, ignore este email.
            </p>
          </div>
          <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
            <p style="color:#94A3B8;font-size:11px;margin:0;">
              Consulta Placa Brasil — consultaplacabrasil.com
            </p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de confirmacao:", error);
    return false;
  }
}

interface NoticiaDigest {
  titulo: string;
  slug: string;
  resumo: string;
  categoria: string;
}

export async function enviarDigestSemanal(
  email: string,
  noticias: NoticiaDigest[],
  unsubscribeToken: string
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const unsubscribeUrl = `${BASE_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
  const manchetePrincipal = noticias[0]?.titulo || "Notícias da Semana";

  const noticiasHtml = noticias
    .map(
      (n) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #F1F5F9;">
          <a href="${BASE_URL}/noticias/${n.slug}" style="color:#0F172A;font-weight:bold;font-size:16px;text-decoration:none;display:block;margin-bottom:6px;">
            ${n.titulo}
          </a>
          <p style="color:#475569;margin:0;font-size:14px;line-height:1.5;">
            ${n.resumo}
          </p>
          <a href="${BASE_URL}/noticias/${n.slug}" style="color:#FF4D30;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;margin-top:8px;">
            Ler matéria completa →
          </a>
        </td>
      </tr>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `${manchetePrincipal} | Consulta Placa Brasil`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:20px;">Notícias da Semana</h1>
            <p style="color:#94A3B8;margin:8px 0 0;font-size:13px;">Consulta Placa Brasil</p>
          </div>
          <div style="background:white;padding:24px;border:1px solid #E2E8F0;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              ${noticiasHtml}
            </table>
            <div style="text-align:center;margin-top:24px;">
              <a href="${BASE_URL}/noticias" style="display:inline-block;background:#FF4D30;color:white;font-weight:bold;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;">
                Ver todas as notícias
              </a>
            </div>
          </div>
          <div style="background:#F8FAFC;padding:16px 24px;border-radius:0 0 12px 12px;border:1px solid #E2E8F0;border-top:none;text-align:center;">
            <p style="color:#94A3B8;font-size:11px;margin:0 0 8px;">
              Você recebeu este email por estar inscrito na newsletter do Consulta Placa Brasil.
            </p>
            <a href="${unsubscribeUrl}" style="color:#94A3B8;font-size:11px;">
              Cancelar inscrição
            </a>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error(`Erro ao enviar digest para ${email}:`, error);
    return false;
  }
}
