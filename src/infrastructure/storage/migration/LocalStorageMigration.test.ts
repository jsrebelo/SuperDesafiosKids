import { beforeEach, describe, expect, it } from "vitest";
import type { IndexedDbClient } from "../indexeddb/IndexedDbClient";
import type { StoreName } from "../indexeddb/Database";
import { LocalStorageMigration } from "./LocalStorageMigration";

class MemoryIndexedDbClient {
  public readonly records = new Map<StoreName, unknown[]>();

  public async get<T>(storeName: StoreName, key: IDBValidKey): Promise<T | null> {
    const record = (this.records.get(storeName) ?? []).find((value) =>
      matchesKey(value, key),
    );
    return (record as T | undefined) ?? null;
  }

  public async put<T>(storeName: StoreName, value: T): Promise<void> {
    const values = this.records.get(storeName) ?? [];
    const key = recordKey(value);
    const nextValues = values.filter((current) => recordKey(current) !== key);
    nextValues.push(value);
    this.records.set(storeName, nextValues);
  }
}

describe("LocalStorageMigration", () => {
  beforeEach(() => window.localStorage.clear());

  it("copia perfis e PIN para IndexedDB e regista a migração", async () => {
    window.localStorage.setItem(
      "sdk.childProfiles.v1",
      JSON.stringify([{ id: "profile-1", displayName: "Mia" }]),
    );
    window.localStorage.setItem("sdk.parentPinHash.v1", "pin-hash");
    const client = new MemoryIndexedDbClient();

    await new LocalStorageMigration(
      client as unknown as IndexedDbClient,
    ).run();

    expect(client.records.get("profiles")).toEqual([
      { id: "profile-1", displayName: "Mia" },
    ]);
    expect(client.records.get("settings")).toContainEqual({
      id: "parent-access",
      pinHash: "pin-hash",
    });
    expect(client.records.get("metadata")).toContainEqual(
      expect.objectContaining({
        key: "localStorage-v1-migrated",
        value: true,
      }),
    );
  });
});

function matchesKey(value: unknown, key: IDBValidKey): boolean {
  return recordKey(value) === JSON.stringify(key);
}

function recordKey(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  const key =
    record.id ??
    record.key ??
    record.profileId ??
    [record.profileId, record.skillId ?? record.date];
  return JSON.stringify(key);
}
