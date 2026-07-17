import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";

const STORAGE_KEY = "sdk.childProfiles.v1";

export class BrowserProfileRepository implements ProfileRepository {
  public async create(profile: ChildProfile): Promise<void> {
    const profiles = await this.list();
    this.save([...profiles, profile]);
  }

  public async list(): Promise<ChildProfile[]> {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ChildProfile[]) : [];
    } catch {
      return [];
    }
  }

  public async setActive(profileId: string): Promise<void> {
    const profiles = await this.list();
    const exists = profiles.some((profile) => profile.id === profileId);

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

  private save(profiles: ChildProfile[]): void {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profiles),
    );
  }
}
