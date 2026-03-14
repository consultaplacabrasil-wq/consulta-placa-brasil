"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const JUSTIFICATIVAS = [
  { value: "", label: "Selecione o motivo" },
  { value: "dificuldade-financeira", label: "Dificuldade financeira" },
  { value: "perda-emprego", label: "Perda de emprego" },
  { value: "doenca", label: "Doença ou problema de saúde" },
  { value: "renegociacao", label: "Renegociação de condições" },
  { value: "outro", label: "Outro motivo" },
];

const JUSTIFICATIVA_TEXTO: Record<string, string> = {
  "dificuldade-financeira":
    "encontro-me em situação de dificuldade financeira, o que tem comprometido minha capacidade de manter as parcelas em dia",
  "perda-emprego":
    "em razão de perda de emprego, minha renda foi significativamente reduzida, impossibilitando a manutenção dos pagamentos nas condições originais",
  "doenca":
    "em decorrência de problemas de saúde, tive minha capacidade laborativa e financeira comprometida, tornando inviável a continuidade do pagamento nas condições pactuadas",
  "renegociacao":
    "busco a renegociação das condições contratuais com o objetivo de quitar integralmente o financiamento de forma antecipada e vantajosa para ambas as partes",
  "outro":
    "por motivos pessoais e financeiros, busco viabilizar a quitação antecipada do financiamento em condições que possibilitem o encerramento do contrato",
};

