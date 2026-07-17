import { useEffect, useState } from "react";
import type { ParentAccessRepository } from "../../application/ports/ParentAccessRepository";
import { hashPin, verifyPin } from "../../domain/parents/ParentAccess";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly repository: ParentAccessRepository;
  readonly onGranted: () => void;
  readonly onCancel: () => void;
}

export function ParentAccessScreen({
  repository,
  onGranted,
  onCancel,
}: Props) {
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void repository
      .getPinHash()
      .then((value) => setHasPin(value !== null));
  }, [repository]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      if (!/^\d{4}$/.test(pin)) {
        setMessage("Introduz quatro algarismos.");
        return;
      }

      const currentHash = await repository.getPinHash();

      if (!currentHash) {
        await repository.savePinHash(await hashPin(pin));
        onGranted();
        return;
      }

      if (await verifyPin(pin, currentHash)) {
        onGranted();
        return;
      }

      setMessage("PIN incorreto.");
    } catch {
      setMessage("Não foi possível validar o acesso.");
    }
  }

  return (
    <main className="page-shell">
      <section className="form-card">
        <p className="eyebrow">Área dos Pais</p>
        <h1>{hasPin ? "Introduzir PIN" : "Criar PIN"}</h1>
        <p>
          {hasPin
            ? "Introduz o PIN de quatro algarismos."
            : "Cria um PIN para proteger as definições."}
        </p>

        <form onSubmit={(event) => void submit(event)}>
          <label>
            PIN
            <input
              aria-describedby="pin-help"
              inputMode="numeric"
              maxLength={4}
              minLength={4}
              onChange={(event) =>
                setPin(event.target.value.replace(/\D/g, ""))
              }
              pattern="\d{4}"
              required
              type="password"
              value={pin}
            />
          </label>

          <p id="pin-help">Usa quatro algarismos.</p>

          <div className="summary-actions">
            <Button type="submit">
              {hasPin ? "Entrar" : "Guardar PIN"}
            </Button>
            <Button onClick={onCancel} type="button">
              Cancelar
            </Button>
          </div>
        </form>

        <p aria-live="polite">{message}</p>
      </section>
    </main>
  );
}
