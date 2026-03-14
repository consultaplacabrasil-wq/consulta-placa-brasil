"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const ESTADOS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const COMBUSTIVEIS = [
  "Gasolina",
  "Etanol (Álcool)",
  "Flex (Gasolina/Etanol)",
  "Diesel",
  "GNV (Gás Natural)",
  "Elétrico",
  "Híbrido",
];

const MOTIVOS = [
  { value: "venda", label: "Venda" },
  { value: "doacao", label: "Doação" },
];

export default function GeradorAtpv() {
  const [proprietario, setProprietario] = useState({
    nome: "", cpfCnpj: "", endereco: "", cidade: "", estado: "", cep: "",
  });
  const [comprador, setComprador] = useState({
    nome: "", cpfCnpj: "", endereco: "", cidade: "", estado: "", cep: "",
  });
  const [veiculo, setVeiculo] = useState({
    marcaModelo: "", anoFabModelo: "", cor: "", placa: "", chassi: "",
    renavam: "", combustivel: "Flex (Gasolina/Etanol)",
  });
  const [transferencia, setTransferencia] = useState({
    valor: "", data: "", motivo: "venda",
  });
  const [documentoGerado, setDocumentoGerado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const documentoRef = useRef<HTMLDivElement>(null);
  const copiadoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    };
  }, []);

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setTransferencia((prev) => ({ ...prev, valor: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setTransferencia((prev) => ({
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

  function motivoTexto(): string {
    return transferencia.motivo === "doacao" ? "doação" : "venda";
  }

  function camposPreenchidos(): boolean {
    return (
      !!proprietario.nome && !!proprietario.cpfCnpj && !!proprietario.endereco &&
      !!proprietario.cidade && !!proprietario.estado && !!proprietario.cep &&
      !!comprador.nome && !!comprador.cpfCnpj && !!comprador.endereco &&
      !!comprador.cidade && !!comprador.estado && !!comprador.cep &&
      !!veiculo.marcaModelo && !!veiculo.anoFabModelo && !!veiculo.cor &&
      !!veiculo.placa && !!veiculo.chassi && !!veiculo.renavam &&
      !!veiculo.combustivel &&
      !!transferencia.valor && !!transferencia.data
    );
  }

  function gerarDocumento() {
    if (!camposPreenchidos()) return;
    setDocumentoGerado(true);
    setTimeout(() => {
      documentoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function textoDocumento(): string {
    return `AUTORIZAÇÃO PARA TRANSFERÊNCIA DE PROPRIEDADE DE VEÍCULO (ATPV-e)

====================================================================

DADOS DO PROPRIETÁRIO/VENDEDOR
Nome: ${proprietario.nome}
CPF/CNPJ: ${proprietario.cpfCnpj}
Endereço: ${proprietario.endereco}
Cidade: ${proprietario.cidade} - ${proprietario.estado}
CEP: ${proprietario.cep}

====================================================================

DADOS DO COMPRADOR
Nome: ${comprador.nome}
CPF/CNPJ: ${comprador.cpfCnpj}
Endereço: ${comprador.endereco}
Cidade: ${comprador.cidade} - ${comprador.estado}
CEP: ${comprador.cep}

====================================================================

DADOS DO VEÍCULO
Marca/Modelo: ${veiculo.marcaModelo}
Ano Fabricação/Modelo: ${veiculo.anoFabModelo}
Cor: ${veiculo.cor}
Placa: ${veiculo.placa}
Chassi: ${veiculo.chassi}
RENAVAM: ${veiculo.renavam}
Combustível: ${veiculo.combustivel}

====================================================================

DECLARAÇÃO DE AUTORIZAÇÃO DE TRANSFERÊNCIA

Eu, ${proprietario.nome}, portador(a) do CPF/CNPJ nº ${proprietario.cpfCnpj}, autorizo a transferência de propriedade do veículo descrito acima para ${comprador.nome}, portador(a) do CPF/CNPJ nº ${comprador.cpfCnpj}, pelo valor de R$ ${transferencia.valor || "___"}, em razão de ${motivoTexto()}.

Declaro que o veículo está livre de multas, débitos e restrições.

Local e data: ${proprietario.cidade}/${proprietario.estado}, ${dataExtenso(transferencia.data)}.


_______________________________________________
${proprietario.nome}
CPF/CNPJ: ${proprietario.cpfCnpj}
Assinatura do Proprietário/Vendedor

====================================================================

AVISO: Este documento é um modelo auxiliar. A ATPV-e oficial é emitida pelo Detran do seu estado de forma digital.`;
  }

  const copiarDocumento = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textoDocumento());
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoDocumento();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    copiadoTimerRef.current = setTimeout(() => setCopiado(false), 2500);
  }, [proprietario, comprador, veiculo, transferencia]);

  function imprimirDocumento() {
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
          #atpv-preview,
          #atpv-preview * {
            visibility: visible;
          }
          #atpv-preview {
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
        {/* Dados do Proprietário/Vendedor */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">1</span>
            Proprietário / Vendedor
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="p-nome" className={labelClass}>Nome completo</label>
              <input id="p-nome" type="text" required value={proprietario.nome}
                onChange={(e) => setProprietario({ ...proprietario, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do proprietário" />
            </div>
            <div>
              <label htmlFor="p-cpfcnpj" className={labelClass}>CPF/CNPJ</label>
              <input id="p-cpfcnpj" type="text" inputMode="numeric" required value={proprietario.cpfCnpj}
                onChange={(e) => setProprietario({ ...proprietario, cpfCnpj: e.target.value })}
                className={inputClass} placeholder="000.000.000-00 ou 00.000.000/0001-00" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="p-endereco" className={labelClass}>Endereço completo</label>
              <input id="p-endereco" type="text" required value={proprietario.endereco}
                onChange={(e) => setProprietario({ ...proprietario, endereco: e.target.value })}
                className={inputClass} placeholder="Rua, número, bairro, complemento" />
            </div>
            <div>
              <label htmlFor="p-cidade" className={labelClass}>Cidade</label>
              <input id="p-cidade" type="text" required value={proprietario.cidade}
                onChange={(e) => setProprietario({ ...proprietario, cidade: e.target.value })}
                className={inputClass} placeholder="Cidade" />
            </div>
            <div>
              <label htmlFor="p-estado" className={labelClass}>Estado</label>
              <select id="p-estado" required value={proprietario.estado}
                onChange={(e) => setProprietario({ ...proprietario, estado: e.target.value })}
                className={inputClass}>
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="p-cep" className={labelClass}>CEP</label>
              <input id="p-cep" type="text" inputMode="numeric" required value={proprietario.cep}
                onChange={(e) => setProprietario({ ...proprietario, cep: e.target.value })}
                className={inputClass} placeholder="00000-000" />
            </div>
          </div>
        </fieldset>

        {/* Dados do Comprador */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">2</span>
            Comprador
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-nome" className={labelClass}>Nome completo</label>
              <input id="c-nome" type="text" required value={comprador.nome}
                onChange={(e) => setComprador({ ...comprador, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do comprador" />
            </div>
            <div>
              <label htmlFor="c-cpfcnpj" className={labelClass}>CPF/CNPJ</label>
              <input id="c-cpfcnpj" type="text" inputMode="numeric" required value={comprador.cpfCnpj}
                onChange={(e) => setComprador({ ...comprador, cpfCnpj: e.target.value })}
                className={inputClass} placeholder="000.000.000-00 ou 00.000.000/0001-00" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="c-endereco" className={labelClass}>Endereço completo</label>
              <input id="c-endereco" type="text" required value={comprador.endereco}
                onChange={(e) => setComprador({ ...comprador, endereco: e.target.value })}
                className={inputClass} placeholder="Rua, número, bairro, complemento" />
            </div>
            <div>
              <label htmlFor="c-cidade" className={labelClass}>Cidade</label>
              <input id="c-cidade" type="text" required value={comprador.cidade}
                onChange={(e) => setComprador({ ...comprador, cidade: e.target.value })}
                className={inputClass} placeholder="Cidade" />
            </div>
            <div>
              <label htmlFor="c-estado" className={labelClass}>Estado</label>
              <select id="c-estado" required value={comprador.estado}
                onChange={(e) => setComprador({ ...comprador, estado: e.target.value })}
                className={inputClass}>
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-cep" className={labelClass}>CEP</label>
              <input id="c-cep" type="text" inputMode="numeric" required value={comprador.cep}
                onChange={(e) => setComprador({ ...comprador, cep: e.target.value })}
                className={inputClass} placeholder="00000-000" />
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
              <label htmlFor="ve-marca-modelo" className={labelClass}>Marca/Modelo</label>
              <input id="ve-marca-modelo" type="text" required value={veiculo.marcaModelo}
                onChange={(e) => setVeiculo({ ...veiculo, marcaModelo: e.target.value })}
                className={inputClass} placeholder="Ex.: Volkswagen Gol 1.0" />
            </div>
            <div>
              <label htmlFor="ve-ano" className={labelClass}>Ano Fabricação/Modelo</label>
              <input id="ve-ano" type="text" required value={veiculo.anoFabModelo}
                onChange={(e) => setVeiculo({ ...veiculo, anoFabModelo: e.target.value })}
                className={inputClass} placeholder="Ex.: 2020/2021" />
            </div>
            <div>
              <label htmlFor="ve-cor" className={labelClass}>Cor</label>
              <input id="ve-cor" type="text" required value={veiculo.cor}
                onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
                className={inputClass} placeholder="Ex.: Branco" />
            </div>
            <div>
              <label htmlFor="ve-placa" className={labelClass}>Placa</label>
              <input id="ve-placa" type="text" required value={veiculo.placa}
                onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                className={inputClass} placeholder="ABC1D23" />
            </div>
            <div>
              <label htmlFor="ve-chassi" className={labelClass}>Chassi</label>
              <input id="ve-chassi" type="text" required value={veiculo.chassi}
                onChange={(e) => setVeiculo({ ...veiculo, chassi: e.target.value.toUpperCase() })}
                className={inputClass} placeholder="Número do chassi (17 caracteres)" />
            </div>
            <div>
              <label htmlFor="ve-renavam" className={labelClass}>RENAVAM</label>
              <input id="ve-renavam" type="text" inputMode="numeric" required value={veiculo.renavam}
                onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                className={inputClass} placeholder="Número do RENAVAM" />
            </div>
            <div>
              <label htmlFor="ve-combustivel" className={labelClass}>Combustível</label>
              <select id="ve-combustivel" required value={veiculo.combustivel}
                onChange={(e) => setVeiculo({ ...veiculo, combustivel: e.target.value })}
                className={inputClass}>
                {COMBUSTIVEIS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Dados da Transferência */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">4</span>
            Dados da Transferência
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="tr-valor" className={labelClass}>Valor (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                <input id="tr-valor" type="text" inputMode="numeric" required
                  value={transferencia.valor} onChange={handleValorChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00" />
              </div>
            </div>
            <div>
              <label htmlFor="tr-data" className={labelClass}>Data da transferência</label>
              <input id="tr-data" type="date" required value={transferencia.data}
                onChange={(e) => setTransferencia({ ...transferencia, data: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label htmlFor="tr-motivo" className={labelClass}>Motivo</label>
              <select id="tr-motivo" required value={transferencia.motivo}
                onChange={(e) => setTransferencia({ ...transferencia, motivo: e.target.value })}
                className={inputClass}>
                {MOTIVOS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Botão gerar */}
        <button
          type="button"
          onClick={gerarDocumento}
          disabled={!camposPreenchidos()}
          className="w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Gerar ATPV-e
        </button>

        {/* Preview do documento */}
        {documentoGerado && (
          <div className="mt-8" ref={documentoRef}>
            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={copiarDocumento}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-[#FF4D30] text-[#FF4D30] font-bold hover:bg-[#FF4D30] hover:text-white transition-colors"
              >
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                type="button"
                onClick={imprimirDocumento}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
              >
                Imprimir
              </button>
            </div>

            {/* Documento renderizado */}
            <div
              id="atpv-preview"
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: "1.9" }}
            >
              <h2 className="text-center text-base md:text-lg font-bold text-[#0F172A] mb-8 leading-tight uppercase">
                Autorização para Transferência de Propriedade<br />de Veículo (ATPV-e)
              </h2>

              {/* Dados do Proprietário */}
              <div className="mb-6">
                <p className="font-bold text-[#0F172A] mb-3 text-sm md:text-base border-b border-gray-200 pb-2">
                  DADOS DO PROPRIETÁRIO / VENDEDOR
                </p>
                <div className="p-4 bg-[#F8FAFC] rounded-xl text-sm text-[#475569] space-y-1">
                  <p><strong>Nome:</strong> {proprietario.nome}</p>
                  <p><strong>CPF/CNPJ:</strong> {proprietario.cpfCnpj}</p>
                  <p><strong>Endereço:</strong> {proprietario.endereco}</p>
                  <p><strong>Cidade:</strong> {proprietario.cidade} - {proprietario.estado}</p>
                  <p><strong>CEP:</strong> {proprietario.cep}</p>
                </div>
              </div>

              {/* Dados do Comprador */}
              <div className="mb-6">
                <p className="font-bold text-[#0F172A] mb-3 text-sm md:text-base border-b border-gray-200 pb-2">
                  DADOS DO COMPRADOR
                </p>
                <div className="p-4 bg-[#F8FAFC] rounded-xl text-sm text-[#475569] space-y-1">
                  <p><strong>Nome:</strong> {comprador.nome}</p>
                  <p><strong>CPF/CNPJ:</strong> {comprador.cpfCnpj}</p>
                  <p><strong>Endereço:</strong> {comprador.endereco}</p>
                  <p><strong>Cidade:</strong> {comprador.cidade} - {comprador.estado}</p>
                  <p><strong>CEP:</strong> {comprador.cep}</p>
                </div>
              </div>

              {/* Dados do Veículo */}
              <div className="mb-6">
                <p className="font-bold text-[#0F172A] mb-3 text-sm md:text-base border-b border-gray-200 pb-2">
                  DADOS DO VEÍCULO
                </p>
                <div className="p-4 bg-[#F8FAFC] rounded-xl text-sm text-[#475569] space-y-1">
                  <p><strong>Marca/Modelo:</strong> {veiculo.marcaModelo}</p>
                  <p><strong>Ano Fabricação/Modelo:</strong> {veiculo.anoFabModelo}</p>
                  <p><strong>Cor:</strong> {veiculo.cor}</p>
                  <p><strong>Placa:</strong> {veiculo.placa}</p>
                  <p><strong>Chassi:</strong> {veiculo.chassi}</p>
                  <p><strong>RENAVAM:</strong> {veiculo.renavam}</p>
                  <p><strong>Combustível:</strong> {veiculo.combustivel}</p>
                </div>
              </div>

              {/* Declaração de Autorização */}
              <div className="mb-6">
                <p className="font-bold text-[#0F172A] mb-3 text-sm md:text-base border-b border-gray-200 pb-2">
                  DECLARAÇÃO DE AUTORIZAÇÃO DE TRANSFERÊNCIA
                </p>
                <div className="text-sm md:text-base text-[#475569] space-y-4">
                  <p>
                    Eu, <strong>{proprietario.nome}</strong>, portador(a) do CPF/CNPJ
                    nº <strong>{proprietario.cpfCnpj}</strong>, autorizo a transferência de
                    propriedade do veículo descrito acima para <strong>{comprador.nome}</strong>,
                    portador(a) do CPF/CNPJ nº <strong>{comprador.cpfCnpj}</strong>, pelo valor
                    de <strong>R$ {transferencia.valor || "___"}</strong>, em razão
                    de <strong>{motivoTexto()}</strong>.
                  </p>
                  <p>
                    Declaro que o veículo está livre de multas, débitos e restrições.
                  </p>
                </div>
              </div>

              {/* Local, data e assinatura */}
              <div className="mt-10">
                <p className="text-center text-[#475569] text-sm md:text-base mb-12">
                  {proprietario.cidade}/{proprietario.estado}, {dataExtenso(transferencia.data)}.
                </p>

                <div className="text-center mt-16">
                  <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                  <p className="font-bold text-[#0F172A] text-sm">{proprietario.nome}</p>
                  <p className="text-[#64748B] text-xs">CPF/CNPJ: {proprietario.cpfCnpj}</p>
                  <p className="text-[#64748B] text-xs font-semibold">Assinatura do Proprietário / Vendedor</p>
                </div>
              </div>
            </div>

            {/* Aviso legal */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Aviso:</strong> Este documento é um modelo auxiliar. A ATPV-e oficial é emitida
                pelo Detran do seu estado de forma digital. O Consulta Placa Brasil não se responsabiliza
                pelo uso deste documento.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
