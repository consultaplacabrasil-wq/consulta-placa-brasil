// Decodificação básica do chassi (VIN) pelos dígitos — determinístico.
// Não precisa de API: 1º caractere = origem, 3 primeiros = montadora (WMI), 10º = ano-modelo.

export interface ChassiDecode {
  chassi: string;
  origem: string;
  montadora: string;
  anoModelo: string;
  valido: boolean; // 17 caracteres
}

// País/região pelo 1º caractere do VIN
const ORIGEM_CHAR1: Record<string, string> = {
  "1": "Estados Unidos", "4": "Estados Unidos", "5": "Estados Unidos",
  "2": "Canadá", "3": "México",
  "8": "América do Sul (Argentina/Chile)", "9": "Brasil / América do Sul",
  J: "Japão", K: "Coreia do Sul", L: "China", M: "Índia / Indonésia",
  N: "Turquia / Oriente Médio", R: "Taiwan / Ásia",
  S: "Reino Unido", T: "Suíça / Hungria", U: "Romênia / Eslováquia",
  V: "França / Espanha", W: "Alemanha", X: "Rússia",
  Y: "Suécia / Finlândia", Z: "Itália",
};

// Montadora pelo WMI (3 primeiros) — principais do mercado BR
const WMI_MONTADORA: Record<string, string> = {
  "9BD": "Fiat", "8AP": "Fiat", "9BF": "Ford", "9BG": "Chevrolet (GM)",
  "9BW": "Volkswagen", "8AW": "Volkswagen", "9BV": "Volkswagen / Volvo",
  "93H": "Honda", "93Y": "Renault", "8A1": "Renault", "93R": "Toyota",
  "9BR": "Toyota", "94D": "Nissan", "94B": "Nissan", "9BH": "Hyundai",
  "95P": "Hyundai / CAOA", "9BM": "Mercedes-Benz", "WDB": "Mercedes-Benz",
  "WDC": "Mercedes-Benz", "WDD": "Mercedes-Benz", "WMX": "Mercedes-Benz",
  "WBA": "BMW", "WBS": "BMW", "WAU": "Audi", "WVW": "Volkswagen",
  "WV1": "Volkswagen", "93X": "Mitsubishi", "9BS": "Scania", "9Bated": "Iveco",
  "LB3": "Chery / Caoa", "LVS": "Ford", "LFV": "Volkswagen",
};

// Ano-modelo pelo 10º caractere (ciclo 2010+; sem I,O,Q,U,Z e 0)
const ANO_CHAR10: Record<string, number> = {
  A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016, H: 2017,
  J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023, R: 2024, S: 2025,
  T: 2026, V: 2027, W: 2028, X: 2029, Y: 2030,
  "1": 2001, "2": 2002, "3": 2003, "4": 2004, "5": 2005,
  "6": 2006, "7": 2007, "8": 2008, "9": 2009,
};

export function decodeChassi(chassiRaw: string): ChassiDecode | null {
  const chassi = (chassiRaw || "").replace(/[^A-HJ-NPR-Z0-9]/gi, "").toUpperCase();
  if (chassi.length < 11) return null; // precisa ao menos do WMI + posição do ano

  const c1 = chassi[0];
  const wmi = chassi.slice(0, 3);
  const c10 = chassi[9];
  const ano = ANO_CHAR10[c10];

  return {
    chassi: chassiRaw,
    origem: ORIGEM_CHAR1[c1] || "Não identificada",
    montadora: WMI_MONTADORA[wmi] || "Não identificada",
    anoModelo: ano ? String(ano) : "—",
    valido: chassi.length === 17,
  };
}
