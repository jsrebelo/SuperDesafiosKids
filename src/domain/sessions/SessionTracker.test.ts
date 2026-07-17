import { describe, expect, it } from "vitest";
import { SessionTracker } from "./SessionTracker";

describe("SessionTracker", () => {
  it("mede o tempo acumulado", () => {
    const tracker = new SessionTracker();

    tracker.start(1000);
    tracker.pause(61000);
    tracker.start(70000);
    tracker.pause(100000);

    expect(tracker.elapsedSeconds()).toBe(90);
  });

  it("não duplica início de sessão", () => {
    const tracker = new SessionTracker();

    tracker.start(1000);
    tracker.start(2000);

    expect(tracker.elapsedSeconds(11000)).toBe(10);
  });
});
