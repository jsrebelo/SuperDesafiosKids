import { describe, expect, it } from "vitest";
import { AdaptiveLearningEngine } from "./AdaptiveLearningEngine";
import type { SkillProgress } from "./Skill";

const base: SkillProgress = {
  profileId: "p1",
  skillId: "math.addition",
  level: 2,
  attempts: 4,
  correctAnswers: 4,
  consecutiveErrors: 0,
  updatedAt: "2026-07-17T10:00:00.000Z",
};

describe("AdaptiveLearningEngine", () => {
  it("sobe o nível após bom desempenho", () => {
    const updated = new AdaptiveLearningEngine().update(base, {
      correct: true,
      responseTimeMs: 5000,
      hintsUsed: 0,
    });
    expect(updated.level).toBe(3);
  });

  it("reduz após três erros consecutivos", () => {
    const updated = new AdaptiveLearningEngine().update(
      { ...base, level: 3, consecutiveErrors: 2 },
      { correct: false, responseTimeMs: 20000, hintsUsed: 1 },
    );
    expect(updated.level).toBe(2);
  });
});
