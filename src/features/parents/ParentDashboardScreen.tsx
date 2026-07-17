import { useEffect, useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { GetParentDashboard } from "../../application/use-cases/GetParentDashboard";
import type { ProfileStatistics } from "../../domain/statistics/ProfileStatistics";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import type { SkillProgress } from "../../domain/learning/Skill";
import { Button } from "../../shared/components/Button";

interface DashboardData {
  readonly statistics: ProfileStatistics;
  readonly wallet: RewardWallet;
  readonly progress: readonly SkillProgress[];
}

interface Props {
  readonly profile: ChildProfile;
  readonly getParentDashboard: GetParentDashboard;
  readonly dailyLimitMinutes: number;
  readonly onDailyLimitChange: (minutes: number) => void;
  readonly onExit: () => void;
}

export function ParentDashboardScreen({
  profile,
  getParentDashboard,
  dailyLimitMinutes,
  onDailyLimitChange,
  onExit,
}: Props) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    void getParentDashboard
      .execute(profile.id)
      .then((result) => setData(result));
  }, [getParentDashboard, profile.id]);

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button onClick={onExit}>Voltar ao início</Button>
      </header>

      <section className="hero-card">
        <p className="eyebrow">Área dos Pais</p>
        <h1>Progresso de {profile.displayName}</h1>
      </section>

      {data ? (
        <>
          <section className="summary-grid">
            <article className="summary-card">
              <strong>{data.statistics.attempts}</strong>
              <span>Tentativas</span>
            </article>
            <article className="summary-card">
              <strong>
                {Math.round(data.statistics.accuracy * 100)}%
              </strong>
              <span>Taxa de acerto</span>
            </article>
            <article className="summary-card">
              <strong>{data.wallet.xp}</strong>
              <span>XP total</span>
            </article>
            <article className="summary-card">
              <strong>{data.wallet.coins}</strong>
              <span>Moedas</span>
            </article>
            <article className="summary-card">
              <strong>{data.wallet.stars}</strong>
              <span>Estrelas</span>
            </article>
          </section>

          <section className="form-card">
            <h2>Competências</h2>
            {data.progress.length === 0 ? (
              <p>Ainda não existem dados suficientes.</p>
            ) : (
              <ul>
                {data.progress.map((item) => (
                  <li key={item.skillId}>
                    {skillLabel(item.skillId)} — nível {item.level}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <p>A carregar estatísticas…</p>
      )}

      <section className="form-card">
        <h2>Limite diário</h2>
        <label>
          Minutos por dia
          <input
            min={0}
            max={180}
            onChange={(event) =>
              onDailyLimitChange(Number(event.target.value))
            }
            type="number"
            value={dailyLimitMinutes}
          />
        </label>
        <p>Usa 0 para não definir limite.</p>
      </section>
    </main>
  );
}

function skillLabel(skillId: string): string {
  const labels: Record<string, string> = {
    "math.counting": "Contagem",
    "math.addition": "Soma",
    "math.subtraction": "Subtração",
    "math.multiplication": "Multiplicação",
    "math.division": "Divisão",
    "portuguese.missing-letter": "Letra em falta",
  };

  return labels[skillId] ?? skillId;
}
