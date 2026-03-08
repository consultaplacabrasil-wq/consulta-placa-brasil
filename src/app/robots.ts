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
          "/creditos/",
          "/pagamentos/",
          "/perfil/",
          "/login",
          "/cadastro",
          "/recuperar-senha",
          "/comprar/",
        ],
      },
    ],
    sitemap: "https://consultaplacabrasil.com.br/sitemap.xml",
  };
}
