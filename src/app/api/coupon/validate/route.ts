import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { coupons } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Código do cupom é obrigatório" }, { status: 400 });
    }

    const [coupon] = await db
      .select()
      .from(coupons)
      .where(and(eq(coupons.code, code.toUpperCase()), eq(coupons.active, true)))
      .limit(1);

    if (!coupon) {
      return NextResponse.json({ error: "Cupom inválido ou expirado" }, { status: 404 });
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Cupom expirado" }, { status: 400 });
    }

    // Check max usage
    if (coupon.maxUsage && (coupon.usageCount || 0) >= coupon.maxUsage) {
      return NextResponse.json({ error: "Cupom atingiu o limite de uso" }, { status: 400 });
    }

    return NextResponse.json({
      id: coupon.id,
      code: coupon.code,
      name: coupon.name,
      discountPercent: coupon.discountPercent,
    });
  } catch {
    return NextResponse.json({ error: "Erro ao validar cupom" }, { status: 500 });
  }
}
