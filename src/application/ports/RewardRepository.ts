import type { RewardWallet } from "../../domain/rewards/RewardWallet";

export interface RewardRepository {
  get(profileId: string): Promise<RewardWallet | null>;
  save(wallet: RewardWallet): Promise<void>;
}
