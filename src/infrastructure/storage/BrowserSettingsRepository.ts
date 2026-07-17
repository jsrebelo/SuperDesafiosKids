import type { SettingsRepository } from "../../application/ports/SettingsRepository";
import {
  defaultAppSettings,
  type AppSettings,
} from "../../domain/settings/AppSettings";

const STORAGE_KEY = "sdk.appSettings.v1";

export class BrowserSettingsRepository implements SettingsRepository {
  public async get(): Promise<AppSettings> {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return defaultAppSettings;
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      if (!isSettings(parsed)) {
        return defaultAppSettings;
      }

      return parsed;
    } catch {
      return defaultAppSettings;
    }
  }

  public async save(settings: AppSettings): Promise<void> {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}

function isSettings(value: unknown): value is AppSettings {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<AppSettings>;

  return (
    typeof item.highContrast === "boolean" &&
    typeof item.reducedMotion === "boolean" &&
    typeof item.dyslexiaFriendlyFont === "boolean" &&
    typeof item.readAloudEnabled === "boolean" &&
    typeof item.soundEnabled === "boolean" &&
    typeof item.musicEnabled === "boolean" &&
    typeof item.dailyLimitMinutes === "number"
  );
}
