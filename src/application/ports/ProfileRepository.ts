import type { ChildProfile } from "../../domain/profiles/ChildProfile";

export interface ProfileRepository {
  create(profile: ChildProfile): Promise<void>;
  update(profile: ChildProfile): Promise<void>;
  list(): Promise<ChildProfile[]>;
  findById(profileId: string): Promise<ChildProfile | null>;
  setActive(profileId: string): Promise<void>;
  archive(profileId: string): Promise<void>;
}
