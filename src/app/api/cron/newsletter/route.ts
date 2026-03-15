import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers, noticias } from "@/lib/db/schema";
import { eq, gte, desc } from "drizzle-orm";
import { enviarDigestSemanal } from "@/lib/newsletter/emails";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Buscar noticias publicadas nos ultimos 7 dias
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

    const noticiasRecentes = await db
      .select({
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
      })
      .from(noticias)
      .where(eq(noticias.status, "published"))
      .orderBy(desc(noticias.publishedAt))
      .limit(10);

    // Filtrar apenas as dos ultimos 7 dias via publishedAt
    const recentes = await db
      .select({
        titulo: noticias.titulo,
        slug: noticias.slug,
        resumo: noticias.resumo,
        categoria: noticias.categoria,
      })
      .from(noticias)
      .where(gte(noticias.publishedAt, seteDiasAtras))
      .orderBy(desc(noticias.publishedAt))
      .limit(5);

    if (recentes.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma noticia nova esta semana. Newsletter nao enviada.",
        enviados: 0,
      });
    }

    // Buscar inscritos confirmados
    const inscritos = await db
      .select({
        email: newsletterSubscribers.email,
        confirmToken: newsletterSubscribers.confirmToken,
      })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, "confirmado"));

    if (inscritos.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhum inscrito confirmado.",
        enviados: 0,
      });
    }

    let enviados = 0;
    let erros = 0;

    for (const inscrito of inscritos) {
      const ok = await enviarDigestSemanal(
        inscrito.email,
        recentes,
        inscrito.confirmToken || ""
      );

      if (ok) {
        enviados++;
      } else {
        erros++;
      }

      // Delay de 200ms entre envios (rate limit Resend)
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return NextResponse.json({
      success: true,
      totalInscritos: inscritos.length,
      noticiasIncluidas: recentes.length,
      enviados,
      erros,
    });
  } catch (error) {
    console.error("Erro no cron newsletter:", error);
    return NextResponse.json(
      {
        error: "Falha no envio",
        message: error instanceof Error ? error.message : "desconhecido",
      },
      { status: 500 }
    );
  }
}