export default function PropostaQuitacao() {
  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });
  const [financiamento, setFinanciamento] = useState({
    banco: "",
    contrato: "",
    valorOriginal: "",
    parcelasTotais: "",
    parcelasPagas: "",
    parcelasAtraso: "",
    saldoDevedor: "",
  });
  const [proposta, setProposta] = useState({
    valorQuitacao: "",
    formaPagamento: "a-vista",
    justificativa: "",
  });
  const [propostaGerada, setPropostaGerada] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const propostaRef = useRef<HTMLDivElement>(null);
  const copiadoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    };
  }, []);

  function handleValorChange(
    field: "valorOriginal" | "saldoDevedor",
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setFinanciamento((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setFinanciamento((prev) => ({
      ...prev,
      [field]: num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }));
  }

  function handleValorQuitacaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setProposta((prev) => ({ ...prev, valorQuitacao: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    setProposta((prev) => ({
      ...prev,
      valorQuitacao: num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }));
  }

  function dataAtualExtenso(): string {
    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const hoje = new Date();
    return `${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;
  }

  function camposPreenchidos(): boolean {
    return (
      !!dados.nome &&
      !!dados.cpf &&
      !!dados.telefone &&
      !!dados.email &&
      !!financiamento.banco &&
      !!financiamento.contrato &&
      !!financiamento.valorOriginal &&
      !!financiamento.parcelasTotais &&
      !!financiamento.parcelasPagas &&
      !!financiamento.saldoDevedor &&
      !!proposta.valorQuitacao &&
      !!proposta.justificativa
    );
  }

  function gerarProposta() {
    if (!camposPreenchidos()) return;
    setPropostaGerada(true);
    setTimeout(() => {
      propostaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function textoJustificativa(): string {
    return (
      JUSTIFICATIVA_TEXTO[proposta.justificativa] ||
      JUSTIFICATIVA_TEXTO["outro"]
    );
  }

  function textoFormaPagamento(): string {
    return proposta.formaPagamento === "a-vista"
      ? "à vista, em parcela única"
      : "de forma parcelada, conforme condições a serem acordadas";
  }

  function textoProposta(): string {
    const atraso =
      financiamento.parcelasAtraso && parseInt(financiamento.parcelasAtraso) > 0
        ? `\nInformo que possuo ${financiamento.parcelasAtraso} parcela(s) em atraso, o que reforça a necessidade de uma solução negociada para a regularização do contrato.`
        : "";

    return `PROPOSTA DE QUITAÇÃO DE FINANCIAMENTO

À
${financiamento.banco}
Departamento de Negociação / Cobrança

De: ${dados.nome}
CPF: ${dados.cpf}
Telefone: ${dados.telefone}
E-mail: ${dados.email}

Ref.: Contrato nº ${financiamento.contrato}

Prezados Senhores,

Eu, ${dados.nome}, inscrito(a) no CPF sob o nº ${dados.cpf}, titular do contrato de financiamento nº ${financiamento.contrato}, firmado junto a ${financiamento.banco}, no valor original de R$ ${financiamento.valorOriginal}, com ${financiamento.parcelasTotais} parcelas, das quais ${financiamento.parcelasPagas} já foram devidamente quitadas, venho, por meio desta, apresentar proposta formal de quitação antecipada do saldo devedor.

Informo que o saldo devedor estimado é de R$ ${financiamento.saldoDevedor}.${atraso}

Tendo em vista que ${textoJustificativa()}, proponho a quitação total do financiamento pelo valor de R$ ${proposta.valorQuitacao}, a ser pago ${textoFormaPagamento()}.

Fundamento esta proposta nos direitos assegurados pelo Código de Defesa do Consumidor (Lei nº 8.078/1990), em especial os artigos 6º, inciso V, e 52, parágrafo 2º, que garantem ao consumidor o direito à quitação antecipada do débito, com a redução proporcional dos juros e demais acréscimos. Ressalto também o disposto na Lei nº 14.181/2021, que trata do superendividamento do consumidor e estabelece mecanismos de renegociação de dívidas.

Solicito que esta proposta seja analisada e respondida no prazo de até 10 (dez) dias úteis, conforme previsto nas normas do Banco Central do Brasil.

Coloco-me à disposição para eventuais esclarecimentos e negociações adicionais através dos contatos acima informados.

Atenciosamente,

${dataAtualExtenso()}


_______________________________________________
${dados.nome}
CPF: ${dados.cpf}`;
  }

  const copiarProposta = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textoProposta());
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoProposta();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    copiadoTimerRef.current = setTimeout(() => setCopiado(false), 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados, financiamento, proposta]);

  function imprimirProposta() {
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
          #proposta-preview,
          #proposta-preview * {
            visibility: visible;
          }
          #proposta-preview {
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
        {/* Seção 1 - Seus Dados */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">
              1
            </span>
            Seus Dados
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pq-nome" className={labelClass}>
                Nome completo
              </label>
              <input
                id="pq-nome"
                type="text"
                required
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                className={inputClass}
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label htmlFor="pq-cpf" className={labelClass}>
                CPF
              </label>
              <input
                id="pq-cpf"
                type="text"
                inputMode="numeric"
                required
                value={dados.cpf}
                onChange={(e) => setDados({ ...dados, cpf: e.target.value })}
                className={inputClass}
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <label htmlFor="pq-telefone" className={labelClass}>
                Telefone
              </label>
              <input
                id="pq-telefone"
                type="tel"
                required
                value={dados.telefone}
                onChange={(e) =>
                  setDados({ ...dados, telefone: e.target.value })
                }
                className={inputClass}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <label htmlFor="pq-email" className={labelClass}>
                E-mail
              </label>
              <input
                id="pq-email"
                type="email"
                required
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
                className={inputClass}
                placeholder="seu@email.com"
              />
            </div>
          </div>
        </fieldset>

        {/* Seção 2 - Dados do Financiamento */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">
              2
            </span>
            Dados do Financiamento
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pq-banco" className={labelClass}>
                Banco / Financeira
              </label>
              <input
                id="pq-banco"
                type="text"
                required
                value={financiamento.banco}
                onChange={(e) =>
                  setFinanciamento({
                    ...financiamento,
                    banco: e.target.value,
                  })
                }
                className={inputClass}
                placeholder="Ex.: Banco Itaú, Bradesco, BV"
              />
            </div>
            <div>
              <label htmlFor="pq-contrato" className={labelClass}>
                Número do contrato
              </label>
              <input
                id="pq-contrato"
                type="text"
                required
                value={financiamento.contrato}
                onChange={(e) =>
                  setFinanciamento({
                    ...financiamento,
                    contrato: e.target.value,
                  })
                }
                className={inputClass}
                placeholder="Número do contrato"
              />
            </div>
            <div>
              <label htmlFor="pq-valor-original" className={labelClass}>
                Valor original do financiamento (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
                  R$
                </span>
                <input
                  id="pq-valor-original"
                  type="text"
                  inputMode="numeric"
                  required
                  value={financiamento.valorOriginal}
                  onChange={(e) => handleValorChange("valorOriginal", e)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pq-parcelas-totais" className={labelClass}>
                Parcelas totais
              </label>
              <input
                id="pq-parcelas-totais"
                type="number"
                inputMode="numeric"
                min="1"
                required
                value={financiamento.parcelasTotais}
                onChange={(e) =>
                  setFinanciamento({
                    ...financiamento,
                    parcelasTotais: e.target.value,
                  })
                }
                className={inputClass}
                placeholder="Ex.: 48"
              />
            </div>
            <div>
              <label htmlFor="pq-parcelas-pagas" className={labelClass}>
                Parcelas já pagas
              </label>
              <input
                id="pq-parcelas-pagas"
                type="number"
                inputMode="numeric"
                min="0"
                required
                value={financiamento.parcelasPagas}
                onChange={(e) =>
                  setFinanciamento({
                    ...financiamento,
                    parcelasPagas: e.target.value,
                  })
                }
                className={inputClass}
                placeholder="Ex.: 20"
              />
            </div>
            <div>
              <label htmlFor="pq-parcelas-atraso" className={labelClass}>
                Parcelas em atraso (se houver)
              </label>
              <input
                id="pq-parcelas-atraso"
                type="number"
                inputMode="numeric"
                min="0"
                value={financiamento.parcelasAtraso}
                onChange={(e) =>
                  setFinanciamento({
                    ...financiamento,
                    parcelasAtraso: e.target.value,
                  })
                }
                className={inputClass}
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="pq-saldo-devedor" className={labelClass}>
                Saldo devedor estimado (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
                  R$
                </span>
                <input
                  id="pq-saldo-devedor"
                  type="text"
                  inputMode="numeric"
                  required
                  value={financiamento.saldoDevedor}
                  onChange={(e) => handleValorChange("saldoDevedor", e)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>
        </fieldset>

        {/* Seção 3 - Proposta */}
        <fieldset className="mb-8">
          <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">
              3
            </span>
            Proposta
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pq-valor-quitacao" className={labelClass}>
                Valor que deseja pagar para quitar (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">
                  R$
                </span>
                <input
                  id="pq-valor-quitacao"
                  type="text"
                  inputMode="numeric"
                  required
                  value={proposta.valorQuitacao}
                  onChange={handleValorQuitacaoChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pq-forma-pagamento" className={labelClass}>
                Forma de pagamento
              </label>
              <select
                id="pq-forma-pagamento"
                value={proposta.formaPagamento}
                onChange={(e) =>
                  setProposta({ ...proposta, formaPagamento: e.target.value })
                }
                className={inputClass}
              >
                <option value="a-vista">À vista</option>
                <option value="parcelado">Parcelado</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="pq-justificativa" className={labelClass}>
                Justificativa
              </label>
              <select
                id="pq-justificativa"
                required
                value={proposta.justificativa}
                onChange={(e) =>
                  setProposta({ ...proposta, justificativa: e.target.value })
                }
                className={inputClass}
              >
                {JUSTIFICATIVAS.map((j) => (
                  <option key={j.value} value={j.value}>
                    {j.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Botão gerar */}
        <button
          type="button"
          onClick={gerarProposta}
          disabled={!camposPreenchidos()}
          className="w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Gerar proposta
        </button>

        {/* Preview da proposta */}
        {propostaGerada && (
          <div className="mt-8" ref={propostaRef}>
            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={copiarProposta}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-[#FF4D30] text-[#FF4D30] font-bold hover:bg-[#FF4D30] hover:text-white transition-colors"
              >
                {copiado ? "Copiado!" : "Copiar proposta"}
              </button>
              <button
                type="button"
                onClick={imprimirProposta}
                className="flex-1 py-3 px-6 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
              >
                Imprimir
              </button>
            </div>

            {/* Proposta renderizada */}
            <div
              id="proposta-preview"
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: "1.9",
              }}
            >
              <h2 className="text-center text-lg md:text-xl font-bold text-[#0F172A] mb-8 leading-tight">
                PROPOSTA DE QUITAÇÃO DE FINANCIAMENTO
              </h2>

              {/* Destinatário */}
              <div className="mb-6 text-[#475569] text-sm md:text-base">
                <p>À</p>
                <p>
                  <strong>{financiamento.banco}</strong>
                </p>
                <p>Departamento de Negociação / Cobrança</p>
              </div>

              {/* Remetente */}
              <div className="mb-6 text-[#475569] text-sm md:text-base">
                <p>
                  De: <strong>{dados.nome}</strong>
                </p>
                <p>
                  CPF: <strong>{dados.cpf}</strong>
                </p>
                <p>
                  Telefone: <strong>{dados.telefone}</strong>
                </p>
                <p>
                  E-mail: <strong>{dados.email}</strong>
                </p>
              </div>

              {/* Referência */}
              <p className="mb-6 text-[#475569] text-sm md:text-base">
                <strong>
                  Ref.: Contrato nº {financiamento.contrato}
                </strong>
              </p>

              {/* Corpo */}
              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Prezados Senhores,
              </p>

              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Eu, <strong>{dados.nome}</strong>, inscrito(a) no CPF sob o nº{" "}
                <strong>{dados.cpf}</strong>, titular do contrato de
                financiamento nº <strong>{financiamento.contrato}</strong>,
                firmado junto a <strong>{financiamento.banco}</strong>, no valor
                original de <strong>R$ {financiamento.valorOriginal}</strong>,
                com <strong>{financiamento.parcelasTotais}</strong> parcelas, das
                quais <strong>{financiamento.parcelasPagas}</strong> já foram
                devidamente quitadas, venho, por meio desta, apresentar proposta
                formal de quitação antecipada do saldo devedor.
              </p>

              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Informo que o saldo devedor estimado é de{" "}
                <strong>R$ {financiamento.saldoDevedor}</strong>.
                {financiamento.parcelasAtraso &&
                  parseInt(financiamento.parcelasAtraso) > 0 && (
                    <>
                      {" "}
                      Informo que possuo{" "}
                      <strong>{financiamento.parcelasAtraso}</strong> parcela(s)
                      em atraso, o que reforça a necessidade de uma solução
                      negociada para a regularização do contrato.
                    </>
                  )}
              </p>

              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Tendo em vista que {textoJustificativa()}, proponho a quitação
                total do financiamento pelo valor de{" "}
                <strong>R$ {proposta.valorQuitacao}</strong>, a ser pago{" "}
                {textoFormaPagamento()}.
              </p>

              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Fundamento esta proposta nos direitos assegurados pelo Código de
                Defesa do Consumidor (Lei nº 8.078/1990), em especial os artigos
                6º, inciso V, e 52, parágrafo 2º, que garantem ao consumidor o
                direito à quitação antecipada do débito, com a redução
                proporcional dos juros e demais acréscimos. Ressalto também o
                disposto na Lei nº 14.181/2021, que trata do superendividamento
                do consumidor e estabelece mecanismos de renegociação de dívidas.
              </p>

              <p className="text-[#475569] mb-4 text-sm md:text-base text-justify">
                Solicito que esta proposta seja analisada e respondida no prazo
                de até 10 (dez) dias úteis, conforme previsto nas normas do
                Banco Central do Brasil.
              </p>

              <p className="text-[#475569] mb-6 text-sm md:text-base text-justify">
                Coloco-me à disposição para eventuais esclarecimentos e
                negociações adicionais através dos contatos acima informados.
              </p>

              <p className="text-[#475569] mb-2 text-sm md:text-base">
                Atenciosamente,
              </p>

              {/* Data */}
              <p className="mt-8 text-center text-[#475569] text-sm md:text-base">
                {dataAtualExtenso()}
              </p>

              {/* Assinatura */}
              <div className="mt-12 text-center">
                <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                <p className="font-bold text-[#0F172A] text-sm">{dados.nome}</p>
                <p className="text-[#64748B] text-xs">CPF: {dados.cpf}</p>
              </div>
            </div>

            {/* Aviso legal */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Aviso:</strong> Este modelo de proposta é de caráter
                informativo e genérico. Cada instituição financeira possui seus
                próprios critérios de análise e aceitação de propostas de
                quitação. Para situações que envolvam valores elevados ou
                particularidades jurídicas, recomenda-se a consulta a um
                advogado especializado. O Consulta Placa Brasil não se
                responsabiliza pelo resultado da negociação.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
