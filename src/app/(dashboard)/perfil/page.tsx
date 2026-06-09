"use client";

import { useState, useEffect } from "react";
import { User, Mail, FileText, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePasswordStrength } from "@/lib/utils/password-validator";
import { validateCpfCnpj } from "@/lib/utils/document-validator";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string | null;
  phone: string | null;
  role: string;
  createdAt: string;
}

function formatCpfCnpjInput(value: string) {
  const d = value.replace(/\D/g, "");
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function formatPhoneInput(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

type MsgType = { type: "success" | "error"; text: string } | null;

function formatCpf(cpf: string | null) {
  if (!cpf) return "—";
  const c = cpf.replace(/\D/g, "");
  if (c.length === 11) return c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (c.length === 14) return c.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return cpf;
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [msg, setMsg] = useState<MsgType>(null);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [docForm, setDocForm] = useState({ cpfCnpj: "", phone: "" });
  const [savingDoc, setSavingDoc] = useState(false);

  async function handleSaveDocument(e: React.FormEvent) {
    e.preventDefault();
    if (!validateCpfCnpj(docForm.cpfCnpj)) {
      showMsg("error", "CPF ou CNPJ inválido. Verifique os números.");
      return;
    }
    setSavingDoc(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-document",
          cpfCnpj: docForm.cpfCnpj,
          phone: docForm.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar CPF/CNPJ");
      showMsg("success", "CPF/CNPJ salvo com sucesso!");
      setProfile((prev) => (prev ? { ...prev, cpfCnpj: data.cpfCnpj, phone: docForm.phone.replace(/\D/g, "") || prev.phone } : prev));
      setDocForm({ cpfCnpj: "", phone: "" });
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar CPF/CNPJ");
    } finally {
      setSavingDoc(false);
    }
  }

  function showMsg(type: "success" | "error", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 5000);
  }

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(() => showMsg("error", "Erro ao carregar perfil"))
      .finally(() => setLoadingProfile(false));
  }, []);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirm) {
      showMsg("error", "As novas senhas não coincidem");
      return;
    }

    const passwordError = validatePasswordStrength(passwordForm.newPassword);
    if (passwordError) { showMsg("error", passwordError); return; }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao alterar senha");

      showMsg("success", "Senha alterada com sucesso!");
      setPasswordForm({ current: "", newPassword: "", confirm: "" });
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao alterar senha");
    } finally {
      setSavingPassword(false);
    }
  }

  const passwordStrengthError = passwordForm.newPassword
    ? validatePasswordStrength(passwordForm.newPassword)
    : null;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Perfil</h1>
        <p className="text-gray-500 text-sm">Suas informações pessoais e configurações de acesso</p>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium ${
          msg.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {msg.type === "success"
            ? <CheckCircle className="h-4 w-4 shrink-0" />
            : <AlertCircle className="h-4 w-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      {/* Dados pessoais */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">Informações Pessoais</CardTitle>
          <CardDescription>Seus dados cadastrais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loadingProfile ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#FF4D30]" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label className="text-[#0F172A]">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input value={profile?.name || ""} className="pl-10 bg-gray-50" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0F172A]">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input value={profile?.email || ""} className="pl-10 bg-gray-50" readOnly />
                </div>
              </div>
              {profile?.cpfCnpj ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-[#0F172A]">CPF/CNPJ</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input value={formatCpf(profile?.cpfCnpj || null)} className="pl-10 bg-gray-50" readOnly />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                    <p className="text-xs text-blue-700">
                      Membro desde {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "—"}.
                      Para alterar nome, e-mail ou CPF entre em contato com o suporte.
                    </p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveDocument} className="space-y-4 rounded-xl border border-[#FF4D30]/30 bg-[#FFF7F5] p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-[#FF4D30] mt-0.5" />
                    <p className="text-sm text-[#0F172A]">
                      Complete seu <strong>CPF ou CNPJ</strong> para liberar a compra de consultas. (Obrigatório para emissão do pagamento.)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#0F172A]">CPF ou CNPJ <span className="text-[#FF4D30]">*</span></Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        className="pl-10 bg-white"
                        value={docForm.cpfCnpj}
                        onChange={(e) => setDocForm({ ...docForm, cpfCnpj: formatCpfCnpjInput(e.target.value) })}
                        maxLength={18}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#0F172A]">Telefone / WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        className="pl-10 bg-white"
                        value={docForm.phone}
                        onChange={(e) => setDocForm({ ...docForm, phone: formatPhoneInput(e.target.value) })}
                        maxLength={16}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2"
                    disabled={savingDoc}
                  >
                    {savingDoc ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    {savingDoc ? "Salvando..." : "Salvar CPF/CNPJ"}
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Troca de senha */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#0F172A]">Senha atual</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Sua senha atual"
                  className="pl-10 pr-10"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F172A]">Nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres, maiúscula, número e especial"
                  className="pl-10 pr-10"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordForm.newPassword && (
                <p className={`text-xs ${passwordStrengthError ? "text-red-500" : "text-green-600"}`}>
                  {passwordStrengthError || "Senha forte ✓"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F172A]">Confirmar nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirme a nova senha"
                  className="pl-10"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  required
                />
              </div>
              {passwordForm.confirm && passwordForm.newPassword !== passwordForm.confirm && (
                <p className="text-xs text-red-500">As senhas não coincidem</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold gap-2"
              disabled={savingPassword || !!passwordStrengthError}
            >
              {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {savingPassword ? "Alterando..." : "Alterar senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
