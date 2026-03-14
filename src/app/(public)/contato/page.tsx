import { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contato/contact-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Consulta Placa Brasil. Atendimento por e-mail, telefone e WhatsApp de segunda a sexta, das 8h às 18h. Tire suas dúvidas sobre consulta veicular.",
  alternates: {
    canonical: "https://consultaplacabrasil.com.br/contato",
  },
  openGraph: {
    title: "Contato | Consulta Placa Brasil",
    description:
      "Entre em contato com a Consulta Placa Brasil. Atendimento por e-mail, telefone e WhatsApp.",
    url: "https://consultaplacabrasil.com.br/contato",
  },
};

export default function ContatoPage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#FF4D30] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contato</h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Tem dúvidas ou precisa de ajuda? Entre em contato conosco. Nossa equipe
            está pronta para atendê-lo.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                  Fale Conosco
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Estamos disponíveis de segunda a sexta, das 8h às 18h. Escolha o
                  canal de sua preferência para entrar em contato.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 shrink-0">
                    <Mail className="w-5 h-5 text-[#FF4D30]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">E-mail</p>
                    <a
                      href="mailto:contato@consultaplacabrasil.com.br"
                      className="text-[#FF4D30] hover:underline text-sm"
                    >
                      contato@consultaplacabrasil.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 shrink-0">
                    <Phone className="w-5 h-5 text-[#FF4D30]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Telefone</p>
                    <a
                      href="tel:+551140028922"
                      className="text-[#FF4D30] hover:underline text-sm"
                    >
                      (11) 4002-8922
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#FF4D30]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">WhatsApp</p>
                    <a
                      href="https://wa.me/551140028922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4D30] hover:underline text-sm"
                    >
                      (11) 4002-8922
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF4D30]/10 shrink-0">
                    <MapPin className="w-5 h-5 text-[#FF4D30]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">Endereço</p>
                    <p className="text-sm text-[#475569]">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-[#475569]">
                  Antes de entrar em contato, confira nossa{" "}
                  <Link href="/faq" className="text-[#FF4D30] hover:underline">
                    página de perguntas frequentes
                  </Link>.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contato - Consulta Placa Brasil",
            description:
              "Entre em contato com a Consulta Placa Brasil por e-mail, telefone ou WhatsApp.",
            url: "https://consultaplacabrasil.com.br/contato",
            mainEntity: {
              "@type": "Organization",
              name: "Consulta Placa Brasil",
              telephone: "+55-11-4002-8922",
              email: "contato@consultaplacabrasil.com.br",
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressRegion: "SP",
                addressCountry: "BR",
              },
            },
          }),
        }}
      />
    </div>
  );
}
