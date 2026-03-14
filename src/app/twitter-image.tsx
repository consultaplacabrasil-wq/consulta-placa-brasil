import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Consulta Placa Brasil | Consultar Placa de Veículo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FF4D30 0%, #E8432A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.2)",
            marginBottom: "32px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Consulta Placa Brasil
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Consulte qualquer veículo pela placa. Relatório completo com
          histórico, sinistro, leilão, gravame, débitos e multas.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "40px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>★ 4.8/5 avaliação</span>
          <span>•</span>
          <span>27 estados + DF</span>
          <span>•</span>
          <span>A partir de R$ 13,90</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
