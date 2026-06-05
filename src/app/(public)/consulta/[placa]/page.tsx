import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ placa: string }>;
}

// A consulta grátis foi descontinuada. Redireciona para a seção de planos pagos.
export default async function ConsultaPage({ params }: Props) {
  const { placa } = await params;
  const placaNorm = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  redirect(`/?placa=${placaNorm}#consultas`);
}
