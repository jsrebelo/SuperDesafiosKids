import type { ProfileRepository } from "../ports/ProfileRepository";
import {
  type ChildProfile,
  type UpdateChildProfileInput,
  validateDisplayName,
} from "../../domain/profiles/ChildProfile";

export class UpdateChildProfile {
  public constructor(
    private readonly repository: ProfileRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}

  public async execute(
    input: UpdateChildProfileInput,
  ): Promise<ChildProfile> {
    const current = await this.repository.findById(input.id);

    if (!current) {
      throw new Error("Perfil não encontrado.");
    }

    const updated: ChildProfile = {
      ...current,
      displayName: validateDisplayName(input.displayName),
      age: input.age,
      avatarId: input.avatarId,
      updatedAt: this.now().toISOString(),
    };

    await this.repository.update(updated);
    return updated;
  }
}
