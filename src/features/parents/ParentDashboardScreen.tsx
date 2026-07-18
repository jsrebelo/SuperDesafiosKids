import { useEffect, useState } from "react";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { GetParentDashboard } from "../../application/use-cases/GetParentDashboard";
import type { ProfileStatistics } from "../../domain/statistics/ProfileStatistics";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import type { SkillProgress } from "../../domain/learning/Skill";
import type { ImportProfileData } from "../../application/use-cases/ImportProfileData";
import type { ExportProfileData } from "../../application/use-cases/ExportProfileData";
import { Button } from "../../shared/components/Button";
import { ParentExportSection } from "./ParentExportSection";
import { ParentImportSection } from "./ParentImportSection";
import { ParentReportSection } from "./ParentReportSection";

interface DashboardData {
  readonly statistics: ProfileStatistics;
  readonly wallet: RewardWallet;
  readonly progress: readonly SkillProgress[];
}

interface Props {
  readonly profile: ChildProfile;
  readonly getParentDashboard: GetParentDashboard;
  readonly importProfileData: ImportProfileData;
  readonly exportProfileData: ExportProfileData;
  readonly dailyLimitMinutes: number;
  readonly onDailyLimitChange: (minutes: number) => void;
  readonly onManageProfiles: () => void;
  readonly onOpenAccessibility: () => void;
  readonly onExit: () => void;
}

export function ParentDashboardScreen({
  profile,
  getParentDashboard,
  importProfileData,
  exportProfileData,
  dailyLimitMinutes,
  onDailyLimitChange,
  onManageProfiles,
  onOpenAccessibility,
  onExit,
}: Props) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    void getParentDashboard
      .execute(profile.id)
      .then((result) => setData(result));
  }, [getParentDashboard, profile.id, refreshKey]);

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button onClick={onExit}>Voltar ao início</Button>
        <Button onClick={onManageProfiles}>Gerir perfis</Button>
        <Button onClick={onOpenAccessibility}>Acessibilidade</Button>
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
          <ParentReportSection
            profile={profile}
            statistics={data.statistics}
            wallet={data.wallet}
            progress={data.progress}
          />
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
      <ParentExportSection
        profile={profile}
        exportProfileData={exportProfileData}
      />
      <ParentImportSection
        importProfileData={importProfileData}
        onImported={() => setRefreshKey((value) => value + 1)}
      />
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
