"use client";

import { useState, useMemo } from "react";

type TipoVeiculo = "carro" | "moto" | "caminhao";

interface ItemChecklist {
  nome: string;
  checked: boolean;
}

interface GrupoIntervalo {
  intervalo: number;
  label: string;
  itens: ItemChecklist[];
}

const CHECKLISTS: Record<TipoVeiculo, { intervalo: number; label: string; itens: string[] }[]> = {
  carro: [
    {
      intervalo: 5000,
      label: "A cada 5.000 km",
      itens: [
        "Troca de óleo do motor",
        "Verificar filtro de ar",
        "Calibrar pneus",
      ],
    },
    {
      intervalo: 10000,
      label: "A cada 10.000 km",
      itens: [
        "Troca de filtro de óleo",
        "Verificar pastilhas de freio",
        "Balanceamento de rodas",
      ],
    },
    {
      intervalo: 20000,
      label: "A cada 20.000 km",
      itens: [
        "Troca de filtro de ar",
        "Verificar correia dentada",
        "Trocar fluido de freio",
      ],
    },
    {
      intervalo: 40000,
      label: "A cada 40.000 km",
      itens: [
        "Troca de velas de ignição",
        "Alinhamento e balanceamento",
        "Verificar suspensão",
      ],
    },
    {
      intervalo: 60000,
      label: "A cada 60.000 km",
      itens: [
        "Troca de correia dentada",
        "Fluido de transmissão",
        "Verificar embreagem",
      ],
    },
  ],
  moto: [
    {
      intervalo: 5000,
      label: "A cada 5.000 km",
      itens: [
        "Troca de óleo do motor",
        "Verificar e lubrificar corrente",
        "Calibrar pneus",
      ],
    },
    {
      intervalo: 10000,
      label: "A cada 10.000 km",
      itens: [
        "Troca de filtro de óleo",
        "Verificar pastilhas de freio",
        "Regular cabo de embreagem",
      ],
    },
    {
      intervalo: 20000,
      label: "A cada 20.000 km",
      itens: [
        "Troca de filtro de ar",
        "Substituir kit de relação (coroa, pinhão e corrente)",
        "Trocar fluido de freio",
      ],
    },
    {
      intervalo: 40000,
      label: "A cada 40.000 km",
      itens: [
        "Troca de vela de ignição",
        "Verificar pneus e trocar se necessário",
        "Revisar suspensão dianteira e traseira",
      ],
    },
    {
      intervalo: 60000,
      label: "A cada 60.000 km",
      itens: [
        "Trocar líquido de arrefecimento",
        "Verificar e regular válvulas",
        "Revisar sistema elétrico completo",
      ],
    },
  ],
  caminhao: [
    {
      intervalo: 5000,
      label: "A cada 5.000 km",
      itens: [
        "Troca de óleo do motor",
        "Verificar nível do líquido arrefecedor",
        "Calibrar pneus e verificar sulcos",
      ],
    },
    {
      intervalo: 10000,
      label: "A cada 10.000 km",
      itens: [
        "Troca de filtro de óleo e filtro de combustível",
        "Verificar lonas e discos de freio",
        "Lubrificar articulações e cruzetas",
      ],
    },
    {
      intervalo: 20000,
      label: "A cada 20.000 km",
      itens: [
        "Troca de filtro de ar",
        "Verificar correia do alternador",
        "Trocar fluido de freio e sangrar sistema",
      ],
    },
    {
      intervalo: 40000,
      label: "A cada 40.000 km",
      itens: [
        "Troca do filtro secador de ar",
        "Alinhamento e balanceamento de todos os eixos",
        "Verificar molas e amortecedores",
      ],
    },
    {
      intervalo: 60000,
      label: "A cada 60.000 km",
      itens: [
        "Troca de correia dentada e tensor",
        "Trocar óleo do câmbio e diferencial",
        "Verificar embreagem e disco de platô",
      ],
    },
  ],
};

function formatarKm(valor: number): string {
  return valor.toLocaleString("pt-BR");
}

