export function extractRegistrationNumberFromEmail(email?: string | null) {
  if (!email) {
    return null;
  }

  const localPart = email.split("@")[0] ?? "";
  const normalized = localPart.replace(/[^a-zA-Z0-9]/g, "");

  const strictMatch = normalized.match(/\d{2}[a-zA-Z]{2,6}\d{3,6}/);
  if (strictMatch?.[0]) {
    return strictMatch[0].toUpperCase();
  }

  const relaxedMatch = localPart.match(/\d+[a-zA-Z]+\d+/);
  if (relaxedMatch?.[0]) {
    return relaxedMatch[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  }

  return null;
}
