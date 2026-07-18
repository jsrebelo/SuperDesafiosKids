import { describe, expect, it } from "vitest";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { SkillId, SkillProgress } from "../../domain/learning/Skill";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import { AdaptiveLearningEngine } from "../../domain/learning/AdaptiveLearningEngine";
import { RewardCalculator } from "../../domain/rewards/RewardCalculator";
import { SubmitWordAnswer } from "./SubmitWordAnswer";
import type { AttemptRepository } from "../ports/AttemptRepository";
import type { ExerciseAttempt } from "../../domain/attempts/ExerciseAttempt";

class MemoryProgressRepository implements ProgressRepository {
  private value: SkillProgress | null = null;

  public async get(
    _profileId: string,
    _skillId: SkillId,
  ): Promise<SkillProgress | null> {
    return this.value;
  }

  public async save(progress: SkillProgress): Promise<void> {
    this.value = progress;
  }
}

class MemoryRewardRepository implements RewardRepository {
  private value: RewardWallet | null = null;

  public async get(_profileId: string): Promise<RewardWallet | null> {
    return this.value;
  }

  public async save(wallet: RewardWallet): Promise<void> {
    this.value = wallet;
  }
}

class MemoryAttemptRepository implements AttemptRepository {
  public attempts: ExerciseAttempt[] = [];

  public async save(attempt: ExerciseAttempt): Promise<void> {
    this.attempts.push(attempt);
  }

  public async listByProfile(profileId: string): Promise<ExerciseAttempt[]> {
    return this.attempts.filter((attempt) => attempt.profileId === profileId);
  }
}

describe("SubmitWordAnswer", () => {
  it("atribui recompensa por resposta correta", async () => {
    const useCase = new SubmitWordAnswer(
      new MemoryProgressRepository(),
      new MemoryRewardRepository(),
      new MemoryAttemptRepository(),
      new AdaptiveLearningEngine(),
      new RewardCalculator(),
    );

    const output = await useCase.execute({
      profileId: "p1",
      profileAge: 6,
      exercise: {
        id: "e1",
        wordId: "word_gato",
        prompt: "G_TO",
        completeWord: "GATO",
        missingIndex: 1,
        answer: "A",
        options: ["A", "E", "I", "O"],
        difficulty: 1,
        imageLabel: "🐱",
      },
      selectedAnswer: "A",
      responseTimeMs: 3000,
      hintsUsed: 0,
    });

    expect(output.correct).toBe(true);
    expect(output.xpEarned).toBeGreaterThan(0);
    expect(output.coinsEarned).toBeGreaterThan(0);
  });
});
