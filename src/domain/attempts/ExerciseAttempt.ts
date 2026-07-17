import type { SkillId } from "../learning/Skill";

export interface ExerciseAttempt {
  readonly id: string;
  readonly profileId: string;
  readonly gameId: "math" | "words";
  readonly exerciseId: string;
  readonly skillId: SkillId;
  readonly difficulty: number;
  readonly correct: boolean;
  readonly responseTimeMs: number;
  readonly hintsUsed: number;
  readonly createdAt: string;
}
