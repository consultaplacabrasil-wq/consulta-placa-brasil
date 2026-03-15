import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { enviarEmailConfirmacao } from "@/lib/newsletter/emails";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();

    // Verificar se já existe
    const existente = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, emailNorm))
      .limit(1);

    if (existente.length > 0) {
      const sub = existente[0];
      if (sub.status === "confirmado") {
        return NextResponse.json({
          message: "Este email já está inscrito na newsletter.",
        });
      }
      if (sub.status === "cancelado") {
        // Reinscrever — gerar novo token
        const token = crypto.randomUUID();
        await db
          .update(newsletterSubscribers)
          .set({
            status: "pendente",
            confirmToken: token,
            unsubscribedAt: null,
          })
          .where(eq(newsletterSubscribers.id, sub.id));

        await enviarEmailConfirmacao(emailNorm, token);
        return NextResponse.json({
          message: "Email de confirmação enviado. Verifique sua caixa de entrada.",
        });
      }
      // Status pendente — reenviar confirmação
      if (sub.confirmToken) {
        await enviarEmailConfirmacao(emailNorm, sub.confirmToken);
      }
      return NextResponse.json({
        message: "Email de confirmação reenviado. Verifique sua caixa de entrada.",
      });
    }

    // Novo inscrito
    const token = crypto.randomUUID();
    await db.insert(newsletterSubscribers).values({
      email: emailNorm,
      status: "pendente",
      confirmToken: token,
    });

    await enviarEmailConfirmacao(emailNorm, token);

    return NextResponse.json({
      message: "Email de confirmação enviado. Verifique sua caixa de entrada.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar inscrição" },
      { status: 500 }
    );
  }
}
