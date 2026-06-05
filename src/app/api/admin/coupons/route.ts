import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { coupons } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const items = await db.select().from(coupons).orderBy(coupons.createdAt);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar cupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const discountType = body.discountType === "fixed" ? "fixed" : "percent";

    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Nome e código são obrigatórios" },
        { status: 400 }
      );
    }

    if (discountType === "percent") {
      if (body.discountPercent == null || body.discountPercent < 1 || body.discountPercent > 100) {
        return NextResponse.json(
          { error: "Porcentagem de desconto deve ser entre 1 e 100" },
          { status: 400 }
        );
      }
    } else {
      if (body.discountValue == null || Number(body.discountValue) <= 0) {
        return NextResponse.json(
          { error: "Valor do desconto fixo deve ser maior que zero" },
          { status: 400 }
        );
      }
    }

    const [created] = await db.insert(coupons).values({
      name: body.name,
      code: body.code.toUpperCase(),
      discountType,
      discountPercent: discountType === "percent" ? body.discountPercent : 0,
      discountValue: discountType === "fixed" ? String(body.discountValue) : null,
      active: body.active ?? true,
      maxUsage: body.maxUsage || null,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    }).returning();

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar cupom" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
    }

    // Whitelist de campos (evita mass assignment de usageCount, etc.)
    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.code !== undefined) data.code = String(body.code).toUpperCase();
    if (body.active !== undefined) data.active = !!body.active;
    if (body.maxUsage !== undefined) data.maxUsage = body.maxUsage || null;
    if (body.expiresAt !== undefined) data.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
    if (body.discountType !== undefined) {
      data.discountType = body.discountType === "fixed" ? "fixed" : "percent";
    }
    if (body.discountPercent !== undefined) data.discountPercent = body.discountPercent;
    if (body.discountValue !== undefined) {
      data.discountValue = body.discountValue ? String(body.discountValue) : null;
    }

    const [updated] = await db
      .update(coupons)
      .set(data)
      .where(eq(coupons.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Cupom não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar cupom" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    await db.delete(coupons).where(eq(coupons.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir cupom" },
      { status: 500 }
    );
  }
}
