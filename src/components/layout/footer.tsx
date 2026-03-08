import Link from "next/link";
import { Car, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  plataforma: [
    { href: "/", label: "Consultar Placa" },
    { href: "/relatorios/basico", label: "Relatório Básico" },
    { href: "/relatorios/completo", label: "Relatório Completo" },
    { href: "/relatorios/premium", label: "Relatório Premium" },
  ],
  empresa: [
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
    { href: "/faq", label: "FAQ" },
  ],
  legal: [
    { href: "/termos", label: "Termos de Uso" },
    { href: "/privacidade", label: "Política de Privacidade" },
    { href: "/lgpd", label: "LGPD" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4D30]">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  Consulta<span className="text-[#FF4D30]">Placa</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  Brasil
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Consulte qualquer veículo pela placa. Relatório completo com
              histórico, sinistro, leilão, débitos, multas e mais.
            </p>
            <div className="space-y-2.5 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FF4D30]" />
                (11) 4002-8922
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF4D30]" />
                contato@consultaplacabrasil.com.br
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FF4D30]" />
                São Paulo, SP - Brasil
              </div>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#FF4D30]">
              Plataforma
            </span>
            <ul className="space-y-2.5">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#FF4D30]">
              Empresa
            </span>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#FF4D30]">
              Legal
            </span>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Consulta Placa Brasil. Todos os
            direitos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Cobertura nacional - Todos os 27 estados + Distrito Federal
          </p>
        </div>
      </div>
    </footer>
  );
}
