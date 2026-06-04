import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reportRequests, reports } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { executarConsulta, TipoConsulta } from "@/lib/apibrasil";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { requestId, plate } = body;

    if (!requestId || !plate) {
      return NextResponse.json(
        { error: "ID da consulta e placa são obrigatórios" },
        { status: 400 }
      );
    }

    const formattedPlate = plate.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (!PLATE_REGEX.test(formattedPlate)) {
      return NextResponse.json(
        { error: "Placa inválida. Use o formato ABC1D23 ou ABC1234" },
        { status: 400 }
      );
    }

    // Verify the request belongs to the user and is in "processing" status
    const [request] = await db
      .select()
      .from(reportRequests)
      .where(
        and(
          eq(reportRequests.id, requestId),
          eq(reportRequests.userId, session.user.id)
        )
      )
      .limit(1);

    if (!request) {
      return NextResponse.json(
        { error: "Consulta não encontrada" },
        { status: 404 }
      );
    }

    if (request.status !== "processing") {
      return NextResponse.json(
        { error: "Esta consulta não está disponível para execução. Status atual: " + request.status },
        { status: 400 }
      );
    }

    // Determine which API service to use
    const apiService = (request.apiService || "completa") as TipoConsulta;

    // Execute the consultation via APIBrasil
    const resultado = await executarConsulta(formattedPlate, apiService);

    // Determine report type based on apiService
    const reportType = apiService === "dados_cadastrais"
      ? "basic"
      : apiService === "debitos_multas"
        ? "complete"
        : "premium";

    // Save the report
    const [report] = await db
      .insert(reports)
      .values({
        requestId,
        plate: formattedPlate,
        type: reportType as "basic" | "complete" | "premium",
        data: resultado,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      })
      .returning();

    // Update the request with the plate and mark as completed
    await db
      .update(reportRequests)
      .set({
        plate: formattedPlate,
        status: "completed",
      })
      .where(eq(reportRequests.id, requestId));

    return NextResponse.json({
      reportId: report.id,
      requestId,
      plate: formattedPlate,
      status: "completed",
    });
  } catch (error) {
    console.error("Erro ao executar consulta:", error);

    let userMessage = "Erro ao processar consulta. Tente novamente em alguns instantes.";
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("inesperada") || msg.includes("servidor")) {
        userMessage = "O serviço de consulta está temporariamente instável. Tente novamente em alguns minutos.";
      } else if (msg.includes("timeout") || msg.includes("tempo")) {
        userMessage = "A consulta demorou mais que o esperado. Tente novamente.";
      } else if (msg.includes("placa") || msg.includes("inválid")) {
        userMessage = "Placa não encontrada ou inválida. Verifique e tente novamente.";
      } else if (msg.includes("saldo") || msg.includes("crédito")) {
        userMessage = "Serviço temporariamente indisponível. Tente novamente mais tarde.";
      }
    }

    return NextResponse.json(
      { error: userMessage },
      { status: 500 }
    );
  }
}
