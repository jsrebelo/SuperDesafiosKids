import { describe, expect, it } from "vitest";
import {
  GenerateParentReport,
  parentReportToHtml,
} from "./GenerateParentReport";

describe("GenerateParentReport", () => {
  it("gera HTML com os dados do perfil", () => {
    const report = new GenerateParentReport().execute({
      profile: {
        id: "p1",
        displayName: "Mia",
        age: 6,
        avatarId: "raposa",
        createdAt: "2026-07-17T10:00:00.000Z",
        updatedAt: "2026-07-17T10:00:00.000Z",
        isActive: true,
      },
      statistics: {
        profileId: "p1",
        attempts: 10,
        correctAnswers: 8,
        accuracy: 0.8,
        averageResponseTimeMs: 5000,
        bySkill: [],
      },
      wallet: {
        profileId: "p1",
        xp: 100,
        coins: 20,
        stars: 1,
        updatedAt: "2026-07-17T10:00:00.000Z",
      },
      progress: [],
    });

    const html = parentReportToHtml(report);

    expect(html).toContain("Mia");
    expect(html).toContain("80%");
    expect(html).toContain("100");
  });
});
