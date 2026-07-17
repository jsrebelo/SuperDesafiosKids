import type { ChildProfile } from "../profiles/ChildProfile";
import type { SkillProgress } from "../learning/Skill";
import type { ExerciseAttempt } from "../attempts/ExerciseAttempt";
import type { RewardWallet } from "../rewards/RewardWallet";

export interface ImportedProfileData {
  readonly schemaVersion: number;
  readonly exportedAt: string;
  readonly profile: ChildProfile;
  readonly progress: readonly SkillProgress[];
  readonly attempts: readonly ExerciseAttempt[];
  readonly reward: RewardWallet | null;
}

export function isImportedProfileData(
  value: unknown,
): value is ImportedProfileData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<ImportedProfileData>;

  return (
    typeof item.schemaVersion === "number" &&
    typeof item.exportedAt === "string" &&
    isProfile(item.profile) &&
    Array.isArray(item.progress) &&
    Array.isArray(item.attempts) &&
    (item.reward === null || isReward(item.reward))
  );
}

function isProfile(value: unknown): value is ChildProfile {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ChildProfile>;

  return (
    typeof item.id === "string" &&
    typeof item.displayName === "string" &&
    typeof item.age === "number" &&
    typeof item.avatarId === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string" &&
    typeof item.isActive === "boolean"
  );
}

function isReward(value: unknown): value is RewardWallet {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<RewardWallet>;

  return (
    typeof item.profileId === "string" &&
    typeof item.xp === "number" &&
    typeof item.coins === "number" &&
    typeof item.stars === "number" &&
    typeof item.updatedAt === "string"
  );
}
