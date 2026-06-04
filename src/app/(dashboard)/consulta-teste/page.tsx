import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ConsultaTesteForm } from "./form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Consulta Teste" };

const ALLOWED_EMAIL = "mfrancadf@gmail.com";

export default async function ConsultaTestePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (session.user.email !== ALLOWED_EMAIL) redirect("/painel");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Consulta de Teste</h1>
        <p className="text-gray-500 text-sm">Consulta rápida usando API Agregados Básica (R$ 0,14/consulta)</p>
      </div>
      <ConsultaTesteForm />
    </div>
  );
}