export default function ChecklistManutencao() {
  const [tipoVeiculo, setTipoVeiculo] = useState<TipoVeiculo>("carro");
  const [kmAtual, setKmAtual] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const kmNumerico = useMemo(() => {
    if (!kmAtual) return 0;
    return parseInt(kmAtual.replace(/\D/g, ""), 10) || 0;
  }, [kmAtual]);

  const grupos = useMemo(() => {
    return CHECKLISTS[tipoVeiculo].map((grupo) => ({
      ...grupo,
      itens: grupo.itens.map((nome) => ({
        nome,
        checked: checkedItems[`${tipoVeiculo}-${grupo.intervalo}-${nome}`] || false,
      })),
    }));
  }, [tipoVeiculo, checkedItems]);

  function handleKmChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setKmAtual("");
      return;
    }
    const num = parseInt(raw, 10);
    setKmAtual(num.toLocaleString("pt-BR"));
  }

  function toggleItem(intervalo: number, nome: string) {
    const key = `${tipoVeiculo}-${intervalo}-${nome}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function getStatus(intervalo: number): "atrasado" | "proximo" | "em-dia" {
    if (kmNumerico <= 0) return "em-dia";
    const resto = kmNumerico % intervalo;
    const limiteProximo = intervalo * 0.8;
    if (resto >= limiteProximo || kmNumerico >= intervalo) {
      if (kmNumerico >= intervalo && resto < intervalo * 0.2) {
        return "atrasado";
      }
      if (resto >= limiteProximo) {
        return "proximo";
      }
    }
    // Check if the km is a direct multiple or has passed an interval
    if (kmNumerico >= intervalo) {
      const multiplo = Math.floor(kmNumerico / intervalo);
      const proximoIntervalo = multiplo * intervalo;
      const distancia = kmNumerico - proximoIntervalo;
      if (distancia <= intervalo * 0.1) {
        return "atrasado";
      }
      const proximoCheck = (multiplo + 1) * intervalo;
      const faltando = proximoCheck - kmNumerico;
      if (faltando <= intervalo * 0.2) {
        return "proximo";
      }
    }
    return "em-dia";
  }

  function getStatusLabel(status: "atrasado" | "proximo" | "em-dia"): string {
    switch (status) {
      case "atrasado":
        return "Manutenção necessária agora";
      case "proximo":
        return "Próximo da manutenção";
      case "em-dia":
        return "Em dia";
    }
  }

  function getStatusColors(status: "atrasado" | "proximo" | "em-dia") {
    switch (status) {
      case "atrasado":
        return {
          border: "border-red-300",
          bg: "bg-red-50",
          badge: "bg-red-100 text-red-700",
          dot: "bg-red-500",
        };
      case "proximo":
        return {
          border: "border-amber-300",
          bg: "bg-amber-50",
          badge: "bg-amber-100 text-amber-700",
          dot: "bg-amber-500",
        };
      case "em-dia":
        return {
          border: "border-green-200",
          bg: "bg-green-50",
          badge: "bg-green-100 text-green-700",
          dot: "bg-green-500",
        };
    }
  }

  function getProximaRevisao(intervalo: number): string {
    if (kmNumerico <= 0) return `${formatarKm(intervalo)} km`;
    const multiplo = Math.ceil(kmNumerico / intervalo);
    const proximo = multiplo * intervalo;
    if (proximo === kmNumerico) {
      return `Agora (${formatarKm(proximo)} km)`;
    }
    return `${formatarKm(proximo)} km (faltam ${formatarKm(proximo - kmNumerico)} km)`;
  }

  const tiposVeiculo: { value: TipoVeiculo; label: string }[] = [
    { value: "carro", label: "Carro" },
    { value: "moto", label: "Moto" },
    { value: "caminhao", label: "Caminhão" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Tipo de veículo */}
        <div>
          <label
            htmlFor="tipo-veiculo"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Tipo de veículo
          </label>
          <div className="flex gap-2">
            {tiposVeiculo.map((tipo) => (
              <button
                key={tipo.value}
                type="button"
                onClick={() => setTipoVeiculo(tipo.value)}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  tipoVeiculo === tipo.value
                    ? "bg-[#FF4D30] text-white border-[#FF4D30] shadow-sm"
                    : "bg-white text-[#0F172A] border-gray-200 hover:border-[#FF4D30]/40"
                }`}
              >
                {tipo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Km atual */}
        <div>
          <label
            htmlFor="km-atual"
            className="block text-sm font-semibold text-[#0F172A] mb-2"
          >
            Quilometragem atual
          </label>
          <div className="relative">
            <input
              id="km-atual"
              type="text"
              inputMode="numeric"
              placeholder="Ex: 35.000"
              value={kmAtual}
              onChange={handleKmChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
              km
            </span>
          </div>
        </div>
      </div>

      {/* Legenda */}
      {kmNumerico > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
          <span className="text-sm text-[#64748B] font-medium">Legenda:</span>
          <span className="flex items-center gap-1.5 text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-red-700">Manutenção necessária</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-amber-700">Próximo</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-green-700">Em dia</span>
          </span>
        </div>
      )}

      {/* Checklist por intervalos */}
      <div className="space-y-6">
        {grupos.map((grupo) => {
          const status = getStatus(grupo.intervalo);
          const colors = getStatusColors(status);
          const completedCount = grupo.itens.filter((i) => i.checked).length;

          return (
            <div
              key={grupo.intervalo}
              className={`rounded-2xl border-2 ${colors.border} overflow-hidden transition-all`}
            >
              {/* Cabeçalho do grupo */}
              <div className={`${colors.bg} px-5 py-4 flex flex-wrap items-center justify-between gap-3`}>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${colors.dot} flex-shrink-0`} />
                  <h3 className="font-bold text-[#0F172A] text-base">
                    {grupo.label}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}
                  >
                    {getStatusLabel(status)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#64748B]">
                  <span>
                    {completedCount}/{grupo.itens.length} concluídos
                  </span>
                  {kmNumerico > 0 && (
                    <span className="hidden sm:inline">
                      Próxima: {getProximaRevisao(grupo.intervalo)}
                    </span>
                  )}
                </div>
              </div>

              {/* Itens */}
              <div className="divide-y divide-gray-100">
                {grupo.itens.map((item) => (
                  <label
                    key={item.nome}
                    className="flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(grupo.intervalo, item.nome)}
                      className="w-5 h-5 rounded border-gray-300 text-[#FF4D30] focus:ring-[#FF4D30] cursor-pointer flex-shrink-0 accent-[#FF4D30]"
                    />
                    <span
                      className={`text-sm ${
                        item.checked
                          ? "line-through text-[#94A3B8]"
                          : "text-[#0F172A]"
                      } transition-colors`}
                    >
                      {item.nome}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo */}
      {kmNumerico > 0 && (
        <div className="mt-8 p-5 bg-[#0F172A] rounded-2xl text-white">
          <h3 className="font-bold text-lg mb-2">
            Resumo para {formatarKm(kmNumerico)} km
          </h3>
          <p className="text-gray-400 text-sm">
            Com base na quilometragem informada, verifique os itens destacados em{" "}
            <span className="text-red-400 font-semibold">vermelho</span> (manutenção necessária) e{" "}
            <span className="text-amber-400 font-semibold">amarelo</span> (próxima manutenção).
            Manter as revisões em dia é essencial para a segurança e durabilidade do seu{" "}
            {tipoVeiculo === "caminhao" ? "caminhão" : tipoVeiculo}.
          </p>
        </div>
      )}

      {/* Dica */}
      <div className="mt-6 p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
        <p className="text-sm text-[#64748B]">
          <strong>Dica:</strong> Os intervalos de manutenção podem variar conforme o fabricante, modelo
          e condições de uso do veículo. Consulte sempre o manual do proprietário para obter os
          intervalos exatos recomendados pelo fabricante.
        </p>
      </div>
    </div>
  );
}
