import type { AttemptRepository } from "../../../application/ports/AttemptRepository";
import type { ExerciseAttempt } from "../../../domain/attempts/ExerciseAttempt";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

export class IndexedDbAttemptRepository implements AttemptRepository {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async save(attempt: ExerciseAttempt): Promise<void> {
    await this.client.put(STORES.attempts, attempt);
  }

  public async listByProfile(
    profileId: string,
  ): Promise<ExerciseAttempt[]> {
    const attempts =
      await this.client.getAll<ExerciseAttempt>(STORES.attempts);

    return attempts.filter(
      (attempt) => attempt.profileId === profileId,
    );
  }
}
