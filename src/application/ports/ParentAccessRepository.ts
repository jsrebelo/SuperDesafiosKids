export interface ParentAccessRepository {
  getPinHash(): Promise<string | null>;
  savePinHash(pinHash: string): Promise<void>;
}
