import type { StoreName } from "./Database";
import { openMigratedDatabase } from "./SchemaMigration";

let databasePromise: Promise<IDBDatabase> | null = null;

function database(): Promise<IDBDatabase> {
  databasePromise ??= openMigratedDatabase();
  return databasePromise;
}

export class IndexedDbClient {
  public async get<T>(
    storeName: StoreName,
    key: IDBValidKey | IDBKeyRange,
  ): Promise<T | null> {
    const db = await database();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(key);

      request.onsuccess = () =>
        resolve((request.result as T | undefined) ?? null);
      request.onerror = () =>
        reject(request.error ?? new Error("Falha ao ler dados."));
    });
  }

  public async getAll<T>(storeName: StoreName): Promise<T[]> {
    const db = await database();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () =>
        reject(request.error ?? new Error("Falha ao listar dados."));
    });
  }

  public async put<T>(
    storeName: StoreName,
    value: T,
  ): Promise<void> {
    const db = await database();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).put(value);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Falha ao guardar dados."));
    });
  }
}
