export function normalizeIndianPhoneNumber(input?: string | null) {
  if (!input) {
    return null;
  }

  const digits = input.replace(/\D/g, "");

  if (digits.length === 10) {
    return digits;
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  return null;
}

export function isValidIndianPhoneNumber(input?: string | null) {
  if (!input) {
    return false;
  }

  const normalized = normalizeIndianPhoneNumber(input);
  if (!normalized) {
    return false;
  }

  return /^[6-9]\d{9}$/.test(normalized);
}
