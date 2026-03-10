import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db.select().from(siteSettings);
    const settings: Record<string, string | null> = {};
    for (const item of items) {
      settings[item.key] = item.value;
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar configurações" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Corpo da requisição inválido" },
        { status: 400 }
      );
    }

    const entries = Object.entries(body) as [string, string | null][];

    for (const [key, value] of entries) {
      const existing = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, key))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(siteSettings)
          .set({ value: value ?? null, updatedAt: new Date() })
          .where(eq(siteSettings.key, key));
      } else {
        await db.insert(siteSettings).values({
          key,
          value: value ?? null,
        });
      }
    }

    // Return all settings after update
    const items = await db.select().from(siteSettings);
    const settings: Record<string, string | null> = {};
    for (const item of items) {
      settings[item.key] = item.value;
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar configurações" },
      { status: 500 }
    );
  }
}
