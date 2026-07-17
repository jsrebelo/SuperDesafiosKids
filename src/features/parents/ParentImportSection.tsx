import { useState } from "react";
import type { ImportProfileData } from "../../application/use-cases/ImportProfileData";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly importProfileData: ImportProfileData;
  readonly onImported: () => void;
}

export function ParentImportSection({
  importProfileData,
  onImported,
}: Props) {
  const [message, setMessage] = useState("");

  async function handleFile(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      await importProfileData.execute(content);
      setMessage("Dados importados com sucesso.");
      onImported();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível importar os dados.",
      );
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="form-card">
      <h2>Importar dados</h2>
      <p>
        Seleciona um ficheiro JSON exportado anteriormente pelo jogo.
      </p>

      <label>
        Ficheiro JSON
        <input
          accept="application/json,.json"
          onChange={(event) => void handleFile(event)}
          type="file"
        />
      </label>

      <Button
        onClick={() =>
          document.querySelector<HTMLInputElement>(
            'input[type="file"]',
          )?.click()
        }
        type="button"
      >
        Escolher ficheiro
      </Button>

      <p aria-live="polite">{message}</p>
    </section>
  );
}
