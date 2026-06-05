import { Resend } from "resend";

// Remetente. Para enviar a QUALQUER cliente, é preciso verificar o domínio no Resend.
// Enquanto o domínio não estiver verificado, use onboarding@resend.dev (só entrega ao
// e-mail dono da conta Resend). Depois de verificar, troque para noreply@consultaplacabrasil.com.
const FROM = process.env.EMAIL_FROM_VERIFIED
  ? `Consulta Placa Brasil <${process.env.EMAIL_FROM_VERIFIED}>`
  : "Consulta Placa Brasil <onboarding@resend.dev>";

const SITE_URL = "https://consultaplacabrasil.com";

/** Envia um e-mail. Não lança erro (e-mail nunca pode quebrar o fluxo). */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY não configurada — e-mail não enviado");
    return false;
  }
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to, subject, html });
    return true;
  } catch (err) {
    console.error("[email] falha ao enviar:", err);
    return false;
  }
}

/** Template base responsivo (cabeçalho + corpo + rodapé). */
export function baseTemplate(opts: { title: string; bodyHtml: string }): string {
  return `
  <div style="background:#f1f5f9;padding:24px 0;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:28px 32px;">
        <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">
          Consulta Placa <span style="color:#FF4D30;">Brasil</span>
        </span>
      </div>
      <div style="height:4px;background:linear-gradient(to right,#FF4D30,#ff6b52,#FF4D30);"></div>
      <!-- Body -->
      <div style="padding:32px;">
        ${opts.bodyHtml}
      </div>
      <!-- Footer -->
      <div style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;text-align:center;">
          © ${"Consulta Placa Brasil"} · <a href="${SITE_URL}" style="color:#FF4D30;text-decoration:none;">consultaplacabrasil.com</a><br/>
          Você recebeu este e-mail porque tem uma conta em nossa plataforma.
        </p>
      </div>
    </div>
  </div>`;
}

function button(href: string, label: string): string {
  return `<div style="text-align:center;margin:26px 0;">
    <a href="${href}" style="background:#FF4D30;color:#ffffff;padding:14px 34px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">${label}</a>
  </div>`;
}

// ─────────────────────────────────────────────────────────────
// E-mails específicos
// ─────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string) {
  const html = baseTemplate({
    title: "Bem-vindo",
    bodyHtml: `
      <h2 style="color:#0F172A;font-size:21px;margin:0 0 14px;">Bem-vindo, ${name}! 🎉</h2>
      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Sua conta na <strong>Consulta Placa Brasil</strong> foi criada com sucesso!
        Agora você pode consultar qualquer veículo pela placa com relatórios completos:
        débitos, multas, gravame, leilão, roubo/furto e muito mais.
      </p>
      ${button(`${SITE_URL}/painel`, "Acessar meu painel")}
      <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:16px 0 0;">
        Qualquer dúvida, é só responder este e-mail ou falar com nosso suporte.
      </p>`,
  });
  return sendEmail(to, "Bem-vindo à Consulta Placa Brasil! 🚗", html);
}

export async function sendPurchaseConfirmedEmail(to: string, name: string, amount: string) {
  const valor = `R$ ${Number(amount).toFixed(2).replace(".", ",")}`;
  const html = baseTemplate({
    title: "Compra aprovada",
    bodyHtml: `
      <div style="text-align:center;margin-bottom:8px;">
        <span style="display:inline-block;background:#f0fdf4;color:#16a34a;font-weight:800;font-size:13px;padding:6px 16px;border-radius:999px;">✓ PAGAMENTO APROVADO</span>
      </div>
      <h2 style="color:#0F172A;font-size:21px;margin:14px 0 14px;text-align:center;">Compra confirmada!</h2>
      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 8px;">
        Olá, ${name}! Recebemos seu pagamento de <strong>${valor}</strong>.
        Sua consulta já está liberada — acesse seu painel para informar a placa e gerar o relatório.
      </p>
      ${button(`${SITE_URL}/consultas`, "Acessar minhas consultas")}`,
  });
  return sendEmail(to, "Compra aprovada — Consulta Placa Brasil ✓", html);
}

export async function sendPasswordChangedEmail(to: string, name: string) {
  const html = baseTemplate({
    title: "Senha alterada",
    bodyHtml: `
      <h2 style="color:#0F172A;font-size:21px;margin:0 0 14px;">Senha alterada</h2>
      <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Olá, ${name}! A senha da sua conta foi alterada com sucesso.
        Se foi você, pode ignorar este aviso. <strong>Se não foi você</strong>, redefina sua senha imediatamente e fale com o suporte.
      </p>
      ${button(`${SITE_URL}/recuperar-senha`, "Redefinir senha")}`,
  });
  return sendEmail(to, "Sua senha foi alterada - Consulta Placa Brasil", html);
}
