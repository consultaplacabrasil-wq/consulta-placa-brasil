import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reportRequests, reports } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { executarConsulta } from "@/lib/apibrasil";
import { mapReportType } from "@/lib/utils/report-type";
import { getOrCreateInsights } from "@/lib/modelo/insights-cache";
import {
  checkConsultaRateLimit,
  getClientIp,
  isConsultaPurpose,
  logConsultaAudit,
  rateLimitMessage,
} from "@/lib/consulta-audit";
import { calcularExpiracaoRelatorio } from "@/lib/retencao";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Contexto da trilha de auditoria individualizada (Nota Técnica SENATRAN
  // 554/2026, item 3.2.2.5). Toda tentativa é registrada, inclusive as
  // recusadas, para evidenciar o funcionamento dos controles.
  const userId = session.user.id;
  const ipAddress = getClientIp(req.headers);
  const userAgent = req.headers.get("user-agent");
  const audit = (
    outcome: Parameters<typeof logConsultaAudit>[0]["outcome"],
    extra: Omit<
      Parameters<typeof logConsultaAudit>[0],
      "userId" | "outcome" | "ipAddress" | "userAgent"
    > = {}
  ) => logConsultaAudit({ userId, outcome, ipAddress, userAgent, ...extra });

  try {
    const body = await req.json();
    const { requestId, plate, purpose } = body;

    if (!requestId || !plate) {
      await audit("rejected_request", { detail: "requestId ou placa ausente" });
      return NextResponse.json(
        { error: "ID da consulta e placa são obrigatórios" },
        { status: 400 }
      );
    }

    // Salvaguarda 1 — declaração expressa da finalidade pelo solicitante,
    // no momento da consulta. Sem ela a consulta não é executada.
    if (!isConsultaPurpose(purpose)) {
      await audit("rejected_purpose", {
        requestId,
        detail: `finalidade inválida ou ausente: ${String(purpose)}`,
      });
      return NextResponse.json(
        {
          error:
            "Informe a finalidade da consulta. A declaração é obrigatória e " +
            "fica registrada junto ao pedido.",
        },
        { status: 400 }
      );
    }

    const formattedPlate = plate.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (!PLATE_REGEX.test(formattedPlate)) {
      await audit("rejected_plate", { requestId, purpose });
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
          eq(reportRequests.userId, userId)
        )
      )
      .limit(1);

    if (!request) {
      await audit("rejected_request", {
        requestId,
        plate: formattedPlate,
        purpose,
        detail: "consulta inexistente ou de outro usuário",
      });
      return NextResponse.json(
        { error: "Consulta não encontrada" },
        { status: 404 }
      );
    }

    if (request.status !== "processing") {
      await audit("rejected_request", {
        requestId,
        plate: formattedPlate,
        purpose,
        detail: `status inesperado: ${request.status}`,
      });
      return NextResponse.json(
        { error: "Esta consulta não está disponível para execução. Status atual: " + request.status },
        { status: 400 }
      );
    }

    // Salvaguarda 2 — limitação do volume de consultas por usuário. Roda antes
    // da chamada à API: o crédito do usuário é preservado quando barra.
    const verdict = await checkConsultaRateLimit(userId);
    if (!verdict.allowed) {
      await audit("blocked_rate_limit", {
        requestId,
        plate: formattedPlate,
        purpose,
        detail: `janela ${verdict.window}: ${verdict.used}/${verdict.max}`,
      });
      return NextResponse.json(
        { error: rateLimitMessage(verdict) },
        { status: 429 }
      );
    }

    // Determine which API service to use
    const apiService = request.apiService || "premium";

    // Execute the consultation via APIBrasil
    let resultado;
    try {
      resultado = await executarConsulta(formattedPlate, apiService);
    } catch (err) {
      await audit("failed", {
        requestId,
        plate: formattedPlate,
        purpose,
        detail: err instanceof Error ? err.message : "erro na consulta",
      });
      throw err;
    }

    // Gera as avaliações do modelo (IA) em background, já deixando em cache
    // para o relatório exibir server-side (inclusive no PDF). Não bloqueia.
    try {
      const veic = (resultado.veiculo || {}) as Record<string, unknown>;
      const marcaObj = veic.marca && typeof veic.marca === "object" ? (veic.marca as Record<string, unknown>) : null;
      const modeloInsights =
        String(veic.marcaModelo || marcaObj?.modelo || [veic.marca, veic.modelo].filter(Boolean).join(" ") || "").trim();
      if (modeloInsights) {
        getOrCreateInsights(modeloInsights).catch(() => {});
      }
    } catch {
      /* não afeta a consulta */
    }

    // Save the report
    const [report] = await db
      .insert(reports)
      .values({
        requestId,
        plate: formattedPlate,
        type: mapReportType(apiService),
        data: resultado,
        expiresAt: calcularExpiracaoRelatorio(),
      })
      .returning();

    // Update the request with the plate, a finalidade declarada e o status
    await db
      .update(reportRequests)
      .set({
        plate: formattedPlate,
        status: "completed",
        purpose,
        purposeDeclaredAt: new Date(),
      })
      .where(eq(reportRequests.id, requestId));

    // Salvaguarda 3 — registro da consulta efetivada. É esta linha que conta
    // para o limite de volume apurado em checkConsultaRateLimit.
    await audit("executed", {
      requestId,
      plate: formattedPlate,
      purpose,
      detail: `relatório ${report.id}`,
    });

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
