import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/noticias?newsletter=erro", "https://consultaplacabrasil.com")
    );
  }

  try {
    const result = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.confirmToken, token))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.redirect(
        new URL("/noticias?newsletter=invalido", "https://consultaplacabrasil.com")
      );
    }

    await db
      .update(newsletterSubscribers)
      .set({
        status: "cancelado",
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.id, result[0].id));

    return NextResponse.redirect(
      new URL("/noticias?newsletter=cancelado", "https://consultaplacabrasil.com")
    );
  } catch {
    return NextResponse.redirect(
      new URL("/noticias?newsletter=erro", "https://consultaplacabrasil.com")
    );
  }
}
