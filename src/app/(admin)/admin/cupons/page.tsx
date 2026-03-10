"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Ticket,
  Plus,
  Save,
  X,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Tag,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discountPercent: number;
  active: boolean;
  usageCount: number;
  maxUsage: number | null;
  expiresAt: string | null;
  createdAt: string;
}

const emptyCoupon = {
  name: "",
  code: "",
  discountPercent: 10,
  maxUsage: "",
  expiresAt: "",
};

export default function AdminCuponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCoupon);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/coupons");
      if (!res.ok) throw new Error("Erro ao buscar cupons");
      const data = await res.json();
      setCoupons(data);
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar cupons" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  function handleNew() {
    setEditingId(null);
    setForm({ ...emptyCoupon });
    setShowForm(true);
  }

  function handleEdit(coupon: Coupon) {
    setEditingId(coupon.id);
    setForm({
      name: coupon.name,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      maxUsage: coupon.maxUsage?.toString() || "",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.slice(0, 10) : "",
    });
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyCoupon });
  }

  async function handleSave() {
    if (!form.name || !form.code || !form.discountPercent) {
      showMsg("error", "Nome, código e porcentagem são obrigatórios");
      return;
    }

    if (form.discountPercent < 1 || form.discountPercent > 100) {
      showMsg("error", "Porcentagem de desconto deve ser entre 1 e 100");
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload: Record<string, unknown> = {
        name: form.name,
        code: form.code,
        discountPercent: Number(form.discountPercent),
        maxUsage: form.maxUsage ? Number(form.maxUsage) : null,
        expiresAt: form.expiresAt || null,
      };

      if (editingId) {
        payload.id = editingId;
      }

      const res = await fetch("/api/admin/coupons", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      showMsg("success", editingId ? "Cupom atualizado com sucesso" : "Cupom criado com sucesso");
      handleCancel();
      fetchCoupons();
    } catch (err) {
      showMsg("error", err instanceof Error ? err.message : "Erro ao salvar cupom");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este cupom?")) return;

    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      showMsg("success", "Cupom excluído com sucesso");
      fetchCoupons();
    } catch {
      showMsg("error", "Erro ao excluir cupom");
    }
  }

  async function handleToggle(coupon: Coupon) {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: coupon.id, active: !coupon.active }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      fetchCoupons();
    } catch {
      showMsg("error", "Erro ao atualizar status do cupom");
    }
  }

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.active).length;
  const totalUsage = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Cupons de Desconto</h1>
          <p className="text-sm text-[#64748B]">Gerencie cupons promocionais</p>
        </div>
        <Button
          onClick={handleNew}
          className="bg-[#FF4D30] hover:bg-[#E8432A] text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Cupom
        </Button>
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{totalCoupons}</p>
              <p className="text-xs text-[#94A3B8]">Total de cupons</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{activeCoupons}</p>
              <p className="text-xs text-[#94A3B8]">Cupons ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A]">{totalUsage}</p>
              <p className="text-xs text-[#94A3B8]">Total de usos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="border-0 shadow-sm border-l-4 border-l-[#FF4D30]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Ticket className="h-5 w-5 text-[#FF4D30]" />
                {editingId ? "Editar Cupom" : "Novo Cupom"}
              </CardTitle>
              <button
                onClick={handleCancel}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Nome do Cupom
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Promoção de Lançamento"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">Código</label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="Ex: PROMO20"
                  className="uppercase"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Desconto (%)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={form.discountPercent}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, discountPercent: Number(e.target.value) }))
                  }
                  placeholder="10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Máximo de Usos
                </label>
                <Input
                  type="number"
                  min={0}
                  value={form.maxUsage}
                  onChange={(e) => setForm((f) => ({ ...f, maxUsage: e.target.value }))}
                  placeholder="Ilimitado"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] mb-1.5 block">
                  Data de Expiração
                </label>
                <Input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
                />
              </div>
            </div>
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
                {editingId ? "Atualizar" : "Criar Cupom"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF4D30]" />
        </div>
      ) : coupons.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Ticket className="h-12 w-12 text-[#94A3B8] mb-3" />
            <p className="text-[#475569] font-medium">Nenhum cupom cadastrado</p>
            <p className="text-sm text-[#94A3B8] mt-1">
              Crie cupons de desconto para seus clientes
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Lista de Cupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Nome</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Código</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Desconto</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Status</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Usos</th>
                    <th className="pb-3 text-left font-medium text-[#94A3B8]">Expira em</th>
                    <th className="pb-3 text-right font-medium text-[#94A3B8]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => {
                    const isExpired =
                      coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                    const usageFull =
                      coupon.maxUsage != null && coupon.usageCount >= coupon.maxUsage;

                    return (
                      <tr key={coupon.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3">
                          <p className="font-medium text-[#0F172A]">{coupon.name}</p>
                        </td>
                        <td className="py-3">
                          <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-[#0F172A] font-semibold">
                            {coupon.code}
                          </code>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                            {coupon.discountPercent}%
                          </span>
                        </td>
                        <td className="py-3">
                          {isExpired ? (
                            <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                              Expirado
                            </span>
                          ) : usageFull ? (
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                              Esgotado
                            </span>
                          ) : coupon.active ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                              Ativo
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                              Inativo
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-[#475569]">
                          {coupon.usageCount || 0}
                          {coupon.maxUsage != null && (
                            <span className="text-[#94A3B8]"> / {coupon.maxUsage}</span>
                          )}
                        </td>
                        <td className="py-3 text-[#475569]">
                          {coupon.expiresAt
                            ? new Date(coupon.expiresAt).toLocaleDateString("pt-BR")
                            : "Sem expiração"}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleToggle(coupon)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                              title={coupon.active ? "Desativar" : "Ativar"}
                            >
                              {coupon.active ? (
                                <ToggleRight className="h-4 w-4 text-green-600" />
                              ) : (
                                <ToggleLeft className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(coupon)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-[#475569]"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(coupon.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-500"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
