"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Star,
  Package,
  ListChecks,
  GripVertical,
  Loader2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ConsultaType {
  id: string;
  nome: string;
  preco: number;
  precoOriginal?: number;
  descricao: string;
  beneficios: string[];
  popular: boolean;
  ordem: number;
  ativo: boolean;
}

interface Pacote {
  id: string;
  nome: string;
  valor: number;
  valorOriginal?: number;
  descricao: string;
  popular: boolean;
  ordem: number;
}

type ConsultaForm = Omit<ConsultaType, "id">;
type PacoteForm = Omit<Pacote, "id">;

const emptyConsultaForm: ConsultaForm = {
  nome: "",
  preco: 0,
  precoOriginal: 0,
  descricao: "",
  beneficios: [],
  popular: false,
  ordem: 0,
  ativo: true,
};

const emptyPacoteForm: PacoteForm = {
  nome: "",
  valor: 0,
  valorOriginal: 0,
  descricao: "",
  popular: false,
  ordem: 0,
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function AdminConsultasPacotesPage() {
  const [activeTab, setActiveTab] = useState<"consultas" | "pacotes">("consultas");

  // Consultas state
  const [consultas, setConsultas] = useState<ConsultaType[]>([]);
  const [consultaForm, setConsultaForm] = useState<ConsultaForm>(emptyConsultaForm);
  const [editingConsultaId, setEditingConsultaId] = useState<string | null>(null);
  const [showConsultaForm, setShowConsultaForm] = useState(false);
  const [newBeneficio, setNewBeneficio] = useState("");
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [savingConsulta, setSavingConsulta] = useState(false);

  // Pacotes state
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [pacoteForm, setPacoteForm] = useState<PacoteForm>(emptyPacoteForm);
  const [editingPacoteId, setEditingPacoteId] = useState<string | null>(null);
  const [showPacoteForm, setShowPacoteForm] = useState(false);
  const [loadingPacotes, setLoadingPacotes] = useState(false);
  const [savingPacote, setSavingPacote] = useState(false);

  // ── Fetch Data ─────────────────────────────────────────────────────────────

  const fetchConsultas = useCallback(async () => {
    setLoadingConsultas(true);
    try {
      const res = await fetch("/api/admin/consultas-types");
      if (res.ok) {
        const data = await res.json();
        setConsultas(data);
      }
    } catch (err) {
      console.error("Erro ao carregar consultas:", err);
    } finally {
      setLoadingConsultas(false);
    }
  }, []);

  const fetchPacotes = useCallback(async () => {
    setLoadingPacotes(true);
    try {
      const res = await fetch("/api/admin/pacotes");
      if (res.ok) {
        const data = await res.json();
        setPacotes(data);
      }
    } catch (err) {
      console.error("Erro ao carregar pacotes:", err);
    } finally {
      setLoadingPacotes(false);
    }
  }, []);

  useEffect(() => {
    fetchConsultas();
    fetchPacotes();
  }, [fetchConsultas, fetchPacotes]);

  // ── Consulta CRUD ──────────────────────────────────────────────────────────

  const handleSaveConsulta = async () => {
    setSavingConsulta(true);
    try {
      if (editingConsultaId) {
        const res = await fetch("/api/admin/consultas-types", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingConsultaId, ...consultaForm }),
        });
        if (res.ok) {
          await fetchConsultas();
          resetConsultaForm();
        }
      } else {
        const res = await fetch("/api/admin/consultas-types", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(consultaForm),
        });
        if (res.ok) {
          await fetchConsultas();
          resetConsultaForm();
        }
      }
    } catch (err) {
      console.error("Erro ao salvar consulta:", err);
    } finally {
      setSavingConsulta(false);
    }
  };

  const handleDeleteConsulta = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta consulta?")) return;
    try {
      const res = await fetch("/api/admin/consultas-types", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchConsultas();
      }
    } catch (err) {
      console.error("Erro ao excluir consulta:", err);
    }
  };

  const handleEditConsulta = (consulta: ConsultaType) => {
    setEditingConsultaId(consulta.id);
    setConsultaForm({
      nome: consulta.nome,
      preco: consulta.preco,
      precoOriginal: consulta.precoOriginal ?? 0,
      descricao: consulta.descricao,
      beneficios: consulta.beneficios ?? [],
      popular: consulta.popular,
      ordem: consulta.ordem,
      ativo: consulta.ativo,
    });
    setShowConsultaForm(true);
  };

  const resetConsultaForm = () => {
    setConsultaForm(emptyConsultaForm);
    setEditingConsultaId(null);
    setShowConsultaForm(false);
    setNewBeneficio("");
  };

  const addBeneficio = () => {
    if (newBeneficio.trim()) {
      setConsultaForm((prev) => ({
        ...prev,
        beneficios: [...prev.beneficios, newBeneficio.trim()],
      }));
      setNewBeneficio("");
    }
  };

  const removeBeneficio = (index: number) => {
    setConsultaForm((prev) => ({
      ...prev,
      beneficios: prev.beneficios.filter((_, i) => i !== index),
    }));
  };

  // ── Pacote CRUD ────────────────────────────────────────────────────────────

  const handleSavePacote = async () => {
    setSavingPacote(true);
    try {
      if (editingPacoteId) {
        const res = await fetch("/api/admin/pacotes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPacoteId, ...pacoteForm }),
        });
        if (res.ok) {
          await fetchPacotes();
          resetPacoteForm();
        }
      } else {
        const res = await fetch("/api/admin/pacotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pacoteForm),
        });
        if (res.ok) {
          await fetchPacotes();
          resetPacoteForm();
        }
      }
    } catch (err) {
      console.error("Erro ao salvar pacote:", err);
    } finally {
      setSavingPacote(false);
    }
  };

  const handleDeletePacote = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este pacote?")) return;
    try {
      const res = await fetch("/api/admin/pacotes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchPacotes();
      }
    } catch (err) {
      console.error("Erro ao excluir pacote:", err);
    }
  };

  const handleEditPacote = (pacote: Pacote) => {
    setEditingPacoteId(pacote.id);
    setPacoteForm({
      nome: pacote.nome,
      valor: pacote.valor,
      valorOriginal: pacote.valorOriginal ?? 0,
      descricao: pacote.descricao,
      popular: pacote.popular,
      ordem: pacote.ordem,
    });
    setShowPacoteForm(true);
  };

  const resetPacoteForm = () => {
    setPacoteForm(emptyPacoteForm);
    setEditingPacoteId(null);
    setShowPacoteForm(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const tabs = [
    { id: "consultas" as const, label: "Consultas", icon: Search },
    { id: "pacotes" as const, label: "Pacotes", icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Consultas & Pacotes</h1>
        <p className="text-sm text-[#64748B]">
          Gerencie os tipos de consultas e pacotes disponíveis na plataforma
        </p>
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

      {/* ══════════════════════════════════════════════════════════════════════
          CONSULTAS TAB
         ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "consultas" && (
        <div className="space-y-4">
          {/* Action bar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#64748B]">
              {consultas.length} consulta{consultas.length !== 1 ? "s" : ""} cadastrada
              {consultas.length !== 1 ? "s" : ""}
            </p>
            {!showConsultaForm && (
              <Button
                onClick={() => {
                  resetConsultaForm();
                  setShowConsultaForm(true);
                }}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Consulta
              </Button>
            )}
          </div>

          {/* Consulta Form */}
          {showConsultaForm && (
            <Card className="border-0 shadow-sm bg-[#FFF5F3]">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-[#FF4D30]" />
                  {editingConsultaId ? "Editar Consulta" : "Nova Consulta"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Nome
                    </label>
                    <Input
                      placeholder="Ex: Consulta Completa"
                      value={consultaForm.nome}
                      onChange={(e) =>
                        setConsultaForm((prev) => ({ ...prev, nome: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Ordem
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={consultaForm.ordem}
                      onChange={(e) =>
                        setConsultaForm((prev) => ({
                          ...prev,
                          ordem: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Preço (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={consultaForm.preco || ""}
                      onChange={(e) =>
                        setConsultaForm((prev) => ({
                          ...prev,
                          preco: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Preço Original (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={consultaForm.precoOriginal || ""}
                      onChange={(e) =>
                        setConsultaForm((prev) => ({
                          ...prev,
                          precoOriginal: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Exibido como valor riscado (opcional)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                    Descrição
                  </label>
                  <Input
                    placeholder="Breve descrição da consulta"
                    value={consultaForm.descricao}
                    onChange={(e) =>
                      setConsultaForm((prev) => ({ ...prev, descricao: e.target.value }))
                    }
                  />
                </div>

                {/* Benefícios */}
                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                    Benefícios
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Adicionar benefício..."
                      value={newBeneficio}
                      onChange={(e) => setNewBeneficio(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addBeneficio();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addBeneficio}
                      variant="outline"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {consultaForm.beneficios.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {consultaForm.beneficios.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-md bg-white px-3 py-1.5 text-sm border border-gray-100"
                        >
                          <span className="text-[#475569]">{b}</span>
                          <button
                            onClick={() => removeBeneficio(i)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-[#0F172A] cursor-pointer">
                    <Checkbox
                      checked={consultaForm.popular}
                      onCheckedChange={(checked) =>
                        setConsultaForm((prev) => ({
                          ...prev,
                          popular: checked === true,
                        }))
                      }
                    />
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#0F172A] cursor-pointer">
                    <Checkbox
                      checked={consultaForm.ativo}
                      onCheckedChange={(checked) =>
                        setConsultaForm((prev) => ({
                          ...prev,
                          ativo: checked === true,
                        }))
                      }
                    />
                    Ativo
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    onClick={handleSaveConsulta}
                    disabled={!consultaForm.nome || !consultaForm.preco || savingConsulta}
                    className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
                  >
                    {savingConsulta ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {editingConsultaId ? "Atualizar" : "Salvar"}
                  </Button>
                  <Button variant="outline" onClick={resetConsultaForm}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Consultas List */}
          {loadingConsultas ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#FF4D30]" />
            </div>
          ) : consultas.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-10 w-10 text-[#94A3B8] mb-3" />
                <p className="text-sm font-medium text-[#475569]">
                  Nenhuma consulta cadastrada
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Clique em &quot;Nova Consulta&quot; para adicionar
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {consultas
                .sort((a, b) => a.ordem - b.ordem)
                .map((consulta) => (
                  <Card
                    key={consulta.id}
                    className={`border-0 shadow-sm transition-all hover:shadow-md ${
                      !consulta.ativo ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="hidden sm:flex items-center text-[#94A3B8]">
                        <GripVertical className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-[#0F172A]">
                            {consulta.nome}
                          </h3>
                          {consulta.popular && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              Popular
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              consulta.ativo
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}
                          >
                            {consulta.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 truncate">
                          {consulta.descricao}
                        </p>
                        {consulta.beneficios && consulta.beneficios.length > 0 && (
                          <p className="text-xs text-[#94A3B8] mt-1">
                            {consulta.beneficios.length} benefício
                            {consulta.beneficios.length !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-baseline gap-1.5">
                          {consulta.precoOriginal && consulta.precoOriginal > 0 && (
                            <span className="text-xs text-[#94A3B8] line-through">
                              R$ {consulta.precoOriginal.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-[#FF4D30]">
                            R$ {consulta.preco.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs text-[#94A3B8]">
                          Ordem: {consulta.ordem}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditConsulta(consulta)}
                          className="h-8 w-8 p-0 text-[#64748B] hover:text-[#FF4D30]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteConsulta(consulta.id)}
                          className="h-8 w-8 p-0 text-[#64748B] hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          PACOTES TAB
         ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "pacotes" && (
        <div className="space-y-4">
          {/* Action bar */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#64748B]">
              {pacotes.length} pacote{pacotes.length !== 1 ? "s" : ""} cadastrado
              {pacotes.length !== 1 ? "s" : ""}
            </p>
            {!showPacoteForm && (
              <Button
                onClick={() => {
                  resetPacoteForm();
                  setShowPacoteForm(true);
                }}
                className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Novo Pacote
              </Button>
            )}
          </div>

          {/* Pacote Form */}
          {showPacoteForm && (
            <Card className="border-0 shadow-sm bg-[#FFF5F3]">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#FF4D30]" />
                  {editingPacoteId ? "Editar Pacote" : "Novo Pacote"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Nome
                    </label>
                    <Input
                      placeholder="Ex: Pacote Premium"
                      value={pacoteForm.nome}
                      onChange={(e) =>
                        setPacoteForm((prev) => ({ ...prev, nome: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Ordem
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={pacoteForm.ordem}
                      onChange={(e) =>
                        setPacoteForm((prev) => ({
                          ...prev,
                          ordem: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Valor (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={pacoteForm.valor || ""}
                      onChange={(e) =>
                        setPacoteForm((prev) => ({
                          ...prev,
                          valor: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                      Valor Original (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={pacoteForm.valorOriginal || ""}
                      onChange={(e) =>
                        setPacoteForm((prev) => ({
                          ...prev,
                          valorOriginal: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Exibido como valor riscado (opcional)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                    Descrição
                  </label>
                  <Input
                    placeholder="Breve descrição do pacote"
                    value={pacoteForm.descricao}
                    onChange={(e) =>
                      setPacoteForm((prev) => ({ ...prev, descricao: e.target.value }))
                    }
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-[#0F172A] cursor-pointer">
                    <Checkbox
                      checked={pacoteForm.popular}
                      onCheckedChange={(checked) =>
                        setPacoteForm((prev) => ({
                          ...prev,
                          popular: checked === true,
                        }))
                      }
                    />
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    Popular
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    onClick={handleSavePacote}
                    disabled={!pacoteForm.nome || !pacoteForm.valor || savingPacote}
                    className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
                  >
                    {savingPacote ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {editingPacoteId ? "Atualizar" : "Salvar"}
                  </Button>
                  <Button variant="outline" onClick={resetPacoteForm}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pacotes List */}
          {loadingPacotes ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#FF4D30]" />
            </div>
          ) : pacotes.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="h-10 w-10 text-[#94A3B8] mb-3" />
                <p className="text-sm font-medium text-[#475569]">
                  Nenhum pacote cadastrado
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Clique em &quot;Novo Pacote&quot; para adicionar
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {pacotes
                .sort((a, b) => a.ordem - b.ordem)
                .map((pacote) => (
                  <Card
                    key={pacote.id}
                    className="border-0 shadow-sm transition-all hover:shadow-md"
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="hidden sm:flex items-center text-[#94A3B8]">
                        <GripVertical className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-[#0F172A]">
                            {pacote.nome}
                          </h3>
                          {pacote.popular && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 truncate">
                          {pacote.descricao}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-baseline gap-1.5">
                          {pacote.valorOriginal && pacote.valorOriginal > 0 && (
                            <span className="text-xs text-[#94A3B8] line-through">
                              R$ {pacote.valorOriginal.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-[#FF4D30]">
                            R$ {pacote.valor.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs text-[#94A3B8]">
                          Ordem: {pacote.ordem}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPacote(pacote)}
                          className="h-8 w-8 p-0 text-[#64748B] hover:text-[#FF4D30]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePacote(pacote.id)}
                          className="h-8 w-8 p-0 text-[#64748B] hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
