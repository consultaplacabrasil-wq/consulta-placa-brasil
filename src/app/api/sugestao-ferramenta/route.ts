import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toolSuggestions } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, ferramentas } = body;

    if (
      !ferramentas ||
      !Array.isArray(ferramentas) ||
      ferramentas.length === 0
    ) {
      return NextResponse.json(
        { error: "Informe pelo menos uma ferramenta." },
        { status: 400 }
      );
    }

    for (const f of ferramentas) {
      if (!f.nome || typeof f.nome !== "string" || f.nome.trim().length < 3) {
        return NextResponse.json(
          { error: "Cada ferramenta precisa ter um nome com pelo menos 3 caracteres." },
          { status: 400 }
        );
      }
    }

    const sanitized = ferramentas.map((f: { nome: string; descricao?: string }) => ({
      nome: f.nome.trim().slice(0, 200),
      descricao: (f.descricao || "").trim().slice(0, 500),
    }));

    await db.insert(toolSuggestions).values({
      nome: nome ? String(nome).trim().slice(0, 100) : null,
      email: email ? String(email).trim().slice(0, 255) : null,
      ferramentas: sanitized,
    });

    return NextResponse.json({
      success: true,
      message: "Sugestão enviada com sucesso!",
      count: sanitized.length,
    });
  } catch (error) {
    console.error("Erro ao salvar sugestão:", error);
    return NextResponse.json(
      { error: "Erro ao enviar sugestão. Tente novamente." },
      { status: 500 }
    );
  }
}
