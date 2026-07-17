import { describe, expect, it } from "vitest";
import type { ProfileRepository } from "../ports/ProfileRepository";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { AttemptRepository } from "../ports/AttemptRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { SkillId, SkillProgress } from "../../domain/learning/Skill";
import type { ExerciseAttempt } from "../../domain/attempts/ExerciseAttempt";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import { ExportProfileData } from "./ExportProfileData";

class ProfileRepo implements ProfileRepository {
  public async create(): Promise<void> {}
  public async update(): Promise<void> {}
  public async list(): Promise<ChildProfile[]> { return []; }
  public async setActive(): Promise<void> {}
  public async archive(): Promise<void> {}
  public async findById(): Promise<ChildProfile> {
    return {
      id: "p1",
      displayName: "Mia",
      age: 6,
      avatarId: "raposa",
      createdAt: "2026-07-17T10:00:00.000Z",
      updatedAt: "2026-07-17T10:00:00.000Z",
      isActive: true,
    };
  }
}

class ProgressRepo implements ProgressRepository {
  public async get(
    _profileId: string,
    _skillId: SkillId,
  ): Promise<SkillProgress | null> {
    return null;
  }
  public async save(): Promise<void> {}
}

class AttemptRepo implements AttemptRepository {
  public async save(): Promise<void> {}
  public async listByProfile(): Promise<ExerciseAttempt[]> {
    return [];
  }
}

class RewardRepo implements RewardRepository {
  public async get(): Promise<RewardWallet | null> {
    return null;
  }
  public async save(): Promise<void> {}
}

describe("ExportProfileData", () => {
  it("exporta JSON válido", async () => {
    const useCase = new ExportProfileData(
      new ProfileRepo(),
      new ProgressRepo(),
      new AttemptRepo(),
      new RewardRepo(),
    );

    const content = await useCase.execute("p1");
    const parsed = JSON.parse(content) as { profile: { id: string } };

    expect(parsed.profile.id).toBe("p1");
  });
});
