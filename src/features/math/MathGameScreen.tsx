import { useEffect, useMemo, useRef, useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { MathSkillId } from "../../domain/exercises/MathExercise";
import { MathExerciseGenerator } from "../../domain/exercises/MathExerciseGenerator";
import type { MathExercise } from "../../domain/exercises/MathExercise";
import type { SubmitMathAnswer } from "../../application/use-cases/SubmitMathAnswer";
import { Button } from "../../shared/components/Button";
import type { LearningSessionSummary } from "../../domain/sessions/LearningSession";
import { SessionSummary } from "./SessionSummary";
import type { FinishTrackedSession } from "../../application/use-cases/FinishTrackedSession";
import { SessionTracker } from "../../domain/sessions/SessionTracker";

interface Props {
  readonly profile: ChildProfile;
  readonly submitMathAnswer: SubmitMathAnswer;
  readonly finishTrackedSession: FinishTrackedSession;
  readonly onUsageRecorded: () => Promise<void>;
  readonly onExit: () => void;
}

const skills: readonly MathSkillId[] = [
  "math.counting",
  "math.addition",
  "math.subtraction",
  "math.multiplication",
  "math.division",
];

export function MathGameScreen({
  profile,
  submitMathAnswer,
  finishTrackedSession,
  onUsageRecorded,
  onExit,
}: Props) {
  const generator = useMemo(() => new MathExerciseGenerator(), []);
  const [skillId, setSkillId] = useState<MathSkillId>("math.addition");
  const [level, setLevel] = useState(initialLevel(profile.age));
  const [exercise, setExercise] = useState<MathExercise>(() =>
    generator.generate("math.addition", initialLevel(profile.age)),
  );
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [summary, setSummary] = useState<LearningSessionSummary | null>(null);

  const sessionStartedAt = useRef(new Date());
  const questionStartedAt = useRef(performance.now());
  const attempts = useRef(0);
  const correctAnswers = useRef(0);
  const xpEarned = useRef(0);
  const coinsEarned = useRef(0);
  const starsEarned = useRef(0);
  const tracker = useRef(new SessionTracker());

  useEffect(() => {
    tracker.current.start();
  }, []);

  function changeSkill(next: MathSkillId) {
    if (locked) return;

    setSkillId(next);
    setExercise(generator.generate(next, level));
    setFeedback("");
    questionStartedAt.current = performance.now();
  }

  async function answer(selectedAnswer: number) {
    if (locked) return;

    setLocked(true);

    const output = await submitMathAnswer.execute({
      profileId: profile.id,
      profileAge: profile.age,
      exercise,
      selectedAnswer,
      responseTimeMs: Math.round(
        performance.now() - questionStartedAt.current,
      ),
      hintsUsed: 0,
    });

    attempts.current += 1;
    if (output.correct) correctAnswers.current += 1;
    xpEarned.current += output.xpEarned;
    coinsEarned.current += output.coinsEarned;
    starsEarned.current += output.starsEarned;

    setLevel(output.progress.level);
    setFeedback(
      output.correct
        ? `Excelente! +${output.xpEarned} XP e +${output.coinsEarned} moedas`
        : "Boa tentativa! Vamos experimentar outra vez.",
    );

    window.setTimeout(() => {
      setExercise(
        generator.generate(skillId, output.progress.level),
      );
      setFeedback("");
      setLocked(false);
      questionStartedAt.current = performance.now();
    }, 900);
  }

  async function finishSession() {
    if (finishing) return;
    setFinishing(true);
    await finishTrackedSession.execute(profile.id, tracker.current);
    await onUsageRecorded();
    setSummary({
      profileId: profile.id,
      startedAt: sessionStartedAt.current.toISOString(),
      endedAt: new Date().toISOString(),
      attempts: attempts.current,
      correctAnswers: correctAnswers.current,
      xpEarned: xpEarned.current,
      coinsEarned: coinsEarned.current,
      starsEarned: starsEarned.current,
    });
  }

  if (summary) {
    return (
      <SessionSummary
        profile={profile}
        summary={summary}
        onContinue={() => {
          setSummary(null);
          setFinishing(false);
          tracker.current.start();
          sessionStartedAt.current = new Date();
          attempts.current = 0;
          correctAnswers.current = 0;
          xpEarned.current = 0;
          coinsEarned.current = 0;
          starsEarned.current = 0;
          questionStartedAt.current = performance.now();
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button disabled={finishing} onClick={() => void finishSession()}>
          Terminar sessão
        </Button>
      </header>

      <section className="hero-card">
        <p className="eyebrow">Matemática</p>
        <h1>Olá, {profile.displayName}!</h1>
        <p>Escolhe um desafio.</p>
      </section>

      <nav className="skill-tabs" aria-label="Tipos de exercício">
        {skills.map((skill) => (
          <Button
            aria-pressed={skillId === skill}
            disabled={locked}
            key={skill}
            onClick={() => changeSkill(skill)}
          >
            {label(skill)}
          </Button>
        ))}
      </nav>

      <section className="game-card">
        <p>Nível {level}</p>
        <h2>{exercise.prompt}</h2>

        <div className="answer-grid">
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

function label(skill: MathSkillId): string {
  const labels: Record<MathSkillId, string> = {
    "math.counting": "Contar",
    "math.addition": "Somar",
    "math.subtraction": "Subtrair",
    "math.multiplication": "Multiplicar",
    "math.division": "Dividir",
  };

  return labels[skill];
}
