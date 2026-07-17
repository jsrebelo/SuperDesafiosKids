import type { ChildProfile } from "../profiles/ChildProfile";
import type { ProfileStatistics } from "../statistics/ProfileStatistics";
import type { RewardWallet } from "../rewards/RewardWallet";
import type { SkillProgress } from "../learning/Skill";

export interface ParentReport {
  readonly generatedAt: string;
  readonly profile: ChildProfile;
  readonly statistics: ProfileStatistics;
  readonly wallet: RewardWallet;
  readonly progress: readonly SkillProgress[];
}
