import { useEffect, useState } from "react";
import type { SettingsRepository } from "../../application/ports/SettingsRepository";
import {
  defaultAppSettings,
  type AppSettings,
} from "../../domain/settings/AppSettings";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly repository: SettingsRepository;
  readonly onChanged: (settings: AppSettings) => void;
  readonly onExit: () => void;
}

export function AccessibilitySettingsScreen({
  repository,
  onChanged,
  onExit,
}: Props) {
  const [settings, setSettings] =
    useState<AppSettings>(defaultAppSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void repository.get().then(setSettings);
  }, [repository]);

  async function save() {
    await repository.save(settings);
    onChanged(settings);
    setMessage("Definições guardadas.");
  }

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button onClick={onExit}>Voltar</Button>
      </header>

      <section className="hero-card">
        <p className="eyebrow">Acessibilidade</p>
        <h1>Definições</h1>
      </section>

      <section className="form-card settings-list">
        <Toggle
          checked={settings.highContrast}
          label="Alto contraste"
          onChange={(value) =>
            setSettings({ ...settings, highContrast: value })
          }
        />
        <Toggle
          checked={settings.reducedMotion}
          label="Reduzir movimento"
          onChange={(value) =>
            setSettings({ ...settings, reducedMotion: value })
          }
        />
        <Toggle
          checked={settings.dyslexiaFriendlyFont}
          label="Fonte amigável para dislexia"
          onChange={(value) =>
            setSettings({
              ...settings,
              dyslexiaFriendlyFont: value,
            })
          }
        />
        <Toggle
          checked={settings.readAloudEnabled}
          label="Leitura por voz"
          onChange={(value) =>
            setSettings({
              ...settings,
              readAloudEnabled: value,
            })
          }
        />
        <Toggle
          checked={settings.soundEnabled}
          label="Efeitos sonoros"
          onChange={(value) =>
            setSettings({ ...settings, soundEnabled: value })
          }
        />
        <Toggle
          checked={settings.musicEnabled}
          label="Música"
          onChange={(value) =>
            setSettings({ ...settings, musicEnabled: value })
          }
        />

        <Button onClick={() => void save()}>Guardar definições</Button>
        <p aria-live="polite">{message}</p>
      </section>
    </main>
  );
}

interface ToggleProps {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (value: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
}
