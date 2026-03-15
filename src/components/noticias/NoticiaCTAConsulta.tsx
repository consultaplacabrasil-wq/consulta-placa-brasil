import Link from "next/link";
import { Search, ShieldCheck, FileSearch, Car } from "lucide-react";

const CTA_VARIANTES = [
  {
    titulo: "Vai comprar um veículo? Consulte a placa antes!",
    subtitulo: "Verifique histórico, sinistro, leilão e débitos",
    botao: "Consultar Placa",
    icon: Search,
  },
  {
    titulo: "Cheque a documentação antes de fechar negócio",
    subtitulo: "Consulte dados completos do veículo pela placa",
    botao: "Verificar Agora",
    icon: FileSearch,
  },
  {
    titulo: "Proteja-se antes de comprar um veículo usado",
    subtitulo: "Descubra pendências, recalls e restrições pela placa",
    botao: "Consultar Veículo",
    icon: ShieldCheck,
  },
  {
    titulo: "Consulte a placa e saiba tudo sobre o veículo",
    subtitulo: "Relatório completo com histórico, débitos e mais",
    botao: "Consultar Agora",
    icon: Car,
  },
];

function getVariante(index?: number) {
  if (index !== undefined) return CTA_VARIANTES[index % CTA_VARIANTES.length];
  // Selecionar baseado no dia + hora para variar mas ser consistente na mesma página
  const seed = new Date().getDate() + new Date().getHours();
  return CTA_VARIANTES[seed % CTA_VARIANTES.length];
}

export default function NoticiaCTAConsulta({
  texto,
  link,
  variante,
}: {
  texto?: string;
  link?: string;
  variante?: number;
}) {
  const cta = getVariante(variante);
  const Icon = cta.icon;

  return (
    <div className="my-8 rounded-xl bg-gradient-to-r from-[#FF4D30] to-[#E8432A] p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-6 w-6 flex-shrink-0" />
        <h3 className="text-lg font-bold">
          {texto || cta.titulo}
        </h3>
      </div>
      <p className="text-sm text-white/90 mb-4">
        {cta.subtitulo}
      </p>
      <Link
        href={link || "https://consultaplacabrasil.com/"}
        className="inline-block bg-white text-[#FF4D30] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {cta.botao}
      </Link>
    </div>
  );
}
