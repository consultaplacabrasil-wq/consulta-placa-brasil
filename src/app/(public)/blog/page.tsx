import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog da Consulta Placa Brasil. Dicas, notícias e informações sobre o mercado automotivo brasileiro.",
};

const placeholderPosts = [
  {
    title: "Como verificar o histórico completo de um veículo usado",
    excerpt:
      "Descubra os passos essenciais para consultar o histórico de um veículo antes de fechar negócio e evitar surpresas desagradáveis.",
    category: "Dicas",
    date: "Em breve",
    readTime: "5 min",
  },
  {
    title: "Entenda a diferença entre as placas Mercosul e o modelo antigo",
    excerpt:
      "Saiba tudo sobre o novo padrão de placas Mercosul, suas vantagens e como identificar cada tipo de placa no Brasil.",
    category: "Educativo",
    date: "Em breve",
    readTime: "4 min",
  },
  {
    title: "Os 10 golpes mais comuns na compra de veículos usados",
    excerpt:
      "Conheça os golpes mais frequentes na compra de carros usados e aprenda como se proteger com uma consulta veicular.",
    category: "Segurança",
    date: "Em breve",
    readTime: "7 min",
  },
  {
    title: "O que é o score de confiabilidade de um veículo?",
    excerpt:
      "Entenda como funciona o score de confiabilidade do nosso relatório premium e como ele pode ajudar na sua decisão de compra.",
    category: "Produto",
    date: "Em breve",
    readTime: "3 min",
  },
  {
    title: "LGPD e consulta veicular: como seus dados são protegidos",
    excerpt:
      "Saiba como a Consulta Placa Brasil trata seus dados em conformidade com a Lei Geral de Proteção de Dados.",
    category: "Privacidade",
    date: "Em breve",
    readTime: "6 min",
  },
  {
    title: "Recalls: por que verificar antes de comprar um veículo",
    excerpt:
      "Entenda a importância de verificar recalls pendentes e como isso pode afetar a segurança e o valor do veículo.",
    category: "Segurança",
    date: "Em breve",
    readTime: "4 min",
  },
];

const categoryColors: Record<string, string> = {
  Dicas: "bg-blue-100 text-blue-700",
  Educativo: "bg-purple-100 text-purple-700",
  Segurança: "bg-red-100 text-red-700",
  Produto: "bg-green-100 text-green-700",
  Privacidade: "bg-amber-100 text-amber-700",
};

export default function BlogPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0066FF] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Dicas, notícias e informações sobre o mercado automotivo brasileiro e
            consulta veicular.
          </p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#0066FF]/5 border border-[#0066FF]/10 rounded-xl p-6 text-center">
            <p className="text-[#0066FF] font-semibold text-lg mb-1">
              Em breve!
            </p>
            <p className="text-[#475569]">
              Estamos preparando conteúdos incríveis para você. Confira abaixo uma
              prévia dos artigos que estão por vir.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderPosts.map((post, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-gradient-to-br from-[#0066FF]/10 to-[#0066FF]/5 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
                    <span className="text-2xl text-[#0066FF]/40 font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        categoryColors[post.category] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#475569]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#0F172A] leading-tight group-hover:text-[#0066FF] transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>

                <CardContent className="pb-4">
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <span className="text-sm text-[#0066FF] font-medium flex items-center gap-1 opacity-50">
                    Em breve
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
