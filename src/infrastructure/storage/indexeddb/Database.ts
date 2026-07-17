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

let databasePromise: Promise<IDBDatabase> | null = null;

export function openDatabase(): Promise<IDBDatabase> {
  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;

        createStore(database, STORES.profiles, "id");
        createStore(database, STORES.progress, ["profileId", "skillId"]);
        createStore(database, STORES.attempts, "id");
        createStore(database, STORES.rewards, "profileId");
        createStore(database, STORES.dailyUsage, ["profileId", "date"]);
        createStore(database, STORES.settings, "id");
        createStore(database, STORES.metadata, "key");
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(request.error ?? new Error("Falha ao abrir IndexedDB."));
      request.onblocked = () =>
        reject(new Error("A atualização da base de dados está bloqueada."));
    });
  }

  return databasePromise;
}

function createStore(
  database: IDBDatabase,
  name: string,
  keyPath: string | string[],
): void {
  if (!database.objectStoreNames.contains(name)) {
    database.createObjectStore(name, { keyPath });
  }
}
