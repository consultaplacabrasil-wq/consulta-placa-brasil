"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const ESTADOS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const FORMAS_PAGAMENTO = [
  { value: "a_vista", label: "À vista" },
  { value: "financiado", label: "Financiado" },
  { value: "parcelado", label: "Parcelado" },
];

function formatarValorExtenso(valor: string): string {
  return valor ? `R$ ${valor}` : "R$ ___";
}

export default function GeradorContrato() {
  const [vendedor, setVendedor] = useState({
    nome: "", cpf: "", endereco: "", cidade: "", estado: "", telefone: "",
  });
  const [comprador, setComprador] = useState({
    nome: "", cpf: "", endereco: "", cidade: "", estado: "", telefone: "",
  });
  const [veiculo, setVeiculo] = useState({
    marca: "", modelo: "", anoFabricacao: "", anoModelo: "", cor: "",
    placa: "", chassi: "", renavam: "",
  });
  const [venda, setVenda] = useState({
    valor: "", formaPagamento: "a_vista", dataVenda: "",
  });
  const [contratoGerado, setContratoGerado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const contratoRef = useRef<HTMLDivElement>(null);
  const copiadoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    };
  }, []);

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setVenda((prev) => ({ ...prev, valor: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setVenda((prev) => ({
      ...prev,
      valor: num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    }));
  }

  function formaPagamentoTexto(): string {
    const forma = FORMAS_PAGAMENTO.find((f) => f.value === venda.formaPagamento);
    return forma ? forma.label.toLowerCase() : "à vista";
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
      !!vendedor.nome && !!vendedor.cpf && !!vendedor.endereco &&
      !!vendedor.cidade && !!vendedor.estado && !!vendedor.telefone &&
      !!comprador.nome && !!comprador.cpf && !!comprador.endereco &&
      !!comprador.cidade && !!comprador.estado && !!comprador.telefone &&
      !!veiculo.marca && !!veiculo.modelo && !!veiculo.anoFabricacao &&
      !!veiculo.anoModelo && !!veiculo.cor && !!veiculo.placa &&
      !!veiculo.chassi && !!veiculo.renavam &&
      !!venda.valor && !!venda.dataVenda
    );
  }

  function gerarContrato() {
    if (!camposPreenchidos()) return;
    setContratoGerado(true);
    setTimeout(() => {
      contratoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function textoContrato(): string {
    return `CONTRATO PARTICULAR DE COMPRA E VENDA DE VEÍCULO AUTOMOTOR

Pelo presente instrumento particular de compra e venda, as partes abaixo qualificadas têm entre si, justo e contratado, o seguinte:

VENDEDOR(A):
Nome: ${vendedor.nome}
CPF: ${vendedor.cpf}
Endereço: ${vendedor.endereco}
Cidade/Estado: ${vendedor.cidade}/${vendedor.estado}
Telefone: ${vendedor.telefone}

COMPRADOR(A):
Nome: ${comprador.nome}
CPF: ${comprador.cpf}
Endereço: ${comprador.endereco}
Cidade/Estado: ${comprador.cidade}/${comprador.estado}
Telefone: ${comprador.telefone}

CLÁUSULA PRIMEIRA – DO OBJETO
O(A) VENDEDOR(A) é legítimo(a) proprietário(a) do veículo abaixo descrito, livre e desembaraçado de quaisquer ônus ou gravames:
Marca: ${veiculo.marca}
Modelo: ${veiculo.modelo}
Ano de Fabricação/Modelo: ${veiculo.anoFabricacao}/${veiculo.anoModelo}
Cor: ${veiculo.cor}
Placa: ${veiculo.placa}
Chassi: ${veiculo.chassi}
RENAVAM: ${veiculo.renavam}

CLÁUSULA SEGUNDA – DO PREÇO E FORMA DE PAGAMENTO
O preço total da venda é de ${formatarValorExtenso(venda.valor)}, a ser pago pelo(a) COMPRADOR(A) ao(à) VENDEDOR(A) na forma ${formaPagamentoTexto()}, na data de ${formatarData(venda.dataVenda)}.

CLÁUSULA TERCEIRA – DA TRANSFERÊNCIA DE PROPRIEDADE
O(A) VENDEDOR(A) se compromete a entregar ao(à) COMPRADOR(A), no ato da assinatura deste contrato, o Certificado de Registro do Veículo (CRV) devidamente preenchido e assinado, com firma reconhecida em cartório, para que o(a) COMPRADOR(A) possa proceder à transferência junto ao DETRAN no prazo legal de 30 (trinta) dias.

CLÁUSULA QUARTA – DAS CONDIÇÕES DO VEÍCULO
O(A) VENDEDOR(A) declara que o veículo objeto deste contrato se encontra em perfeitas condições de uso, funcionamento e conservação, sem vícios ocultos, e que não pesa sobre o mesmo qualquer restrição judicial, administrativa ou financeira.

CLÁUSULA QUINTA – DOS DÉBITOS ANTERIORES
O(A) VENDEDOR(A) se responsabiliza por todos os débitos relativos ao veículo (IPVA, multas, licenciamento, seguro obrigatório e outros encargos) até a data da assinatura deste contrato, ou seja, ${formatarData(venda.dataVenda)}.

CLÁUSULA SEXTA – DOS DÉBITOS POSTERIORES
A partir da data de assinatura deste contrato, o(a) COMPRADOR(A) assume inteira responsabilidade por todos os débitos, multas, infrações de trânsito e demais encargos que incidam sobre o veículo.

CLÁUSULA SÉTIMA – DA TRANSFERÊNCIA DOCUMENTAL
O(A) COMPRADOR(A) se obriga a providenciar a transferência da documentação do veículo para o seu nome junto ao DETRAN competente no prazo máximo de 30 (trinta) dias, conforme exigido pelo Código de Trânsito Brasileiro.

CLÁUSULA OITAVA – DA EVICÇÃO
O(A) VENDEDOR(A) se responsabiliza pela evicção do veículo, garantindo ao(à) COMPRADOR(A) a posse mansa e pacífica do bem alienado.

CLÁUSULA NONA – DO FORO
Fica eleito o foro da comarca de ${comprador.cidade}/${comprador.estado} para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, renunciando as partes a qualquer outro, por mais privilegiado que seja.

CLÁUSULA DÉCIMA – DAS DISPOSIÇÕES GERAIS
O presente contrato é firmado em caráter irrevogável e irretratável, obrigando as partes, seus herdeiros e sucessores. As partes declaram que leram e compreenderam integralmente todas as cláusulas deste instrumento, estando de pleno acordo com seus termos.

${vendedor.cidade}/${vendedor.estado}, ${dataExtenso(venda.dataVenda)}.


_______________________________________________
${vendedor.nome}
CPF: ${vendedor.cpf}
VENDEDOR(A)


_______________________________________________
${comprador.nome}
CPF: ${comprador.cpf}
COMPRADOR(A)


TESTEMUNHAS:

1. _______________________________________________
Nome:
CPF:

2. _______________________________________________
Nome:
CPF:`;
  }

  const copiarContrato = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textoContrato());
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoContrato();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    copiadoTimerRef.current = setTimeout(() => setCopiado(false), 2500);
  }, [vendedor, comprador, veiculo, venda]);

  function imprimirContrato() {
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
          #contrato-preview,
          #contrato-preview * {
            visibility: visible;
          }
          #contrato-preview {
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
              <label htmlFor="v-nome" className={labelClass}>Nome completo</label>
              <input id="v-nome" type="text" required value={vendedor.nome}
                onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do vendedor" />
            </div>
            <div>
              <label htmlFor="v-cpf" className={labelClass}>CPF</label>
              <input id="v-cpf" type="text" inputMode="numeric" required value={vendedor.cpf}
                onChange={(e) => setVendedor({ ...vendedor, cpf: e.target.value })}
                className={inputClass} placeholder="000.000.000-00" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="v-endereco" className={labelClass}>Endereço</label>
              <input id="v-endereco" type="text" required value={vendedor.endereco}
                onChange={(e) => setVendedor({ ...vendedor, endereco: e.target.value })}
                className={inputClass} placeholder="Rua, número, bairro" />
            </div>
            <div>
              <label htmlFor="v-cidade" className={labelClass}>Cidade</label>
              <input id="v-cidade" type="text" required value={vendedor.cidade}
                onChange={(e) => setVendedor({ ...vendedor, cidade: e.target.value })}
                className={inputClass} placeholder="Cidade" />
            </div>
            <div>
              <label htmlFor="v-estado" className={labelClass}>Estado</label>
              <select id="v-estado" required value={vendedor.estado}
                onChange={(e) => setVendedor({ ...vendedor, estado: e.target.value })}
                className={inputClass}>
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="v-telefone" className={labelClass}>Telefone</label>
              <input id="v-telefone" type="tel" inputMode="tel" required value={vendedor.telefone}
                onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
                className={inputClass} placeholder="(00) 00000-0000" />
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
              <label htmlFor="c-nome" className={labelClass}>Nome completo</label>
              <input id="c-nome" type="text" required value={comprador.nome}
                onChange={(e) => setComprador({ ...comprador, nome: e.target.value })}
                className={inputClass} placeholder="Nome completo do comprador" />
            </div>
            <div>
              <label htmlFor="c-cpf" className={labelClass}>CPF</label>
              <input id="c-cpf" type="text" inputMode="numeric" required value={comprador.cpf}
                onChange={(e) => setComprador({ ...comprador, cpf: e.target.value })}
                className={inputClass} placeholder="000.000.000-00" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="c-endereco" className={labelClass}>Endereço</label>
              <input id="c-endereco" type="text" required value={comprador.endereco}
                onChange={(e) => setComprador({ ...comprador, endereco: e.target.value })}
                className={inputClass} placeholder="Rua, número, bairro" />
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
              <label htmlFor="c-telefone" className={labelClass}>Telefone</label>
              <input id="c-telefone" type="tel" inputMode="tel" required value={comprador.telefone}
                onChange={(e) => setComprador({ ...comprador, telefone: e.target.value })}
                className={inputClass} placeholder="(00) 00000-0000" />
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
              <label htmlFor="ve-marca" className={labelClass}>Marca</label>
              <input id="ve-marca" type="text" required value={veiculo.marca}
                onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
                className={inputClass} placeholder="Ex.: Volkswagen" />
            </div>
            <div>
              <label htmlFor="ve-modelo" className={labelClass}>Modelo</label>
              <input id="ve-modelo" type="text" required value={veiculo.modelo}
                onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
                className={inputClass} placeholder="Ex.: Gol 1.0" />
            </div>
            <div>
              <label htmlFor="ve-ano-fab" className={labelClass}>Ano de fabricação</label>
              <input id="ve-ano-fab" type="text" inputMode="numeric" required value={veiculo.anoFabricacao}
                onChange={(e) => setVeiculo({ ...veiculo, anoFabricacao: e.target.value })}
                className={inputClass} placeholder="Ex.: 2020" />
            </div>
            <div>
              <label htmlFor="ve-ano-mod" className={labelClass}>Ano modelo</label>
              <input id="ve-ano-mod" type="text" inputMode="numeric" required value={veiculo.anoModelo}
                onChange={(e) => setVeiculo({ ...veiculo, anoModelo: e.target.value })}
                className={inputClass} placeholder="Ex.: 2021" />
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
                className={inputClass} placeholder="Número do chassi" />
            </div>
            <div>
              <label htmlFor="ve-renavam" className={labelClass}>RENAVAM</label>
              <input id="ve-renavam" type="text" inputMode="numeric" required value={veiculo.renavam}
                onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                className={inputClass} placeholder="Número do RENAVAM" />
            </div>
          </div>
        </fieldset>

        {/* Dados da Venda */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">4</span>
            Dados da Venda
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="vd-valor" className={labelClass}>Valor (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                <input id="vd-valor" type="text" inputMode="numeric" required
                  value={venda.valor} onChange={handleValorChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00" />
              </div>
            </div>
            <div>
              <label htmlFor="vd-forma" className={labelClass}>Forma de pagamento</label>
              <select id="vd-forma" required value={venda.formaPagamento}
                onChange={(e) => setVenda({ ...venda, formaPagamento: e.target.value })}
                className={inputClass}>
                {FORMAS_PAGAMENTO.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="vd-data" className={labelClass}>Data da venda</label>
              <input id="vd-data" type="date" required value={venda.dataVenda}
                onChange={(e) => setVenda({ ...venda, dataVenda: e.target.value })}
                className={inputClass} />
            </div>
          </div>
        </fieldset>

        {/* Botão gerar */}
        <button
          type="button"
          onClick={gerarContrato}
          disabled={!camposPreenchidos()}
          className="w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Gerar contrato
        </button>

        {/* Preview do contrato */}
        {contratoGerado && (
          <div className="mt-8" ref={contratoRef}>
            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={copiarContrato}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-[#FF4D30] text-[#FF4D30] font-bold hover:bg-[#FF4D30] hover:text-white transition-colors"
              >
                {copiado ? "Copiado!" : "Copiar contrato"}
              </button>
              <button
                type="button"
                onClick={imprimirContrato}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
              >
                Imprimir
              </button>
            </div>

            {/* Contrato renderizado */}
            <div
              id="contrato-preview"
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: "1.9" }}
            >
              <h2 className="text-center text-lg md:text-xl font-bold text-[#0F172A] mb-8 leading-tight">
                CONTRATO PARTICULAR DE COMPRA E VENDA<br />DE VEÍCULO AUTOMOTOR
              </h2>

              <p className="text-[#475569] mb-6 text-sm md:text-base">
                Pelo presente instrumento particular de compra e venda, as partes abaixo qualificadas
                têm entre si, justo e contratado, o seguinte:
              </p>

              {/* Vendedor */}
              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
                <p className="font-bold text-[#0F172A] mb-2 text-sm md:text-base">VENDEDOR(A):</p>
                <p className="text-[#475569] text-sm">Nome: {vendedor.nome}</p>
                <p className="text-[#475569] text-sm">CPF: {vendedor.cpf}</p>
                <p className="text-[#475569] text-sm">Endereço: {vendedor.endereco}</p>
                <p className="text-[#475569] text-sm">Cidade/Estado: {vendedor.cidade}/{vendedor.estado}</p>
                <p className="text-[#475569] text-sm">Telefone: {vendedor.telefone}</p>
              </div>

              {/* Comprador */}
              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
                <p className="font-bold text-[#0F172A] mb-2 text-sm md:text-base">COMPRADOR(A):</p>
                <p className="text-[#475569] text-sm">Nome: {comprador.nome}</p>
                <p className="text-[#475569] text-sm">CPF: {comprador.cpf}</p>
                <p className="text-[#475569] text-sm">Endereço: {comprador.endereco}</p>
                <p className="text-[#475569] text-sm">Cidade/Estado: {comprador.cidade}/{comprador.estado}</p>
                <p className="text-[#475569] text-sm">Telefone: {comprador.telefone}</p>
              </div>

              {/* Cláusulas */}
              <div className="space-y-4 text-sm md:text-base text-[#475569]">
                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA PRIMEIRA - DO OBJETO</p>
                  <p>
                    O(A) VENDEDOR(A) é legítimo(a) proprietário(a) do veículo abaixo descrito,
                    livre e desembaraçado de quaisquer ônus ou gravames:
                  </p>
                  <div className="mt-2 p-4 bg-[#F8FAFC] rounded-xl text-sm">
                    <p>Marca: {veiculo.marca} | Modelo: {veiculo.modelo}</p>
                    <p>Ano Fabricação/Modelo: {veiculo.anoFabricacao}/{veiculo.anoModelo} | Cor: {veiculo.cor}</p>
                    <p>Placa: {veiculo.placa} | Chassi: {veiculo.chassi}</p>
                    <p>RENAVAM: {veiculo.renavam}</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA SEGUNDA - DO PREÇO E FORMA DE PAGAMENTO</p>
                  <p>
                    O preço total da venda é de <strong>{formatarValorExtenso(venda.valor)}</strong>,
                    a ser pago pelo(a) COMPRADOR(A) ao(à) VENDEDOR(A) na forma{" "}
                    <strong>{formaPagamentoTexto()}</strong>, na data de{" "}
                    <strong>{formatarData(venda.dataVenda)}</strong>.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA TERCEIRA - DA TRANSFERÊNCIA DE PROPRIEDADE</p>
                  <p>
                    O(A) VENDEDOR(A) se compromete a entregar ao(à) COMPRADOR(A), no ato da assinatura
                    deste contrato, o Certificado de Registro do Veículo (CRV) devidamente preenchido
                    e assinado, com firma reconhecida em cartório, para que o(a) COMPRADOR(A) possa
                    proceder à transferência junto ao DETRAN no prazo legal de 30 (trinta) dias.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA QUARTA - DAS CONDIÇÕES DO VEÍCULO</p>
                  <p>
                    O(A) VENDEDOR(A) declara que o veículo objeto deste contrato se encontra em perfeitas
                    condições de uso, funcionamento e conservação, sem vícios ocultos, e que não pesa
                    sobre o mesmo qualquer restrição judicial, administrativa ou financeira.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA QUINTA - DOS DÉBITOS ANTERIORES</p>
                  <p>
                    O(A) VENDEDOR(A) se responsabiliza por todos os débitos relativos ao veículo (IPVA,
                    multas, licenciamento, seguro obrigatório e outros encargos) até a data da assinatura
                    deste contrato, ou seja, {formatarData(venda.dataVenda)}.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA SEXTA - DOS DÉBITOS POSTERIORES</p>
                  <p>
                    A partir da data de assinatura deste contrato, o(a) COMPRADOR(A) assume inteira
                    responsabilidade por todos os débitos, multas, infrações de trânsito e demais
                    encargos que incidam sobre o veículo.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA SÉTIMA - DA TRANSFERÊNCIA DOCUMENTAL</p>
                  <p>
                    O(A) COMPRADOR(A) se obriga a providenciar a transferência da documentação do
                    veículo para o seu nome junto ao DETRAN competente no prazo máximo de 30 (trinta)
                    dias, conforme exigido pelo Código de Trânsito Brasileiro.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA OITAVA - DA EVICÇÃO</p>
                  <p>
                    O(A) VENDEDOR(A) se responsabiliza pela evicção do veículo, garantindo ao(à)
                    COMPRADOR(A) a posse mansa e pacífica do bem alienado.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA NONA - DO FORO</p>
                  <p>
                    Fica eleito o foro da comarca de {comprador.cidade}/{comprador.estado} para
                    dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, renunciando
                    as partes a qualquer outro, por mais privilegiado que seja.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-[#0F172A]">CLÁUSULA DÉCIMA - DAS DISPOSIÇÕES GERAIS</p>
                  <p>
                    O presente contrato é firmado em caráter irrevogável e irretratável, obrigando as
                    partes, seus herdeiros e sucessores. As partes declaram que leram e compreenderam
                    integralmente todas as cláusulas deste instrumento, estando de pleno acordo com
                    seus termos.
                  </p>
                </div>
              </div>

              {/* Data e local */}
              <p className="mt-10 text-center text-[#475569] text-sm md:text-base">
                {vendedor.cidade}/{vendedor.estado}, {dataExtenso(venda.dataVenda)}.
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

                <div className="mt-10">
                  <p className="font-bold text-[#0F172A] text-sm mb-6">TESTEMUNHAS:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="border-b border-[#0F172A] w-full mb-2" />
                      <p className="text-[#64748B] text-xs">1. Nome: ___________________</p>
                      <p className="text-[#64748B] text-xs">CPF: ___________________</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-[#0F172A] w-full mb-2" />
                      <p className="text-[#64748B] text-xs">2. Nome: ___________________</p>
                      <p className="text-[#64748B] text-xs">CPF: ___________________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso legal */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Aviso:</strong> Este contrato é um modelo genérico para uso particular.
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
