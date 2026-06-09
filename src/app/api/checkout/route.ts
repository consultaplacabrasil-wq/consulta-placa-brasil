import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users, payments, reportRequests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import {
  findOrCreateCustomer,
  createPixPayment,
  createCardPayment,
} from "@/lib/asaas";
import { validateCouponById, computeDiscount } from "@/lib/coupon";
import { mapReportType } from "@/lib/utils/report-type";

interface CheckoutItem {
  id: string;
  name: string;
  type: "consulta" | "pacote";
  price: number;
  quantity: number;
  plate?: string;
  apiService?: string;
  credits?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items,
      name,
      email,
      cpfCnpj,
      phone,
      password,
      paymentMethod,
      couponId,
      card,
      installments,
    } = body as {
      items: CheckoutItem[];
      name: string;
      email: string;
      cpfCnpj: string;
      phone: string;
      password?: string;
      paymentMethod: "pix" | "credit_card";
      couponId?: string;
      card?: {
        holderName: string;
        number: string;
        expiryMonth: string;
        expiryYear: string;
        ccv: string;
      };
      installments?: number;
    };

    if (!items?.length || !name || !email || !cpfCnpj) {
      return NextResponse.json(
        { error: "Dados obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    // Check session
    const session = await auth();
    let userId: string;
    let isNewUser = false;

    if (session?.user?.id) {
      userId = session.user.id;
    } else {
      // Must create account
      if (!password) {
        return NextResponse.json(
          { error: "Senha obrigatória para criar conta" },
          { status: 400 }
        );
      }

      // Check existing email
      const [existingEmail] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email.toLowerCase().trim()))
        .limit(1);

      if (existingEmail) {
        return NextResponse.json(
          {
            error: "Este e-mail já está cadastrado. Faça login primeiro.",
            code: "EMAIL_EXISTS",
          },
          { status: 409 }
        );
      }

      // Check existing CPF
      const [existingCpf] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.cpfCnpj, cpfCnpj))
        .limit(1);

      if (existingCpf) {
        return NextResponse.json(
          {
            error: "Este CPF/CNPJ já está cadastrado. Faça login primeiro.",
            code: "CPF_EXISTS",
          },
          { status: 409 }
        );
      }

      const hashedPassword = await hash(password, 12);
      const [newUser] = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          cpfCnpj,
          password: hashedPassword,
          role: "user",
        })
        .returning({ id: users.id });

      userId = newUser.id;
      isNewUser = true;
    }

    // Captura CPF/telefone no perfil de quem logou sem esses dados (ex.: login Google).
    // Não sobrescreve dados já existentes.
    if (session?.user?.id) {
      try {
        const [u] = await db
          .select({ cpfCnpj: users.cpfCnpj, phone: users.phone })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
        const updates: { cpfCnpj?: string; phone?: string } = {};
        if (!u?.cpfCnpj && cpfCnpj) updates.cpfCnpj = cpfCnpj.replace(/\D/g, "");
        if (!u?.phone && phone) updates.phone = phone.replace(/\D/g, "");
        if (Object.keys(updates).length > 0) {
          await db.update(users).set(updates).where(eq(users.id, userId));
        }
      } catch {
        // não bloqueia a compra se falhar (ex.: CPF já usado por outra conta)
      }
    }

    // Calculate totals
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Re-valida o cupom no servidor (não confia no valor vindo do front).
    // O uso (usageCount) só é incrementado quando o pagamento for confirmado (webhook).
    let discountAmount = 0;
    let validCouponId: string | null = null;
    if (couponId) {
      const couponResult = await validateCouponById(couponId);
      if (couponResult.ok) {
        discountAmount = computeDiscount(couponResult.coupon, subtotal);
        validCouponId = couponResult.coupon.id;
      }
      // Se o cupom não for mais válido, segue sem desconto (não bloqueia a compra)
    }
    const total = Math.round((subtotal - discountAmount) * 100) / 100;

    // Create payment record in DB
    const [payment] = await db
      .insert(payments)
      .values({
        userId,
        amount: total.toFixed(2),
        method: paymentMethod === "pix" ? "pix" : "credit_card",
        status: "pending",
        installments: installments || 1,
        couponId: validCouponId,
        discountAmount: discountAmount > 0 ? discountAmount.toFixed(2) : null,
      })
      .returning({ id: payments.id });

    // Create report requests
    for (const item of items) {
      // Pacotes geram N créditos (report requests)
      const totalCredits = item.type === "pacote" && item.credits
        ? item.credits * item.quantity
        : item.quantity;

      const reportType = mapReportType(item.apiService || "completa");

      for (let i = 0; i < totalCredits; i++) {
        await db.insert(reportRequests).values({
          userId,
          plate: "PENDENTE",
          reportType: reportType as "basic" | "complete" | "premium",
          status: "pending_payment",
          paymentId: payment.id,
          apiService: item.apiService || "completa",
          consultaName: item.name,
        });
      }
    }

    // Description for Asaas
    const description = items
      .map((i) => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ""}`)
      .join(", ");

    // Create customer and payment in Asaas
    try {
      const customerId = await findOrCreateCustomer({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        cpfCnpj,
        phone,
      });

      // Update user with Asaas customer ID
      await db
        .update(users)
        .set({ asaasCustomerId: customerId })
        .where(eq(users.id, userId));

      if (paymentMethod === "pix") {
        const pixResult = await createPixPayment({
          customerId,
          value: total,
          description,
          externalReference: payment.id,
        });

        // Save Asaas payment ID
        await db
          .update(payments)
          .set({ asaasId: pixResult.paymentId })
          .where(eq(payments.id, payment.id));

        return NextResponse.json({
          paymentId: payment.id,
          total,
          isNewUser,
          userId,
          pix: {
            qrCodeBase64: pixResult.pixQrCodeUrl,
            copyPaste: pixResult.pixCopyPaste,
            expirationDate: pixResult.expirationDate,
          },
        });
      } else {
        // Credit card
        if (!card) {
          return NextResponse.json(
            { error: "Dados do cartão são obrigatórios" },
            { status: 400 }
          );
        }

        const cardResult = await createCardPayment({
          customerId,
          value: total,
          description,
          externalReference: payment.id,
          installmentCount: installments || 1,
          card,
          cardHolderInfo: {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            cpfCnpj,
            phone,
          },
        });

        // Save Asaas payment ID
        await db
          .update(payments)
          .set({
            asaasId: cardResult.paymentId,
            status: cardResult.status === "CONFIRMED" ? "confirmed" : "pending",
          })
          .where(eq(payments.id, payment.id));

        // If card payment confirmed immediately, update report requests
        if (cardResult.status === "CONFIRMED") {
          await db
            .update(reportRequests)
            .set({ status: "processing" })
            .where(eq(reportRequests.paymentId, payment.id));
        }

        return NextResponse.json({
          paymentId: payment.id,
          total,
          isNewUser,
          userId,
          cardStatus: cardResult.status,
        });
      }
    } catch (asaasError) {
      console.error("Asaas error:", asaasError);
      // Payment record exists in DB but Asaas failed - return error
      // Don't delete the DB record, admin can manually handle
      return NextResponse.json(
        {
          error:
            asaasError instanceof Error
              ? asaasError.message
              : "Erro ao processar pagamento. Tente novamente.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar checkout" },
      { status: 500 }
    );
  }
}
