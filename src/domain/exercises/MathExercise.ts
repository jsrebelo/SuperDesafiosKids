import type { SkillId } from "../learning/Skill";

export interface MathExercise {
  readonly id: string;
  readonly skillId: SkillId;
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
