import type { ChildProfile } from "../../domain/profiles/ChildProfile";

export interface ProfileRepository {
  create(profile: ChildProfile): Promise<void>;
  list(): Promise<ChildProfile[]>;
  setActive(profileId: string): Promise<void>;
}
