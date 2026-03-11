/**
 * Validates password strength.
 * Requirements:
 * - Min 8 characters
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character (!@#$%^&* etc.)
 * - No sequential numbers (123, 321, 111, etc.)
 * Returns null if valid, or an error message string if invalid.
 */

function containsSequentialNumbers(password: string): boolean {
  for (let i = 0; i < password.length - 2; i++) {
    const a = password.charCodeAt(i);
    const b = password.charCodeAt(i + 1);
    const c = password.charCodeAt(i + 2);

    // Only check digit characters
    if (a < 48 || a > 57 || b < 48 || b > 57 || c < 48 || c > 57) continue;

    // Ascending: 123, 456, 789
    if (b === a + 1 && c === b + 1) return true;
    // Descending: 321, 654, 987
    if (b === a - 1 && c === b - 1) return true;
    // Repeated: 111, 222, 000
    if (a === b && b === c) return true;
  }
  return false;
}

export function validatePasswordStrength(password: string): string | null {
  if (!password || password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve conter pelo menos 1 letra maiúscula";
  }

  if (!/[0-9]/.test(password)) {
    return "A senha deve conter pelo menos 1 número";
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "A senha deve conter pelo menos 1 caractere especial (!@#$%&*)";
  }

  if (containsSequentialNumbers(password)) {
    return "A senha não pode conter sequências numéricas (ex: 123, 321, 111)";
  }

  return null;
}
