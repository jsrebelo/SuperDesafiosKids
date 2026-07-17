import type { ProgressRepository } from "../ports/ProgressRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { MathExercise } from "../../domain/exercises/MathExercise";
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

export interface SubmitMathAnswerInput {
  readonly profileId: string;
  readonly profileAge: number;
  readonly exercise: MathExercise;
  readonly selectedAnswer: number;
  readonly responseTimeMs: number;
  readonly hintsUsed: number;
}

export interface SubmitMathAnswerOutput {
  readonly correct: boolean;
  readonly progress: SkillProgress;
  readonly wallet: RewardWallet;
  readonly xpEarned: number;
  readonly coinsEarned: number;
  readonly starsEarned: number;
}

export class SubmitMathAnswer {
  public constructor(
    private readonly progressRepository: ProgressRepository,
    private readonly rewardRepository: RewardRepository,
    private readonly engine: AdaptiveLearningEngine,
    private readonly rewardCalculator: RewardCalculator,
  ) {}

  public async execute(
    input: SubmitMathAnswerInput,
  ): Promise<SubmitMathAnswerOutput> {
    const currentProgress =
      (await this.progressRepository.get(
        input.profileId,
        input.exercise.skillId,
      )) ??
      createInitialSkillProgress(
        input.profileId,
        input.exercise.skillId,
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
