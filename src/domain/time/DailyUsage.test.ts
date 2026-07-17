import { describe, expect, it } from "vitest";
import { evaluateDailyLimit } from "./DailyUsage";

describe("evaluateDailyLimit", () => {
  it("indica quando o limite foi atingido", () => {
    const result = evaluateDailyLimit(
      {
        profileId: "p1",
        date: "2026-07-17",
        minutesUsed: 30,
      },
      30,
    );

    expect(result.reached).toBe(true);
    expect(result.remainingMinutes).toBe(0);
  });

  it("permite utilização ilimitada quando o limite é zero", () => {
    const result = evaluateDailyLimit(
      {
        profileId: "p1",
        date: "2026-07-17",
        minutesUsed: 300,
      },
      0,
    );

    expect(result.reached).toBe(false);
  });
});
