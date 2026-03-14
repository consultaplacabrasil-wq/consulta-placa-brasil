import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/admin-guard";

const INDEXNOW_KEY = "2f815bd9e26f6779b553623766204a94";
const HOST = "consultaplacabrasil.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// All indexable URLs of the site
function getAllUrls(): string[] {
  const base = `https://${HOST}`;

  const staticPages = [
    "",
    "/sobre",
    "/contato",
    "/faq",
    "/blog",
    "/termos",
    "/privacidade",
    "/cookies",
    "/lgpd",
    "/ferramentas",
  ];

  const toolSlugs = [
    "calculadora-ipva",
    "calculadora-multas",
    "simulador-financiamento",
    "calculadora-flex",
    "decodificador-chassi",
    "identificador-placa",
    "simulador-pontos-cnh",
    "verificador-documentos",
    "calculadora-transferencia",
    "custo-total-veiculo",
    "calculadora-depreciacao",
    "eletrico-vs-combustao",
    "calculadora-frete-antt",
    "custo-km-caminhao",
    "gerador-placa",
    "conversor-placa",
    "checklist-manutencao",
    "calculadora-combustivel",
    "calculadora-rodizio",
    "gerador-contrato",
    "consulta-fipe",
    "consulta-recall",
    "consulta-cep",
    "calculadora-dpvat",
  ];

  const urls = [
    ...staticPages.map((p) => `${base}${p}`),
    ...toolSlugs.map((s) => `${base}/ferramentas/${s}`),
  ];

  return urls;
}

// POST /api/indexnow — submit all URLs
export async function POST() {
  const { error } = await requireRole("admin");
  if (error) return error;
  try {
    const urlList = getAllUrls();

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let message = "";

    switch (status) {
      case 200:
        message = "URLs submetidas com sucesso.";
        break;
      case 202:
        message = "URLs aceitas, serão processadas em breve.";
        break;
      case 400:
        message = "Requisição inválida.";
        break;
      case 403:
        message = "Chave inválida ou não autorizada.";
        break;
      case 422:
        message = "URLs não pertencem ao host informado.";
        break;
      case 429:
        message = "Muitas requisições. Tente novamente mais tarde.";
        break;
      default:
        message = `Resposta inesperada: ${status}`;
    }

    return NextResponse.json({
      success: status === 200 || status === 202,
      status,
      message,
      urlsSubmitted: urlList.length,
      urls: urlList,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao conectar com IndexNow API.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// GET /api/indexnow — submit a single URL or all
export async function GET(request: Request) {
  const { error } = await requireRole("admin");
  if (error) return error;
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    const urlList = url ? [url] : getAllUrls();

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.status === 200 || response.status === 202,
      status: response.status,
      urlsSubmitted: urlList.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
