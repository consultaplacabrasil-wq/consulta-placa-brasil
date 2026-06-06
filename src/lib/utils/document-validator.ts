// Validação de CPF (11 dígitos) e CNPJ (14 dígitos) com dígitos verificadores.

function onlyDigits(s: string): string {
  return (s || "").replace(/\D/g, "");
}

export function validateCpf(value: string): boolean {
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

export function validateCnpj(value: string): boolean {
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

// Valida como CPF (11 dígitos) ou CNPJ (14 dígitos)
export function validateCpfCnpj(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length === 11) return validateCpf(d);
  if (d.length === 14) return validateCnpj(d);
  return false;
}
