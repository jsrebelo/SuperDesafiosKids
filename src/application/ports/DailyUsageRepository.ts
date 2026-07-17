import type { DailyUsage } from "../../domain/time/DailyUsage";

export interface DailyUsageRepository {
  get(profileId: string, date: string): Promise<DailyUsage | null>;
  save(usage: DailyUsage): Promise<void>;
}
