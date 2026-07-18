import { describe, expect, it } from "vitest";
import type { DailyUsageRepository } from "../ports/DailyUsageRepository";
import type { DailyUsage } from "../../domain/time/DailyUsage";
import { SessionTracker } from "../../domain/sessions/SessionTracker";
import { FinishTrackedSession } from "./FinishTrackedSession";

class MemoryDailyUsageRepository implements DailyUsageRepository {
  public value: DailyUsage | null = null;

  public async get(profileId: string, date: string): Promise<DailyUsage | null> {
    return this.value?.profileId === profileId && this.value.date === date
      ? this.value
      : null;
  }

  public async save(usage: DailyUsage): Promise<void> {
    this.value = usage;
  }
}

describe("FinishTrackedSession", () => {
  it("acrescenta a duração da sessão à utilização diária", async () => {
    const repository = new MemoryDailyUsageRepository();
    repository.value = {
      profileId: "profile-1",
      date: "2026-07-18",
      minutesUsed: 4,
    };
    const now = new Date(2026, 6, 18, 10, 0, 0);
    const tracker = new SessionTracker();
    tracker.start(now.getTime() - 125_000);

    const added = await new FinishTrackedSession(
      repository,
      () => now,
    ).execute("profile-1", tracker);

    expect(added).toBe(3);
    expect(repository.value?.minutesUsed).toBe(7);
    expect(tracker.elapsedSeconds()).toBe(0);
  });
});
