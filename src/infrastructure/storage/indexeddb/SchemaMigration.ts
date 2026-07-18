import {
  DATABASE_NAME,
  DATABASE_VERSION,
  STORES,
} from "./Database";

export interface SchemaMigration {
  readonly version: number;
  readonly description: string;
  apply(database: IDBDatabase, transaction: IDBTransaction): void;
}

export const schemaMigrations: readonly SchemaMigration[] = [
  {
    version: 1,
    description: "Estrutura inicial do MVP.",
    apply(database) {
      createStore(database, STORES.profiles, "id");
      createStore(database, STORES.progress, [
        "profileId",
        "skillId",
      ]);
      createStore(database, STORES.attempts, "id");
      createStore(database, STORES.rewards, "profileId");
      createStore(database, STORES.dailyUsage, [
        "profileId",
        "date",
      ]);
      createStore(database, STORES.settings, "id");
      createStore(database, STORES.metadata, "key");
    },
  },
];

export function openMigratedDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = (event) => {
      const database = request.result;
      const transaction = request.transaction;

      if (!transaction) {
        throw new Error("Transação de migração indisponível.");
      }

      const oldVersion = event.oldVersion;

      for (const migration of schemaMigrations) {
        if (migration.version > oldVersion) {
          migration.apply(database, transaction);
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Falha ao migrar a base de dados."));
  });
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
