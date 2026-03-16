"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function validatePassword(pw: string): string[] {
  const errors: string[] = [];
  if (pw.length < 8) errors.push("Mínimo 8 caracteres");
  if (!/[A-Z]/.test(pw)) errors.push("1 letra maiúscula");
  if (!/[0-9]/.test(pw)) errors.push("1 número");
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)) errors.push("1 caractere especial");
  for (let i = 0; i < pw.length - 2; i++) {
    const a = pw.charCodeAt(i), b = pw.charCodeAt(i + 1), c = pw.charCodeAt(i + 2);
    if (b === a + 1 && c === b + 1) { errors.push("Sem sequências (ex: 123, abc)"); break; }
  }
  for (let i = 0; i < pw.length - 2; i++) {
    if (pw[i] === pw[i + 1] && pw[i + 1] === pw[i + 2]) { errors.push("Sem caracteres repetidos (ex: 111, aaa)"); break; }
  }
  return errors;
}

function RedefinirSenhaContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  if (!token) {
    return (
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-7 w-7 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0F172A]">Link inválido</CardTitle>
          <CardDescription className="text-gray-500">
            O link de recuperação está inválido ou expirado. Solicite um novo link.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/recuperar-senha" className="text-sm text-[#FF4D30] hover:underline font-semibold">
            Solicitar novo link
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0F172A]">Senha redefinida!</CardTitle>
          <CardDescription className="text-gray-500">
            Sua senha foi alterada com sucesso. Agora você pode fazer login com a nova senha.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/login">
            <Button className="bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold">
              Ir para o Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const pwErrors = validatePassword(password);
    if (pwErrors.length > 0) {
      setError("Senha fraca: " + pwErrors.join(", "));
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao redefinir senha");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-[#0F172A]">Nova Senha</CardTitle>
        <CardDescription className="text-gray-500">
          Crie uma nova senha segura para sua conta
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
            <Label htmlFor="password" className="text-[#0F172A]">Nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mín. 8 chars, 1 maiúsc., 1 núm., 1 especial"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErrors(e.target.value ? validatePassword(e.target.value) : []);
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password && passwordErrors.length > 0 && (
              <div className="text-xs text-red-500 space-y-0.5">
                {passwordErrors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#0F172A]">Confirmar nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirme sua nova senha"
                className="pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="p-8 text-center text-gray-500">Carregando...</CardContent>
      </Card>
    }>
      <RedefinirSenhaContent />
    </Suspense>
  );
}
