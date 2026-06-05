import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

const envContent = readFileSync(".env.local", "utf8");
const match = envContent.match(/DATABASE_URL=(.+)/);
const dbUrl = match[1].trim();
const sql = neon(dbUrl);

async function seed() {
  // Clear existing
  await sql`DELETE FROM consulta_types`;
  await sql`DELETE FROM pacotes`;

  // 3 Consultas
  await sql`INSERT INTO consulta_types (id, name, description, price, original_price, benefits, popular, active, sort_order, api_service)
    VALUES (${randomUUID()}, 'Dados Cadastrais', 'Informações básicas do veículo: marca, modelo, ano, cor, combustível, chassi, potência e categoria.', '14.90', '19.90', ${JSON.stringify(["Marca e modelo", "Ano fabricação/modelo", "Cor e combustível", "Chassi e RENAVAM", "Categoria e espécie"])}, false, true, 1, 'dados_cadastrais')`;

  await sql`INSERT INTO consulta_types (id, name, description, price, original_price, benefits, popular, active, sort_order, api_service)
    VALUES (${randomUUID()}, 'Débitos e Multas', 'Dados completos do veículo + débitos (IPVA, DPVAT, licenciamento) + multas detalhadas com valores e pontuação.', '29.90', '39.90', ${JSON.stringify(["Tudo do Dados Cadastrais", "IPVA e DPVAT", "Licenciamento", "Multas detalhadas", "Pontuação das infrações"])}, false, true, 2, 'debitos_multas')`;

  await sql`INSERT INTO consulta_types (id, name, description, price, original_price, benefits, popular, active, sort_order, api_service)
    VALUES (${randomUUID()}, 'Consulta Completa', 'A consulta mais completa: todos os dados do veículo, débitos, multas, gravame (financiamento), restrições e roubo/furto.', '44.90', '59.90', ${JSON.stringify(["Tudo do Débitos e Multas", "Gravame (financiamento)", "Restrições judiciais", "Roubo e furto", "Situação completa do veículo"])}, true, true, 3, 'completa')`;

  // 3 Pacotes
  await sql`INSERT INTO pacotes (id, name, description, price, original_price, popular, active, sort_order, credits, api_service)
    VALUES (${randomUUID()}, 'Pacote 5 Consultas', '5 consultas completas com desconto de 20%.', '179.90', '224.50', false, true, 1, 5, 'completa')`;

  await sql`INSERT INTO pacotes (id, name, description, price, original_price, popular, active, sort_order, credits, api_service)
    VALUES (${randomUUID()}, 'Pacote 15 Consultas', '15 consultas completas com desconto de 33%. Ideal para despachantes.', '449.90', '673.50', true, true, 2, 15, 'completa')`;

  await sql`INSERT INTO pacotes (id, name, description, price, original_price, popular, active, sort_order, credits, api_service)
    VALUES (${randomUUID()}, 'Pacote 30 Consultas', '30 consultas completas com desconto de 44%. Melhor custo-benefício.', '749.90', '1347.00', false, true, 3, 30, 'completa')`;

  console.log("Seed completo! 3 consultas e 3 pacotes criados.");
}

seed().catch(console.error);
