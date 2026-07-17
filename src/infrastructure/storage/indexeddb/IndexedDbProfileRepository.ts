import type { ProfileRepository } from "../../../application/ports/ProfileRepository";
import type { ChildProfile } from "../../../domain/profiles/ChildProfile";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

export class IndexedDbProfileRepository implements ProfileRepository {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async create(profile: ChildProfile): Promise<void> {
    await this.client.put(STORES.profiles, profile);
  }

  public async update(profile: ChildProfile): Promise<void> {
    const current = await this.findById(profile.id);

    if (!current) {
      throw new Error("Perfil não encontrado.");
    }

    await this.client.put(STORES.profiles, profile);
  }

  public async list(): Promise<ChildProfile[]> {
    const profiles = await this.client.getAll<ChildProfile>(STORES.profiles);
    return profiles.filter((profile) => !profile.archivedAt);
  }

  public async findById(
    profileId: string,
  ): Promise<ChildProfile | null> {
    return this.client.get<ChildProfile>(STORES.profiles, profileId);
  }

  public async setActive(profileId: string): Promise<void> {
    const profiles = await this.client.getAll<ChildProfile>(STORES.profiles);
    const exists = profiles.some(
      (profile) => profile.id === profileId && !profile.archivedAt,
    );

    if (!exists) {
      throw new Error("Perfil não encontrado.");
    }

    const now = new Date().toISOString();

    await Promise.all(
      profiles.map((profile) =>
        this.client.put(STORES.profiles, {
          ...profile,
          isActive: profile.id === profileId,
          updatedAt:
            profile.id === profileId ? now : profile.updatedAt,
        }),
      ),
    );
  }

  public async archive(profileId: string): Promise<void> {
    const profile = await this.findById(profileId);

    if (!profile) {
      throw new Error("Perfil não encontrado.");
    }

    const now = new Date().toISOString();

    await this.client.put(STORES.profiles, {
      ...profile,
      isActive: false,
      archivedAt: now,
      updatedAt: now,
    });
  }
}
