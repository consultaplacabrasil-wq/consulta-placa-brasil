import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { vehicles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

interface RouteContext {
  params: Promise<{ placa: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { placa } = await context.params;
    const formattedPlate = placa.toUpperCase();

    if (!PLATE_REGEX.test(formattedPlate)) {
      return NextResponse.json(
        { error: "Placa inválida" },
        { status: 400 }
      );
    }

    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.plate, formattedPlate))
      .limit(1);

    if (!vehicle) {
      return NextResponse.json(
        { error: "Veículo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ vehicle });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
