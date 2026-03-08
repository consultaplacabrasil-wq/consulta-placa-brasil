import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF4D30]">
          <Car className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-[#0F172A]">
          Consulta<span className="text-[#FF4D30]">Placa</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
