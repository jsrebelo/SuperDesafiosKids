import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import { Button } from "../../shared/components/Button";

interface HomeScreenProps {
  readonly profile: ChildProfile;
  readonly onOpenMath: () => void;
  readonly onChangeProfile: () => void;
}

export function HomeScreen({
  profile,
  onOpenMath,
  onChangeProfile,
}: HomeScreenProps) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Super Desafios Kids</p>
        <h1>Olá, {profile.displayName}!</h1>
        <p>Que desafio queres fazer hoje?</p>
      </section>

      <section className="game-menu" aria-label="Jogos disponíveis">
        <article className="game-menu-card">
          <span className="game-menu-icon" aria-hidden="true">
            🧮
          </span>
          <h2>Matemática</h2>
          <p>Contar, somar e subtrair.</p>
          <Button onClick={onOpenMath}>Jogar</Button>
        </article>

        <article className="game-menu-card game-menu-card--locked">
          <span className="game-menu-icon" aria-hidden="true">
            🔤
          </span>
          <h2>Palavras</h2>
          <p>Disponível numa próxima versão.</p>
          <Button disabled>Em breve</Button>
        </article>
      </section>

      <footer className="home-actions">
        <Button onClick={onChangeProfile}>Mudar perfil</Button>
      </footer>
    </main>
  );
}
