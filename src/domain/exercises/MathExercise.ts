import type { SkillId } from "../learning/Skill";

export type MathSkillId = Extract<SkillId, `math.${string}`>;

export interface MathExercise {
  readonly id: string;
  readonly skillId: MathSkillId;
  readonly prompt: string;
  readonly answer: number;
  readonly options: readonly number[];
  readonly difficulty: number;
}

export interface RandomSource {
  next(): number;
}

export const defaultRandomSource: RandomSource = {
  next: () => Math.random(),
};
