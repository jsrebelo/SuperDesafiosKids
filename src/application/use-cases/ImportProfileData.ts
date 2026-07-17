import type { ProfileRepository } from "../ports/ProfileRepository";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { AttemptRepository } from "../ports/AttemptRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import {
  isImportedProfileData,
  type ImportedProfileData,
} from "../../domain/importing/ImportedProfileData";

export class ImportProfileData {
  public constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly progressRepository: ProgressRepository,
    private readonly attemptRepository: AttemptRepository,
    private readonly rewardRepository: RewardRepository,
  ) {}

  public async execute(content: string): Promise<ImportedProfileData> {
    let parsed: unknown;

    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("O ficheiro não contém JSON válido.");
    }

    if (!isImportedProfileData(parsed)) {
      throw new Error("O ficheiro não tem um formato reconhecido.");
    }

    if (parsed.schemaVersion !== 1) {
      throw new Error("Esta versão do ficheiro ainda não é suportada.");
    }

    const existing = await this.profileRepository.findById(
      parsed.profile.id,
    );

    if (existing) {
      await this.profileRepository.update(parsed.profile);
    } else {
      await this.profileRepository.create(parsed.profile);
    }

    for (const progress of parsed.progress) {
      await this.progressRepository.save(progress);
    }

    for (const attempt of parsed.attempts) {
      await this.attemptRepository.save(attempt);
    }

    if (parsed.reward) {
      await this.rewardRepository.save(parsed.reward);
    }

    return parsed;
  }
}
