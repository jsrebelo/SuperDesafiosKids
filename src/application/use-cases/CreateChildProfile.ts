import type { ProfileRepository } from "../ports/ProfileRepository";
import {
  type ChildProfile,
  type CreateChildProfileInput,
  validateDisplayName,
} from "../../domain/profiles/ChildProfile";

export class CreateChildProfile {
  public constructor(
    private readonly repository: ProfileRepository,
    private readonly createId: () => string,
    private readonly now: () => Date = () => new Date(),
  ) {}

  public async execute(input: CreateChildProfileInput): Promise<ChildProfile> {
    const timestamp = this.now().toISOString();

    const profile: ChildProfile = {
      id: this.createId(),
      displayName: validateDisplayName(input.displayName),
      age: input.age,
      avatarId: input.avatarId,
      createdAt: timestamp,
      updatedAt: timestamp,
      isActive: false,
    };

    await this.repository.create(profile);
    return profile;
  }
}
