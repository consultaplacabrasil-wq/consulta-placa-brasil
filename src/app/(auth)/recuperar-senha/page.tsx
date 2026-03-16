"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao enviar e-mail");
        setIsLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  if (sent) {
    return (
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0F172A]">E-mail enviado!</CardTitle>
          <CardDescription className="text-gray-500">
            Se existe uma conta com o e-mail <strong>{email}</strong>, enviamos um link de recuperação.
            Verifique sua caixa de entrada e a pasta de spam.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold"
            onClick={() => { setSent(false); setError(""); }}
          >
            Enviar novamente
          </Button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-1 text-sm text-[#FF4D30] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-[#0F172A]">Recuperar Senha</CardTitle>
        <CardDescription className="text-gray-500">
          Informe seu e-mail e enviaremos um link para redefinir sua senha
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0F172A]">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href="/login"
          className="flex items-center gap-1 text-sm text-[#FF4D30] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o login
        </Link>
      </CardFooter>
    </Card>
  );
}
