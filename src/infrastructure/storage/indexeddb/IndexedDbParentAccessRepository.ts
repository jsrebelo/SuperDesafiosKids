import type { ParentAccessRepository } from "../../../application/ports/ParentAccessRepository";
import { STORES } from "./Database";
import { IndexedDbClient } from "./IndexedDbClient";

interface ParentAccessRecord {
  readonly id: "parent-access";
  readonly pinHash: string;
}

export class IndexedDbParentAccessRepository
  implements ParentAccessRepository
{
  public constructor(
    private readonly client: IndexedDbClient = new IndexedDbClient(),
  ) {}

  public async getPinHash(): Promise<string | null> {
    const record = await this.client.get<ParentAccessRecord>(
      STORES.settings,
      "parent-access",
    );

    return record?.pinHash ?? null;
  }

  public async savePinHash(pinHash: string): Promise<void> {
    await this.client.put<ParentAccessRecord>(STORES.settings, {
      id: "parent-access",
      pinHash,
    });
  }
}
