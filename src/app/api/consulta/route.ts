import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { vehicles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plate } = body;

    if (!plate || !PLATE_REGEX.test(plate.toUpperCase())) {
      return NextResponse.json(
        { error: "Placa inválida" },
        { status: 400 }
      );
    }

    const formattedPlate = plate.toUpperCase();

    // Check cache in database
    const [cached] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.plate, formattedPlate))
      .limit(1);

    if (cached) {
      return NextResponse.json({
        vehicle: cached,
        cached: true,
      });
    }

    // TODO: Call external vehicle API
    // For now, return mock data
    const mockData = {
      plate: formattedPlate,
      brand: "JEEP",
      model: "RENEGADE LONGITUDE",
      yearFab: 2021,
      yearModel: 2022,
      color: "Prata",
      fuel: "Flex",
      type: "Automóvel",
      uf: "SP",
    };

    return NextResponse.json({
      vehicle: mockData,
      cached: false,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
