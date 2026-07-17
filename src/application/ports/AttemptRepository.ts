import type { ExerciseAttempt } from "../../domain/attempts/ExerciseAttempt";

export interface AttemptRepository {
  save(attempt: ExerciseAttempt): Promise<void>;
  listByProfile(profileId: string): Promise<ExerciseAttempt[]>;
}
