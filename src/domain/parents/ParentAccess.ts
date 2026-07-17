export interface ParentAccessState {
  readonly pinHash: string | null;
}

export async function hashPin(pin: string): Promise<string> {
  if (!/^\d{4}$/.test(pin)) {
    throw new Error("O PIN deve ter quatro algarismos.");
  }

  const bytes = new TextEncoder().encode(pin);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPin(
  pin: string,
  expectedHash: string,
): Promise<boolean> {
  return (await hashPin(pin)) === expectedHash;
}
