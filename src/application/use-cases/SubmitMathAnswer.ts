import type { ProgressRepository } from "../ports/ProgressRepository";
import type { MathExercise } from "../../domain/exercises/MathExercise";
import {
  createInitialSkillProgress,
  type SkillProgress,
} from "../../domain/learning/Skill";
import { AdaptiveLearningEngine } from "../../domain/learning/AdaptiveLearningEngine";

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
}

export class SubmitMathAnswer {
  public constructor(
    private readonly repository: ProgressRepository,
    private readonly engine: AdaptiveLearningEngine,
  ) {}

  public async execute(
    input: SubmitMathAnswerInput,
  ): Promise<SubmitMathAnswerOutput> {
    const current =
      (await this.repository.get(input.profileId, input.exercise.skillId)) ??
      createInitialSkillProgress(
        input.profileId,
        input.exercise.skillId,
        input.profileAge,
      );

    const correct = input.selectedAnswer === input.exercise.answer;
    const progress = this.engine.update(current, {
      correct,
      responseTimeMs: input.responseTimeMs,
      hintsUsed: input.hintsUsed,
    });

    await this.repository.save(progress);
    return { correct, progress };
  }
}
