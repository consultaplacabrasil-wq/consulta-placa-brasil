import { db } from "@/lib/db";
import { coupons } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export interface CouponData {
  id: string;
  code: string;
  name: string;
  discountType: string; // "percent" | "fixed"
  discountPercent: number;
  discountValue: number; // R$ quando fixed
}

export type CouponResult =
  | { ok: true; coupon: CouponData }
  | { ok: false; error: string };

/**
 * Valida um cupom pelo código: existe, ativo, não expirado, limite não atingido.
 * Fonte única de verdade — usada na validação E no checkout (re-validação).
 */
export async function validateCoupon(code: string): Promise<CouponResult> {
  if (!code) return { ok: false, error: "Código do cupom é obrigatório" };

  const [coupon] = await db
    .select()
    .from(coupons)
    .where(and(eq(coupons.code, code.toUpperCase().trim()), eq(coupons.active, true)))
    .limit(1);

  if (!coupon) return { ok: false, error: "Cupom inválido ou inativo" };

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { ok: false, error: "Cupom expirado" };
  }

  if (coupon.maxUsage && (coupon.usageCount || 0) >= coupon.maxUsage) {
    return { ok: false, error: "Cupom atingiu o limite de uso" };
  }

  return {
    ok: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      name: coupon.name,
      discountType: coupon.discountType || "percent",
      discountPercent: coupon.discountPercent,
      discountValue: coupon.discountValue ? Number(coupon.discountValue) : 0,
    },
  };
}

/**
 * Re-valida um cupom pelo ID (usado no checkout, defesa contra cupom que
 * expirou/esgotou entre a validação no front e o pagamento).
 */
export async function validateCouponById(id: string): Promise<CouponResult> {
  if (!id) return { ok: false, error: "Cupom não informado" };

  const [coupon] = await db
    .select()
    .from(coupons)
    .where(and(eq(coupons.id, id), eq(coupons.active, true)))
    .limit(1);

  if (!coupon) return { ok: false, error: "Cupom inválido ou inativo" };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { ok: false, error: "Cupom expirado" };
  }
  if (coupon.maxUsage && (coupon.usageCount || 0) >= coupon.maxUsage) {
    return { ok: false, error: "Cupom atingiu o limite de uso" };
  }

  return {
    ok: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      name: coupon.name,
      discountType: coupon.discountType || "percent",
      discountPercent: coupon.discountPercent,
      discountValue: coupon.discountValue ? Number(coupon.discountValue) : 0,
    },
  };
}

/**
 * Calcula o valor do desconto (em R$) de um cupom sobre um subtotal.
 * Nunca passa do subtotal (não deixa total negativo).
 */
export function computeDiscount(coupon: CouponData, subtotal: number): number {
  let discount = 0;
  if (coupon.discountType === "fixed") {
    discount = coupon.discountValue;
  } else {
    discount = subtotal * (coupon.discountPercent / 100);
  }
  discount = Math.min(discount, subtotal);
  return Math.round(discount * 100) / 100;
}
