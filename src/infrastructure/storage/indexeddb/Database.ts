export const DATABASE_NAME = "super-desafios-kids";
export const DATABASE_VERSION = 1;

export const STORES = {
  profiles: "profiles",
  progress: "progress",
  attempts: "attempts",
  rewards: "rewards",
  dailyUsage: "dailyUsage",
  settings: "settings",
  metadata: "metadata",
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];
