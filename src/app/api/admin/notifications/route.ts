import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, lgpdRequests, payments, toolSuggestions, users } from "@/lib/db/schema";
import { requireRole } from "@/lib/auth/admin-guard";
import { desc, eq, gte, and } from "drizzle-orm";

export interface AdminNotification {
  id: string;
  type: "contato" | "lgpd" | "pagamento" | "sugestao";
  title: string;
  description: string;
  href: string;
  createdAt: string;
}

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;

  try {
    // Janela: últimos 14 dias
    const since = new Date();
    since.setDate(since.getDate() - 14);

    const notifications: AdminNotification[] = [];

    // Mensagens de contato novas
    const contatos = await db
      .select({
        id: contactMessages.id,
        name: contactMessages.name,
        subject: contactMessages.subject,
        createdAt: contactMessages.createdAt,
      })
      .from(contactMessages)
      .where(and(eq(contactMessages.status, "novo"), gte(contactMessages.createdAt, since)))
      .orderBy(desc(contactMessages.createdAt))
      .limit(10);

    for (const c of contatos) {
      notifications.push({
        id: `contato-${c.id}`,
        type: "contato",
        title: "Nova mensagem de contato",
        description: `${c.name}: ${c.subject}`,
        href: "/admin/configuracoes",
        createdAt: c.createdAt.toISOString(),
      });
    }

    // Solicitações LGPD pendentes
    const lgpds = await db
      .select({
        id: lgpdRequests.id,
        name: lgpdRequests.name,
        requestType: lgpdRequests.requestType,
        createdAt: lgpdRequests.createdAt,
      })
      .from(lgpdRequests)
      .where(and(eq(lgpdRequests.status, "pendente"), gte(lgpdRequests.createdAt, since)))
      .orderBy(desc(lgpdRequests.createdAt))
      .limit(10);

    for (const l of lgpds) {
      notifications.push({
        id: `lgpd-${l.id}`,
        type: "lgpd",
        title: "Solicitação LGPD",
        description: `${l.name} — ${l.requestType}`,
        href: "/admin/configuracoes",
        createdAt: l.createdAt.toISOString(),
      });
    }

    // Pagamentos confirmados recentes
    const pagamentos = await db
      .select({
        id: payments.id,
        amount: payments.amount,
        paidAt: payments.paidAt,
        createdAt: payments.createdAt,
        userName: users.name,
      })
      .from(payments)
      .leftJoin(users, eq(payments.userId, users.id))
      .where(and(eq(payments.status, "confirmed"), gte(payments.createdAt, since)))
      .orderBy(desc(payments.createdAt))
      .limit(10);

    for (const p of pagamentos) {
      notifications.push({
        id: `pagamento-${p.id}`,
        type: "pagamento",
        title: "Pagamento confirmado",
        description: `${p.userName || "Cliente"} — R$ ${Number(p.amount).toFixed(2).replace(".", ",")}`,
        href: `/admin/pagamentos/${p.id}`,
        createdAt: (p.paidAt || p.createdAt).toISOString(),
      });
    }

    // Sugestões de ferramentas recentes
    const sugestoes = await db
      .select({
        id: toolSuggestions.id,
        nome: toolSuggestions.nome,
        createdAt: toolSuggestions.createdAt,
      })
      .from(toolSuggestions)
      .where(gte(toolSuggestions.createdAt, since))
      .orderBy(desc(toolSuggestions.createdAt))
      .limit(10);

    for (const s of sugestoes) {
      notifications.push({
        id: `sugestao-${s.id}`,
        type: "sugestao",
        title: "Nova sugestão de ferramenta",
        description: s.nome || "Sugestão anônima",
        href: "/admin",
        createdAt: s.createdAt.toISOString(),
      });
    }

    // Ordena tudo por data desc
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ notifications: notifications.slice(0, 20) });
  } catch (err) {
    console.error("[notifications]", err);
    return NextResponse.json({ notifications: [] });
  }
}
