import Link from "next/link";
import Image from "next/image";
import { Car, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  plataforma: [
    { href: "/", label: "Consultar Placa" },
    { href: "/ferramentas", label: "Ferramentas Gratuitas" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contato", label: "Contato" },
  ],
  empresa: [
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/contato", label: "Contato" },
  ],
  legal: [
    { href: "/termos", label: "Termos de Uso" },
    { href: "/privacidade", label: "Política de Privacidade" },
    { href: "/cookies", label: "Política de Cookies" },
    { href: "/lgpd", label: "LGPD" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/">
              <Image
                src="/logo-header.webp"
                alt="Consulta Placa Brasil"
                width={160}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Consulte qualquer veículo pela placa. Relatório completo com
              histórico, sinistro, leilão, débitos, multas e mais.
            </p>
            <div className="space-y-2.5 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF4D30]" />
                contato@consultaplacabrasil.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FF4D30]" />
                Campinas, SP - Brasil
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
            &copy; 2026 Consulta Placa Brasil. Todos os
            direitos reservados.
          </p>
          <p className="text-sm text-gray-500">
            BYTX LTDA - CNPJ: 65.649.904/0001-98
          </p>
        </div>
      </div>
    </footer>
  );
}
