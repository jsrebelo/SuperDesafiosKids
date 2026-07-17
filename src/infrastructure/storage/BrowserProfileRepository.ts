import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";

const STORAGE_KEY = "sdk.childProfiles.v1";

export class BrowserProfileRepository implements ProfileRepository {
  public async create(profile: ChildProfile): Promise<void> {
    const profiles = this.readAll();
    this.save([...profiles, profile]);
  }

  public async update(profile: ChildProfile): Promise<void> {
    const profiles = this.readAll();
    const exists = profiles.some((item) => item.id === profile.id);

    if (!exists) {
      throw new Error("Perfil não encontrado.");
    }

    this.save(
      profiles.map((item) => (item.id === profile.id ? profile : item)),
    );
  }

  public async list(): Promise<ChildProfile[]> {
    return this.readAll().filter((profile) => !profile.archivedAt);
  }

  public async findById(
    profileId: string,
  ): Promise<ChildProfile | null> {
    return this.readAll().find((profile) => profile.id === profileId) ?? null;
  }

  public async setActive(profileId: string): Promise<void> {
    const profiles = this.readAll();
    const exists = profiles.some(
      (profile) => profile.id === profileId && !profile.archivedAt,
    );

    if (!exists) {
      throw new Error("Perfil não encontrado.");
    }

    const now = new Date().toISOString();

    this.save(
      profiles.map((profile) => ({
        ...profile,
        isActive: profile.id === profileId,
        updatedAt:
          profile.id === profileId ? now : profile.updatedAt,
      })),
    );
  }

  public async archive(profileId: string): Promise<void> {
    const profiles = this.readAll();
    const now = new Date().toISOString();

    this.save(
      profiles.map((profile) =>
        profile.id === profileId
          ? {
              ...profile,
              isActive: false,
              archivedAt: now,
              updatedAt: now,
            }
          : profile,
      ),
    );
  }

  private readAll(): ChildProfile[] {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ChildProfile[]) : [];
    } catch {
      return [];
    }
  }

  private save(profiles: ChildProfile[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }
}
