"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCog, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function MeuPerfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "");
      } catch {
        setMessage({ type: "error", text: "Erro ao carregar perfil" });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleSave() {
    if (!name || !email) {
      showMsg("error", "Nome e e-mail são obrigatórios");
      return;
    }

    if (password && password.length < 8) {
      showMsg("error", "A senha deve ter no mínimo 8 caracteres");
      return;
    }

    if (password && password !== confirmPassword) {
      showMsg("error", "As senhas não coincidem");
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, string> = { name, email };
      if (password) payload.password = password;

      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      showMsg("success", "Perfil atualizado com sucesso");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Meu Perfil</h1>
        <p className="text-sm text-[#64748B]">
          Edite suas informações pessoais
        </p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <UserCog className="h-5 w-5 text-[#FF4D30]" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
              Tipo de Usuário
            </label>
            <div className="flex h-9 items-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-[#475569]">
              {role === "admin" ? "Administrador" : "Atendente"}
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">
              O tipo de usuário só pode ser alterado por um administrador.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Alterar Senha</CardTitle>
          <p className="text-xs text-[#94A3B8]">Deixe em branco para manter a senha atual</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nova Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
            {password && password.length > 0 && password.length < 8 && (
              <p className="text-xs text-red-500 mt-1">A senha deve ter no mínimo 8 caracteres</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Confirmar Senha</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a nova senha"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
