const STORAGE_KEYS = [
  "sdk.childProfiles.v1",
  "sdk.skillProgress.v1",
  "sdk.rewardWallets.v1",
  "sdk.exerciseAttempts.v1",
  "sdk.dailyUsage.v1",
  "sdk.parentPinHash.v1",
  "sdk.appSettings.v1",
] as const;

export async function bootstrapStorage(): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  for (const key of STORAGE_KEYS) {
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, JSON.stringify([]));
    }
  }
}
