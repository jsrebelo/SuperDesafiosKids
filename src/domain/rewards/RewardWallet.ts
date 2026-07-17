export interface RewardWallet {
  readonly profileId: string;
  readonly xp: number;
  readonly coins: number;
  readonly stars: number;
  readonly updatedAt: string;
}

export function createRewardWallet(
  profileId: string,
  now: Date = new Date(),
): RewardWallet {
  return {
    profileId,
    xp: 0,
    coins: 0,
    stars: 0,
    updatedAt: now.toISOString(),
  };
}
