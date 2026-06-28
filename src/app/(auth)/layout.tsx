import Link from "next/link";
import Image from "next/image";
import { Car } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <Image
          src="/logo-header.webp"
          alt="Consulta Placa Brasil"
          width={160}
          height={40}
        />
      </Link>
      {children}
    </div>
  );
}
