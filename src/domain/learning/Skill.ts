export type SkillId =
  | "math.counting"
  | "math.addition"
  | "math.subtraction"
  | "math.multiplication"
  | "math.division";

export interface SkillProgress {
  readonly profileId: string;
  readonly skillId: SkillId;
  readonly level: number;
  readonly attempts: number;
  readonly correctAnswers: number;
  readonly consecutiveErrors: number;
  readonly updatedAt: string;
}

export function createInitialSkillProgress(
  profileId: string,
  skillId: SkillId,
  age: number,
  now: Date = new Date(),
): SkillProgress {
  return {
    profileId,
    skillId,
    level: age <= 5 ? 1 : age <= 6 ? 2 : age <= 8 ? 3 : age <= 9 ? 4 : 5,
    attempts: 0,
    correctAnswers: 0,
    consecutiveErrors: 0,
    updatedAt: now.toISOString(),
  };
}
