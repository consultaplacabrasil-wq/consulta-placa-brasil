"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const ESTADOS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const COMBUSTIVEIS = [
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "flex", label: "Flex (Gasolina/Etanol)" },
  { value: "diesel", label: "Diesel" },
  { value: "eletrico", label: "Elétrico" },
  { value: "hibrido", label: "Híbrido" },
];

const FORMAS_PAGAMENTO = [
  { value: "a_vista", label: "À vista" },
  { value: "financiado", label: "Financiado" },
  { value: "parcelado", label: "Parcelado" },
  { value: "permuta", label: "Permuta" },
];

type CategoriaVeiculo = "automovel" | "motocicleta" | "caminhao" | "embarcacao" | "onibus" | "outros";

interface CategoriaInfo {
  id: CategoriaVeiculo;
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  tituloContrato: string;
}

const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "automovel",
    nome: "Automóvel",
    descricao: "Carro de passeio, SUV, utilitário",
    cor: "#3B82F6",
    icone: "🚗",
    tituloContrato: "VEÍCULO AUTOMOTOR",
  },
  {
    id: "motocicleta",
    nome: "Motocicleta",
    descricao: "Moto, scooter, triciclo",
    cor: "#EF4444",
    icone: "🏍️",
    tituloContrato: "MOTOCICLETA",
  },
  {
    id: "caminhao",
    nome: "Caminhão/Carreta",
    descricao: "Caminhão, carreta, reboque",
    cor: "#F59E0B",
    icone: "🚚",
    tituloContrato: "CAMINHÃO/CARRETA",
  },
  {
    id: "embarcacao",
    nome: "Embarcação",
    descricao: "Lancha, barco, jet ski",
    cor: "#06B6D4",
    icone: "🚤",
    tituloContrato: "EMBARCAÇÃO",
  },
  {
    id: "onibus",
    nome: "Ônibus/Micro-ônibus",
    descricao: "Ônibus, micro-ônibus",
    cor: "#8B5CF6",
    icone: "🚌",
    tituloContrato: "ÔNIBUS",
  },
  {
    id: "outros",
    nome: "Outros",
    descricao: "Trailer, máquina agrícola, etc.",
    cor: "#64748B",
    icone: "🔧",
    tituloContrato: "VEÍCULO/EQUIPAMENTO",
  },
];

// ============== PDF Styles ==============

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 55,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.6,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  preambulo: {
    textAlign: "justify",
    marginBottom: 14,
  },
  sectionLabel: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    marginBottom: 4,
    marginTop: 8,
  },
  dadosPessoa: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  dadoLinha: {
    fontSize: 10,
    marginBottom: 2,
  },
  clausulaTitulo: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    marginTop: 12,
    marginBottom: 4,
  },
  clausulaTexto: {
    textAlign: "justify",
    marginBottom: 6,
  },
  veiculoBox: {
    marginTop: 4,
    marginBottom: 8,
    paddingLeft: 10,
  },
  veiculoLinha: {
    fontSize: 10,
    marginBottom: 2,
  },
  dataLocal: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  assinaturaContainer: {
    marginTop: 10,
  },
  assinaturaBloco: {
    textAlign: "center",
    marginBottom: 30,
  },
  assinaturaLinha: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    width: 280,
    marginBottom: 4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  assinaturaNome: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textAlign: "center",
  },
  assinaturaDetalhe: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
  },
  testemunhasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  testemunhaBloco: {
    width: "45%",
    textAlign: "center",
  },
  testemunhaLinha: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    width: "100%",
    marginBottom: 4,
  },
  testemunhaTexto: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
  },
});

// ============== Helpers ==============

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

function valorExtenso(valor: string): string {
  return valor ? `R$ ${valor}` : "R$ ___";
}

function combustivelLabel(value: string): string {
  return COMBUSTIVEIS.find((c) => c.value === value)?.label || value;
}

function formaPagamentoLabel(value: string): string {
  return FORMAS_PAGAMENTO.find((f) => f.value === value)?.label || value;
}

// ============== PDF Component ==============

interface ContratoData {
  categoria: CategoriaVeiculo;
  vendedor: typeof initialVendedor;
  comprador: typeof initialComprador;
  veiculo: Record<string, string>;
  venda: typeof initialVenda;
}

function descricaoVeiculoPDF(categoria: CategoriaVeiculo, v: Record<string, string>): React.ReactElement[] {
  const linhas: { label: string; value: string }[] = [
    { label: "Marca", value: v.marca },
    { label: "Modelo", value: v.modelo },
    { label: "Cor", value: v.cor },
    { label: "Ano Fabricação/Modelo", value: `${v.anoFabricacao}/${v.anoModelo}` },
  ];

  if (categoria === "automovel" || categoria === "onibus") {
    linhas.push(
      { label: "Placa", value: v.placa },
      { label: "Chassi", value: v.chassi },
      { label: "RENAVAM", value: v.renavam },
      { label: "Combustível", value: combustivelLabel(v.combustivel) },
      { label: "Quilometragem", value: v.km ? `${v.km} km` : "Não informada" },
    );
    if (categoria === "onibus") {
      linhas.push({ label: "Número de passageiros", value: v.passageiros });
    }
  } else if (categoria === "motocicleta") {
    linhas.push(
      { label: "Placa", value: v.placa },
      { label: "Chassi", value: v.chassi },
      { label: "RENAVAM", value: v.renavam },
      { label: "Cilindrada", value: v.cilindrada ? `${v.cilindrada} cc` : "" },
      { label: "Combustível", value: combustivelLabel(v.combustivel) },
      { label: "Quilometragem", value: v.km ? `${v.km} km` : "Não informada" },
    );
  } else if (categoria === "caminhao") {
    linhas.push(
      { label: "Placa", value: v.placa },
      { label: "Chassi", value: v.chassi },
      { label: "RENAVAM", value: v.renavam },
      { label: "Número de eixos", value: v.eixos },
      { label: "PBT (kg)", value: v.pbt },
      { label: "Combustível", value: combustivelLabel(v.combustivel) },
      { label: "Quilometragem", value: v.km ? `${v.km} km` : "Não informada" },
    );
    if (v.rntrc) linhas.push({ label: "RNTRC", value: v.rntrc });
  } else if (categoria === "embarcacao") {
    linhas.push(
      { label: "Registro na Capitania", value: v.registroCapitania },
      { label: "TIEM", value: v.tiem },
      { label: "Número do motor", value: v.numeroMotor },
      { label: "Potência", value: v.potencia ? `${v.potencia} HP` : "" },
      { label: "Comprimento", value: v.comprimento ? `${v.comprimento} pés` : "" },
      { label: "Material do casco", value: v.materialCasco },
      { label: "Porto de registro", value: v.portoRegistro },
    );
  } else if (categoria === "outros") {
    linhas.push(
      { label: "Número de série", value: v.numeroSerie },
    );
    if (v.registro) linhas.push({ label: "Registro", value: v.registro });
    if (v.descricaoDetalhada) linhas.push({ label: "Descrição detalhada", value: v.descricaoDetalhada });
  }

  linhas.push({ label: "Valor", value: valorExtenso(v.valor || "") });

  return linhas
    .filter((l) => l.value)
    .map((l, i) => (
      <Text key={i} style={pdfStyles.veiculoLinha}>
        {l.label}: {l.value}
      </Text>
    ));
}

function getClausulaTransferencia(categoria: CategoriaVeiculo): string {
  if (categoria === "embarcacao") {
    return "O(A) VENDEDOR(A) se compromete a entregar ao(à) COMPRADOR(A), no ato da assinatura deste contrato, toda a documentação necessária para a transferência de propriedade da embarcação junto à Capitania dos Portos e demais órgãos competentes, no prazo legal de 30 (trinta) dias.";
  }
  return "O(A) VENDEDOR(A) se compromete a entregar ao(à) COMPRADOR(A), no ato da assinatura deste contrato, o Certificado de Registro do Veículo (CRV) devidamente preenchido e assinado, com firma reconhecida em cartório, para que o(a) COMPRADOR(A) possa proceder à transferência junto ao DETRAN no prazo legal de 30 (trinta) dias.";
}

