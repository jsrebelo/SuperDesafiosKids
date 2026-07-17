import type { DailyUsageRepository } from "../../application/ports/DailyUsageRepository";
import type { DailyUsage } from "../../domain/time/DailyUsage";

const STORAGE_KEY = "sdk.dailyUsage.v1";

export class BrowserDailyUsageRepository implements DailyUsageRepository {
  public async get(
    profileId: string,
    date: string,
  ): Promise<DailyUsage | null> {
    return (
      this.readAll().find(
        (usage) => usage.profileId === profileId && usage.date === date,
      ) ?? null
    );
  }

  public async save(usage: DailyUsage): Promise<void> {
    const next = this.readAll().filter(
      (item) =>
        !(item.profileId === usage.profileId && item.date === usage.date),
    );

    next.push(usage);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  private readAll(): DailyUsage[] {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as DailyUsage[]) : [];
    } catch {
      return [];
    }
  }
}
