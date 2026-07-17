export type ChildAge = 5 | 6 | 7 | 8 | 9 | 10;

export interface ChildProfile {
  readonly id: string;
  readonly displayName: string;
  readonly age: ChildAge;
  readonly avatarId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly isActive: boolean;
}

export interface CreateChildProfileInput {
  readonly displayName: string;
  readonly age: ChildAge;
  readonly avatarId: string;
}

export function validateDisplayName(value: string): string {
  const normalized = value.trim();

  if (normalized.length < 1 || normalized.length > 20) {
    throw new Error("O nome deve ter entre 1 e 20 caracteres.");
  }

  return normalized;
}
