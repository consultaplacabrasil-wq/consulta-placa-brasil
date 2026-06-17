"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cpb-cookie-consent"; // "accepted" | "rejected"

type Consent = "accepted" | "rejected" | null;

// Remove os cookies do Google Analytics (usado ao recusar/reconfigurar).
function deleteGaCookies() {
  if (typeof document === "undefined") return;
  const expira = "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  const host = window.location.hostname;
  const dominios = ["", `; domain=${host}`, `; domain=.${host}`];
  document.cookie.split(";").forEach((c) => {
    const nome = c.split("=")[0].trim();
    if (nome === "_gid" || nome === "_ga" || nome.startsWith("_ga_") || nome.startsWith("_gat")) {
      dominios.forEach((d) => {
        document.cookie = `${nome}=${expira}${d}`;
      });
    }
  });
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent;
      if (saved === "accepted" || saved === "rejected") setConsent(saved);
    } catch {
      /* localStorage indisponível — mostra o banner */
    }
  }, []);

  const aceitar = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setConsent("accepted");
  }, []);

  const recusar = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {}
    deleteGaCookies();
    setConsent("rejected");
  }, []);

  // Reabre o banner para o usuário rever a escolha ("Gerenciar cookies").
  const reconfigurar = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setConsent(null);
  }, []);

  // Evita flash/hidratação inconsistente antes de ler o localStorage.
  if (!mounted) return null;

  return (
    <>
      {/* Google Analytics — só carrega APÓS o consentimento de análise */}
      {consent === "accepted" && gaId && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Banner de consentimento — só aparece se ainda não houve decisão */}
      {consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl md:flex md:items-center md:gap-6 md:p-6">
            <div className="flex items-start gap-3">
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF4D30]/10 sm:flex">
                <Cookie className="h-5 w-5 text-[#FF4D30]" />
              </div>
              <p className="text-sm leading-relaxed text-[#475569]">
                Utilizamos <strong className="text-[#0F172A]">cookies essenciais</strong> para o
                funcionamento do site e, com o seu consentimento, cookies de{" "}
                <strong className="text-[#0F172A]">análise</strong> (Google Analytics) para
                melhorar sua experiência. Você pode aceitar ou recusar os não essenciais.{" "}
                <Link href="/cookies" className="font-medium text-[#FF4D30] hover:underline">
                  Saiba mais
                </Link>
                .
              </p>
            </div>
            <div className="mt-4 flex shrink-0 gap-3 md:mt-0">
              <button
                onClick={recusar}
                className="flex-1 whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-[#475569] transition-colors hover:bg-gray-50 md:flex-none"
              >
                Recusar não essenciais
              </button>
              <button
                onClick={aceitar}
                className="flex-1 whitespace-nowrap rounded-lg bg-[#FF4D30] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e63e22] md:flex-none"
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante para reabrir as preferências após decidir */}
      {consent !== null && (
        <button
          onClick={reconfigurar}
          aria-label="Gerenciar cookies"
          title="Gerenciar cookies"
          className="fixed bottom-4 left-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#475569] shadow-lg transition-colors hover:bg-gray-50 hover:text-[#FF4D30]"
        >
          <Cookie className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
