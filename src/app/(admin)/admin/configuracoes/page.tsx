"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  Save,
  Info,
  Palette,
  Share2,
  Code,
  Shield,
  Upload,
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  CreditCard,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("informacoes");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Security form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Asaas
  const [showAsaasKey, setShowAsaasKey] = useState(false);
  const [showWebhookToken, setShowWebhookToken] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");

  // File previews
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Erro ao buscar configurações");
      const data = await res.json();
      setSettings(data);

      if (data.logo_url) setLogoPreview(data.logo_url);
      if (data.favicon_url) setFaviconPreview(data.favicon_url);
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar configurações" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function saveSettings(keys: string[]) {
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      for (const key of keys) {
        payload[key] = settings[key] || "";
      }

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      const data = await res.json();
      setSettings(data);
      showMsg("success", "Configurações salvas com sucesso");
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    setPreview: (url: string | null) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showMsg("error", "O arquivo deve ter no máximo 5MB");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showMsg("error", "Formato não suportado. Use JPG, PNG ou WebP");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      updateSetting(key, base64);
    };
    reader.readAsDataURL(file);
  }

  async function handlePasswordChange() {
    if (!currentPassword) {
      showMsg("error", "Informe a senha atual");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      showMsg("error", "A nova senha deve ter no mínimo 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMsg("error", "As senhas não coincidem");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "admin",
          currentPassword,
          password: newPassword,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao alterar senha");
      }

      showMsg("success", "Senha alterada com sucesso");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao alterar senha");
    } finally {
      setSaving(false);
    }
  }

  async function testAsaasConnection() {
    setTestingConnection(true);
    setConnectionStatus("idle");
    try {
      const apiKey = settings.asaas_api_key;
      const environment = settings.asaas_environment || "sandbox";
      if (!apiKey) {
        showMsg("error", "Informe a API Key do Asaas");
        setTestingConnection(false);
        return;
      }
      const baseUrl = environment === "production"
        ? "https://api.asaas.com/v3"
        : "https://sandbox.asaas.com/api/v3";
      const res = await fetch("/api/admin/asaas/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, baseUrl }),
      });
      if (res.ok) {
        setConnectionStatus("success");
        showMsg("success", "Conexão com Asaas realizada com sucesso!");
      } else {
        setConnectionStatus("error");
        showMsg("error", "Falha ao conectar com Asaas. Verifique a API Key.");
      }
    } catch {
      setConnectionStatus("error");
      showMsg("error", "Erro ao testar conexão com Asaas");
    } finally {
      setTestingConnection(false);
    }
  }

  const tabs = [
    { id: "informacoes", label: "Informações", icon: Info },
    { id: "identidade", label: "Identidade Visual", icon: Palette },
    { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
    { id: "redes", label: "Redes Sociais", icon: Share2 },
    { id: "integracoes", label: "Integrações", icon: Code },
    { id: "seguranca", label: "Segurança", icon: Shield },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Configurações</h1>
        <p className="text-sm text-[#64748B]">Gerencie as configurações do site</p>
      </div>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

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

      {/* Tab: Informações */}
      {activeTab === "informacoes" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Info className="h-5 w-5 text-[#FF4D30]" />
              Informações do Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Nome do Site
              </label>
              <Input
                value={settings.site_name || ""}
                onChange={(e) => updateSetting("site_name", e.target.value)}
                placeholder="Consulta Placa Brasil"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Descrição
              </label>
              <Input
                value={settings.site_description || ""}
                onChange={(e) => updateSetting("site_description", e.target.value)}
                placeholder="Consulte qualquer veículo pela placa..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Sobre o Site
              </label>
              <textarea
                value={settings.site_about || ""}
                onChange={(e) => updateSetting("site_about", e.target.value)}
                placeholder="Texto institucional sobre o site..."
                rows={5}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF4D30]/20 focus:border-[#FF4D30] resize-y"
              />
            </div>
            <Button
              onClick={() => saveSettings(["site_name", "site_description", "site_about"])}
              disabled={saving}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab: Identidade Visual */}
      {activeTab === "identidade" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5 text-[#FF4D30]" />
              Identidade Visual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-3 block">
                Logomarca
              </label>
              <div className="flex items-start gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-[#94A3B8]" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#475569] hover:bg-gray-50 transition-colors">
                    <Upload className="h-4 w-4" />
                    Enviar Logo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "logo_url", setLogoPreview)}
                    />
                  </label>
                  <p className="text-xs text-[#94A3B8]">
                    Formatos: JPG, PNG ou WebP. Tamanho máximo: 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-3 block">
                Favicon
              </label>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">
                  {faviconPreview ? (
                    <img
                      src={faviconPreview}
                      alt="Favicon"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-[#94A3B8]" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#475569] hover:bg-gray-50 transition-colors">
                    <Upload className="h-4 w-4" />
                    Enviar Favicon
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "favicon_url", setFaviconPreview)}
                    />
                  </label>
                  <p className="text-xs text-[#94A3B8]">
                    Formatos: JPG, PNG ou WebP. Tamanho máximo: 5MB
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => saveSettings(["logo_url", "favicon_url"])}
              disabled={saving}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab: Pagamentos (Asaas) */}
      {activeTab === "pagamentos" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#FF4D30]" />
                Integração Asaas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-800">
                  O Asaas é o gateway de pagamento utilizado para processar Pix, cartão de crédito e boleto.
                </p>
                <a
                  href="https://www.asaas.com/customerRegistration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1"
                >
                  Criar conta no Asaas <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Ambiente */}
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Ambiente
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateSetting("asaas_environment", "sandbox")}
                    className={`flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                      (settings.asaas_environment || "sandbox") === "sandbox"
                        ? "border-[#FF4D30] bg-[#FFF5F3] text-[#FF4D30]"
                        : "border-gray-200 text-[#475569] hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">Sandbox</div>
                    <div className="text-xs mt-0.5 opacity-75">Testes e desenvolvimento</div>
                  </button>
                  <button
                    onClick={() => updateSetting("asaas_environment", "production")}
                    className={`flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                      settings.asaas_environment === "production"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-[#475569] hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">Produção</div>
                    <div className="text-xs mt-0.5 opacity-75">Pagamentos reais</div>
                  </button>
                </div>
                {settings.asaas_environment === "production" && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    Atenção: pagamentos reais serão processados neste modo.
                  </div>
                )}
              </div>

              {/* API Key */}
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  API Key
                </label>
                <div className="relative">
                  <Input
                    type={showAsaasKey ? "text" : "password"}
                    value={settings.asaas_api_key || ""}
                    onChange={(e) => updateSetting("asaas_api_key", e.target.value)}
                    placeholder="$aact_..."
                    className="pr-10 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAsaasKey(!showAsaasKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
                  >
                    {showAsaasKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Encontre em: Asaas → Configurações → Integrações → Chave de API
                </p>
              </div>

              {/* Webhook Token */}
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Token do Webhook
                </label>
                <div className="relative">
                  <Input
                    type={showWebhookToken ? "text" : "password"}
                    value={settings.asaas_webhook_token || ""}
                    onChange={(e) => updateSetting("asaas_webhook_token", e.target.value)}
                    placeholder="Token de autenticação do webhook"
                    className="pr-10 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWebhookToken(!showWebhookToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
                  >
                    {showWebhookToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Defina um token seguro e configure no Asaas → Integrações → Webhooks
                </p>
              </div>

              {/* Webhook URL */}
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  URL do Webhook (configure no Asaas)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value="https://consultaplacabrasil.com/api/pagamento/webhook"
                    className="bg-gray-50 font-mono text-sm text-[#475569]"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText("https://consultaplacabrasil.com/api/pagamento/webhook");
                      showMsg("success", "URL copiada!");
                    }}
                    className="shrink-0"
                  >
                    Copiar
                  </Button>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Copie esta URL e cadastre no painel do Asaas como endpoint de webhook
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  onClick={() => saveSettings(["asaas_api_key", "asaas_webhook_token", "asaas_environment"])}
                  disabled={saving}
                  className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Salvar Configurações
                </Button>
                <Button
                  variant="outline"
                  onClick={testAsaasConnection}
                  disabled={testingConnection || !settings.asaas_api_key}
                  className="gap-2"
                >
                  {testingConnection ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : connectionStatus === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : connectionStatus === "error" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pagamento */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Métodos de Pagamento Aceitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <span className="text-lg">💠</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Pix</p>
                    <p className="text-xs text-[#94A3B8]">Pagamento instantâneo</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment_pix !== "false"}
                    onChange={(e) => updateSetting("payment_pix", e.target.checked ? "true" : "false")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4D30]" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Cartão de Crédito</p>
                    <p className="text-xs text-[#94A3B8]">Até 12x com juros</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment_credit_card !== "false"}
                    onChange={(e) => updateSetting("payment_credit_card", e.target.checked ? "true" : "false")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4D30]" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <span className="text-lg">📄</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Boleto Bancário</p>
                    <p className="text-xs text-[#94A3B8]">Compensação em até 3 dias</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment_boleto === "true"}
                    onChange={(e) => updateSetting("payment_boleto", e.target.checked ? "true" : "false")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4D30]" />
                </label>
              </div>

              <Button
                onClick={() => saveSettings(["payment_pix", "payment_credit_card", "payment_boleto"])}
                disabled={saving}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2 mt-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Salvar Métodos
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Redes Sociais */}
      {activeTab === "redes" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#FF4D30]" />
              Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Instagram URL
              </label>
              <Input
                value={settings.instagram_url || ""}
                onChange={(e) => updateSetting("instagram_url", e.target.value)}
                placeholder="https://instagram.com/consultaplacabrasil"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Facebook URL
              </label>
              <Input
                value={settings.facebook_url || ""}
                onChange={(e) => updateSetting("facebook_url", e.target.value)}
                placeholder="https://facebook.com/consultaplacabrasil"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                X (Twitter) URL
              </label>
              <Input
                value={settings.twitter_url || ""}
                onChange={(e) => updateSetting("twitter_url", e.target.value)}
                placeholder="https://x.com/consultaplaca"
              />
            </div>
            <Button
              onClick={() => saveSettings(["instagram_url", "facebook_url", "twitter_url"])}
              disabled={saving}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab: Integrações */}
      {activeTab === "integracoes" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Code className="h-5 w-5 text-[#FF4D30]" />
              Integrações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Tag Google Search Console
              </label>
              <Input
                value={settings.google_search_console || ""}
                onChange={(e) => updateSetting("google_search_console", e.target.value)}
                placeholder='<meta name="google-site-verification" content="..." />'
              />
              <p className="text-xs text-[#94A3B8] mt-1">
                Cole a meta tag de verificação do Google Search Console
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Google Analytics ID
              </label>
              <Input
                value={settings.google_analytics_id || ""}
                onChange={(e) => updateSetting("google_analytics_id", e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-[#94A3B8] mt-1">
                Informe o Measurement ID do Google Analytics 4
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-800 font-medium">
                Esses scripts serão aplicados automaticamente em todo o site
              </p>
              <p className="text-xs text-blue-600 mt-1">
                As tags serão inseridas no head de todas as páginas após salvar.
              </p>
            </div>
            <Button
              onClick={() =>
                saveSettings(["google_search_console", "google_analytics_id"])
              }
              disabled={saving}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab: Segurança */}
      {activeTab === "seguranca" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#FF4D30]" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Senha Atual
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Informe a senha atual"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Nova Senha
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                Confirmar Nova Senha
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a nova senha"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
              )}
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 space-y-2">
              <p className="text-sm font-medium text-blue-800">
                Credenciais padrão do Admin:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-blue-600">E-mail:</p>
                  <p className="font-mono text-blue-900">admin@consultaplacabrasil.com.br</p>
                </div>
                <div>
                  <p className="text-blue-600">Senha:</p>
                  <p className="font-mono text-blue-900">Admin@2026!</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={saving}
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Atualizar Senha
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
