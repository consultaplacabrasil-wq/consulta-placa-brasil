import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, reportRequests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { verifyReportToken } from "@/lib/report-token";
import { relatorioExpirado } from "@/lib/retencao";
import {
  conferirIdentificador,
  normalizarIdentificador,
  type ResultadoConferencia,
} from "@/lib/identificador-veicular";

/**
 * Mecanismo de conferência de correspondência previsto na Nota Técnica SENATRAN
 * nº 554/2026, item 4.1.4.2: o interessado confirma que os números gravados no
 * veículo correspondem aos do registro oficial, sem receber o número integral.
 *
 * O valor oficial nunca sai do servidor — a resposta é apenas "confere" ou
 * "diverge". Como só há comparação de valor completo, sem qualquer retorno
 * parcial, o endpoint não funciona como oráculo para descobrir o identificador.
 */

// Evita sondagem com fragmentos curtos.
const MIN_LEN = 6;

interface Body {
  token?: string;
  chassi?: string;
  motor?: string;
}

/** Lê o primeiro campo presente, aceitando as variações de nome da API. */
function pick(veiculo: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const val = veiculo[k];
    if (val !== undefined && val !== null && val !== "" && typeof val !== "object") {
      return String(val);
    }
  }
  return "";
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json().catch(() => ({}))) as Body;

    const report = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1)
      .then((r) => r[0]);
    if (!report) {
      return NextResponse.json(
        { error: "Relatório não encontrado" },
        { status: 404 }
      );
    }

    // Politica de retencao: a conferencia acompanha o relatorio.
    if (relatorioExpirado(report)) {
      return NextResponse.json(
        { error: "Este relatório não está mais disponível." },
        { status: 410 }
      );
    }

    // Autoriza pelo token de compartilhamento ou pela sessão do dono — os dois
    // caminhos pelos quais o relatório já é legitimamente visível.
    let autorizado = Boolean(body.token && verifyReportToken(id, body.token));
    if (!autorizado) {
      const session = await auth();
      if (session?.user?.id) {
        const [request] = await db
          .select({ id: reportRequests.id })
          .from(reportRequests)
          .where(
            and(
              eq(reportRequests.id, report.requestId),
              eq(reportRequests.userId, session.user.id)
            )
          )
          .limit(1);
        autorizado = Boolean(request);
      }
    }
    if (!autorizado) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const data = report.data as { veiculo?: Record<string, unknown> };
    const veiculo = data.veiculo || {};

    const resultado: {
      chassi?: ResultadoConferencia | null;
      motor?: ResultadoConferencia | null;
    } = {};

    if (body.chassi !== undefined) {
      const informado = normalizarIdentificador(body.chassi);
      resultado.chassi =
        informado.length < MIN_LEN
          ? null
          : conferirIdentificador(informado, pick(veiculo, "chassi"));
    }

    if (body.motor !== undefined) {
      const informado = normalizarIdentificador(body.motor);
      resultado.motor =
        informado.length < MIN_LEN
          ? null
          : conferirIdentificador(
              informado,
              pick(veiculo, "numMotor", "numero_motor", "numeroMotor")
            );
    }

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro na conferência de identificadores:", error);
    return NextResponse.json(
      { error: "Não foi possível conferir agora. Tente novamente." },
      { status: 500 }
    );
  }
}
