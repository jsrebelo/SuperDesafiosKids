import { LocalStorageMigration } from "./migration/LocalStorageMigration";

export async function bootstrapStorage(): Promise<void> {
  try {
    await new LocalStorageMigration().run();
  } catch (error) {
    console.error("Falha ao preparar armazenamento local.", error);
    throw new Error(
      "Não foi possível preparar o armazenamento local.",
    );
  }
}
