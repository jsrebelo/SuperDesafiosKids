import { describe, expect, it } from "vitest";
import { MathExerciseGenerator } from "./MathExerciseGenerator";
import type { RandomSource } from "./MathExercise";

class FixedRandom implements RandomSource {
  public next(): number {
    return 0.4;
  }
}

describe("MathExerciseGenerator", () => {
  it("gera soma com quatro opções únicas", () => {
    const generator = new MathExerciseGenerator(
      new FixedRandom(),
      () => "exercise-1",
    );
    const exercise = generator.generate("math.addition", 2);

    expect(exercise.options).toContain(exercise.answer);
    expect(new Set(exercise.options).size).toBe(4);
  });

  it("não gera subtração negativa", () => {
    const generator = new MathExerciseGenerator(
      new FixedRandom(),
      () => "exercise-2",
    );
    const exercise = generator.generate("math.subtraction", 3);
    expect(exercise.answer).toBeGreaterThanOrEqual(0);
  });
});
