import type { ProgressRepository } from "../ports/ProgressRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { AttemptRepository } from "../ports/AttemptRepository";
import type { MissingLetterExercise } from "../../domain/words/WordEntry";
import {
  createInitialSkillProgress,
  type SkillProgress,
} from "../../domain/learning/Skill";
import { AdaptiveLearningEngine } from "../../domain/learning/AdaptiveLearningEngine";
import {
  createRewardWallet,
  type RewardWallet,
} from "../../domain/rewards/RewardWallet";
import { RewardCalculator } from "../../domain/rewards/RewardCalculator";

export interface SubmitWordAnswerInput {
  readonly profileId: string;
  readonly profileAge: number;
  readonly exercise: MissingLetterExercise;
  readonly selectedAnswer: string;
  readonly responseTimeMs: number;
  readonly hintsUsed: number;
}

export interface SubmitWordAnswerOutput {
  readonly correct: boolean;
  readonly progress: SkillProgress;
  readonly wallet: RewardWallet;
  readonly xpEarned: number;
  readonly coinsEarned: number;
  readonly starsEarned: number;
}

export class SubmitWordAnswer {
  public constructor(
    private readonly progressRepository: ProgressRepository,
    private readonly rewardRepository: RewardRepository,
    private readonly attemptRepository: AttemptRepository,
    private readonly engine: AdaptiveLearningEngine,
    private readonly rewardCalculator: RewardCalculator,
    private readonly createId: () => string = () => crypto.randomUUID(),
  ) {}

  public async execute(
    input: SubmitWordAnswerInput,
  ): Promise<SubmitWordAnswerOutput> {
    const skillId = "portuguese.missing-letter" as const;

    const currentProgress =
      (await this.progressRepository.get(input.profileId, skillId)) ??
      createInitialSkillProgress(
        input.profileId,
        skillId,
        input.profileAge,
      );

    const currentWallet =
      (await this.rewardRepository.get(input.profileId)) ??
      createRewardWallet(input.profileId);

    const correct = input.selectedAnswer === input.exercise.answer;

    const progress = this.engine.update(currentProgress, {
      correct,
      responseTimeMs: input.responseTimeMs,
      hintsUsed: input.hintsUsed,
    });

    const reward = this.rewardCalculator.calculate(currentWallet, {
      correct,
      responseTimeMs: input.responseTimeMs,
      hintsUsed: input.hintsUsed,
    });

    await this.progressRepository.save(progress);
    await this.rewardRepository.save(reward.wallet);
    await this.attemptRepository.save({
      id: this.createId(),
      profileId: input.profileId,
      gameId: "words",
      exerciseId: input.exercise.id,
      skillId,
      difficulty: input.exercise.difficulty,
      correct,
      responseTimeMs: input.responseTimeMs,
      hintsUsed: input.hintsUsed,
      createdAt: new Date().toISOString(),
    });

    return {
      correct,
      progress,
      wallet: reward.wallet,
      xpEarned: reward.xpEarned,
      coinsEarned: reward.coinsEarned,
      starsEarned: reward.starsEarned,
    };
  }
}
