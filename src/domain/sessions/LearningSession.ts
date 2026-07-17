export interface LearningSessionSummary {
  readonly profileId: string;
  readonly startedAt: string;
  readonly endedAt: string;
  readonly attempts: number;
  readonly correctAnswers: number;
  readonly xpEarned: number;
  readonly coinsEarned: number;
  readonly starsEarned: number;
}
