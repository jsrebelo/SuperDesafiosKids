import type { ProgressRepository } from "../../application/ports/ProgressRepository";
import type { SkillId, SkillProgress } from "../../domain/learning/Skill";

const STORAGE_KEY = "sdk.skillProgress.v1";

export class BrowserProgressRepository implements ProgressRepository {
  public async get(
    profileId: string,
    skillId: SkillId,
  ): Promise<SkillProgress | null> {
    return (
      this.readAll().find(
        (item) => item.profileId === profileId && item.skillId === skillId,
      ) ?? null
    );
  }

  public async save(progress: SkillProgress): Promise<void> {
    const next = this.readAll().filter(
      (item) =>
        !(
          item.profileId === progress.profileId &&
          item.skillId === progress.skillId
        ),
    );

    next.push(progress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  private readAll(): SkillProgress[] {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as SkillProgress[]) : [];
    } catch {
      return [];
    }
  }
}
