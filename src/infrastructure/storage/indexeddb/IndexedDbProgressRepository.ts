import type { ProgressRepository } from "../../../application/ports/ProgressRepository";
import type {
  SkillId,
  SkillProgress,
} from "../../../domain/learning/Skill";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

export class IndexedDbProgressRepository implements ProgressRepository {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async get(
    profileId: string,
    skillId: SkillId,
  ): Promise<SkillProgress | null> {
    return this.client.get<SkillProgress>(
      STORES.progress,
      [profileId, skillId],
    );
  }

  public async save(progress: SkillProgress): Promise<void> {
    await this.client.put(STORES.progress, progress);
  }
}
