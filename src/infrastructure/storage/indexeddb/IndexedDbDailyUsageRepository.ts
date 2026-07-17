import type { DailyUsageRepository } from "../../../application/ports/DailyUsageRepository";
import type { DailyUsage } from "../../../domain/time/DailyUsage";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

export class IndexedDbDailyUsageRepository
  implements DailyUsageRepository
{
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async get(
    profileId: string,
    date: string,
  ): Promise<DailyUsage | null> {
    return this.client.get<DailyUsage>(
      STORES.dailyUsage,
      [profileId, date],
    );
  }

  public async save(usage: DailyUsage): Promise<void> {
    await this.client.put(STORES.dailyUsage, usage);
  }
}
