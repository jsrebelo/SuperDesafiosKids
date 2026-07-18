import { useEffect, useMemo, useRef, useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import { MissingLetterGenerator } from "../../domain/words/MissingLetterGenerator";
import type { MissingLetterExercise } from "../../domain/words/WordEntry";
import { portugueseWords } from "../../data/words/pt-PT";
import type { SubmitWordAnswer } from "../../application/use-cases/SubmitWordAnswer";
import { Button } from "../../shared/components/Button";
import type { FinishTrackedSession } from "../../application/use-cases/FinishTrackedSession";
import { SessionTracker } from "../../domain/sessions/SessionTracker";

interface Props {
  readonly profile: ChildProfile;
  readonly submitWordAnswer: SubmitWordAnswer;
  readonly finishTrackedSession: FinishTrackedSession;
  readonly onUsageRecorded: () => Promise<void>;
  readonly onExit: () => void;
}

export function WordGameScreen({
  profile,
  submitWordAnswer,
  finishTrackedSession,
  onUsageRecorded,
  onExit,
}: Props) {
  const generator = useMemo(
    () => new MissingLetterGenerator(portugueseWords),
    [],
  );
  const [level, setLevel] = useState(initialLevel(profile.age));
  const [exercise, setExercise] = useState<MissingLetterExercise>(() =>
    generator.generate(profile.age, initialLevel(profile.age)),
  );
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const startedAt = useRef(performance.now());
  const tracker = useRef(new SessionTracker());

  useEffect(() => {
    tracker.current.start();
  }, []);

  async function finishSession() {
    if (finishing) return;
    setFinishing(true);
    await finishTrackedSession.execute(profile.id, tracker.current);
    await onUsageRecorded();
    onExit();
  }

  async function answer(selectedAnswer: string) {
    if (locked) return;

    setLocked(true);

    const output = await submitWordAnswer.execute({
      profileId: profile.id,
      profileAge: profile.age,
      exercise,
      selectedAnswer,
      responseTimeMs: Math.round(performance.now() - startedAt.current),
      hintsUsed: 0,
    });

    setLevel(output.progress.level);
    setFeedback(
      output.correct
        ? `Excelente! A palavra é ${exercise.completeWord}. +${output.xpEarned} XP`
        : "Boa tentativa! Observa a imagem e tenta a próxima.",
    );

    window.setTimeout(() => {
      setExercise(generator.generate(profile.age, output.progress.level));
      setFeedback("");
      setLocked(false);
      startedAt.current = performance.now();
    }, 1100);
  }

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button disabled={finishing} onClick={() => void finishSession()}>
          Voltar ao início
        </Button>
      </header>

      <section className="hero-card">
        <p className="eyebrow">Palavras</p>
        <h1>Completa a palavra, {profile.displayName}!</h1>
        <p>Escolhe a letra que falta.</p>
      </section>

      <section className="word-game-card">
        <p>Nível {level}</p>

        <span className="word-image" aria-label="Imagem da palavra">
          {exercise.imageLabel}
        </span>

        <h2 className="word-prompt" aria-label={`Palavra incompleta ${exercise.prompt}`}>
          {exercise.prompt}
        </h2>

        <div className="letter-options">
          {exercise.options.map((option) => (
            <Button
              disabled={locked}
              key={option}
              onClick={() => void answer(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <p aria-live="polite" className="feedback-message">
          {feedback}
        </p>
      </section>
    </main>
  );
}

function initialLevel(age: number): number {
  return age <= 5 ? 1 : age <= 6 ? 2 : age <= 8 ? 3 : age <= 9 ? 4 : 5;
}
