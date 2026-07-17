import type { DailyUsageRepository } from "../ports/DailyUsageRepository";
import type { SessionTracker } from "../../domain/sessions/SessionTracker";

export class FinishTrackedSession {
  public constructor(
    private readonly dailyUsageRepository: DailyUsageRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}

  public async execute(
    profileId: string,
    tracker: SessionTracker,
  ): Promise<number> {
    tracker.pause(this.now().getTime());

    const elapsedSeconds = tracker.elapsedSeconds(
      this.now().getTime(),
    );
    const additionalMinutes = Math.max(
      1,
      Math.ceil(elapsedSeconds / 60),
    );

    const today = toLocalDate(this.now());
    const current = await this.dailyUsageRepository.get(
      profileId,
      today,
    );

    await this.dailyUsageRepository.save({
      profileId,
      date: today,
      minutesUsed:
        (current?.minutesUsed ?? 0) + additionalMinutes,
    });

    tracker.reset();
    return additionalMinutes;
  }
}

function toLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
