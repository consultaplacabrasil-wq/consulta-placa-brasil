"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Save,
  Key,
  Mail,
  Database,
} from "lucide-react";

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("geral");

  const tabs = [
    { id: "geral", label: "Geral", icon: Settings },
    { id: "pagamento", label: "Pagamento", icon: CreditCard },
    { id: "api", label: "APIs", icon: Key },
    { id: "email", label: "E-mail", icon: Mail },
    { id: "seguranca", label: "Segurança", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Configurações</h1>
        <p className="text-sm text-[#64748B]">Gerencie as configurações do sistema</p>
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

      {/* General */}
      {activeTab === "geral" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#FF4D30]" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Nome do Site</label>
              <Input defaultValue="Consulta Placa Brasil" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">URL do Site</label>
              <Input defaultValue="https://consulta-placa-brasil.vercel.app" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">E-mail de contato</label>
              <Input defaultValue="contato@consultaplacabrasil.com.br" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Telefone</label>
              <Input defaultValue="(11) 4002-8922" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Descrição SEO</label>
              <Input defaultValue="Consulte qualquer veículo pela placa. Relatório completo com histórico, sinistro, leilão, débitos, multas e mais." />
            </div>
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment */}
      {activeTab === "pagamento" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#FF4D30]" />
              Configurações de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800 font-medium">Gateway: Asaas</p>
              <p className="text-xs text-yellow-600 mt-1">Configure suas credenciais da API Asaas para processar pagamentos.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">API Key (Produção)</label>
              <Input type="password" defaultValue="••••••••••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">API Key (Sandbox)</label>
              <Input type="password" defaultValue="••••••••••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Webhook URL</label>
              <Input defaultValue="https://consulta-placa-brasil.vercel.app/api/pagamento/webhook" readOnly className="bg-gray-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Preço Completo</label>
                <Input defaultValue="24,90" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Preço Premium</label>
                <Input defaultValue="39,90" />
              </div>
            </div>
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* API */}
      {activeTab === "api" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Key className="h-5 w-5 text-[#FF4D30]" />
              Configurações de API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">API de Consulta Veicular</label>
              <Input type="password" defaultValue="••••••••••••••••" />
              <p className="text-xs text-[#94A3B8] mt-1">Chave da API utilizada para consultar dados dos veículos.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Database URL</label>
              <Input type="password" defaultValue="••••••••••••••••" />
              <p className="text-xs text-[#94A3B8] mt-1">String de conexão do banco de dados PostgreSQL (Neon).</p>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">NextAuth Secret</label>
              <Input type="password" defaultValue="••••••••••••••••" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Google Client ID</label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Google Client Secret</label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
            </div>
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Email */}
      {activeTab === "email" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#FF4D30]" />
              Configurações de E-mail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Servidor SMTP</label>
              <Input defaultValue="smtp.gmail.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Porta</label>
                <Input defaultValue="587" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Segurança</label>
                <select className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm">
                  <option>TLS</option>
                  <option>SSL</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">E-mail remetente</label>
              <Input defaultValue="noreply@consultaplacabrasil.com.br" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Senha</label>
              <Input type="password" defaultValue="••••••••••••••••" />
            </div>
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security */}
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
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Senha do Admin</label>
              <Input type="password" placeholder="Nova senha" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Confirmar Senha</label>
              <Input type="password" placeholder="Confirmar nova senha" />
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 space-y-2">
              <p className="text-sm font-medium text-blue-800">Credenciais padrão do Admin:</p>
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
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2">
              <Save className="h-4 w-4" />
              Atualizar Senha
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
