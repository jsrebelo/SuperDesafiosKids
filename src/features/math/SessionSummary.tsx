import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { LearningSessionSummary } from "../../domain/sessions/LearningSession";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly profile: ChildProfile;
  readonly summary: LearningSessionSummary;
  readonly onContinue: () => void;
  readonly onExit: () => void;
}

export function SessionSummary({
  profile,
  summary,
  onContinue,
  onExit,
}: Props) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Resumo da sessão</p>
        <h1>Muito bem, {profile.displayName}!</h1>
        <p>Concluíste mais uma sessão de aprendizagem.</p>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <strong>{summary.correctAnswers}</strong>
          <span>Respostas certas</span>
        </article>

        <article className="summary-card">
          <strong>{summary.attempts}</strong>
          <span>Tentativas</span>
        </article>

        <article className="summary-card">
          <strong>{summary.xpEarned}</strong>
          <span>XP</span>
        </article>

        <article className="summary-card">
          <strong>{summary.coinsEarned}</strong>
          <span>Moedas</span>
        </article>

        <article className="summary-card">
          <strong>{summary.starsEarned}</strong>
          <span>Estrelas</span>
        </article>
      </section>

      <div className="summary-actions">
        <Button onClick={onContinue}>Continuar a jogar</Button>
        <Button onClick={onExit}>Voltar ao início</Button>
      </div>
    </main>
  );
}
