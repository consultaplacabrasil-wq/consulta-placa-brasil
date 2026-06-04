import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reportRequests, reports } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { executarConsulta } from "@/lib/apibrasil";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
const ALLOWED_EMAIL = "mfrancadf@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.email !== ALLOWED_EMAIL) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const { plate } = await req.json();
    const formatted = plate?.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (!formatted || !PLATE_REGEX.test(formatted)) {
      return NextResponse.json({ error: "Placa inválida" }, { status: 400 });
    }

    // Execute consultation (basic only - cheapest)
    const resultado = await executarConsulta(formatted, "dados_cadastrais");

    // Create request + report
    const [request] = await db
      .insert(reportRequests)
      .values({
        userId: session.user.id,
        plate: formatted,
        reportType: "basic",
        status: "completed",
        apiService: "dados_cadastrais",
        consultaName: "Consulta Teste",
      })
      .returning();

    const [report] = await db
      .insert(reports)
      .values({
        requestId: request.id,
        plate: formatted,
        type: "basic",
        data: resultado,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      .returning();

    return NextResponse.json({ reportId: report.id, plate: formatted });
  } catch (error) {
    console.error("Erro consulta teste:", error);
    return NextResponse.json(
      { error: "Erro ao processar consulta. Tente novamente." },
      { status: 500 }
    );
  }
}
