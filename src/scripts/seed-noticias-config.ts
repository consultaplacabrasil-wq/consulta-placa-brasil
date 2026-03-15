import { db } from "@/lib/db";
import { noticiasConfig } from "@/lib/db/schema";

const categorias = [
  {
    categoria: "detran",
    categoriaLabel: "Detran e Documentação",
    feedUrl:
      "https://news.google.com/rss/search?q=detran&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "recalls",
    categoriaLabel: "Recalls e Segurança",
    feedUrl:
      "https://news.google.com/rss/search?q=recall+veiculos&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "mercado-usados",
    categoriaLabel: "Mercado de Usados",
    feedUrl:
      "https://news.google.com/rss/search?q=mercado+carros+usados+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "legislacao",
    categoriaLabel: "Legislação e Trânsito",
    feedUrl:
      "https://news.google.com/rss/search?q=transito+legislacao+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    categoria: "multas",
    categoriaLabel: "Multas e Infrações",
    feedUrl:
      "https://news.google.com/rss/search?q=multas+transito+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
];

async function seed() {
  for (const cat of categorias) {
    await db
      .insert(noticiasConfig)
      .values(cat)
      .onConflictDoNothing({ target: noticiasConfig.categoria });
  }
  console.log("Seed concluido: 5 categorias inseridas");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
