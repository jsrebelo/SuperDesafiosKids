import type { ParentAccessRepository } from "../../application/ports/ParentAccessRepository";

const STORAGE_KEY = "sdk.parentPinHash.v1";

export class BrowserParentAccessRepository
  implements ParentAccessRepository
{
  public async getPinHash(): Promise<string | null> {
    return window.localStorage.getItem(STORAGE_KEY);
  }

  public async savePinHash(pinHash: string): Promise<void> {
    window.localStorage.setItem(STORAGE_KEY, pinHash);
  }
}
