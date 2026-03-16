import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/painel/",
          "/consultas/",
          "/relatorios/",
          "/pagamentos/",
          "/perfil/",
          "/login",
          "/cadastro",
          "/recuperar-senha",
          "/comprar/",
          "/checkout/",
          "/consulta/",
          "/relatorio/",
        ],
      },
    ],
    sitemap: [
      "https://consultaplacabrasil.com/sitemap.xml",
      "https://consultaplacabrasil.com/news-sitemap.xml",
    ],
  };
}
