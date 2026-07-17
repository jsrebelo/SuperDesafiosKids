import { beforeEach, describe, expect, it } from "vitest";
import { BrowserSettingsRepository } from "./BrowserSettingsRepository";
import { defaultAppSettings } from "../../domain/settings/AppSettings";

describe("BrowserSettingsRepository", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("devolve valores padrão quando não existem definições", async () => {
    const repository = new BrowserSettingsRepository();
    expect(await repository.get()).toEqual(defaultAppSettings);
  });

  it("guarda e recupera definições", async () => {
    const repository = new BrowserSettingsRepository();
    const settings = {
      ...defaultAppSettings,
      highContrast: true,
    };

    await repository.save(settings);
    expect(await repository.get()).toEqual(settings);
  });
});
