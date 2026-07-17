import { openDatabase, type StoreName } from "./Database";

export class IndexedDbClient {
  public async get<T>(
    storeName: StoreName,
    key: IDBValidKey | IDBKeyRange,
  ): Promise<T | null> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(key);

      request.onsuccess = () =>
        resolve((request.result as T | undefined) ?? null);
      request.onerror = () =>
        reject(request.error ?? new Error("Falha ao ler dados."));
    });
  }

  public async getAll<T>(storeName: StoreName): Promise<T[]> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readonly");
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
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).put(value);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Falha ao guardar dados."));
      transaction.onabort = () =>
        reject(transaction.error ?? new Error("Operação cancelada."));
    });
  }

  public async delete(
    storeName: StoreName,
    key: IDBValidKey | IDBKeyRange,
  ): Promise<void> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).delete(key);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error ?? new Error("Falha ao eliminar dados."));
    });
  }
}
