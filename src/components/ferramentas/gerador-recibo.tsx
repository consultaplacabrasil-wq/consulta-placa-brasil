"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const ESTADOS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

export default function GeradorRecibo() {
  const [vendedor, setVendedor] = useState({
    nome: "", cpf: "", cidade: "", estado: "",
  });
  const [comprador, setComprador] = useState({
    nome: "", cpf: "", cidade: "", estado: "",
  });
  const [veiculo, setVeiculo] = useState({
    marcaModelo: "", ano: "", cor: "", placa: "", valor: "", dataVenda: "",
  });
  const [reciboGerado, setReciboGerado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const reciboRef = useRef<HTMLDivElement>(null);
  const copiadoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    };
  }, []);

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setVeiculo((prev) => ({ ...prev, valor: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setVeiculo((prev) => ({
      ...prev,
      valor: num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    }));
  }

  function formatarData(data: string): string {
    if (!data) return "___/___/______";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function dataExtenso(data: string): string {
    if (!data) return "___ de __________ de ______";
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    const [ano, mes, dia] = data.split("-");
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${ano}`;
  }

  function camposPreenchidos(): boolean {
    return (
      !!vendedor.nome && !!vendedor.cpf && !!vendedor.cidade && !!vendedor.estado &&
      !!comprador.nome && !!comprador.cpf && !!comprador.cidade && !!comprador.estado &&
      !!veiculo.marcaModelo && !!veiculo.ano && !!veiculo.cor &&
      !!veiculo.placa && !!veiculo.valor && !!veiculo.dataVenda
    );
  }

  function gerarRecibo() {
    if (!camposPreenchidos()) return;
    setReciboGerado(true);
    setTimeout(() => {
      reciboRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function textoRecibo(): string {
    return `RECIBO DE COMPRA E VENDA DE VEÍCULO

Eu, ${vendedor.nome}, inscrito(a) no CPF sob o nº ${vendedor.cpf}, residente na cidade de ${vendedor.cidade}/${vendedor.estado}, declaro que recebi de ${comprador.nome}, inscrito(a) no CPF sob o nº ${comprador.cpf}, residente na cidade de ${comprador.cidade}/${comprador.estado}, a quantia de R$ ${veiculo.valor || "___"} referente à venda do veículo ${veiculo.marcaModelo}, ano ${veiculo.ano}, cor ${veiculo.cor}, placa ${veiculo.placa}.

Declaro ainda que o veículo encontra-se livre de ônus e em boas condições de uso.

Para maior clareza, firmo o presente recibo.

${vendedor.cidade}/${vendedor.estado}, ${dataExtenso(veiculo.dataVenda)}.


_______________________________________________
${vendedor.nome}
CPF: ${vendedor.cpf}
VENDEDOR(A)


_______________________________________________
${comprador.nome}
CPF: ${comprador.cpf}
COMPRADOR(A)`;
  }

  const copiarRecibo = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textoRecibo());
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoRecibo();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    copiadoTimerRef.current = setTimeout(() => setCopiado(false), 2500);
  }, [vendedor, comprador, veiculo]);

  function imprimirRecibo() {
    window.print();
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#0F172A] mb-2";

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #recibo-preview,
          #recibo-preview * {
            visibility: visible;
          }
          #recibo-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
            font-size: 14px;
            line-height: 1.8;
            color: #000 !important;
            background: #fff !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        {/* Dados do Vendedor */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">1</span>
            Dados do Vendedor
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rv-nome" className={labelClass}>Nome completo</label>
              <input id="rv-nome" type="text" required value={vendedor.nome}
                onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do vendedor" />
            </div>
            <div>
              <label htmlFor="rv-cpf" className={labelClass}>CPF</label>
              <input id="rv-cpf" type="text" inputMode="numeric" required value={vendedor.cpf}
                onChange={(e) => setVendedor({ ...vendedor, cpf: e.target.value })}
                className={inputClass} placeholder="000.000.000-00" />
            </div>
            <div>
              <label htmlFor="rv-cidade" className={labelClass}>Cidade</label>
              <input id="rv-cidade" type="text" required value={vendedor.cidade}
                onChange={(e) => setVendedor({ ...vendedor, cidade: e.target.value })}
                className={inputClass} placeholder="Cidade" />
            </div>
            <div>
              <label htmlFor="rv-estado" className={labelClass}>Estado</label>
              <select id="rv-estado" required value={vendedor.estado}
                onChange={(e) => setVendedor({ ...vendedor, estado: e.target.value })}
                className={inputClass}>
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Dados do Comprador */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">2</span>
            Dados do Comprador
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rc-nome" className={labelClass}>Nome completo</label>
              <input id="rc-nome" type="text" required value={comprador.nome}
                onChange={(e) => setComprador({ ...comprador, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do comprador" />
            </div>
            <div>
              <label htmlFor="rc-cpf" className={labelClass}>CPF</label>
              <input id="rc-cpf" type="text" inputMode="numeric" required value={comprador.cpf}
                onChange={(e) => setComprador({ ...comprador, cpf: e.target.value })}
                className={inputClass} placeholder="000.000.000-00" />
            </div>
            <div>
              <label htmlFor="rc-cidade" className={labelClass}>Cidade</label>
              <input id="rc-cidade" type="text" required value={comprador.cidade}
                onChange={(e) => setComprador({ ...comprador, cidade: e.target.value })}
                className={inputClass} placeholder="Cidade" />
            </div>
            <div>
              <label htmlFor="rc-estado" className={labelClass}>Estado</label>
              <select id="rc-estado" required value={comprador.estado}
                onChange={(e) => setComprador({ ...comprador, estado: e.target.value })}
                className={inputClass}>
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Dados do Veículo */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">3</span>
            Dados do Veículo
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rve-marca" className={labelClass}>Marca/Modelo</label>
              <input id="rve-marca" type="text" required value={veiculo.marcaModelo}
                onChange={(e) => setVeiculo({ ...veiculo, marcaModelo: e.target.value })}
                className={inputClass} placeholder="Ex.: Volkswagen Gol 1.0" />
            </div>
            <div>
              <label htmlFor="rve-ano" className={labelClass}>Ano</label>
              <input id="rve-ano" type="text" inputMode="numeric" required value={veiculo.ano}
                onChange={(e) => setVeiculo({ ...veiculo, ano: e.target.value })}
                className={inputClass} placeholder="Ex.: 2020/2021" />
            </div>
            <div>
              <label htmlFor="rve-cor" className={labelClass}>Cor</label>
              <input id="rve-cor" type="text" required value={veiculo.cor}
                onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
                className={inputClass} placeholder="Ex.: Branco" />
            </div>
            <div>
              <label htmlFor="rve-placa" className={labelClass}>Placa</label>
              <input id="rve-placa" type="text" required value={veiculo.placa}
                onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                className={inputClass} placeholder="ABC1D23" />
            </div>
            <div>
              <label htmlFor="rve-valor" className={labelClass}>Valor da venda (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                <input id="rve-valor" type="text" inputMode="numeric" required
                  value={veiculo.valor} onChange={handleValorChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00" />
              </div>
            </div>
            <div>
              <label htmlFor="rve-data" className={labelClass}>Data da venda</label>
              <input id="rve-data" type="date" required value={veiculo.dataVenda}
                onChange={(e) => setVeiculo({ ...veiculo, dataVenda: e.target.value })}
                className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Botão gerar */}
        <button
          type="button"
          onClick={gerarRecibo}
          disabled={!camposPreenchidos()}
          className="w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Gerar recibo
        </button>

        {/* Preview do recibo */}
        {reciboGerado && (
          <div className="mt-8" ref={reciboRef}>
            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={copiarRecibo}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-[#FF4D30] text-[#FF4D30] font-bold hover:bg-[#FF4D30] hover:text-white transition-colors"
              >
                {copiado ? "Copiado!" : "Copiar recibo"}
              </button>
              <button
                type="button"
                onClick={imprimirRecibo}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
              >
                Imprimir
              </button>
            </div>

            {/* Recibo renderizado */}
            <div
              id="recibo-preview"
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: "1.9" }}
            >
              <h2 className="text-center text-lg md:text-xl font-bold text-[#0F172A] mb-8 leading-tight">
                RECIBO DE COMPRA E VENDA DE VEÍCULO
              </h2>

              <p className="text-[#475569] mb-6 text-sm md:text-base text-justify">
                Eu, <strong>{vendedor.nome}</strong>, inscrito(a) no CPF sob o nº{" "}
                <strong>{vendedor.cpf}</strong>, residente na cidade de{" "}
                <strong>{vendedor.cidade}/{vendedor.estado}</strong>, declaro que recebi de{" "}
                <strong>{comprador.nome}</strong>, inscrito(a) no CPF sob o nº{" "}
                <strong>{comprador.cpf}</strong>, residente na cidade de{" "}
                <strong>{comprador.cidade}/{comprador.estado}</strong>, a quantia de{" "}
                <strong>R$ {veiculo.valor || "___"}</strong> referente à venda do veículo{" "}
                <strong>{veiculo.marcaModelo}</strong>, ano <strong>{veiculo.ano}</strong>,
                cor <strong>{veiculo.cor}</strong>, placa <strong>{veiculo.placa}</strong>.
              </p>

              <p className="text-[#475569] mb-6 text-sm md:text-base text-justify">
                Declaro ainda que o veículo encontra-se livre de ônus e em boas condições de uso.
              </p>

              <p className="text-[#475569] mb-6 text-sm md:text-base text-justify">
                Para maior clareza, firmo o presente recibo.
              </p>

              {/* Data e local */}
              <p className="mt-10 text-center text-[#475569] text-sm md:text-base">
                {vendedor.cidade}/{vendedor.estado}, {dataExtenso(veiculo.dataVenda)}.
              </p>

              {/* Assinaturas */}
              <div className="mt-12 space-y-10">
                <div className="text-center">
                  <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                  <p className="font-bold text-[#0F172A] text-sm">{vendedor.nome}</p>
                  <p className="text-[#64748B] text-xs">CPF: {vendedor.cpf}</p>
                  <p className="text-[#64748B] text-xs font-semibold">VENDEDOR(A)</p>
                </div>

                <div className="text-center">
                  <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                  <p className="font-bold text-[#0F172A] text-sm">{comprador.nome}</p>
                  <p className="text-[#64748B] text-xs">CPF: {comprador.cpf}</p>
                  <p className="text-[#64748B] text-xs font-semibold">COMPRADOR(A)</p>
                </div>
              </div>
            </div>

            {/* Aviso legal */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Aviso:</strong> Este recibo é um modelo genérico para uso particular.
                Para transações de alto valor ou situações especiais, recomenda-se a orientação
                de um advogado. O Consulta Placa Brasil não se responsabiliza pelo uso deste documento.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