function getClausulaCondicoes(categoria: CategoriaVeiculo): string {
  const bemDesc = categoria === "embarcacao" ? "embarcação" : "veículo";
  return `O(A) VENDEDOR(A) declara que o(a) ${bemDesc} objeto deste contrato se encontra em bom estado de conservação e funcionamento, sem vícios ocultos que possam comprometer o uso normal, e que não pesa sobre o(a) mesmo(a) qualquer restrição judicial, administrativa ou financeira.`;
}

function getClausulaDebitos(categoria: CategoriaVeiculo, dataFormatada: string): string {
  if (categoria === "embarcacao") {
    return `O(A) VENDEDOR(A) se responsabiliza por todos os débitos relativos à embarcação (taxas portuárias, seguros, tributos e outros encargos) até a data da assinatura deste contrato, ou seja, ${dataFormatada}.`;
  }
  return `O(A) VENDEDOR(A) se responsabiliza por todos os débitos relativos ao veículo (IPVA, multas, licenciamento, seguro obrigatório e outros encargos) até a data da assinatura deste contrato, ou seja, ${dataFormatada}.`;
}

function getClausulaDocumentacao(categoria: CategoriaVeiculo): string {
  if (categoria === "embarcacao") {
    return "O(A) VENDEDOR(A) se obriga a fornecer todos os documentos necessários para a transferência de propriedade da embarcação junto à Capitania dos Portos, incluindo o Título de Inscrição (TIEM), certificado de segurança e demais documentos exigidos pela autoridade marítima.";
  }
  return "O(A) VENDEDOR(A) se obriga a fornecer todos os documentos necessários para a transferência de propriedade do veículo junto ao DETRAN, incluindo o CRV devidamente preenchido e assinado, com firma reconhecida, além de comprovante de quitação de débitos e demais documentos exigidos.";
}

function getClausulaMultas(categoria: CategoriaVeiculo, dataFormatada: string): string {
  if (categoria === "embarcacao") {
    return `Todas as infrações, autuações e penalidades registradas em relação à embarcação anteriores à data de ${dataFormatada} são de inteira responsabilidade do(a) VENDEDOR(A), que se compromete a quitar eventuais pendências.`;
  }
  return `Todas as multas e infrações de trânsito registradas em relação ao veículo anteriores à data de ${dataFormatada} são de inteira responsabilidade do(a) VENDEDOR(A), que se compromete a quitar eventuais pendências.`;
}

function textoFormaPagamento(venda: typeof initialVenda): string {
  const forma = formaPagamentoLabel(venda.formaPagamento).toLowerCase();
  let texto = `O preço total ajustado para a presente compra e venda é de ${valorExtenso(venda.valor)}, a ser pago pelo(a) COMPRADOR(A) ao(à) VENDEDOR(A) na forma ${forma}`;

  if (venda.formaPagamento === "parcelado") {
    texto += `, em ${venda.parcelas || "___"} parcelas`;
    if (venda.entrada) {
      texto += `, com entrada de R$ ${venda.entrada}`;
    }
  }

  if (venda.formaPagamento === "permuta") {
    texto += `. O bem dado em permuta pelo(a) COMPRADOR(A) é: ${venda.descricaoPermuta || "(não informado)"}`;
  }

  texto += `.`;
  return texto;
}

