import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users, payments, reportRequests, coupons } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import {
  findOrCreateCustomer,
  createPixPayment,
  createCardPayment,
} from "@/lib/asaas";

interface CheckoutItem {
  id: string;
  name: string;
  type: "consulta" | "pacote";
  price: number;
  quantity: number;
  plate?: string;
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
      couponDiscountPercent,
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
      couponDiscountPercent?: number;
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

    // Calculate totals
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountPercent = couponDiscountPercent || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    const total = Math.round((subtotal - discountAmount) * 100) / 100;

    // Increment coupon usage
    if (couponId) {
      await db
        .update(coupons)
        .set({ usageCount: sql`${coupons.usageCount} + 1` })
        .where(eq(coupons.id, couponId));
    }

    // Create payment record in DB
    const [payment] = await db
      .insert(payments)
      .values({
        userId,
        amount: total.toFixed(2),
        method: paymentMethod === "pix" ? "pix" : "credit_card",
        status: "pending",
        installments: installments || 1,
        couponId: couponId || null,
        discountAmount: discountAmount > 0 ? discountAmount.toFixed(2) : null,
      })
      .returning({ id: payments.id });

    // Create report requests
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        await db.insert(reportRequests).values({
          userId,
          plate: item.plate || "PENDENTE",
          reportType: "basic",
          status: "pending_payment",
          paymentId: payment.id,
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
