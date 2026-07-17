export interface SessionTrackerSnapshot {
  readonly startedAt: string;
  readonly elapsedSeconds: number;
}

export class SessionTracker {
  private startedAt: number | null = null;
  private accumulatedSeconds = 0;

  public start(nowMs: number = Date.now()): void {
    if (this.startedAt !== null) {
      return;
    }

    this.startedAt = nowMs;
  }

  public pause(nowMs: number = Date.now()): void {
    if (this.startedAt === null) {
      return;
    }

    this.accumulatedSeconds += Math.max(
      0,
      Math.round((nowMs - this.startedAt) / 1000),
    );
    this.startedAt = null;
  }

  public reset(): void {
    this.startedAt = null;
    this.accumulatedSeconds = 0;
  }

  public elapsedSeconds(nowMs: number = Date.now()): number {
    if (this.startedAt === null) {
      return this.accumulatedSeconds;
    }

    return (
      this.accumulatedSeconds +
      Math.max(0, Math.round((nowMs - this.startedAt) / 1000))
    );
  }

  public snapshot(nowMs: number = Date.now()): SessionTrackerSnapshot {
    return {
      startedAt: new Date(
        this.startedAt ?? nowMs,
      ).toISOString(),
      elapsedSeconds: this.elapsedSeconds(nowMs),
    };
  }
}
