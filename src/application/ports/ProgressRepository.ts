import type { SkillId, SkillProgress } from "../../domain/learning/Skill";

export interface ProgressRepository {
  get(profileId: string, skillId: SkillId): Promise<SkillProgress | null>;
  save(progress: SkillProgress): Promise<void>;
}
