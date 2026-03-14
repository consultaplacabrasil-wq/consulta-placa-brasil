"use client";

import { useState } from "react";

interface RecallItem {
  modelo: string;
  ano: string;
  motivo: string;
  risco: string;
  oQueFazer: string;
}

const RECALLS_POR_MARCA: Record<string, RecallItem[]> = {
  Chevrolet: [
    {
      modelo: "Onix / Onix Plus",
      ano: "2020–2021",
      motivo: "Risco de incêndio no módulo de controle do motor devido a superaquecimento de componente eletrônico.",
      risco: "Incêndio — risco alto para ocupantes e terceiros.",
      oQueFazer: "Agendar reparo gratuito em concessionária Chevrolet. A substituição do módulo leva aproximadamente 1 hora.",
    },
    {
      modelo: "Tracker",
      ano: "2021–2023",
      motivo: "Falha no software do sistema de freios ABS que pode causar acionamento tardio do sistema antibloqueio.",
      risco: "Aumento da distância de frenagem em piso molhado.",
      oQueFazer: "Levar o veículo à concessionária para atualização gratuita do software do módulo ABS.",
    },
    {
      modelo: "S10",
      ano: "2019–2022",
      motivo: "Possível vazamento de combustível na conexão do filtro de combustível por trinca na tubulação.",
      risco: "Vazamento de diesel com risco de incêndio.",
      oQueFazer: "Comparecer à concessionária para inspeção e substituição da tubulação, sem custo para o proprietário.",
    },
  ],
  Fiat: [
    {
      modelo: "Argo / Cronos",
      ano: "2022–2024",
      motivo: "Possível desprendimento do revestimento do teto interno por falha na colagem durante a fabricação.",
      risco: "Queda do revestimento sobre os ocupantes, podendo obstruir a visão do motorista.",
      oQueFazer: "Agendar revisão em concessionária Fiat para recolagem ou substituição do revestimento.",
    },
    {
      modelo: "Toro",
      ano: "2020–2023",
      motivo: "Falha no sensor do airbag lateral que pode impedir o acionamento em caso de colisão.",
      risco: "Não acionamento do airbag lateral em impacto — risco grave de lesões.",
      oQueFazer: "Levar à concessionária para substituição gratuita do sensor e recalibração do sistema.",
    },
    {
      modelo: "Mobi",
      ano: "2021–2022",
      motivo: "Problema na mangueira do sistema de freio traseiro com possível ressecamento prematuro.",
      risco: "Perda parcial de eficiência na frenagem traseira.",
      oQueFazer: "Substituição gratuita da mangueira de freio em qualquer concessionária autorizada Fiat.",
    },
  ],
  Ford: [
    {
      modelo: "Ranger",
      ano: "2020–2023",
      motivo: "Risco de travamento do cinto de segurança dianteiro por falha no mecanismo retrator.",
      risco: "Cinto pode não retrair adequadamente, comprometendo a proteção em colisão.",
      oQueFazer: "Agendar substituição gratuita do retrator do cinto na concessionária Ford.",
    },
    {
      modelo: "Territory",
      ano: "2021–2023",
      motivo: "Possível curto-circuito no chicote elétrico do compartimento do motor por atrito com componentes metálicos.",
      risco: "Curto-circuito com possibilidade de incêndio no compartimento do motor.",
      oQueFazer: "Inspeção e reparo gratuito do chicote elétrico em concessionária autorizada.",
    },
  ],
  Honda: [
    {
      modelo: "HR-V",
      ano: "2019–2023",
      motivo: "Falha na bomba de combustível que pode causar parada repentina do motor durante a condução.",
      risco: "Parada inesperada do motor — risco de acidente, especialmente em vias de alta velocidade.",
      oQueFazer: "Substituição gratuita da bomba de combustível na concessionária Honda.",
    },
    {
      modelo: "Civic",
      ano: "2020–2022",
      motivo: "Problema no inflador do airbag do motorista (campanha Takata) com possível ruptura em caso de acionamento.",
      risco: "Fragmentos metálicos podem ser projetados contra o motorista em caso de colisão.",
      oQueFazer: "Troca imediata do inflador do airbag — sem custo. Agendar com urgência na concessionária.",
    },
    {
      modelo: "City",
      ano: "2021–2023",
      motivo: "Software do sistema de câmbio CVT pode apresentar falha intermitente causando solavancos.",
      risco: "Perda momentânea de tração com risco em ultrapassagens e subidas.",
      oQueFazer: "Atualização gratuita do software do câmbio CVT em concessionária autorizada Honda.",
    },
  ],
  Hyundai: [
    {
      modelo: "HB20 / HB20S",
      ano: "2020–2023",
      motivo: "Possível folga no parafuso de fixação da roda traseira por torque inadequado na fábrica.",
      risco: "Desprendimento da roda traseira durante a condução — risco grave de acidente.",
      oQueFazer: "Inspeção e retorque gratuitos em concessionária Hyundai. Procedimento leva cerca de 30 minutos.",
    },
    {
      modelo: "Creta",
      ano: "2022–2024",
      motivo: "Falha no módulo de controle da transmissão automática DCT que pode causar perda de marcha.",
      risco: "Veículo pode perder tração em movimento, comprometendo a segurança.",
      oQueFazer: "Atualização do software e, se necessário, substituição do módulo na concessionária.",
    },
    {
      modelo: "Tucson",
      ano: "2019–2022",
      motivo: "Risco de vazamento no sistema de arrefecimento por trinca na mangueira do radiador.",
      risco: "Superaquecimento do motor podendo causar danos permanentes e parada do veículo.",
      oQueFazer: "Substituição gratuita da mangueira do radiador em qualquer concessionária Hyundai.",
    },
  ],
  Jeep: [
    {
      modelo: "Compass",
      ano: "2021–2023",
      motivo: "Possível falha no sistema de direção elétrica (EPS) causando perda momentânea da assistência.",
      risco: "Esforço excessivo na direção em baixa velocidade — risco de perda de controle em manobras.",
      oQueFazer: "Substituição gratuita do módulo EPS na concessionária Jeep.",
    },
    {
      modelo: "Renegade",
      ano: "2020–2022",
      motivo: "Vazamento de óleo na junta da tampa de válvulas que pode atingir componentes quentes do motor.",
      risco: "Contato do óleo com o coletor de escape pode causar princípio de incêndio.",
      oQueFazer: "Troca da junta e inspeção do compartimento do motor sem custo na concessionária.",
    },
    {
      modelo: "Commander",
      ano: "2022–2024",
      motivo: "Falha intermitente no sensor de estacionamento traseiro que pode não detectar obstáculos.",
      risco: "Colisão em manobras de ré por não detecção de pedestres ou objetos.",
      oQueFazer: "Substituição do sensor e atualização do software na concessionária Jeep.",
    },
  ],
  Nissan: [
    {
      modelo: "Kicks",
      ano: "2020–2023",
      motivo: "Possível desconexão do conector do sensor de velocidade da roda que afeta o sistema ABS.",
      risco: "Sistema ABS pode ser desativado sem aviso ao motorista.",
      oQueFazer: "Reconexão e fixação do conector na concessionária Nissan, sem custo.",
    },
    {
      modelo: "Versa",
      ano: "2021–2023",
      motivo: "Falha na trava elétrica da porta traseira que pode permitir abertura involuntária durante a condução.",
      risco: "Porta pode abrir com o veículo em movimento — risco para passageiros, especialmente crianças.",
      oQueFazer: "Substituição gratuita do mecanismo da trava na concessionária autorizada Nissan.",
    },
  ],
  Renault: [
    {
      modelo: "Kwid",
      ano: "2020–2022",
      motivo: "Risco de deslocamento do banco do motorista por falha na trava do trilho de ajuste longitudinal.",
      risco: "Banco pode se mover durante frenagem brusca, comprometendo o controle do veículo.",
      oQueFazer: "Inspeção e substituição do trilho de fixação na concessionária Renault, sem custo.",
    },
    {
      modelo: "Duster",
      ano: "2021–2023",
      motivo: "Possível falha na vedação da bomba de vácuo do servo-freio que reduz a assistência de frenagem.",
      risco: "Esforço maior necessário para frear — aumento da distância de parada.",
      oQueFazer: "Substituição da bomba de vácuo gratuitamente em concessionária autorizada Renault.",
    },
    {
      modelo: "Captur",
      ano: "2019–2022",
      motivo: "Problema no chicote do sensor do nível de combustível que pode indicar leitura incorreta no painel.",
      risco: "Motorista pode ficar sem combustível inesperadamente por leitura falsa do medidor.",
      oQueFazer: "Troca do chicote e recalibração do sensor na concessionária, sem custo para o proprietário.",
    },
  ],
  Toyota: [
    {
      modelo: "Corolla Cross",
      ano: "2022–2024",
      motivo: "Possível desconexão do tubo de ventilação do tanque de combustível por encaixe inadequado.",
      risco: "Vazamento de vapores de combustível com risco de incêndio.",
      oQueFazer: "Inspeção e reencaixe do tubo na concessionária Toyota, sem custo.",
    },
    {
      modelo: "Hilux",
      ano: "2020–2023",
      motivo: "Falha no software do sistema de controle de estabilidade (VSC) que pode atuar desnecessariamente.",
      risco: "Redução inesperada de potência em curvas ou ultrapassagens.",
      oQueFazer: "Atualização gratuita do software do módulo VSC na concessionária Toyota.",
    },
    {
      modelo: "Yaris",
      ano: "2019–2021",
      motivo: "Problema no inflador do airbag do passageiro (campanha Takata) com possível ruptura.",
      risco: "Fragmentos metálicos projetados em caso de acionamento — risco fatal.",
      oQueFazer: "Substituição imediata e gratuita do inflador do airbag na concessionária. Campanha prioritária.",
    },
  ],
  Volkswagen: [
    {
      modelo: "T-Cross",
      ano: "2021–2023",
      motivo: "Possível curto-circuito no módulo de controle do teto solar panorâmico.",
      risco: "Risco de incêndio no teto do veículo — perigo para todos os ocupantes.",
      oQueFazer: "Inspeção e substituição do módulo na concessionária Volkswagen, sem custo.",
    },
    {
      modelo: "Polo / Virtus",
      ano: "2020–2023",
      motivo: "Falha no software do sistema de injeção que pode causar falhas de aceleração intermitentes.",
      risco: "Perda de aceleração em situações de trânsito — risco de colisão traseira.",
      oQueFazer: "Atualização gratuita do software do módulo de injeção na concessionária.",
    },
    {
      modelo: "Nivus",
      ano: "2021–2022",
      motivo: "Possível folga no suporte do compressor do ar-condicionado que causa vibração excessiva.",
      risco: "Rompimento da correia acessória podendo afetar a direção hidráulica e a bomba d'água.",
      oQueFazer: "Substituição do suporte e inspeção da correia na concessionária Volkswagen.",
    },
  ],
};

