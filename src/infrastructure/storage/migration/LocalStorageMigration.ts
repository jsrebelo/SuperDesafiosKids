import type { ChildProfile } from "../../../domain/profiles/ChildProfile";
import type { SkillProgress } from "../../../domain/learning/Skill";
import type { ExerciseAttempt } from "../../../domain/attempts/ExerciseAttempt";
import type { RewardWallet } from "../../../domain/rewards/RewardWallet";
import type { DailyUsage } from "../../../domain/time/DailyUsage";
import type { AppSettings } from "../../../domain/settings/AppSettings";
import { STORES } from "../indexeddb/Database";
import { IndexedDbClient } from "../indexeddb/IndexedDbClient";

const MIGRATION_KEY = "localStorage-v1-migrated";

const KEYS = {
  profiles: "sdk.childProfiles.v1",
  progress: "sdk.skillProgress.v1",
  attempts: "sdk.exerciseAttempts.v1",
  rewards: "sdk.rewardWallets.v1",
  dailyUsage: "sdk.dailyUsage.v1",
  settings: "sdk.appSettings.v1",
} as const;

export class LocalStorageMigration {
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async run(): Promise<void> {
    const migrated = await this.client.get<{ key: string; value: boolean }>(
      STORES.metadata,
      MIGRATION_KEY,
    );

    if (migrated?.value) {
      return;
    }

    await this.copyArray<ChildProfile>(KEYS.profiles, STORES.profiles);
    await this.copyArray<SkillProgress>(KEYS.progress, STORES.progress);
    await this.copyArray<ExerciseAttempt>(KEYS.attempts, STORES.attempts);
    await this.copyArray<RewardWallet>(KEYS.rewards, STORES.rewards);
    await this.copyArray<DailyUsage>(KEYS.dailyUsage, STORES.dailyUsage);

    const settings = readObject<AppSettings>(KEYS.settings);
    if (settings) {
      await this.client.put(STORES.settings, {
        id: "app",
        ...settings,
      });
    }

    await this.client.put(STORES.metadata, {
      key: MIGRATION_KEY,
      value: true,
      migratedAt: new Date().toISOString(),
    });
  }

  private async copyArray<T>(
    localStorageKey: string,
    storeName: (typeof STORES)[keyof typeof STORES],
  ): Promise<void> {
    const values = readArray<T>(localStorageKey);

    for (const value of values) {
      await this.client.put(storeName, value);
    }
  }
}

function readArray<T>(key: string): T[] {
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function readObject<T>(key: string): T | null {
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
