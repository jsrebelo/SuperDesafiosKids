import type { RewardRepository } from "../../application/ports/RewardRepository";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";

const STORAGE_KEY = "sdk.rewardWallets.v1";

export class BrowserRewardRepository implements RewardRepository {
  public async get(profileId: string): Promise<RewardWallet | null> {
    return this.readAll().find((item) => item.profileId === profileId) ?? null;
  }

  public async save(wallet: RewardWallet): Promise<void> {
    const next = this.readAll().filter(
      (item) => item.profileId !== wallet.profileId,
    );
    next.push(wallet);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  private readAll(): RewardWallet[] {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as RewardWallet[]) : [];
    } catch {
      return [];
    }
  }
}