const MARCAS = Object.keys(RECALLS_POR_MARCA);

export default function ConsultaRecall() {
  const [marcaSelecionada, setMarcaSelecionada] = useState("");

  const recalls = marcaSelecionada ? RECALLS_POR_MARCA[marcaSelecionada] : [];

  return (
    <div className="space-y-6">
      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Consulta oficial de recalls
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Para consultar recalls específicos do seu veículo, acesse o portal
              oficial do SENATRAN com a placa ou o número do chassi. Os dados
              abaixo são informativos e apresentam os recalls mais recentes por
              marca.
            </p>
          </div>
        </div>
      </div>

      {/* Ferramenta */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <label
          htmlFor="marca-veiculo"
          className="block text-sm font-semibold text-[#0F172A] mb-2"
        >
          Selecione a marca do veículo
        </label>
        <select
          id="marca-veiculo"
          value={marcaSelecionada}
          onChange={(e) => setMarcaSelecionada(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D30] focus:ring-2 focus:ring-[#FF4D30]/20 outline-none text-base transition-colors bg-white"
        >
          <option value="">Escolha uma marca</option>
          {MARCAS.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
        <p className="text-xs text-[#64748B] mt-1">
          Exibiremos os recalls mais recentes da marca selecionada
        </p>

        {/* Resultados */}
        {marcaSelecionada && recalls.length > 0 && (
          <div className="mt-8 space-y-5">
            <h3 className="text-lg font-bold text-[#0F172A]">
              Recalls recentes — {marcaSelecionada}
            </h3>

            {recalls.map((recall, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-[#0F172A] px-5 py-3 flex items-center justify-between">
                  <h4 className="font-bold text-white">
                    {recall.modelo}
                  </h4>
                  <span className="text-xs bg-[#FF4D30] text-white px-3 py-1 rounded-full font-semibold">
                    {recall.ano}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                      Motivo do recall
                    </h5>
                    <p className="text-sm text-[#0F172A] leading-relaxed">
                      {recall.motivo}
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                    <h5 className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">
                      Risco identificado
                    </h5>
                    <p className="text-sm text-red-800 leading-relaxed">
                      {recall.risco}
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <h5 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
                      O que fazer
                    </h5>
                    <p className="text-sm text-green-800 leading-relaxed">
                      {recall.oQueFazer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link oficial */}
        <div className="mt-8">
          <a
            href="https://portalservicos.senatran.serpro.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-xl bg-[#FF4D30] text-white font-bold text-lg text-center hover:bg-[#E8432A] transition-colors shadow-sm"
          >
            Consultar recall oficial no site do SENATRAN
          </a>
          <p className="text-xs text-[#64748B] text-center mt-2">
            Você será redirecionado ao portal oficial do SENATRAN/SERPRO
          </p>
        </div>
      </div>
    </div>
  );
}
