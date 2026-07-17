import type { AttemptRepository } from "../../application/ports/AttemptRepository";
import type { ExerciseAttempt } from "../../domain/attempts/ExerciseAttempt";

const STORAGE_KEY = "sdk.exerciseAttempts.v1";

export class BrowserAttemptRepository implements AttemptRepository {
  public async save(attempt: ExerciseAttempt): Promise<void> {
    const attempts = this.readAll();
    attempts.push(attempt);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }

  public async listByProfile(profileId: string): Promise<ExerciseAttempt[]> {
    return this.readAll().filter((attempt) => attempt.profileId === profileId);
  }

  private readAll(): ExerciseAttempt[] {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ExerciseAttempt[]) : [];
    } catch {
      return [];
    }
  }
}
