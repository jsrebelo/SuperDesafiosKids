import type { RewardRepository } from "../../../application/ports/RewardRepository";
import type { RewardWallet } from "../../../domain/rewards/RewardWallet";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

export class IndexedDbRewardRepository implements RewardRepository {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async get(profileId: string): Promise<RewardWallet | null> {
    return this.client.get<RewardWallet>(STORES.rewards, profileId);
  }

  public async save(wallet: RewardWallet): Promise<void> {
    await this.client.put(STORES.rewards, wallet);
  }
}
