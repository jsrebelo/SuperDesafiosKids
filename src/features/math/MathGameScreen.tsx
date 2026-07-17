import { useMemo, useRef, useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { SkillId } from "../../domain/learning/Skill";
import { MathExerciseGenerator } from "../../domain/exercises/MathExerciseGenerator";
import type { MathExercise } from "../../domain/exercises/MathExercise";
import type { SubmitMathAnswer } from "../../application/use-cases/SubmitMathAnswer";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly profile: ChildProfile;
  readonly submitMathAnswer: SubmitMathAnswer;
}

const skills: readonly SkillId[] = [
  "math.counting",
  "math.addition",
  "math.subtraction",
];

export function MathGameScreen({ profile, submitMathAnswer }: Props) {
  const generator = useMemo(() => new MathExerciseGenerator(), []);
  const [skillId, setSkillId] = useState<SkillId>("math.addition");
  const [level, setLevel] = useState(initialLevel(profile.age));
  const [exercise, setExercise] = useState<MathExercise>(() =>
    generator.generate("math.addition", initialLevel(profile.age)),
  );
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);
  const startedAt = useRef(performance.now());

  function changeSkill(next: SkillId) {
    setSkillId(next);
    setExercise(generator.generate(next, level));
    setFeedback("");
    startedAt.current = performance.now();
  }

  async function answer(selectedAnswer: number) {
    if (locked) return;
    setLocked(true);

    const output = await submitMathAnswer.execute({
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
        ? "Excelente! Muito bem!"
        : "Boa tentativa! Vamos experimentar outra vez.",
    );

    window.setTimeout(() => {
      setExercise(generator.generate(skillId, output.progress.level));
      setFeedback("");
      setLocked(false);
      startedAt.current = performance.now();
    }, 900);
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Matemática</p>
        <h1>Olá, {profile.displayName}!</h1>
        <p>Escolhe um desafio.</p>
      </section>

      <nav className="skill-tabs" aria-label="Tipos de exercício">
        {skills.map((skill) => (
          <Button
            aria-pressed={skillId === skill}
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

function label(skill: SkillId): string {
  const labels: Record<SkillId, string> = {
    "math.counting": "Contar",
    "math.addition": "Somar",
    "math.subtraction": "Subtrair",
  };
  return labels[skill];
}
