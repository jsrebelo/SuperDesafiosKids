import { describe, expect, it } from "vitest";
import { calculateProfileStatistics } from "./ProfileStatistics";
import type { ExerciseAttempt } from "../attempts/ExerciseAttempt";

const attempts: ExerciseAttempt[] = [
  {
    id: "a1",
    profileId: "p1",
    gameId: "math",
    exerciseId: "e1",
    skillId: "math.addition",
    difficulty: 1,
    correct: true,
    responseTimeMs: 4000,
    hintsUsed: 0,
    createdAt: "2026-07-17T10:00:00.000Z",
  },
  {
    id: "a2",
    profileId: "p1",
    gameId: "words",
    exerciseId: "e2",
    skillId: "portuguese.missing-letter",
    difficulty: 1,
    correct: false,
    responseTimeMs: 6000,
    hintsUsed: 0,
    createdAt: "2026-07-17T10:01:00.000Z",
  },
];

describe("calculateProfileStatistics", () => {
  it("calcula métricas gerais e por competência", () => {
    const result = calculateProfileStatistics("p1", attempts);

    expect(result.attempts).toBe(2);
    expect(result.correctAnswers).toBe(1);
    expect(result.accuracy).toBe(0.5);
    expect(result.bySkill).toHaveLength(2);
  });
});
