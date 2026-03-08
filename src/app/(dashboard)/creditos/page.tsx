import { Coins, Zap, Star, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CREDIT_PACKAGES, formatCurrency } from "@/constants";

export const metadata = {
  title: "Creditos - ConsultaPlaca",
};

const packageIcons = [Zap, Star, Crown];

export default function CreditosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Creditos</h1>
        <p className="text-gray-500 text-sm">Gerencie seus creditos para consultas</p>
      </div>

      {/* Current balance */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-[#FF4D30] to-[#E8432A] text-white">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Coins className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-red-100">Saldo atual</p>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm text-red-100">creditos disponiveis</p>
          </div>
        </CardContent>
      </Card>

      {/* Credit packages */}
      <div>
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Pacotes de Creditos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDIT_PACKAGES.map((pkg, index) => {
            const Icon = packageIcons[index % packageIcons.length];
            return (
              <Card
                key={pkg.credits}
                className={`border shadow-sm transition-shadow hover:shadow-md ${
                  index === 1 ? "border-[#FF4D30] ring-1 ring-[#FF4D30]" : "border-gray-200"
                }`}
              >
                {index === 1 && (
                  <div className="bg-[#FF4D30] text-white text-center text-xs font-semibold py-1 rounded-t-lg">
                    Mais Popular
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-2">
                    <Icon className="h-6 w-6 text-[#FF4D30]" />
                  </div>
                  <CardTitle className="text-lg font-bold text-[#0F172A]">
                    Pacote {pkg.credits} créditos
                  </CardTitle>
                  <p className="text-sm text-gray-500">{pkg.credits} créditos</p>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <span className="text-3xl font-bold text-[#0F172A]">
                      {formatCurrency(pkg.price)}
                    </span>
                    {pkg.credits > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatCurrency(pkg.price / pkg.credits)} por credito
                      </p>
                    )}
                  </div>
                  <Button
                    className={`w-full font-semibold ${
                      index === 1
                        ? "bg-[#FF4D30] hover:bg-[#E8432A] text-white"
                        : "bg-white border border-[#FF4D30] text-[#FF4D30] hover:bg-red-50"
                    }`}
                  >
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
