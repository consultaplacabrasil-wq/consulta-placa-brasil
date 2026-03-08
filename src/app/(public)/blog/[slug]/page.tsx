import type { Metadata } from "next";
import { ArrowLeft, FileX } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post do Blog",
  description: "Leia artigos e dicas no blog da Consulta Placa Brasil.",
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0066FF]/10 mb-8">
              <FileX className="w-10 h-10 text-[#0066FF]" />
            </div>

            <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
              Post não encontrado
            </h1>

            <p className="text-[#475569] mb-8 max-w-md mx-auto leading-relaxed">
              O artigo que você está procurando ainda não foi publicado ou não existe.
              Nosso blog está em construção e em breve teremos conteúdos incríveis
              para você.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#0066FF] text-white font-medium hover:bg-[#0052CC] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-gray-200 text-[#0F172A] font-medium hover:bg-gray-50 transition-colors"
              >
                Ir para Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
