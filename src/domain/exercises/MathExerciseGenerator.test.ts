import { describe, expect, it } from "vitest";
import { MathExerciseGenerator } from "./MathExerciseGenerator";
import type { RandomSource } from "./MathExercise";

class FixedRandom implements RandomSource {
  public next(): number {
    return 0.4;
  }
}

describe("MathExerciseGenerator", () => {
  it("gera multiplicação válida", () => {
    const generator = new MathExerciseGenerator(
      new FixedRandom(),
      () => "exercise-1",
    );

    const exercise = generator.generate("math.multiplication", 3);

    expect(exercise.options).toContain(exercise.answer);
    expect(new Set(exercise.options).size).toBe(4);
  });

  it("gera divisão exata", () => {
    const generator = new MathExerciseGenerator(
      new FixedRandom(),
      () => "exercise-2",
    );

    const exercise = generator.generate("math.division", 3);

    expect(Number.isInteger(exercise.answer)).toBe(true);
    expect(exercise.answer).toBeGreaterThan(0);
  });
});
