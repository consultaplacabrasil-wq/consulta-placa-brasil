"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PenSquare,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

const posts = [
  { id: "1", title: "Como verificar se um carro tem sinistro", slug: "como-verificar-sinistro", status: "published", views: 1234, date: "05/03/2026" },
  { id: "2", title: "Guia completo para comprar carro usado", slug: "guia-comprar-carro-usado", status: "published", views: 987, date: "01/03/2026" },
  { id: "3", title: "O que é gravame e como consultar", slug: "o-que-e-gravame", status: "draft", views: 0, date: "28/02/2026" },
  { id: "4", title: "Tabela FIPE: como funciona e como consultar", slug: "tabela-fipe-como-funciona", status: "published", views: 2341, date: "20/02/2026" },
  { id: "5", title: "Placa Mercosul: tudo que você precisa saber", slug: "placa-mercosul", status: "scheduled", views: 0, date: "10/03/2026" },
];

const statusMap: Record<string, { label: string; class: string; icon: typeof CheckCircle }> = {
  published: { label: "Publicado", class: "bg-green-100 text-green-700", icon: CheckCircle },
  draft: { label: "Rascunho", class: "bg-gray-100 text-gray-700", icon: FileText },
  scheduled: { label: "Agendado", class: "bg-blue-100 text-blue-700", icon: Clock },
};

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Blog</h1>
          <p className="text-sm text-[#64748B]">Gerencie os artigos do blog</p>
        </div>
        <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
          <Plus className="h-4 w-4" />
          Novo Artigo
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">3</p>
              <p className="text-xs text-[#94A3B8]">Publicados</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">1</p>
              <p className="text-xs text-[#94A3B8]">Rascunhos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">4.562</p>
              <p className="text-xs text-[#94A3B8]">Visualizações totais</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Todos os Artigos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.map((post) => {
              const st = statusMap[post.status];
              const StatusIcon = st.icon;
              return (
                <div key={post.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F3]">
                      <PenSquare className="h-5 w-5 text-[#FF4D30]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#0F172A] truncate">{post.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${st.class}`}>
                          <StatusIcon className="h-3 w-3" />
                          {st.label}
                        </span>
                        <span className="text-xs text-[#94A3B8]">{post.date}</span>
                        {post.views > 0 && (
                          <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                            <Eye className="h-3 w-3" />{post.views.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
