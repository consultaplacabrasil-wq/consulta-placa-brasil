"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Eye, EyeOff, FileText, AlertCircle, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function onlyDigits(s: string): string {
  return s.replace(/\D/g, "");
}

function validateCpf(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(c[i]) * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (d1 !== parseInt(c[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(c[i]) * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  return d2 === parseInt(c[10]);
}

function validateCnpj(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
  const calc = (len: number) => {
    const weights =
      len === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < len; i++) sum += parseInt(c[i]) * weights[i];
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  if (calc(12) !== parseInt(c[12])) return false;
  return calc(13) === parseInt(c[13]);
}

// Valida CPF (11 dígitos) ou CNPJ (14 dígitos)
function validateCpfCnpj(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length === 11) return validateCpf(d);
  if (d.length === 14) return validateCnpj(d);
  return false;
}

// Label com indicador de campo obrigatório (sem quebrar por causa do flex do Label)
function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <Label htmlFor={htmlFor} className="text-[#0F172A]">
      <span>
        {children} <span className="text-[#FF4D30]">*</span>
      </span>
    </Label>
  );
}

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

export default function CadastroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [cpfCnpjError, setCpfCnpjError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpfCnpj: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    if (field === "password") {
      setPasswordErrors(value ? validatePassword(value) : []);
    }
    if (field === "cpfCnpj") {
      const digits = onlyDigits(value);
      // Só valida quando o documento está completo (11 = CPF, 14 = CNPJ)
      if (digits.length === 11 || digits.length === 14) {
        setCpfCnpjError(validateCpfCnpj(digits) ? "" : "CPF ou CNPJ inválido. Verifique os números.");
      } else {
        setCpfCnpjError("");
      }
    }
  }

  function formatPhone(value: string) {
    const d = value.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 10) {
      return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    }
    return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  }

  function formatCpfCnpj(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return digits
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.cpfCnpj || !form.phone || !form.password) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!validateCpfCnpj(form.cpfCnpj)) {
      setCpfCnpjError("CPF ou CNPJ inválido. Verifique os números.");
      setError("CPF ou CNPJ inválido.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const pwErrors = validatePassword(form.password);
    if (pwErrors.length > 0) {
      setError("Senha fraca: " + pwErrors.join(", "));
      return;
    }

    if (!acceptedTerms) {
      setError("Você precisa aceitar os termos de uso.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          cpfCnpj: form.cpfCnpj,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        setIsLoading(false);
        return;
      }

      // Auto-login
      const result = await signIn("credentials", {
        email: form.email.toLowerCase().trim(),
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
        router.push(callbackUrl || "/painel");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-[#0F172A]">Criar Conta</CardTitle>
        <CardDescription className="text-gray-500">
          Preencha os dados abaixo para se cadastrar
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
            <RequiredLabel htmlFor="name">Nome completo</RequiredLabel>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="pl-10"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="email">E-mail</RequiredLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="cpfCnpj">CPF ou CNPJ</RequiredLabel>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="cpfCnpj"
                type="text"
                placeholder="000.000.000-00"
                className={`pl-10 ${cpfCnpjError ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                value={form.cpfCnpj}
                onChange={(e) => handleChange("cpfCnpj", formatCpfCnpj(e.target.value))}
                maxLength={18}
                required
              />
            </div>
            {cpfCnpjError && (
              <p className="text-xs text-red-500">{cpfCnpjError}</p>
            )}
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="phone">Telefone / WhatsApp</RequiredLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                className="pl-10"
                value={form.phone}
                onChange={(e) => handleChange("phone", formatPhone(e.target.value))}
                maxLength={16}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="password">Senha</RequiredLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mín. 8 chars, 1 maiúsc., 1 núm., 1 especial"
                className="pl-10 pr-10"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.password && passwordErrors.length > 0 && (
              <div className="text-xs text-red-500 space-y-0.5">
                {passwordErrors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="confirmPassword">Confirmar senha</RequiredLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                className="pl-10 pr-10"
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-0.5 shrink-0"
            />
            <label
              htmlFor="terms"
              className="cursor-pointer text-sm leading-relaxed text-gray-600"
            >
              Li e aceito os{" "}
              <Link href="/termos" className="font-medium text-[#FF4D30] hover:underline whitespace-nowrap">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="font-medium text-[#FF4D30] hover:underline">
                Política de Privacidade
              </Link>
              .
            </label>
          </div>

          <p className="text-xs text-gray-400">
            <span className="text-[#FF4D30]">*</span> Campos obrigatórios
          </p>

          <Button
            type="submit"
            className="w-full bg-[#FF4D30] hover:bg-[#E8432A] text-white font-semibold"
            disabled={isLoading || !acceptedTerms}
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#FF4D30] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
