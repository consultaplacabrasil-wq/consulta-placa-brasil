"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  RefreshCw,
  ExternalLink,
  FileText,
  CheckCircle,
  Loader2,
  Map,
  Bot,
} from "lucide-react";

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: string;
  priority?: number;
}

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"sitemap" | "robots">("sitemap");
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  async function fetchSitemap() {
    setLoading(true);
    try {
      const res = await fetch("/sitemap.xml");
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const urls = xml.querySelectorAll("url");
      const entries: SitemapEntry[] = [];
      urls.forEach((urlEl) => {
        entries.push({
          url: urlEl.querySelector("loc")?.textContent || "",
          lastModified: urlEl.querySelector("lastmod")?.textContent || "",
          changeFrequency: urlEl.querySelector("changefreq")?.textContent || "",
          priority: parseFloat(urlEl.querySelector("priority")?.textContent || "0"),
        });
      });
      setSitemapEntries(entries);
      setLastGenerated(new Date().toLocaleString("pt-BR"));
    } catch {
      setSitemapEntries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSitemap();
  }, []);

  const tabs = [
    { id: "sitemap" as const, label: "Sitemap", icon: Map },
    { id: "robots" as const, label: "Robots.txt", icon: Bot },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">SEO</h1>
        <p className="text-sm text-[#64748B]">Gerencie sitemap e robots.txt</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#FF4D30] text-white"
                  : "bg-white text-[#475569] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sitemap Tab */}
      {activeTab === "sitemap" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">{sitemapEntries.length}</p>
                  <p className="text-xs text-[#94A3B8]">URLs no sitemap</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Atualizado</p>
                  <p className="text-xs text-[#94A3B8]">{lastGenerated || "—"}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <Button
                  onClick={fetchSitemap}
                  disabled={loading}
                  className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Regenerar Sitemap
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">URLs do Sitemap</CardTitle>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1"
              >
                Ver XML <ExternalLink className="h-3 w-3" />
              </a>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[#FF4D30]" />
                </div>
              ) : (
                <div className="space-y-2">
                  {sitemapEntries.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <FileText className="h-4 w-4 shrink-0 text-[#FF4D30]" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#0F172A] truncate">
                            {entry.url.replace("https://consultaplacabrasil.com.br", "")}
                          </p>
                          <p className="text-xs text-[#94A3B8]">
                            Prioridade: {entry.priority} | Frequência: {entry.changeFrequency}
                          </p>
                        </div>
                      </div>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-[#94A3B8] hover:text-[#FF4D30]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                  {sitemapEntries.length === 0 && (
                    <p className="text-center text-sm text-[#94A3B8] py-8">
                      Nenhuma URL encontrada no sitemap.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Robots Tab */}
      {activeTab === "robots" && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Robots.txt</CardTitle>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FF4D30] hover:underline flex items-center gap-1"
            >
              Ver arquivo <ExternalLink className="h-3 w-3" />
            </a>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-[#0F172A] whitespace-pre-line">
{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /painel/
Disallow: /consultas/
Disallow: /relatorios/
Disallow: /pagamentos/
Disallow: /perfil/
Disallow: /login
Disallow: /cadastro
Disallow: /recuperar-senha
Disallow: /comprar/
Disallow: /checkout/

Sitemap: https://consultaplacabrasil.com.br/sitemap.xml`}
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
              <p className="text-sm text-blue-800">
                O arquivo robots.txt é gerado automaticamente pelo Next.js. Para alterações, edite o arquivo <code className="bg-blue-100 px-1 rounded">src/app/robots.ts</code>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
