"use client";

import { useState } from "react";
import { Plus, Trash2, Send, CheckCircle, Lightbulb } from "lucide-react";

interface Ferramenta {
  nome: string;
  descricao: string;
}

export function SugestaoForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([
    { nome: "", descricao: "" },
  ]);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const adicionarFerramenta = () => {
    setFerramentas((prev) => [...prev, { nome: "", descricao: "" }]);
  };

  const removerFerramenta = (index: number) => {
    if (ferramentas.length <= 1) return;
    setFerramentas((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarFerramenta = (
    index: number,
    campo: keyof Ferramenta,
    valor: string
  ) => {
    setFerramentas((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [campo]: valor } : f))
    );
  };

  const enviar = async () => {
    setErro("");

    const validas = ferramentas.filter((f) => f.nome.trim().length >= 3);
    if (validas.length === 0) {
      setErro("Informe o nome de pelo menos uma ferramenta (mínimo 3 caracteres).");
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch("/api/sugestao-ferramenta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim() || null,
          email: email.trim() || null,
          ferramentas: validas,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setEnviado(true);
    } catch {
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
          Sugestão enviada com sucesso!
        </h3>
        <p className="text-[#475569] mb-6">
          Agradecemos sua contribuição. Nossa equipe vai analisar sua sugestão e,
          se possível, criar a ferramenta em breve.
        </p>
        <button
          type="button"
          onClick={() => {
            setEnviado(false);
            setNome("");
            setEmail("");
            setFerramentas([{ nome: "", descricao: "" }]);
          }}
          className="px-6 py-3 rounded-xl bg-[#FF4D30] text-white font-semibold hover:bg-[#E8432A] transition-colors"
        >
          Enviar outra sugestão
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ferramentas */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">
          Ferramentas sugeridas
        </h3>

        {ferramentas.map((ferramenta, index) => (
          <div
            key={index}
            className="bg-[#F8FAFC] rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#FF4D30]">
                Ferramenta {index + 1}
              </span>
              {ferramentas.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerFerramenta(index)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Remover ferramenta"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                  Nome da ferramenta *
                </label>
                <input
                  type="text"
                  value={ferramenta.nome}
                  onChange={(e) =>
                    atualizarFerramenta(index, "nome", e.target.value)
                  }
                  placeholder="Ex: Calculadora de Seguro Auto"
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                  Descrição (opcional)
                </label>
                <textarea
                  value={ferramenta.descricao}
                  onChange={(e) =>
                    atualizarFerramenta(index, "descricao", e.target.value)
                  }
                  placeholder="Descreva o que a ferramenta deveria fazer..."
                  maxLength={500}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={adicionarFerramenta}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 text-[#64748B] font-semibold hover:border-[#FF4D30] hover:text-[#FF4D30] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar outra ferramenta
        </button>
      </div>

      {/* Dados pessoais (opcionais) */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-[#0F172A]">
          Seus dados <span className="text-sm font-normal text-[#94A3B8]">(opcional)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1">
              Seu nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como você se chama?"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1">
              Seu e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Para avisarmos quando criar"
              maxLength={255}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-[#0F172A] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Erro */}
      {erro && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {erro}
        </div>
      )}

      {/* Enviar */}
      <button
        type="button"
        onClick={enviar}
        disabled={enviando}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {enviando ? (
          <>Enviando...</>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar sugestão
          </>
        )}
      </button>
    </div>
  );
}

export function SugestaoCTA() {
  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D30]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/20">
            <Lightbulb className="w-6 h-6 text-[#FF4D30]" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Sentiu falta de alguma ferramenta?</h3>
            <p className="text-sm text-gray-400">Ajude-nos a criar novas ferramentas</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-5 leading-relaxed">
          Sua sugestão é muito importante para nós. Indique uma ferramenta que ainda não
          temos e nossa equipe vai avaliar a criação.
        </p>
        <a
          href="/ferramentas/sugerir"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF4D30] text-white font-semibold hover:bg-[#E8432A] transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          Sugerir ferramenta
        </a>
      </div>
    </div>
  );
}
