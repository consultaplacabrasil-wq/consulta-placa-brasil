"use client";

import { useState } from "react";
import { User, Mail, FileText, Lock, Bell, Trash2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PerfilPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    reports: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      alert("As novas senhas nao coincidem.");
      return;
    }
    setIsLoading(true);
    // TODO: integrate with API
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({ current: "", newPassword: "", confirm: "" });
      alert("Senha alterada com sucesso!");
    }, 1000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Perfil</h1>
        <p className="text-gray-500 text-sm">Gerencie suas informacoes pessoais e preferencias</p>
      </div>

      {/* Personal info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">
            Informacoes Pessoais
          </CardTitle>
          <CardDescription>Seus dados cadastrais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#0F172A]">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                defaultValue=""
                placeholder="Seu nome"
                className="pl-10"
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0F172A]">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                defaultValue=""
                placeholder="seu@email.com"
                className="pl-10"
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpfCnpj" className="text-[#0F172A]">CPF/CNPJ</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="cpfCnpj"
                type="text"
                defaultValue=""
                placeholder="000.000.000-00"
                className="pl-10"
                disabled
              />
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Para alterar seus dados cadastrais, entre em contato com o suporte.
          </p>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A]">Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-[#0F172A]">Senha atual</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha atual"
                  className="pl-10 pr-10"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-[#0F172A]">Nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Sua nova senha"
                  className="pl-10 pr-10"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-[#0F172A]">Confirmar nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirme a nova senha"
                  className="pl-10"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Alterar senha"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificacoes
          </CardTitle>
          <CardDescription>Configure suas preferencias de notificacao</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="emailNotif"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked as boolean })
              }
            />
            <div>
              <Label htmlFor="emailNotif" className="text-sm font-medium text-[#0F172A] cursor-pointer">
                Notificacoes por e-mail
              </Label>
              <p className="text-xs text-gray-500">Receba alertas sobre suas consultas e creditos</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="reportNotif"
              checked={notifications.reports}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, reports: checked as boolean })
              }
            />
            <div>
              <Label htmlFor="reportNotif" className="text-sm font-medium text-[#0F172A] cursor-pointer">
                Relatorios prontos
              </Label>
              <p className="text-xs text-gray-500">Seja notificado quando um relatorio estiver pronto</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketingNotif"
              checked={notifications.marketing}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, marketing: checked as boolean })
              }
            />
            <div>
              <Label htmlFor="marketingNotif" className="text-sm font-medium text-[#0F172A] cursor-pointer">
                Promocoes e novidades
              </Label>
              <p className="text-xs text-gray-500">Receba ofertas especiais e novidades do servico</p>
            </div>
          </div>

          <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold">
            Salvar preferencias
          </Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border border-red-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-600">Zona de Perigo</CardTitle>
          <CardDescription>Acoes irreversiveis na sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div>
              <p className="text-sm font-medium text-red-800">Excluir conta</p>
              <p className="text-xs text-red-600">
                Ao excluir sua conta, todos os dados serao permanentemente removidos. Esta acao nao pode ser desfeita.
              </p>
            </div>
            <Button
              variant="destructive"
              className="shrink-0 gap-2"
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir sua conta? Esta acao nao pode ser desfeita.")) {
                  // TODO: integrate with account deletion
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              Excluir conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
