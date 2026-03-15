"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Settings, ArrowLeft, Play, Save, RefreshCw } from "lucide-react";

interface NoticiaConfig {
  id: string;
  categoria: string;
  categoriaLabel: string;
  ativa: boolean;
  limiteDiario: number;
  feedUrl: string;
  feedUrls: string[] | null;
  autoPublish: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SaveState {
  [id: string]: "idle" | "saving" | "saved" | "error";
}

interface ExecuteState {
  [key: string]: "idle" | "loading" | "success" | "error";
}

export default function AdminNoticiasConfigPage() {
  const [configs, setConfigs] = useState<NoticiaConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveStates, setSaveStates] = useState<SaveState>({});
  const [executeStates, setExecuteStates] = useState<ExecuteState>({});
  const [executeAllState, setExecuteAllState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fetchConfigs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/noticias/config");
      if (res.ok) {
        const data = await res.json();
        setConfigs(data);
      }
    } catch {
      console.error("Erro ao buscar configuracoes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  function updateConfig(id: string, field: keyof NoticiaConfig, value: unknown) {
    setConfigs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    setSaveStates((prev) => ({ ...prev, [id]: "idle" }));
  }

  async function handleSave(config: NoticiaConfig) {
    setSaveStates((prev) => ({ ...prev, [config.id]: "saving" }));
    try {
      const res = await fetch("/api/admin/noticias/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: config.id,
          ativa: config.ativa,
          limiteDiario: config.limiteDiario,
          autoPublish: config.autoPublish,
          feedUrl: config.feedUrl,
          feedUrls: config.feedUrls,
        }),
      });
      if (res.ok) {
        setSaveStates((prev) => ({ ...prev, [config.id]: "saved" }));
        setTimeout(() => {
          setSaveStates((prev) => ({ ...prev, [config.id]: "idle" }));
        }, 2000);
      } else {
        setSaveStates((prev) => ({ ...prev, [config.id]: "error" }));
      }
    } catch {
      setSaveStates((prev) => ({ ...prev, [config.id]: "error" }));
    }
  }

  async function handleExecute(categoria: string) {
    setExecuteStates((prev) => ({ ...prev, [categoria]: "loading" }));
    try {
      const res = await fetch("/api/admin/noticias/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria }),
      });
      if (res.ok) {
        setExecuteStates((prev) => ({ ...prev, [categoria]: "success" }));
        setTimeout(() => {
          setExecuteStates((prev) => ({ ...prev, [categoria]: "idle" }));
        }, 3000);
      } else {
        setExecuteStates((prev) => ({ ...prev, [categoria]: "error" }));
        setTimeout(() => {
          setExecuteStates((prev) => ({ ...prev, [categoria]: "idle" }));
        }, 3000);
      }
    } catch {
      setExecuteStates((prev) => ({ ...prev, [categoria]: "error" }));
      setTimeout(() => {
        setExecuteStates((prev) => ({ ...prev, [categoria]: "idle" }));
      }, 3000);
    }
  }

  async function handleExecuteAll() {
    setExecuteAllState("loading");
    try {
      const res = await fetch("/api/admin/noticias/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setExecuteAllState("success");
        setTimeout(() => setExecuteAllState("idle"), 3000);
      } else {
        setExecuteAllState("error");
        setTimeout(() => setExecuteAllState("idle"), 3000);
      }
    } catch {
      setExecuteAllState("error");
      setTimeout(() => setExecuteAllState("idle"), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/noticias"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#475569] transition-colors hover:bg-gray-50"
            title="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#FF4D30]" />
              <h1 className="text-2xl font-bold text-[#0F172A]">
                Configuracoes de Noticias
              </h1>
            </div>
            <p className="mt-0.5 text-sm text-[#64748B]">
              Gerencie as fontes e configuracoes de coleta automatica
            </p>
          </div>
        </div>
        <button
          onClick={handleExecuteAll}
          disabled={executeAllState === "loading"}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            executeAllState === "loading"
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : executeAllState === "success"
                ? "bg-green-600 text-white"
                : executeAllState === "error"
                  ? "bg-red-600 text-white"
                  : "bg-[#FF4D30] text-white hover:bg-[#E8432A]"
          }`}
        >
          {executeAllState === "loading" ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Executando...
            </>
          ) : executeAllState === "success" ? (
            <>
              <Play className="h-4 w-4" />
              Concluido!
            </>
          ) : executeAllState === "error" ? (
            <>
              <Play className="h-4 w-4" />
              Erro ao executar
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Executar Todas
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#FF4D30]" />
        </div>
      ) : configs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <Settings className="mb-3 h-10 w-10 text-[#94A3B8]" />
          <p className="text-sm font-medium text-[#475569]">
            Nenhuma configuracao encontrada
          </p>
          <p className="mt-1 text-xs text-[#94A3B8]">
            As configuracoes serao criadas automaticamente ao iniciar o sistema
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {configs.map((config) => {
            const saveState = saveStates[config.id] || "idle";
            const execState = executeStates[config.categoria] || "idle";

            return (
              <div
                key={config.id}
                className="rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${config.ativa ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {config.categoriaLabel}
                    </h3>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-[#64748B]">
                    {config.categoria}
                  </span>
                </div>

                {/* Card Body */}
                <div className="space-y-4 px-5 py-4">
                  {/* Ativa Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#475569]">
                      Ativa
                    </label>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={config.ativa}
                      onClick={() =>
                        updateConfig(config.id, "ativa", !config.ativa)
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF4D30] focus:ring-offset-2 ${
                        config.ativa ? "bg-[#FF4D30]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.ativa ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Auto Publish Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#475569]">
                      Publicar automaticamente
                    </label>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={config.autoPublish}
                      onClick={() =>
                        updateConfig(
                          config.id,
                          "autoPublish",
                          !config.autoPublish
                        )
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF4D30] focus:ring-offset-2 ${
                        config.autoPublish ? "bg-[#FF4D30]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          config.autoPublish
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Limite Diario */}
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-medium text-[#475569]">
                      Limite diario
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={config.limiteDiario}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          updateConfig(
                            config.id,
                            "limiteDiario",
                            Math.min(50, Math.max(1, val))
                          );
                        }
                      }}
                      className="h-9 w-20 rounded-lg border border-gray-200 bg-white px-3 text-center text-sm text-[#0F172A] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                    />
                  </div>

                  {/* Feed URLs */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#475569]">
                      Feeds RSS
                    </label>
                    <div className="space-y-2">
                      {(() => {
                        const allUrls = [config.feedUrl || "", ...(config.feedUrls || [])];
                        return allUrls.map((url, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={url}
                              onChange={(e) => {
                                const updated = [...allUrls];
                                updated[idx] = e.target.value;
                                updateConfig(config.id, "feedUrl", updated[0] || "");
                                updateConfig(config.id, "feedUrls", updated.slice(1));
                              }}
                              placeholder="https://news.google.com/rss/search?q=..."
                              className="h-9 flex-1 rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#FF4D30] focus:outline-none focus:ring-1 focus:ring-[#FF4D30]"
                            />
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = allUrls.filter((_, i) => i !== idx);
                                  updateConfig(config.id, "feedUrl", updated[0] || "");
                                  updateConfig(config.id, "feedUrls", updated.slice(1));
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                                title="Remover feed"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ));
                      })()}
                      <button
                        type="button"
                        onClick={() => {
                          updateConfig(config.id, "feedUrls", [...(config.feedUrls || []), ""]);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium text-[#475569] hover:border-[#FF4D30] hover:text-[#FF4D30] transition-colors"
                      >
                        + Adicionar feed
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
                  <button
                    onClick={() => handleExecute(config.categoria)}
                    disabled={execState === "loading"}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      execState === "loading"
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : execState === "success"
                          ? "bg-green-100 text-green-700"
                          : execState === "error"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {execState === "loading" ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Executando...
                      </>
                    ) : execState === "success" ? (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        Concluido!
                      </>
                    ) : execState === "error" ? (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        Erro
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        Executar Agora
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSave(config)}
                    disabled={saveState === "saving"}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      saveState === "saving"
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : saveState === "saved"
                          ? "bg-green-100 text-green-700"
                          : saveState === "error"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-[#FF4D30] text-white hover:bg-[#E8432A]"
                    }`}
                  >
                    {saveState === "saving" ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Salvando...
                      </>
                    ) : saveState === "saved" ? (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Salvo!
                      </>
                    ) : saveState === "error" ? (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Erro ao salvar
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Salvar
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
