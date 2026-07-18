import type {
  MissingLetterExercise,
  WordEntry,
} from "./WordEntry";
import type { RandomSource } from "../exercises/MathExercise";
import { defaultRandomSource } from "../exercises/MathExercise";

const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z", "Ç", "Ã", "Õ",
] as const;

export class MissingLetterGenerator {
  public constructor(
    private readonly words: readonly WordEntry[],
    private readonly random: RandomSource = defaultRandomSource,
    private readonly createId: () => string = () => crypto.randomUUID(),
  ) {}

  public generate(age: number, level: number): MissingLetterExercise {
    const candidates = this.words.filter(
      (word) =>
        word.enabled &&
        age >= word.ageMin &&
        age <= word.ageMax &&
        Math.abs(word.difficulty - level) <= 1,
    );

    const fallback = this.words.filter(
      (word) => word.enabled && age >= word.ageMin && age <= word.ageMax,
    );

    const pool = candidates.length > 0 ? candidates : fallback;

    if (pool.length === 0) {
      throw new Error("Não existem palavras adequadas para este perfil.");
    }

    const selected = pool[this.integer(0, pool.length - 1)];
    if (!selected) {
      throw new Error("Não foi possível selecionar uma palavra.");
    }

    const missingIndex = this.selectMissingIndex(selected.word);
    const answer = selected.word[missingIndex];

    if (!answer) {
      throw new Error("Não foi possível remover uma letra.");
    }

    const prompt =
      selected.word.slice(0, missingIndex) +
      "_" +
      selected.word.slice(missingIndex + 1);

    return {
      id: this.createId(),
      wordId: selected.id,
      prompt,
      completeWord: selected.word,
      missingIndex,
      answer,
      options: this.createOptions(answer),
      difficulty: selected.difficulty,
      imageLabel: selected.imageLabel,
    };
  }

  private selectMissingIndex(word: string): number {
    const preferredIndexes = [...word]
      .map((character, index) => ({ character, index }))
      .filter(({ character }) => character !== " ");

    return (
      preferredIndexes[
        this.integer(0, Math.max(0, preferredIndexes.length - 1))
      ]?.index ?? 0
    );
  }

  private createOptions(answer: string): readonly string[] {
    const options = new Set<string>([answer]);
    let guard = 0;

    while (options.size < 4 && guard < ALPHABET.length * 2) {
      guard += 1;
      const candidate = ALPHABET[this.integer(0, ALPHABET.length - 1)];
      if (candidate) {
        options.add(candidate);
      }
    }

    for (const candidate of ALPHABET) {
      if (options.size >= 4) break;
      options.add(candidate);
    }

    return this.shuffle([...options]);
  }

  private integer(min: number, max: number): number {
    return Math.floor(this.random.next() * (max - min + 1)) + min;
  }

  private shuffle(values: string[]): string[] {
    return values
      .map((value) => ({ value, order: this.random.next() }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }
}
