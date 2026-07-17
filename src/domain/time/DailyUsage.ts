export interface DailyUsage {
  readonly profileId: string;
  readonly date: string;
  readonly minutesUsed: number;
}

export interface DailyLimitResult {
  readonly limitMinutes: number;
  readonly minutesUsed: number;
  readonly remainingMinutes: number;
  readonly reached: boolean;
}

export function evaluateDailyLimit(
  usage: DailyUsage | null,
  limitMinutes: number,
): DailyLimitResult {
  const minutesUsed = usage?.minutesUsed ?? 0;
  const normalizedLimit = Math.max(0, limitMinutes);

  return {
    limitMinutes: normalizedLimit,
    minutesUsed,
    remainingMinutes: Math.max(0, normalizedLimit - minutesUsed),
    reached: normalizedLimit > 0 && minutesUsed >= normalizedLimit,
  };
}
