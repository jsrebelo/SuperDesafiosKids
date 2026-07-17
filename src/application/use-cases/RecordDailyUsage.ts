import type { DailyUsageRepository } from "../ports/DailyUsageRepository";
import type { DailyUsage } from "../../domain/time/DailyUsage";

export class RecordDailyUsage {
  public constructor(
    private readonly repository: DailyUsageRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}

  public async execute(
    profileId: string,
    additionalMinutes: number,
  ): Promise<DailyUsage> {
    const date = toLocalDate(this.now());
    const current = await this.repository.get(profileId, date);

    const usage: DailyUsage = {
      profileId,
      date,
      minutesUsed: Math.max(
        0,
        (current?.minutesUsed ?? 0) + additionalMinutes,
      ),
    };

    await this.repository.save(usage);
    return usage;
  }
}

function toLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
