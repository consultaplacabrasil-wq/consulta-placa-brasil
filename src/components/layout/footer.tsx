import Link from "next/link";
import { Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0066FF]">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                Consulta<span className="text-[#0066FF]">Placa</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Consulte qualquer veículo pela placa. Relatório completo com
              histórico, sinistro, leilão, débitos, multas e mais.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Plataforma
            </h3>
            <ul className="space-y-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Consulta Placa Brasil. Todos os
            direitos reservados.
          </p>
          <p className="text-xs text-gray-500">
            Cobertura nacional - Todos os 27 estados + Distrito Federal
          </p>
        </div>
      </div>
    </footer>
  );
}
