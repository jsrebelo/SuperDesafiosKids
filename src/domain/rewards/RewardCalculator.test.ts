import { describe, expect, it } from "vitest";
import { RewardCalculator } from "./RewardCalculator";
import { createRewardWallet } from "./RewardWallet";

describe("RewardCalculator", () => {
  it("atribui recompensa por resposta correta", () => {
    const calculator = new RewardCalculator();
    const result = calculator.calculate(
      createRewardWallet("p1", new Date("2026-07-17T10:00:00.000Z")),
      {
        correct: true,
        hintsUsed: 0,
        responseTimeMs: 4000,
      },
      new Date("2026-07-17T10:01:00.000Z"),
    );

    expect(result.xpEarned).toBeGreaterThan(0);
    expect(result.coinsEarned).toBeGreaterThan(0);
    expect(result.wallet.xp).toBe(result.xpEarned);
  });

  it("não remove recompensas após resposta incorreta", () => {
    const calculator = new RewardCalculator();
    const wallet = {
      ...createRewardWallet("p1"),
      xp: 50,
      coins: 10,
      stars: 1,
    };

    const result = calculator.calculate(wallet, {
      correct: false,
      hintsUsed: 0,
      responseTimeMs: 10000,
    });

    expect(result.wallet.xp).toBe(50);
    expect(result.wallet.coins).toBe(10);
    expect(result.wallet.stars).toBe(1);
  });
});
