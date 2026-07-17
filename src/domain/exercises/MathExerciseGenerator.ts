import {
  defaultRandomSource,
  type MathExercise,
  type RandomSource,
} from "./MathExercise";
import type { SkillId } from "../learning/Skill";

export class MathExerciseGenerator {
  public constructor(
    private readonly random: RandomSource = defaultRandomSource,
    private readonly createId: () => string = crypto.randomUUID,
  ) {}

  public generate(skillId: SkillId, level: number): MathExercise {
    switch (skillId) {
      case "math.counting":
        return this.counting(level);
      case "math.addition":
        return this.addition(level);
      case "math.subtraction":
        return this.subtraction(level);
      case "math.multiplication":
        return this.multiplication(level);
      case "math.division":
        return this.division(level);
      default:
        return this.addition(level);
    }
  }

  private counting(level: number): MathExercise {
    const max = [5, 10, 20, 50, 100][level - 1] ?? 10;
    const answer = this.integer(1, max);

    return this.build(
      "math.counting",
      `Quantos objetos existem? ${"⭐".repeat(Math.min(answer, 20))}`,
      answer,
      level,
      0,
      max,
    );
  }

  private addition(level: number): MathExercise {
    const max = [5, 10, 20, 50, 100][level - 1] ?? 10;
    const left = this.integer(0, max);
    const right = this.integer(0, max - left);

    return this.build(
      "math.addition",
      `${left} + ${right} = ?`,
      left + right,
      level,
      0,
      max,
    );
  }

  private subtraction(level: number): MathExercise {
    const max = [5, 10, 20, 50, 100][level - 1] ?? 10;
    const left = this.integer(0, max);
    const right = this.integer(0, left);

    return this.build(
      "math.subtraction",
      `${left} − ${right} = ?`,
      left - right,
      level,
      0,
      max,
    );
  }

  private multiplication(level: number): MathExercise {
    const tableMax = [2, 5, 5, 10, 12][level - 1] ?? 5;
    const left = this.integer(1, tableMax);
    const right = this.integer(1, 10);
    const answer = left * right;

    return this.build(
      "math.multiplication",
      `${left} × ${right} = ?`,
      answer,
      level,
      0,
      Math.max(answer + 12, tableMax * 10),
    );
  }

  private division(level: number): MathExercise {
    const divisorMax = [2, 3, 5, 10, 12][level - 1] ?? 3;
    const divisor = this.integer(1, divisorMax);
    const quotient = this.integer(1, 10);
    const dividend = divisor * quotient;

    return this.build(
      "math.division",
      `${dividend} ÷ ${divisor} = ?`,
      quotient,
      level,
      0,
      12,
    );
  }

  private build(
    skillId: SkillId,
    prompt: string,
    answer: number,
    difficulty: number,
    min: number,
    max: number,
  ): MathExercise {
    const options = new Set<number>([answer]);
    let guard = 0;

    while (options.size < 4 && guard < 50) {
      guard += 1;
      const spread = skillId === "math.multiplication" ? 6 : 3;
      const candidate = Math.max(
        min,
        Math.min(max, answer + this.integer(-spread, spread)),
      );
      options.add(candidate);
    }

    for (let value = min; options.size < 4 && value <= max + 10; value += 1) {
      options.add(value);
    }

    return {
      id: this.createId(),
      skillId,
      prompt,
      answer,
      options: this.shuffle([...options].slice(0, 4)),
      difficulty,
    };
  }

  private integer(min: number, max: number): number {
    return Math.floor(this.random.next() * (max - min + 1)) + min;
  }

  private shuffle(values: number[]): number[] {
    return values
      .map((value) => ({ value, order: this.random.next() }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }
}
