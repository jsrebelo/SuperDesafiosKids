import { useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { ExportProfileData } from "../../application/use-cases/ExportProfileData";
import { downloadJson } from "../../application/use-cases/ExportProfileData";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly profile: ChildProfile;
  readonly exportProfileData: ExportProfileData;
}

export function ParentExportSection({
  profile,
  exportProfileData,
}: Props) {
  const [message, setMessage] = useState("");

  async function exportData() {
    try {
      const content = await exportProfileData.execute(profile.id);
      const safeName = profile.displayName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

      downloadJson(
        `super-desafios-kids-${safeName || "perfil"}.json`,
        content,
      );
      setMessage("Exportação preparada.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível exportar.",
      );
    }
  }

  return (
    <section className="form-card">
      <h2>Exportar dados</h2>
      <p>
        Guarda uma cópia local do progresso deste perfil em formato JSON.
      </p>
      <Button onClick={() => void exportData()}>
        Exportar dados
      </Button>
      <p aria-live="polite">{message}</p>
    </section>
  );
}
