import { describe, expect, it } from "vitest";
import type { ProfileRepository } from "../ports/ProfileRepository";
import { CreateChildProfile } from "./CreateChildProfile";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";

class MemoryProfileRepository implements ProfileRepository {
  public profiles: ChildProfile[] = [];

  public async create(profile: ChildProfile): Promise<void> {
    this.profiles.push(profile);
  }

  public async list(): Promise<ChildProfile[]> {
    return this.profiles;
  }

  public async setActive(profileId: string): Promise<void> {
    this.profiles = this.profiles.map((profile) => ({
      ...profile,
      isActive: profile.id === profileId,
    }));
  }
}

describe("CreateChildProfile", () => {
  it("cria e guarda um perfil válido", async () => {
    const repository = new MemoryProfileRepository();
    const useCase = new CreateChildProfile(
      repository,
      () => "profile-1",
      () => new Date("2026-07-17T10:00:00.000Z"),
    );

    const profile = await useCase.execute({
      displayName: "Mia",
      age: 6,
      avatarId: "raposa",
    });

    expect(profile.id).toBe("profile-1");
    expect(profile.displayName).toBe("Mia");
    expect(repository.profiles).toHaveLength(1);
  });

  it("rejeita um nome vazio", async () => {
    const repository = new MemoryProfileRepository();
    const useCase = new CreateChildProfile(repository, () => "profile-1");

    await expect(
      useCase.execute({
        displayName: "   ",
        age: 5,
        avatarId: "panda",
      }),
    ).rejects.toThrow("O nome deve ter entre 1 e 20 caracteres.");
  });
});
