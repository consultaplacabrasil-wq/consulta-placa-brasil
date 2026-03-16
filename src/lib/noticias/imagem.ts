const CATEGORY_QUERIES: Record<string, string> = {
  "detran": "car documents registration dmv",
  "recalls": "car recall safety check",
  "mercado-usados": "used car dealership sale",
  "legislacao": "traffic road law highway",
  "multas": "traffic police fine road",
};

interface PexelsPhoto {
  alt: string;
  src: {
    large: string;
    large2x: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

export async function buscarImagemPexels(
  titulo: string,
  categoria: string
): Promise<{ url: string; alt: string } | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  const categoryQuery = CATEGORY_QUERIES[categoria] || "car automotive";

  // Extrai nomes próprios do título (possíveis marcas/modelos)
  const properNouns = titulo.match(/\b[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÇ][a-záéíóúâêîôûãõàèìòùç]+(?:\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÇ][a-záéíóúâêîôûãõàèìòùç]+)*\b/g);
  const brandTerms = properNouns
    ?.filter((w) => !["O", "A", "Os", "As", "Um", "Uma", "De", "Da", "Do", "Em", "No", "Na", "Para", "Com", "Por", "Que"].includes(w))
    .slice(0, 2)
    .join(" ") || "";

  const query = brandTerms ? `${brandTerms} ${categoryQuery}` : categoryQuery;

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) return null;

    const data: PexelsResponse = await response.json();
    const photo = data.photos?.[0];
    if (!photo) return null;

    // large2x = 1880px — atende requisito mínimo 1200px do Google Discover
    return {
      url: photo.src.large2x,
      alt: photo.alt || titulo,
    };
  } catch {
    return null;
  }
}
