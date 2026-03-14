"use client";

import { useState } from "react";

type TipoPlaca = "mercosul" | "antigo";
type CategoriaPlaca = "particular" | "comercial" | "oficial" | "moto";

const MERCOSUL_REGEX = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
const ANTIGO_REGEX = /^[A-Z]{3}[0-9]{4}$/;

function validarFormato(valor: string, tipo: TipoPlaca): boolean {
  if (tipo === "mercosul") return MERCOSUL_REGEX.test(valor);
  return ANTIGO_REGEX.test(valor);
}

function formatarPlacaAntiga(placa: string): string {
  if (placa.length <= 3) return placa;
  return placa.slice(0, 3) + "-" + placa.slice(3);
}

/* ─── Renderização visual da placa (CSS only) ─── */

function PlacaMercosul({
  placa,
  categoria,
}: {
  placa: string;
  categoria: CategoriaPlaca;
}) {
  const isMoto = categoria === "moto";
  const w = isMoto ? "w-[220px]" : "w-[320px]";
  const h = isMoto ? "h-[170px]" : "h-[110px]";
  const fontSize = isMoto ? "text-[36px]" : "text-[48px]";
  const stripeH = isMoto ? "h-[26px]" : "h-[30px]";

  return (
    <div className="flex justify-center">
      <div
        className={`relative ${w} ${h} rounded-lg border-[3px] border-[#003580] bg-white overflow-hidden shadow-lg`}
      >
        {/* Faixa azul superior */}
        <div
          className={`absolute top-0 left-0 right-0 ${stripeH} bg-[#003399] flex items-center justify-between px-3`}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            </div>
            <span className="text-white text-[10px] font-bold tracking-wider">
              BRASIL
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[3px] h-4 bg-[#009B3A] rounded-sm" />
            <div className="w-[3px] h-4 bg-[#FEDF00] rounded-sm" />
            <div className="w-[3px] h-4 bg-[#002776] rounded-sm" />
          </div>
        </div>
        {/* Caracteres */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span
            className={`text-[#003580] ${fontSize} font-bold font-mono tracking-[0.15em] leading-none`}
          >
            {placa || "ABC1D23"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PlacaAntiga({
  placa,
  categoria,
}: {
  placa: string;
  categoria: CategoriaPlaca;
}) {
  const isMoto = categoria === "moto";
  const w = isMoto ? "w-[220px]" : "w-[320px]";
  const h = isMoto ? "h-[170px]" : "h-[110px]";
  const fontSize = isMoto ? "text-[36px]" : "text-[48px]";

  let bgColor = "bg-[#444]";
  let stripeColor = "bg-[#C0392B]"; // vermelha particular
  let borderColor = "border-[#555]";

  if (categoria === "comercial") {
    bgColor = "bg-[#C0392B]";
    stripeColor = "bg-[#A93226]";
    borderColor = "border-[#A93226]";
  } else if (categoria === "oficial") {
    bgColor = "bg-[#1A3C6E]";
    stripeColor = "bg-[#15325A]";
    borderColor = "border-[#15325A]";
  }

  const placaFormatada = formatarPlacaAntiga(placa) || "ABC-1234";

  return (
    <div className="flex justify-center">
      <div
        className={`relative ${w} ${h} rounded-lg border-[3px] ${borderColor} ${bgColor} overflow-hidden shadow-lg`}
      >
        {/* Faixa superior */}
        <div
          className={`absolute top-0 left-0 right-0 h-[26px] ${stripeColor} flex items-center justify-between px-3`}
        >
          <span className="text-gray-200 text-[9px] font-bold tracking-wider">
            BRASIL
          </span>
          <svg viewBox="0 0 30 20" className="w-6 h-4">
            <rect width="30" height="20" fill="#009B3A" rx="1" />
            <polygon points="15,2 28,10 15,18 2,10" fill="#FEDF00" />
            <circle cx="15" cy="10" r="5" fill="#002776" />
          </svg>
        </div>
        {/* Caracteres */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span
            className={`text-white ${fontSize} font-bold font-mono tracking-[0.15em] leading-none`}
          >
            {placaFormatada}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */

export default function GeradorPlaca() {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState<TipoPlaca>("mercosul");
  const [categoria, setCategoria] = useState<CategoriaPlaca>("particular");
  const [erro, setErro] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 7);
    setPlaca(valor);
    setErro("");
  }

  function handleTipoChange(novoTipo: TipoPlaca) {
    setTipo(novoTipo);
    setErro("");
  }

  const placaExibida = placa || (tipo === "mercosul" ? "ABC1D23" : "ABC1234");
  const isValida = placa.length === 7 && validarFormato(placa, tipo);
  const mostrarErro =
    placa.length === 7 && !validarFormato(placa, tipo);

  const formatoEsperado =
    tipo === "mercosul"
      ? "ABC1D23 (3 letras, 1 número, 1 letra, 2 números)"
      : "ABC1234 (3 letras, 4 números)";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
      {/* Tipo de placa */}
      <div>
        <label className="block text-sm font-semibold text-[#0F172A] mb-3">
          Tipo de Placa
        </label>
        <div className="flex gap-4">
          {[
            { value: "mercosul" as TipoPlaca, label: "Mercosul" },
            { value: "antigo" as TipoPlaca, label: "Padrão Antigo" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                tipo === opt.value
                  ? "border-[#FF4D30] bg-[#FF4D30]/5 text-[#FF4D30] font-semibold"
                  : "border-gray-200 text-[#475569] hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="tipo-placa"
                value={opt.value}
                checked={tipo === opt.value}
                onChange={() => handleTipoChange(opt.value)}
                className="accent-[#FF4D30]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-semibold text-[#0F172A] mb-3">
          Categoria do Veículo
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "particular" as CategoriaPlaca, label: "Particular" },
            { value: "comercial" as CategoriaPlaca, label: "Comercial" },
            { value: "oficial" as CategoriaPlaca, label: "Oficial" },
            { value: "moto" as CategoriaPlaca, label: "Motocicleta" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                categoria === opt.value
                  ? "border-[#FF4D30] bg-[#FF4D30]/5 text-[#FF4D30] font-semibold"
                  : "border-gray-200 text-[#475569] hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="categoria-placa"
                value={opt.value}
                checked={categoria === opt.value}
                onChange={() => setCategoria(opt.value)}
                className="accent-[#FF4D30]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Input da placa */}
      <div>
        <label
          htmlFor="placa-gerador"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Letras e Números da Placa
        </label>
        <input
          id="placa-gerador"
          type="text"
          maxLength={7}
          placeholder={tipo === "mercosul" ? "Ex: ABC1D23" : "Ex: ABC1234"}
          value={placa}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-lg font-mono tracking-widest uppercase transition-colors"
        />
        <p className="text-xs text-[#64748B] mt-1">
          {placa.length}/7 caracteres &mdash; Formato esperado: {formatoEsperado}
        </p>
      </div>

      {/* Validação em tempo real */}
      {mostrarErro && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          Formato inválido para o padrão{" "}
          {tipo === "mercosul" ? "Mercosul" : "antigo"}. Formato esperado:{" "}
          {formatoEsperado}.
        </div>
      )}

      {isValida && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Placa válida no formato {tipo === "mercosul" ? "Mercosul" : "antigo"}.
        </div>
      )}

      {erro && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
          {erro}
        </div>
      )}

      {/* Visualização da placa */}
      <div>
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4 text-center">
          Pré-visualização da Placa
        </h3>
        {tipo === "mercosul" ? (
          <PlacaMercosul placa={placaExibida} categoria={categoria} />
        ) : (
          <PlacaAntiga placa={placaExibida} categoria={categoria} />
        )}
        <p className="text-xs text-center text-[#64748B] mt-3">
          {categoria === "moto"
            ? "Proporções reduzidas para motocicleta"
            : "Proporções baseadas na dimensão padrão 400 x 130 mm"}
        </p>
      </div>

      {/* Informações do formato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-[#64748B] mb-1">Tipo</h4>
          <p className="text-lg font-bold text-[#0F172A]">
            {tipo === "mercosul" ? "Padrão Mercosul" : "Padrão Antigo"}
          </p>
          <p className="text-xs text-[#64748B] mt-1">
            {tipo === "mercosul"
              ? "Adotado no Brasil desde setembro de 2018"
              : "Utilizado no Brasil de 1990 até 2018"}
          </p>
        </div>
        <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-[#64748B] mb-1">
            Categoria
          </h4>
          <p className="text-lg font-bold text-[#0F172A]">
            {categoria === "particular" && "Particular"}
            {categoria === "comercial" && "Comercial"}
            {categoria === "oficial" && "Oficial"}
            {categoria === "moto" && "Motocicleta"}
          </p>
          <p className="text-xs text-[#64748B] mt-1">
            {categoria === "particular" && "Uso pessoal ou familiar"}
            {categoria === "comercial" && "Táxi, aluguel ou transporte remunerado"}
            {categoria === "oficial" && "Veículo de órgão público"}
            {categoria === "moto" && "Placa com dimensões reduzidas"}
          </p>
        </div>
      </div>
    </div>
  );
}
