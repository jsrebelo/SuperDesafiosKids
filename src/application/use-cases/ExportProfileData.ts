import type { ProfileRepository } from "../ports/ProfileRepository";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { AttemptRepository } from "../ports/AttemptRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { SkillId } from "../../domain/learning/Skill";

export class ExportProfileData {
  public constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly progressRepository: ProgressRepository,
    private readonly attemptRepository: AttemptRepository,
    private readonly rewardRepository: RewardRepository,
  ) {}

  public async execute(profileId: string): Promise<string> {
    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw new Error("Perfil não encontrado.");
    }

    const skillIds: readonly SkillId[] = [
      "math.counting",
      "math.addition",
      "math.subtraction",
      "math.multiplication",
      "math.division",
      "portuguese.missing-letter",
    ];

    const [attempts, reward, progress] = await Promise.all([
      this.attemptRepository.listByProfile(profileId),
      this.rewardRepository.get(profileId),
      Promise.all(
        skillIds.map((skillId) =>
          this.progressRepository.get(profileId, skillId),
        ),
      ),
    ]);

    return JSON.stringify(
      {
        schemaVersion: 1,
        exportedAt: new Date().toISOString(),
        profile,
        progress: progress.filter(Boolean),
        attempts,
        reward,
      },
      null,
      2,
    );
  }
}

export function downloadJson(
  filename: string,
  content: string,
): void {
  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
