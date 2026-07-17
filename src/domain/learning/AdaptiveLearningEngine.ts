import type { SkillProgress } from "./Skill";

export interface AttemptResult {
  readonly correct: boolean;
  readonly responseTimeMs: number;
  readonly hintsUsed: number;
}

export class AdaptiveLearningEngine {
  public update(
    progress: SkillProgress,
    result: AttemptResult,
    now: Date = new Date(),
  ): SkillProgress {
    const attempts = progress.attempts + 1;
    const correctAnswers = progress.correctAnswers + (result.correct ? 1 : 0);
    const consecutiveErrors = result.correct ? 0 : progress.consecutiveErrors + 1;
    const accuracy = correctAnswers / attempts;
    let level = progress.level;

    if (
      attempts >= 5 &&
      accuracy >= 0.8 &&
      result.hintsUsed <= 1 &&
      result.responseTimeMs <= 15000
    ) {
      level = Math.min(5, level + 1);
    } else if (
      consecutiveErrors >= 3 ||
      (attempts >= 5 && accuracy <= 0.4)
    ) {
      level = Math.max(1, level - 1);
    }

    return {
      ...progress,
      level,
      attempts,
      correctAnswers,
      consecutiveErrors,
      updatedAt: now.toISOString(),
    };
  }
}
