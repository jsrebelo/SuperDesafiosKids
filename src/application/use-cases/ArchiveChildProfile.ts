import type { ProfileRepository } from "../ports/ProfileRepository";

export class ArchiveChildProfile {
  public constructor(
    private readonly repository: ProfileRepository,
  ) {}

  public async execute(profileId: string): Promise<void> {
    const profile = await this.repository.findById(profileId);

    if (!profile) {
      throw new Error("Perfil não encontrado.");
    }

    await this.repository.archive(profileId);
  }
}