function ContratoPDF({ data }: { data: ContratoData }) {
  const cat = CATEGORIAS.find((c) => c.id === data.categoria)!;
  const dataFormatada = formatarData(data.venda.dataVenda);

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>
          CONTRATO PARTICULAR DE COMPRA E VENDA{"\n"}DE {cat.tituloContrato}
        </Text>

        <Text style={pdfStyles.preambulo}>
          Pelo presente instrumento particular de compra e venda, as partes abaixo qualificadas têm entre si, justo e contratado, o seguinte:
        </Text>

        <Text style={pdfStyles.sectionLabel}>VENDEDOR(A):</Text>
        <View style={pdfStyles.dadosPessoa}>
          <Text style={pdfStyles.dadoLinha}>Nome: {data.vendedor.nome}</Text>
          <Text style={pdfStyles.dadoLinha}>CPF/CNPJ: {data.vendedor.cpfCnpj}</Text>
          {data.vendedor.rg ? <Text style={pdfStyles.dadoLinha}>RG: {data.vendedor.rg}</Text> : null}
          <Text style={pdfStyles.dadoLinha}>Endereço: {data.vendedor.endereco}</Text>
          <Text style={pdfStyles.dadoLinha}>Cidade/Estado: {data.vendedor.cidade}/{data.vendedor.estado} - CEP: {data.vendedor.cep}</Text>
          <Text style={pdfStyles.dadoLinha}>Telefone: {data.vendedor.telefone}</Text>
          {data.vendedor.email ? <Text style={pdfStyles.dadoLinha}>E-mail: {data.vendedor.email}</Text> : null}
        </View>

        <Text style={pdfStyles.sectionLabel}>COMPRADOR(A):</Text>
        <View style={pdfStyles.dadosPessoa}>
          <Text style={pdfStyles.dadoLinha}>Nome: {data.comprador.nome}</Text>
          <Text style={pdfStyles.dadoLinha}>CPF/CNPJ: {data.comprador.cpfCnpj}</Text>
          {data.comprador.rg ? <Text style={pdfStyles.dadoLinha}>RG: {data.comprador.rg}</Text> : null}
          <Text style={pdfStyles.dadoLinha}>Endereço: {data.comprador.endereco}</Text>
          <Text style={pdfStyles.dadoLinha}>Cidade/Estado: {data.comprador.cidade}/{data.comprador.estado} - CEP: {data.comprador.cep}</Text>
          <Text style={pdfStyles.dadoLinha}>Telefone: {data.comprador.telefone}</Text>
          {data.comprador.email ? <Text style={pdfStyles.dadoLinha}>E-mail: {data.comprador.email}</Text> : null}
        </View>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA PRIMEIRA - DO OBJETO</Text>
        <Text style={pdfStyles.clausulaTexto}>
          O(A) VENDEDOR(A) é legítimo(a) proprietário(a) do(a) {cat.tituloContrato.toLowerCase()} abaixo descrito(a), livre e desembaraçado(a) de quaisquer ônus ou gravames:
        </Text>
        <View style={pdfStyles.veiculoBox}>
          {descricaoVeiculoPDF(data.categoria, data.veiculo)}
        </View>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA SEGUNDA - DO PREÇO E FORMA DE PAGAMENTO</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {textoFormaPagamento(data.venda)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA TERCEIRA - DA TRANSFERÊNCIA</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {getClausulaTransferencia(data.categoria)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA QUARTA - DAS CONDIÇÕES DO {data.categoria === "embarcacao" ? "BEM" : "VEÍCULO"}</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {getClausulaCondicoes(data.categoria)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA QUINTA - DOS DÉBITOS</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {getClausulaDebitos(data.categoria, dataFormatada)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA SEXTA - DA DOCUMENTAÇÃO</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {getClausulaDocumentacao(data.categoria)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA SÉTIMA - DAS MULTAS E INFRAÇÕES</Text>
        <Text style={pdfStyles.clausulaTexto}>
          {getClausulaMultas(data.categoria, dataFormatada)}
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA OITAVA - DO FORO</Text>
        <Text style={pdfStyles.clausulaTexto}>
          Fica eleito o foro da comarca de {data.venda.cidadeVenda}/{data.venda.estadoVenda} para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, renunciando as partes a qualquer outro, por mais privilegiado que seja.
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA NONA - DAS DISPOSIÇÕES GERAIS</Text>
        <Text style={pdfStyles.clausulaTexto}>
          Qualquer modificação ou aditamento ao presente contrato somente terá validade se feito por escrito e assinado por ambas as partes. O presente contrato é firmado em caráter irrevogável e irretratável, obrigando as partes, seus herdeiros e sucessores.
        </Text>

        <Text style={pdfStyles.clausulaTitulo}>CLÁUSULA DÉCIMA - DA VALIDADE</Text>
        <Text style={pdfStyles.clausulaTexto}>
          O presente contrato entra em vigor na data de sua assinatura, produzindo todos os seus efeitos legais a partir de {dataFormatada}. As partes declaram que leram e compreenderam integralmente todas as cláusulas deste instrumento, estando de pleno acordo com seus termos.
        </Text>

        <Text style={pdfStyles.dataLocal}>
          {data.venda.cidadeVenda}/{data.venda.estadoVenda}, {dataExtenso(data.venda.dataVenda)}.
        </Text>

        <View style={pdfStyles.assinaturaContainer}>
          <View style={pdfStyles.assinaturaBloco}>
            <View style={pdfStyles.assinaturaLinha} />
            <Text style={pdfStyles.assinaturaNome}>{data.vendedor.nome}</Text>
            <Text style={pdfStyles.assinaturaDetalhe}>CPF/CNPJ: {data.vendedor.cpfCnpj}</Text>
            <Text style={pdfStyles.assinaturaDetalhe}>VENDEDOR(A)</Text>
          </View>

          <View style={pdfStyles.assinaturaBloco}>
            <View style={pdfStyles.assinaturaLinha} />
            <Text style={pdfStyles.assinaturaNome}>{data.comprador.nome}</Text>
            <Text style={pdfStyles.assinaturaDetalhe}>CPF/CNPJ: {data.comprador.cpfCnpj}</Text>
            <Text style={pdfStyles.assinaturaDetalhe}>COMPRADOR(A)</Text>
          </View>
        </View>

        <Text style={{ ...pdfStyles.sectionLabel, marginTop: 10 }}>TESTEMUNHAS:</Text>
        <View style={pdfStyles.testemunhasContainer}>
          <View style={pdfStyles.testemunhaBloco}>
            <View style={pdfStyles.testemunhaLinha} />
            <Text style={pdfStyles.testemunhaTexto}>1. Nome: ___________________</Text>
            <Text style={pdfStyles.testemunhaTexto}>CPF: ___________________</Text>
          </View>
          <View style={pdfStyles.testemunhaBloco}>
            <View style={pdfStyles.testemunhaLinha} />
            <Text style={pdfStyles.testemunhaTexto}>2. Nome: ___________________</Text>
            <Text style={pdfStyles.testemunhaTexto}>CPF: ___________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ============== Initial states ==============

const initialVendedor = {
  nome: "", cpfCnpj: "", rg: "", endereco: "", cidade: "", estado: "", cep: "", telefone: "", email: "",
};

const initialComprador = {
  nome: "", cpfCnpj: "", rg: "", endereco: "", cidade: "", estado: "", cep: "", telefone: "", email: "",
};

const initialVenda = {
  valor: "",
  formaPagamento: "a_vista",
  parcelas: "",
  entrada: "",
  descricaoPermuta: "",
  dataVenda: "",
  cidadeVenda: "",
  estadoVenda: "",
};

function getInitialVeiculo(categoria: CategoriaVeiculo): Record<string, string> {
  const base = { marca: "", modelo: "", cor: "", anoFabricacao: "", anoModelo: "", valor: "" };
  switch (categoria) {
    case "automovel":
      return { ...base, placa: "", chassi: "", renavam: "", combustivel: "flex", km: "" };
    case "motocicleta":
      return { ...base, placa: "", chassi: "", renavam: "", cilindrada: "", combustivel: "flex", km: "" };
    case "caminhao":
      return { ...base, placa: "", chassi: "", renavam: "", eixos: "", pbt: "", combustivel: "diesel", km: "", rntrc: "" };
    case "embarcacao":
      return { ...base, registroCapitania: "", tiem: "", numeroMotor: "", potencia: "", comprimento: "", materialCasco: "", portoRegistro: "" };
    case "onibus":
      return { ...base, placa: "", chassi: "", renavam: "", passageiros: "", combustivel: "diesel", km: "" };
    case "outros":
      return { ...base, numeroSerie: "", registro: "", descricaoDetalhada: "" };
    default:
      return base;
  }
}

// ============== Main Component ==============

export default function ContratoVeiculo() {
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1);
  const [categoria, setCategoria] = useState<CategoriaVeiculo | null>(null);
  const [vendedor, setVendedor] = useState(initialVendedor);
  const [comprador, setComprador] = useState(initialComprador);
  const [veiculo, setVeiculo] = useState<Record<string, string>>({});
  const [venda, setVenda] = useState(initialVenda);
  const [copiado, setCopiado] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const copiadoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    };
  }, []);

  function selecionarCategoria(cat: CategoriaVeiculo) {
    setCategoria(cat);
    setVeiculo(getInitialVeiculo(cat));
    setEtapa(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>, field: "valor" | "entrada") {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      if (field === "valor") setVenda((prev) => ({ ...prev, valor: "" }));
      else setVenda((prev) => ({ ...prev, entrada: "" }));
      return;
    }
    const num = parseInt(raw, 10) / 100;
    const formatted = num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (field === "valor") setVenda((prev) => ({ ...prev, valor: formatted }));
    else setVenda((prev) => ({ ...prev, entrada: formatted }));
  }

  function handleVeiculoValorChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function camposObrigatoriosPreenchidos(): boolean {
    if (!categoria) return false;

    const vendOk = !!vendedor.nome && !!vendedor.cpfCnpj && !!vendedor.endereco && !!vendedor.cidade && !!vendedor.estado && !!vendedor.cep && !!vendedor.telefone;
    const compOk = !!comprador.nome && !!comprador.cpfCnpj && !!comprador.endereco && !!comprador.cidade && !!comprador.estado && !!comprador.cep && !!comprador.telefone;
    const veicOk = !!veiculo.marca && !!veiculo.modelo && !!veiculo.cor && !!veiculo.anoFabricacao && !!veiculo.anoModelo;
    const vendaOk = !!venda.valor && !!venda.dataVenda && !!venda.cidadeVenda && !!venda.estadoVenda;

    let categoriaCampos = true;
    if (categoria === "automovel" || categoria === "onibus") {
      categoriaCampos = !!veiculo.placa && !!veiculo.chassi && !!veiculo.renavam;
    } else if (categoria === "motocicleta") {
      categoriaCampos = !!veiculo.placa && !!veiculo.chassi && !!veiculo.renavam && !!veiculo.cilindrada;
    } else if (categoria === "caminhao") {
      categoriaCampos = !!veiculo.placa && !!veiculo.chassi && !!veiculo.renavam && !!veiculo.eixos && !!veiculo.pbt;
    } else if (categoria === "embarcacao") {
      categoriaCampos = !!veiculo.registroCapitania && !!veiculo.tiem && !!veiculo.numeroMotor;
    } else if (categoria === "outros") {
      categoriaCampos = !!veiculo.numeroSerie;
    }

    return vendOk && compOk && veicOk && vendaOk && categoriaCampos;
  }

  function gerarContrato() {
    if (!camposObrigatoriosPreenchidos()) return;
    setEtapa(3);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function voltarEtapa() {
    if (etapa === 3) setEtapa(2);
    else if (etapa === 2) setEtapa(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- Text contract ----

  function descricaoVeiculoTexto(): string {
    const linhas: string[] = [
      `Marca: ${veiculo.marca}`,
      `Modelo: ${veiculo.modelo}`,
      `Cor: ${veiculo.cor}`,
      `Ano Fabricação/Modelo: ${veiculo.anoFabricacao}/${veiculo.anoModelo}`,
    ];

    if (categoria === "automovel" || categoria === "onibus") {
      linhas.push(`Placa: ${veiculo.placa}`, `Chassi: ${veiculo.chassi}`, `RENAVAM: ${veiculo.renavam}`, `Combustível: ${combustivelLabel(veiculo.combustivel)}`, `Quilometragem: ${veiculo.km ? `${veiculo.km} km` : "Não informada"}`);
      if (categoria === "onibus") linhas.push(`Número de passageiros: ${veiculo.passageiros}`);
    } else if (categoria === "motocicleta") {
      linhas.push(`Placa: ${veiculo.placa}`, `Chassi: ${veiculo.chassi}`, `RENAVAM: ${veiculo.renavam}`, `Cilindrada: ${veiculo.cilindrada} cc`, `Combustível: ${combustivelLabel(veiculo.combustivel)}`, `Quilometragem: ${veiculo.km ? `${veiculo.km} km` : "Não informada"}`);
    } else if (categoria === "caminhao") {
      linhas.push(`Placa: ${veiculo.placa}`, `Chassi: ${veiculo.chassi}`, `RENAVAM: ${veiculo.renavam}`, `Número de eixos: ${veiculo.eixos}`, `PBT: ${veiculo.pbt} kg`, `Combustível: ${combustivelLabel(veiculo.combustivel)}`, `Quilometragem: ${veiculo.km ? `${veiculo.km} km` : "Não informada"}`);
      if (veiculo.rntrc) linhas.push(`RNTRC: ${veiculo.rntrc}`);
    } else if (categoria === "embarcacao") {
      linhas.push(`Registro na Capitania: ${veiculo.registroCapitania}`, `TIEM: ${veiculo.tiem}`, `Número do motor: ${veiculo.numeroMotor}`, `Potência: ${veiculo.potencia} HP`, `Comprimento: ${veiculo.comprimento} pés`, `Material do casco: ${veiculo.materialCasco}`, `Porto de registro: ${veiculo.portoRegistro}`);
    } else if (categoria === "outros") {
      linhas.push(`Número de série: ${veiculo.numeroSerie}`);
      if (veiculo.registro) linhas.push(`Registro: ${veiculo.registro}`);
      if (veiculo.descricaoDetalhada) linhas.push(`Descrição detalhada: ${veiculo.descricaoDetalhada}`);
    }

    linhas.push(`Valor: ${valorExtenso(veiculo.valor || "")}`);
    return linhas.join("\n");
  }

  function textoContratoCompleto(): string {
    const cat = CATEGORIAS.find((c) => c.id === categoria)!;
    const dataFormatada = formatarData(venda.dataVenda);

    return `CONTRATO PARTICULAR DE COMPRA E VENDA DE ${cat.tituloContrato}

Pelo presente instrumento particular de compra e venda, as partes abaixo qualificadas têm entre si, justo e contratado, o seguinte:

VENDEDOR(A):
Nome: ${vendedor.nome}
CPF/CNPJ: ${vendedor.cpfCnpj}
${vendedor.rg ? `RG: ${vendedor.rg}\n` : ""}Endereço: ${vendedor.endereco}
Cidade/Estado: ${vendedor.cidade}/${vendedor.estado} - CEP: ${vendedor.cep}
Telefone: ${vendedor.telefone}
${vendedor.email ? `E-mail: ${vendedor.email}\n` : ""}
COMPRADOR(A):
Nome: ${comprador.nome}
CPF/CNPJ: ${comprador.cpfCnpj}
${comprador.rg ? `RG: ${comprador.rg}\n` : ""}Endereço: ${comprador.endereco}
Cidade/Estado: ${comprador.cidade}/${comprador.estado} - CEP: ${comprador.cep}
Telefone: ${comprador.telefone}
${comprador.email ? `E-mail: ${comprador.email}\n` : ""}
CLÁUSULA PRIMEIRA - DO OBJETO
O(A) VENDEDOR(A) é legítimo(a) proprietário(a) do(a) ${cat.tituloContrato.toLowerCase()} abaixo descrito(a), livre e desembaraçado(a) de quaisquer ônus ou gravames:
${descricaoVeiculoTexto()}

CLÁUSULA SEGUNDA - DO PREÇO E FORMA DE PAGAMENTO
${textoFormaPagamento(venda)}

CLÁUSULA TERCEIRA - DA TRANSFERÊNCIA
${getClausulaTransferencia(categoria!)}

CLÁUSULA QUARTA - DAS CONDIÇÕES DO ${categoria === "embarcacao" ? "BEM" : "VEÍCULO"}
${getClausulaCondicoes(categoria!)}

CLÁUSULA QUINTA - DOS DÉBITOS
${getClausulaDebitos(categoria!, dataFormatada)}

CLÁUSULA SEXTA - DA DOCUMENTAÇÃO
${getClausulaDocumentacao(categoria!)}

CLÁUSULA SÉTIMA - DAS MULTAS E INFRAÇÕES
${getClausulaMultas(categoria!, dataFormatada)}

CLÁUSULA OITAVA - DO FORO
Fica eleito o foro da comarca de ${venda.cidadeVenda}/${venda.estadoVenda} para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, renunciando as partes a qualquer outro, por mais privilegiado que seja.

CLÁUSULA NONA - DAS DISPOSIÇÕES GERAIS
Qualquer modificação ou aditamento ao presente contrato somente terá validade se feito por escrito e assinado por ambas as partes. O presente contrato é firmado em caráter irrevogável e irretratável, obrigando as partes, seus herdeiros e sucessores.

CLÁUSULA DÉCIMA - DA VALIDADE
O presente contrato entra em vigor na data de sua assinatura, produzindo todos os seus efeitos legais a partir de ${dataFormatada}. As partes declaram que leram e compreenderam integralmente todas as cláusulas deste instrumento, estando de pleno acordo com seus termos.

${venda.cidadeVenda}/${venda.estadoVenda}, ${dataExtenso(venda.dataVenda)}.


_______________________________________________
${vendedor.nome}
CPF/CNPJ: ${vendedor.cpfCnpj}
VENDEDOR(A)


_______________________________________________
${comprador.nome}
CPF/CNPJ: ${comprador.cpfCnpj}
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
      await navigator.clipboard.writeText(textoContratoCompleto());
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoContratoCompleto();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    if (copiadoTimerRef.current) clearTimeout(copiadoTimerRef.current);
    copiadoTimerRef.current = setTimeout(() => setCopiado(false), 2500);
  }, [vendedor, comprador, veiculo, venda, categoria]);

  async function baixarPdf() {
    if (!categoria) return;
    setGerandoPdf(true);
    try {
      const blob = await pdf(
        <ContratoPDF
          data={{
            categoria,
            vendedor,
            comprador,
            veiculo,
            venda,
          }}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contrato-${categoria}-${vendedor.nome.split(" ")[0] || "veiculo"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
    } finally {
      setGerandoPdf(false);
    }
  }

  function imprimirContrato() {
    window.print();
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#0F172A] mb-2";

  // ============== RENDER ==============

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #contrato-veiculo-preview,
          #contrato-veiculo-preview * {
            visibility: visible;
          }
          #contrato-veiculo-preview {
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

      {/* Indicador de etapas */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                etapa >= step
                  ? "bg-[#FF4D30] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-1 rounded transition-colors ${
                  etapa > step ? "bg-[#FF4D30]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ============== ETAPA 1 - CATEGORIA ============== */}
      {etapa === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-2 text-center">
            Selecione o tipo de veículo
          </h2>
          <p className="text-[#64748B] text-center mb-8">
            Escolha a categoria para gerar um contrato personalizado com os campos adequados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selecionarCategoria(cat.id)}
                className="group p-6 rounded-2xl border-2 border-gray-100 hover:shadow-lg transition-all text-left"
                style={{
                  borderColor: categoria === cat.id ? cat.cor : undefined,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${cat.cor}15` }}
                >
                  {cat.icone}
                </div>
                <h3
                  className="font-bold text-[#0F172A] mb-1 group-hover:transition-colors"
                  style={{ color: categoria === cat.id ? cat.cor : undefined }}
                >
                  {cat.nome}
                </h3>
                <p className="text-sm text-[#64748B]">{cat.descricao}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============== ETAPA 2 - FORMULÁRIO ============== */}
      {etapa === 2 && categoria && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          {/* Botão voltar */}
          <button
            type="button"
            onClick={voltarEtapa}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#FF4D30] mb-6 text-sm font-medium transition-colors"
          >
            ← Alterar categoria
          </button>

          <div className="mb-6 p-3 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">{CATEGORIAS.find((c) => c.id === categoria)?.icone}</span>
            <div>
              <p className="font-bold text-[#0F172A] text-sm">{CATEGORIAS.find((c) => c.id === categoria)?.nome}</p>
              <p className="text-xs text-[#64748B]">{CATEGORIAS.find((c) => c.id === categoria)?.descricao}</p>
            </div>
          </div>

          {/* Seção 1 - Vendedor */}
          <fieldset className="mb-8">
            <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">1</span>
              Dados do Vendedor
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cv-v-nome" className={labelClass}>Nome completo *</label>
                <input id="cv-v-nome" type="text" required value={vendedor.nome}
                  onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
                  className={inputClass} placeholder="Nome completo do vendedor" />
              </div>
              <div>
                <label htmlFor="cv-v-cpf" className={labelClass}>CPF/CNPJ *</label>
                <input id="cv-v-cpf" type="text" inputMode="numeric" required value={vendedor.cpfCnpj}
                  onChange={(e) => setVendedor({ ...vendedor, cpfCnpj: e.target.value })}
                  className={inputClass} placeholder="000.000.000-00" />
              </div>
              <div>
                <label htmlFor="cv-v-rg" className={labelClass}>RG</label>
                <input id="cv-v-rg" type="text" value={vendedor.rg}
                  onChange={(e) => setVendedor({ ...vendedor, rg: e.target.value })}
                  className={inputClass} placeholder="Número do RG" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cv-v-endereco" className={labelClass}>Endereço completo *</label>
                <input id="cv-v-endereco" type="text" required value={vendedor.endereco}
                  onChange={(e) => setVendedor({ ...vendedor, endereco: e.target.value })}
                  className={inputClass} placeholder="Rua, número, bairro" />
              </div>
              <div>
                <label htmlFor="cv-v-cidade" className={labelClass}>Cidade *</label>
                <input id="cv-v-cidade" type="text" required value={vendedor.cidade}
                  onChange={(e) => setVendedor({ ...vendedor, cidade: e.target.value })}
                  className={inputClass} placeholder="Cidade" />
              </div>
              <div>
                <label htmlFor="cv-v-estado" className={labelClass}>Estado *</label>
                <select id="cv-v-estado" required value={vendedor.estado}
                  onChange={(e) => setVendedor({ ...vendedor, estado: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cv-v-cep" className={labelClass}>CEP *</label>
                <input id="cv-v-cep" type="text" inputMode="numeric" required value={vendedor.cep}
                  onChange={(e) => setVendedor({ ...vendedor, cep: e.target.value })}
                  className={inputClass} placeholder="00000-000" />
              </div>
              <div>
                <label htmlFor="cv-v-telefone" className={labelClass}>Telefone *</label>
                <input id="cv-v-telefone" type="tel" inputMode="tel" required value={vendedor.telefone}
                  onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
                  className={inputClass} placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label htmlFor="cv-v-email" className={labelClass}>E-mail</label>
                <input id="cv-v-email" type="email" value={vendedor.email}
                  onChange={(e) => setVendedor({ ...vendedor, email: e.target.value })}
                  className={inputClass} placeholder="vendedor@email.com" />
              </div>
            </div>
          </fieldset>

          {/* Seção 2 - Comprador */}
          <fieldset className="mb-8">
            <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">2</span>
              Dados do Comprador
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cv-c-nome" className={labelClass}>Nome completo *</label>
                <input id="cv-c-nome" type="text" required value={comprador.nome}
                  onChange={(e) => setComprador({ ...comprador, nome: e.target.value })}
                  className={inputClass} placeholder="Nome completo do comprador" />
              </div>
              <div>
                <label htmlFor="cv-c-cpf" className={labelClass}>CPF/CNPJ *</label>
                <input id="cv-c-cpf" type="text" inputMode="numeric" required value={comprador.cpfCnpj}
                  onChange={(e) => setComprador({ ...comprador, cpfCnpj: e.target.value })}
                  className={inputClass} placeholder="000.000.000-00" />
              </div>
              <div>
                <label htmlFor="cv-c-rg" className={labelClass}>RG</label>
                <input id="cv-c-rg" type="text" value={comprador.rg}
                  onChange={(e) => setComprador({ ...comprador, rg: e.target.value })}
                  className={inputClass} placeholder="Número do RG" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cv-c-endereco" className={labelClass}>Endereço completo *</label>
                <input id="cv-c-endereco" type="text" required value={comprador.endereco}
                  onChange={(e) => setComprador({ ...comprador, endereco: e.target.value })}
                  className={inputClass} placeholder="Rua, número, bairro" />
              </div>
              <div>
                <label htmlFor="cv-c-cidade" className={labelClass}>Cidade *</label>
                <input id="cv-c-cidade" type="text" required value={comprador.cidade}
                  onChange={(e) => setComprador({ ...comprador, cidade: e.target.value })}
                  className={inputClass} placeholder="Cidade" />
              </div>
              <div>
                <label htmlFor="cv-c-estado" className={labelClass}>Estado *</label>
                <select id="cv-c-estado" required value={comprador.estado}
                  onChange={(e) => setComprador({ ...comprador, estado: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cv-c-cep" className={labelClass}>CEP *</label>
                <input id="cv-c-cep" type="text" inputMode="numeric" required value={comprador.cep}
                  onChange={(e) => setComprador({ ...comprador, cep: e.target.value })}
                  className={inputClass} placeholder="00000-000" />
              </div>
              <div>
                <label htmlFor="cv-c-telefone" className={labelClass}>Telefone *</label>
                <input id="cv-c-telefone" type="tel" inputMode="tel" required value={comprador.telefone}
                  onChange={(e) => setComprador({ ...comprador, telefone: e.target.value })}
                  className={inputClass} placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label htmlFor="cv-c-email" className={labelClass}>E-mail</label>
                <input id="cv-c-email" type="email" value={comprador.email}
                  onChange={(e) => setComprador({ ...comprador, email: e.target.value })}
                  className={inputClass} placeholder="comprador@email.com" />
              </div>
            </div>
          </fieldset>

          {/* Seção 3 - Veículo */}
          <fieldset className="mb-8">
            <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">3</span>
              Dados do {categoria === "embarcacao" ? "Embarcação" : "Veículo"}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campos comuns */}
              <div>
                <label htmlFor="cv-ve-marca" className={labelClass}>Marca *</label>
                <input id="cv-ve-marca" type="text" required value={veiculo.marca}
                  onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
                  className={inputClass} placeholder="Ex.: Volkswagen" />
              </div>
              <div>
                <label htmlFor="cv-ve-modelo" className={labelClass}>Modelo *</label>
                <input id="cv-ve-modelo" type="text" required value={veiculo.modelo}
                  onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
                  className={inputClass} placeholder="Ex.: Gol 1.0" />
              </div>
              <div>
                <label htmlFor="cv-ve-cor" className={labelClass}>Cor *</label>
                <input id="cv-ve-cor" type="text" required value={veiculo.cor}
                  onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
                  className={inputClass} placeholder="Ex.: Branco" />
              </div>
              <div>
                <label htmlFor="cv-ve-anofab" className={labelClass}>Ano de fabricação *</label>
                <input id="cv-ve-anofab" type="text" inputMode="numeric" required value={veiculo.anoFabricacao}
                  onChange={(e) => setVeiculo({ ...veiculo, anoFabricacao: e.target.value })}
                  className={inputClass} placeholder="Ex.: 2020" />
              </div>
              <div>
                <label htmlFor="cv-ve-anomod" className={labelClass}>Ano modelo *</label>
                <input id="cv-ve-anomod" type="text" inputMode="numeric" required value={veiculo.anoModelo}
                  onChange={(e) => setVeiculo({ ...veiculo, anoModelo: e.target.value })}
                  className={inputClass} placeholder="Ex.: 2021" />
              </div>
              <div>
                <label htmlFor="cv-ve-valor" className={labelClass}>Valor do veículo (R$) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                  <input id="cv-ve-valor" type="text" inputMode="numeric" required
                    value={veiculo.valor} onChange={handleVeiculoValorChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                    placeholder="0,00" />
                </div>
              </div>

              {/* Campos de Automóvel */}
              {(categoria === "automovel") && (
                <>
                  <div>
                    <label htmlFor="cv-ve-placa" className={labelClass}>Placa *</label>
                    <input id="cv-ve-placa" type="text" required value={veiculo.placa}
                      onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="ABC1D23" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-chassi" className={labelClass}>Chassi *</label>
                    <input id="cv-ve-chassi" type="text" required value={veiculo.chassi}
                      onChange={(e) => setVeiculo({ ...veiculo, chassi: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="Número do chassi" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-renavam" className={labelClass}>RENAVAM *</label>
                    <input id="cv-ve-renavam" type="text" inputMode="numeric" required value={veiculo.renavam}
                      onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                      className={inputClass} placeholder="Número do RENAVAM" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-combustivel" className={labelClass}>Combustível</label>
                    <select id="cv-ve-combustivel" value={veiculo.combustivel}
                      onChange={(e) => setVeiculo({ ...veiculo, combustivel: e.target.value })}
                      className={inputClass}>
                      {COMBUSTIVEIS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cv-ve-km" className={labelClass}>Km rodados</label>
                    <input id="cv-ve-km" type="text" inputMode="numeric" value={veiculo.km}
                      onChange={(e) => setVeiculo({ ...veiculo, km: e.target.value })}
                      className={inputClass} placeholder="Ex.: 45000" />
                  </div>
                </>
              )}

              {/* Campos de Motocicleta */}
              {categoria === "motocicleta" && (
                <>
                  <div>
                    <label htmlFor="cv-ve-placa" className={labelClass}>Placa *</label>
                    <input id="cv-ve-placa" type="text" required value={veiculo.placa}
                      onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="ABC1D23" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-chassi" className={labelClass}>Chassi *</label>
                    <input id="cv-ve-chassi" type="text" required value={veiculo.chassi}
                      onChange={(e) => setVeiculo({ ...veiculo, chassi: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="Número do chassi" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-renavam" className={labelClass}>RENAVAM *</label>
                    <input id="cv-ve-renavam" type="text" inputMode="numeric" required value={veiculo.renavam}
                      onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                      className={inputClass} placeholder="Número do RENAVAM" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-cilindrada" className={labelClass}>Cilindrada (cc) *</label>
                    <input id="cv-ve-cilindrada" type="text" inputMode="numeric" required value={veiculo.cilindrada}
                      onChange={(e) => setVeiculo({ ...veiculo, cilindrada: e.target.value })}
                      className={inputClass} placeholder="Ex.: 150" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-combustivel-moto" className={labelClass}>Combustível</label>
                    <select id="cv-ve-combustivel-moto" value={veiculo.combustivel}
                      onChange={(e) => setVeiculo({ ...veiculo, combustivel: e.target.value })}
                      className={inputClass}>
                      {COMBUSTIVEIS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cv-ve-km-moto" className={labelClass}>Km rodados</label>
                    <input id="cv-ve-km-moto" type="text" inputMode="numeric" value={veiculo.km}
                      onChange={(e) => setVeiculo({ ...veiculo, km: e.target.value })}
                      className={inputClass} placeholder="Ex.: 15000" />
                  </div>
                </>
              )}

              {/* Campos de Caminhão */}
              {categoria === "caminhao" && (
                <>
                  <div>
                    <label htmlFor="cv-ve-placa-cam" className={labelClass}>Placa *</label>
                    <input id="cv-ve-placa-cam" type="text" required value={veiculo.placa}
                      onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="ABC1D23" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-chassi-cam" className={labelClass}>Chassi *</label>
                    <input id="cv-ve-chassi-cam" type="text" required value={veiculo.chassi}
                      onChange={(e) => setVeiculo({ ...veiculo, chassi: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="Número do chassi" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-renavam-cam" className={labelClass}>RENAVAM *</label>
                    <input id="cv-ve-renavam-cam" type="text" inputMode="numeric" required value={veiculo.renavam}
                      onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                      className={inputClass} placeholder="Número do RENAVAM" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-eixos" className={labelClass}>Número de eixos *</label>
                    <input id="cv-ve-eixos" type="text" inputMode="numeric" required value={veiculo.eixos}
                      onChange={(e) => setVeiculo({ ...veiculo, eixos: e.target.value })}
                      className={inputClass} placeholder="Ex.: 3" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-pbt" className={labelClass}>PBT (kg) *</label>
                    <input id="cv-ve-pbt" type="text" inputMode="numeric" required value={veiculo.pbt}
                      onChange={(e) => setVeiculo({ ...veiculo, pbt: e.target.value })}
                      className={inputClass} placeholder="Ex.: 16000" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-combustivel-cam" className={labelClass}>Combustível</label>
                    <select id="cv-ve-combustivel-cam" value={veiculo.combustivel}
                      onChange={(e) => setVeiculo({ ...veiculo, combustivel: e.target.value })}
                      className={inputClass}>
                      {COMBUSTIVEIS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cv-ve-km-cam" className={labelClass}>Km rodados</label>
                    <input id="cv-ve-km-cam" type="text" inputMode="numeric" value={veiculo.km}
                      onChange={(e) => setVeiculo({ ...veiculo, km: e.target.value })}
                      className={inputClass} placeholder="Ex.: 120000" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-rntrc" className={labelClass}>RNTRC</label>
                    <input id="cv-ve-rntrc" type="text" value={veiculo.rntrc}
                      onChange={(e) => setVeiculo({ ...veiculo, rntrc: e.target.value })}
                      className={inputClass} placeholder="Opcional" />
                  </div>
                </>
              )}

              {/* Campos de Embarcação */}
              {categoria === "embarcacao" && (
                <>
                  <div>
                    <label htmlFor="cv-ve-registro" className={labelClass}>Registro na Capitania *</label>
                    <input id="cv-ve-registro" type="text" required value={veiculo.registroCapitania}
                      onChange={(e) => setVeiculo({ ...veiculo, registroCapitania: e.target.value })}
                      className={inputClass} placeholder="Número de registro" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-tiem" className={labelClass}>TIEM *</label>
                    <input id="cv-ve-tiem" type="text" required value={veiculo.tiem}
                      onChange={(e) => setVeiculo({ ...veiculo, tiem: e.target.value })}
                      className={inputClass} placeholder="Título de Inscrição" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-nmotor" className={labelClass}>Número do motor *</label>
                    <input id="cv-ve-nmotor" type="text" required value={veiculo.numeroMotor}
                      onChange={(e) => setVeiculo({ ...veiculo, numeroMotor: e.target.value })}
                      className={inputClass} placeholder="Número do motor" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-potencia" className={labelClass}>Potência (HP)</label>
                    <input id="cv-ve-potencia" type="text" inputMode="numeric" value={veiculo.potencia}
                      onChange={(e) => setVeiculo({ ...veiculo, potencia: e.target.value })}
                      className={inputClass} placeholder="Ex.: 150" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-comprimento" className={labelClass}>Comprimento (pés)</label>
                    <input id="cv-ve-comprimento" type="text" inputMode="numeric" value={veiculo.comprimento}
                      onChange={(e) => setVeiculo({ ...veiculo, comprimento: e.target.value })}
                      className={inputClass} placeholder="Ex.: 22" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-casco" className={labelClass}>Material do casco</label>
                    <input id="cv-ve-casco" type="text" value={veiculo.materialCasco}
                      onChange={(e) => setVeiculo({ ...veiculo, materialCasco: e.target.value })}
                      className={inputClass} placeholder="Ex.: Fibra de vidro" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-porto" className={labelClass}>Porto de registro</label>
                    <input id="cv-ve-porto" type="text" value={veiculo.portoRegistro}
                      onChange={(e) => setVeiculo({ ...veiculo, portoRegistro: e.target.value })}
                      className={inputClass} placeholder="Ex.: Marina de Angra" />
                  </div>
                </>
              )}

              {/* Campos de Ônibus */}
              {categoria === "onibus" && (
                <>
                  <div>
                    <label htmlFor="cv-ve-placa-on" className={labelClass}>Placa *</label>
                    <input id="cv-ve-placa-on" type="text" required value={veiculo.placa}
                      onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="ABC1D23" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-chassi-on" className={labelClass}>Chassi *</label>
                    <input id="cv-ve-chassi-on" type="text" required value={veiculo.chassi}
                      onChange={(e) => setVeiculo({ ...veiculo, chassi: e.target.value.toUpperCase() })}
                      className={inputClass} placeholder="Número do chassi" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-renavam-on" className={labelClass}>RENAVAM *</label>
                    <input id="cv-ve-renavam-on" type="text" inputMode="numeric" required value={veiculo.renavam}
                      onChange={(e) => setVeiculo({ ...veiculo, renavam: e.target.value })}
                      className={inputClass} placeholder="Número do RENAVAM" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-passageiros" className={labelClass}>Número de passageiros</label>
                    <input id="cv-ve-passageiros" type="text" inputMode="numeric" value={veiculo.passageiros}
                      onChange={(e) => setVeiculo({ ...veiculo, passageiros: e.target.value })}
                      className={inputClass} placeholder="Ex.: 42" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-combustivel-on" className={labelClass}>Combustível</label>
                    <select id="cv-ve-combustivel-on" value={veiculo.combustivel}
                      onChange={(e) => setVeiculo({ ...veiculo, combustivel: e.target.value })}
                      className={inputClass}>
                      {COMBUSTIVEIS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cv-ve-km-on" className={labelClass}>Km rodados</label>
                    <input id="cv-ve-km-on" type="text" inputMode="numeric" value={veiculo.km}
                      onChange={(e) => setVeiculo({ ...veiculo, km: e.target.value })}
                      className={inputClass} placeholder="Ex.: 200000" />
                  </div>
                </>
              )}

              {/* Campos de Outros */}
              {categoria === "outros" && (
                <>
                  <div>
                    <label htmlFor="cv-ve-nserie" className={labelClass}>Número de série *</label>
                    <input id="cv-ve-nserie" type="text" required value={veiculo.numeroSerie}
                      onChange={(e) => setVeiculo({ ...veiculo, numeroSerie: e.target.value })}
                      className={inputClass} placeholder="Número de série do equipamento" />
                  </div>
                  <div>
                    <label htmlFor="cv-ve-registro-out" className={labelClass}>Registro</label>
                    <input id="cv-ve-registro-out" type="text" value={veiculo.registro}
                      onChange={(e) => setVeiculo({ ...veiculo, registro: e.target.value })}
                      className={inputClass} placeholder="Opcional" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="cv-ve-descricao" className={labelClass}>Descrição detalhada</label>
                    <textarea id="cv-ve-descricao" value={veiculo.descricaoDetalhada}
                      onChange={(e) => setVeiculo({ ...veiculo, descricaoDetalhada: e.target.value })}
                      className={`${inputClass} min-h-[80px]`} placeholder="Descreva o veículo/equipamento em detalhes" />
                  </div>
                </>
              )}
            </div>
          </fieldset>

          {/* Seção 4 - Condições da Venda */}
          <fieldset className="mb-8">
            <legend className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center text-sm font-bold">4</span>
              Condições da Venda
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cv-vd-valor" className={labelClass}>Valor total (R$) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                  <input id="cv-vd-valor" type="text" inputMode="numeric" required
                    value={venda.valor} onChange={(e) => handleValorChange(e, "valor")}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                    placeholder="0,00" />
                </div>
              </div>
              <div>
                <label htmlFor="cv-vd-forma" className={labelClass}>Forma de pagamento *</label>
                <select id="cv-vd-forma" required value={venda.formaPagamento}
                  onChange={(e) => setVenda({ ...venda, formaPagamento: e.target.value })}
                  className={inputClass}>
                  {FORMAS_PAGAMENTO.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              {venda.formaPagamento === "parcelado" && (
                <>
                  <div>
                    <label htmlFor="cv-vd-parcelas" className={labelClass}>Número de parcelas</label>
                    <input id="cv-vd-parcelas" type="text" inputMode="numeric" value={venda.parcelas}
                      onChange={(e) => setVenda({ ...venda, parcelas: e.target.value })}
                      className={inputClass} placeholder="Ex.: 12" />
                  </div>
                  <div>
                    <label htmlFor="cv-vd-entrada" className={labelClass}>Valor da entrada (R$)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">R$</span>
                      <input id="cv-vd-entrada" type="text" inputMode="numeric"
                        value={venda.entrada} onChange={(e) => handleValorChange(e, "entrada")}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
                        placeholder="0,00" />
                    </div>
                  </div>
                </>
              )}

              {venda.formaPagamento === "permuta" && (
                <div className="md:col-span-2">
                  <label htmlFor="cv-vd-permuta" className={labelClass}>Descrição do bem em permuta</label>
                  <textarea id="cv-vd-permuta" value={venda.descricaoPermuta}
                    onChange={(e) => setVenda({ ...venda, descricaoPermuta: e.target.value })}
                    className={`${inputClass} min-h-[80px]`} placeholder="Descreva o bem oferecido em permuta" />
                </div>
              )}

              <div>
                <label htmlFor="cv-vd-data" className={labelClass}>Data da venda *</label>
                <input id="cv-vd-data" type="date" required value={venda.dataVenda}
                  onChange={(e) => setVenda({ ...venda, dataVenda: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label htmlFor="cv-vd-cidade" className={labelClass}>Cidade da venda *</label>
                <input id="cv-vd-cidade" type="text" required value={venda.cidadeVenda}
                  onChange={(e) => setVenda({ ...venda, cidadeVenda: e.target.value })}
                  className={inputClass} placeholder="Cidade" />
              </div>
              <div>
                <label htmlFor="cv-vd-estado" className={labelClass}>Estado *</label>
                <select id="cv-vd-estado" required value={venda.estadoVenda}
                  onChange={(e) => setVenda({ ...venda, estadoVenda: e.target.value })}
                  className={inputClass}>
                  <option value="">Selecione</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Botão gerar */}
          <button
            type="button"
            onClick={gerarContrato}
            disabled={!camposObrigatoriosPreenchidos()}
            className="w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg hover:bg-[#E8432A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Gerar contrato
          </button>
        </div>
      )}

      {/* ============== ETAPA 3 - PREVIEW ============== */}
      {etapa === 3 && categoria && (
        <div ref={previewRef}>
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              type="button"
              onClick={voltarEtapa}
              className="py-3 px-6 rounded-xl border-2 border-gray-200 text-[#64748B] font-bold hover:border-gray-300 transition-colors"
            >
              ← Editar dados
            </button>
            <button
              type="button"
              onClick={baixarPdf}
              disabled={gerandoPdf}
              className="flex-1 py-3 px-6 rounded-xl bg-[#FF4D30] text-white font-bold hover:bg-[#E8432A] disabled:opacity-50 transition-colors"
            >
              {gerandoPdf ? "Gerando PDF..." : "Baixar PDF"}
            </button>
            <button
              type="button"
              onClick={copiarContrato}
              className="flex-1 py-3 px-6 rounded-xl border-2 border-[#FF4D30] text-[#FF4D30] font-bold hover:bg-[#FF4D30] hover:text-white transition-colors"
            >
              {copiado ? "Copiado!" : "Copiar texto"}
            </button>
            <button
              type="button"
              onClick={imprimirContrato}
              className="py-3 px-6 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
            >
              Imprimir
            </button>
          </div>

          {/* Contrato renderizado */}
          <div
            id="contrato-veiculo-preview"
            className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: "1.9" }}
          >
            <h2 className="text-center text-lg md:text-xl font-bold text-[#0F172A] mb-8 leading-tight">
              CONTRATO PARTICULAR DE COMPRA E VENDA<br />DE {CATEGORIAS.find((c) => c.id === categoria)?.tituloContrato}
            </h2>

            <p className="text-[#475569] mb-6 text-sm md:text-base">
              Pelo presente instrumento particular de compra e venda, as partes abaixo qualificadas
              têm entre si, justo e contratado, o seguinte:
            </p>

            {/* Vendedor */}
            <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
              <p className="font-bold text-[#0F172A] mb-2 text-sm md:text-base">VENDEDOR(A):</p>
              <p className="text-[#475569] text-sm">Nome: {vendedor.nome}</p>
              <p className="text-[#475569] text-sm">CPF/CNPJ: {vendedor.cpfCnpj}</p>
              {vendedor.rg && <p className="text-[#475569] text-sm">RG: {vendedor.rg}</p>}
              <p className="text-[#475569] text-sm">Endereço: {vendedor.endereco}</p>
              <p className="text-[#475569] text-sm">Cidade/Estado: {vendedor.cidade}/{vendedor.estado} - CEP: {vendedor.cep}</p>
              <p className="text-[#475569] text-sm">Telefone: {vendedor.telefone}</p>
              {vendedor.email && <p className="text-[#475569] text-sm">E-mail: {vendedor.email}</p>}
            </div>

            {/* Comprador */}
            <div className="mb-6 p-4 bg-[#F8FAFC] rounded-xl">
              <p className="font-bold text-[#0F172A] mb-2 text-sm md:text-base">COMPRADOR(A):</p>
              <p className="text-[#475569] text-sm">Nome: {comprador.nome}</p>
              <p className="text-[#475569] text-sm">CPF/CNPJ: {comprador.cpfCnpj}</p>
              {comprador.rg && <p className="text-[#475569] text-sm">RG: {comprador.rg}</p>}
              <p className="text-[#475569] text-sm">Endereço: {comprador.endereco}</p>
              <p className="text-[#475569] text-sm">Cidade/Estado: {comprador.cidade}/{comprador.estado} - CEP: {comprador.cep}</p>
              <p className="text-[#475569] text-sm">Telefone: {comprador.telefone}</p>
              {comprador.email && <p className="text-[#475569] text-sm">E-mail: {comprador.email}</p>}
            </div>

            {/* Cláusulas */}
            <div className="space-y-4 text-sm md:text-base text-[#475569]">
              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA PRIMEIRA - DO OBJETO</p>
                <p>
                  O(A) VENDEDOR(A) é legítimo(a) proprietário(a) do(a) {CATEGORIAS.find((c) => c.id === categoria)?.tituloContrato.toLowerCase()} abaixo descrito(a), livre e desembaraçado(a) de quaisquer ônus ou gravames:
                </p>
                <div className="mt-2 p-4 bg-[#F8FAFC] rounded-xl text-sm">
                  <p>Marca: {veiculo.marca} | Modelo: {veiculo.modelo}</p>
                  <p>Ano Fabricação/Modelo: {veiculo.anoFabricacao}/{veiculo.anoModelo} | Cor: {veiculo.cor}</p>
                  {(categoria === "automovel" || categoria === "motocicleta" || categoria === "caminhao" || categoria === "onibus") && (
                    <>
                      <p>Placa: {veiculo.placa} | Chassi: {veiculo.chassi}</p>
                      <p>RENAVAM: {veiculo.renavam} | Combustível: {combustivelLabel(veiculo.combustivel)}</p>
                      {veiculo.km && <p>Quilometragem: {veiculo.km} km</p>}
                    </>
                  )}
                  {categoria === "motocicleta" && veiculo.cilindrada && <p>Cilindrada: {veiculo.cilindrada} cc</p>}
                  {categoria === "caminhao" && (
                    <>
                      <p>Eixos: {veiculo.eixos} | PBT: {veiculo.pbt} kg</p>
                      {veiculo.rntrc && <p>RNTRC: {veiculo.rntrc}</p>}
                    </>
                  )}
                  {categoria === "onibus" && veiculo.passageiros && <p>Passageiros: {veiculo.passageiros}</p>}
                  {categoria === "embarcacao" && (
                    <>
                      <p>Registro na Capitania: {veiculo.registroCapitania} | TIEM: {veiculo.tiem}</p>
                      <p>Motor: {veiculo.numeroMotor} | Potência: {veiculo.potencia} HP</p>
                      <p>Comprimento: {veiculo.comprimento} pés | Casco: {veiculo.materialCasco}</p>
                      <p>Porto de registro: {veiculo.portoRegistro}</p>
                    </>
                  )}
                  {categoria === "outros" && (
                    <>
                      <p>Número de série: {veiculo.numeroSerie}</p>
                      {veiculo.registro && <p>Registro: {veiculo.registro}</p>}
                      {veiculo.descricaoDetalhada && <p>Descrição: {veiculo.descricaoDetalhada}</p>}
                    </>
                  )}
                  <p>Valor: {valorExtenso(veiculo.valor || "")}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA SEGUNDA - DO PREÇO E FORMA DE PAGAMENTO</p>
                <p>{textoFormaPagamento(venda)}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA TERCEIRA - DA TRANSFERÊNCIA</p>
                <p>{getClausulaTransferencia(categoria)}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA QUARTA - DAS CONDIÇÕES DO {categoria === "embarcacao" ? "BEM" : "VEÍCULO"}</p>
                <p>{getClausulaCondicoes(categoria)}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA QUINTA - DOS DÉBITOS</p>
                <p>{getClausulaDebitos(categoria, formatarData(venda.dataVenda))}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA SEXTA - DA DOCUMENTAÇÃO</p>
                <p>{getClausulaDocumentacao(categoria)}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA SÉTIMA - DAS MULTAS E INFRAÇÕES</p>
                <p>{getClausulaMultas(categoria, formatarData(venda.dataVenda))}</p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA OITAVA - DO FORO</p>
                <p>
                  Fica eleito o foro da comarca de {venda.cidadeVenda}/{venda.estadoVenda} para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, renunciando as partes a qualquer outro, por mais privilegiado que seja.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA NONA - DAS DISPOSIÇÕES GERAIS</p>
                <p>
                  Qualquer modificação ou aditamento ao presente contrato somente terá validade se feito por escrito e assinado por ambas as partes. O presente contrato é firmado em caráter irrevogável e irretratável, obrigando as partes, seus herdeiros e sucessores.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#0F172A]">CLÁUSULA DÉCIMA - DA VALIDADE</p>
                <p>
                  O presente contrato entra em vigor na data de sua assinatura, produzindo todos os seus efeitos legais a partir de {formatarData(venda.dataVenda)}. As partes declaram que leram e compreenderam integralmente todas as cláusulas deste instrumento, estando de pleno acordo com seus termos.
                </p>
              </div>
            </div>

            {/* Data e local */}
            <p className="mt-10 text-center text-[#475569] text-sm md:text-base">
              {venda.cidadeVenda}/{venda.estadoVenda}, {dataExtenso(venda.dataVenda)}.
            </p>

            {/* Assinaturas */}
            <div className="mt-12 space-y-10">
              <div className="text-center">
                <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                <p className="font-bold text-[#0F172A] text-sm">{vendedor.nome}</p>
                <p className="text-[#64748B] text-xs">CPF/CNPJ: {vendedor.cpfCnpj}</p>
                <p className="text-[#64748B] text-xs font-semibold">VENDEDOR(A)</p>
              </div>

              <div className="text-center">
                <div className="border-b border-[#0F172A] w-80 mx-auto mb-2" />
                <p className="font-bold text-[#0F172A] text-sm">{comprador.nome}</p>
                <p className="text-[#64748B] text-xs">CPF/CNPJ: {comprador.cpfCnpj}</p>
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
    </>
  );
}
