"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Car,
  CreditCard,
  FileSearch,
  Fuel,
  Gauge,
  FileText,
  AlertTriangle,
  DollarSign,
  Truck,
  Zap,
  Eye,
  BarChart3,
  Wrench,
  ArrowLeftRight,
  ClipboardCheck,
  MapPin,
  Ban,
  ScrollText,
  Search,
  Bell,
  Shield,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Calculator, Car, CreditCard, FileSearch, Fuel, Gauge, FileText,
  AlertTriangle, DollarSign, Truck, Zap, Eye, BarChart3, Wrench,
  ArrowLeftRight, ClipboardCheck, MapPin, Ban, ScrollText, Search, Bell, Shield,
};

interface Ferramenta {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

const categorias = [
  { value: "todos", label: "Todas" },
  { value: "consulta", label: "Consulta e Placas" },
  { value: "fiscal", label: "Impostos e Multas" },
  { value: "compra", label: "Compra e Venda" },
  { value: "uso", label: "Uso Diário" },
  { value: "profissional", label: "Profissional" },
  { value: "documentos", label: "Documentação" },
];

export function FerramentasGrid({ ferramentas }: { ferramentas: Ferramenta[] }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  const ferramentasFiltradas =
    categoriaAtiva === "todos"
      ? ferramentas
      : ferramentas.filter((f) => f.category === categoriaAtiva);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategoriaAtiva(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                categoriaAtiva === cat.value
                  ? "bg-[#FF4D30] text-white"
                  : "bg-white text-[#0F172A] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-70">
                ({cat.value === "todos"
                  ? ferramentas.length
                  : ferramentas.filter((f) => f.category === cat.value).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ferramentasFiltradas.map((ferramenta) => {
          const Icon = iconMap[ferramenta.iconName] || Search;
          return (
            <Link
              key={ferramenta.slug}
              href={`/ferramentas/${ferramenta.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-[#FF4D30]/20 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 mb-4 group-hover:bg-[#FF4D30]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#FF4D30]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#FF4D30] transition-colors">
                {ferramenta.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {ferramenta.description}
              </p>
            </Link>
          );
        })}
      </div>

      {ferramentasFiltradas.length === 0 && (
        <p className="text-center text-[#64748B] py-12">
          Nenhuma ferramenta encontrada nesta categoria.
        </p>
      )}
    </div>
  );
}
