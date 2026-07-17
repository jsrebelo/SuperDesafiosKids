import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly profile: ChildProfile;
  readonly onChangeProfile: () => void;
}

export function DailyLimitScreen({
  profile,
  onChangeProfile,
}: Props) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Pausa de hoje</p>
        <h1>Muito bem, {profile.displayName}!</h1>
        <p>
          Já completaste o teu tempo de aprendizagem de hoje.
          Amanhã podes continuar os desafios.
        </p>
        <Button onClick={onChangeProfile}>Mudar perfil</Button>
      </section>
    </main>
  );
}
