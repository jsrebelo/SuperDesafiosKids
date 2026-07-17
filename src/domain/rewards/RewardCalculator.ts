import type { RewardWallet } from "./RewardWallet";

export interface RewardInput {
  readonly correct: boolean;
  readonly hintsUsed: number;
  readonly responseTimeMs: number;
}

export interface RewardOutput {
  readonly xpEarned: number;
  readonly coinsEarned: number;
  readonly starsEarned: number;
  readonly wallet: RewardWallet;
}

export class RewardCalculator {
  public calculate(
    wallet: RewardWallet,
    input: RewardInput,
    now: Date = new Date(),
  ): RewardOutput {
    if (!input.correct) {
      return {
        xpEarned: 0,
        coinsEarned: 0,
        starsEarned: 0,
        wallet: {
          ...wallet,
          updatedAt: now.toISOString(),
        },
      };
    }

    const hintPenalty = Math.min(input.hintsUsed * 2, 6);
    const speedBonus = input.responseTimeMs <= 5000 ? 2 : 0;
    const xpEarned = Math.max(4, 10 - hintPenalty + speedBonus);
    const coinsEarned = Math.max(1, 3 - input.hintsUsed);
    const totalXp = wallet.xp + xpEarned;
    const previousStars = Math.floor(wallet.xp / 100);
    const nextStars = Math.floor(totalXp / 100);
    const starsEarned = Math.max(0, nextStars - previousStars);

    return {
      xpEarned,
      coinsEarned,
      starsEarned,
      wallet: {
        ...wallet,
        xp: totalXp,
        coins: wallet.coins + coinsEarned,
        stars: wallet.stars + starsEarned,
        updatedAt: now.toISOString(),
      },
    };
  }
}
