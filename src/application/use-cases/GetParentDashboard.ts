import type { AttemptRepository } from "../ports/AttemptRepository";
import type { RewardRepository } from "../ports/RewardRepository";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { SkillId } from "../../domain/learning/Skill";
import { calculateProfileStatistics } from "../../domain/statistics/ProfileStatistics";
import { createRewardWallet } from "../../domain/rewards/RewardWallet";

export class GetParentDashboard {
  public constructor(
    private readonly attemptRepository: AttemptRepository,
    private readonly progressRepository: ProgressRepository,
    private readonly rewardRepository: RewardRepository,
  ) {}

  public async execute(profileId: string) {
    const attempts = await this.attemptRepository.listByProfile(profileId);
    const statistics = calculateProfileStatistics(profileId, attempts);
    const wallet =
      (await this.rewardRepository.get(profileId)) ??
      createRewardWallet(profileId);

    const skills: readonly SkillId[] = [
      "math.counting",
      "math.addition",
      "math.subtraction",
      "math.multiplication",
      "math.division",
      "portuguese.missing-letter",
    ];

    const progress = await Promise.all(
      skills.map((skillId) =>
        this.progressRepository.get(profileId, skillId),
      ),
    );

    return {
      statistics,
      wallet,
      progress: progress.filter(
        (item): item is NonNullable<typeof item> => item !== null,
      ),
    };
  }
}
