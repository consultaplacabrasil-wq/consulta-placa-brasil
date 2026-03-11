/**
 * Validates password strength — rejects weak passwords like
 * sequential numbers, repeated characters, common patterns, etc.
 * Returns null if valid, or an error message string if invalid.
 */

const COMMON_PASSWORDS = [
  "12345678", "123456789", "1234567890",
  "87654321", "987654321",
  "11111111", "22222222", "33333333", "44444444",
  "55555555", "66666666", "77777777", "88888888", "99999999", "00000000",
  "aaaaaaaa", "bbbbbbbb", "cccccccc",
  "abcdefgh", "abcd1234", "qwerty12", "qwertyui",
  "password", "senha123", "12341234",
  "aabbccdd", "abc12345", "admin123", "user1234",
];

function hasAllSameChars(password: string): boolean {
  return password.split("").every((c) => c === password[0]);
}

function isSequentialNumbers(password: string): boolean {
  if (!/^\d+$/.test(password)) return false;
  let ascending = true;
  let descending = true;
  for (let i = 1; i < password.length; i++) {
    if (Number(password[i]) !== Number(password[i - 1]) + 1) ascending = false;
    if (Number(password[i]) !== Number(password[i - 1]) - 1) descending = false;
  }
  return ascending || descending;
}

function hasRepeatingPattern(password: string): boolean {
  // Check for 2-char repeating pattern like "abababab"
  for (let len = 1; len <= 3; len++) {
    const pattern = password.slice(0, len);
    if (pattern.repeat(Math.ceil(password.length / len)).slice(0, password.length) === password) {
      return true;
    }
  }
  return false;
}

export function validatePasswordStrength(password: string): string | null {
  if (!password || password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres";
  }

  const lower = password.toLowerCase();

  if (COMMON_PASSWORDS.includes(lower)) {
    return "Esta senha é muito comum. Escolha uma senha mais forte";
  }

  if (hasAllSameChars(lower)) {
    return "A senha não pode conter apenas caracteres repetidos";
  }

  if (isSequentialNumbers(password)) {
    return "A senha não pode ser uma sequência numérica";
  }

  if (hasRepeatingPattern(lower)) {
    return "A senha não pode ser um padrão repetitivo";
  }

  // Must contain at least 2 of: uppercase, lowercase, numbers, special chars
  let complexity = 0;
  if (/[a-z]/.test(password)) complexity++;
  if (/[A-Z]/.test(password)) complexity++;
  if (/[0-9]/.test(password)) complexity++;
  if (/[^a-zA-Z0-9]/.test(password)) complexity++;

  if (complexity < 2) {
    return "A senha deve conter pelo menos letras e números";
  }

  return null;
}
