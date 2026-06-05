import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupon";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const result = await validateCoupon(code);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      id: result.coupon.id,
      code: result.coupon.code,
      name: result.coupon.name,
      discountType: result.coupon.discountType,
      discountPercent: result.coupon.discountPercent,
      discountValue: result.coupon.discountValue,
    });
  } catch {
    return NextResponse.json({ error: "Erro ao validar cupom" }, { status: 500 });
  }
}
