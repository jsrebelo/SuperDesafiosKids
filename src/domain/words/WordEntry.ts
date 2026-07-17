export interface WordEntry {
  readonly id: string;
  readonly word: string;
  readonly normalizedWord: string;
  readonly syllables: readonly string[];
  readonly category: string;
  readonly ageMin: number;
  readonly ageMax: number;
  readonly difficulty: number;
  readonly imageLabel: string;
  readonly enabled: boolean;
}

export interface MissingLetterExercise {
  readonly id: string;
  readonly wordId: string;
  readonly prompt: string;
  readonly completeWord: string;
  readonly missingIndex: number;
  readonly answer: string;
  readonly options: readonly string[];
  readonly difficulty: number;
  readonly imageLabel: string;
}
