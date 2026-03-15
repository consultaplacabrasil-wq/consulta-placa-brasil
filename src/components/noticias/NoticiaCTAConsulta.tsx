import Link from "next/link";
import { Search } from "lucide-react";

export default function NoticiaCTAConsulta({
  texto,
  link,
}: {
  texto?: string;
  link?: string;
}) {
  return (
    <div className="my-8 rounded-xl bg-gradient-to-r from-[#FF4D30] to-[#E8432A] p-6 text-white">
      <div className="flex items-center gap-3 mb-2">
        <Search className="h-6 w-6" />
        <h3 className="text-lg font-bold">
          {texto || "Vai comprar um veículo? Consulte a placa antes!"}
        </h3>
      </div>
      <p className="text-sm text-white/90 mb-4">
        Verifique histórico, sinistro, leilão e débitos
      </p>
      <Link
        href={link || "https://consultaplacabrasil.com/"}
        className="inline-block bg-white text-[#FF4D30] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Consultar Agora
      </Link>
    </div>
  );
}
