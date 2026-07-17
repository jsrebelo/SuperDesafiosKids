import { describe, expect, it } from "vitest";
import { hashPin, verifyPin } from "./ParentAccess";

describe("ParentAccess", () => {
  it("valida o PIN correto", async () => {
    const hash = await hashPin("1234");
    expect(await verifyPin("1234", hash)).toBe(true);
    expect(await verifyPin("9999", hash)).toBe(false);
  });

  it("rejeita PIN inválido", async () => {
    await expect(hashPin("12")).rejects.toThrow(
      "O PIN deve ter quatro algarismos.",
    );
  });
});
