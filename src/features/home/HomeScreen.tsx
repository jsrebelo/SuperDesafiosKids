import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import { Button } from "../../shared/components/Button";

interface HomeScreenProps {
  readonly profile: ChildProfile;
  readonly wallet: RewardWallet;
  readonly onOpenMath: () => void;
  readonly onOpenWords: () => void;
  readonly onOpenParents: () => void;
  readonly onChangeProfile: () => void;
}

export function HomeScreen({
  profile,
  wallet,
  onOpenMath,
  onOpenWords,
  onOpenParents,
  onChangeProfile,
}: HomeScreenProps) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Super Desafios Kids</p>
        <h1>Olá, {profile.displayName}!</h1>
        <p>Que desafio queres fazer hoje?</p>

        <div className="wallet-strip" aria-label="Recompensas">
          <span>{wallet.xp} XP</span>
          <span>{wallet.coins} moedas</span>
          <span>{wallet.stars} estrelas</span>
        </div>
      </section>

      <section className="game-menu" aria-label="Jogos disponíveis">
        <article className="game-menu-card">
          <span className="game-menu-icon" aria-hidden="true">
            🧮
          </span>
          <h2>Matemática</h2>
          <p>Contar, somar, subtrair, multiplicar e dividir.</p>
          <Button onClick={onOpenMath}>Jogar Matemática</Button>
        </article>

        <article className="game-menu-card">
          <span className="game-menu-icon" aria-hidden="true">
            🔤
          </span>
          <h2>Palavras</h2>
          <p>Escolher a letra que falta.</p>
          <Button onClick={onOpenWords}>Jogar Palavras</Button>
        </article>
      </section>

      <footer className="home-actions">
        <Button onClick={onOpenParents}>Área dos Pais</Button>
        <Button onClick={onChangeProfile}>Mudar perfil</Button>
      </footer>
    </main>
  );
}
