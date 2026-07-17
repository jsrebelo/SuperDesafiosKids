import { describe, expect, it } from "vitest";
import { isImportedProfileData } from "./ImportedProfileData";

describe("isImportedProfileData", () => {
  it("aceita um ficheiro válido", () => {
    expect(
      isImportedProfileData({
        schemaVersion: 1,
        exportedAt: "2026-07-17T10:00:00.000Z",
        profile: {
          id: "p1",
          displayName: "Mia",
          age: 6,
          avatarId: "raposa",
          createdAt: "2026-07-17T10:00:00.000Z",
          updatedAt: "2026-07-17T10:00:00.000Z",
          isActive: true,
        },
        progress: [],
        attempts: [],
        reward: null,
      }),
    ).toBe(true);
  });

  it("rejeita um ficheiro inválido", () => {
    expect(isImportedProfileData({ schemaVersion: 1 })).toBe(false);
  });
});
