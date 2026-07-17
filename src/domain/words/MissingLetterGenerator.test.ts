import { describe, expect, it } from "vitest";
import type { RandomSource } from "../exercises/MathExercise";
import { MissingLetterGenerator } from "./MissingLetterGenerator";
import { portugueseWords } from "../../data/words/pt-PT";

class FixedRandom implements RandomSource {
  public next(): number {
    return 0.25;
  }
}

describe("MissingLetterGenerator", () => {
  it("gera uma palavra incompleta com quatro opções", () => {
    const generator = new MissingLetterGenerator(
      portugueseWords,
      new FixedRandom(),
      () => "exercise-1",
    );

    const exercise = generator.generate(6, 2);

    expect(exercise.prompt).toContain("_");
    expect(exercise.options).toContain(exercise.answer);
    expect(new Set(exercise.options).size).toBe(4);
  });

  it("seleciona palavras adequadas à idade", () => {
    const generator = new MissingLetterGenerator(
      portugueseWords,
      new FixedRandom(),
      () => "exercise-2",
    );

    const exercise = generator.generate(5, 1);
    const entry = portugueseWords.find((word) => word.id === exercise.wordId);

    expect(entry).toBeDefined();
    expect(entry?.ageMin).toBeLessThanOrEqual(5);
    expect(entry?.ageMax).toBeGreaterThanOrEqual(5);
  });
});
