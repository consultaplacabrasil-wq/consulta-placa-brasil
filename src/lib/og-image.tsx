import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgImageProps {
  title: string;
  description: string;
  badge?: string;
}

export function generateOgImage({ title, description, badge }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: badge + logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#FF4D30",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
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
            <span style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>
              Consulta Placa Brasil
            </span>
          </div>
          {badge && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 77, 48, 0.15)",
                borderRadius: "9999px",
                padding: "8px 20px",
                border: "1px solid rgba(255, 77, 48, 0.3)",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: "16px", color: "#FF4D30", fontWeight: 600 }}>{badge}</span>
            </div>
          )}
        </div>

        {/* Center: title + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: title.length > 35 ? "48px" : "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(148, 163, 184, 1)",
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom: URL + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "18px", color: "rgba(100, 116, 139, 1)" }}>
            consultaplacabrasil.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FF4D30",
              borderRadius: "12px",
              padding: "12px 24px",
            }}
          >
            <span style={{ fontSize: "18px", color: "white", fontWeight: 600 }}>
              Acesse gratuitamente
            </span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
