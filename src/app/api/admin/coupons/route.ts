import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { coupons } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
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
  try {
    const body = await req.json();

    if (!body.name || !body.code || body.discountPercent == null) {
      return NextResponse.json(
        { error: "Nome, código e porcentagem de desconto são obrigatórios" },
        { status: 400 }
      );
    }

    if (body.discountPercent < 1 || body.discountPercent > 100) {
      return NextResponse.json(
        { error: "Porcentagem de desconto deve ser entre 1 e 100" },
        { status: 400 }
      );
    }

    const [created] = await db.insert(coupons).values({
      name: body.name,
      code: body.code.toUpperCase(),
      discountPercent: body.discountPercent,
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
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID obrigatório" },
        { status: 400 }
      );
    }

    if (data.code) {
      data.code = data.code.toUpperCase();
    }

    if (data.expiresAt) {
      data.expiresAt = new Date(data.expiresAt);
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
