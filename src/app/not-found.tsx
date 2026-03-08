import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <Car className="mb-6 h-16 w-16 text-[#0066FF]" />
      <h1 className="mb-2 text-4xl font-bold text-[#0F172A]">404</h1>
      <p className="mb-6 text-lg text-[#475569]">Página não encontrada</p>
      <Link href="/">
        <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
          Voltar ao início
        </Button>
      </Link>
    </div>
  );
}
