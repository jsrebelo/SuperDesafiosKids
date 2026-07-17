import type { ExerciseAttempt } from "../attempts/ExerciseAttempt";
import type { SkillId } from "../learning/Skill";

export interface SkillStatistic {
  readonly skillId: SkillId;
  readonly attempts: number;
  readonly correctAnswers: number;
  readonly accuracy: number;
  readonly averageResponseTimeMs: number;
}

export interface ProfileStatistics {
  readonly profileId: string;
  readonly attempts: number;
  readonly correctAnswers: number;
  readonly accuracy: number;
  readonly averageResponseTimeMs: number;
  readonly bySkill: readonly SkillStatistic[];
}

export function calculateProfileStatistics(
  profileId: string,
  attempts: readonly ExerciseAttempt[],
): ProfileStatistics {
  const profileAttempts = attempts.filter(
    (attempt) => attempt.profileId === profileId,
  );

  const correctAnswers = profileAttempts.filter(
    (attempt) => attempt.correct,
  ).length;

  const grouped = new Map<SkillId, ExerciseAttempt[]>();

  for (const attempt of profileAttempts) {
    const current = grouped.get(attempt.skillId) ?? [];
    current.push(attempt);
    grouped.set(attempt.skillId, current);
  }

  const bySkill: SkillStatistic[] = [...grouped.entries()].map(
    ([skillId, items]) => {
      const correct = items.filter((item) => item.correct).length;
      return {
        skillId,
        attempts: items.length,
        correctAnswers: correct,
        accuracy: items.length === 0 ? 0 : correct / items.length,
        averageResponseTimeMs: average(
          items.map((item) => item.responseTimeMs),
        ),
      };
    },
  );

  return {
    profileId,
    attempts: profileAttempts.length,
    correctAnswers,
    accuracy:
      profileAttempts.length === 0
        ? 0
        : correctAnswers / profileAttempts.length,
    averageResponseTimeMs: average(
      profileAttempts.map((attempt) => attempt.responseTimeMs),
    ),
    bySkill,
  };
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length,
  );
}
