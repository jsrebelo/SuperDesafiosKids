import type { SettingsRepository } from "../../../application/ports/SettingsRepository";
import {
  defaultAppSettings,
  type AppSettings,
} from "../../../domain/settings/AppSettings";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

interface SettingsRecord extends AppSettings {
  readonly id: "app";
}

export class IndexedDbSettingsRepository implements SettingsRepository {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async get(): Promise<AppSettings> {
    const record = await this.client.get<SettingsRecord>(
      STORES.settings,
      "app",
    );

    if (!record) {
      return defaultAppSettings;
    }

    const { id: _id, ...settings } = record;
    return settings;
  }

  public async save(settings: AppSettings): Promise<void> {
    await this.client.put<SettingsRecord>(STORES.settings, {
      id: "app",
      ...settings,
    });
  }
}
